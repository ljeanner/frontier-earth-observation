# What the Timeline Reveals

> **Editorial placement:** In the historical Attica/Varnavas 2024 case study, after the official Copernicus maps and the explanation of the different satellite products, immediately before the transition to the Meridian *What If*. This section concerns real, published Copernicus Emergency Management Service (CEMS) activations, not simulated Meridian operations.

## The Satellite Is Only Part of the Waiting Time

The first Copernicus map of the August 2024 Varnavas wildfire was built from a Sentinel-2 observation acquired just two hours and nine minutes after the Greek authorities activated the emergency mapping service. At first glance, the satellite response was remarkably quick. Yet the map itself became available almost ten hours after the acquisition, twelve hours and five minutes after activation. By then, nearly thirty-one hours had passed since the documented start of the fire.

The following observations tell a different part of the story. As the emergency response moved from an initial overview towards more detailed monitoring and damage assessment, WorldView-2 and GeoEye-1 supplied imagery at finer spatial resolutions. Those acquisitions took place later, and the time spent waiting for the next relevant observation became a much larger part of the overall delivery time. In this case, the information required by responders changed as the event unfolded, and different products answered different questions.

The published records make it possible to distinguish the time between service activation and satellite acquisition from the time between acquisition and the finished mapping product. They do not, however, provide a complete breakdown of satellite tasking, ground-station reception, processing, interpretation and quality control. The second interval should therefore be understood as an aggregate production period, not as a measured downlink delay.

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

*Figure note: The Varnavas observations and the SAR examples concern different emergencies, sensors, requested products and operating conditions. The comparison illustrates how the balance between acquisition waiting time and subsequent product preparation can vary; it is not a controlled performance ranking of satellite systems. Durations are calculated from published timestamps compiled in the accompanying Researcher report. The internal stages of acquisition-to-product processing are not individually timestamped in the public Varnavas record.*

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

The Varnavas timeline does not show that the first satellite was poorly positioned or that an operator failed to respond. Sentinel-2 was available soon after the Copernicus activation, and the first map followed within the same day. The much longer interval between the documented outbreak and the activation is visible in the record, but the public sources do not explain its cause. It would be misleading to describe those eighteen hours and fifty-four minutes as a proven administrative delay.

What the evidence does show is that the time needed to deliver useful information changes with the requested product. A broad view of the affected area, repeated monitoring as the fire evolves and detailed assessment of individual buildings are different operational tasks. Each may require another instrument, another acquisition opportunity and additional analysis. A satellite image is only one input to the product ultimately delivered to emergency responders.

For an Earth-observation operator, this raises an operational question: how can new requests, available satellites, ground contacts, weather forecasts, processing capacity and existing customer commitments be assessed together, quickly enough to make use of the next feasible opportunity? Better coordination cannot change orbital geometry or remove the need for reliable analysis and human validation. It may, however, reduce the time spent identifying options, reconciling competing plans and preparing decisions.

## What If Meridian Had Planned the Mission?

The events and Copernicus products described above are historical. The next section is a simulation, using Meridian's existing constellation and operational systems to explore how an urgent observation requirement over Attica could be handled under a different planning approach.

We will retain the geographic context of the 2024 wildfire while introducing a **new, explicitly simulated** mission request. Meridian's 30 optical and radar satellites, ground stations in Norway, Spain and Kenya, and competing customer commitments will determine which options can be considered. Its five specialist agents will help assemble the information, compare feasible acquisition and downlink plans, and prepare changes for the people authorized to approve them.

The aim is to test how the planning process behaves, rather than claim that Meridian or AI agents could have changed the historical outcome. The distinction between observed evidence and simulated decisions must remain visible throughout the experience.

### Sources and evidence notes

- **Primary historical case:** Copernicus Emergency Management Service, activation **EMSR746**, Varnavas / Attica wildfire, August 2024. Link the official activation and individual published maps already referenced in the historical chapter.
- **Related radar observation:** European Space Agency, [ICEYE Monitors the Impact of a Wildfire in Greece](https://earth.esa.int/eogateway/data-application/feeling-the-heat-commercial-satellites-track-temperature-extremes/iceye-monitors-the-impact-of-a-wildfire-in-greece). The ICEYE acquisition on 13 August 2024 is **not** one of the four CEMS products plotted in the Varnavas group; its tasking, downlink and delivery times are not publicly established in the supplied report.
- **Source of the tabulated timestamp reconstruction and case comparisons:** *REX — Demande d’imagerie satellitaire urgente lors de l’incendie de Varnavas/Attique*, supplied Researcher report, sections 3–8 and figure 2. Keep its underlying numbered references linked in the site's bibliography; do not present the report itself as the original public data source.
- **Evidence status:** Times are published or calculated from published timestamps. No measured individual downlink, quality-control or processing-stage durations are claimed.
