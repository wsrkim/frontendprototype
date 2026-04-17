# Project Notes

---

## 2026-04-17

### Update CLAUDE.md + create NOTES.md
**Requested:** Add workflow rules to CLAUDE.md — auto git commit after every task, maintain NOTES.md with task log, code standards.
**Done:** Added "Workflow Rules" section to existing CLAUDE.md (preserved all persona definitions). Created this NOTES.md file.
**Files changed:** `CLAUDE.md`, `NOTES.md`

---

## 2026-04-17

### International page redesign + region restructure
**Requested:** Dark theme matching rest of site. Remove MENA as a region. Use AMRS, EMEA, APAC. Keep US separate from AMRS.
**Done:** Full dark-mode overhaul of `international/index.html`. US gets standalone flagship block. Regions restructured to AMRS (MX/CA/PR), EMEA (6 EU + 5 ME markets sub-labeled), APAC (KR/SG/ID/AU/TH). All cards, chips, stats dark-themed via page-scoped `<style>`. Market Spotlight copy updated to reference correct region names.
**Files changed:** `international/index.html`

---

## 2026-04-17

### Global map — tooltip fix, layout, zoom, mobile
**Requested:** Tooltip appearing behind the map. Map too small and tile-like. Better mobile sizing.
**Done:** Fixed tooltip — root cause was wrong CSS class name (`jvectormap-tip` vs actual `jvm-tooltip`). All prior fixes were targeting a nonexistent element. Added `z-index:99999` to correct class. Removed dead MutationObserver/setTimeout code. Redesigned map section to full-width stacked layout (header row → map → stats bar). Heights: 520px desktop / 420px tablet / 340px mobile. Enabled scroll-to-zoom, added +/−/↺ zoom button overlay. Stats bar 4-col desktop, 2×2 mobile. Removed `overflow:hidden` from map section.
**Files changed:** `css/main.css`, `index.html`

---

## 2026-04-17

### Replace hallucinated country data
**Requested:** Correct map to confirmed Wingstop markets only.
**Done:** Updated `wsCountries` to 20 confirmed markets. Removed hallucinated CO/PA. Added India as `wsUpcoming` (deal signed, 1,000+ units). Stats updated to 20+ countries, 5 continents sitewide. International page: corrected all region market lists, coming soon section overhauled.
**Files changed:** `index.html`, `international/index.html`
