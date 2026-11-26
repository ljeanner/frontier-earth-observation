const graphite = 'Fine naturalistic graphite, ivory paper, restrained annotations; no artificial colour filter.';
const brief = (file, objective, subject, composition, elements, ratio, caption, alt, limit, kind = 'conceptual-illustration') => ({
  file, learningObjective: objective, subject, composition, mandatoryVisibleElements: elements,
  style: kind === 'real-satellite-imagery' ? 'Original scientific image colours and institutional credits retained.' : kind === 'synthetic-example' ? 'Labelled fictional optical-style terrain; not satellite evidence.' : graphite,
  aspectRatio: ratio, caption, provenance: './art/provenance.json', alt, limit,
  kind, decision: 'reuse', inspected: '13 November 2026',
  rationale: 'Retains the stated subject, required elements and educational meaning without altering the source.',
});

export const assetBriefs = [
  ...[
    ['clearing', 'Give the observation lifecycle a living subject.', 'Doe standing in a pine clearing', ['one adult doe', 'four grounded hooves', 'upright ears', 'pale rump patch', 'pine and ferns'], 'A life beneath the orbit. Fictional graphite study.', 'Graphite doe standing in a pine clearing.', 'first character reference: the approved doe-standing sprite from the opening film'],
    ['listening', 'Reconnect response delays with conditions on the ground.', 'The same doe listening toward distant smoke', ['same doe morphology', 'head turned back', 'four grounded hooves', 'distant light smoke', 'matching pine clearing'], 'While plans change, life on the ground continues. Fictional study, not the Varnavas landscape.', 'Graphite doe listening, with faint smoke beyond the distant treeline.', 'reference: the first clearing drawing'],
    ['onward', 'Close the technical narrative on its purpose without inventing a rescue.', 'The same doe walking through the clearing', ['same doe morphology', 'one front hoof lifted', 'three supporting legs', 'matching pine and ferns', 'open space ahead'], 'Keep the purpose in view. Fictional study, not evidence of a rescue.', 'Graphite doe taking a careful step through the same pine clearing.', 'reference: the first clearing drawing'],
  ].map(([name, objective, subject, elements, caption, alt, reference]) => ({
    ...brief(`doe-${name}-reading.webp`, objective, subject, 'Complete landscape vignette at the end of one narrative part; preserve ears, hooves and paper margins. Uncropped 1400 × 933 reading copy.', elements, '1400:933', caption, alt, 'AI-generated fictional illustration, not observed wildlife, historical Varnavas geography or evidence of an animal rescue. Related drawings, not pixel-identical animation frames.'),
    provenance: `./art/provenance.json; ${reference}.`,
    decision: 'create',
    inspected: '26 November 2026',
    rationale: 'Generated at the user’s request as a recurring character across the article. The approved film doe anchors morphology; the first generated clearing anchors the two related variations.',
  })),
  {
    ...brief('changing-planet-observation-reading.webp', 'Introduce Earth observation through land, water and human activity.', 'Satellite observing a changing planet', 'Complete portrait graphite scene beside the opening paragraphs; intact solar wings and coastline, no crop.', ['Earth-observation satellite', 'complete solar panels', 'coastline', 'fields', 'river', 'city', 'sage observation outline'], '933:1400', 'Observing land, water and human activity on a changing planet. Conceptual drawing, not a satellite image or a verified sensor footprint.', 'Graphite satellite above a conceptual coast, fields, river and city.', 'AI-generated illustrative geography and observation geometry, not a named place, real satellite scene, verified footprint or measured change.'),
    inspected: '19 November 2026',
    decision: 'create',
    rationale: 'Generated at the user’s request to replace only the industry introduction drawing with a scene illustrating its paragraph. The prior globe remains on the cover and elsewhere.',
  },
  {
    ...brief('foundry-agents-graphite-reading.webp', 'Recognize Microsoft Foundry and the five Meridian demo agents.', 'Illustrated Foundry Agents deployment view', 'Complete landscape roster, full-width below the Foundry explanation, with the original PNG accessible through the image inspector.', ['Microsoft Foundry title', 'five readable agent names', 'five agent rows', 'status column', 'navigation sidebar'], '1750:899', 'Meridian’s five demo agents in Microsoft Foundry; illustrated reconstruction, not a live status view.', 'Microsoft Foundry Agents view listing the five Meridian demo agents.', 'AI-generated reconstruction based on the supplied screenshot, not an unaltered screenshot or evidence of current health, production readiness or mission execution. Account and subscription identifiers omitted.'),
    inspected: '17 November 2026',
    decision: 'reuse',
    rationale: 'Uses the user-approved readable graphite revision unchanged, with a same-resolution lossless reading copy to preserve agent-name legibility.',
  },
  ...[
    ['del', 'Sentinel-2 initial delineation', '1800:1271'],
    ['monit01', 'WorldView-2 monitoring 01', '1800:1271'],
    ['monit02', 'WorldView-2 monitoring 02', '1800:1271'],
    ['grading', 'GeoEye-1 damage grading', '1270:899'],
    ['fire-evolution', 'Fire evolution', '1800:1030'],
    ['damage-overview', 'Damage assessment overview', '1800:1527'],
    ['damage-detail01', 'Damage assessment detail 01', '1800:1527'],
    ['damage-detail02', 'Damage assessment detail 02', '1800:1527'],
    ['damage-detail03', 'Damage assessment detail 03', '1800:1527'],
  ].map(([stem, title, ratio]) => ({
    ...brief(`cems-emsr746-${stem}-reading.webp`, 'Distinguish historical CEMS mapping evidence from the fictional Meridian mission.', title, 'Complete official map, uncropped, with legend and embedded source credits; original accessible through the existing image inspector.', ['historical geography', 'original legend', 'embedded source credits'], ratio, 'Copernicus EMSR746, Varnavas / Attica, August 2024. © 2024 European Union.', `Official CEMS EMSR746 map: ${title}.`, 'Published mapping product, not raw imagery or a Meridian acquisition. Detail maps are not additional products or acquisitions. Original third-party imagery credits remain applicable.', 'historical-map'),
    style: 'Original map colours, legend and credits retained. No graphite filter or recolouring.',
    inspected: '16 November 2026',
  })),
  {
    ...brief('meridian-logo-reading.webp', 'Identify the fictional company without changing the publication identity.', 'Meridian orbital emblem and wordmark', 'Uncropped artwork with only transparent outer margins trimmed; beside the company introduction, never in the publication header.', ['Earth emblem', 'inclined orbit', 'satellite dot', 'Meridian wordmark'], '1000:325', 'Meridian — illustrated company identity.', 'Meridian wordmark with a graphite Earth and inclined orbit.', 'Conceptual identity for a fictional company, not a vector master or a trademark-clearance assessment.'),
    inspected: '16 November 2026',
    decision: 'adapt',
    rationale: 'Reuses the user-approved generated identity, retaining its alpha channel and the complete original; trims only outer transparent space for legibility.',
  },
  {
    ...brief('meridian-offices-rome-reading.webp', 'Give the fictional operator a human-scale setting.', 'Conceptual Rome offices', 'Full building exterior alongside its world-map locator; no crop or invented address.', ['complete facade', 'entrance', 'trees', 'orbital emblem'], '1400:933', 'Conceptual offices in Rome, not an actual facility or a ground station.', 'Conceptual stone-fronted Meridian offices in Rome.', 'Invented building and setting, not a verified facility, real address or additional ground station.'),
    inspected: '16 November 2026',
  },
  {
    ...brief('meridian-world-map-reading.webp', 'Locate the fictional company in its narrative city.', 'Rome world-map locator', 'Complete world-map drawing and Italy inset; enlarged image remains available.', ['world map', 'Rome marker on mainland Italy', 'Italy inset', 'Rome label'], '1400:933', 'Rome, Italy — illustrative cartography, not a georeferenced map.', 'Graphite world map locating Rome with an Italy inset.', 'AI-drawn approximate cartography, not a georeferenced basemap or a verified corporate footprint. The main locator was corrected after generation.'),
    inspected: '16 November 2026',
    decision: 'adapt',
    rationale: 'Reuses the delivered locator with its corrected mainland Rome marker; original and corrected versions are retained.',
  },
  {
    ...brief('earth-sketch-complete-reading.webp', 'Connect orbit, observation and reception.', 'Earth and orbital context', 'Complete landscape drawing with breathing room around spacecraft and ground antenna; typography in a separate calm column.', ['Earth', 'orbit paths', 'complete satellites', 'complete receiving dish and pedestal'], '4:3', 'Conceptual orbital geometry, not live mission data.', 'Graphite Earth with complete satellites, orbital paths and a ground antenna.', 'AI-assisted completion of an illustrative drawing; not verified geography or orbital geometry. Orange footprints are illustrative, not fire locations.'),
    inspected: '15 November 2026',
    decision: 'adapt',
    rationale: 'Expanded the clipped source composition to complete the upper-left spacecraft and lower-right dish. The original drawing is retained separately.',
  },
  brief('orbital-observation-reading.webp', 'Distinguish measuring from delivering.', 'Satellite observing terrain', 'Portrait study beside prose or above the process stages; preserve the full instrument and footprint.', ['spacecraft', 'instrument', 'terrain footprint'], '1143:1200', 'An observation is the start of a delivery path.', 'Graphite spacecraft observing a patch of terrain.', 'Not a verified Meridian spacecraft or footprint.'),
  {
    ...brief('satellite-downlink-reading.webp', 'Distinguish ground reception from observation and subsequent processing.', 'Satellite transmitting to a receiving dish', 'Complete square graphite view beside the downlink explanation; retain both spacecraft and anchored dish without cropping.', ['satellite solar panels', 'spacecraft communications antenna', 'dashed spacecraft-to-ground arrow', 'receiving dish', 'pedestal and terrain'], '1:1', 'Later, during a compatible contact: the satellite transmits stored data to a receiving station. Processing and product acceptance still follow.', 'Graphite satellite transmitting toward a grounded receiving dish along a dashed radio-link arrow.', 'AI-generated conceptual composition, not physical scale, a hardware blueprint, a verified station or an actual contact calculation. The arrow represents radio transmission, not a visible beam.'),
    inspected: '16 November 2026',
    decision: 'create',
    rationale: 'Generated as a naturalistic companion to the approved observation drawing at the user’s request, with a distinct communications antenna, directed radio path and complete ground dish. Original and uncropped reading derivative are retained.',
  },
  brief('optical-radar-study-reading.webp', 'Explain passive and active observation.', 'Optical and radar studies', 'Wide intact paired sketch; do not crop either cloud or instrument.', ['two instruments', 'cloud', 'different signal paths'], '3:2', 'Conceptual optical and radar illumination.', 'Paired graphite studies of optical and radar observation through different cloud conditions.', 'Not a controlled sensor comparison or flame-detection claim.'),
  brief('antenna-vignette-reading.webp', 'Make the ground contact tangible.', 'Receiving dish', 'Small supporting margin vignette, not a stretched full-width hero.', ['dish', 'pedestal', 'contact shadow'], '734:845', 'Generic ground contact.', 'Graphite dish antenna tilted towards the sky.', 'Not a station location or verified installation.'),
  brief('mission-review-reading.webp', 'Explain accountable review.', 'Hand reviewing a plan', 'Wide detail next to safety or qualification prose.', ['hand', 'pencil', 'paper plan'], '3:2', 'Conceptual human review of a mission plan.', 'Graphite hand and pencil reviewing a fictional plan.', 'No actual approval or command evidence.'),
  brief('mission-control.webp', 'Show people coordinating information.', 'Operators in a control room', 'Wide human-scale scene, intact screens and seated operator.', ['operators', 'desk', 'screens'], '1672:940', 'Representative mission operations, not a verified facility.', 'Graphite operators working in a mission-control room.', 'Do not use as a Foundry product screenshot.'),
  brief('ground-station.webp', 'Connect physical infrastructure with ground reception.', 'Arctic ground station', 'Landscape illustration with antenna and environmental context visible.', ['dish', 'mountains', 'ground facilities'], '1672:940', 'Representative drawn station.', 'Graphite antenna in an Arctic landscape.', 'Not a verified Norwegian station or client installation.'),
  brief('forest.webp', 'Locate the observation question in a landscape.', 'Wooded valley', 'Intact illustrative landscape; explicitly not an incident map.', ['trees', 'valley', 'distant relief'], '1672:940', 'Fictional teaching landscape, not a reconstruction of the Attica fire.', 'Graphite forested valley and distant mountains.', 'Alpine terrain is not identifiable as Attica. Reuse only as a conceptual landscape, never a georeferenced map.'),
  brief('synthetic-optical-terrain-reading.webp', 'Show how visibility changes product suitability.', 'Same fictional terrain under a simulated cloud layer', 'Two copies of the identical image; cloud control changes only the second overlay.', ['same terrain', 'same AOI', 'explicit synthetic label', 'controllable cloud layer'], '1:1', 'Synthetic teaching example, not real satellite imagery or quality evidence.', 'Fictional optical-style terrain with a marked area of interest.', 'Never present as Attica or a real acquisition.', 'synthetic-example'),
  brief('sentinel-2-rome-2023-reading.webp', 'Explain reflected-light imagery.', 'Sentinel-2 Rome scene', 'Contain the entire scene; preserve credits; zoom to retained original.', ['full scene', 'date', 'source credit', 'institutional marks'], '1400:888', 'Rome, 16 March 2023; EU Copernicus, processed by @DEFIS_EU.', 'Real Sentinel-2 optical view of Rome and the Tiber.', 'Different extent and date from the SAR scene; no matched performance claim.', 'real-satellite-imagery'),
  brief('sentinel-1-central-italy-2018-reading.webp', 'Explain radar backscatter and false colour.', 'Sentinel-1B central Italy scene', 'Contain the full extent; no recolouring or overlay; zoom to retained original.', ['full radar scene', 'false-colour qualification', 'date', 'CC BY-SA 3.0 IGO credit'], '1400:1097', 'Central Italy, 6 July 2018; modified Copernicus data, processed by ESA.', 'Real false-colour Sentinel-1B radar view of central Italy.', 'Not optical colours, Meridian imagery or evidence of flame detection.', 'real-satellite-imagery'),
];

export const pendingAssetBriefs = [{
  decision: 'missing-approved-asset',
  learningObjective: 'Locate the fictional AR-1842 AOI without implying a documented incident.',
  subject: 'Attica geographic context and fictional observation footprint',
  composition: 'Wide map with a quiet legend, separately labelled scenario footprint.',
  mandatoryVisibleElements: ['verified geographic basemap', 'Attica label', 'illustrative AOI label', 'source and reuse licence'],
  style: 'Fine graphite cartographic annotations; no invented satellite evidence.',
  aspectRatio: '16:9',
  caption: 'Geographic context; the mission footprint is illustrative.',
  provenance: 'Requires a licensed map and an approved scenario footprint; neither is supplied in the current manuscript.',
  alt: 'Map locating Attica with a separately labelled fictional observation footprint.',
  limit: 'The source AOI coordinates are available, but a licensed basemap is not. Do not substitute the alpine forest drawing for an Attica map.',
}, {
  decision: 'missing-approved-asset',
  learningObjective: 'Show agriculture, emergency response and defence in human-scale customer contexts.',
  subject: 'Three customer illustrations',
  provenance: 'No existing illustration depicts all three customer contexts faithfully. The integration uses factual application cards without invented people or biographies.',
  limit: 'No new image was generated; the existing control-room illustration is not passed off as three different customer portraits.',
}];
