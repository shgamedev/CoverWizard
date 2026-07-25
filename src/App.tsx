import { useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";
import Dropzone from "./components/Dropzone";
import PresetSelector from "./components/PresetSelector";
import PreviewCanvas from "./components/PreviewCanvas";
import DownloadButton from "./components/DownloadButton";
import { PRESETS } from "./utils/presets";
import {
  canvasToBlob,
  loadImage,
  renderCoverToCanvas,
  renderPreviewToCanvas,
  type SlotImage,
} from "./utils/imageProcessing";
import "./App.css";

const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? "0.1.0";

function App() {
  const [presetId, setPresetId] = useState(PRESETS[0].id);
  const [previewMode, setPreviewMode] = useState<"content" | "a4">("content");
  // images keyed by slot id
  const [images, setImages] = useState<Record<string, HTMLImageElement>>({});
  const [error, setError] = useState<string | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const preset = PRESETS.find((p) => p.id === presetId) ?? PRESETS[0];
  const hasAnyImage = Object.keys(images).length > 0;

  // Clear images when preset changes
  const handlePresetChange = (id: string) => {
    setPresetId(id);
    setImages({});
    setError(null);
  };

  const handleFileAccepted = async (slotId: string, file: File) => {
    setError(null);
    try {
      const img = await loadImage(file);
      setImages((prev) => ({ ...prev, [slotId]: img }));
    } catch {
      setError("Could not load image. Please try a different file.");
    }
  };

  const handleClearSlot = (slotId: string) => {
    setImages((prev) => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
  };

  // Build the ordered list of slot images that are currently loaded
  const slotImages: SlotImage[] = preset.slots
    .filter((slot) => images[slot.id])
    .map((slot) => ({ slot, image: images[slot.id] }));

  useEffect(() => {
    if (slotImages.length === 0 || !previewCanvasRef.current) return;

    if (previewMode === "a4") {
      renderCoverToCanvas(
        slotImages,
        preset.dpi,
        preset.pageOrientation,
        previewCanvasRef.current,
      );
      return;
    }

    renderPreviewToCanvas(slotImages, preset.dpi, previewCanvasRef.current);
    // slotImages is derived from images + preset, both included here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, preset, previewMode]);

  const handleDownload = async () => {
    if (slotImages.length === 0) return;

    try {
      const exportCanvas = document.createElement("canvas");
      renderCoverToCanvas(
        slotImages,
        preset.dpi,
        preset.pageOrientation,
        exportCanvas,
      );
      const blob = await canvasToBlob(exportCanvas);
      saveAs(blob, `${preset.id}-cover.png`);
    } catch {
      setError("Failed to generate download. Please try again.");
    }
  };

  const isMultiSlot = preset.slots.length > 1;

  return (
    <div className="app">
      <header className="app__header">
        <h1>Cover Wizard</h1>
        <p className="app__dev-notice">
          This tool is still in development. Output sizing may not yet be
          accurate, so please verify measurements before printing.
        </p>
        <p>
          Upload your video game cover art, choose a cover type, and download a
          print-ready image sized exactly for a replacement slip cover.
        </p>
        <p className="app__region-notice">
          ⚠️ All presets are sized for <strong>PAL region</strong> cases.
        </p>
      </header>

      <main className="app__main">
        <PresetSelector value={presetId} onChange={handlePresetChange} />
        <p className="app__upload-hint">
          {preset.uploadType === "full-wrap"
            ? "Upload one full-wrap image (back + spine + front)."
            : "Upload both Front Insert and Back / Tray Card images."}
        </p>

        {/* Slot upload controls */}
        <div className={`app__slots${isMultiSlot ? " app__slots--multi" : ""}`}>
          {preset.slots.map((slot) => {
            const loaded = !!images[slot.id];
            return (
              <div key={slot.id} className="app__slot">
                {loaded ? (
                  <div className="app__slot-loaded">
                    <span>✓ {slot.label}</span>
                    <button
                      className="app__slot-clear"
                      onClick={() => handleClearSlot(slot.id)}
                      title={`Remove ${slot.label}`}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <Dropzone
                    label={isMultiSlot ? slot.label : undefined}
                    onFileAccepted={(file) => handleFileAccepted(slot.id, file)}
                  />
                )}
              </div>
            );
          })}
        </div>

        {error && <p className="app__error">{error}</p>}

        {hasAnyImage && (
          <>
            <div
              className="app__preview-controls"
              role="group"
              aria-label="Preview mode"
            >
              <button
                type="button"
                className={`app__preview-mode${previewMode === "content" ? " is-active" : ""}`}
                onClick={() => setPreviewMode("content")}
              >
                Content Preview
              </button>
              <button
                type="button"
                className={`app__preview-mode${previewMode === "a4" ? " is-active" : ""}`}
                onClick={() => setPreviewMode("a4")}
              >
                A4 Print Layout
              </button>
            </div>

            <PreviewCanvas
              ref={previewCanvasRef}
              mode={previewMode}
              orientation={
                previewMode === "a4" ? preset.pageOrientation : undefined
              }
              aspectRatio={
                previewMode === "a4"
                  ? preset.pageOrientation === "landscape"
                    ? 297 / 210
                    : 210 / 297
                  : undefined
              }
            />
            <div className="app__buttons">
              <DownloadButton onDownload={handleDownload} />
            </div>
            <p className="app__preview-caption">
              {previewMode === "content"
                ? "Preview mode: zoomed cover content."
                : "Preview mode: full A4 print composition."}
            </p>
            <p className="app__print-notice">
              🖨️ Print on <strong>A4</strong> paper,{" "}
              <strong>
                {preset.pageOrientation === "landscape"
                  ? "Landscape"
                  : "Portrait"}
              </strong>
              , at <strong>full page / fit to page</strong>.
            </p>
          </>
        )}
      </main>

      <footer className="app__footer">
        <p>All processing happens locally in your browser.</p>
        <p>v{APP_VERSION}</p>
      </footer>
    </div>
  );
}

export default App;
