## (Pranav is Typing)

A personal digital garden and "Now" page, featuring **Ghost Mode**—an invisible, zero-deploy visual editing layer.

## 👻 Ghost Mode

Ghost Mode is a custom visual editing architecture that allows the site owner to edit content directly on the live website without a CMS dashboard or code deployments.

### How it Works

1.  **Invisible by Default**: Public users see a standard, high-performance React application. The editing layer is not loaded.
2.  **The Lockbox**: A secure route (`/lockbox`) accepts a secret key. Upon validation, it sets an encrypted session token in the browser.
3.  **The Overlay**: When the site detects an authenticated owner, it mounts the **Ghost Overlay**. This layer identifies editable content using steganographic `data-ghost-id` attributes.
4.  **Visual Editing**: Hovering over content reveals a highlight box. Clicking opens the **Ghost Editor**.
5.  **Global Persistence**: Edits are securely pushed to **Sanity.io** via a serverless function (`/api/ghost/save`). The site then hydrates this content for all users globally.

### Architecture

- **Frontend**: React + Vite
- **CMS (Headless)**: Sanity.io. Content is stored using a flattened key strategy (e.g., `inputs_reading_0_title`) to ensure robust persistence for complex nested UI elements.
- **Auth**: Custom Key-based (Environment Variable verified)
- **Deployment**: Vercel

## Project Structure

- `src/ghost/`: Core Ghost Mode logic (Context, Overlay, Editor, Persistence).
- `src/pages/Lockbox.jsx`: Authentication entry point.
- `src/pages/Now.jsx`: The main "Now" page, fully instrumented with `LiveField` components.
- `api/ghost/`: Secure serverless functions for handling CMS writes.

## Local Development

1.  Clone the repo.
2.  Install dependencies: `npm install`
3.  Set environment variables in `.env`:
    - `VITE_GHOST_SECRET_KEY`
    - `VITE_SANITY_PROJECT_ID`
    - `SANITY_API_TOKEN` (Server-side only)
4.  Run dev server: `npm run dev`

---
*Built by Pranav Subramanian.*
