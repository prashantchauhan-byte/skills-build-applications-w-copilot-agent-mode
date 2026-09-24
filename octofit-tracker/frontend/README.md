# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## OctoFit Tracker

The presentation tier runs on port `5173` and uses React Router for navigation. It reads the API host from `VITE_CODESPACE_NAME`.

Create `octofit-tracker/frontend/.env.local` for a GitHub Codespaces API:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend requests routes such as `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`. When `VITE_CODESPACE_NAME` is not defined, the API client safely falls back to `http://localhost:8000/api`, so local development does not generate an `https://undefined-8000...` URL.

Run the frontend from the workspace root with:

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
