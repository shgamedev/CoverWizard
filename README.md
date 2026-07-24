# Cover Wizard

> ⚠️ **All presets are sized for PAL region cases only.** NTSC dimensions differ and are not currently supported.

# About

Web app designed to receive an image file of cover art for physical video games and prepare them for printing. The tool ensures that the output image files are the exact dimensions for printing so that lost or damaged slip covers can be seamlessly replaced.

All output files are rendered onto a full **A4 page at 300 DPI**. Simply print the downloaded file on A4 paper at **full page / fit to page** — no scaling adjustments needed. The cover art will be positioned at exactly the correct physical dimensions for the selected PAL case.

# How to Use

1. Navigate to [Cover Wizard](https://shgamedev.github.io/CoverWizard/)
1. Select your cover type from the **Cover Type (PAL)** dropdown
1. Drag or upload your cover art image
1. A preview will appear — download the file when ready
1. Print on **A4 paper** at **full page / fit to page** — the cover will be at exactly the right size
1. Cut out and insert into your case

# Printing Instructions

The downloaded PNG is an **A4 page (210 × 297 mm) at 300 DPI** with the cover art centered. This means:

- ✅ Print on **A4 paper**
- ✅ Set scaling to **Full page** or **Fit to page**
- ✅ No need to change any other print settings
- ❌ Do **not** use "Actual size / 100%", as that would rely on the app's embedded DPI metadata instead of the page layout

# Example Resources

- [The Cover Project](https://www.thecoverproject.net/view.php?cover_id=19444) - resource for cover images

# Required Input Image Dimensions

All presets are **PAL region** only. For best results your source image should **at least match** the pixel dimensions below (same aspect ratio — larger is fine, the app will scale it down). The output is always placed on a full A4 page so no print scaling adjustments are needed.

> **Formula:** `pixels = round(mm ÷ 25.4 × 300)`

## PlayStation

| Preset                          | Width (px) | Height (px) | Physical Size    |
| ------------------------------- | ---------- | ----------- | ---------------- |
| PS1 Front (Jewel Case)          | **1453**   | **1476**    | 123 × 125 mm     |
| PS1 Back/Tray Card (Jewel Case) | **1937**   | **1441**    | 164 × 122 mm     |
| PS2                             | **1604**   | **2250**    | 135.9 × 190.5 mm |
| PS3 (Blu-ray)                   | **1547**   | **2065**    | 131 × 174.8 mm   |
| PS4                             | **1620**   | **2010**    | 137.2 × 170.2 mm |
| PS5                             | **1620**   | **2010**    | 137.2 × 170.2 mm |

> **Note:** The PS1 Back/Tray Card is **landscape** orientation — your source image should be wider than it is tall.

## Xbox

| Preset           | Width (px) | Height (px) | Physical Size    |
| ---------------- | ---------- | ----------- | ---------------- |
| Original Xbox    | **1604**   | **2250**    | 135.9 × 190.5 mm |
| Xbox 360         | **1604**   | **2250**    | 135.9 × 190.5 mm |
| Xbox One         | **1620**   | **2026**    | 137.2 × 171.5 mm |
| Xbox Series X\|S | **1620**   | **2026**    | 137.2 × 171.5 mm |

## Nintendo

| Preset          | Width (px) | Height (px) | Physical Size    |
| --------------- | ---------- | ----------- | ---------------- |
| GameCube        | **1250**   | **1749**    | 105.9 × 148.1 mm |
| Wii             | **1604**   | **2250**    | 135.9 × 190.5 mm |
| Wii U           | **1604**   | **2250**    | 135.9 × 190.5 mm |
| Nintendo Switch | **1276**   | **1395**    | 108 × 118.1 mm   |
