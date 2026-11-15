import { manuscriptSections } from './manuscript-data.js';
import { missionData } from './mission-data.js';

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
export const manuscriptChapters = partTitles.map((title, part) => {
  const sections = manuscriptSections.filter(section => section.part === part);
  return {
    number: String(part + 1).padStart(2, '0'), title, id: ids[sections[0].number - 1],
    sections: sections.map(section => [ids[section.number - 1], section.title]),
  };
});

export const legacyAnchors = Object.freeze({
  'meet-meridian': 'industry',
  couverture: 'cover', 'page-de-garde': 'cover', 'title-page': 'cover',
  resume: 'methodology', abstract: 'methodology', sommaire: 'contents',
  industrie: 'industry', contraintes: 'regulatory-notes', regulation: 'regulatory-notes',
  'rights-and-data': 'regulatory-notes', 'safety-and-approval': 'regulatory-notes',
  existant: 'existing-architecture', 'business-applications': 'existing-architecture',
  'current-planning': 'existing-architecture', 'information-boundaries': 'existing-architecture',
  accelerateur: 'accelerator', incendie: 'wildfire', 'mission-lab': 'wildfire',
  'operational-bottlenecks': 'challenges', 'continuous-planning': 'agent-responsibilities',
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
const noteLink = (id, label) => `<p class="support-link"><a href="#${id}">${label} →</a></p>`;

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
function integration(helpers) {
  return `<figure class="si-diagram" aria-label="Layered agent and mission-system architecture">
    <div class="domain"><strong>Five agents + durable orchestrator</strong><span>Versioned mission state</span></div>
    <div class="system-link"></div><div class="gateway"><strong>Authenticated adapters / self-hosted MCP gateway</strong><p>Identity · scoped tools · audit</p></div>
    <div class="permission-levels">${[
      ['Read', 'Availability, entitlements, procedures'], ['Propose', 'Versioned candidate plan'],
      ['Reserve', 'Approved resource action'], ['Authorize', 'MissionControl only'],
    ].map(([title, detail]) => `<div class="domain"><strong>${title}</strong><span>${detail}</span></div>`).join('')}</div>
    <div class="si-app-grid">${['OrbitPlanner', 'GroundLink', 'GeoFactory', 'MissionControl'].map(name => `<div class="domain"><strong>${name}</strong></div>`).join('')}</div>
    <div class="si-boundary"><strong>Physical systems</strong><p>Spacecraft · ground stations · imagery storage and processing</p></div>
    <div class="system-buttons">${helpers.systems.map(([title, subtitle], index) => `<button type="button" data-system="${index}" aria-pressed="${index === 0}" aria-controls="system-detail">${title}<small>${subtitle}</small></button>`).join('')}</div>
    <div class="system-detail detail-panel" id="system-detail" aria-live="polite"><h3>${helpers.systems[0][0]}</h3><p>${helpers.systems[0][2]}</p></div>
    <figcaption>CRM and permission-aware SharePoint retrieval supply context. Read, propose, reserve and authorize are separate authorities.</figcaption></figure>`;
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
    <span class="opening-sources"><a href="https://dataspace.copernicus.eu/news/2026-9-24-copernicus-data-space-ecosystem-cdse-releases-annual-report-2025" target="_blank" rel="noopener noreferrer">Copernicus Data Space Ecosystem — Annual Report 2025</a>. End-of-2025 archive; report announcement 24 September 2026; consulted 15 November 2026.</span>
    <span class="opening-sources">Meridian is a fictional Italian company used throughout this article.</span>`;
  art[1] = image('earth-sketch-complete-reading.webp', 'Graphite Earth, spacecraft and ground antenna.', `Observing Earth connects a place, a time and a question.${openingSources}`, 'restrained-art');
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
  art[5] = fresco();
  art[6] = customers();
  art[7] = widget('intake');
  art[8] = widget('applications') + noteLink('architecture-notes', 'Current hosting, operator responsibilities and manual handoffs');
  art[9] = widget('timeline');
  art[10] = widget('wildfire') + widget('decisions') +
    image('forest.webp', 'Conceptual wooded valley; not Attica geography.', 'Conceptual landscape only, not a map or reconstruction of the Attica fire.', 'supporting-landscape');
  art[11] = `<div class="business-choices"><section><h3>Expand physical capacity</h3><p>Satellites · antennas · processing infrastructure</p></section><section><h3>Improve coordination</h3><p>Planning time · contact utilization · manual reconciliation</p></section></div>` +
    noteLink('methodology', 'Financial assumptions, latency definitions and KPI methodology');
  art[12] = agentConcept();
  art[13] = widget('agents') + noteLink('technical-notes', 'Delegation levels, durable state and release gates');
  art[14] = integration(helpers) + noteLink('regulatory-notes', 'Legal, data and command-authorization qualifications');
  art[15] = foundryJourney() +
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
    `<nav class="supporting-links" aria-label="Supporting publication material">${[
      ['references', 'References'], ['image-credits', 'Scientific image credits'],
      ['glossary', 'Glossary'], ['methodology', 'Methodology'], ['regulatory-notes', 'Regulatory notes'],
      ['technical-notes', 'Technical notes'],
    ].map(([id, title]) => `<a href="#${id}">${title}</a>`).join('')}</nav>`;

  const cover = { ...old('cover') };
  cover.left = cover.left.replace('href="#title-page"', 'href="#industry"');
  const pages = [cover,
    { id: 'contents', title: 'Contents · I', type: 'front', label: 'i', contents: [0, 1] },
    { id: 'contents-continued', title: 'Contents · II', type: 'front', label: 'iii', contents: [2] },
  ];
  for (const section of manuscriptSections) {
    const chapter = manuscriptChapters[section.part];
    let left = section.number === 3 ? '' : prose(section);
    let right = art[section.number] ?? '';
    if (section.number === 3) {
      right = right.replace('<div class="explorer-information">', `${prose(section)}<div class="explorer-information">`);
    }
    if (section.number === 4) {
      const split = section.blocks.findIndex(block => block.startsWith('### '));
      left = prose(section, section.blocks.slice(0, split)) + plate(helpers.sensorExamples());
      right = prose(section, section.blocks.slice(split)) + plate(helpers.comparisonPlate());
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
  references.right += `<section class="opening-reference-notes"><h3>Opening statistics</h3>${openingSources}</section>`;
  pages.push(methodology, regulatory, architecture, technical, { ...old('glossary') }, references, { ...old('image-credits') });
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
  return { ...supporting, pages, chapters: manuscriptChapters.map(chapter => ({ ...chapter })), sequenceCount: manuscriptSections.length };
}
