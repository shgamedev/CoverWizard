import { forwardRef } from "react";

interface PreviewCanvasProps {
  aspectRatio?: number;
}

const PreviewCanvas = forwardRef<HTMLCanvasElement, PreviewCanvasProps>(
  ({ aspectRatio }, ref) => {
    return (
      <div className="preview-canvas-wrapper">
        <canvas
          ref={ref}
          className="preview-canvas"
          style={aspectRatio ? { aspectRatio: String(aspectRatio) } : undefined}
        />
      </div>
    );
  },
);

PreviewCanvas.displayName = "PreviewCanvas";

export default PreviewCanvas;
