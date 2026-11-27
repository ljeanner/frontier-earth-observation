# What the Timeline Reveals

> **Editorial placement:** In the historical Attica/Varnavas 2024 case study, after the official Copernicus maps and the explanation of the different satellite products, immediately before the transition to the Meridian *What If*. This section concerns real, published Copernicus Emergency Management Service (CEMS) activations, not simulated Meridian operations.

## The Satellite Is Only Part of the Waiting Time

The first map was based on a Sentinel-2 image taken just 2 h 09 after activation. The satellite was fast. Yet the map was published almost ten hours later: 12 h 05 after activation, and nearly 31 hours after the fire started.

The later products tell another story. As responders needed finer detail, WorldView-2 and GeoEye-1 supplied higher-resolution images, but those came later, and waiting for the next suitable pass became the main delay.

Public records separate two intervals: activation to acquisition, and acquisition to published map. The second includes downlink, processing, interpretation and quality control, which are not timed individually.

### Interactive figure — From activation to usable information

**Chart title:** The Satellite Is Only Part of the Waiting Time

**Chart subtitle:** Time from Copernicus service activation to satellite acquisition, followed by time from acquisition to the published mapping product.

**Chart design:** Two aligned groups of horizontal stacked bars, using a shared hour scale within each group or clearly labeled scales if necessary. Blue = activation → acquisition; amber = acquisition → published product. Show total duration at the end of each bar. Show the exact component durations on hover/focus and in an accessible data table.

#### Group A — Varnavas, Greece · optical CEMS products · August 2024

| Product | Activation → acquisition | Acquisition → product | Total from activation | Observation role |
|---|---:|---:|---:|---|
| Sentinel-2 · DEL · 12 Aug | 2 h 09 | 9 h 56 | 12 h 05 | Initial delineation, 10 m |
| WorldView-2 · MONIT01 · 13 Aug | 26 h 37 | 9 h 11 | 35 h 48 | Detailed monitoring, 2 m |
| WorldView-2 · MONIT02 · 14 Aug | 50 h 00 | 6 h 15 | 56 h 15 | Subsequent monitoring, 2 m |
| GeoEye-1 · Grading · 15 Aug | 73 h 45 | 12 h 11 | 85 h 56 | Damage grading, 0.5 m |

#### Group B — Other European CEMS cases · SAR products

| Case and instrument | Activation → acquisition | Acquisition → product | Total from activation |
|---|---:|---:|---:|
| EMSR713 · Saarland · Sentinel-1 · 2024 | 25 h 14 | 6 h 20 | 31 h 34 |
| EMSR705 · Tuscany · COSMO-SkyMed · 2023 | 25 h 43 | 11 h 27 | 37 h 10 |
| EMSR706 · Northern France · COSMO-SkyMed · 2023 | 38 h 42 | 11 h 48 | 50 h 30 |

*Figure note: Different emergencies, sensors and products: an illustration, not a performance ranking. Source: CEMS activation records.*

**Data for the interactive component (minutes, to avoid rounding):**

```json
[
  {"group":"Varnavas 2024 — optical","label":"Sentinel-2 · DEL","activationToAcquisitionMin":129,"acquisitionToProductMin":596},
  {"group":"Varnavas 2024 — optical","label":"WorldView-2 · MONIT01","activationToAcquisitionMin":1597,"acquisitionToProductMin":551},
  {"group":"Varnavas 2024 — optical","label":"WorldView-2 · MONIT02","activationToAcquisitionMin":3000,"acquisitionToProductMin":375},
  {"group":"Varnavas 2024 — optical","label":"GeoEye-1 · Grading","activationToAcquisitionMin":4425,"acquisitionToProductMin":731},
  {"group":"Other European CEMS — SAR","label":"EMSR713 · Saarland · Sentinel-1","activationToAcquisitionMin":1514,"acquisitionToProductMin":380},
  {"group":"Other European CEMS — SAR","label":"EMSR705 · Tuscany · COSMO-SkyMed","activationToAcquisitionMin":1543,"acquisitionToProductMin":687},
  {"group":"Other European CEMS — SAR","label":"EMSR706 · Northern France · COSMO-SkyMed","activationToAcquisitionMin":2322,"acquisitionToProductMin":708}
]
```

## What These Delays Tell Us

The timeline does not show a slow satellite or a failing operator. It shows that the time to useful information depends on the product: a first overview, a follow-up and a building-level damage assessment are different tasks, each needing its own acquisition and analysis. The 18 h 54 between the outbreak and the activation is visible in the record, but public sources do not explain it.

For an operator, the question becomes: how can new requests, available satellites, ground contacts, weather, processing capacity and existing commitments be assessed together, fast enough to catch the next feasible opportunity? Better coordination cannot change orbits or replace human validation. It can reduce the time spent finding options and preparing decisions.

## What If Meridian Had Planned the Mission?

The fictional AR-1842 scenario explores coordination with Meridian's existing constellation and systems. It does not predict a different historical outcome.

### Sources and evidence notes

- **Primary historical case:** Copernicus Emergency Management Service, activation **EMSR746**, Varnavas / Attica wildfire, August 2024.
- **Related radar observation:** European Space Agency, [ICEYE Monitors the Impact of a Wildfire in Greece](https://earth.esa.int/eogateway/data-application/feeling-the-heat-commercial-satellites-track-temperature-extremes/iceye-monitors-the-impact-of-a-wildfire-in-greece). The 13 August 2024 observation is not one of the four CEMS products; its tasking and delivery times are not public.
- **Timestamp records:** The official CEMS StoryMaps for EMSR746, EMSR713, EMSR705 and EMSR706 are linked in References.
- **Evidence status:** Times are published or calculated from published timestamps. No measured individual downlink, quality-control or processing-stage durations are claimed.
