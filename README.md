# Wingstop Frontend Prototype

A static frontend prototype for a Wingstop global brand site. Built with zero dependencies, no build tools, and deployed via GitHub Pages.

**Live site:** https://wsrkim.github.io/frontendprototype/

---

## Pages

| Route | Title | Description |
|---|---|---|
| `/` | Home | Video hero, Global Flavor Atlas, world map, podcast section |
| `/about/` | About | Brand story, timeline, company pillars |
| `/international/` | International | Global regions (US flagship, AMRS, EMEA, APAC), market spotlight, expansion |
| `/events/` | Events | Wing Week 2026 spotlight, upcoming events, email signup |
| `/podcast/` | Say That! | Wingstop podcast page with Spotify embed |
| `/faq/` | FAQ | Accordion-style FAQ |
| `/legal/` | Legal | Terms of use |
| `/privacy/` | Privacy | Privacy policy |
| `/flavor-compare.html` | Flavor Atlas Compare | Internal layout comparison page (A/B/C/D) |

---

## Stack

- **HTML/CSS/JS** — vanilla, no frameworks, no bundler
- **Fonts** — Barlow Condensed 900 (display), Inter (body) via Google Fonts
- **Map** — [jsVectorMap 1.5.3](https://cdn.jsdelivr.net/npm/jsvectormap@1.5.3/) via jsDelivr CDN
- **Video** — YouTube IFrame API (brand hero video)
- **Podcast** — Spotify embed (Say That! show ID: `3uoTAc8UFTEGIKgjqSiftt`)
- **Hosting** — GitHub Pages (static, no server-side logic)

---

## File Structure

```
/
├── index.html              # Homepage
├── css/
│   └── main.css            # All shared styles (~1,500 lines)
├── js/
│   └── main.js             # Shared JS — nav, scroll animations, counters
├── about/index.html
├── events/index.html
├── international/index.html
├── podcast/index.html
├── faq/index.html
├── legal/index.html
├── privacy/index.html
├── flavor-compare.html     # Internal layout comparison (not in nav)
├── 404.html
├── .nojekyll               # Disables Jekyll processing on GitHub Pages
├── CLAUDE.md               # AI assistant instructions and workflow rules
└── NOTES.md                # Task log
```

---

## International Markets

### US (Flagship)
United States — 1,900+ locations across all 50 states.

### AMRS (Americas International)
Mexico · Canada · Puerto Rico

### EMEA (Europe, Middle East & Africa)
**Europe:** United Kingdom · Spain · France · Netherlands · Italy · Ireland  
**Middle East:** Saudi Arabia · Kuwait · UAE · Bahrain · Qatar

### APAC (Asia Pacific)
South Korea · Singapore · Indonesia · Australia · Thailand

### Coming Soon
India *(deal signed, 1,000+ units planned)* · Ecuador · Jamaica · Panama · Poland

---

## Brand Tokens

| Token | Value | Usage |
|---|---|---|
| `--green` | `#006938` | Primary brand green |
| `--green-light` | `#1a8f52` | Hover states, accents |
| `--black` | `#0a0a0a` | Dark section backgrounds |
| `--font-disp` | Barlow Condensed 900 | All display headings |
| `--font-body` | Inter | Body copy |

**No yellow** — `#FFC72C` is not a Wingstop brand color and is not used anywhere in this project.

---

## Development

No build step required. Open any HTML file directly or serve locally:

```bash
npx serve .
# or
python -m http.server 8080
```

Changes pushed to `master` deploy automatically to GitHub Pages.

---

## Notes

- `NOTES.md` contains a running log of tasks, changes, and files modified
- `CLAUDE.md` contains instructions for the AI assistant working on this project
- `flavor-compare.html` is an internal layout exploration page and is not linked from the main nav
