# Plan: Move copenhagenharbourrace.dk to GitHub Pages

The current site runs on Orchard CMS (ASP.NET/IIS). We are rebuilding it as a static site.

## Decisions

1. **Tech**: hand-written HTML/CSS, no build step, no Jekyll. See [ADR 0001](docs/adr/0001-plain-html-one-file-per-language.md).
2. **Languages**: one file per page per language in `/da/` and `/en/`, with the same file names in both folders (e.g. `da/course.html` ↔ `en/course.html`). The DA/EN switch in the header links to the same page in the other language.
3. **Root `/`**: a small script sends visitors to `/da/` or `/en/` based on their browser language (Danish is the fallback). A language picked with the switch is remembered and overrides the automatic choice.
4. **Ownership**: the owner's personal GitHub account; only the owner edits the site.
5. **Hosting and domain**: build and review at `<user>.github.io/<repo>` first. At launch, point `copenhagenharbourrace.dk` to GitHub Pages by changing only the A/CNAME records. The MX (email) records stay unchanged, so `info@…` keeps working.
6. **Content**: the 8 pages are moved over **word for word** in both languages, with no rewriting. The news page is dropped and replaced by a Facebook group link.
7. **Course map**: the new map replaces the old route map on the course page (DA and EN). The shallow-area photos stay.
8. **Menu**: flat, with no dropdowns:
   `Home · Course · Classes · Prizes · Rules · Safety · Party · Addresses   Results ↗   DA | EN`
   On phones the site looks like an app: a compact sticky header and a bottom tab bar (Home · Course · Results · Party · More). "More" opens a sheet with the other pages and the language switch. Without JavaScript, phones get the full menu as a list.
9. **Results link**: `https://tilmeld.roning.dk/resultater.php?r=chr2026`, updated by hand each year.
10. **Design**: fresh and simple. Harbour blue and signal red from the map, clean type, a text-only header (name + date on a blue band). Footer: club logos, the sponsor line, Facebook, the email address.
11. **Shared header, menu and footer**: copied into all 16 files. Changes are made with find-and-replace across the folder.
12. **Old URLs**: no redirects. Old links get the standard GitHub Pages 404.
13. **Installable (PWA)**: the site has a web app manifest and app icons, so it can be added to the phone's home screen and opens without the browser's address bar. A service worker keeps a copy of all pages for use without signal. It always tries the network first, so edits show up straight away.

## Pages (Danish → English, current addresses)

| New file | Current DA | Current EN |
|---|---|---|
| index.html | / | /home |
| course.html | /banens-forløb | /race-course |
| classes.html | /løbsklasser | /race-classes |
| prizes.html | /præmier | /trophies |
| rules.html | /regler | /regleren-GB |
| safety.html | /sikkerhed-og-lavvandsomrader | /safety-and-shallow-areas |
| party.html | /fest | /party |
| addresses.html | /adresser | /addresses |

## Tasks

- [x] Scrape the DA and EN text and images (logos, shallow-area photos, address map) from the current site
- [x] Build the layout and CSS, including the mobile menu
- [x] Create the 16 pages and the language-detecting root `index.html`
- [x] Add the new course map (`img/course-map.jpg`)
- [ ] Replace the course map with the original high-resolution file (the current one is a 724×1024 WhatsApp copy)
- [ ] Create a GitHub repo, enable Pages, and review the site
- [ ] Find out who controls DNS for copenhagenharbourrace.dk
- [ ] Launch: add a `CNAME` file, change the A/CNAME records, enable HTTPS
