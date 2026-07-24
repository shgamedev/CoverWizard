import { PRESETS } from "../utils/presets";

interface PresetSelectorProps {
  value: string;
  onChange: (id: string) => void;
}

export default function PresetSelector({
  value,
  onChange,
}: PresetSelectorProps) {
  return (
    <div className="preset-selector">
      <label htmlFor="preset-select">Cover Type:</label>
      <select
        id="preset-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {PRESETS.map((preset) => (
          <option key={preset.id} value={preset.id}>
            {preset.label} ({preset.widthMm} x {preset.heightMm} mm)
          </option>
        ))}
      </select>
    </div>
  );
}
