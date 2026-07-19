# Development Guide

Instructions for running Cover Wizard locally.

## Prerequisites

- [Node.js](https://nodejs.org/) v20 or later (includes npm)
- Git

## Setup

1. Clone the repository:

   ```
   git clone https://github.com/<your-username>/CoverWizard.git
   cd CoverWizard
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the app locally

Start the Vite development server:

```
npm run dev
```

The app will be available at the URL printed in the terminal (typically `http://localhost:5173`). The dev server supports hot module reloading, so changes to source files are reflected instantly in the browser.

## Building for production

To generate an optimized static build in the `dist/` folder:

```
npm run build
```

## Previewing a production build locally

After running `npm run build`, you can preview the built output with:

```
npm run preview
```

## Linting

To check code style and catch issues:

```
npm run lint
```

## Deployment

Pushing to the `main` branch automatically triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the app and publishes the `dist/` folder to GitHub Pages.

To enable this the first time:

1. In the GitHub repo, go to **Settings > Pages**.
2. Under **Build and deployment > Source**, select **GitHub Actions**.
3. Push to `main` (or manually trigger the workflow from the **Actions** tab).

The site will be published at:

```
https://<your-username>.github.io/CoverWizard/
```

## Project Structure

```
src/
  components/     # UI components (Dropzone, PresetSelector, PreviewCanvas, DownloadButton)
  utils/
    presets.ts            # Cover dimension presets (console/case types, DPI, pixel size)
    imageProcessing.ts    # Canvas-based resize/crop and export logic
  App.tsx         # Main application component
  main.tsx        # React entry point
```
