import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onFileAccepted: (file: File) => void;
  label?: string;
}

export default function Dropzone({ onFileAccepted, label }: DropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileAccepted(acceptedFiles[0]);
      }
    },
    [onFileAccepted],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone${isDragActive ? " dropzone--active" : ""}`}
    >
      <input {...getInputProps()} />
      {label && <p className="dropzone__label">{label}</p>}
      {isDragActive ? (
        <p>Drop image here…</p>
      ) : (
        <p>Drag & drop or click to select</p>
      )}
    </div>
  );
}
