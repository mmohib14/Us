# ApexGutters

The site uses Next.js with static export. Public routes are generated as HTML during the build, while the Express server continues to provide the quote, inspection, calculator, and newsletter APIs.

## Run locally

1. Install dependencies with `npm install`.
2. Start the Next.js development server and API with `npm run dev`.
3. Generate the static site with `npm run build`; the exported pages are written to `out/`.
4. Serve the export and API with `npm start` after building.

The configured canonical domain is `https://www.apexgutters.com`.
