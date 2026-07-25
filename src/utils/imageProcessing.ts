import type { CoverSlot } from "./presets";
import { getSlotPixelDimensions } from "./presets";

// A4 page at 300 DPI — the output canvas is always this size so that printing
// on A4 with any default "full page" setting places the cover at exactly the
// correct physical dimensions without needing to touch print scaling options.
const PAGE_DPI = 300;
// Portrait: 210 × 297 mm  |  Landscape: 297 × 210 mm
const A4_SHORT_PX = Math.round((210 / 25.4) * PAGE_DPI); // 2480 px
const A4_LONG_PX = Math.round((297 / 25.4) * PAGE_DPI); // 3508 px
const GAP_MM = 8; // gap between slots when stacking on page

export interface SlotImage {
  slot: CoverSlot;
  image: HTMLImageElement;
}

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
 * Draws a source image scaled to fit (contain-fit) within the destination
 * rectangle, preserving aspect ratio with no cropping. The image is centered;
 * any unused space remains the background colour (white).
 */
function drawContainedImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
): void {
  const srcRatio = image.width / image.height;
  const dstRatio = dw / dh;
  let drawW: number, drawH: number;
  if (srcRatio > dstRatio) {
    // Image is wider than destination — constrain by width
    drawW = dw;
    drawH = dw / srcRatio;
  } else {
    // Image is taller than destination — constrain by height
    drawH = dh;
    drawW = dh * srcRatio;
  }
  const offsetX = dx + Math.round((dw - drawW) / 2);
  const offsetY = dy + Math.round((dh - drawH) / 2);
  ctx.drawImage(
    image,
    0,
    0,
    image.width,
    image.height,
    offsetX,
    offsetY,
    drawW,
    drawH,
  );
}

/**
 * Renders one or more slot images onto a full A4 page canvas at 300 DPI.
 * Portrait: 2480×3508 px (210×297 mm). Landscape: 3508×2480 px (297×210 mm).
 * Multiple slots are stacked and centered as a group.
 * Printing on A4 at "full page / fit to page" produces the exact physical dimensions.
 */
export function renderCoverToCanvas(
  slotImages: SlotImage[],
  dpi: number,
  orientation: "portrait" | "landscape",
  canvas: HTMLCanvasElement,
): void {
  const pageW = orientation === "landscape" ? A4_LONG_PX : A4_SHORT_PX;
  const pageH = orientation === "landscape" ? A4_SHORT_PX : A4_LONG_PX;

  canvas.width = pageW;
  canvas.height = pageH;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas 2D context");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, pageW, pageH);

  if (slotImages.length === 0) return;

  const gapPx = Math.round((GAP_MM / 25.4) * dpi);
  const dims = slotImages.map(({ slot }) => getSlotPixelDimensions(slot, dpi));
  const totalH =
    dims.reduce((sum, d) => sum + d.height, 0) +
    gapPx * (slotImages.length - 1);

  let y = Math.round((pageH - totalH) / 2);

  for (let i = 0; i < slotImages.length; i++) {
    const { width: coverW, height: coverH } = dims[i];
    const x = Math.round((pageW - coverW) / 2);
    drawContainedImage(ctx, slotImages[i].image, x, y, coverW, coverH);
    y += coverH + gapPx;
  }
}

/**
 * Renders slot images onto a preview canvas sized to the cover content area
 * only — no page border white space. Used for the on-screen preview so the
 * user sees the cover art prominently rather than a small image on a large page.
 */
export function renderPreviewToCanvas(
  slotImages: SlotImage[],
  dpi: number,
  canvas: HTMLCanvasElement,
): void {
  if (slotImages.length === 0) return;

  const gapPx = Math.round((GAP_MM / 25.4) * dpi);
  const dims = slotImages.map(({ slot }) => getSlotPixelDimensions(slot, dpi));
  const maxW = Math.max(...dims.map((d) => d.width));
  const totalH =
    dims.reduce((sum, d) => sum + d.height, 0) +
    gapPx * (slotImages.length - 1);

  canvas.width = maxW;
  canvas.height = totalH;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas 2D context");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, maxW, totalH);

  let y = 0;
  for (let i = 0; i < slotImages.length; i++) {
    const { width: coverW, height: coverH } = dims[i];
    const x = Math.round((maxW - coverW) / 2);
    drawContainedImage(ctx, slotImages[i].image, x, y, coverW, coverH);
    y += coverH + gapPx;
  }
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
 * chunk. The page is always A4 at PAGE_DPI so printing on A4 at full-page
 * scale produces the exact physical cover dimensions.
 */
export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Canvas toBlob returned null"));
          return;
        }
        blob
          .arrayBuffer()
          .then((buf) => resolve(injectPngDpi(buf, PAGE_DPI)))
          .catch(reject);
      },
      "image/png",
      1,
    );
  });
}
