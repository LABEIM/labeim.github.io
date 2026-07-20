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

## Vercel Deployment & Keystatic CMS Setup

This project uses **Keystatic CMS** for content management, stored in Git and deployed seamlessly to **Vercel**. When deployed, Keystatic uses GitHub OAuth to allow authorized administrators to save edits directly to the GitHub repository.

### 1. Deploying to Vercel
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New** -> **Project**.
3. Import your repository. Vercel will automatically detect Astro and apply the correct build settings.

### 2. Setting up GitHub OAuth for Keystatic CMS
To enable login on your live website (e.g., `https://your-site.vercel.app/keystatic`):
1. In GitHub, go to your profile **Settings** -> **Developer Settings** -> **OAuth Apps** -> **New OAuth App**.
2. Fill out the registration form:
   - **Application Name**: `EIM Lab CMS` (or any description)
   - **Homepage URL**: `https://your-site.vercel.app` (your Vercel deployment URL)
   - **Authorization callback URL**: `https://your-site.vercel.app/api/keystatic/github/callback`
3. Click **Register application**.
4. Generate a **Client Secret** and copy both the **Client ID** and **Client Secret**.

### 3. Adding Vercel Environment Variables
In your Vercel project dashboard, go to **Settings** -> **Environment Variables** and add:

| Key | Value | Description |
| --- | --- | --- |
| `PUBLIC_GOOGLE_SHEET_SCRIPT_URL` | `https://script.google.com/macros/...` | The URL of your Google Apps Script handler |
| `KEYSTATIC_GITHUB_CLIENT_ID` | `Iv1.xxxxxxxxxxxx` | The Client ID from your GitHub OAuth App |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | `xxxxxxxxxxxxxxxxxxxxxxxx` | The Client Secret from your GitHub OAuth App |
| `KEYSTATIC_SECRET` | `any_long_random_string` | A secret key used to sign the Keystatic session cookie |

Deploy/Redeploy the project. Administrators can now access the CMS at `https://your-site.vercel.app/keystatic` and log in via GitHub to manage the site!