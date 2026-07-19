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
} from "./utils/imageProcessing";
import "./App.css";

function App() {
  const [presetId, setPresetId] = useState(PRESETS[0].id);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState<string>("cover");
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const preset = PRESETS.find((p) => p.id === presetId) ?? PRESETS[0];

  const handleFileAccepted = async (file: File) => {
    setError(null);
    try {
      const img = await loadImage(file);
      setImage(img);
      setFileName(file.name.replace(/\.[^/.]+$/, ""));
    } catch {
      setError("Could not load image. Please try a different file.");
    }
  };

  useEffect(() => {
    if (image && canvasRef.current) {
      renderCoverToCanvas(image, preset, canvasRef.current);
    }
  }, [image, preset]);

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    try {
      const blob = await canvasToBlob(canvasRef.current);
      saveAs(blob, `${fileName}-${preset.id}.png`);
    } catch {
      setError("Failed to generate download. Please try again.");
    }
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1>Cover Wizard</h1>
        <p>
          Upload your video game cover art, choose a case type, and download a
          print-ready image sized exactly for a replacement slip cover.
        </p>
      </header>

      <main className="app__main">
        <PresetSelector value={presetId} onChange={setPresetId} />
        <Dropzone onFileAccepted={handleFileAccepted} />

        {error && <p className="app__error">{error}</p>}

        {image && (
          <>
            <PreviewCanvas ref={canvasRef} />
            <DownloadButton onDownload={handleDownload} />
          </>
        )}
      </main>

      <footer className="app__footer">
        <p>All processing happens locally in your browser.</p>
      </footer>
    </div>
  );
}

export default App;
