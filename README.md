# BlogNest (12MegaBlog)

A React + Vite blogging app with Appwrite authentication, rich text stories, and image uploads. The interface takes its cues from independent journals: warm paper, ink and rust tones, locally hosted Newsreader and DM Sans fonts, thin rules, and responsive editorial layouts.

## Interface

- A journal homepage with a typographic BlogNest masthead, a locally hosted writing photograph, and writing prompts.
- A journal index with title/content search, newest/oldest sorting, and a filter for your published stories. Search and sorting operate on the posts returned by Appwrite.
- Responsive story cards and a dedicated reading layout with reading times and publication dates.
- Login and signup forms with inline validation, password visibility controls, and pending states.
- A writing space with cover previews, word counts, stable post URLs, draft/published controls, and upload validation.
- Loading, empty, error, and missing-page states, keyboard focus styles, mobile navigation, and reduced-motion support.

The existing Appwrite schema is retained. Only active posts appear in the journal; drafts remain accessible through their direct links, subject to your Appwrite document permissions. Frontend route checks do not replace Appwrite permissions.

## Features (brief)

- Authentication (Appwrite)
  - Signup, login and session handling. Redux stores the authenticated user for guarding routes and showing user-specific UI.
- Protected routes & AuthLayout
  - Route wrappers that redirect unauthenticated users to login/signup.
- Post CRUD (Appwrite Database)
  - Create, edit, delete and view posts. Posts support status flags (e.g. `active`) used for filtered fetching.
- Rich text editor
  - TinyMCE integration with a graceful fallback to a textarea when the editor cannot load.
- Media handling (Appwrite Storage)
  - Upload featured images, store file IDs with posts, preview and delete files via the service layer.
- Forms & validation
  - Built with `react-hook-form` for performant forms, custom inputs wired via `forwardRef`, and client-side validation rules.
- State management
  - Auth state managed with Redux Toolkit (`src/store/authSlice.js`) and a single store in `src/store/store.js`.
- Component-driven UI
  - Reusable components in `src/components` (Header, Footer, Container, PostCard, Button, Input, Select, Logo, RTE).
- Dev tooling
  - Vite for fast dev server and HMR; simple build & preview scripts available.

## Architecture & important files

- `src/appwrite/config.js` — central Appwrite service wrapper (CRUD + file upload/delete). Use this for all Appwrite interactions.
- `src/appwrite/auth.js` — authentication helpers (login, logout, session, current user).
- `src/components/` — UI components and form controls.
- `src/pages/` — route pages (Home, AllPosts, Post, AddPost, EditPost, Login, Signup).
- `src/store/` — Redux slice and store configuration.
- `src/conf/conf.js` — project-specific Appwrite configuration (endpoint, projectId, database/collection/bucket ids).

## Appwrite configuration notes

- Create the database, collection and indexes (an index on `status` is required for queries like `Query.equal('status','active')`).
- Configure `src/conf/conf.js` with:
  - `appwriteUrl` (endpoint)
  - `appwriteProjectId`
  - `appwriteDatabaseId`
  - `appwriteCollectionId`
  - `appwriteBucketId`
- `createPost` uses `slug` as document id — ensure slug uniqueness or adapt behavior if you prefer auto-generated ids.

## Quick start

1. Install dependencies

   ```bash
   npm install
   ```

2. Update Appwrite config

   - Edit `src/conf/conf.js` with your Appwrite values.

3. Start dev server

   ```bash
   npm run dev
   ```

4. Build for production

   ```bash
   npm run build
   npm run preview
   ```

## Development tips

- Use `react-hook-form`'s `Controller` for controlled components (RTE) and `register` for native inputs.
- Pass objects to children (e.g. `post={post}`) when the child component owns destructuring.
- Centralize API logic in `src/appwrite/config.js` to simplify unit testing and mocking.

## UI configuration

Design tokens and base styles live in `src/index.css`; layouts and responsive rules live in `src/App.css`. Shared SVG icons are in `src/components/Icon.jsx`.

TinyMCE uses the existing project key by default. Set `VITE_TINYMCE_API_KEY` to your own key if needed. If the editor script fails to load or takes longer than 10 seconds to initialize, the writing form falls back to a plain text area. Existing HTML is preserved until the content is edited; the fallback explains that editing removes rich formatting.

The writing photograph is hosted locally in `public/writers-desk.jpg` ([source image on Unsplash](https://images.unsplash.com/photo-1455390582262-044cdead277a)). Fonts and their SIL Open Font Licenses are in `public/fonts/`; the interface does not request fonts from a third-party server.

## Design references

- [Paperpillar / Dwinawan — E-Magazine Editorial Layout on Dribbble](https://dribbble.com/shots/26279884-E-Magazine-Editorial-Layout): editorial hierarchy and bold typography.
- [Modern editorial website design on Pinterest](https://www.pinterest.com/pin/111956740730374617/): print-inspired rules, serif type, and varied content proportions.

These references informed the layout and typographic direction. Their artwork and content are not included in the app.
