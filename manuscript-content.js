import { manuscriptSections } from './manuscript-data.js';
import { missionData } from './mission-data.js';
import { sketch, spacecraft } from './process-illustrations.js';
import { atticaHistoricalChapter, atticaBibliography } from './attica-timeline.js';

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
const orbitReferences = `<p class="plate-note orbital-sources">Sources: <a href="${orbitSource}" target="_blank" rel="noopener noreferrer">ESA — Types of orbits</a>; <a href="${downlinkSource}" target="_blank" rel="noopener noreferrer">ESA — Data Systems</a>; <a href="https://www.nasa.gov/mission/tracking-and-data-relay-satellites/" target="_blank" rel="noopener noreferrer">NASA — Tracking and Data Relay Satellites</a>. Consulted 16 November 2026.</p>`;
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
    '### What Satellites Do': conceptFigure('missions', missionTypesDrawing(), 'Observe, relay, navigate.'),
    '### Where Satellites Fly': conceptFigure('orbits', orbitTypesDrawing(), 'Altitude families, not to scale.'),
    '### Bringing Data Back to Earth': `<div class="orbital-data-journey">
      ${conceptFigure('acquisition', '<img src="./art/orbital-observation-reading.webp" width="1143" height="1200" alt="Graphite illustration of an observation satellite, its solar panels and instrument aimed at terrain below. The dashed boundaries indicate an observation footprint, not a radio downlink.">', '1 · Acquire: the instrument collects and stores the data.')}
      ${conceptFigure('downlink', '<img src="./art/satellite-downlink-reading.webp" width="1200" height="1200" alt="Graphite illustration of a satellite transmitting toward a ground receiving dish. A dashed sage arrow runs from the spacecraft communications antenna to the dish, representing a radio link rather than visible light.">', '2 · Downlink: during a later contact, the data reaches a ground station.')}
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
      ${image('meridian-logo-reading.webp', 'Meridian wordmark beside a graphite Earth, inclined orbit and satellite dot.', '', 'meridian-logo')}
      ${prose(section)}
    </div>
    <div class="meridian-company-drawings">
      ${image('meridian-offices-rome-reading.webp', 'Conceptual Meridian offices in Rome, with a stone facade, trees and an orbital emblem beside the entrance.', '')}
      ${image('meridian-world-map-reading.webp', 'Graphite world map locating Meridian in Rome, Italy, with an enlarged Italian peninsula inset.', '')}
    </div>
    <p class="plate-note">Fictional company. Illustrations are conceptual.</p>
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
  ].map(([title]) => `<section><h3>${title}</h3></section>`).join('')}</div>`;
}
function agentConcept() {
  return `<figure class="si-diagram" aria-label="Agent components and mechanism boundaries"><div class="agent-ingredients">${[
    'Model', 'Context', 'Tools', 'State', 'Policies', 'Human approval',
  ].map(title => `<div class="domain"><strong>${title}</strong></div>`).join('')}</div>
  <dl class="mechanism-comparison" aria-label="Choose the mechanism for the responsibility"><div><dt>Agent</dt><dd>Context gathering and bounded option selection</dd></div><div><dt>Workflow</dt><dd>Known states, approvals, retries and routing</dd></div><div><dt>Deterministic solver</dt><dd>Resource conflicts, windows and feasibility</dd></div></dl>
  <figcaption>Model, tools and workflow have distinct responsibilities.</figcaption></figure>`;
}
function foundryJourney() {
  return `<ol class="process-list" aria-label="Foundry engineering lifecycle">${[
    ['Responsibility', 'Define each agent’s work and authority.'],
    ['Model', 'Compare candidates on the same mission cases.'],
    ['Tools', 'Connect approved operations and authorized sources.'],
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
const matrix = (headings, rows) => `<table class="matrix"><thead><tr>${headings.map(label => `<th scope="col">${label}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((value, index) => `<${index ? 'td' : 'th scope="row"'}>${value}</${index ? 'td' : 'th'}>`).join('')}</tr>`).join('')}</tbody></table>`;
function sourceTable(page) {
  const table = (page.left + page.right).match(/<table\b[\s\S]*?<\/table>/)?.[0];
  if (!table) throw new Error(`Missing reference table: ${page.id}`);
  return table;
}
function technicalNotes(old) {
  const entry = (title, text, body, detail = '') => ({ title, left: `<p>${text}</p>`, right: body + (detail ? `<details class="technical-detail"><summary>Implementation detail</summary>${detail}</details>` : '') });
  return [
    entry('Mission record and replanning',
      'The orchestrator keeps one versioned mission record. Each change has an owner, so one agent cannot silently overwrite another’s reservation. When a new request, a weather update, a station conflict or a failed quality check arrives, the plan is recomputed from a consistent snapshot, keeping approved work stable where possible. Before retrying an action, the orchestrator checks its last status; if the plan has changed, it checks whether the approval still applies.',
      sourceTable(old('continuous-planning')),
      old('continuous-planning').right.replace(/<span class="section-label">[\s\S]*?<\/span>|<h2>[\s\S]*?<\/h2>|<aside[\s\S]*?<\/aside>/g, '')),
    entry('Hybrid integration',
      'Mission and enterprise sources each retain their own access boundary.',
      matrix(['Source', 'Rule'], [
        ['Mission systems via self-hosted MCP gateway', 'Narrow, typed adapters with separate read, reserve and execution-request scopes'],
        ['SharePoint procedures', 'Retrieved under the user’s identity, with version and effective date. A procedure informs a decision; it never grants a permission'],
        ['CRM and analytics', 'Entitlements and SLA terms read from the system of record, with the policy version used'],
      ]) + '<p class="note-foot">MCP authorisation secures the integration; it does not prove the business action is authorised.</p>',
      '<h4>Tool contracts</h4>' + sourceTable(old('hybrid-connectivity'))),
    entry('Model selection',
      'Start from the job, not a favourite model. Foundry lets Meridian compare up to three candidates on the same instructions, tools and test state. Measure cost across the whole task rather than per token, and keep a selection record per agent: the five agents do not need the same model. A language-model benchmark says nothing about optical or radar processing accuracy, which needs its own qualification.',
      sourceTable(old('building-with-foundry'))),
    entry('Evaluation cases',
      'Each test case states the mission situation, what the agent may know and what a correct outcome looks like. Cover the exceptions, not only the request: ambiguous coordinates, a protected commitment, a contact that is visible but not confirmed, a product whose rights forbid delivery, stale data, duplicates and injection attempts. Include legitimate crisis vocabulary such as fire or explosion. Domain experts approve the expected outcomes, and tuning and validation sets stay separate.',
      matrix(['Test record', 'Required evidence'], [
        ['Initial state', 'Request, permitted context, policy versions and available tools'],
        ['Expected outcome', 'Required and prohibited actions, including the resulting API state'],
        ['Validation', 'Domain-owner review and an independent, versioned validation set'],
      ]),
      '<p>Map the fields required by the selected evaluator; one schema is not universal.</p>' + sourceTable(old('foundry-dataset'))),
    entry('Deployment choices',
      'Choose where inference runs according to the customer contract, the data classification and the recipient. Global, Data Zone and geography-based deployments are different answers: check the exact processing footprint rather than the resource name. Restricted image pixels stay in GeoFactory; agents only exchange identifiers, metadata and results. Apply the same boundary to evaluation judges and traces. GDPR, licensing and export obligations need their own legal review.',
      sourceTable(old('foundry-deployment'))),
    entry('Runtime and tools',
      'A prompt agent runs in Foundry’s managed runtime, a hosted agent brings its own code, and an agent running elsewhere can still be observed and evaluated. Give each agent only the capabilities its job needs: narrow typed operations, not a general shell into mission systems. Foundry Toolboxes group each agent’s tools behind an MCP endpoint, while the self-hosted gateway still controls access to Meridian’s hybrid environment. A tool approval is not MissionControl’s authorisation of a command.',
      sourceTable(old('foundry-runtime')),
      '<p>Choose runtime features according to supported models, regions and connectivity. A Toolbox change changes the agent’s reachable capabilities and requires evaluation.</p>'),
    entry('Safeguards and evaluation',
      'Guardrails can inspect user input, tool calls, tool responses and outputs; Prompt Shields detects injected instructions. Test them on real crisis requests so that useful vocabulary is not blocked. Before release, Foundry evaluators assess intent, task completion and tool use, while code-based checks verify exact facts: schema, coordinates, duplicates and the final state of the mission system. A described reservation is not a reservation: check the system.',
      matrix(['Check', 'Evidence'], [
        ['Guardrails', 'Injection detection and appropriate treatment of legitimate crisis vocabulary'],
        ['Evaluators', 'Intent, task completion, tool selection and use of returned evidence'],
        ['Code-based checks', 'Exact schema, coordinates, plan version, duplicate-action prevention and authoritative API receipt'],
      ]),
      '<p>Confirm intervention coverage for the selected integration. Agent policy replaces the model guardrail policy; do not assume omitted controls survive. Runtime Task Adherence signals and offline evaluator scores serve different purposes. Calibrate rubric judges with domain experts and retain their versions.</p>'),
    entry('Observation and governance',
      'Tracing, based on OpenTelemetry and Application Insights, follows a request across the five agents and their APIs; business events record reservations, quality reviews and approvals. Control Plane gives the inventory and governance view of the agents, while MissionControl keeps authority over space operations. Any change of model, prompt, tool or policy re-runs the relevant tests, and an observed failure becomes a regression case.',
      matrix(['Record', 'Purpose'], [
        ['Trace', 'Correlated calls, errors, latency and permitted telemetry'],
        ['Business event', 'Reservations, quality decisions and approvals'],
        ['Release record', 'Owner, configuration versions, regression results and rollback'],
      ]),
      '<p>Configure masking, access and retention; keep required audit events separate from sampled traces. Bound monitoring volume and cost, retain judge versions and inspect failures by customer profile and risk.</p>'),
  ];
}
function cleanSupporting(html) {
  return html
    .replace(/<a class="text-button" href="#[^"]+"[^>]*>[\s\S]*?<\/a>/g, '')
    .replace(/(?:FIELD STUDY|INSTRUMENT STUDY|ENGINEERING STUDY|OPERATIONS STUDY|PLATE [\w.]+|FIG\. [\d.]+|CLOSING PLATE)\s*—\s*/g, '')
    .replace(/Chapter 5/g, 'Part III').replace(/Chapter 7/g, 'the wildfire case')
    .replace(/<span class="section-label">[\s\S]*?<\/span>/g, '')
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
  const openingSources = `<p class="opening-sources">¹ <a href="https://sdup.esoc.esa.int/discosweb/statistics/" target="_blank" rel="noopener noreferrer">ESA, Space Environment Statistics</a>, updated 13 November 2026. All missions, not only Earth observation. ² <a href="https://dataspace.copernicus.eu/news/2026-9-24-copernicus-data-space-ecosystem-cdse-releases-annual-report-2025" target="_blank" rel="noopener noreferrer">Copernicus Data Space Ecosystem, Annual Report 2025</a>. Consulted 15 November 2026.</p>`;
  art[1] = image('changing-planet-observation-reading.webp', 'Graphite Earth-observation satellite above a conceptual coastline, agricultural fields, a river and a city; a sage outline marks an illustrative observation area.', 'Conceptual drawing.', 'industry-observation') + openingSources;
  art[2] = '<p class="plate-note">Meridian is a fictional Italian company used throughout this article.</p>';
  art[3] = plate(helpers.explorerPlate()) + `<div class="explorer-information"><details class="explorer-limitations"><summary>About this simulation</summary><p>The teaching constellation has 30 satellites in five orbital planes (15 optical, 15 radar) and three ground stations with four antennas in Norway, Spain and Kenya. Spacecraft sizes are exaggerated. An observation opportunity and a station contact are two separate constraints.</p></details></div>`;
  art[5] = fresco() + doeVignette('clearing', 'Graphite doe standing in a pine clearing, with upright ears, a pale rump patch and all four hooves on the ground.', 'A life beneath the orbit. Fictional graphite study.');
  art[6] = customers();
  art[7] = noteLink('existing-architecture', 'Follow AR-1842 through Meridian’s applications');
  art[8] = widget('applications') + noteLink('architecture-notes', 'Current hosting, operator responsibilities and manual handoffs');
  const trailer = { id: 'trailer', title: 'The opening story', type: 'front', label: '—', left: '', right: `<section class="mission-intro" aria-label="The illustrated opening story">
    <div class="mission-intro-slot" data-mission-intro-featured data-state="idle">
      <button type="button" data-mission-intro-start hidden>Reload the film</button>
      <p class="sr-only" data-mission-intro-status role="status">Loading the opening film. Use its play, pause and timeline controls; sound is off unless you enable it.</p>
    </div>
    <p>A fictional story: a doe, a forest threatened by fire, and the operators asked to observe it. Not a reconstruction of the 2024 Varnavas fire.</p>
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
    <figcaption>Illustrated reconstruction of the Foundry deployment, not a live view.</figcaption>
    </figure>` + foundryJourney() +
    image('mission-review-reading.webp', 'A hand reviews a mission plan with a pencil.', 'Evaluate the proposal and verify the authoritative operational state.') +
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
    if (section.number === 7) left = '<span class="evidence-badge evidence-fictional">Fictional scenario</span>' + left;
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
    { title: 'Publication and evidence', left: '<p>Meridian is a fictional operator. Financial figures and performance targets are working assumptions, not measured results. The demo screens use a teaching dataset; their status changes do not command any spacecraft.</p><p>Unknown booking times do not establish overlapping station windows. The Attica scenario geometry is separate from the constellation Explorer. Queue counts do not measure throughput.</p>', right: '' },
    old('business-case'), old('deployment-and-evaluation'),
    { title: 'Reading the illustrations', left: '<p>Orbital views are schematics: LEO and MEO inclinations vary; GEO is circular and equatorial. Sun-synchronous geometry supports comparable local solar time, not guaranteed daily coverage or identical weather. Navigation links illustrate broadcasts, not a complete positioning solution.</p><p>Optical illumination and cloud constraints depend on the instrument and product. Visibility alone does not establish calibration, geometry or acceptance. The Sentinel examples have different dates and extents; they are not a controlled performance comparison. The simulated cloud layer changes no terrain pixels.</p><p>The Explorer stops offscreen, respects reduced-motion preferences and keeps a static poster and labelled controls available. These behaviours do not calculate operational radio compatibility or mission feasibility.</p>', right: '' },
  ]);
  const regulatory = supportingPage('regulatory-notes', 'Regulatory, rights and safety notes', [
    old('regulation'), old('rights-and-data'), old('safety-and-approval'),
  ]);
  const architecture = supportingPage('architecture-notes', 'Current systems and hosting notes', [
    { title: 'Current systems', left: '<p>Four applications support the people who plan observations, receive data, produce imagery and authorise spacecraft operations. The Customer Tasking Portal and Tasking Desk are entry points; CRM and SharePoint supply context. The diagrams below show the manual workflow between operators and where each service runs today. The agentic layer sits on top of these applications; it does not replace them or move restricted imagery into a model.</p>', right: old('existing-architecture').right },
    { title: 'Simplified operator workflow', left: '', right: helpers.operatorFlow() },
    { title: 'Current hosting', left: helpers.runtimeView(), right: matrix(['Service', 'Reference hosting boundary'], [
      ['OrbitPlanner / GroundLink', 'On-premises or private-cloud planning and ground operations'],
      ['GeoFactory', 'Permitted image storage and optical / SAR processing environment'],
      ['MissionControl', 'Isolated engineering validation and flight-control / TT&C environment'],
      ['CRM / SharePoint', 'Separate enterprise sources, accessed through controlled interfaces'],
    ]) },
  ]);
  const technical = supportingPage('technical-notes', 'Architecture and Foundry technical notes', technicalNotes(old));
  technical.left = '<p class="note-foot foundry-status">Foundry capabilities described here follow Microsoft Learn as of 13 November 2026. Preview features carry no SLA and are not recommended for production; confirm terms and regional availability before adoption.</p>';
  technical.right += '<p>In short: shortlist a model, test it on mission cases, approve its deployment boundary, connect narrow tools, challenge its safeguards, trace it, and compare each new version against the reference.</p>';
  const references = { ...old('references') };
  references.right += atticaBibliography();
  references.right += `<section class="opening-reference-notes"><h3>Opening statistics</h3>${openingSources}</section>`;
  references.right += `<section><h3>Satellite missions, orbits and downlink</h3>${orbitReferences}</section>`;
  const imageCredits = { ...old('image-credits'), left: '', right: matrix(['Image', 'Source and credit', 'Note'], [
    ['Optical example, Rome', 'European Union, Copernicus Sentinel-2 (2023), processed by @DEFIS_EU', 'Resized, not cropped'],
    ['Radar example, central Italy', 'Contains modified Copernicus Sentinel data (2018), processed by ESA; <a href="https://creativecommons.org/licenses/by-sa/3.0/igo/">CC BY-SA 3.0 IGO</a>', 'False colours; resized, not cropped'],
    ['Varnavas maps (9 images)', '© 2024 European Union, Copernicus EMS, EMSR746. <a href="https://storymaps.arcgis.com/stories/e72e6348c2f04c1f80e934345e796feb">Official CEMS source</a>', 'Complete originals and embedded imagery credits retained. Published maps, not raw commercial scenes. Confirm CEMS reuse terms before republication'],
    ['Graphite illustrations, doe studies, Meridian identity, office and Rome map', 'AI-generated for this article, November 2026', 'Conceptual, not real facilities or evidence of a rescue. Logo margins trimmed; other reading copies proportionally resized'],
    ['Foundry agent roster', 'AI-generated reconstruction of a Foundry screenshot', 'Not a live status view'],
    ['Cloud comparison', 'AI-generated fictional terrain with simulated cloud overlay', 'Same terrain in both panels'],
    ['Orbit and mission diagrams', 'Authored SVG diagrams', 'Not to scale'],
  ]) + '<p><a href="./art/provenance.json">Originals, source links and image provenance</a>.</p>' };
  const glossary = { ...old('glossary') };
  glossary.left = '<p>Mission and architecture terms, in alphabetical order.</p>';
  pages.push(methodology, regulatory, architecture, technical, glossary, references, imageCredits);
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
