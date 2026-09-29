# Plain HTML with one file per page per language

The site is hosted on GitHub Pages as hand-written static HTML with no build step. Danish and English are separate files (`/da/…` and `/en/…`), and a DA/EN switch in the header links each page to its counterpart. We chose this over JavaScript text-swapping (content invisible without JS and to search engines) and over a build step or Jekyll (extra tooling for occasional editors). We accept that shared facts, such as the race date, must be updated in both language files.
