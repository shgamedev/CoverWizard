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
 * Exports the canvas contents as a downloadable Blob.
 */
export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type = "image/png",
  quality = 1,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas toBlob returned null"));
      },
      type,
      quality,
    );
  });
}
