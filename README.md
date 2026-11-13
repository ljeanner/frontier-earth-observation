# Agentic Earth-Observation Tasking and Downlink

A Frontier illustrated white paper, published as a static editorial reader.
The web-first version starts at `index.html`; `book.html` preserves the paginated
reading and print layout. No backend, API keys or package installation is needed.

## Reading features

Responsive reading, contents, browser navigation, local bookmarks, a searchable
glossary, illustration zoom, synthetic cloud comparison, architecture highlights,
an embedded orbital Explorer and printing.

The Explorer is educational: 60x simulated playback, exaggerated spacecraft,
not live telemetry or request-feasibility computation. Mission choices are
explanations, not connections to operational systems. Meridian is illustrative;
commercial and performance figures are hypotheses rather than measured results.

## Publication

GitHub Pages serves the root of the `main` branch. `.nojekyll` preserves the
static files without a Jekyll transformation. This repository contains only the
publication payload, not working documents, server tooling or credentials.

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
The supplied future 17-sequence manuscript is not part of this UX-only release.
