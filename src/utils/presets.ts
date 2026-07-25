// Cover art print presets.
// All presets are for PAL region physical cases.
// Dimensions are the physical print size (mm), converted to pixels at the given DPI.

export interface CoverSlot {
  id: string;
  label: string;
  widthMm: number;
  heightMm: number;
}

export interface CoverPreset {
  id: string;
  label: string;
  dpi: number;
  pageOrientation: "portrait" | "landscape";
  uploadType: "multi-part" | "full-wrap";
  slots: CoverSlot[];
}

const wrapWidthMm = (panelWidthMm: number, spineWidthMm: number): number =>
  panelWidthMm * 2 + spineWidthMm;

const SPINE_MM = {
  dvd: 14,
  bluray: 14,
  gamecube: 12,
  switch: 10,
} as const;

// Empirical calibration from physical print tests:
// PS2 full-wrap was ~15 mm too wide and ~9 mm too tall at previous values.
const CALIBRATED_MM = {
  ps2LikeWrap: {
    width: 270.8,
    height: 181.5,
  },
} as const;

export const PRESETS: CoverPreset[] = [
  // --- PlayStation ---
  {
    id: "ps1",
    label: "PS1 Case Cover (Jewel Case)",
    dpi: 300,
    pageOrientation: "portrait",
    uploadType: "multi-part",
    slots: [
      { id: "front", label: "Front Insert", widthMm: 122, heightMm: 123 },
      { id: "back", label: "Back / Tray Card", widthMm: 164, heightMm: 122 },
    ],
  },
  {
    id: "ps2",
    label: "PS2 Full Wrap Cover",
    dpi: 300,
    pageOrientation: "landscape",
    uploadType: "full-wrap",
    slots: [
      {
        id: "cover",
        label: "Full Wrap",
        widthMm: CALIBRATED_MM.ps2LikeWrap.width,
        heightMm: CALIBRATED_MM.ps2LikeWrap.height,
      },
    ],
  },
  {
    id: "ps3",
    label: "PS3 Full Wrap Cover (Blu-ray)",
    dpi: 300,
    pageOrientation: "landscape",
    uploadType: "full-wrap",
    slots: [
      {
        id: "cover",
        label: "Full Wrap",
        widthMm: wrapWidthMm(131, SPINE_MM.bluray),
        heightMm: 174.8,
      },
    ],
  },
  {
    id: "ps4",
    label: "PS4 Full Wrap Cover",
    dpi: 300,
    pageOrientation: "landscape",
    uploadType: "full-wrap",
    slots: [
      {
        id: "cover",
        label: "Full Wrap",
        widthMm: wrapWidthMm(137.2, SPINE_MM.bluray),
        heightMm: 170.2,
      },
    ],
  },
  {
    id: "ps5",
    label: "PS5 Full Wrap Cover",
    dpi: 300,
    pageOrientation: "landscape",
    uploadType: "full-wrap",
    slots: [
      {
        id: "cover",
        label: "Full Wrap",
        widthMm: wrapWidthMm(137.2, SPINE_MM.bluray),
        heightMm: 170.2,
      },
    ],
  },
  // --- Xbox ---
  {
    id: "xbox",
    label: "Original Xbox Full Wrap Cover",
    dpi: 300,
    pageOrientation: "landscape",
    uploadType: "full-wrap",
    slots: [
      {
        id: "cover",
        label: "Full Wrap",
        widthMm: wrapWidthMm(135.9, SPINE_MM.dvd),
        heightMm: 190.5,
      },
    ],
  },
  {
    id: "xbox-360",
    label: "Xbox 360 Full Wrap Cover",
    dpi: 300,
    pageOrientation: "landscape",
    uploadType: "full-wrap",
    slots: [
      {
        id: "cover",
        label: "Full Wrap",
        widthMm: wrapWidthMm(135.9, SPINE_MM.dvd),
        heightMm: 190.5,
      },
    ],
  },
  {
    id: "xbox-one",
    label: "Xbox One Full Wrap Cover",
    dpi: 300,
    pageOrientation: "landscape",
    uploadType: "full-wrap",
    slots: [
      {
        id: "cover",
        label: "Full Wrap",
        widthMm: wrapWidthMm(137.2, SPINE_MM.bluray),
        heightMm: 171.5,
      },
    ],
  },
  {
    id: "xbox-series",
    label: "Xbox Series X|S Full Wrap Cover",
    dpi: 300,
    pageOrientation: "landscape",
    uploadType: "full-wrap",
    slots: [
      {
        id: "cover",
        label: "Full Wrap",
        widthMm: wrapWidthMm(137.2, SPINE_MM.bluray),
        heightMm: 171.5,
      },
    ],
  },
  // --- Nintendo (cased consoles) ---
  {
    id: "gamecube",
    label: "GameCube Full Wrap Cover",
    dpi: 300,
    pageOrientation: "landscape",
    uploadType: "full-wrap",
    slots: [
      {
        id: "cover",
        label: "Full Wrap",
        // Keep GameCube locked to PS2 physical size by design.
        widthMm: CALIBRATED_MM.ps2LikeWrap.width,
        heightMm: CALIBRATED_MM.ps2LikeWrap.height,
      },
    ],
  },
  {
    id: "wii",
    label: "Wii Full Wrap Cover",
    dpi: 300,
    pageOrientation: "landscape",
    uploadType: "full-wrap",
    slots: [
      {
        id: "cover",
        label: "Full Wrap",
        widthMm: wrapWidthMm(135.9, SPINE_MM.dvd),
        heightMm: 190.5,
      },
    ],
  },
  {
    id: "wiiu",
    label: "Wii U Full Wrap Cover",
    dpi: 300,
    pageOrientation: "landscape",
    uploadType: "full-wrap",
    slots: [
      {
        id: "cover",
        label: "Full Wrap",
        widthMm: wrapWidthMm(135.9, SPINE_MM.dvd),
        heightMm: 190.5,
      },
    ],
  },
  {
    id: "switch",
    label: "Nintendo Switch Full Wrap Cover",
    dpi: 300,
    pageOrientation: "landscape",
    uploadType: "full-wrap",
    slots: [
      {
        id: "cover",
        label: "Full Wrap",
        widthMm: wrapWidthMm(108, SPINE_MM.switch),
        heightMm: 118.1,
      },
    ],
  },
];

const MM_PER_INCH = 25.4;

export function getSlotPixelDimensions(
  slot: CoverSlot,
  dpi: number,
): { width: number; height: number } {
  return {
    width: Math.round((slot.widthMm / MM_PER_INCH) * dpi),
    height: Math.round((slot.heightMm / MM_PER_INCH) * dpi),
  };
}
