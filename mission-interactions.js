import { missionData } from './mission-data.js';
import { applications, createMissionState, queuesFor, transitionMission, availableActions } from './mission-workflow.js';
import { escape } from './manuscript-content.js';

const { attica } = missionData;
const time = value => new Date(value).toISOString().slice(11, 16);
const stamp = value => `${new Date(value).toISOString().slice(8, 10)} Jul · ${time(value)} UTC`;
const actionButton = (id, action, label) => `<button type="button" data-mission-action="${action}" data-request="${escape(id)}">${label} <small>(demo)</small></button>`;
const status = record => record.processing === 'held' ? 'Quality hold' : record.received ? 'Data received' :
  record.authorizedVersion === record.planVersion ? 'Authorized version' :
  record.contact ? 'Contact reserved' : record.acquisition !== 'none' ? `Acquisition ${record.acquisition}` : `Intake ${record.intake}`;
const empty = text => `<p class="queue-empty">${text}</p>`;
const agents = [
  {
    title: 'Tasking Intake Agent', level: 'L4', delegation: 'Qualify routine requests',
    detail: 'Request, entitlement and approved screening',
    role: 'Turn a customer request into a qualified observation task.',
    responsibilities: ['Check the area, product and deadline.', 'Verify entitlement and approved screening results.', 'Gather missing context and record the qualified request.'],
    autonomy: 'Qualifies complete requests within approved rules and records missing information without a separate approval for every routine step.',
    connections: [
      ['Tasking Desk', 'Customer request, area of interest, product, deadline and clarification history.', 'Read requests; record clarifications and the qualified intake.'],
      ['CRM', 'Customer identity, entitlements and SLA terms.', 'Read the authorized customer record; no contract or entitlement changes.'],
      ['SharePoint', 'Current intake procedures and controlled documentation.', 'Read only documents accessible to the delegated identity.'],
      ['Approved screening service', 'End-user, intended-use and export-screening results.', 'Submit a screening request and read its result; no override of a restriction.'],
    ],
    gate: 'Uncertain or restricted screening results go to an accountable reviewer.',
  },
  {
    title: 'Priority Negotiation Agent', level: 'L3', delegation: 'Recommend within policy',
    detail: 'Competing commitments and SLA policy',
    role: 'Resolve priority questions without silently changing existing commitments.',
    responsibilities: ['Compare requests against SLA and priority policy.', 'Explain options and affected commitments.', 'Route exceptions beyond delegated authority for approval.'],
    autonomy: 'Compares competing commitments and prepares priority options within delegated policy. It cannot change a customer agreement.',
    connections: [
      ['OrbitPlanner', 'Competing requests, existing commitments and candidate priorities.', 'Read commitments; record a priority proposal, not an unauthorized schedule override.'],
      ['CRM and analytics', 'SLA terms, commercial priorities and measured service history.', 'Read authorized business context; no price, SLA or contract changes.'],
      ['Customer-agent APIs', 'Permitted priority options and negotiation responses.', 'Exchange options within delegated scope; request acceptance when commitments would change.'],
      ['SharePoint', 'Approved priority and exception-handling policies.', 'Permission-aware, read-only retrieval with document versions.'],
    ],
    gate: 'Priority or commercial changes beyond delegated authority require the responsible operator or customer to approve them.',
  },
  {
    title: 'Acquisition Planning Agent', level: 'L3', delegation: 'Propose a feasible plan',
    detail: 'Solver-backed acquisition proposal',
    role: 'Prepare an acquisition plan that can be reviewed and validated.',
    responsibilities: ['Retrieve orbital, weather and instrument constraints.', 'Use deterministic solvers to compare candidate plans.', 'Submit a versioned proposal with downstream resource requirements.'],
    autonomy: 'Builds candidate plans with deterministic planning tools. A computed proposal is not permission to execute it.',
    connections: [
      ['OrbitPlanner and solver tools', 'Orbital windows, weather, instrument constraints and solver results.', 'Search opportunities, simulate candidates, record a versioned proposal and request an approved reservation.'],
      ['GroundLink', 'Compatible contacts, station availability and existing reservations.', 'Read availability and reservation status to check the proposed acquisition-to-downlink chain.'],
      ['GeoFactory', 'Processing prerequisites, queue and capacity metadata.', 'Read planning metadata; no unrestricted raw-imagery access or job launch.'],
      ['MissionControl', 'Submitted plan version, validation results and approval status.', 'Submit a plan for review and read status; no self-approval or command release.'],
      ['SharePoint', 'Current planning procedures and spacecraft constraints documentation.', 'Read only authorized, versioned technical context.'],
    ],
    gate: 'MissionControl reviews the exact plan version, applies deterministic safety checks and retains human command authorization.',
  },
  {
    title: 'Downlink & Processing Agent', level: 'L4', delegation: 'Run approved resource actions',
    detail: 'Contact, reception and approved processing',
    role: 'Coordinate the path from an approved acquisition to a processed product.',
    responsibilities: ['Reserve compatible, approved ground contacts.', 'Follow reception and reconcile transfer results.', 'Launch approved processing jobs and track completion or failure.'],
    autonomy: 'Reserves compatible contacts and starts approved processing jobs within the released plan and delegated resource limits.',
    connections: [
      ['GroundLink', 'Contact windows, antenna reservations, transfer receipts and reception status.', 'Reserve approved contacts and reconcile transfer results; no displacement outside policy.'],
      ['GeoFactory', 'Received-dataset references, job prerequisites, processing status and quality metadata.', 'Launch approved jobs and follow completion or failure. Imagery stays in the permitted processing environment.'],
      ['MissionControl', 'Released plan version and command-authorization status.', 'Read authorization and submit gated execution requests; never release a spacecraft command.'],
      ['SharePoint', 'Approved reception, processing and recovery procedures.', 'Read authorized procedures; retrieved text cannot expand tool permissions.'],
    ],
    gate: 'Spacecraft commands require MissionControl release; unresolved reception or quality failures remain blocked.',
  },
  {
    title: 'Product Delivery Agent', level: 'L4', delegation: 'Deliver within accepted rights',
    detail: 'Quality, rights and authorized recipient',
    role: 'Get an accepted product to the recipient authorized to receive it.',
    responsibilities: ['Review product quality and provenance.', 'Check the recipient, entitlement and product license.', 'Coordinate authorized publication and record delivery status.'],
    autonomy: 'Coordinates publication and delivery of an accepted product to an authorized recipient within the existing request and license.',
    connections: [
      ['GeoFactory and product catalogue', 'Product references, quality reports, provenance and publication status.', 'Read quality and lineage; request authorized publication and delivery only after acceptance.'],
      ['CRM', 'Recipient identity, current entitlement, product license and accepted service terms.', 'Read rights and recipient information; no entitlement or license changes.'],
      ['Tasking Desk / customer portal', 'Accepted product requirement and delivery acknowledgements.', 'Record delivery status and notify the authorized recipient; no unilateral product substitution.'],
      ['SharePoint', 'Current quality-acceptance and delivery procedures.', 'Read only documentation available to the delegated identity.'],
    ],
    gate: 'Failed quality or missing rights block delivery. A different product or recipient requires the appropriate acceptance and authorization.',
  },
];
const agentSummary = [
  ['Checks the request, the customer’s entitlement and the export screening', 'Screening is uncertain or restricted'],
  ['Weighs competing requests against SLA rules and explains the trade-off', 'A change exceeds its commercial authority'],
  ['Calls the solvers and compares candidate plans against orbit and weather', 'A plan is safety-relevant'],
  ['Allocates ground contacts and launches approved processing jobs', 'A spacecraft command is required'],
  ['Checks quality, provenance and recipient rights before delivery', 'The product changes or the recipient is not authorised'],
];

function agentAccessPanels(selected) {
  return agents.map((agent, index) => `<section class="agent-access-panel" id="agent-access-${index}" aria-labelledby="agent-profile-name-${index}" ${index === selected ? '' : 'hidden'}>
    <header class="agent-profile-header"><div><span class="eyebrow">Agent profile · ${String(index + 1).padStart(2, '0')} / 05</span><h4 id="agent-profile-name-${index}">${agent.title}</h4></div>
      <div class="agent-autonomy-badge"><span>Autonomy level</span><strong>${agent.level}</strong><span>${agent.delegation}</span></div></header>
    <div class="agent-brief">
      <section><h5>Role</h5><p>${agent.role}</p></section>
      <section><h5>Responsibilities</h5><ul>${agent.responsibilities.map(responsibility => `<li>${responsibility}</li>`).join('')}</ul></section>
      <section><h5>Autonomy</h5><p>${agent.autonomy}</p></section>
    </div>
    <section class="agent-data-section" aria-labelledby="agent-data-heading-${index}"><h5 id="agent-data-heading-${index}">Applications, data &amp; rights</h5>
      <ul class="agent-connections">${agent.connections.map(([application, data, access]) => `<li>
        <div class="agent-application"><span>Application / service</span><h6>${application}</h6></div><dl><div><dt>Data</dt><dd>${data}</dd></div><div><dt>Rights</dt><dd>${access}</dd></div></dl>
      </li>`).join('')}</ul></section>
    <p class="human-gate"><strong>Human approval &amp; limits.</strong> ${agent.gate}</p>
  </section>`).join('');
}
const branchDetails = {
  optical: 'Check the original optical requirement against observed suitability and the remaining windows. The next source optical opportunity is after the four-hour deadline.',
  radar: 'A radar alternative changes the product. Availability and suitability remain to be established, and the customer must accept the change. No radar opportunity or equivalent optical output is asserted.',
  escalate: 'Record affected commitments and the requested exception. The accountable operator or customer must decide; an unresolved or infeasible request remains blocked.',
};

function facts(record) {
  return `<dl class="ticket-facts">${[
    ['Request', record.reference], ['Customer', record.customer], ['Area', record.aoi],
    ['Product', record.product], ['Deadline', record.deadline ? stamp(record.deadline) : 'Source service requirement'],
    ['State', status(record)], ['Plan version', record.planVersion || 'Not planned'],
  ].map(([label, value]) => `<div><dt>${label}</dt><dd>${escape(value)}</dd></div>`).join('')}</dl>`;
}
function timeline(state, interactive = true) {
  const events = [
    ['Request', attica.start, 'potential', 'Four-hour service window opens.'],
    ['First optical pass', attica.first.acquisitionAt, 'potential', `${attica.first.satelliteId} · ${attica.first.opportunityId}; geometry alone does not establish product suitability.`],
    ['Ground contact', missionData.contacts[0].start, 'potential', `${attica.stationId}; three-minute transfer in the scenario geometry.`],
    ['Processing', attica.first.processingStart, 'potential', 'A processing start is not a quality acceptance.'],
    ['Quality review', attica.first.reviewedAt, 'impossible', `Observed cloud ${attica.first.measuredCloudPct}% versus forecast ${attica.first.cloudForecastPct}%; usable coverage ${attica.first.usableCoveragePct}%. The requested optical coverage fails.`],
    ['Deadline', attica.deadline, 'deadline', 'No accepted optical result is established within four hours.'],
    ['Optical retry', attica.retry.acquisitionAt, 'impossible', `${attica.retry.satelliteId} · ${attica.retry.opportunityId}; after the deadline, not a four-hour recovery.`],
  ];
  const chosen = Math.min(state.timelineEvent ?? 0, events.length - 1);
  const queues = queuesFor(state.records);
  return `<div class="constraint-timeline">
    <p class="widget-label">24 hours from ${stamp(attica.start)}</p>
    <div class="timeline-ruler" aria-hidden="true">${[0, 4, 8, 12, 16, 20, 24].map(hour => `<span>+${hour}h</span>`).join('')}</div>
    <ol class="timeline-events">${events.map(([title, at, kind, detail], index) => {
      const offset = (Date.parse(at) - Date.parse(attica.start)) / 864000;
      return `<li class="timeline-${kind}" style="--event-position:${offset}%" data-current="${index === chosen}">
        ${interactive ? `<button type="button" data-timeline-event="${index}" aria-pressed="${index === chosen}">` : '<strong>'}${title}${interactive ? '</button>' : '</strong>'}
        <time datetime="${at}">${stamp(at)}</time><p>${detail}</p></li>`;
    }).join('')}</ol>
    <div class="timeline-capacity"><section><h4>Existing bookings · occupied</h4>
      ${state.records.filter(record => record.contact).map(record => `<p>${escape(record.reference)} · contact reserved in this workload snapshot</p>`).join('') || empty('No contacts reserved.')}
      </section>
      <section><h4>Processing capacity</h4><p>${queues.production.length} received job(s) ready; ${queues.incoming.length} incoming dataset(s) are not processing-ready.</p>
      </section></div>
  </div>`;
}

export function createMissionInteractions(root, data, { onChange = () => {} } = {}) {
  let state = createMissionState(data);
  const views = new Map();
  let message = '';
  let messageWidget = null;
  let error = false;
  const initialChecks = { entitlement: false, export: false, product: false };
  let checks = { ...initialChecks };
  const pilot = () => state.records.find(record => record.id === attica.legacyRequestId);
  const list = records => records.length ? `<ul class="ticket-list">${records.map(record => `<li><button type="button" data-open-ticket="${record.id}" aria-label="${escape(`${record.reference}: ${record.title}`)}"><strong>${escape(record.reference)}</strong></button><span>${escape(record.title)}</span><small>${escape(status(record))}</small></li>`).join('')}</ul>` : empty('No eligible work in this queue.');
  const actions = (record, allowed) => availableActions(state, record)
    .filter(([action]) => allowed.includes(action)).map(([action, label]) => actionButton(record.id, action, label)).join('');
  const intake = () => {
    const record = pilot();
    return `<h3>Tasking Desk · ${attica.requestId}</h3>
      <form class="request-form" data-intake-form>${[
        ['Customer', record.customer], ['AOI', record.aoi], ['Product', record.product], ['Deadline', `${stamp(record.deadline)} · four hours`],
      ].map(([label, value]) => `<label>${label}<input value="${escape(value)}" readonly></label>`).join('')}
      <fieldset><legend>Intake review</legend>${[
        ['entitlement', 'Customer identity and entitlement checked'],
        ['export', 'Approved export / end-user screening reviewed'],
        ['product', 'Area, optical product and deadline qualified'],
      ].map(([id, label]) => `<label><input type="checkbox" data-intake-check="${id}" ${checks[id] ? 'checked' : ''} ${record.intake === 'approved' ? 'disabled' : ''}>${label}</label>`).join('')}</fieldset>
      ${record.intake === 'pending' ? actionButton(record.id, 'approve-intake', 'Approve intake') : '<p class="state-chip">Intake approved · eligible for OrbitPlanner</p>'}</form>
      <details><summary>Ticket detail and history</summary>${facts(record)}${history(record)}</details>`;
  };
  const history = record => `<ol class="mission-history">${record.history.map(event => `<li>${escape(event)}</li>`).join('')}</ol>`;
  function backlog(view) {
    const queues = queuesFor(state.records);
    const current = applications.find(([id]) => id === view.app);
    const selected = state.records.find(record => record.id === view.ticket);
    let panel;
    if (selected) {
      const allowed = {
        planner: ['propose'], ground: ['reserve', 'receive'], production: ['process'],
        control: ['review-plan', 'validate', 'authorize'],
      }[view.app];
      panel = `<button type="button" data-ticket-back>← Back to ${current[1]} backlog</button><h4>${escape(selected.title)}</h4>${facts(selected)}
        ${selected.id === attica.legacyRequestId ? '<p>Use the wildfire view above to act on AR-1842.</p>' : `<div class="ticket-actions">${actions(selected, allowed)}</div>`}${history(selected)}`;
    } else if (view.app === 'control') {
      panel = `<h4>Acquisition-plan review</h4>${list(queues.planReview)}
        <h4>Deterministic checks pending</h4>${list(queues.validation)}
        <h4>Command authorization</h4>${list(queues.authorization)}
        <p class="widget-label">Separate approval queues, bound to the exact plan version. MissionControl is not the final step of a linear delivery queue.</p>`;
    } else {
      const key = view.app === 'production' ? (view.mode === 'incoming' ? 'incoming' : view.mode === 'quality' ? 'quality' : 'production') :
        view.app === 'ground' && view.mode === 'reception' ? 'reception' : view.app;
      panel = view.app === 'production' ? `<div class="queue-tabs"><button type="button" data-queue="ready" aria-pressed="${view.mode === 'ready'}">Processing-ready</button><button type="button" data-queue="incoming" aria-pressed="${view.mode === 'incoming'}">Expected incoming</button><button type="button" data-queue="quality" aria-pressed="${view.mode === 'quality'}">Quality review / hold</button></div>` :
        view.app === 'ground' ? `<div class="queue-tabs"><button type="button" data-queue="ready" aria-pressed="${view.mode === 'ready'}">Downlink planning</button><button type="button" data-queue="reception" aria-pressed="${view.mode === 'reception'}">Reception</button></div>` : '';
      panel += `<p class="queue-rule">${{
        planner: 'Approved requests awaiting acquisition planning only.',
        ground: 'Scheduled acquisitions without a reserved contact.',
        production: 'Received data with authorization and satisfied processing prerequisites.',
        incoming: 'Scheduled incoming data: not an actionable processing queue.',
        reception: 'Authorized missions with a contact reservation, not yet received.',
        quality: 'Processed jobs requiring review; a hold is not a delivered product.',
      }[key]}</p>${list(queues[key])}`;
    }
    return panel;
  }
  function fireApplication(view) {
    const record = pilot();
    const released = record.authorizedVersion === record.planVersion;
    const held = record.processing === 'held';
    const panels = {
      planner: {
        question: 'Can Meridian observe the fire before the deadline?',
        rows: [
          ['Candidate satellite', attica.first.satelliteId],
          ['Opportunity', attica.first.opportunityId],
          ['Optical acquisition', stamp(attica.first.acquisitionAt)],
          ['Cloud forecast', `${attica.first.cloudForecastPct}%`],
          ['Planned coverage', `${attica.plannedCoveragePct}%`],
          ['Resolution', `${attica.resolutionM} m`],
        ],
        note: record.intake !== 'approved' ? 'The opportunity is a candidate. Qualify the request before proposing an acquisition.' :
          record.acquisition === 'none' ? 'The request is qualified. Prepare a proposal for MissionControl to review.' :
          record.acquisition === 'proposed' ? 'The proposal is waiting for acquisition-plan review in MissionControl.' :
          'The acquisition plan is approved. Its ground contact and exact command version still have separate gates.',
        allowed: ['propose'],
      },
      ground: {
        question: 'How will the fire observation reach the ground?',
        rows: [
          ['Ground station', attica.stationId],
          ['Contact starts', stamp(missionData.contacts[0].start)],
          ['Contact ends', stamp(missionData.contacts[0].end)],
          ['Transfer duration', `${attica.downlinkSeconds / 60} minutes`],
          ['Data volume', `${attica.volumeGb} GB`],
          ['Reception', record.received ? 'Data received' : 'Not received'],
        ],
        note: record.acquisition !== 'scheduled' ? 'This contact is a scenario candidate, not a reservation. MissionControl must first approve the acquisition plan.' :
          !record.contact ? 'Reserve the contact for the approved acquisition. Changing the plan requires a new version to be checked.' :
          !released ? 'The contact is reserved. MissionControl must validate and authorise this exact plan version before reception can be recorded.' :
          record.received ? 'The received dataset can now enter GeoFactory’s processing-ready queue.' :
          'The plan version is authorised. Reception is recorded separately from the reservation.',
        allowed: ['reserve', 'receive'],
      },
      production: {
        question: 'Does the received image answer the customer’s request?',
        rows: [
          ['Required product', record.product],
          ['Scenario processing start', stamp(attica.first.processingStart)],
          ['Input dataset', record.received ? `${attica.first.satelliteId} · received` : 'Awaiting authorised reception'],
          ['Processing', held ? 'Quality hold' : record.processing === 'ready' ? 'Ready to process' : 'Not processing-ready'],
          ...(held ? [
            ['Observed cloud', `${attica.first.measuredCloudPct}%`],
            ['Usable coverage', `${attica.first.usableCoveragePct}%`],
          ] : []),
        ],
        note: held ? `The optical product fails its coverage check. The next optical candidate, ${attica.retry.satelliteId} at ${stamp(attica.retry.acquisitionAt)}, is after the four-hour deadline. No accepted delivery is established.` :
          record.received ? 'Run the approved processing and quality check. A received image is not yet an accepted product.' :
          'Expected incoming data is not processing-ready. GroundLink must first record reception of the authorised mission.',
        allowed: ['process'],
      },
      control: {
        question: 'Which plan version may the spacecraft execute?',
        rows: [
          ['Plan version', record.planVersion || 'No submitted plan'],
          ['Acquisition review', record.acquisition === 'scheduled' ? 'Approved' : record.acquisition === 'proposed' ? 'Awaiting review' : 'No proposal'],
          ['Contact', record.contact ? 'Reserved' : 'Not reserved'],
          ['Deterministic checks', record.validatedVersion === record.planVersion ? `Validated v${record.planVersion}` : 'Not validated for this version'],
          ['Command authorisation', released ? `Authorised v${record.planVersion}` : 'Not authorised for this version'],
        ],
        note: record.acquisition === 'none' ? 'OrbitPlanner must submit a proposal before review can begin.' :
          record.acquisition === 'proposed' ? 'Review the acquisition proposal. GroundLink can then reserve its contact.' :
          !record.contact ? 'The acquisition is approved, but its ground contact is missing. Reserve it in GroundLink before validating the full plan.' :
          released ? 'This exact version is authorised. GroundLink still records reception; GeoFactory still checks the product.' :
          'Deterministic validation and human command authorisation are separate decisions, both bound to the current version.',
        allowed: ['review-plan', 'validate', 'authorize'],
      },
    };
    const panel = panels[view.app];
    const nextApp = view.app === 'planner' && record.acquisition === 'proposed' ? ['control', 'Review the proposal in MissionControl'] :
      view.app === 'control' && record.acquisition === 'scheduled' && !record.contact ? ['ground', 'Reserve the contact in GroundLink'] :
      view.app === 'ground' && record.contact && !released ? ['control', 'Check this version in MissionControl'] :
      view.app === 'control' && released && !record.received ? ['ground', 'Record reception in GroundLink'] :
      view.app === 'ground' && record.received ? ['production', 'Inspect the image in GeoFactory'] : null;
    return `<p class="fire-question">${panel.question}</p>
      <dl class="fire-app-data">${panel.rows.map(([label, value]) => `<div><dt>${label}</dt><dd>${escape(value)}</dd></div>`).join('')}</dl>
      <p class="fire-app-explanation">${escape(panel.note)}</p>
      ${view.app === 'planner' && record.intake === 'pending' ? `<details class="fire-intake" data-mission-disclosure="fire-intake"><summary>Review and qualify AR-1842</summary>${intake()}</details>` : ''}
      <div class="ticket-actions">${actions(record, panel.allowed)}
      ${nextApp ? `<button type="button" data-app="${nextApp[0]}">${nextApp[1]} →</button>` : ''}</div>
      <details data-mission-disclosure="fire-history"><summary>Mission record and decisions</summary>${facts(record)}${history(record)}</details>`;
  }
  function appView(slot) {
    const key = slot.dataset.missionWidget;
    const view = views.get(key) ?? { app: 'planner', mode: 'ready', ticket: null };
    views.set(key, view);
    const current = applications.find(([id]) => id === view.app);
    const panelId = `fire-application-${key}`;
    const appButtons = applications.map(([id, name]) => `<button type="button" data-app="${id}" aria-pressed="${id === view.app}" aria-controls="${panelId}">${name}</button>`).join('');
    return `<header class="fire-mission-heading"><span class="evidence-badge evidence-fictional">Fictional scenario</span>
      <h3>${attica.requestId} · Attica wildfire</h3><p>${escape(attica.customer)} · ${escape(attica.product)} · deadline ${stamp(attica.deadline)}</p></header>
      <div class="application-map" aria-label="Explore the wildfire in four mission applications">${appButtons}</div>
      <section class="application-panel" id="${panelId}" aria-label="${current[1]} operational mock"><header><span class="eyebrow">${current[2]}</span><h3>${current[1]}</h3></header>
      <div class="fire-application" data-fire-application="${view.app}">${fireApplication(view)}</div>
      <details class="application-workload" data-mission-disclosure="application-workload"><summary>Other requests and application queues</summary>${backlog(view)}</details></section>`;
  }
  function render(slot) {
    const name = slot.dataset.missionWidget;
    if (name === 'intake') return intake();
    if (name === 'applications') return appView(slot);
    if (name === 'timeline' || name === 'wildfire') return (name === 'wildfire' ?
      `<aside class="aoi-coordinate-card"><h3>${attica.aoi.name} · ${attica.aoi.id}</h3>
      <p>Source AOI centre: ${attica.aoi.lat}° N, ${attica.aoi.lon}° E · radius ${attica.aoi.radiusKm} km.</p>
      <p class="widget-label">Source bounding box: ${attica.aoi.bbox.join(', ')} (west, south, east, north). A licensed geographic basemap is not yet available; the landscape illustration is not this AOI.</p></aside>` : '') + timeline(state);
    if (name === 'decisions') return `<h3>Assess an alternative</h3><div class="scenario-choices">${[
      ['optical', 'Keep the optical requirement'], ['radar', 'Assess a radar alternative'], ['escalate', 'Request an exception'],
    ].map(([id, title]) => `<button type="button" data-mission-branch="${id}" aria-pressed="${state.branch === id}"><strong>${title}</strong></button>`).join('')}</div>
      <p class="branch-result" role="status">${state.branch ? branchDetails[state.branch] : 'Select a path to inspect the product, feasibility and approval boundary.'}</p>
      <dl class="print-only">${Object.entries(branchDetails).map(([id, detail]) => `<dt>${id}</dt><dd>${detail}</dd>`).join('')}</dl>`;
    if (name === 'agents') return `<div class="table-scroll" tabindex="0" role="region" aria-label="Scrollable five-agent summary"><table class="matrix agent-summary"><colgroup><col style="width:23%"><col style="width:37%"><col style="width:8%"><col style="width:32%"></colgroup><thead><tr><th scope="col">Agent</th><th scope="col">What it does</th><th scope="col">Level</th><th scope="col">Hands over to a human when</th></tr></thead><tbody>${agents.map((agent, index) => `<tr><th scope="row">${agent.title.replace(' Agent', '')}</th><td>${agentSummary[index][0]}</td><td>${agent.level}</td><td>${agentSummary[index][1]}</td></tr>`).join('')}</tbody></table></div>
      <p class="widget-label">L3 acts within policy; L4 owns routine work within approved limits. These labels are project-specific. Both leave safety-critical approval to people.</p>
      <details class="agent-access-details"><summary>Applications, data &amp; rights by agent</summary>
      <div class="orchestrator-state"><h3>Durable mission orchestrator</h3><p>${attica.requestId} · ${escape(status(pilot()))} · plan v${pilot().planVersion}</p></div>
      <ol class="agent-flow">${agents.map(({ title, level, delegation }, index) => `<li class="${index === state.agentStep ? 'is-current' : ''}"><button type="button" data-agent-step="${index}" aria-controls="agent-access-${index}" aria-pressed="${index === state.agentStep}">${title}<small>${level} · ${delegation}</small></button></li>`).join('')}</ol>
      ${agentAccessPanels(state.agentStep)}
      </details>`;
    if (name === 'revisit') return `<div class="coordination-comparison"><section><h3>Manual handoffs</h3><p>Tasking Desk → OrbitPlanner ↔ GroundLink → MissionControl → GeoFactory</p></section>
      <section><h3>Agent-supported coordination</h3><p>Five bounded responsibilities share the same mission record; the applications keep authority.</p></section></div>
      ${facts(pilot())}
      <button type="button" data-coordinate>Prepare a coordination trace</button>
      ${state.coordination ? `<ol class="mission-history">${agents.map(({ title, detail }) => `<li><strong>${title}</strong> · ${detail}</li>`).join('')}</ol>` : ''}
      <details data-mission-disclosure="revisit-timeline"><summary>Explore the simulated mission timeline</summary>${timeline(state)}</details>${state.branch ? `<p class="branch-result">${branchDetails[state.branch]}</p>` : ''}
      <details data-mission-disclosure="revisit-history"><summary>Mission decisions</summary>${history(pilot())}</details><a href="#existing-architecture">Return to the wildfire in Meridian’s applications →</a>`;
    throw new Error(`Unknown mission widget: ${name}`);
  }
  function renderInto(container) {
    for (const slot of container.querySelectorAll('[data-mission-widget]')) {
      const currentMessage = slot.dataset.missionWidget === messageWidget ? message : '';
      const synthetic = slot.dataset.missionWidget === 'revisit'
        ? '<span class="evidence-badge evidence-fictional">Fictional scenario</span><p class="widget-label">Fictional scenario with simulated passes and contacts. No time saving has been measured.</p>' : '';
      slot.innerHTML = `${synthetic}${render(slot)}<p class="widget-notice" tabindex="-1" role="${error && currentMessage ? 'alert' : 'status'}">${escape(currentMessage)}</p>`;
    }
  }
  function update(origin) {
    const slot = origin?.closest('[data-mission-widget]');
    const focus = origin?.dataset;
    const accessOpen = root.querySelector('.agent-access-details')?.open;
    const openDisclosures = [...root.querySelectorAll('details[data-mission-disclosure][open]')].map(details => details.dataset.missionDisclosure);
    renderInto(root);
    if (accessOpen) root.querySelector('.agent-access-details').open = true;
    for (const details of root.querySelectorAll('details[data-mission-disclosure]')) {
      details.open = openDisclosures.includes(details.dataset.missionDisclosure) &&
        !(focus?.app && ['fire-history', 'application-workload'].includes(details.dataset.missionDisclosure));
    }
    if (slot && focus) {
      const candidates = [...slot.querySelectorAll('button,input')];
      const target = candidates.find(button => ['app', 'queue', 'openTicket', 'missionBranch', 'timelineEvent', 'agentStep', 'intakeCheck'].some(key => focus[key] !== undefined && button.dataset[key] === focus[key]));
      (target ?? slot.querySelector('.widget-notice')).focus?.({ preventScroll: true });
    }
    onChange();
  }
  root.addEventListener('submit', event => { if (event.target.matches('[data-intake-form]')) event.preventDefault(); });
  root.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest('button');
    const slot = button?.closest('[data-mission-widget]');
    if (!slot) return;
    const key = slot.dataset.missionWidget;
    messageWidget = key;
    const view = views.get(key);
    error = false;
    message = '';
    if (button.dataset.app) { Object.assign(view, { app: button.dataset.app, mode: 'ready', ticket: null }); }
    else if (button.dataset.queue) { view.mode = button.dataset.queue; view.ticket = null; }
    else if (button.dataset.openTicket) view.ticket = button.dataset.openTicket;
    else if (button.hasAttribute('data-ticket-back')) view.ticket = null;
    else if (button.dataset.missionAction) {
      try {
        state = transitionMission(state, button.dataset.request, button.dataset.missionAction, checks);
        message = 'Simulated mission record updated. No real action was executed.';
      } catch (failure) { message = failure.message; error = true; }
    } else if (button.dataset.missionBranch) {
      state.branch = button.dataset.missionBranch;
    } else if (button.dataset.timelineEvent) {
      state.timelineEvent = Number(button.dataset.timelineEvent);
    } else if (button.dataset.agentStep) {
      state.agentStep = Number(button.dataset.agentStep);
    } else if (button.hasAttribute('data-coordinate')) {
      state.coordination = true;
      message = 'Coordination trace prepared from the same state. Backlogs and approvals have not been advanced.';
    } else return;
    update(button);
  });
  root.addEventListener('input', event => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    if (input.dataset.intakeCheck) checks[input.dataset.intakeCheck] = input.checked;
  });
  return { renderInto, snapshot: () => structuredClone(state) };
}
