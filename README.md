# Agentic Earth Observation — Tasking & Downlink

A personal illustrated white paper by **Lucile Jeanneret**, published as a static editorial reader.
The web-first version starts at `index.html`; `book.html` preserves the paginated
reading and print layout. No backend, API keys or package installation is needed.

## Reading features

Responsive reading, contents, browser navigation, local bookmarks, a searchable
glossary, illustration zoom, seven clickable process drawings, synthetic cloud comparison, architecture highlights,
an embedded orbital Explorer and printing.

The approved English manuscript contains three narrative parts and 17 subsections:
a short industry introduction, the full-width orbital Explorer and general
physical and instrument constraints in Part I; Meridian's illustrated introduction,
customer and operational challenges in Part II; agents, architecture, Foundry and operations
in Part III. Architecture and Foundry technical notes forms Part IV in the web
reader. Methodology, regulations, glossary, sources and image credits remain
supporting material.

The Explorer is educational: 60x simulated playback, exaggerated spacecraft,
not live telemetry or request-feasibility computation. The four application
views and wildfire choices share a local teaching state, not connections to
operational systems. Meridian is illustrative;
commercial and performance figures are hypotheses rather than measured results.

## Publication

GitHub Pages serves the root of the `main` branch. `.nojekyll` preserves the
static files without a Jekyll transformation. This repository contains only the
publication payload, its approved source/compiler and portable regression tests,
not operational backend services or credentials.

For a local preview, serve this directory over HTTP rather than opening the HTML
as a local file, for example:

```powershell
python -m http.server 5194 --bind 127.0.0.1
```

## Credits and qualifications

Image credits, dates, licensing and limits are retained in the reader and in
`art/provenance.json`. The real optical and SAR scenes have different dates and
extents; they are not a matched scientific comparison. The cloud overlay applies
only to the explicitly synthetic terrain example. Original scientific images
and their attributed, uncropped derivatives are retained.

The packaged Explorer retains its bundled third-party notices. Foundry
capability and preview qualifications retain the 13 November 2026 snapshot.
No scientific citations or image credits were removed when integrating the manuscript.

## Manuscript integration

The author-led identity is shared by the two readers. The masthead links to the
cover; the byline is an attribution, not an organizational logo. The graphite
Earth remains intact beside the title, with no text over its detailed interior.
The neutral orbit favicon is interface geometry, not a corporate mark.
Historical art-direction names are retained only in provenance records.

The contents drawer derives its counts and items from the current manuscript.
The four parts form one continuous illustrated article. Navigation scrolls to
anchors without hiding content or resetting the teaching state. One navigation
strip follows the cover, rather than being repeated between parts.
The masthead, cover and headings share one responsive width and gutter; text keeps
a readable measure while illustrations, scientific plates, diagrams and interactive
applications use the wider composition. The first three parts retain
the approved revised manuscript (4, 7 and 6 subsections); Part IV is
**Architecture and Foundry technical notes**, promoted from the supporting
material before the remaining appendices. Its content and existing deep link
are preserved, with no duplicate part/subsection title. Its technical subsections
are expanded as article text, with the original drawings and qualifications, not
hidden behind accordion controls. Existing subsection and supporting-note anchors
remain addressable in the same document.
Subsections have smaller, italic, unnumbered titles with no section-counter labels;
the status bar identifies only the current part. Contents retains their
individual links beneath the main part titles.
Stable section anchors, browser
history, persistent bookmarks and keyboard navigation are preserved. Returning
without a fragment restores the last section when local storage is available;
an explicit `#cover` or other fragment always takes priority. Bookmarks still
use the previous storage key for compatibility. Storage failure is visible.
There are no previous/next subsection footers. Printing opens remaining auxiliary
disclosures, then restores their state, the scroll position and glossary filter.
The paginated book remains available separately.

The industry introduction, wildfire and Foundry guidance use side-by-side
illustrations and prose on desktop. Mobile places prose before the illustration.
The opening retains the dated ESA/Copernicus figures and sources and reaches
the full-width Explorer after 124 words. Its exact italic instruction and optional
“How to explore” and simulation/accessibility panels precede the general
observation and ground-contact explanation. The optical/radar explanation,
scientific images and cloud demonstration remain in Part I without company references.
Meridian's exact introduction, logo, conceptual offices and Rome locator open Part II.
The company and map limitations remain in the captions and image credits.
The current approved source is `content/agentic-earth-observation-manuscript-v3.md`;
v1 and v2 remain archived unchanged. `#meet-meridian` now links directly to Part II.
Stable source sequence 02 follows 05 in reading order, without visible numbering.

Architecture viewports support native keyboard panning plus left/right controls.
Diagram arrow keys no longer turn reader sections. The globe retains wide and
fullscreen modes, trusted iframe messages, explicit mobile/reduced-motion start,
offscreen disposal, failure/retry and its educational limitations.

### Teaching components

| Educational component | Current reusable material / boundary |
| --- | --- |
| Optical/radar and clouds | Original image pairs, provenance, image zoom and synthetic-only opacity control |
| Delivery process fresco | Seven keyboard-accessible stages with matching hatched drawings; original acquisition/downlink images retained for print |
| Customer request | AR-1842 form with entitlement, export and product checks before planning |
| 24-hour timeline | Source Attica timestamps, four-hour deadline, cloud failure and late optical retry |
| Current systems | Four independent app/backlog/detail views over the same five source requests |
| Agent anatomy / five agents | Model/tools/state boundaries, responsibility selection and keyboard scrubber |
| Secure architecture / Foundry | Layered architecture, scoped permissions and retained technical notes |
| Wildfire replay | Same-state revisit and coordination trace without advancing approvals or claiming savings |

OrbitPlanner accepts approved intake; GroundLink accepts scheduled acquisitions.
GeoFactory separates expected incoming data from data actually received and
eligible for processing. MissionControl owns independent plan-review, deterministic-
check and command-authorization queues, not a final delivery stage.
Attica processing enters a quality hold; radar is not an equivalent optical
product without customer acceptance. State resets on reload or edition switch.
Moving between article parts preserves the shared teaching state.
Other bookings and processing capacity are contextual, not a numerical solver.

No scientific imagery was replaced, recoloured or cropped. The Earth illustration
was completed on 15 November after the author identified its clipped spacecraft
and ground dish: `earth-sketch-complete.png` retains the generated master and
`earth-sketch-complete-reading.webp` is its uncropped reading copy. The previous
`earth-sketch.png` remains unchanged. This is a conceptual AI-assisted edit,
not satellite evidence or a pixel-identical restoration. The existing manifest
briefs govern all other unchanged artwork. Two asset briefs remain explicitly
incomplete: a licensed Attica basemap and suitable agriculture/emergency/defence
portraits. Source AOI coordinates and customer-use cards are shown instead.
The forest illustration remains conceptual, not geographic evidence of Attica.

### Source and changed files

| Files | Integration |
| --- | --- |
| Approved Markdown, `compile-manuscript.mjs`, `manuscript-data.js` | Byte-preserved source and deterministic exact-prose extraction |
| `manuscript-content.js`, `book-content.js`, `editorial-content.js` | 17-sequence composition, shared legacy aliases and retained supporting material |
| `mission-workflow.js`, `mission-data.js`, `mission-interactions.js`, `mission-widgets.css` | Source-derived workload, approval gates, shared interactive views and print alternatives |
| `editorial-reader.js`, `reader.js`, both HTML shells | One continuous four-part article, stable anchors, illustrations, interactions and retained book pagination |
| `editorial-assets.js` | Inspected reuse decisions and explicit missing assets |
| `publication.test.mjs` | Portable identity, manuscript and static-dependency checks |

The canonical source is `content\agentic-earth-observation-manuscript-v3.md`,
SHA-256 `9f7b3cc92e8ffdfda766e6e31d236386513c85318497d499ce5c966aba1c745a`.
The original v1 and preceding v2 are preserved byte-for-byte. The current revision
moves the company introduction and general explanations without shortening them,
and changes only the authorized opening and generic Part I transitions.
Prose from source sequence 06 onward is unchanged. Visual directions and
editorial review notes are not reader prose; UI labels, captions and safety
qualifications are separate.

After an explicitly approved source revision, regenerate and verify:

```powershell
node compile-manuscript.mjs
node compile-manuscript.mjs --check
node --test publication.test.mjs
```

The full working source also has native workflow/prose tests and browser checks:
`check-editorial.mjs`, `check-mission-interactions.mjs` and `check-book-layout.mjs`.
They verify responsive reading, exact live-DOM paragraphs, all prior anchors,
the complete request-to-quality-hold path, incoming-data gates, keyboard focus,
book interactions and every rendered book word at seven viewports.
Those working checks use the existing sibling Playwright/scenario sources and
are not required to host this static package.

Pushing `main` updates the public GitHub Pages site and requires an explicit
publication decision.
