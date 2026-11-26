import { createManuscriptBook, manuscriptChapters } from './manuscript-content.js';

export const publication = Object.freeze({
  eyebrow: 'ILLUSTRATED WHITE PAPER · 2026',
  title: 'The Doe Project',
  subtitle: 'Coordinating Earth Observation with AI Agents',
  author: 'Lucile Jeanneret',
  description: 'When a wildfire spreads or a river floods, satellite images can help emergency teams see what is happening and decide where to act. But getting those images to the people who need them takes time—while the situation on the ground keeps changing.',
});
export const bookTitle = `${publication.title} — ${publication.subtitle}`;

export const chapters = manuscriptChapters;

const legacyChapters = [
  { number: '01', id: 'industry', title: 'About Meridian and the Geospatial Industry', sections: [
    ['industry', 'Meridian’s place in the geospatial industry'],
    ['observation-lifecycle', 'How an observation becomes useful information'],
    ['sensors-and-customers', 'What optical and radar observations can tell us'],
    ['orbital-network', 'Explore the orbital network'],
  ] },
  { number: '02', id: 'challenges', title: 'The business challenges', sections: [
    ['challenges', 'Urgent requests in a daily planning cycle'],
    ['operational-bottlenecks', 'Acquisition, downlink and processing bottlenecks'],
    ['business-case', 'The commercial case and success measures'],
  ] },
  { number: '03', id: 'regulation', title: 'Regulatory and operational constraints', sections: [
    ['regulation', 'The regulatory landscape'],
    ['rights-and-data', 'Data rights, export screening and privacy'],
    ['safety-and-approval', 'Command validation and human oversight'],
  ] },
  { number: '04', id: 'existing-architecture', title: 'The existing operator architecture', sections: [
    ['existing-architecture', 'Information-system overview'],
    ['business-applications', 'The four operational applications'],
    ['current-planning', 'How operators use the applications'],
    ['information-boundaries', 'How the services run today'],
  ] },
  { number: '05', id: 'agents-and-workflows', title: 'The agentic approach and solution', sections: [
    ['agents-and-workflows', 'Choosing agents, workflows and solvers'],
    ['accelerator', 'The target architecture and its boundaries'],
    ['agent-responsibilities', 'Five agents and their end-to-end responsibilities'],
    ['continuous-planning', 'Continuous planning and controlled execution'],
    ['hybrid-connectivity', 'Self-hosted MCP access, SharePoint and business APIs'],
    ['deployment-and-evaluation', 'Deployment sequence, evaluation and operations'],
  ] },
  { number: '06', id: 'building-with-foundry', title: 'How to Build Agentic Earth-Observation Agents with Microsoft Foundry', sections: [
    ['building-with-foundry', 'Choose a model for each responsibility'],
    ['foundry-dataset', 'Turn mission situations into evaluation cases'],
    ['foundry-deployment', 'Choose where data and inference may run'],
    ['foundry-runtime', 'Connect the runtime to bounded tools'],
    ['foundry-safeguards', 'Evaluate behaviour and enforce safeguards'],
    ['foundry-operations', 'Observe, govern and improve the agents'],
  ] },
  { number: '07', id: 'wildfire', title: 'A wildfire observation request', sections: [
    ['wildfire', 'The incident, the request and the deadline'],
    ['mission-lab', 'Explore the mission decisions'],
    ['mission-debrief', 'Trace the decision and its consequences'],
  ] },
];

export const definitions = [
  ['Acquisition', 'The moment a payload collects an observation. The data still needs to reach the ground, pass processing and quality checks, and be delivered.'],
  ['Analysis-ready product', 'Data processed and documented for a specified analytical use. The product requirements define its calibration, geometry, quality and metadata.'],
  ['Area of interest (AOI)', 'The geographic area the customer wants to observe. Its size and required coverage affect which acquisitions and products are feasible.'],
  ['Constellation', 'A group of spacecraft operated together. Their orbits, instruments and available resources determine when and where they can observe.'],
  ['Downlink', 'The transfer of data from a spacecraft to a ground station during a compatible contact window.'],
  ['Ground segment', 'The ground-based systems used for communications, spacecraft control and mission or payload operations. Operators divide these responsibilities differently.'],
  ['Latency', 'The time between two specified events. Always state the start and end: a request-to-acquisition measurement stops earlier than one that includes product acceptance.'],
  ['Optical imaging', 'Observation using optical wavelengths. Illumination, cloud and smoke can affect the result, depending on the instrument and the product required.'],
  ['Payload', 'The instrument, or set of instruments, that performs the observation. The spacecraft platform provides the support it needs to operate.'],
  ['Revisit', 'The interval between opportunities to observe the same location. A return pass may still produce unusable data or arrive too late for delivery.'],
  ['SAR', 'Synthetic aperture radar, an active imaging technique that can observe through cloud. Its data requires a different interpretation from optical imagery.'],
  ['Tasking', 'The process of turning a customer’s observation need into an authorized acquisition request, subject to feasibility and priority rules.'],
  ['Uplink', 'A transmission from the ground to a spacecraft. Command products sent this way need their own authorization; a proposed plan is not yet a command.'],
  ['Workflow', 'A defined sequence of steps and rules. A workflow can call a model while keeping its sequence of actions deterministic.'],
  ['Agent', 'A system that chooses actions and tools to pursue an objective within the authority it has been given.'],
  ['MCP', 'Model Context Protocol, used to expose capabilities such as tools and resources. Business permissions and command checks still need to be enforced by the application.'],
  ['Self-hosted gateway', 'An access component run in an environment the organization controls. It routes approved interactions and applies the configured access policies.'],
  ['L3 / L4', 'The delegation labels used in this architecture, not a universal standard. L3 acts within policy; L4 owns routine work from start to finish within approved limits. Safety-critical approval still applies at either level.'],
  ['Service-level agreement (SLA)', 'The contractual definition of a service commitment: how it is measured, what it covers, its exclusions and the remedies if it is missed. A performance target alone provides no such guarantee.'],
  ['Mission orchestrator', 'The component that keeps the mission record, calls specialist agents and tracks validation, approvals and execution results.'],
  ['Earth observation', 'The collection of information about the Earth’s surface, atmosphere and environment. Satellites are one source; aircraft and measurements taken on the ground also contribute.'],
  ['Ground station', 'A facility with antennas and communications equipment that exchanges data with spacecraft during compatible contact windows. A station is one part of the wider ground segment.'],
  ['Geospatial information', 'Information tied to a location on Earth. Its location makes it possible to compare observations with maps, other measurements and the same place at another time.'],
  ['Remote sensing', 'Measuring an object or area from a distance using an instrument. Satellite Earth observation uses signals such as reflected sunlight or radar echoes to learn about the surface without visiting it.'],
  ['Spatial resolution', 'A measure of the spatial detail an observation can distinguish. Pixel size is related, but does not by itself guarantee that a feature can be identified reliably.'],
];

const readingTerms = [
  'Earth observation', 'Constellation', 'Ground station', 'Geospatial information',
  'Remote sensing', 'Area of interest (AOI)', 'Tasking', 'Payload', 'Acquisition',
  'Downlink', 'Analysis-ready product', 'Latency', 'Optical imaging', 'SAR',
  'Spatial resolution', 'Revisit',
];

export const systems = [
  ['Hybrid mission systems', 'Self-hosted MCP servers', 'Approved adapters expose specific planning, station and processing operations. Reading availability, reserving a resource and requesting execution each require different permissions. Spacecraft commands still pass through deterministic validation and the required human approval.'],
  ['Collaboration', 'SharePoint', 'Retrieve the procedures the reader is allowed to see, keeping the document version, source, owner and effective date. A procedure can explain how to handle an exception; it cannot give an agent permission to perform an otherwise restricted action.'],
  ['Business', 'CRM and analytics', 'Check customer entitlements, SLA terms, commercial priorities and measured service history. Priority decisions follow the approved policy and contract. The model cannot invent a price or change an agreement.'],
];

export const scenarioOptions = [
  ['optical', 'Keep the optical impact-map requirement', 'Check whether weather, coverage and the remaining time allow the requested product.', 'In the baseline incident, observed cloud differs from the forecast. Check the optical acquisition’s suitability, explain the quality risk and look for an approved recovery plan before promising delivery. The requested product remains unchanged.'],
  ['radar', 'Assess a radar-based alternative', 'Check whether the customer could use a different product.', 'Radar may provide an observation through cloud, but it does not produce an equivalent optical fire-impact map. Check availability and suitability, then obtain the customer’s agreement before changing the product. This option does not imply direct flame detection.'],
  ['escalate', 'Request a priority or product exception', 'Explain what would change and whose approval is needed.', 'Show which customer commitments would be affected, how the product would differ and whether the deadline is still at risk. If no option meets the constraints, report that and explain any useful partial response. An agent cannot invent a pass or approve its own safety-critical action.'],
];

const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const p = (...paragraphs) => paragraphs.map(text => `<p>${text}</p>`).join('');
const lead = text => `<p class="lead">${text}</p>`;
const note = text => `<p class="note-foot">${text}</p>`;
const heading = (label, title) => `<span class="section-label">${label}</span><h2>${title}</h2>`;
const sub = (title, text) => `<h3>${title}</h3>${p(text)}`;
const annotation = text => `<aside class="annotation">${text}</aside>`;
const link = (id, text) => `<a class="text-button" href="#${id}">${text} <span aria-hidden="true">→</span></a>`;
const cite = number => `<sup><a class="reference-link" href="#references" aria-label="Reference ${number}">[${number}]</a></sup>`;
const foundryReferences = [
  ['Model selection and evaluation', [
    ['Model benchmarks', 'concepts/model-benchmarks'],
    ['Model comparison', 'how-to/benchmark-model-in-catalog'],
    ['Evaluation overview', 'concepts/evaluation-overview'],
  ]],
  ['Evaluation datasets', [
    ['Dataset schema', 'observability/how-to/evaluation-dataset-schema'],
  ]],
  ['Deployment and data handling', [
    ['Deployment types', 'foundry-models/concepts/deployment-types'],
    ['Data privacy for models sold by Azure', 'responsible-ai/openai/data-privacy'],
    ['Private networking', 'agents/how-to/virtual-networks'],
  ]],
  ['Agent runtimes and tools', [
    ['Agent Service', 'agents/overview'],
    ['Microsoft Copilot harness', 'agents/how-to/use-tools-skills-copilot-harness'],
    ['Toolboxes', 'agents/concepts/toolbox-overview'],
  ]],
  ['Safeguards and evaluators', [
    ['Guardrails', 'guardrails/guardrails-overview'],
    ['Intervention points', 'guardrails/intervention-points'],
    ['Task Adherence', 'guardrails/task-adherence'],
    ['Agent evaluators', 'concepts/evaluation-evaluators/agent-evaluators'],
    ['Rubric evaluators', 'concepts/evaluation-evaluators/rubric-evaluators'],
    ['Custom evaluators', 'concepts/evaluation-evaluators/custom-evaluators'],
  ]],
  ['Observability and lifecycle', [
    ['Tracing', 'observability/concepts/trace-agent-concept'],
    ['Trace data protection', 'observability/concepts/trace-data'],
    ['External agents', 'agents/how-to/register-external-agent'],
    ['Control Plane', 'control-plane/overview'],
    ['Monitoring', 'observability/how-to/how-to-monitor-agents-dashboard'],
    ['Evaluation in GitHub Actions', 'how-to/evaluation-github-action'],
  ]],
];
const figure = (file, alt, caption, extra = '') => `<figure><img class="editorial-image ${extra}" src="./art/${file}" alt="${alt}"><figcaption>${caption}</figcaption></figure>`;
const sketch = (file, alt, caption, type = 'inline') => `<figure class="book-sketch sketch-${type}"><img src="./art/${file}" alt="${alt}"><figcaption>${caption}</figcaption></figure>`;
const explorerPlate = () => `<section class="illustration-plate explorer-plate" aria-label="Interactive EO Operator Explorer">
  <span class="section-label">FIELD VIEW / THE CONSTELLATION</span>
  <h2>Explore the<br><em>orbital network.</em></h2>
  <div class="explorer-slot" data-state="idle">
    <img class="explorer-poster" src="./art/earth-sketch-complete-reading.webp" alt="Drawn globe. Load the interactive Explorer to see simulated satellites and orbital planes.">
    <div class="explorer-placeholder"><p data-explorer-status role="status"></p><button type="button" class="ink-button" data-explorer-start>Load interactive globe</button></div>
  </div>
  <a class="explorer-open" href="https://polite-tree-06ae32c10.3.azurestaticapps.net/" target="_blank" rel="noopener noreferrer">Open full Explorer ↗</a>
</section>`;
const processPlate = () => `<section class="illustration-plate process-plate" aria-label="Illustrated observation-to-delivery process"><span class="section-label">PLATE 1 / THE OBSERVATION JOURNEY</span><h2>From a question<br>to a <em>product.</em></h2><img class="plate-art" src="./art/orbital-observation-reading.webp" alt="Graphite satellite observing a patch of terrain from orbit."><ol class="process-map">${[
  ['Request', 'Define the area, product and deadline.'],
  ['Plan', 'Check the instrument, opportunity and resources.'],
  ['Acquire', 'Collect the observation.'],
  ['Downlink', 'Receive the spacecraft’s data on the ground.'],
  ['Process', 'Prepare the product and check its quality.'],
  ['Deliver', 'Send the accepted product to an authorized recipient.'],
].map(([title, detail], index) => `<li><span class="process-map-number">${index + 1}</span><div><strong>${title}</strong><span>${detail}</span></div></li>`).join('')}</ol><p class="plate-note">Each stage depends on the one before it. Acquiring data does not yet deliver the customer’s product.</p></section>`;
const comparisonPlate = () => `<section class="illustration-plate comparison-plate" aria-label="Synthetic comparison of visible and cloud-obscured terrain"><span class="section-label">PLATE 2 / OPTICAL PRODUCT QUALITY</span><h2>Acquired does not<br>mean <em>usable.</em></h2><div class="observation-pair"><figure><div class="observation-image"><img src="./art/synthetic-optical-terrain-reading.webp" alt="Synthetic optical-style view of wooded terrain and a visible dark burned patch."><span class="aoi-outline" aria-hidden="true"></span></div><figcaption><strong>Area visible</strong><span>Candidate for analysis, subject to the other quality checks.</span></figcaption></figure><figure><div class="observation-image cloud-obscured"><img src="./art/synthetic-optical-terrain-reading.webp" alt="The exact same synthetic terrain, with a simulated cloud layer obscuring the area required for analysis."><span class="simulated-cloud" aria-hidden="true"></span><span class="aoi-outline" aria-hidden="true"></span></div><figcaption><strong>Required area obscured</strong><span>Insufficient visibility for complete coverage of the marked area.</span></figcaption></figure></div><p class="plate-note">Synthetic teaching example, not real satellite imagery. The terrain is identical in both panels; only the simulated cloud layer changes. The outlined area is the same. Visibility alone does not establish calibration, geometry or product acceptance.</p></section>`;
const sensorExamples = () => `<section class="illustration-plate sensor-plate" aria-label="Real optical and radar satellite image examples">
  <span class="section-label">PLATE 3 / TWO KINDS OF MEASUREMENT</span>
  <h2>Optical and radar<br>show <em>different things.</em></h2>
  <div class="observation-pair">
    <figure>
      <a class="observation-image" href="./art/sentinel-2-rome-2023-original.webp" target="_blank" rel="noopener noreferrer" aria-label="Open the full Sentinel-2 optical image of Rome">
        <img src="./art/sentinel-2-rome-2023-reading.webp" alt="Real Sentinel-2 optical image of Rome: urban areas, green fields and the winding Tiber, displayed in familiar colours.">
      </a>
      <figcaption><strong>Optical: reflected sunlight</strong><span>Sentinel-2 · Rome<br>16 March 2023 ${cite(10)}</span><span>Useful for examining land cover. Cloud can hide the surface; reflected-light imaging needs suitable illumination.</span></figcaption>
    </figure>
    <figure>
      <a class="observation-image" href="./art/sentinel-1-central-italy-2018-original.jpg" target="_blank" rel="noopener noreferrer" aria-label="Open the full Sentinel-1B radar image of central Italy">
        <img src="./art/sentinel-1-central-italy-2018-reading.webp" alt="Real Sentinel-1B dual-polarisation radar image of central Italy, displayed in false colours, with green terrain and pink urban areas.">
      </a>
      <figcaption><strong>Radar: returned echoes</strong><span>Sentinel-1B · Central Italy<br>6 July 2018 ${cite(11)}</span><span>Works in darkness and through cloud. These false colours encode radar channels, not the colours of the ground.</span></figcaption>
    </figure>
  </div>
  <p class="plate-note">Real Copernicus examples, not acquisitions from the teaching constellation. Dates and extents differ: this is not a matched sensor-performance test. Select an image to inspect the original.</p>
  <p class="plate-note sensor-credits">Optical: European Union, Copernicus Sentinel-2 imagery (2023), processed by @DEFIS_EU. Radar: contains modified Copernicus Sentinel data (2018), processed by ESA; <a href="https://creativecommons.org/licenses/by-sa/3.0/igo/" target="_blank" rel="noopener noreferrer">CC BY-SA 3.0 IGO</a>. Reading copies resized, not cropped.</p>
</section>`;
const domain = (title, detail) => `<div class="domain"><strong>${title}</strong><span>${detail}</span></div>`;
const applicationUse = (id, name, role, text) => `<section class="application-use" data-core-application="${id}"><h3>${name}</h3><span class="application-role">${role}</span>${p(text)}</section>`;
const operatorFlow = () => `<figure class="si-diagram" aria-label="Manual request-to-product handoffs">
  <ol class="si-flow">${[
    ['Customer Tasking Portal', 'Customer submits the area, product and deadline.'],
    ['Tasking Desk', 'Intake operator checks entitlement and priority.'],
    ['OrbitPlanner + GroundLink', 'Planners reserve the acquisition and compatible contact.'],
    ['MissionControl', 'Supervisor validates and authorizes the plan version.'],
    ['GroundLink', 'Ground operator follows the transfer and records reception.'],
    ['GeoFactory', 'Analyst checks quality and delivers through the customer portal.'],
  ].map(([name, text]) => `<li><strong>${name}</strong><span>${text}</span></li>`).join('')}</ol>
  <figcaption>Arrows show operational handoffs, not automatic API calls. The same request and plan references follow the work.</figcaption>
</figure>`;
const runtimeView = () => `<figure class="si-diagram runtime-view" aria-label="Current-state reference hosting and service responsibilities">
  <div class="si-boundary"><h3>Enterprise context</h3>${domain('CRM', 'CONTRACTS · ENTITLEMENTS · SLAs')}${domain('SharePoint', 'PROCEDURES · DOCUMENTATION')}</div>
  <p class="si-exchange">Operators consult contractual and documentary sources.</p>
  <div class="si-boundary"><h3>On-premises / private-cloud operations</h3>${domain('OrbitPlanner', 'OPPORTUNITIES · ACQUISITION PLANS')}${domain('GroundLink', 'CONTACTS · RESERVATIONS · RECEPTION')}${domain('GeoFactory', 'JOBS · QUALITY · CATALOGUE · DELIVERY')}<p class="si-support">GeoFactory uses authorized image storage and optical / SAR processing workers.</p></div>
  <p class="si-exchange">Plans go for approval; constraints and execution status return.</p>
  <div class="si-boundary si-control"><h3>Isolated control environment</h3>${domain('MissionControl', 'VALIDATION · APPROVAL · EXECUTION')}<p class="si-support">Engineering checks and flight-control / TT&amp;C systems.</p></div>
  <figcaption>Boundaries group hosting and access responsibilities in the reference model. They do not specify machines, vendors or network protocols.</figcaption>
</figure>`;

function definedTerm(name, label = name) {
  const number = readingTerms.indexOf(name) + 1;
  if (!number || !definitions.some(([term]) => term === name)) throw new Error(`Missing reading definition: ${name}`);
  return `${escape(label)}<sup class="definition-mark"><button type="button" class="inline-definition" id="definition-call-${number}" data-definition="${escape(name)}" aria-label="Definition ${number}: ${escape(name)}" aria-expanded="false" aria-controls="definition-note-${number}">${number}</button></sup>`;
}

function readingNotes(names) {
  return names.map(name => {
    const number = readingTerms.indexOf(name) + 1;
    const entry = definitions.find(([term]) => term === name);
    if (!number || !entry) throw new Error(`Missing reading definition: ${name}`);
    return `<aside class="definition-note" id="definition-note-${number}" role="note" tabindex="-1" aria-labelledby="definition-title-${number}" aria-describedby="definition-text-${number}" hidden><div class="definition-note-heading"><span>${number}</span><strong id="definition-title-${number}">${escape(name)}</strong></div><p id="definition-text-${number}">${escape(entry[1])}</p><button type="button" data-close-definition aria-label="Close definition of ${escape(name)} and return to text">Return to text <span aria-hidden="true">↑</span></button></aside>`;
  }).join('');
}

export function definitionList(items) {
  return `<dl class="concept-list">${items.map(([name, text]) => `<div><dt>${escape(name)}</dt><dd>${escape(text)}</dd></div>`).join('')}</dl>`;
}

function table(headers, rows, caption = '', className = '') {
  return `<table class="matrix${className ? ` ${className}` : ''}">${caption ? `<caption>${caption}</caption>` : ''}<thead><tr>${headers.map(title => `<th scope="col">${title}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

function agentCard(number, name, level, responsibility, boundary) {
  return `<section class="agent-card"><div class="agent-card-top"><span>${number}</span><span>${level}</span></div><h3>${name}</h3><p>${responsibility}</p><p class="agent-boundary">${boundary}</p></section>`;
}

export function createSupportingBook(data) {
  const company = escape(data.company.name);
  const hq = `${escape(data.company.headquarters.city)}, ${escape(data.company.headquarters.country)}`;
  const countries = data.governance.imposed.profile.groundStationCountries.map(escape).join(', ');
  const fleet = data.fleet;
  const caseNote = 'Meridian is an illustrative operator. Financial figures and performance targets are reference assumptions, not measured operating results.';
  const content = new Map();
  function add(id, left, right, options = {}) { content.set(id, { left, right, ...options }); }

  add('industry',
    lead(`${company}, an illustrative Italian ${definedTerm('Earth observation', 'Earth-observation')} operator, provides the running example. Its work connects what a satellite measures in space with what a customer needs to understand on the ground.`) +
    p(`Based in ${hq}, Meridian operates ${fleet.satellites} radar and optical satellites in this reference model. Together, they form a ${definedTerm('Constellation', 'constellation')}: a fleet whose observation opportunities can be planned together. ${fleet.optical} satellites carry optical instruments and ${fleet.radar} carry radar instruments. The two types provide different ways of looking at the same planet. ${cite(8)}`) +
    sketch('orbital-observation-reading.webp', 'Graphite study of a satellite instrument directed toward a coastal observation footprint.', 'FIELD STUDY — An instrument measures an area; the product still has to reach the customer.') +
    p(`The service also depends on what happens below the orbit. Meridian uses ${data.groundStations.count} ${definedTerm('Ground station', 'ground stations')} across ${countries}, with ${data.groundStations.totalAntennas} antennas in the reference network. These facilities provide the communications links through which observations reach the ground. Their availability matters whenever the team plans when a customer will receive a product.`,
      'Meridian serves emergency agencies, agriculture and defence customers. For an emergency agency, an observation may help establish the extent of an affected area. An agricultural user may need to compare the same fields over time. A defence customer may have a time-sensitive requirement with additional restrictions on who can receive the information. Each starts with a question about a place, rather than with a particular spacecraft.',
      'Operating this service means deciding what to observe, finding a suitable opportunity, arranging reception and processing the result. The satellite is essential, but it is one part of the work required to answer the customer’s question.') +
    figure('mission-control.webp', 'Illustrated operators coordinating a mission from a control room.', 'FIG. 1.1 — Mission operations brings observation requests, spacecraft opportunities and ground resources together.') +
    readingNotes(['Earth observation', 'Constellation', 'Ground station']),
    heading('1.1 / Meridian and its industry', 'Information<br>about a <em>place.</em>') +
    p(`The wider industry is concerned with ${definedTerm('Geospatial information', 'geospatial information')}: information that has a location. A road map, a field boundary and an observation of floodwater can describe the same area in different ways. Bringing them together allows a reader to ask not only what is visible, but where it is, what it is close to and how it has changed.`,
      'Earth observation supplies measurements to that wider picture. A map might show where a forest is; a sequence of observations can help reveal how its condition or extent changes. The value comes from connecting the measurement to a place, a time and a question that someone needs to answer.',
      `The first pictures of the Earth from space offered a perspective that could not be obtained from the ground. Repeated observations added something a single picture could not provide: a record of change. Archived measurements allow the same area to be studied across dates, giving Earth observation a role in understanding environmental change as well as responding to an individual event. ${cite(9)}`,
      `Satellites collect these measurements through ${definedTerm('Remote sensing', 'remote sensing')}. An instrument receives a signal from the Earth without having to touch the surface. Depending on the instrument, that signal may be reflected sunlight or the echo of a radar pulse. The result is a measurement that must be interpreted, not a complete explanation of what is happening below. ${cite(9)}`,
      'The geospatial industry therefore includes several kinds of work. Some organizations build and operate instruments. Others receive and process observations, maintain maps, develop analytical methods or turn the results into services. A customer may use the output without ever handling a satellite image directly.',
      'Meridian occupies the part of this chain that operates the observation fleet and coordinates tasking, downlink, processing and product delivery. Its service has to connect a customer’s question with the right measurement and carry that measurement through to a usable result. Owning an observation opportunity is not yet the same as answering the question.',
      'Its European context includes interfaces with the European Space Agency (ESA) and Copernicus, the European Union’s Earth-observation programme. These sit alongside Meridian’s own operations; the interfaces do not imply endorsement or a partnership.') +
    readingNotes(['Geospatial information', 'Remote sensing']) +
    link('observation-lifecycle', 'Continue: from a request to useful information'),
    { className: 'narrative' });

  add('observation-lifecycle',
    heading('1.2 / From question to observation', 'A request starts<br>with a <em>place.</em>') +
    p(`Consider the wildfire request examined in Chapter 7. In mission ${escape(data.wildfireScenario.requestId)}, Greek Civil Protection asks for an optical fire-impact map of ${escape(data.wildfireScenario.location)}, within ${data.wildfireScenario.deadlineHours} hours. The customer needs information about the affected landscape. Naming the incident alone does not tell Meridian exactly what to collect.`,
      `The request must describe an ${definedTerm('Area of interest (AOI)', 'area of interest')}, or AOI: the geographic footprint that the product needs to cover. It also needs a product description, a deadline and an intended use. A narrow view of one location and a complete map of a larger area can require different observations, even when both refer to the same event.`,
      `Turning that need into an observation request is called ${definedTerm('Tasking', 'tasking')}. Meridian checks who is asking, what their agreement allows and whether the requested use can be served. The operations team then examines which spacecraft could see the area at a suitable time. A request can be important without being physically possible in the time available.`,
      'The spacecraft keep moving along their orbits. They cannot simply remain above a new incident until the team has finished deciding what to do. Each opportunity has a time window, and the instrument has its own limits. For an optical request, the team also has to consider whether illumination, cloud or smoke will allow a useful observation.',
      `The observing instrument is the spacecraft’s ${definedTerm('Payload', 'payload')}. When it records the planned measurement, an ${definedTerm('Acquisition', 'acquisition')} has taken place. This is a real milestone: the required area may now have been observed. The customer, however, still does not have the requested map. The information first exists as data collected by the spacecraft.`) +
    readingNotes(['Area of interest (AOI)', 'Tasking', 'Payload', 'Acquisition']),
    heading('From orbit to the customer', 'Making the<br>observation <em>usable.</em>') +
    sketch('antenna-vignette-reading.webp', 'Small graphite study of a receiving dish tilted toward the sky.', 'GROUND CONTACT', 'corner') +
    p(`The next step is to bring the data to the ground. During a compatible contact with a receiving station, the spacecraft transfers it over a ${definedTerm('Downlink', 'downlink')}. The observation opportunity and the communications opportunity are separate events. An image can already exist on board while the team is still waiting for the contact or capacity needed to receive it.`,
      'The received data then passes through processing. Depending on the instrument and product, this can include calibration, locating the measurements correctly on the Earth and applying analytical methods to extract the information requested. Some approved processing may happen on board or at an edge facility; other jobs run in ground systems. Moving a job does not remove the need to check its output.',
      `An ${definedTerm('Analysis-ready product', 'analysis-ready product')} has been prepared and documented for an intended use. That means more than making an image easy to open. Its coverage, geometry, quality and metadata need to support the analysis the customer expects. A completed processing job may still leave gaps, obscured areas or limitations that must be reported.`,
      'For the wildfire request, the team would check whether the optical observations actually support the agreed fire-impact map. If cloud obscures a required area, receiving the file on time does not make the coverage complete. A useful partial result must be described as partial, and a different product needs the customer’s acceptance rather than an unannounced substitution.',
      `The time taken through this chain is often discussed as ${definedTerm('Latency', 'latency')}, but the measurement needs a clear beginning and end. Time to capture an image, time to receive it and time to deliver an accepted product are different intervals. The business case’s request-to-image target must therefore be defined separately from the delivery and acceptance of the final analysis-ready product.`,
      'This is why Meridian has to plan the journey beyond the satellite pass. A suitable acquisition, an available ground contact and enough processing capacity all contribute to the answer. The customer experiences the whole service, including the waiting time between its parts.') +
    readingNotes(['Downlink', 'Analysis-ready product', 'Latency']) +
    link('sensors-and-customers', 'Continue: how optical and radar observations differ') +
    processPlate(),
    { className: 'narrative' });

  add('sensors-and-customers',
    heading('1.3 / How the instruments observe', 'Two ways of<br>looking at the <em>Earth.</em>') +
    p(`${definedTerm('Optical imaging')} is often the easiest kind of satellite observation to recognize. Many optical instruments record sunlight reflected by the surface, including wavelengths beyond those visible to the human eye. The image may look familiar, but its measurements can also be used to distinguish characteristics that an ordinary photograph would not show.`,
      'This dependence on the incoming signal has practical consequences. For observations based on reflected sunlight, the surface needs suitable illumination. Cloud can hide it, and smoke can interfere with the view. A spacecraft can reach the right place and collect data exactly as planned while the resulting image still fails to show what the customer needs.',
      `${definedTerm('SAR', 'Synthetic aperture radar (SAR)')} works differently. The instrument sends radar pulses towards the Earth and measures the returning echoes. As the spacecraft moves, those measurements are combined to form an image. Because the instrument provides its own illumination, it can operate in darkness; radar observations can also be made through cloud. ${cite(9)}`,
      'A radar image does not show the surface in the same way as an optical image. The returning signal depends on how the radar interacts with the surface and on the observation geometry. Interpreting it requires appropriate methods. A dark or bright region should not be read as though it were simply a colour in a photograph.',
      'For Meridian, having both instrument types creates more ways to investigate a customer’s question. It does not make every observation interchangeable. In the wildfire case, a radar-based alternative would have to be assessed for its usefulness and accepted as a changed product. Its availability alone would not satisfy the request for an optical fire-impact map, nor establish direct detection of flames.') +
    sketch('optical-radar-study-reading.webp', 'Paired graphite studies: an optical instrument’s view obstructed by cloud, and radar signals passing through cloud.', 'INSTRUMENT STUDY — Left: reflected-light observation. Right: active radar illumination. Conceptual geometry, not an instrument-performance model.', 'wide') +
    readingNotes(['Optical imaging', 'SAR']),
    heading('Choosing an observation', 'Detail, timing<br>and <em>purpose.</em>') +
    p(`The useful question is not simply which image looks sharper. ${definedTerm('Spatial resolution')} describes how much spatial detail an observation can distinguish. The level of detail needed to examine an individual feature can differ from what is needed to follow a large affected area. Coverage and product requirements matter alongside detail; no particular instrument performance is assumed for Meridian here.`,
      `${definedTerm('Revisit')} describes the interval between opportunities to observe a location again. Repeated observations allow the same place to be compared over time. But an opportunity is not a promise of useful data: the selected instrument, conditions and remaining delivery path still have to meet the request. A fleet of ${fleet.satellites} satellites does not, by itself, establish a delivery time for every location.`,
      'An agricultural customer may value a consistent sequence of observations because changes are easier to interpret when measurements are comparable. The shortest possible delivery time may matter less than dependable coverage and a product that can be compared with previous dates.',
      'An emergency customer faces a different constraint: information may lose much of its usefulness after a decision has already been made. The team must understand the deadline and what limitations the recipient could accept. Fast delivery of the wrong product would not solve that problem.',
      'Defence requests can combine urgency with tighter access, export and contractual requirements. Those conditions affect who can ask for an observation, how the request is handled and who may receive the result. They remain part of the service even when an observation opportunity is about to pass.',
      'Meridian therefore has to bring several judgments together: what the customer needs, what the instruments can measure, when an opportunity occurs and whether the result can be delivered in time. Its daily planning process is where those judgments currently meet. The next chapter examines what happens when an urgent request arrives between planning cycles.') +
    readingNotes(['Spatial resolution', 'Revisit']) +
    link('orbital-network', 'Explore Meridian’s orbital network') +
    comparisonPlate() +
    sensorExamples(),
    { className: 'narrative' });

  add('orbital-network',
    explorerPlate(),
    heading('1.4 / Using the Explorer', 'What this view<br>helps you <em>understand.</em>') +
    p('Use the globe to follow Meridian’s satellites along their orbital planes. Drag to rotate the Earth, scroll to zoom, or pause the simulation to hold a view. Select a spacecraft to highlight it.',
      'This embedded view keeps the controls simple. Open the full Explorer for object details, layer filters and planning views. It opens in a separate tab, so you can return to this page.',
      'Follow a spacecraft over the Earth to see how its position changes relative to the area of interest and ground network. This helps make an observation window tangible: the opportunity moves while the request is assessed.',
      'The globe shows simulated motion, not live telemetry. It does not calculate whether a particular customer request can be fulfilled.') +
    link('challenges', 'Continue to the business challenges'),
    { className: 'narrative' });

  add('challenges',
    lead('An urgent request can arrive while the daily plan is already being executed.') +
    p('The current planning process reconciles customer tasking, orbital constraints, ground-station availability and cloud or weather forecasts. Each input changes on a different cadence.',
      'If a request arrives after the planning cut-off, the team may not have time to assess it before the next feasible pass. Capacity can go unused because the new request, its priority and the resources it needs have not been reconciled quickly enough.') +
    figure('ground-station.webp', 'A graphite illustration of an Arctic ground-station antenna.', 'FIG. 2.1 — Acquisition and station opportunities must be planned together.'),
    heading('2.1 / The coordination problem', 'Why a feasible pass<br>can still be <em>missed.</em>') +
    definitionList([
      ['Customer input', 'Urgency, AOI, product and SLA enter through customer-facing channels.'],
      ['Physical feasibility', 'Orbital opportunities, payload limits and communication geometry bound the available choices.'],
      ['Operational feasibility', 'Station bookings, processing capacity and existing commitments determine whether the complete service is achievable.'],
      ['Planning cadence', 'Daily reconciliation leaves a coordination gap between a new request and the next committed plan.'],
    ]) +
    p('Continuous planning is intended to shorten that coordination delay. Orbital and instrument constraints still determine what can be done.') +
    link('operational-bottlenecks', 'Locate the bottlenecks'));

  add('operational-bottlenecks',
    heading('2.2 / Operational delays', 'Where requests<br><em>get held up.</em>') +
    table(['Current limitation', 'Operational consequence'], [
      ['Urgent tasking misses a pass', 'The next acquisition opportunity can fall outside the customer’s useful window.'],
      ['Low-value data consumes downlink', 'Data needed for an urgent product waits behind a less valuable transfer.'],
      ['Processing backlogs', 'Captured and received data can still take several days to become deliverable.'],
      ['Manual priority reconciliation', 'Operators chase information across tools while commitments and conditions change.'],
    ]) +
    p('Improving one stage can move the queue to the next. An earlier acquisition helps only if there is enough station and processing capacity to finish the product on time.') +
    annotation('Reserve the downlink and processing capacity needed for the planned acquisition.'),
    heading('Downstream effects', 'How delays<br><em>accumulate.</em>') +
    sub('A local improvement can shift the queue', 'Prioritizing an acquisition without a receiving contact moves the waiting time onto the spacecraft. Increasing downlink throughput without processing capacity moves it to the ground queue. Both can improve an intermediate metric while leaving customer delivery unchanged.') +
    sub('Priority has a cost elsewhere', 'Moving one mission forward can displace an existing commitment. The planning decision must account for both products, not just the urgent request.') +
    sub('Exceptions require a cross-system answer', 'The difficulty is establishing which combination of observation, contact and processing can still meet the deadline. Separate availability screens leave the planner to assemble and maintain that answer.'));

  add('business-case',
    heading('2.3 / Commercial rationale', 'The case for<br><em>emergency tiers.</em>') +
    lead('The business case depends on customers paying for a delivery time the operator can stand behind.') +
    p('An emergency tier would commit to a defined product and delivery time rather than promise priority alone. Its commercial value depends on how much eligible demand the existing constellation can serve reliably.',
      'The reference commercial assumptions are a 3–5× pricing premium and €60M in annual revenue. They are hypotheses to evaluate, not forecasts supported by signed customer commitments.') +
    sub('What makes the service viable', 'Estimate accepted products delivered on time, the cost of each mission and the revenue displaced when another customer’s work moves. Contract exclusions must reflect conditions the operator cannot overcome, including unavailable observation opportunities and unsuitable source data.'),
    heading('Success measures', 'Targets and<br><em>measurement rules.</em>') +
    table(['Measure', 'Reference baseline', 'Design objective'], [
      ['Request-to-image latency', '24 hours', 'Less than 4 hours'],
      ['Downlink utilization', 'Baseline to establish', '+30%'],
      ['Processing backlog', 'Multi-day delays', 'Eliminated'],
      ['Emergency service', 'Standard service', 'SLA-backed emergency tiers'],
    ]) +
    p('Measure premium-tier revenue, emergency-service adoption and SLA compliance alongside these operational indicators. Specify whether the +30% utilization target is relative or percentage points before evaluating it.') +
    note('These objectives are not measured results. “Backlog eliminated” requires testing under a defined workload. Request-to-image and accepted-product delivery are separate measurements.'));

  add('agents-and-workflows',
    lead('Use agents to resolve context-dependent coordination, not to replace the physical and operational rules of the mission.') +
    p('Use an agent when the useful next action depends on interpreting context, gathering information or negotiating within a bounded policy. Use deterministic software where rules, constraints and acceptance criteria must be enforced reproducibly.',
      'A stable request format, fixed routing rules and a known sequence of actions can be handled by a conventional workflow. Adding agents is useful when resolving an exception requires combining changing operational facts with procedures and customer commitments.') +
    table(['Mechanism', 'Appropriate responsibility'], [
      ['Workflow', 'Known states, approvals, retries and routing'],
      ['Constraint solver', 'Resource conflicts, windows and feasibility'],
      ['Agent', 'Context gathering and bounded option selection'],
      ['Validation service', 'Command and policy checks before execution'],
    ]),
    heading('5.1 / Choosing the mechanism', 'Where agents<br>make a <em>difference.</em>') +
    p('Suppose a weather update invalidates an optical acquisition. The useful next step depends on the product requirement, the next available opportunities, the customer’s tolerance for a changed product and the commitments already in the plan.',
      'An agent can gather those facts, consult the relevant procedure and prepare alternatives. A solver checks whether the candidate observation and ground resources fit. A workflow carries the selected candidate through reservations, review and execution.',
      'This separation keeps the interpretation flexible without making feasibility probabilistic. It also gives a simpler alternative where agents are unnecessary: keep fixed, well-understood transitions in the workflow.') +
    link('accelerator', 'Connect the components'));

  add('regulation',
    lead('The same observation request can raise questions about cybersecurity, privacy, licensing and export controls.') +
    p('Meridian is based in Italy and uses ground stations in Norway, Spain and Kenya. To determine which requirements apply, the team needs to examine the legal entity, service, data, recipient and processing arrangements as well as those locations.') +
    p('Keep the sources of each requirement clear. Legislation, Copernicus data conditions and commercial licenses can impose different obligations. Record the obligation, the control intended to meet it and the evidence that the control works.') +
    note('The following mapping is architectural guidance for the supplied case, not a legal determination.'),
    heading('3.1 / Regulatory landscape', 'Requirements<br>to <em>assess.</em>') +
    table(['Source', 'Relevance to this case'], [
      [`EU Space Act ${cite(1)}`, 'Proposal; the case assumes application targeted for 2030. Plan for safety and resilience requirements without presenting them as enacted obligations.'],
      [`NIS2 ${cite(2)}`, 'Assess ground-based space infrastructure and entity scope under applicable national transposition.'],
      [`GDPR ${cite(3)}`, 'Assess personal-data processing, access, retention and relevant transfers.'],
      [`Dual-use export controls ${cite(4)}`, 'Assess items, technology, recipients, destinations and uses requiring authorization.'],
      [`Copernicus data policy ${cite(5)}`, 'Apply the conditions of the actual source products; distinguish them from proprietary commercial licenses.'],
    ]) +
    note('The Commission describes the EU Space Act as a legislative proposal under negotiation. The 2030 planning horizon is retained from the business case, not asserted as a final legal application date.'));

  add('rights-and-data',
    heading('3.2 / Rights and data handling', 'Checks from intake<br>to <em>delivery.</em>') +
    sub('At intake', 'Resolve the customer identity and entitlement. Capture the requested geography, product, end user and intended use. Route export and dual-use questions to approved screening rules and accountable reviewers when the result is uncertain.') +
    sub('During planning', 'Keep restricted requests and their metadata within authorized boundaries. A priority negotiation must not disclose another customer’s sensitive mission details simply to explain a conflict.') +
    sub('At delivery', 'Confirm the recipient, current entitlement, product license and any changed circumstances. A request accepted earlier does not automatically authorize every derivative product or recipient.') +
    note('Screening is part of request evaluation; the legal classification itself is not delegated to an unconstrained language-model judgement.'),
    heading('Records to retain', 'Evidence for<br>each <em>check.</em>') +
    table(['Concern', 'Control pattern', 'Evidence'], [
      ['Entitlement', 'Identity-bound policy check', 'Policy version and decision'],
      ['Export screening', 'Approved rules and escalation', 'Screening outcome and authorization'],
      ['Personal data', 'Minimization and access control', 'Purpose, access and retention record'],
      ['Product rights', 'License-aware delivery gate', 'Product and recipient entitlements'],
      ['Knowledge access', 'Permission-aware retrieval', 'Document version and authorized source'],
    ]) +
    p('Retain the decision and its source versions so a reviewer can establish which rules applied when access was granted.'));

  add('safety-and-approval',
    heading('3.3 / Safety-critical execution', 'Command validation<br>and <em>approval.</em>') +
    p('The proposed architecture separates a candidate mission plan from the command product used by spacecraft operations. Structured outputs pass through deterministic checks before an execution path is available.',
      'Mission control remains responsible for safety-critical oversight. Approval is bound to the exact plan version and relevant preconditions; material changes require the appropriate checks and renewed approval.') +
    sketch('mission-review-reading.webp', 'Graphite close-up of a hand checking time windows on a proposed mission plan with a pencil.', 'PLAN REVIEW — Human approval applies to a particular plan version, not every future revision.') +
    domain('Candidate plan', 'AGENT + SOLVER') +
    '<div class="system-link"></div>' +
    domain('Deterministic validation', 'SCHEMA · CONSTRAINTS · STATE') +
    '<div class="system-link"></div>' +
    domain('Mission-control approval', 'PLAN VERSION + SCOPE') +
    '<div class="system-link"></div>' +
    domain('Controlled execution', 'AUTHORIZED MISSION SYSTEM'),
    heading('Failure handling', 'When execution<br>must <em>stop.</em>') +
    definitionList([
      ['No feasible plan', 'Return the unsatisfied constraints and authorized alternatives. Do not invent a satellite pass, a station window or processing capacity.'],
      ['Expired conditions', 'Revalidate stale forecasts, resource reservations and policy decisions. Do not execute an old approval against a changed plan.'],
      ['Uncertain execution state', 'Reconcile with the mission system before retrying. Idempotency and durable state prevent duplicate reservations or repeated actions.'],
      ['Unsafe or unauthorized request', 'Deny execution, preserve a useful audit record and route an actionable exception to the responsible operator.'],
    ]) +
    link('existing-architecture', 'Locate the operational boundaries'));

  add('existing-architecture',
    lead('Four applications support the people who plan observations, receive data, produce imagery and authorize spacecraft operations.') +
    p('OrbitPlanner, GroundLink, GeoFactory and MissionControl form Meridian’s current-state reference model.',
      'The Customer Tasking Portal and Tasking Desk are entry points, not additional core applications. They handle customer access, request qualification and priority.',
      'CRM supplies contractual context; SharePoint supplies procedures. Operators make the decisions and confirm actions in the responsible application.',
      `Operations overview brings chronology and audit together: it is a transverse view, not a fifth core application. ${cite(12)}`),
    heading('4.1 / Information-system overview', 'Four applications.<br>One <em>mission.</em>') +
    '<figure class="si-diagram" aria-label="Simplified information-system overview"><div class="si-entry"><strong>Customer Tasking Portal · Tasking Desk</strong><span>Request, qualification and priority</span></div><p class="si-exchange">Qualified request → operational teams</p><div class="si-app-grid">' +
    domain('OrbitPlanner', 'ACQUISITION PLANNING') +
    domain('GroundLink', 'CONTACTS + RECEPTION') +
    domain('GeoFactory', 'PRODUCTS + DELIVERY') +
    domain('MissionControl', 'COMMAND AUTHORIZATION') +
    '</div><p class="si-exchange">Accepted product → authorized customer</p><figcaption>CRM and SharePoint supply business context. Spacecraft and ground stations provide the physical observation and communication capabilities behind the applications.</figcaption></figure>' +
    link('business-applications', 'Meet the four operational applications'),
    { className: 'narrative' });

  add('business-applications',
    heading('4.2 / The operational applications', 'Plan the observation.<br>Authorize <em>execution.</em>') +
    applicationUse('planner', 'OrbitPlanner', 'Mission planner', 'The planner examines spacecraft capabilities, orbital access and weather, then compares candidate observation windows. A selected option becomes an acquisition plan with an explicit reservation. MissionControl supplies authorized spacecraft constraints; GroundLink supplies contact availability. OrbitPlanner keeps the acquisition decision and its version, rather than treating a visible opportunity as committed capacity.') +
    applicationUse('control', 'MissionControl', 'Mission-control supervisor', 'The supervisor receives the versioned acquisition plan and its contact constraints. Engineering services check the operational envelope; the supervisor records the required authorization and follows command and telemetry acknowledgements. MissionControl is the control boundary, not another scheduling screen. Its execution results return to the planning and ground teams.'),
    heading('Reception and production', 'Receive the data.<br>Deliver the <em>product.</em>') +
    applicationUse('ground', 'GroundLink', 'Ground-network operator', 'The ground operator checks compatible station contacts, antenna capacity and existing commitments. The operator assigns the required contact, follows the transfer session and records reception. A transfer manifest associates the acquired data with its receiving session and downstream raw-data reference. The contact must be secured before the relevant plan is released.') +
    applicationUse('production', 'GeoFactory', 'Geospatial analyst and delivery manager', 'The analyst turns a received dataset into a processing job and reviews the resulting optical or SAR product. Quality reports determine whether it can be accepted or needs another acquisition. Catalogue publication and delivery belong to GeoFactory: they are not a separate fifth application. The delivery manager confirms recipient rights and makes the accepted product available through the customer portal.') +
    link('current-planning', 'Follow the operator workflow'),
    { className: 'narrative' });

  add('current-planning',
    heading('4.3 / Using the applications', 'A mission moves<br>between <em>operators.</em>') +
    p('A customer submits the area, product and deadline through the portal. The intake operator checks the request in Tasking Desk against CRM entitlements and the applicable procedures, then accepts it for planning.',
      'The mission planner compares observation options in OrbitPlanner and coordinates with the ground operator in GroundLink. The acquisition and receiving contact must fit together before MissionControl can authorize the relevant plan version.',
      'After execution, GroundLink records the received transfer. GeoFactory starts the processing work, holds an unsuitable result for review and publishes only an accepted product. A failed quality check returns a reacquisition need to OrbitPlanner.',
      'The handoffs explain the coordination burden. People carry the request context across availability checks, reservations, approvals and exceptions. A weather change can send them back through several applications, even when each application is working correctly.') +
    sketch('antenna-vignette-reading.webp', 'A graphite receiving antenna, shown as a small margin study.', 'STATION AVAILABILITY', 'corner') +
    link('information-boundaries', 'Look beneath the operator screens'),
    heading('Simplified operator workflow', 'From request<br>to <em>delivery.</em>') +
    operatorFlow(),
    { className: 'narrative' });

  add('information-boundaries',
    heading('4.4 / Current service architecture', 'Behind the<br>operator <em>screens.</em>') +
    runtimeView(),
    heading('Runtime responsibilities', 'Plans, pixels<br>and <em>control.</em>') +
    p('The reference model places OrbitPlanner, GroundLink and GeoFactory in on-premises or private-cloud operational environments. This groups service responsibilities; it does not imply that they share a server or database.',
      'OrbitPlanner works with opportunity, weather and spacecraft-constraint information. GroundLink works with station availability, reservations and transfer records. Their screens support decisions, while their services maintain the plan and contact records.',
      'GeoFactory uses image storage and optical or SAR processing workers in the permitted environment. Raw datasets feed processing jobs; products carry quality and lineage records. The customer-facing catalogue exposes authorized product information rather than unrestricted access to the processing environment.',
      'MissionControl sits in an isolated operational environment. It uses engineering validation and flight-control / telemetry, tracking and command (TT&C) systems to authorize and supervise execution. A planning record reaches this boundary as a plan to validate, not as permission to send a telecommand.',
      'CRM and SharePoint remain separate enterprise sources. The agentic solution adds a coordination layer and controlled tool access over these responsibilities; it does not require replacing the four applications or moving restricted imagery into a model.') +
    link('agents-and-workflows', 'Choose the coordination approach'),
    { className: 'narrative' });

  add('accelerator',
    lead('The proposed accelerator helps the operations team coordinate a mission across the systems it already uses.') +
    p('A mission orchestrator owns the durable plan record and dispatches work to five specialist agents. Their proposals and results become versioned transitions in that record, rather than independent conversations.',
      'A self-hosted gateway exposes the operational tools. It handles access and routing, while the orchestrator decides which task to coordinate next. Keeping those roles separate allows one mission to span several tools without turning the gateway into a planning engine.'),
    heading('5.2 / Target architecture', 'Orchestration and<br><em>system access.</em>') +
    domain('Operator and customer interfaces', 'REQUESTS · OPTIONS<br>EXCEPTIONS · APPROVALS') +
    '<div class="system-link"></div>' +
    domain('Mission orchestrator + specialist agents', 'DURABLE STATE<br>POLICY + SOLVER SERVICES') +
    '<div class="system-link"></div>' +
    '<div class="gateway"><span class="eyebrow">CONTROLLED TOOL ACCESS</span><strong>Self-hosted MCP gateway</strong><p>Identity · Tool scopes · Policy enforcement · Audit</p></div>' +
    `<div class="system-buttons">${systems.map(([title, subtitle], index) => `<button type="button" data-system="${index}" aria-pressed="${index === 0}" aria-controls="system-detail">${title}<small>${subtitle}</small></button>`).join('')}</div>` +
    `<div class="detail-panel system-detail" id="system-detail" aria-live="polite"><h3>${systems[0][0]}</h3><p>${systems[0][2]}</p></div>` +
    note('Systems may use MCP adapters or approved native APIs. The command-release boundary is defined in section 3.3.'));

  add('agent-responsibilities',
    heading('5.3 / Agent responsibilities', 'Intake, priorities<br>and <em>acquisition.</em>') +
    agentCard('01', 'Tasking Intake Agent', 'L4 · AUTONOMOUS', 'Reads the request, checks the customer’s entitlement and calls the approved export-control screening process. The result is a qualified task with a specified product and deadline.', 'Uncertain or restricted screening results go to the configured review process.') +
    agentCard('02', 'Priority Negotiation Agent', 'L3 · WITHIN POLICY', 'Works through competing requests using customer-agent APIs and SLA rules. It records why a priority was chosen and which other commitments would be affected.', 'Changes beyond its delegated priority or commercial authority require approval.') +
    agentCard('03', 'Acquisition Planning Agent', 'L3 · WITHIN POLICY', 'Prepares the constellation scheduling problem, calls deterministic solvers and compares candidates against orbital and weather constraints.', 'Mission control reviews safety-relevant plans before execution.'),
    heading('Agent responsibilities continued', 'Downlink, processing<br>and <em>delivery.</em>') +
    agentCard('04', 'Downlink & Processing Agent', 'L4 · AUTONOMOUS', 'Allocates ground-station passes and starts approved onboard preprocessing, edge or ground jobs. It follows reservations and jobs through completion or failure.', 'Its authority covers approved resource and job actions. Safety-critical spacecraft commands still require the release gate.') +
    agentCard('05', 'Product Delivery Agent', 'L4 · AUTONOMOUS', 'Coordinates analysis-ready products and change-detection outputs, checking quality, provenance, recipient rights and delivery status.', 'A change to the requested product needs acceptance, and the recipient must be authorized.') +
    sub('Keeping one mission record', 'The agents update a shared, versioned mission state held by the orchestrator. Each transition has an owner, so a proposal from one agent cannot silently overwrite another agent’s reservation or execution result.'));

  add('continuous-planning',
    heading('5.4 / Orchestration', 'When to<br><em>replan.</em>') +
    p('A new request, a weather update, a station conflict or a failed quality check can require the plan to change. Continuous planning means responding to these events while keeping approved work stable where possible.',
      'Each cycle starts from a consistent mission snapshot. Proposals identify the state and resource assumptions they depend on. A changed candidate updates the affected reservations and approvals before work proceeds.') +
    table(['Event', 'Replanning question'], [
      ['Urgent request', 'Can a feasible chain meet its deadline without an unauthorized displacement?'],
      ['Weather update', 'Does the expected product remain suitable?'],
      ['Station conflict', 'Which compatible reserved or alternative contact is feasible?'],
      ['Quality failure', 'Can recovery still meet the accepted product requirement?'],
    ]),
    heading('Mission state', 'From proposal<br>to <em>execution.</em>') +
    '<ol class="process-list"><li><strong>Accept and qualify</strong><span>Resolve identity, entitlement, product and deadline.</span></li><li><strong>Negotiate and plan</strong><span>Generate policy-compliant candidates and reserve required resources.</span></li><li><strong>Validate deterministically</strong><span>Check constraints, schema, state and command safety outside the LLM.</span></li><li><strong>Obtain required approval</strong><span>Bind mission-control approval to the plan and critical actions.</span></li><li><strong>Execute and observe</strong><span>Release authorized work, reconcile results and monitor delivery.</span></li><li><strong>Recover or escalate</strong><span>Replan from observed facts; surface infeasibility and unknown execution state.</span></li></ol>' +
    annotation('Before retrying, check the last action’s status. If the plan has changed, check whether its approval still applies.'));

  add('hybrid-connectivity',
    heading('5.5 / Hybrid integration', 'Connecting mission<br>and <em>enterprise systems.</em>') +
    sub('Self-hosted MCP access', 'Run the gateway in an approved environment with defined inbound and outbound paths. Expose mission capabilities through narrow, typed adapters; maintain separate read, reserve and execution-request scopes.') +
    sub('SharePoint knowledge', 'Retrieve under an authorized identity and keep the effective date and document version with the result. Assess what the document says against the task and current policy; its contents cannot change the agent’s permissions.') +
    sub('CRM and analytics', 'Read entitlements and SLA conditions from their systems of record. Keep the policy and commercial data versions used in a priority decision. Analytics should provide measured service performance, with its source and measurement period.') +
    note(`MCP authorization is an integration concern, not proof of end-to-end business authorization. ${cite(6)}`),
    heading('Tool contracts', 'What a tool call<br>must <em>record.</em>') +
    table(['Contract field', 'Required meaning'], [
      ['Caller identity', 'User or workload identity and delegated scope'],
      ['Input schema', 'Typed AOI, resource, time window and product references'],
      ['Preconditions', 'Policy version, expected mission state and approval if required'],
      ['Idempotency key', 'Stable action identifier for safe reconciliation'],
      ['Side effect', 'Read, reservation, job launch or gated execution request'],
      ['Result', 'Authoritative status, receipt, timestamps and failure reason'],
    ]) +
    sub('Keep retrieval separate from authority', 'A retrieved procedure is evidence for a decision, not a permission grant. The tool evaluates the caller and requested action against current policy even when the procedure describes that action.'));

  add('deployment-and-evaluation',
    heading('5.6 / Implementation sequence', 'Deploying the<br><em>accelerator.</em>') +
    '<ol class="process-list"><li><strong>Inventory the contracts</strong><span>Identify systems of record, owners, identity paths and permitted operations.</span></li><li><strong>Instrument the baseline</strong><span>Record acquisition, downlink, processing and accepted-delivery timestamps.</span></li><li><strong>Connect read-only tools</strong><span>Test access, denial, freshness and provenance before enabling reservations.</span></li><li><strong>Run shadow planning</strong><span>Compare proposed plans with operator decisions without releasing commands.</span></li><li><strong>Enable bounded side effects</strong><span>Add controlled reservations and processing jobs with rollback or reconciliation.</span></li><li><strong>Gate command release</strong><span>Exercise deterministic validation and mission-control approval before operational adoption.</span></li></ol>',
    heading('Evaluation and operations', 'What to measure<br>and <em>test.</em>') +
    table(['Evaluation', 'Evidence required'], [
      ['Plan feasibility', 'Solver and reservation results under representative constraints'],
      ['Safety boundary', 'Unsafe commands rejected and required approvals enforced'],
      ['Grounded output', 'Correct sources, product limits and explicit unknowns'],
      ['Service value', 'Defined latency, SLA compliance and queue-age measurements'],
      ['Economics', 'Cost per accepted mission and premium-service contribution'],
      ['Recovery', 'Timeouts, stale plans, duplicate requests and partial-failure reconciliation'],
    ]) +
    p('Monitor tool errors, approval wait time, failed reservations, processing retries and product acceptance. Correlate them to the mission identifier rather than judging success only by model response time.') +
    note('Use the same workload and physical opportunities for the baseline and assisted runs, so a change in conditions is not mistaken for an improvement from the agents.') +
    link('building-with-foundry', 'Build and qualify the agents with Foundry'));

  add('building-with-foundry',
    lead('A model is suitable for a mission agent only when it can perform that agent’s work under the intended tools, data and operating limits.') +
    p('Microsoft Foundry provides a way to compare candidates, evaluate their behaviour, configure their runtime and observe them after release. The five responsibilities stay the same: intake, priority negotiation, acquisition planning, downlink and processing, and product delivery. Foundry supplies the AI engineering capabilities; the mission applications remain responsible for operational records and actions.',
      'Begin with the responsibility, not a favourite model. Intake needs to extract an observation request from different languages and ask useful clarifications. Priority negotiation needs to explain a conflict using contractual rules. Acquisition planning needs accurate tool parameters and a faithful interpretation of solver results, not an invented orbit.',
      `The Model Catalog and preview model leaderboards help shortlist candidates using quality, safety, estimated cost, latency and throughput. Public benchmarks are a starting point: they measure standardized tasks rather than Meridian’s mission decisions. ${cite(13)}`) +
    sketch('mission-control.webp', 'Graphite operators comparing information at a mission-control desk.', 'ENGINEERING STUDY — Compare models against the work people need the agent to perform.', 'wide') +
    note('Foundry capability status in this chapter follows the documentation snapshot dated 13 November 2026. Microsoft’s preview terms provide no service-level agreement and advise against production use. Confirm feature-specific terms and availability before adoption.'),
    heading('6.1 / Model selection', 'Compare the task,<br>not just the <em>score.</em>') +
    p('Foundry supports side-by-side comparison of up to three models. Examine context windows, languages, function calling, structured outputs and vision where supported, along with endpoints and deployment availability.',
      'A candidate that performs well but cannot run in the permitted environment is not a viable choice. Scientific optical and radar processing also needs its own qualification; a language-model benchmark does not establish image-processing accuracy.') +
    table(['Responsibility', 'What the comparison must establish'], [
      ['Tasking Intake', 'Multilingual understanding and reliable structured extraction'],
      ['Priority Negotiation', 'Policy-grounded reasoning and a clear account of affected commitments'],
      ['Acquisition Planning', 'Correct tool choice, parameters and use of computed results'],
      ['Downlink & Processing', 'Multi-step coordination, error handling and efficient recovery'],
      ['Product Delivery', 'Faithful quality reporting and structured, rights-aware outputs'],
    ], '', 'foundry-matrix') +
    p('Run the shortlisted models with the same instructions, authorized context, tools and initial system state. Measure tokens, calls, retries and tool costs across the whole task. A higher token price can still produce a lower task cost if fewer steps are needed. Keep the selection record for each agent, rather than assuming one model must serve all five.') +
    link('foundry-dataset', 'Build the evaluation cases'),
    { className: 'narrative' });

  add('foundry-dataset',
    heading('6.2 / Evaluation cases', 'Give each test<br>a <em>mission state.</em>') +
    p('An evaluation case should say what the agent is asked to do, what it is allowed to know and what a correct outcome would look like. A request alone is insufficient: the same urgent message can lead to different decisions under different contracts, weather conditions or reservations.',
      `Foundry supports fields such as query, response, messages, context, ground_truth and tool_definitions, depending on the evaluator. A recorded conversation can include tool calls and their returned results; a new run can produce the response to evaluate. Map the fields required by the chosen evaluator instead of treating one schema as universal. ${cite(14)}`) +
    table(['Input', 'Earth-observation meaning'], [
      ['query / messages', 'Request and clarification history; recorded calls where relevant'],
      ['context', 'Authorized contract, procedure, forecast and technical results'],
      ['ground_truth', 'Expected answer or reference elements when the evaluator requires them'],
      ['tool_definitions', 'Available operations and their parameter schemas'],
      ['response', 'An existing output, or the output generated by the test'],
    ], '', 'foundry-matrix') +
    p('Add a case identifier, responsible agent, language, deployment profile, policy versions and initial system state to the test harness. Expected actions and prohibited actions belong in that record too. These are business-test fields: map them to evaluators or use them in code that checks the resulting API state.'),
    heading('Coverage and reference answers', 'Test the exception<br>as well as the <em>request.</em>') +
    p('For intake, include ambiguous coordinates and a declared emergency that still needs corroboration. For negotiation, include a protected customer commitment. For acquisition, supply computed windows and check that simulation, reservation and authorization remain distinct.',
      'For downlink, distinguish a visible station contact from confirmed capacity, then test retries and reception evidence. For delivery, include a completed job whose quality or recipient rights do not permit publication. An agent should not turn an incomplete technical result into a successful customer response.') +
    sketch('mission-review-reading.webp', 'Graphite hand reviewing a plan and its time windows.', 'REFERENCE REVIEW — Domain experts approve the expected decision before a case becomes a release test.', 'wide') +
    p('Include stale data, contradictory sources, duplicate requests, unavailable services and injection attempts. Test legitimate crisis vocabulary too: fire, explosion or power plant can describe an authorized observation need rather than harmful intent.',
      'Cases can be prepared manually, generated synthetically or drawn from authorized traces. Review their expected outcomes with domain owners, version the dataset and separate tuning cases from independent validation cases. Cover languages, customer profiles and difficulty according to risk; generated variety alone does not establish coverage.') +
    link('foundry-deployment', 'Set the deployment boundary'),
    { className: 'narrative' });

  add('foundry-deployment',
    heading('6.3 / Deployment choices', 'Decide where the<br>data may <em>travel.</em>') +
    p('Model selection includes the place where inference occurs and the conditions under which data is handled. Examine the country, customer contract, information classification and product recipient before choosing a deployment.',
      `For supported models, Foundry documents Global, Data Zone and geography-based options, alongside provisioned capacity and batch processing. These are not interchangeable answers to data residency: locality, throughput and asynchronous execution are different dimensions. Availability depends on the model and offer. ${cite(15)}`) +
    table(['Choice', 'Question to resolve'], [
      ['Global', 'Is the documented processing footprint permitted?'],
      ['Data Zone', 'Do the zone boundaries meet this customer’s requirements?'],
      ['Azure geography', 'Is the required model offered with this processing locality?'],
      ['Provisioned capacity', 'Does a sustained workload justify reserved throughput?'],
      ['Batch', 'Can this activity tolerate asynchronous completion?'],
    ], '', 'foundry-matrix') +
    p('Read the exact processing definition: a deployment option may cover more than one region. Do not infer locality from the name of the resource or apply one European profile to every customer.'),
    heading('Images, evaluation and traces', 'Keep the same boundary<br>through the <em>lifecycle.</em>') +
    p('In this architecture, restricted image pixels and scientific processing remain in GeoFactory’s authorized environment. Agents exchange permitted identifiers, metadata and results through the bounded tools. Private networking and customer-provided storage are configuration choices to assess, not guarantees that every service is local.',
      'For models sold by Azure, Microsoft documents that customer data is not used to train foundation models without permission or instruction. That does not remove the need to review feature-specific storage, abuse monitoring and access conditions. Qualify other models and services against their own terms.',
      'Apply the deployment profile to evaluation as well as inference. A model judge processes the evidence submitted to it; Application Insights stores the telemetry configured for collection. Sending restricted content to a judge or a trace can cross a boundary even if the production agent never receives the original image.') +
    sketch('antenna-vignette-reading.webp', 'Graphite receiving antenna beside the discussion of data boundaries.', 'CONTROLLED EXCHANGE', 'corner') +
    p('Record the approved model offer, processing geography, storage, network path, permitted content and retention settings together. When a contract, customer profile or feature changes, revisit that record before reusing the deployment. GDPR, licensing, export screening and applicable cybersecurity obligations need competent review; a platform setting is evidence for a control, not a legal determination.') +
    link('foundry-runtime', 'Connect the runtime and tools'),
    { className: 'narrative' });

  add('foundry-runtime',
    heading('6.4 / Runtime and tools', 'Give the agent<br>a bounded <em>workspace.</em>') +
    p(`A prompt agent combines instructions, model and tools in a managed runtime. A hosted agent brings application code and orchestration into Foundry. An agent retained in another environment can use approved services and, through preview external-agent registration, participate in observability and evaluation. Choose according to execution control, connectivity and hosting needs. ${cite(16)}`,
      'The Microsoft Copilot harness is a preview option for supported prompt agents. It can support multi-step work using compatible tools, files and skills. Enable only the capabilities the responsibility requires: generic web access, shell execution or subagents should not be granted merely because the harness offers them.',
      'For an agent preparing a review dossier, file handling may be useful. For acquisition planning, narrow operations with typed parameters are more appropriate than a general shell into mission systems. Check the preview’s supported regions, models and limits before adopting it.') +
    sketch('antenna-vignette-reading.webp', 'Graphite antenna as a margin study beside controlled tool access.', 'NARROW INTERFACES', 'corner') +
    p('The runtime hosts the agent; it does not replace the mission orchestrator’s durable business state. If the work requires tighter execution-policy control, evaluate a hosted or external runtime rather than expanding generic access.'),
    heading('Application capabilities', 'Expose operations,<br>not whole <em>systems.</em>') +
    table(['Agent', 'Bounded tool capabilities'], [
      ['Tasking Intake', 'Read entitlements and procedures; record a clarification'],
      ['Priority Negotiation', 'Read commitments; prepare a policy-grounded priority proposal'],
      ['Acquisition Planning', 'Search windows, simulate a plan and request a reservation'],
      ['Downlink & Processing', 'Inspect confirmed capacity, launch approved jobs and follow transfers'],
      ['Product Delivery', 'Read quality and rights; request authorized publication and delivery'],
    ], '', 'foundry-matrix') +
    p('Foundry Toolboxes can group tools behind a compatible MCP endpoint with centralized authentication and version management. Build collections according to each agent’s permissions, then evaluate a collection change as a change to the agent’s reachable behaviour.',
      'A Toolbox is not automatically the self-hosted gateway described in Chapter 5. The gateway still controls access into the client’s hybrid environment. Tool grouping and the operational network boundary serve different purposes.',
      'Where technical approvals are available, including for supported MCP calls, connect them to the business workflow. The receiving API still verifies identity, parameters and authority. A tool approval is not MissionControl’s authorization of a spacecraft command.') +
    link('foundry-safeguards', 'Evaluate the behaviour at each boundary'),
    { className: 'narrative' });

  add('foundry-safeguards',
    heading('6.5 / Safeguards', 'Detect manipulation.<br>Check the <em>action.</em>') +
    p(`For compatible integrations, Foundry guardrails can act on user input, a proposed tool call, a tool response and the agent’s output. Agent guardrails and tool interventions include preview capabilities; confirm which integration points are covered instead of assuming every tool is protected. ${cite(17)}`,
      'Review the applied agent policy as a whole: it replaces the underlying model guardrail policy. A missing control should not be assumed to survive from the model configuration.',
      'Consider a customer message reporting a fire. Separate three questions: is the message trying to redirect the agent, is the event corroborated, and is this customer authorized to request the observation? Content safety does not answer the contractual or operational questions.',
      'Prompt Shields helps detect injected instructions. Preview Task Adherence guardrails provide a signal about alignment with the task. Operational sources and business checks establish the evidence needed to act. Test thresholds on legitimate crisis requests so useful vocabulary is not rejected indiscriminately.',
      'Define what follows each detection: exclude a compromised source, ask for clarification, stop a proposed action or escalate. Tool responses and retrieved documents are inputs to inspect, not authorities allowed to rewrite the agent’s task.'),
    heading('Evaluation before release', 'An explanation is<br>not an <em>execution receipt.</em>') +
    p('Combine output assessment with inspection of the route taken. Preview Intent Resolution, Task Completion and Task Adherence evaluators assess aspects of understanding and completion. Tool Call Accuracy, Tool Selection, Tool Input Accuracy, Tool Output Utilization and Tool Call Success examine the operations taken. Task Navigation Efficiency compares the path with reference sequences.',
      'Groundedness and relevance assess the final account. Preview evaluators for prohibited actions and sensitive-data leakage require the appropriate policy and inputs. An evaluator’s Task Adherence score is an offline measurement; the similarly named guardrail is a runtime signal. Neither replaces a mission-system validation.') +
    sketch('mission-review-reading.webp', 'Graphite review of a proposed mission plan.', 'TWO KINDS OF CHECK — Assess the explanation, then verify the authoritative system state.', 'wide') +
    p('Rubric evaluators let a model judge assess weighted business criteria, such as the explanation of a priority trade-off. Have domain experts review and calibrate the rubric. Retain the judge configuration so comparisons remain interpretable.',
      'Use custom code or endpoint evaluators for exact constraints: schema validity, coordinates, duplicate actions, plan versions and final API state. A clear description of a reservation is not proof that one exists. Check the authorized reservation in the test system and preserve its receipt alongside the scored response.') +
    link('foundry-operations', 'Follow the agents after release'),
    { className: 'narrative' });

  add('foundry-operations',
    heading('6.6 / Observation and governance', 'Follow the request<br>across the <em>agents.</em>') +
    p(`Foundry uses OpenTelemetry and Azure Monitor Application Insights to observe model calls, tools, retries, errors, latency and consumption. Propagate a common request correlation context through the five agents and their APIs. Add business events for reservations, quality review and approvals; model traces alone cannot establish delivery. ${cite(18)}`,
      'Tracing is generally available for prompt and hosted agents in the documentation snapshot. External-agent integration remains in preview. Registration improves visibility; the external runtime and receiving APIs keep their execution controls.',
      'Configure permitted content, masking, access and retention explicitly. Keep required audit records apart from sampled technical traces. An omitted span should not erase the evidence of a mission decision.',
      'Foundry Control Plane brings together the AI-agent inventory, operating indicators, evaluations and governance signals. Associate each agent version with an owner, approved configuration, customer profile and alert-handling procedure.') +
    sketch('mission-control.webp', 'Graphite mission operators examining a shared operational picture.', 'OPERATIONS STUDY — AI service visibility and spacecraft authorization remain separate responsibilities.', 'wide') +
    p('Control Plane supervises the AI-agent estate. MissionControl validates and authorizes space operations. Shared visibility does not merge these authorities.'),
    heading('Change and non-regression', 'A new version needs<br>new <em>evidence.</em>') +
    p('A model, prompt, tool, Toolbox, source or policy change triggers the relevant cases from the versioned dataset. Compare individual failures as well as aggregate scores. Retain the judge version and repeat runs where variability could change the release decision.',
      'Foundry’s documented GitHub Actions evaluation integration is in preview. It can support version comparisons and statistical analysis; the business release criteria still determine promotion. Monitoring surfaces also include preview scheduled or continuous evaluations of sampled interactions. Bound their volume, content and cost.',
      'Inspect performance separately for emergencies, languages, customer profiles and sensitive cases. Include interrupted journeys, tool errors and human corrections. After expert review, an observed failure can become a regression case rather than remain only an alert.',
      'Connect this evidence to the applicable obligations: data handling for GDPR, source rights for Copernicus and commercial licensing, approved end-user screening for dual use, and security and continuity controls for NIS2 where applicable. Assess AI Act applicability by purpose and deployment; treat the proposed EU Space Act as a changing legislative input, not enacted certification.') +
    annotation('A release record connects model and tool versions, test results, approved data handling and rollback procedures. The owner can then explain what changed and why it was accepted.') +
    p('The engineering sequence is concrete: shortlist a model, test it against mission cases, approve its deployment boundary, connect narrow tools, challenge its safeguards, follow its trace and compare the next version against the reference. The wildfire request now provides a way to examine that sequence through a product decision.') +
    link('wildfire', 'Apply the approach to a wildfire request'),
    { className: 'narrative' });

  add('wildfire',
    lead(`An urgent observation request arrives for ${escape(data.wildfireScenario.location)}. The service window is ${data.wildfireScenario.deadlineHours} hours.`) +
    p(`Mission ${escape(data.wildfireScenario.requestId)} asks Meridian to produce an optical fire-impact map for Greek Civil Protection. The operational question is whether a suitable observation can become an accepted product before the decision window closes.`,
      'The team has to determine whether it can acquire the data, downlink it and finish an acceptable product before the deadline. Weather uncertainty, other customer commitments, station contacts and processing capacity all affect that answer.') +
    figure('forest.webp', 'Illustrative forested valley used to introduce the wildfire observation request.', 'FIG. 7.1 — The landscape represents the area to observe, not a reconstruction of a real fire.'),
    heading('7.1 / Mission brief', 'The observation<br><em>request.</em>') +
    table(['Field', 'Scenario condition'], [
      ['Request', escape(data.wildfireScenario.requestId)],
      ['Customer', 'Greek Civil Protection'],
      ['AOI', escape(data.wildfireScenario.location)],
      ['Required product', 'Optical fire-impact map'],
      ['Deadline', `${data.wildfireScenario.deadlineHours} hours from the scenario request`],
      ['Decision owner', 'Mission control for safety-critical execution'],
    ]) +
    sub('The change to assess', 'Cloud differs from the forecast used for the optical plan. The team must establish whether the required coverage is still possible or whether the customer needs an alternative.') +
    note('Illustrative case study. The interactive choices explore decision criteria and do not execute operational actions.') +
    link('mission-lab', 'Explore the mission decisions'));

  add('mission-lab',
    heading('7.2 / Mission decisions', 'Assessing the<br><em>available options.</em>') +
    p('First, check whether the requested product can be delivered within the deadline. If it cannot, identify which changes the customer or mission control could approve.',
      'The choices opposite explore three responses: keep the optical requirement, assess a radar product or request an exception. Each requires checks before the team can commit to it.') +
    sub('How the agents would contribute', 'Intake verifies the request, and the priority agent assesses conflicts with other work. Acquisition planning checks observation opportunities. The downlink and processing agent follows the rest of the delivery path, while the delivery agent checks quality and rights.') +
    p('If every option fails the constraints, the system should explain why and identify any useful partial response the team is authorized to offer.'),
    heading('Mission decisions', 'Which option<br>should be <em>checked?</em>') +
    `<div class="scenario-choices">${scenarioOptions.map(([id, title, description]) => `<button type="button" data-scenario="${id}" aria-pressed="false" aria-controls="scenario-result"><strong>${title}</strong><span>${description}</span></button>`).join('')}</div>` +
    '<div class="scenario-result" id="scenario-result" role="status"><span class="eyebrow">DECISION RECORD</span><p>Select a path to inspect the conditions, trade-offs and approval boundary.</p></div>' +
    link('mission-debrief', 'Trace the decision'));

  add('mission-debrief',
    heading('7.3 / Decision trace', 'What changes<br>with each <em>option.</em>') +
    p('The three options answer different questions. Keeping the optical requirement seeks another way to deliver the original product. A radar alternative changes the product. Escalation asks an accountable owner to authorize a change that the current policy does not permit.') +
    table(['Option', 'Decision to record'], [
      ['Keep optical', 'Which acquisition and delivery chain can still cover the required area before the deadline?'],
      ['Offer radar', 'What information would the alternative provide, and has the customer accepted the changed product?'],
      ['Escalate', 'Which priority, product or commitment would change, and who can approve it?'],
    ]),
    heading('Mission record', 'Evidence behind<br>the <em>decision.</em>') +
    definitionList([
      ['Source evidence', 'Request, forecast version, opportunity, station availability, processing status and applicable customer entitlement.'],
      ['Action evidence', 'Tool calls, solver results, reservations, validation decisions and required human approvals.'],
      ['Outcome evidence', 'Observed acquisition, reception, quality, delivery and acceptance events with their timestamps.'],
      ['Limits', 'Unknown data, changed conditions, refused operations and remaining unmet requirements.'],
    ]) +
    p('An accepted alternative updates the product requirement before replanning. An unresolved exception remains blocked. If no approved option meets the deadline, the correct outcome is an explicit unmet request, not a successful-looking mission record.') +
    link('business-case', 'Return to the business-case measures'));

  const pages = [
    { id: 'cover', title: 'Cover', type: 'front', label: '—', left:
      `<span class="cover-eyebrow">${publication.eyebrow}</span><h1>${publication.title}<em>${escape(publication.subtitle)}</em></h1>${p(publication.description)}<p class="publication-byline">${publication.author}</p><a class="ink-button" href="#title-page">Begin reading <span aria-hidden="true">→</span></a>`,
      right: '<img class="cover-art" src="./art/earth-sketch-complete-reading.webp" alt="Graphite study of Earth, complete satellites, orbital paths and a ground antenna.">', className: 'cover', leftClass: 'cover-left', rightClass: 'cover-right' },
    { id: 'title-page', title: 'Title page', type: 'front', label: 'i', left:
      heading('Earth observation', 'Planning an<br>Earth-observation<br><em>mission.</em>') +
      figure('ground-station.webp', 'Graphite study of a ground-station antenna in an Arctic landscape.', 'FRONTISPIECE — A ground station receives data during a satellite contact.', 'full-art'),
      right: heading(publication.eyebrow, `${publication.title}<br>${escape(publication.subtitle)}`) +
      `<p class="publication-byline">${publication.author}</p>` +
      p('Continuous mission planning across customer requests, orbital opportunities, ground-station availability and product delivery.') +
      '<dl class="colophon"><div><dt>Scope</dt><dd>Tasking, downlink, processing and product delivery</dd></div><div><dt>Audience</dt><dd>Mission architects, operations teams and platform engineers</dd></div><div><dt>Reference operator</dt><dd>Meridian · Rome, Italy</dd></div><div><dt>Edition</dt><dd>November 2026</dd></div></dl>' +
      link('abstract', 'Read the abstract') },
    { id: 'abstract', title: 'Abstract', type: 'front', label: 'iii', left:
      heading('Abstract', 'Continuous planning<br>for <em>Earth observation.</em>') +
      p('An observation becomes useful only when the right measurement reaches its recipient in time. For an Earth-observation operator, that means coordinating a moving constellation, ground contacts, processing resources and customer commitments.',
        'Daily plans struggle when requests and operating conditions change between reconciliation cycles. An urgent acquisition can remain physically possible while the coordination needed to deliver it takes too long.',
        'This white paper recommends a bounded agentic coordination layer over existing mission and enterprise systems. Agents interpret changing context and prepare options; workflows, solvers and mission-control processes retain the responsibilities that require reproducible rules and explicit authority.'),
      right: heading('Approach and solution', 'Connect the work.<br>Preserve the<br><em>boundaries.</em>') +
      p('The architecture combines a durable mission orchestrator, five specialist agents and controlled access to hybrid tools, SharePoint procedures and customer data.',
        'The following chapters move from the industry and its challenges to operating constraints, the current architecture and the integration design. A Microsoft Foundry chapter explains how to build and qualify the agents. A wildfire request then shows how changing conditions affect the product, plan and decision owner.',
        'The intended improvement is faster, better-informed coordination with the existing constellation. Its value must be established through accepted-product delivery, operational reliability and service economics—not model response time alone.') +
      link('contents', 'Contents') },
    { id: 'contents', title: 'Contents · I', type: 'front', label: 'v', contents: [0, 1, 2, 3] },
    { id: 'contents-continued', title: 'Contents · II', type: 'front', label: 'vii', contents: [4, 5, 6] },
  ];

  let folio = 1;
  for (const chapter of legacyChapters) {
    chapter.folio = folio;
    chapter.sections.forEach(([id, title], index) => {
      const body = content.get(id);
      if (!body) throw new Error(`Missing chapter content: ${id}`);
      pages.push({ id, title, chapter: chapter.number, chapterTitle: chapter.title, sectionNumber: `${Number(chapter.number)}.${index + 1}`, type: 'chapter', folio, opening: index === 0, ...body });
      folio += 2;
    });
  }

  pages.push(
    { id: 'glossary', title: 'Glossary', type: 'back', label: 'A', folio: folio++, left:
      heading('Appendix A', 'Mission and<br><em>architecture terms.</em>') +
      p('Use these definitions consistently in requests, tool contracts and evaluation records. In particular, state which product is required, which events define its latency and who can approve an action.') +
      figure('earth-sketch-complete-reading.webp', 'Graphite illustration of Earth and satellite observation links.', 'PLATE A — Observation geometry shown illustratively, not as verified ephemerides.', 'full-art'),
      right: heading('Index of terms', 'Search the<br><em>glossary.</em>') +
      '<label class="sr-only" for="definition-search">Search all definitions</label><input id="definition-search" class="definition-search" type="search" placeholder="Downlink, agent, latency…" autocomplete="off">' +
      `<div id="definition-results">${definitionList(definitions.slice(0, 5))}</div><p id="definition-count" class="note-foot" aria-live="polite">Showing 5 of ${definitions.length} terms. Search the complete glossary above.</p>` },
    { id: 'references', title: 'References', type: 'back', label: 'B', folio: folio + 1, left:
      heading('Appendix B', 'Sources and<br><em>scope.</em>') +
      '<ol class="bibliography"><li><a href="https://defence-industry-space.ec.europa.eu/eu-space-act_en" target="_blank" rel="noopener noreferrer">European Commission — EU Space Act</a>. Proposal overview and legislative status.</li><li><a href="https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng" target="_blank" rel="noopener noreferrer">Directive (EU) 2022/2555 — NIS2</a>. Assess entity scope and national implementation.</li><li><a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng" target="_blank" rel="noopener noreferrer">Regulation (EU) 2016/679 — GDPR</a>. Assess the personal-data processing in scope.</li><li><a href="https://eur-lex.europa.eu/eli/reg/2021/821/oj/eng" target="_blank" rel="noopener noreferrer">Regulation (EU) 2021/821</a>. Union regime for dual-use items.</li></ol>' +
      note('Primary sources consulted 9 November 2026. Linking a source does not establish that every provision applies to the reference operator.'),
      right: heading('References continued', 'Protocol, policy<br>and <em>case evidence.</em>') +
      '<ol class="bibliography" start="5"><li><a href="https://eur-lex.europa.eu/eli/reg_del/2013/1159/oj/eng" target="_blank" rel="noopener noreferrer">Delegated Regulation (EU) No 1159/2013</a>. GMES dedicated data and service-information access and licensing; assess the conditions of the actual Copernicus product.</li><li><a href="https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization" target="_blank" rel="noopener noreferrer">MCP authorization specification, 2025-06-18</a>. Version-pinned HTTP transport authorization reference, not a claim to the latest revision.</li><li>Supplied business case: <em>Agentic Earth-Observation Tasking and Downlink for an Italian Space Operator</em>.</li><li>Shared Meridian dataset, version ' + data.version + '. Synthetic fleet, company, station and wildfire reference data.</li><li><a href="https://www.esa.int/articles/about-us/directorates/earth-observation-programmes/what-is-earth-observation" target="_blank" rel="noopener noreferrer">European Space Agency — What is Earth observation?</a> Published 27 May 2004; consulted 9 November 2026. Introduction to observations over time, optical and radar instruments, spatial detail and uses of Earth-observation data.</li></ol>' +
      '<ol class="bibliography" start="10"><li><a href="https://eu-space.europa.eu/components/earth-observation-copernicus/image-of-the-day/rome-italy" target="_blank" rel="noopener noreferrer">European Union, Copernicus — Rome, Italy</a>. Sentinel-2 optical scene acquired 16 March 2023. Image of the Day published 25 March 2023; consulted 10 November 2026.</li><li><a href="https://www.esa.int/ESA_Multimedia/Images/2018/09/Central_Italy" target="_blank" rel="noopener noreferrer">European Space Agency — Central Italy</a>. Sentinel-1B dual-polarisation radar scene acquired 6 July 2018; false-colour display. Contains modified Copernicus Sentinel data (2018), processed by ESA; CC BY-SA 3.0 IGO. Consulted 10 November 2026.</li><li>Meridian information-system reference model. Application catalogue, manual operator workflow and hosting responsibilities for OrbitPlanner, GroundLink, GeoFactory and MissionControl. These names identify the reference applications, not a verified vendor installation.</li></ol>' +
      '<ol class="bibliography foundry-bibliography" start="13">' + foundryReferences.map(([title, sources]) =>
        `<li>Microsoft Learn — ${title}. ${sources.map(([name, path]) => `<a href="https://learn.microsoft.com/en-us/azure/foundry/${path}" target="_blank" rel="noopener noreferrer">${name}</a>`).join('; ')}. Capability snapshot: 13 November 2026.</li>`).join('') + '</ol>' +
      note(caseNote) +
      link('image-credits', 'Image credits') },
    { id: 'image-credits', title: 'Image credits', type: 'back', label: 'C', folio: folio + 3, left:
      heading('Appendix C', 'Satellite images<br>and <em>sources.</em>') +
      p('The optical example shows Rome in Sentinel-2 imagery acquired on 16 March 2023. Credit: European Union, Copernicus Sentinel-2 imagery, processed by @DEFIS_EU. Contains modified Copernicus Sentinel data 2023.',
        'The radar example shows central Italy in Sentinel-1B dual-polarisation imagery acquired on 6 July 2018. It contains modified Copernicus Sentinel data (2018), processed by ESA, and is licensed under CC BY-SA 3.0 IGO.',
        'The two images have different dates and geographic extents. They illustrate different measurement types, not a matched sensor-performance comparison. Original files are retained; reading copies are resized without cropping or recolouring.') +
      '<a class="text-button" href="https://creativecommons.org/licenses/by-sa/3.0/igo/" target="_blank" rel="noopener noreferrer">Radar image licence <span aria-hidden="true">↗</span></a>',
      right: heading('Illustrations', 'Observation.<br>Ground contact.<br><em>Human review.</em>') +
      p('The graphite illustrations use fine naturalistic drawing on ivory paper. They depict observation, instrument differences, ground contact and human review; they are conceptual illustrations rather than photographs of Meridian hardware or facilities.',
        'The optical-style comparison uses one AI-generated fictional terrain image in both panels. A simulated cloud overlay changes visibility in the second panel without changing the ground beneath it. It is an educational example, not a real satellite acquisition or an evaluation result.',
        'Image provenance records the source files, generated assets, reading derivatives and reuse conditions.') +
      '<a class="text-button" href="./art/provenance.json" target="_blank" rel="noopener noreferrer">Illustration provenance <span aria-hidden="true">↗</span></a>' +
      '<div class="end-mark" aria-hidden="true">⁂</div>' },
    { id: 'back-cover', title: 'Back cover', type: 'back', label: '—', folio: folio + 5, left:
      figure('forest.webp', 'Graphite forest landscape closing the mission study.', 'CLOSING PLATE — Forest landscape used to illustrate the wildfire case.', 'full-art') +
      '<p class="hand-note">AR-1842 · Attica, Greece<br>Optical fire-impact map<br>Four-hour deadline</p>',
      right: heading(publication.eyebrow, `${publication.title}<br><em>${escape(publication.subtitle)}</em>`) +
      `<p class="publication-byline">${publication.author}</p>` +
      p('A mission is more than an observation opportunity. The measurement, ground contact, processing and delivery must form one feasible service.',
        'Agentic coordination helps assemble and revise that service as conditions change. Its role is to connect the work—not to remove the constraints that make the result trustworthy.') +
      link('contents', 'Return to contents') +
      `<div class="figure-index">${publication.title} — ${escape(publication.subtitle)}</div>`, rightClass: 'back-cover' },
  );
  return { pages, chapters: legacyChapters, company, caseNote };
}

export function createBook(data) {
  return createManuscriptBook(data, createSupportingBook(data), {
    publication, explorerPlate, processPlate, comparisonPlate, sensorExamples,
    operatorFlow, runtimeView, systems, scenarioOptions, definitions, definitionList,
  });
}

export function renderContents(chapterNumbers, pages) {
  return chapterNumbers.map(index => {
    const chapter = chapters[index];
    const first = pages.find(page => page.id === chapter.id);
    return `<section class="toc-chapter"><a href="#${chapter.id}" class="toc-entry"><span class="toc-num">${chapter.number}</span><span class="toc-title">${chapter.title}</span><span class="toc-dots"></span><span class="toc-page">${String(first.folio).padStart(2, '0')}</span></a><ol class="toc-sections">${chapter.sections.map(([id, title], sectionIndex) => {
      const page = pages.find(entry => entry.id === id);
      return `<li><a href="#${id}" data-toc-section="${id}"><span class="toc-section-number">${page.sectionNumber}</span><span>${title}</span><span class="toc-section-folio">${String(page.folio).padStart(2, '0')}</span></a></li>`;
    }).join('')}</ol></section>`;
  }).join('');
}
