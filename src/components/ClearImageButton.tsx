interface ClearImageButtonProps {
  onClear: () => void;
  disabled?: boolean;
}

export default function ClearImageButton({
  onClear,
  disabled,
}: ClearImageButtonProps) {
  return (
    <button className="download-button" onClick={onClear} disabled={disabled}>
      Clear Image
    </button>
  );
}
