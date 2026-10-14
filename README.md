# Technical Drawers

Technical Drawers is a React/Vite storefront with an Express and MongoDB API.
Use Node.js 18.11 or newer for the backend watch and test commands.

## Local setup

1. Install dependencies from the repository root:

   ```sh
   npm --prefix backend install
   npm --prefix frontend install
   ```

2. Copy `.env.example` to `backend/.env` and set the MongoDB URI, JWT secret,
   M-Pesa credentials and callback URL. Add any deployed frontend origins to
   `FRONTEND_ORIGINS` as a comma-separated list. Do not commit environment files.

3. Start the API and storefront in separate terminals:

   ```sh
   npm --prefix backend run dev
   npm --prefix frontend run dev
   ```

   The API defaults to port 5000. For local frontend development, set
   `VITE_API_URL=http://localhost:5000` in `frontend/.env.local` if the frontend
   should use the local API instead of its configured hosted API.

## Checks

```sh
npm --prefix backend test
npm --prefix frontend run build
```

The backend tests cover stock reservation rollback and idempotent release. A
live order/payment flow additionally requires a configured MongoDB database and
Safaricom M-Pesa credentials.

## Dependency security

The backend dependency audit is clean. The frontend audit still reports
advisories in the current Tailwind 3/Vite 4/React Router 6 dependency tree.
Clearing them with npm's available fix requires major upgrades to Tailwind 4,
Vite 8 and React Router 7, which are deferred to avoid an unreviewed styling,
build-tool and runtime migration.