# Entrepot Royals — GitHub and Netlify

1. Extract this ZIP.
2. Push all extracted files to the root of a GitHub repository.
3. In Netlify, select **Add new site → Import an existing project**.
4. Choose the GitHub repository and deploy.

Netlify reads these settings automatically from `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `out`
- No environment variables required
