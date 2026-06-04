/*
 * Visit counter — Cloudflare Worker.
 *
 * Increments a single value in a KV namespace (bound as COUNTER) and
 * returns it as JSON:  { "count": 1234 }
 *
 *   GET /          increment, then return the new count
 *   GET /?peek=1   return the current count WITHOUT incrementing
 *
 * CORS is locked to the site origin(s) listed in ALLOW_ORIGINS.
 *
 * Note: KV is eventually consistent and not transactional, so two visits
 * landing in the same instant can occasionally share a number (slight
 * undercount under heavy concurrent load). Fine for a personal site.
 */

const ALLOW_ORIGINS = [
  "https://jainojas.com",
  "https://www.jainojas.com",
  "https://maximusstupidus.github.io",
];

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowOrigin = ALLOW_ORIGINS.includes(origin) ? origin : ALLOW_ORIGINS[0];
    const cors = {
      "Access-Control-Allow-Origin": allowOrigin,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Vary": "Origin",
      "Cache-Control": "no-store",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    const peek = new URL(request.url).searchParams.has("peek");

    let count = parseInt(await env.COUNTER.get("count"), 10) || 0;
    if (!peek) {
      count += 1;
      await env.COUNTER.put("count", String(count));
    }

    return new Response(JSON.stringify({ count }), {
      headers: { ...cors, "Content-Type": "application/json" },
    });
  },
};
