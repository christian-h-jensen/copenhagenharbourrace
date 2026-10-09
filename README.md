# copenhagenharbourrace.dk

Static site for Copenhagen Harbour Race, hosted on GitHub Pages. Plain HTML/CSS, with no build step. Instructions for AI coding agents are in [AGENTS.md](AGENTS.md).

```
index.html      picks /da/ or /en/ from the browser language (or the language last picked with the switch)
da/*.html       Danish pages
en/*.html       English pages (same file names as da/)
css/style.css   all styling
js/site.js      phone "More" sheet, race date and countdown, remembers the DA/EN choice, registers sw.js
sw.js           offline copy of the pages (network first, cache as fallback)
manifest.webmanifest  makes the site installable ("Add to Home Screen")
img/            map, photos, logos, app icons (icon.svg is the source)
.nojekyll       tells GitHub Pages not to run Jekyll
```

## Preview locally

```
python -m http.server 8000
```

Then open http://localhost:8000.

## Editing

- Edit the text directly in `da/<page>.html` and the matching `en/<page>.html`.
- If you add or rename a page or image, update the `PRECACHE` list in `sw.js` and bump `VERSION`.
- The header, menu, bottom tab bar and footer are copied into all 16 pages. To change them, use find-and-replace across the `da/` and `en/` folders.

## Yearly update checklist

Use find-and-replace across all files:

- [ ] Race date in the header: `Lørdag 10. oktober 2026` / `Saturday 10 October 2026`. Optional: `js/site.js` already shows the right date (second Saturday of October, moving on to next year the day after the race), so this text is only seen without JavaScript.
- [ ] Results link: `r=chr2026` → `r=chr<new year>`
- [ ] Front page (`index.html`): welcome text and programme
- [ ] Party page (`party.html`): ticket deadline, Billetto link, menu, prices
- [ ] New course map? Replace `img/course-map.jpg` (and update `width`/`height` in `course.html` if the size changes)
