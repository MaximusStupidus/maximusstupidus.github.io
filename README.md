# Personal site

Plain, hand-written static HTML in the spirit of paulgraham.com, set in
Montserrat. No build step, no dependencies, nothing to install.

## Files

```
index.html          Homepage: name, intro, links to each section, contact
projects.html       Projects
cv.html             CV
essays.html         List of essays (newest first)
reading.html        Bookshelf
quotes.html         Favourite quotes
puzzles.html        Interesting math puzzles (click-to-reveal solutions)
contact.html        Contact + a mailto form
posts/              One HTML file per essay
_template-post.html Copy this to start a new essay
favicon.svg         The tab icon (a black circle)
style.css           The whole site's styling — edit here, changes everywhere
```

## Editing content

Open any `.html` file and replace the text in `[square brackets]`. The
`#` placeholder links (GitHub / X / LinkedIn in the footers) need your real
URLs. The footer is repeated on each page — update it everywhere, or change
the markup once and copy it across.

## Adding an essay

1. Copy `_template-post.html` into `posts/`, e.g.
   `posts/2026-06-15-my-essay.html`.
2. Fill in the title, date, and paragraphs.
3. Add one line near the top of the list in `essays.html`:
   ```html
   <div class="entry">
     <a href="posts/2026-06-15-my-essay.html">My essay title</a>
     <span class="date">— 2026-06-15</span>
   </div>
   ```

## Visitor counter (self-hosted)

The footer shows a live total visit count from our own backend — a tiny
Cloudflare Worker + KV store, no third-party analytics. The Worker code and
deploy steps live in [`counter/`](counter/).

- **Endpoint:** `https://ojas-visit-counter.ojas-lucifer.workers.dev/`
  (`GET /` increments and returns `{count}`, `GET /?peek=1` reads without
  incrementing).
- Each page's footer fetches it; the `.visits` span reveals itself once a
  count comes back. If the fetch fails (offline, etc.) it just stays hidden.
- To change/redeploy the Worker, see `counter/README.md`. To reset the count:
  `cd counter && npx wrangler kv key put count 0 --binding=COUNTER --remote`.

Note: the count only moves on a live URL — opening the files locally still
fires the fetch, but you'll usually want to watch it on the deployed site.

## Contact form

`contact.html` has a plain `mailto:` form: submitting it opens the visitor's
own email app with the message pre-filled to your address. No backend, no
third party. To change the destination, edit the `action="mailto:..."` on the
`<form>` (and the email link in the paragraph above it).

## Adding a math puzzle

In `puzzles.html`, copy this block and fill it in (the `<details>` gives the
click-to-reveal; no JavaScript involved):

```html
<h2>N. Puzzle title</h2>
<p>The question...</p>
<!-- optional: <figure class="diagram"><svg ...>...</svg><figcaption>...</figcaption></figure> -->
<details>
  <summary>Show solution</summary>
  <div class="solution"><p>The solution...</p></div>
</details>
```

Diagrams are hand-written inline `<svg>` — no libraries. Use `.fml` for small
formulae and `<sub>`/`<sup>` for subscripts/superscripts.

## Changing the look

Everything visual lives in `style.css`. To swap the font, change the
`font-family` line in `body` and the Google Fonts `<link>` in each page's
`<head>`.

## Viewing locally

Just open `index.html` in a browser — relative links between pages work from
the filesystem. (Montserrat loads from Google Fonts, so the font needs an
internet connection; everything else works offline.)

## Deploying

Because it's plain static files with relative links, it works on any static
host as-is. Easiest path — **GitHub Pages**:

1. Push this folder to a GitHub repo.
2. Repo → Settings → Pages → Source: `main` branch, `/ (root)`.
3. Your site is live at `https://<username>.github.io/<repo>/`.

Alternatives: drag the folder onto [Netlify Drop](https://app.netlify.com/drop),
or any host that serves files.
