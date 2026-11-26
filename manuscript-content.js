import { manuscriptSections } from './manuscript-data.js';
import { missionData } from './mission-data.js';
import { sketch, spacecraft } from './process-illustrations.js';
import { atticaHistoricalChapter, atticaBibliography, atticaEvidenceNotes } from './attica-timeline.js';

const ids = [
  'industry', 'meet-meridian', 'orbital-network', 'sensors-and-customers',
  'observation-lifecycle', 'customers', 'customer-request', 'existing-architecture',
  'challenges', 'wildfire', 'business-case', 'agents-and-workflows',
  'agent-responsibilities', 'accelerator', 'building-with-foundry',
  'mission-debrief', 'deployment-and-evaluation',
];
const partTitles = [
  'Understanding Earth Observation', "Meridian's Operational Challenge", 'Engineering Agentic Operations',
];
const publishedSections = manuscriptSections.filter(section => section.number !== 9);
export const manuscriptChapters = partTitles.map((title, part) => {
  const sections = publishedSections.filter(section => section.part === part);
  return {
    number: String(part + 1).padStart(2, '0'), title, id: ids[sections[0].number - 1],
    sections: sections.map(section => [ids[section.number - 1], section.title]),
  };
});

export const legacyAnchors = Object.freeze({
  couverture: 'cover', 'page-de-garde': 'cover', 'title-page': 'cover',
  resume: 'methodology', abstract: 'methodology', sommaire: 'contents',
  industrie: 'industry', contraintes: 'regulatory-notes', regulation: 'regulatory-notes',
  'rights-and-data': 'regulatory-notes', 'safety-and-approval': 'regulatory-notes',
  existant: 'existing-architecture', 'business-applications': 'existing-architecture',
  'current-planning': 'existing-architecture', 'information-boundaries': 'existing-architecture',
  accelerateur: 'accelerator', incendie: 'wildfire', 'mission-lab': 'wildfire',
  challenges: 'wildfire', 'operational-bottlenecks': 'wildfire', 'continuous-planning': 'agent-responsibilities',
  'hybrid-connectivity': 'accelerator', 'autonomy-and-mcp': 'accelerator',
  'foundry-dataset': 'building-with-foundry', 'foundry-deployment': 'building-with-foundry',
  'foundry-runtime': 'building-with-foundry', 'foundry-safeguards': 'building-with-foundry',
  'foundry-operations': 'building-with-foundry', glossaire: 'glossary', definitions: 'glossary',
  sources: 'references', colophon: 'image-credits', 'publication-notes': 'methodology',
  quatrieme: 'back-cover',
});

export const escape = value => String(value).replace(/[&<>"']/g, character =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const inline = text => escape(text).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
const prose = (section, blocks = section.blocks) => `<div class="manuscript-prose" data-manuscript="${section.number}">${blocks.map(block =>
  block.startsWith('### ') ? `<h3>${inline(block.slice(4))}</h3>` : `<p>${inline(block)}</p>`).join('')}</div>`;
const plate = html => html.replace(/<span class="section-label">[\s\S]*?<\/span>/, '').replace(/<h2>[\s\S]*?<\/h2>/, '');
const widget = (name, variant = '') => `<section class="mission-widget" data-mission-widget="${name}"${variant ? ` data-variant="${variant}"` : ''} aria-label="${escape(name.replace(/-/g, ' '))}"><p>Preparing the shared teaching scenario…</p></section>`;
const image = (file, alt, caption, extra = '') => `<figure class="manuscript-illustration ${extra}"><img src="./art/${file}" alt="${escape(alt)}"><figcaption>${caption}</figcaption></figure>`;
const doeVignette = (name, alt, caption) => `<figure class="doe-vignette"><a href="./art/doe-${name}.png" target="_blank" rel="noopener noreferrer"><img src="./art/doe-${name}-reading.webp" alt="${escape(alt)}"></a><figcaption>${caption}</figcaption></figure>`;
const noteLink = (id, label) => `<p class="support-link"><a href="#${id}">${label} →</a></p>`;

const orbitSource = 'https://www.esa.int/Enabling_Support/Space_Transportation/Types_of_orbits';
const downlinkSource = 'https://www.esa.int/Enabling_Support/Space_Engineering_Technology/Data_Systems';
const orbitReferences = `<p class="plate-note orbital-sources">Scientific background: <a href="${orbitSource}" target="_blank" rel="noopener noreferrer">ESA — Types of orbits</a> (30 March 2020); <a href="${downlinkSource}" target="_blank" rel="noopener noreferrer">ESA — Data Systems</a> (22 June 2009); <a href="https://www.nasa.gov/mission/tracking-and-data-relay-satellites/" target="_blank" rel="noopener noreferrer">NASA — Tracking and Data Relay Satellites</a>. Consulted 16 November 2026. Drawings are conceptual, not to scale or an operational contact calculation.</p>`;
const conceptFigure = (kind, drawing, caption) => `<figure class="orbital-concept-figure" data-orbital-concept="${kind}">${drawing}<figcaption>${caption}</figcaption></figure>`;

function missionTypesDrawing() {
  const id = 'orbital-basics-missions';
  return sketch('Three mission families: an observation satellite measures terrain, a communications satellite relays signals between ground terminals, and navigation satellites broadcast signals to a receiver.', id, `
    <path d="M37 273Q137 226 240 273M288 273Q390 226 492 273M549 273Q649 226 754 273" opacity=".65"/>
    ${spacecraft(id, 138, 82)}
    <path d="M138 102L93 253M138 102L190 253" stroke-dasharray="4 5" opacity=".5"/>
    <path d="M94 252L138 241L190 253L144 266Z" fill="url(#${id})" stroke="var(--green)" stroke-width="2"/>
    ${spacecraft(id, 391, 82)}
    <path d="M320 246L383 104M399 104L462 246" stroke="var(--green)" stroke-dasharray="5 5"/>
    <path d="M374 114L383 104L383 118M450 237L462 246L462 232" stroke="var(--green)"/>
    <path d="M306 249L321 236L336 249M321 237V270M449 249L464 236L479 249M464 237V270"/>
    <g transform="translate(568 78) scale(.5)">${spacecraft(id, 0, 0)}</g>
    <g transform="translate(657 46) scale(.5)">${spacecraft(id, 0, 0)}</g>
    <g transform="translate(736 98) scale(.5)">${spacecraft(id, 0, 0)}</g>
    <path d="M568 92L653 242M657 60L653 242M736 112L653 242" stroke-dasharray="4 5" opacity=".6"/>
    <circle cx="653" cy="248" r="10" fill="url(#${id})"/><path d="M653 258V272"/>
    <circle cx="712" cy="185" r="24"/><path d="M712 170V185L724 194"/>
    <g fill="currentColor" stroke="none" font-family="Georgia,serif" font-size="30">
      <text x="77" y="326">Observe</text><text x="351" y="326">Relay</text><text x="594" y="326">Navigate</text>
    </g>`);
}

function orbitPanel(id, kind) {
  const settings = {
    leo: { rx: 66, ry: 45, angle: -35, x: 185, y: 133, label: 'LEO', altitude: 'Below ~2,000 km' },
    meo: { rx: 95, ry: 64, angle: -22, x: 210, y: 112, label: 'MEO', altitude: 'Between LEO &amp; GEO' },
    geo: { rx: 100, ry: 59, angle: 0, x: 234, y: 166, label: 'GEO', altitude: '~35,786 km' },
  }[kind];
  if (!settings) throw new Error(`Unknown orbit illustration: ${kind}`);
  const { rx, ry, angle, x, y, label, altitude } = settings;
  return `<ellipse cx="134" cy="166" rx="${rx}" ry="${ry}" transform="rotate(${angle} 134 166)" ${kind === 'geo' ? 'stroke="var(--green)" stroke-width="2"' : 'stroke-dasharray="5 4"'}/>
    <circle cx="134" cy="166" r="38" fill="var(--paper)"/>
    <path d="M108 143q19-15 30 3l-5 15 18 12-10 23-19-9 2-17-19-9Z" fill="url(#${id})" opacity=".7"/>
    ${kind === 'geo' ? '<path d="M100 166H168" opacity=".4"/><path d="M109 192Q134 205 158 191M152 188L158 191L155 197" opacity=".65"/>' : ''}
    <g transform="translate(${x} ${y}) scale(.42)">${spacecraft(id, 0, 0)}</g>
    <g fill="currentColor" stroke="none" text-anchor="middle" font-family="Georgia,serif">
      <text x="134" y="57" font-size="30">${label}</text>
      <text x="134" y="291" font-size="24">${altitude}</text>
    </g>`;
}

export function orbitTypeDrawing(kind) {
  const id = `orbital-basics-altitudes-${kind}`;
  const descriptions = {
    leo: 'LEO: an example low Earth orbit, below about 2,000 kilometres. Schematic, not to scale.',
    meo: 'MEO: an example medium Earth orbit between LEO and geostationary altitude. Schematic, not to scale.',
    geo: 'GEO: a circular equatorial orbit about 35,786 kilometres above Earth, matching its rotation. Schematic, not to scale.',
  };
  return sketch(descriptions[kind], id, orbitPanel(id, kind), '0 0 270 315');
}

function orbitTypesDrawing() {
  const id = 'orbital-basics-altitudes';
  return sketch('Three separate schematic views of Earth and example orbits: LEO close to Earth, MEO farther away, and circular equatorial GEO. Distances are not to scale; the LEO and MEO inclinations shown are examples, not requirements.', id,
    ['leo', 'meo', 'geo'].map((kind, index) => `<g transform="translate(${index * 266} 0)">${orbitPanel(id, kind)}</g>`).join(''));
}

function explorerExplanation(section) {
  const illustrations = {
    '### What Satellites Do': conceptFigure('missions', missionTypesDrawing(), 'Observation measures the planet; communications relay information; navigation broadcasts timing and orbit information. The navigation sketch shows some links, not a complete positioning solution.'),
    '### Where Satellites Fly': conceptFigure('orbits', orbitTypesDrawing(), 'Altitude families, not a scale drawing. LEO and MEO can have different inclinations. GEO is circular and equatorial, matching Earth’s rotation. Polar and sun-synchronous describe the path and its orientation, not a fourth altitude band.'),
    '### Bringing Data Back to Earth': `<div class="orbital-data-journey">
      ${conceptFigure('acquisition', '<img src="./art/orbital-observation-reading.webp" width="1143" height="1200" alt="Graphite illustration of an observation satellite, its solar panels and instrument aimed at terrain below. The dashed boundaries indicate an observation footprint, not a radio downlink.">', 'First: the instrument collects measurements and stores them on board. No ground reception is shown.')}
      ${conceptFigure('downlink', '<img src="./art/satellite-downlink-reading.webp" width="1200" height="1200" alt="Graphite illustration of a satellite transmitting toward a ground receiving dish. A dashed sage arrow runs from the spacecraft communications antenna to the dish, representing a radio link rather than visible light.">', 'Later, during a compatible contact: the satellite transmits stored data to a receiving station. Processing and product acceptance still follow.')}
    </div>${orbitReferences}`,
  };
  const groups = [];
  for (const block of section.blocks.slice(1)) {
    if (block.startsWith('### ')) groups.push([]);
    if (!groups.length) throw new Error('The illustrated orbital explanation must start with a heading.');
    groups.at(-1).push(block);
  }
  return groups.map(blocks => {
    const illustration = illustrations[blocks[0]];
    if (!illustration) throw new Error(`Missing orbital illustration for ${blocks[0]}`);
    return prose(section, blocks) + illustration;
  }).join('');
}

function meridianCompany(section) {
  return `<section class="meridian-company-plate wide-block" aria-label="Meridian and its mission">
    <div class="meridian-company-introduction">
      ${image('meridian-logo-reading.webp', 'Meridian wordmark beside a graphite Earth, inclined orbit and satellite dot.', 'Meridian — illustrated company identity.', 'meridian-logo')}
      ${prose(section)}
    </div>
    <div class="meridian-company-drawings">
      ${image('meridian-offices-rome-reading.webp', 'Conceptual Meridian offices in Rome, with a stone facade, trees and an orbital emblem beside the entrance.', 'Conceptual offices in Rome, not an actual facility or a ground station.')}
      ${image('meridian-world-map-reading.webp', 'Graphite world map locating Meridian in Rome, Italy, with an enlarged Italian peninsula inset.', 'Rome, Italy — illustrative cartography, not a georeferenced map.')}
    </div>
  </section>`;
}

const processStages = [
  ['Request', 'Define the area, product and deadline.'],
  ['Plan', 'Check the instrument, opportunity and resources.'],
  ['Acquire', 'Collect the observation.'],
  ['Downlink', 'Receive the spacecraft’s data on the ground.'],
  ['Process', 'Prepare the product.'],
  ['Quality check', 'Check coverage, geometry, quality and metadata.'],
  ['Deliver', 'Send the accepted product to an authorized recipient.'],
];
function fresco() {
  return `<section class="process-plate wide-block" aria-label="Acquisition-to-delivery fresco">
    <div class="journey-drawings">${image('orbital-observation-reading.webp', 'A satellite instrument observes terrain.', 'Acquisition: the instrument collects data.')}
    ${image('antenna-vignette-reading.webp', 'Receiving dish and pedestal.', 'Downlink: a separate contact brings data to the ground.')}</div>
    <ol class="process-map">${processStages.map(([title, detail], index) => `<li tabindex="0"><span class="process-map-number">${String(index + 1).padStart(2, '0')}</span><div><strong>${title}</strong><span>${detail}</span></div></li>`).join('')}</ol>
  </section>`;
}
function customers() {
  return `<div class="customer-uses" aria-label="Three customer needs">${[
    ['Agriculture', 'Comparable observations across a growing season', 'Seasonal consistency'],
    ['Emergency response', 'Recent information before a response decision', 'Product and deadline'],
    ['Defence', 'Controlled access, handling and delivery', 'Authorized recipients'],
  ].map(([title, need, boundary]) => `<section><span class="eyebrow">${boundary}</span><h3>${title}</h3><p>${need}</p></section>`).join('')}</div>`;
}
function agentConcept() {
  return `<figure class="si-diagram" aria-label="Agent components and mechanism boundaries"><div class="agent-ingredients">${[
    'Model', 'Context', 'Tools', 'State', 'Policies', 'Human approval',
  ].map(title => `<div class="domain"><strong>${title}</strong></div>`).join('')}</div>
  <dl class="mechanism-comparison" aria-label="Choose the mechanism for the responsibility"><div><dt>Agent</dt><dd>Context gathering and bounded option selection</dd></div><div><dt>Workflow</dt><dd>Known states, approvals, retries and routing</dd></div><div><dt>Deterministic solver</dt><dd>Resource conflicts, windows and feasibility</dd></div></dl>
  <figcaption>Mission systems validate and authorize execution; none of these mechanisms removes that boundary.</figcaption></figure>`;
}
function foundryJourney() {
  return `<ol class="process-list" aria-label="Foundry engineering lifecycle">${[
    ['Responsibility', 'Define each agent’s work and authority.'],
    ['Model and instructions', 'Compare candidates on the same mission cases.'],
    ['Tools and context', 'Connect approved operations and authorized sources.'],
    ['Evaluation', 'Test tool calls, constraints, evidence and approvals.'],
    ['Deployment', 'Approve processing geography, network paths and data handling.'],
    ['Observability', 'Trace the request, compare changes and retain release evidence.'],
  ].map(([title, detail]) => `<li><strong>${title}</strong><span>${detail}</span></li>`).join('')}</ol>`;
}
function supportingPage(id, title, sourcePages) {
  return {
    id, title, type: 'back', label: 'NOTE', left: '', right: sourcePages.map(page =>
      `<details class="supporting-note"><summary>${escape(page.title)}</summary><div>${page.left}${page.right}</div></details>`).join(''),
  };
}
function cleanSupporting(html) {
  return html
    .replace(/<a class="text-button" href="#[^"]+"[^>]*>[\s\S]*?<\/a>/g, '')
    .replace(/(?:FIELD STUDY|INSTRUMENT STUDY|ENGINEERING STUDY|OPERATIONS STUDY|PLATE [\w.]+|FIG\. [\d.]+|CLOSING PLATE)\s*—\s*/g, '')
    .replace(/Chapter 5/g, 'sequence 14').replace(/Chapter 7/g, 'sequence 10')
    .replace(/section 3\.3/g, 'the supporting safety notes');
}

export function createManuscriptBook(data, supporting, helpers) {
  if (data.wildfireScenario.requestId !== missionData.attica.requestId ||
      data.wildfireScenario.deadlineHours * 3600000 !== Date.parse(missionData.attica.deadline) - Date.parse(missionData.attica.start))
    throw new Error('The approved manuscript scenario and shared source data disagree.');
  const old = id => {
    const page = supporting.pages.find(page => page.id === id);
    if (!page) throw new Error(`Missing supporting content: ${id}`);
    return page;
  };
  const art = {};
  const openingSources = `<span class="opening-sources"><a href="https://sdup.esoc.esa.int/discosweb/statistics/" target="_blank" rel="noopener noreferrer">ESA — Space Environment Statistics</a>. Updated 13 November 2026; consulted 15 November 2026. The functioning-satellite figure covers all missions, not only Earth observation.</span>
    <span class="opening-sources"><a href="https://dataspace.copernicus.eu/news/2026-9-24-copernicus-data-space-ecosystem-cdse-releases-annual-report-2025" target="_blank" rel="noopener noreferrer">Copernicus Data Space Ecosystem — Annual Report 2025</a>. End-of-2025 archive; report announcement 24 September 2026; consulted 15 November 2026.</span>`;
  art[1] = image('changing-planet-observation-reading.webp', 'Graphite Earth-observation satellite above a conceptual coastline, agricultural fields, a river and a city; a sage outline marks an illustrative observation area.', `Observing land, water and human activity on a changing planet. Conceptual drawing, not a satellite image or a verified sensor footprint.${openingSources}`, 'industry-observation');
  art[2] = '<p class="plate-note">Meridian is a fictional Italian company used throughout this article.</p>';
  art[3] = plate(helpers.explorerPlate()) + `<div class="explorer-information"><details class="explorer-guide"><summary>How to explore</summary>
    <p>Watch the satellites move along their orbital planes. Drag to rotate and scroll to zoom; the full Explorer includes the ground network and planning views.</p>
    <dl class="explorer-cues">${[
    ['Orbit', 'Follow the moving spacecraft, not a fixed point above the customer.'],
    ['Observation opportunity', 'Look at the ground beneath the selected path.'],
    ['Station contact', 'Reception needs a compatible ground window.'],
    ['Elapsed simulated time', 'The playback clock runs at 60×, not real time.'],
  ].map(([title, detail]) => `<div><dt>${title}</dt><dd>${detail}</dd></div>`).join('')}</dl></details>
    <details class="explorer-limitations"><summary>Simulation and accessibility information</summary>
    <p>Visualization only: not live telemetry and not an operational feasibility calculation.</p>
    <p>Orbital simulation: time runs at 60×, not in real time. Spacecraft sizes are exaggerated. Playback stops when the explorer leaves the viewport.</p>
    <p>The teaching constellation has 30 satellites in five orbital planes, with 15 optical and 15 radar instruments, and three ground stations with four antennas in Norway, Spain and Kenya. Observation opportunities and compatible station contacts are separate constraints.</p>
    <p>Reduced-motion preferences require an explicit start. The globe has labelled controls, a fullscreen option and a separate full-Explorer link. If the visualization is unavailable, the static poster and this description remain available. Interactive geometry is a teaching aid, not a calculation of visibility, radio compatibility, weather or an approved mission plan.</p>
    </details></div>`;
  art[5] = fresco() + doeVignette('clearing', 'Graphite doe standing in a pine clearing, with upright ears, a pale rump patch and all four hooves on the ground.', 'A life beneath the orbit. Fictional graphite study.');
  art[6] = customers();
  art[7] = widget('intake');
  art[8] = widget('applications') + noteLink('architecture-notes', 'Current hosting, operator responsibilities and manual handoffs');
  const trailer = { id: 'trailer', title: 'The opening story', type: 'front', label: '—', left: '', right: `<section class="mission-intro" aria-label="The illustrated opening story">
    <div class="mission-intro-slot" data-mission-intro-featured data-state="idle">
      <button type="button" data-mission-intro-start hidden>Reload the film</button>
      <p data-mission-intro-status role="status">Loading the opening film. Use its play, pause and timeline controls; sound is off unless you enable it.</p>
    </div>
    <p>From orbit to a forest threatened by fire, follow a doe and the operators asked to provide an observation. The Doe Project takes its name from the animal at the heart of this fictional story. It is not a reconstruction of the 2024 Varnavas fire.</p>
    <p><a href="https://polite-tree-06ae32c10.3.azurestaticapps.net/intro/" target="_blank" rel="noopener noreferrer">Open the film in a separate tab</a> · <a class="start-reading" href="#industry">Continue the article →</a></p>
    </section>` };
  art[11] = `<div class="business-choices"><section><h3>Expand physical capacity</h3><p>Satellites · antennas · processing infrastructure</p></section><section><h3>Improve coordination</h3><p>Planning time · contact utilization · manual reconciliation</p></section></div>` +
    noteLink('methodology', 'Financial assumptions, latency definitions and KPI methodology') +
    doeVignette('listening', 'The same graphite doe raises her head and turns to listen; a faint plume of smoke rises beyond the distant treeline.', 'While plans change, life on the ground continues. Fictional study, not the Varnavas landscape.');
  art[12] = agentConcept();
  art[13] = widget('agents') + noteLink('technical-notes', 'Delegation levels, durable state and release gates');
  art[14] = '<p class="support-link"><a href="#agent-responsibilities">Explore each agent’s autonomy, applications, data and rights</a></p>' +
    noteLink('regulatory-notes', 'Legal, data and command-authorization qualifications');
  art[15] = `<figure class="manuscript-illustration foundry-deployment wide-block">
    <a href="./art/foundry-agents-graphite.png" target="_blank" rel="noopener noreferrer"><img src="./art/foundry-agents-graphite-reading.webp" alt="Microsoft Foundry Agents view showing meridian-product-delivery, meridian-downlink-processing, meridian-acquisition-planning, meridian-priority-negotiation and meridian-tasking-intake."></a>
    <figcaption>Meridian’s five demo agents in Microsoft Foundry. AI-generated illustrated reconstruction of the supplied deployment screenshot, not a live status view.</figcaption>
    </figure>` + foundryJourney() +
    image('mission-review-reading.webp', 'A hand reviews a mission plan with a pencil.', 'Evaluate the proposal and verify the authoritative operational state.') +
    `<p class="note-foot">Capability snapshot: 13 November 2026. Preview features, regional availability and service-specific terms require confirmation before adoption.</p>` +
    noteLink('technical-notes', 'Foundry deployment, tools, safeguards, evaluators and observability qualifications');
  art[16] = widget('revisit');
  art[17] = `<ol class="process-list">${[
    ['Read-only', 'Approved information and recommendation preparation'],
    ['Shadow planning', 'Compare recommendations with operator decisions'],
    ['Bounded actions', 'Approved reservations with reconciliation'],
    ['Operational review', 'Policy compliance, overrides, acceptance and service economics'],
  ].map(([title, detail]) => `<li><strong>${title}</strong><span>${detail}</span></li>`).join('')}</ol>` +
    noteLink('methodology', 'Rollout, baseline and evaluation methodology') +
    image('earth-sketch-complete-reading.webp', 'Earth and its orbiting constellation.', 'The same constellation, with accountable coordination around it.') +
    doeVignette('onward', 'The same graphite doe takes a careful step through the pine clearing, one front hoof lifted and the other legs supporting her weight.', 'Keep the purpose in view. Fictional study, not evidence of a rescue.') +
    `<nav class="supporting-links" aria-label="Supporting publication material">${[
      ['references', 'References'], ['image-credits', 'Scientific image credits'],
      ['glossary', 'Glossary'], ['methodology', 'Methodology'], ['regulatory-notes', 'Regulatory notes'],
      ['technical-notes', 'Technical notes'],
    ].map(([id, title]) => `<a href="#${id}">${title}</a>`).join('')}</nav>`;

  const cover = { ...old('cover') };
  cover.left = cover.left.replace('<a class="ink-button" href="#title-page">Begin reading <span aria-hidden="true">→</span></a>', '<a class="ink-button" href="#trailer">Enter the story →</a>');
  const pages = [cover, trailer,
    { id: 'contents', title: 'Contents · I', type: 'front', label: 'i', contents: [0, 1] },
    { id: 'contents-continued', title: 'Contents · II', type: 'front', label: 'iii', contents: [2] },
  ];
  for (const section of publishedSections) {
    const chapter = manuscriptChapters[section.part];
    let left = section.number === 3 ? '' : prose(section);
    let right = art[section.number] ?? '';
    if (section.number === 2) left = meridianCompany(section);
    if (section.number === 3) {
      right = right.replace('<div class="explorer-information">', `${prose(section, section.blocks.slice(0, 1))}<div class="explorer-information">`) +
        `<div class="explorer-explanation">${explorerExplanation(section)}</div>`;
    }
    if (section.number === 4) {
      const split = section.blocks.findIndex(block => block.startsWith('### '));
      left = prose(section, section.blocks.slice(0, split)) + plate(helpers.sensorExamples());
      right = prose(section, section.blocks.slice(split)) + plate(helpers.comparisonPlate());
    }
    if (section.number === 10) {
      left = atticaHistoricalChapter();
      right = '';
    }
    pages.push({
      id: ids[section.number - 1], title: section.title, type: 'chapter', chapter: chapter.number,
      chapterTitle: chapter.title, sectionNumber: String(section.number).padStart(2, '0'),
      sequenceNumber: section.number, part: section.part, opening: chapter.id === ids[section.number - 1],
      left, right, className: 'narrative manuscript-sequence',
    });
  }
  const methodology = supportingPage('methodology', 'Methodology and business assumptions', [
    { title: 'Publication and evidence', left: `<p>${escape(supporting.caseNote)}</p><p>The operational screens use a local teaching snapshot built from the shared request and Attica scenario sources. Status changes are demonstrations, not spacecraft execution. No measured improvement is asserted.</p>`, right: '' },
    old('business-case'), old('deployment-and-evaluation'),
  ]);
  const regulatory = supportingPage('regulatory-notes', 'Regulatory, rights and safety notes', [
    old('regulation'), old('rights-and-data'), old('safety-and-approval'),
  ]);
  const architecture = supportingPage('architecture-notes', 'Current systems and hosting notes', [
    old('existing-architecture'), old('business-applications'), old('current-planning'), old('information-boundaries'),
  ]);
  const technical = supportingPage('technical-notes', 'Architecture and Foundry technical notes', [
    old('agent-responsibilities'), old('continuous-planning'), old('hybrid-connectivity'),
    ...supporting.pages.filter(page => page.chapter === '06'),
  ]);
  const references = { ...old('references') };
  references.right += atticaBibliography();
  references.right += `<section class="opening-reference-notes"><h3>Opening statistics</h3>${openingSources}</section>`;
  references.right += `<section><h3>Satellite missions, orbits and downlink</h3>${orbitReferences}</section>`;
  const imageCredits = { ...old('image-credits') };
  imageCredits.right += `<section><h3>The Doe Project — recurring doe drawings</h3><p>Three AI-assisted graphite studies were generated on 26 November 2026 for this article: <a href="./art/doe-clearing.png">the clearing</a>, <a href="./art/doe-listening.png">listening</a> and <a href="./art/doe-onward.png">onward</a>. The opening film’s approved doe sprite was the character reference for the first drawing, which then served as the reference for the two variations. The slender build, long ears, pale rump patch and pine-clearing setting form a recurring visual motif; the drawings are not pixel-identical animation frames. Complete originals and uncropped proportional reading copies are retained, with generation and reference hashes in <a href="./art/provenance.json">image provenance</a>. These are fictional illustrations, not wildlife observations, a reconstruction of Varnavas, or evidence that an animal was rescued.</p></section>`;
  imageCredits.right += `<section><h3>Observing a changing planet</h3><p>The <a href="./art/changing-planet-observation.png">opening satellite-and-landscape drawing</a> was generated with AI on 19 November 2026 for the industry introduction. Graphite coastline, fields, river and city illustrate the subjects of Earth observation; the sage outline is conceptual. This is not a real satellite scene, named location, verified orbit, sensor footprint or measured change. The full original and an uncropped proportional reading copy are retained in <a href="./art/provenance.json">image provenance</a>. The earlier globe drawing remains unchanged on the cover and elsewhere.</p></section>`;
  imageCredits.right += `<section><h3>Microsoft Foundry agent deployment illustration</h3><p>The <a href="./art/foundry-agents-graphite.png">Foundry agent roster drawing</a> was generated with AI on 17 November 2026 from the supplied Microsoft Foundry screenshot, then revised to retain the product name and five exact agent names. It is an illustrated reconstruction, not an unaltered screenshot or evidence of current agent health, production readiness or mission execution. Incidental account and subscription identifiers are omitted. The complete generated PNG and an uncropped, same-resolution lossless WebP reading copy are retained; see <a href="./art/provenance.json">image provenance</a>.</p></section>`;
  imageCredits.right += `<section><h3>Historical Attica maps</h3><p>Copernicus Emergency Management Service, EMSR746, © 2024 European Union. Nine complete map images were retrieved from the official CEMS StoryMap on 16 November 2026: four published product maps, one fire-evolution illustration and four grading overview/detail images. Details and evolution views are not additional acquisitions. Original files, legends, embedded third-party imagery credits and source identifiers are retained in <a href="./art/provenance.json">image provenance</a>. Reading copies are proportionally resized without cropping, recolouring or compositing. No raw commercial satellite scene is redistributed. The source maps identify European Union, ESA and commercial imagery rights; the ArcGIS item does not specify a separate licence. Confirm the applicable CEMS product reuse terms before external republication.</p></section>` + atticaEvidenceNotes();
  imageCredits.right += `<section><h3>Meridian company illustrations</h3>
    <p>The <a href="./art/meridian-logo-original.png">company identity</a>, <a href="./art/meridian-offices-rome-concept.png">office exterior</a> and <a href="./art/meridian-world-map-rome.png">Rome locator map</a> were generated with AI for this fictional company on 16 November 2026. They are conceptual illustrations, not evidence of a real facility, address or corporate footprint. The office is not an additional ground station. The map is illustrative rather than georeferenced; its main Rome marker was corrected after generation.</p>
    <p>Originals are retained. The logo reading copy trims transparent outer margins; the office and map reading copies are proportionally resized without cropping. <a href="./art/provenance.json">Image provenance and limitations</a>.</p></section>`;
  imageCredits.right += `<section><h3>Mission, orbit and downlink drawings</h3><p>The mission-family and orbit-family sketches are authored SVG teaching diagrams, not satellite images, hardware blueprints or scale models. The acquisition illustration reuses the approved <a href="./art/orbital-observation.png">satellite observation drawing</a>. The companion <a href="./art/satellite-downlink.png">satellite-to-station downlink drawing</a> was generated with AI on 16 November 2026 using that illustration as its visual reference. Originals and proportionally resized reading copies are retained. The dashed downlink arrow represents radio transmission, not a visible beam. These conceptual views distinguish on-board collection from ground reception without computing an actual contact window or establishing physical scale. The seven-stage interactive process retains its existing SVG drawings. Scientific background is linked in the orbital explanation and bibliography; <a href="./art/provenance.json">image provenance and limitations</a> are retained.</p></section>`;
  pages.push(methodology, regulatory, architecture, technical, { ...old('glossary') }, references, imageCredits);
  pages.push({
    id: 'back-cover', title: 'Publication', type: 'back', label: '—',
    left: image('earth-sketch-complete-reading.webp', 'Complete Earth-observation illustration.', 'Conceptual illustration; see image credits.'),
    right: `<span class="eyebrow">${helpers.publication.eyebrow}</span><h2>${escape(helpers.publication.title)}<br><em>${escape(helpers.publication.subtitle)}</em></h2><p class="publication-byline">${escape(helpers.publication.author)}</p><a href="#industry">Begin reading →</a>`,
  });
  pages.forEach((page, index) => {
    page.folio = index * 2 + 1;
    if (page.type === 'back') {
      page.left = cleanSupporting(page.left);
      page.right = cleanSupporting(page.right);
    }
  });
  return { ...supporting, pages, chapters: manuscriptChapters.map(chapter => ({ ...chapter })), sequenceCount: publishedSections.length };
}
