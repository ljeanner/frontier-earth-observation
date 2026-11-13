const graphite = 'Fine naturalistic graphite, ivory paper, restrained annotations; no artificial colour filter.';
const brief = (file, objective, subject, composition, elements, ratio, caption, alt, limit, kind = 'conceptual-illustration') => ({
  file, learningObjective: objective, subject, composition, mandatoryVisibleElements: elements,
  style: kind === 'real-satellite-imagery' ? 'Original scientific image colours and institutional credits retained.' : kind === 'synthetic-example' ? 'Labelled fictional optical-style terrain; not satellite evidence.' : graphite,
  aspectRatio: ratio, caption, provenance: './art/provenance.json', alt, limit,
  kind, decision: 'reuse', inspected: '13 November 2026',
});

export const assetBriefs = [
  brief('earth-sketch.png', 'Connect orbit, observation and reception.', 'Earth and orbital context', 'Large intact drawing on the right; typography in a separate calm column, never over the image.', ['Earth', 'orbit paths', 'satellites', 'receiving dish'], '853:751', 'Conceptual orbital geometry, not live mission data.', 'Graphite Earth with orbital paths, satellites and observation links.', 'Orange footprints are illustrative; not fire locations or verified geometry.'),
  brief('orbital-observation-reading.webp', 'Distinguish measuring from delivering.', 'Satellite observing terrain', 'Portrait study beside prose or above the process stages; preserve the full instrument and footprint.', ['spacecraft', 'instrument', 'terrain footprint'], '1143:1200', 'An observation is the start of a delivery path.', 'Graphite spacecraft observing a patch of terrain.', 'Not a verified Meridian spacecraft or footprint.'),
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
  decision: 'deferred-editorial-phase',
  learningObjective: 'Locate the fictional AR-1842 AOI without implying a documented incident.',
  subject: 'Attica geographic context and fictional observation footprint',
  composition: 'Wide map with a quiet legend, separately labelled scenario footprint.',
  mandatoryVisibleElements: ['verified geographic basemap', 'Attica label', 'illustrative AOI label', 'source and reuse licence'],
  style: 'Fine graphite cartographic annotations; no invented satellite evidence.',
  aspectRatio: '16:9',
  caption: 'Geographic context; the mission footprint is illustrative.',
  provenance: 'Requires a licensed map and an approved scenario footprint; neither is supplied in the current manuscript.',
  alt: 'Map locating Attica with a separately labelled fictional observation footprint.',
  limit: 'Do not substitute the alpine forest drawing for a geographic map. Phase 1 retains the original labelled conceptual landscape.',
}];
