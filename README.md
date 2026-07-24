# Cover Wizard

# About

Web app designed to receive an image file of cover art for physical video games and prepare them for printing. The tool ensures that the output image files are the exact dimensions for printing so that lost or damaged slip covers can be seamlessly replaced.

# How to Use

1. Navigate to [Cover Wizard](https://shgamedev.github.io/CoverWizard/)
1. Drag or upload your image file to the input element on the webpage
1. Your image will be processed and will download in your browser automatically
1. Print your image

# Example Resources

- [The Cover Project](https://www.thecoverproject.net/view.php?cover_id=19444) - resource for cover images

# Required Input Image Dimensions

For best results, your source image should **at least match** the dimensions below (same aspect ratio, larger is fine). When printing, always set scaling to **100% / actual size** — never "fit to page".

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

> **Note:** The PS1 Back/Tray Card is **landscape** orientation — your source image should be wider than it is tall.
