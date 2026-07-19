import { forwardRef } from "react";

const PreviewCanvas = forwardRef<HTMLCanvasElement>((_props, ref) => {
  return (
    <div className="preview-canvas-wrapper">
      <canvas ref={ref} className="preview-canvas" />
    </div>
  );
});

PreviewCanvas.displayName = "PreviewCanvas";

export default PreviewCanvas;
