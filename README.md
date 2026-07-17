# EIM Research Lab Website

Official website of the Enterprise Infrastructure Management (EIM) Research Lab, Faculty of Industrial Engineering, Telkom University. This project is built using **Astro v7** as the Static Site Generator (SSG) and **Tailwind CSS v4** for styling.

## Key Technologies

- **Framework**: [Astro v7.0.9](https://astro.build/)
- **Styling**: [Tailwind CSS v4.0.0](https://tailwindcss.com/) via `@tailwindcss/vite`
- **Language**: TypeScript
- **Runtime**: Node.js v22

## Directory Structure

- `src/content.config.ts`: Defines Zod schemas and loaders for static markdown content collections (`news`, `events`).
- `src/content/`: Contains static Markdown files representing news articles and laboratory events.
- `src/data/`: Contains JSON files (`site.json`, `members.json`, `divisions.json`, `registration.json`) for easy website-wide metadata and team configuration, and `CONFIG_GUIDE.md`.
- `src/pages/`: File-system routing directories for Astro.
- `src/layouts/`: Base wrapper page layout (`Layout.astro`).
- `src/components/`: Reusable components such as `Navbar.astro` and `Footer.astro`.
- `src/styles/`: Global stylesheet (`globals.css`).
- `public/`: Static folder hosting images, logos, and assistant profiles.

## Website Configuration

The website's metadata, laboratory divisions, active members, and registration settings can be easily customized by editing the JSON files in `src/data/`.

For detailed instructions and schema templates, refer to the [Configuration Guide](src/data/CONFIG_GUIDE.md).

## Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Access the local site via [http://localhost:4321](http://localhost:4321).

3. **Type-Checking & Diagnostics**:
   ```bash
   npx astro check
   ```

4. **Production Build**:
   ```bash
   npm run build
   ```
   The compiled static files will be exported to the `dist/` directory.

## Google Sheets Integration (Registration)

The assistant registration form submits data asynchronously to a Google Sheets Apps Script URL. Make sure to configure the environment variable in `.env` (not tracked in version control):
```env
PUBLIC_GOOGLE_SHEET_SCRIPT_URL=your_script_apps_url_here
```