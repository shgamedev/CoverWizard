# Cover Wizard

> ⚠️ **All presets are sized for PAL region cases only.** NTSC dimensions differ and are not currently supported.

# About

Web app designed to receive an image file of cover art for physical video games and prepare them for printing. The tool ensures that the output image files are the exact dimensions for printing so that lost or damaged slip covers can be seamlessly replaced.

All output files are rendered onto a full **A4 page at 300 DPI**. Simply print the downloaded file on A4 paper at **full page / fit to page** — no scaling adjustments needed. The cover art will be positioned at exactly the correct physical dimensions for the selected PAL case.

Some presets are now based on **empirical print calibration** (physical test prints) rather than only nominal case specs, to better match real-world output.

The app has two preview modes:

- **Content Preview**: zoomed cover-only view for easier visual inspection
- **A4 Print Layout**: full-page composition view that matches print framing

# How to Use

1. Navigate to [Cover Wizard](https://shgamedev.github.io/CoverWizard/)
1. Select your cover type from the **Cover Type** dropdown
1. Drag or upload your cover art image
1. A preview will appear — download the file when ready
1. Print on **A4 paper** at **full page / fit to page** — the cover will be at exactly the right size
1. Cut out and insert into your case

# Printing Instructions

The downloaded PNG is an **A4 page (210 × 297 mm) at 300 DPI** with the cover art centered. This means:

- ✅ Print on **A4 paper**
- ✅ Set orientation to match the selected preset (**Portrait** for PS1, **Landscape** for most full-wrap presets)
- ✅ Set scaling to **Full page** or **Fit to page**
- ✅ No need to change any other print settings
- ❌ Do **not** use "Actual size / 100%", as that would rely on the app's embedded DPI metadata instead of the page layout

# Example Resources

- [The Cover Project](https://www.thecoverproject.net/) - resource for cover images

# Required Input Image Dimensions

All presets are **PAL region** only. For best results your source image should **at least match** the pixel dimensions below (same aspect ratio — larger is fine, the app will scale it down). The output is always placed on a full A4 page so no print scaling adjustments are needed.

Input expectations:

- **PS1** expects two separate uploads (Front Insert and Back / Tray Card)
- **All single-slot presets** expect one **full-wrap** image (back + spine + front)

> **Formula:** `pixels = round(mm ÷ 25.4 × 300)`

## PlayStation

| Preset                          | Width (px) | Height (px) | Physical Size    |
| ------------------------------- | ---------- | ----------- | ---------------- |
| PS1 Front (Jewel Case)          | **1441**   | **1453**    | 122 × 123 mm     |
| PS1 Back/Tray Card (Jewel Case) | **1937**   | **1441**    | 164 × 122 mm     |
| PS2 Full Wrap                   | **3198**   | **2144**    | 270.8 × 181.5 mm |
| PS3 Full Wrap (Blu-ray)         | **3260**   | **2065**    | 276 × 174.8 mm   |
| PS4 Full Wrap                   | **3406**   | **2010**    | 288.4 × 170.2 mm |
| PS5 Full Wrap                   | **3406**   | **2010**    | 288.4 × 170.2 mm |

> **Note:** The PS1 Back/Tray Card is **landscape** orientation — your source image should be wider than it is tall.

## Xbox

| Preset                     | Width (px) | Height (px) | Physical Size    |
| -------------------------- | ---------- | ----------- | ---------------- |
| Original Xbox Full Wrap    | **3376**   | **2250**    | 285.8 × 190.5 mm |
| Xbox 360 Full Wrap         | **3376**   | **2250**    | 285.8 × 190.5 mm |
| Xbox One Full Wrap         | **3406**   | **2026**    | 288.4 × 171.5 mm |
| Xbox Series X\|S Full Wrap | **3406**   | **2026**    | 288.4 × 171.5 mm |

## Nintendo

| Preset                    | Width (px) | Height (px) | Physical Size    |
| ------------------------- | ---------- | ----------- | ---------------- |
| GameCube Full Wrap        | **3198**   | **2144**    | 270.8 × 181.5 mm |
| Wii Full Wrap             | **3376**   | **2250**    | 285.8 × 190.5 mm |
| Wii U Full Wrap           | **3376**   | **2250**    | 285.8 × 190.5 mm |
| Nintendo Switch Full Wrap | **2669**   | **1395**    | 226 × 118.1 mm   |

# Calibration Notes

- **PS2 Full Wrap** and **GameCube Full Wrap** are intentionally locked to the same calibrated size: **270.8 × 181.5 mm** (**3198 × 2144 px** at 300 DPI).
- If prints are still slightly off, verify printer options first:
  - paper size = **A4**
  - orientation = matches selected preset
  - scaling = **Full page** or **Fit to page**
  - any printer "borderless expansion" or "shrink oversized pages" options = disabled
- Recalibration method used in this project:
  - measure printed width/height error in mm
  - subtract overage (or add shortage) from preset mm values
  - regenerate and reprint for verification
