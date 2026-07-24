// Cover art print presets.
// All presets are for PAL region physical cases.
// Dimensions are the physical print size (mm) for the front cover insert
// of common physical game cases, converted to pixels at the given DPI.

export interface CoverPreset {
  id: string;
  label: string;
  widthMm: number;
  heightMm: number;
  dpi: number;
}

export const PRESETS: CoverPreset[] = [
  // --- PlayStation ---
  {
    id: "ps1-front",
    label: "PS1 Case Cover - Front (Jewel Case)",
    widthMm: 122,
    heightMm: 123,
    dpi: 300,
  },
  {
    id: "ps1-back",
    label: "PS1 Case Cover - Back/Tray Card (Jewel Case)",
    widthMm: 164,
    heightMm: 122,
    dpi: 300,
  },
  {
    id: "ps2",
    label: "PS2 Case Cover",
    widthMm: 135.9,
    heightMm: 190.5,
    dpi: 300,
  },
  {
    id: "ps3",
    label: "PS3 Case Cover (Blu-ray)",
    widthMm: 131,
    heightMm: 174.8,
    dpi: 300,
  },
  {
    id: "ps4",
    label: "PS4 Case Cover",
    widthMm: 137.2,
    heightMm: 170.2,
    dpi: 300,
  },
  {
    id: "ps5",
    label: "PS5 Case Cover",
    widthMm: 137.2,
    heightMm: 170.2,
    dpi: 300,
  },
  // --- Xbox ---
  {
    id: "xbox",
    label: "Original Xbox Case Cover",
    widthMm: 135.9,
    heightMm: 190.5,
    dpi: 300,
  },
  {
    id: "xbox-360",
    label: "Xbox 360 Case Cover",
    widthMm: 135.9,
    heightMm: 190.5,
    dpi: 300,
  },
  {
    id: "xbox-one",
    label: "Xbox One Case Cover",
    widthMm: 137.2,
    heightMm: 171.5,
    dpi: 300,
  },
  {
    id: "xbox-series",
    label: "Xbox Series X|S Case Cover",
    widthMm: 137.2,
    heightMm: 171.5,
    dpi: 300,
  },
  // --- Nintendo (cased consoles) ---
  {
    id: "gamecube",
    label: "GameCube Case Cover",
    widthMm: 105.9,
    heightMm: 148.1,
    dpi: 300,
  },
  {
    id: "wii",
    label: "Wii Case Cover",
    widthMm: 135.9,
    heightMm: 190.5,
    dpi: 300,
  },
  {
    id: "wiiu",
    label: "Wii U Case Cover",
    widthMm: 135.9,
    heightMm: 190.5,
    dpi: 300,
  },
  {
    id: "switch",
    label: "Nintendo Switch Case Cover",
    widthMm: 108,
    heightMm: 118.1,
    dpi: 300,
  },
];

const MM_PER_INCH = 25.4;

export function getPixelDimensions(preset: CoverPreset): {
  width: number;
  height: number;
} {
  return {
    width: Math.round((preset.widthMm / MM_PER_INCH) * preset.dpi),
    height: Math.round((preset.heightMm / MM_PER_INCH) * preset.dpi),
  };
}
