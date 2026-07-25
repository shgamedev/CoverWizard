import { forwardRef } from "react";

interface PreviewCanvasProps {
  aspectRatio?: number;
  orientation?: "portrait" | "landscape";
  mode?: "content" | "a4";
}

const PreviewCanvas = forwardRef<HTMLCanvasElement, PreviewCanvasProps>(
  ({ aspectRatio, orientation = "portrait", mode = "a4" }, ref) => {
    const orientationClass =
      mode === "a4"
        ? `preview-canvas--${orientation}`
        : "preview-canvas--content";

    return (
      <div className="preview-canvas-wrapper">
        <canvas
          ref={ref}
          className={`preview-canvas ${orientationClass}`}
          style={aspectRatio ? { aspectRatio: String(aspectRatio) } : undefined}
        />
      </div>
    );
  },
);

PreviewCanvas.displayName = "PreviewCanvas";

export default PreviewCanvas;
