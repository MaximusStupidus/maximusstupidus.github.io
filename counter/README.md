# Visit counter (Cloudflare Worker + KV)

A tiny self-owned backend for the site's footer visit count. Not part of the
website itself — it's deployed separately to Cloudflare's free tier.

- `worker.js` — the Worker: increments one KV value and returns `{ "count": N }`.
- `wrangler.toml` — config (Worker name + KV binding).

## Deploy

All commands run from this `counter/` folder. `npx` pulls wrangler on demand
(nothing to install globally).

1. **Log in to Cloudflare** (one-time, interactive — opens a browser):
   ```
   npx wrangler login
   ```
2. **Create the KV namespace**, then paste the printed `id` into
   `wrangler.toml` (replacing `PASTE_KV_NAMESPACE_ID_HERE`):
   ```
   npx wrangler kv namespace create COUNTER
   ```
3. **Deploy:**
   ```
   npx wrangler deploy
   ```
   Wrangler prints the live URL, e.g.
   `https://ojas-visit-counter.<your-subdomain>.workers.dev`.

4. Give that URL to wire into the site footer (it replaces the GoatCounter
   snippet on every page).

## Endpoints

- `GET /` — increment, return the new count.
- `GET /?peek=1` — read the current count without incrementing.

## Notes

- CORS is locked to the site origin in `worker.js` (`ALLOW_ORIGINS`). Add a
  custom domain there later.
- To reset or seed the count:
  `npx wrangler kv key put --binding=COUNTER count 0` (with `--remote`).
