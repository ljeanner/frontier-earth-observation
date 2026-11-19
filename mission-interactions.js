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
  ['Tasking Intake Agent', 'L4', 'Request, entitlement and approved screening'],
  ['Priority Negotiation Agent', 'L3', 'Competing commitments and SLA policy'],
  ['Acquisition Planning Agent', 'L3', 'Solver-backed acquisition proposal'],
  ['Downlink & Processing Agent', 'L4', 'Contact, reception and approved processing'],
  ['Product Delivery Agent', 'L4', 'Quality, rights and authorized recipient'],
];
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
    <p class="widget-label">24 hours from ${stamp(attica.start)} · source scenario, not a new feasibility calculation</p>
    <div class="timeline-ruler" aria-hidden="true">${[0, 4, 8, 12, 16, 20, 24].map(hour => `<span>+${hour}h</span>`).join('')}</div>
    <ol class="timeline-events">${events.map(([title, at, kind, detail], index) => {
      const offset = (Date.parse(at) - Date.parse(attica.start)) / 864000;
      return `<li class="timeline-${kind}" style="--event-position:${offset}%" data-current="${index === chosen}">
        ${interactive ? `<button type="button" data-timeline-event="${index}" aria-pressed="${index === chosen}">` : '<strong>'}${title}${interactive ? '</button>' : '</strong>'}
        <time datetime="${at}">${stamp(at)}</time><p>${detail}</p></li>`;
    }).join('')}</ol>
    <div class="timeline-capacity"><section><h4>Existing bookings · occupied</h4>
      ${state.records.filter(record => record.contact).map(record => `<p>${escape(record.reference)} · contact reserved in this workload snapshot</p>`).join('') || empty('No contacts reserved.')}
      <p class="widget-label">Booking times are not supplied for these reference requests; no overlapping station window is invented.</p></section>
      <section><h4>Processing capacity</h4><p>${queues.production.length} received job(s) ready; ${queues.incoming.length} incoming dataset(s) are not processing-ready.</p>
      <p class="widget-label">Queue state, not a throughput guarantee. A usable pass, compatible contact and processing slot still require validation.</p></section></div>
    <p class="widget-label">Potential ≠ reserved or accepted. “Impossible” refers to the shown product-quality or deadline constraint. Attica timings use the separate source scenario geometry, not a feasibility result from the constellation Explorer.</p>
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
  function appView(slot) {
    const key = slot.dataset.missionWidget;
    const view = views.get(key) ?? { app: 'planner', mode: 'ready', ticket: null };
    views.set(key, view);
    const queues = queuesFor(state.records);
    const current = applications.find(([id]) => id === view.app);
    const selected = state.records.find(record => record.id === view.ticket);
    const appButtons = applications.map(([id, name]) => `<button type="button" data-app="${id}" aria-pressed="${id === view.app}">${name}</button>`).join('');
    let panel;
    if (selected) {
      const allowed = {
        planner: ['propose'], ground: ['reserve', 'receive'], production: ['process'],
        control: ['review-plan', 'validate', 'authorize'],
      }[view.app];
      panel = `<button type="button" data-ticket-back>← Back to ${current[1]} backlog</button><h4>${escape(selected.title)}</h4>${facts(selected)}
        <div class="ticket-actions">${actions(selected, allowed)}</div>${history(selected)}`;
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
    return `<div class="application-map" aria-label="Clickable four-application architecture">${appButtons}</div>
      <section class="application-panel" aria-label="${current[1]} operational mock"><header><span class="eyebrow">${current[2]}</span><h3>${current[1]}</h3></header>${panel}</section>`;
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
    if (name === 'agents') return `<div class="orchestrator-state"><h3>Durable mission orchestrator</h3><p>${attica.requestId} · ${escape(status(pilot()))} · plan v${pilot().planVersion}</p></div>
      <ol class="agent-flow">${agents.map(([title, level], index) => `<li class="${index === state.agentStep ? 'is-current' : ''}"><button type="button" data-agent-step="${index}" aria-pressed="${index === state.agentStep}">${title}<small>${level}</small></button></li>`).join('')}</ol>
      <p class="agent-explanation" role="status">${agents[state.agentStep][2]}</p><p class="human-gate">Human gates: plan review · safety validation · command authorization · contract-changing decisions</p>
      <label>Explore the five responsibilities <input type="range" min="0" max="4" step="1" value="${state.agentStep}" data-agent-scrubber></label>
      <p class="widget-label">Project-specific delegation: L3 acts within policy; L4 owns routine work within approved limits. Both retain safety-critical approval.</p>`;
    if (name === 'revisit') return `<div class="coordination-comparison"><section><h3>Manual handoffs</h3><p>Tasking Desk → OrbitPlanner ↔ GroundLink → MissionControl → GeoFactory</p></section>
      <section><h3>Agent-supported coordination</h3><p>Five bounded responsibilities share the same mission record; the applications keep authority.</p></section></div>
      ${facts(pilot())}<p class="human-gate">No command authority is delegated. No time saving has been measured.</p>
      <button type="button" data-coordinate>Prepare a coordination trace</button>
      ${state.coordination ? `<ol class="mission-history">${agents.map(([title, , detail]) => `<li><strong>${title}</strong> · ${detail}</li>`).join('')}</ol>` : ''}
      ${timeline(state)}<p class="branch-result">${state.branch ? branchDetails[state.branch] : 'No alternative has been accepted.'}</p>
      ${history(pilot())}<a href="#existing-architecture">Return to the same application backlogs →</a>`;
    throw new Error(`Unknown mission widget: ${name}`);
  }
  function renderInto(container) {
    for (const slot of container.querySelectorAll('[data-mission-widget]')) {
      const currentMessage = slot.dataset.missionWidget === messageWidget ? message : '';
      const synthetic = ['wildfire', 'decisions', 'revisit'].includes(slot.dataset.missionWidget)
        ? '<p class="widget-label">Synthetic Meridian mission · AR-1842 · four-hour deadline · simulated passes and ground contacts, not the historical EMSR746 record.</p>' : '';
      slot.innerHTML = `${synthetic}${render(slot)}<p class="widget-notice" tabindex="-1" role="${error && currentMessage ? 'alert' : 'status'}">${escape(currentMessage)}</p>`;
    }
  }
  function update(origin) {
    const slot = origin?.closest('[data-mission-widget]');
    const focus = origin?.dataset;
    renderInto(root);
    if (slot && focus) {
      const candidates = [...slot.querySelectorAll('button,input')];
      const target = candidates.find(button => ['app', 'queue', 'openTicket', 'missionBranch', 'timelineEvent', 'agentStep', 'intakeCheck', 'agentScrubber'].some(key => focus[key] !== undefined && button.dataset[key] === focus[key]));
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
        message = 'Teaching state updated across the intake, applications and mission revisit. No real action was executed.';
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
    if (input.hasAttribute('data-agent-scrubber')) { state.agentStep = Number(input.value); update(input); }
  });
  return { renderInto, snapshot: () => structuredClone(state) };
}
