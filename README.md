# BlogNest (12MegaBlog)

A lightweight React + Vite blog frontend built to demonstrate authentication, post CRUD, rich-text editing, and file uploads using Appwrite.

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

If you'd like, I can add environment examples, Appwrite setup steps (console screenshots), or a checklist for production readiness (CORS, secure buckets, indexes).
