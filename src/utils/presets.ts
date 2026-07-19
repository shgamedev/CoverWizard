// Cover art print presets.
// Dimensions are the physical print size (inches) for the front cover insert
// of common physical game cases, converted to pixels at the given DPI.

export interface CoverPreset {
  id: string;
  label: string;
  widthIn: number;
  heightIn: number;
  dpi: number;
}

export const PRESETS: CoverPreset[] = [
  // --- PlayStation ---
  {
    id: "ps1",
    label: "PS1 Case Cover (Jewel Case)",
    widthIn: 4.7244,
    heightIn: 6.7126,
    dpi: 300,
  },
  {
    id: "ps2",
    label: "PS2 Case Cover",
    widthIn: 5.35,
    heightIn: 7.5,
    dpi: 300,
  },
  {
    id: "ps3",
    label: "PS3 Case Cover (Blu-ray)",
    widthIn: 5.157,
    heightIn: 6.883,
    dpi: 300,
  },
  {
    id: "ps4",
    label: "PS4 Case Cover",
    widthIn: 5.4,
    heightIn: 6.7,
    dpi: 300,
  },
  {
    id: "ps5",
    label: "PS5 Case Cover",
    widthIn: 5.4,
    heightIn: 6.7,
    dpi: 300,
  },
  // --- Xbox ---
  {
    id: "xbox",
    label: "Original Xbox Case Cover",
    widthIn: 5.35,
    heightIn: 7.5,
    dpi: 300,
  },
  {
    id: "xbox-360",
    label: "Xbox 360 Case Cover",
    widthIn: 5.35,
    heightIn: 7.5,
    dpi: 300,
  },
  {
    id: "xbox-one",
    label: "Xbox One Case Cover",
    widthIn: 5.4,
    heightIn: 6.75,
    dpi: 300,
  },
  {
    id: "xbox-series",
    label: "Xbox Series X|S Case Cover",
    widthIn: 5.4,
    heightIn: 6.75,
    dpi: 300,
  },
  // --- Nintendo (cased consoles) ---
  {
    id: "gamecube",
    label: "GameCube Case Cover",
    widthIn: 4.17,
    heightIn: 5.83,
    dpi: 300,
  },
  {
    id: "wii",
    label: "Wii Case Cover",
    widthIn: 5.35,
    heightIn: 7.5,
    dpi: 300,
  },
  {
    id: "wiiu",
    label: "Wii U Case Cover",
    widthIn: 5.35,
    heightIn: 7.5,
    dpi: 300,
  },
  {
    id: "switch",
    label: "Nintendo Switch Case Cover",
    widthIn: 4.25,
    heightIn: 4.65,
    dpi: 300,
  },
  // --- Misc ---
  {
    id: "dvd",
    label: "Standard DVD Case Cover",
    widthIn: 5.4,
    heightIn: 7.55,
    dpi: 300,
  },
];

export function getPixelDimensions(preset: CoverPreset): {
  width: number;
  height: number;
} {
  return {
    width: Math.round(preset.widthIn * preset.dpi),
    height: Math.round(preset.heightIn * preset.dpi),
  };
}
