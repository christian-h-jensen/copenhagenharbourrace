# AGENTS.md

Guidance for AI coding agents working on this repo. See [README.md](README.md) for the file layout, local preview and the yearly update checklist.

## The site

Copenhagen Harbour Race is an annual international rowing regatta for eights, inriggers and coastal boats in Copenhagen's harbour, organised by Københavns Roklub and Bryggens Roklub. This repo is its website, hosted on GitHub Pages.

- Hand-written static HTML and CSS. No build step, no Jekyll, no frameworks. Don't add any.
- One file per page per language: `da/<page>.html` and `en/<page>.html` with the same file names. Every change to page content goes into both files. Shared facts, such as the race date, must be updated in both languages.
- The DA/EN switch in the header links each page to its counterpart in the other language.
- The header, menu, bottom tab bar and footer are copied into all 16 pages. Change them with find-and-replace across `da/` and `en/`.
- If you add, remove or rename a page or image, update `PRECACHE` in `sw.js` and bump `VERSION`.

## Content rules

- The text was moved over word for word from the old site. Only fix obvious spelling and grammar typos. Don't reword, even when a translation looks wrong.
- If a translation looks wrong or pages contradict each other, leave the text and tell the owner.
- Where English and Danish differ, the Danish rules apply. Each section of `en/rules.html` carries the note "(If there are differences between the Danish and English rules the Danish are applicable)". Keep it on any new rules section.
- Some differences between the languages are on purpose, e.g. the extra cox bullet on `en/safety.html`, which is meant for international crews.

## Terms

- **Copenhagen Harbour Race**: spelled "Harbour" (British), matching the domain.
- **Club names in English**: "Copenhagen Rowing Club" for Københavns Roklub (KR). "Bryggens Roklub" and "ARK" (Amager Ro- og Kajakklub) stay in Danish.
- **Roklubben SAS / SAS Rowing Club** no longer exists. Bryggens Roklub has taken over its facilities.
- **Course** (DA *Banen*), **Race class** (DA *Løbsklasse*), **Party** (DA *Fest*).
- **Results** are published on the DFfR registration system (tilmeld.roning.dk), not on this site.
