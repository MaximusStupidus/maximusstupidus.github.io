# Personal site

Plain, hand-written static HTML in the spirit of paulgraham.com, set in
Montserrat. No build step, no dependencies, nothing to install.

## Files

```
index.html          Homepage: name, intro, links to each section, contact
projects.html       Projects
cv.html             CV
blog.html           List of blog posts (newest first)
reading.html        Bookshelf
notes.html          Short-form notes/links, all inline
quotes.html         Favourite quotes
puzzles.html        Interesting math puzzles (click-to-reveal solutions)
contact.html        Contact + a mailto form
posts/              One HTML file per blog post
_template-post.html Copy this to start a new post
favicon.svg         The tab icon (a black circle)
style.css           The whole site's styling — edit here, changes everywhere
```

## Editing content

Open any `.html` file and replace the text in `[square brackets]`. The
`#` placeholder links (GitHub / X / LinkedIn in the footers) need your real
URLs. The footer is repeated on each page — update it everywhere, or change
the markup once and copy it across.

## Adding a blog post

1. Copy `_template-post.html` into `posts/`, e.g.
   `posts/2026-06-15-my-essay.html`.
2. Fill in the title, date, and paragraphs.
3. Add one line near the top of the list in `blog.html`:
   ```html
   <div class="entry">
     <a href="posts/2026-06-15-my-essay.html">My essay title</a>
     <span class="date">— 2026-06-15</span>
   </div>
   ```

## Visitor counter (GoatCounter)

The footer shows a live total visit count via [GoatCounter](https://www.goatcounter.com)
(free, privacy-friendly, no cookies). To turn it on:

1. Sign up at [goatcounter.com](https://www.goatcounter.com) — pick a code, e.g.
   `ojasjain`. Your stats URL becomes `https://ojasjain.goatcounter.com`.
2. In the site files, find-and-replace every `YOURCODE` with your code.
   It appears twice in each page (the tracking script + the count fetch),
   in all the `.html` files including `_template-post.html`.
3. In GoatCounter → Settings, enable **"Allow adding visitor counts to your
   website"** so the live count can display.

Notes:
- The count only registers real hits once the site is on a live URL — it
  won't count when you open the files locally.
- Until you swap in a real code (or while offline), the count simply stays
  hidden; nothing breaks.

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
