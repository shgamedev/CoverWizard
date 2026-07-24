import type { CoverPreset } from "./presets";
import { getPixelDimensions } from "./presets";

/**
 * Loads a File into an HTMLImageElement.
 */
export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve(img);
      URL.revokeObjectURL(url);
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });
}

/**
 * Resizes/crops an image (cover-fit: fills target dimensions, cropping
 * overflow) onto a canvas sized to the given preset's print dimensions.
 */
export function renderCoverToCanvas(
  img: HTMLImageElement,
  preset: CoverPreset,
  canvas: HTMLCanvasElement,
): void {
  const { width: targetW, height: targetH } = getPixelDimensions(preset);

  canvas.width = targetW;
  canvas.height = targetH;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas 2D context");

  ctx.clearRect(0, 0, targetW, targetH);

  const targetRatio = targetW / targetH;
  const srcRatio = img.width / img.height;

  let sx = 0;
  let sy = 0;
  let sWidth = img.width;
  let sHeight = img.height;

  if (srcRatio > targetRatio) {
    // Source is wider than target: crop left/right
    sWidth = img.height * targetRatio;
    sx = (img.width - sWidth) / 2;
  } else {
    // Source is taller than target: crop top/bottom
    sHeight = img.width / targetRatio;
    sy = (img.height - sHeight) / 2;
  }

  ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetW, targetH);
}

/**
 * Injects a PNG pHYs chunk into raw PNG bytes to embed DPI metadata.
 * Without this, printers default to 96 DPI and print at the wrong size.
 *
 * PNG spec: pHYs chunk = pixels per unit X (4 bytes) + pixels per unit Y (4
 * bytes) + unit specifier (1 byte, 0x01 = metre).
 * 1 inch = 0.0254 metres, so pixels per metre = dpi / 0.0254.
 */
function injectPngDpi(pngBytes: ArrayBuffer, dpi: number): Blob {
  const src = new Uint8Array(pngBytes);

  // Build the pHYs chunk data (9 bytes)
  const ppm = Math.round(dpi / 0.0254); // pixels per metre
  const physData = new Uint8Array(9);
  const view = new DataView(physData.buffer);
  view.setUint32(0, ppm); // X pixels per unit
  view.setUint32(4, ppm); // Y pixels per unit
  physData[8] = 1; // unit = metre

  // Calculate CRC32 over chunk type + data
  const chunkType = new TextEncoder().encode("pHYs");
  const crcInput = new Uint8Array(chunkType.length + physData.length);
  crcInput.set(chunkType, 0);
  crcInput.set(physData, chunkType.length);
  const crc = crc32(crcInput);

  // Assemble pHYs chunk: length (4) + type (4) + data (9) + crc (4) = 21 bytes
  const physChunk = new Uint8Array(21);
  const chunkView = new DataView(physChunk.buffer);
  chunkView.setUint32(0, 9); // data length
  physChunk.set(chunkType, 4); // chunk type "pHYs"
  physChunk.set(physData, 8); // chunk data
  chunkView.setUint32(17, crc); // CRC

  // PNG structure: 8-byte signature + IHDR chunk (always first, 25 bytes) +
  // insert pHYs here + rest of chunks.
  const signatureAndIhdr = 8 + 25;
  const output = new Uint8Array(src.length + physChunk.length);
  output.set(src.subarray(0, signatureAndIhdr), 0);
  output.set(physChunk, signatureAndIhdr);
  output.set(
    src.subarray(signatureAndIhdr),
    signatureAndIhdr + physChunk.length,
  );

  return new Blob([output], { type: "image/png" });
}

/** Standard CRC-32 used by the PNG spec. */
function crc32(data: Uint8Array): number {
  const table = makeCrcTable();
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ data[i]) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeCrcTable(): Uint32Array {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c;
  }
  return table;
}

/**
 * Exports the canvas as a PNG Blob with DPI metadata embedded in the pHYs
 * chunk so that printing at 100% scale produces the exact physical dimensions.
 */
export function canvasToBlob(
  canvas: HTMLCanvasElement,
  dpi: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Canvas toBlob returned null"));
          return;
        }
        blob
          .arrayBuffer()
          .then((buf) => resolve(injectPngDpi(buf, dpi)))
          .catch(reject);
      },
      "image/png",
      1,
    );
  });
}
