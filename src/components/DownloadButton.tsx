interface DownloadButtonProps {
  onDownload: () => void;
  disabled?: boolean;
}

export default function DownloadButton({
  onDownload,
  disabled,
}: DownloadButtonProps) {
  return (
    <button
      className="download-button"
      onClick={onDownload}
      disabled={disabled}
    >
      Download Print-Ready Cover
    </button>
  );
}
