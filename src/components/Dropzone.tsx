import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onFileAccepted: (file: File) => void;
}

export default function Dropzone({ onFileAccepted }: DropzoneProps) {
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
      {isDragActive ? (
        <p>Drop the image here...</p>
      ) : (
        <p>Drag & drop cover art here, or click to select a file</p>
      )}
    </div>
  );
}
