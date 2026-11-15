import { missionData } from './mission-data.js';

export const applications = [
  ['planner', 'OrbitPlanner', 'Acquisition opportunities and plans'],
  ['ground', 'GroundLink', 'Contacts, antenna reservations and reception'],
  ['production', 'GeoFactory', 'Received data, processing and quality'],
  ['control', 'MissionControl', 'Plan review, validation and command authorization'],
];

export function createMissionState(data) {
  const { attica, requests } = missionData;
  const records = [{
    id: attica.legacyRequestId, reference: attica.requestId, title: attica.title,
    customer: attica.customer, product: attica.product, aoi: attica.aoi.name,
    deadline: attica.deadline, intake: 'pending', acquisition: 'none',
  }, ...requests.map(request => ({
    id: request.id, reference: request.id, title: request.title,
    customer: `${request.segment} customer`, product: 'As specified in the source request',
    aoi: request.title.split(' – ')[1], deadline: null, intake: 'approved', acquisition: 'none',
  }))].map(record => ({
    ...record, planVersion: 0, contact: false, validatedVersion: null, authorizedVersion: null,
    received: false, processing: 'blocked', history: ['Initial teaching snapshot'],
  }));
  if (records.length !== data.requests.count ||
      records.some(record => !data.requests.ids.includes(record.id)))
    throw new Error('Operational teaching records must match the shared request IDs.');
  // Deliberately different stages of the same source workload, not new missions.
  Object.assign(records.find(record => record.id === 'req-maritime-med'), { acquisition: 'scheduled', planVersion: 1 });
  Object.assign(records.find(record => record.id === 'req-crop-andalusia'), { acquisition: 'scheduled', planVersion: 1, contact: true });
  Object.assign(records.find(record => record.id === 'req-crop-po'), {
    acquisition: 'scheduled', planVersion: 1, contact: true, validatedVersion: 1, authorizedVersion: 1,
    received: true, processing: 'ready',
  });
  return { records, branch: null, agentStep: 0 };
}

export function queuesFor(records) {
  return {
    intake: records.filter(record => record.intake === 'pending'),
    planner: records.filter(record => record.intake === 'approved' && record.acquisition === 'none'),
    ground: records.filter(record => record.acquisition === 'scheduled' && !record.contact),
    production: records.filter(record => record.received && record.processing === 'ready' &&
      record.contact && record.authorizedVersion === record.planVersion),
    incoming: records.filter(record => record.acquisition === 'scheduled' && !record.received),
    planReview: records.filter(record => record.acquisition === 'proposed'),
    validation: records.filter(record => record.acquisition === 'scheduled' && record.contact && record.validatedVersion !== record.planVersion),
    authorization: records.filter(record => record.acquisition === 'scheduled' && record.contact &&
      record.validatedVersion === record.planVersion && record.authorizedVersion !== record.planVersion),
    reception: records.filter(record => record.contact && !record.received && record.authorizedVersion === record.planVersion),
    quality: records.filter(record => ['review', 'held'].includes(record.processing)),
  };
}

export function transitionMission(state, id, action, checks = {}) {
  const next = structuredClone(state);
  const record = next.records.find(record => record.id === id);
  if (!record) throw new Error('Unknown source request.');
  const queues = queuesFor(next.records);
  const requireQueue = name => {
    if (!queues[name].includes(record)) throw new Error(`This request is not eligible for ${name}.`);
  };
  switch (action) {
    case 'approve-intake':
      requireQueue('intake');
      if (!checks.entitlement || !checks.export || !checks.product) throw new Error('Complete the three intake checks before approval.');
      record.intake = 'approved';
      break;
    case 'propose':
      requireQueue('planner');
      record.acquisition = 'proposed';
      record.planVersion++;
      break;
    case 'review-plan':
      requireQueue('planReview');
      record.acquisition = 'scheduled';
      break;
    case 'reserve':
      requireQueue('ground');
      record.contact = true;
      record.planVersion++;
      record.validatedVersion = null;
      record.authorizedVersion = null;
      break;
    case 'validate':
      requireQueue('validation');
      record.validatedVersion = record.planVersion;
      break;
    case 'authorize':
      requireQueue('authorization');
      record.authorizedVersion = record.planVersion;
      break;
    case 'receive':
      requireQueue('reception');
      record.received = true;
      record.processing = 'ready';
      break;
    case 'process':
      requireQueue('production');
      record.processing = record.id === missionData.attica.legacyRequestId ? 'held' : 'review';
      break;
    case 'replan':
      if (record.intake !== 'approved' || record.acquisition === 'none') throw new Error('There is no approved request plan to revise.');
      Object.assign(record, {
        acquisition: 'none', contact: false, validatedVersion: null, authorizedVersion: null,
        received: false, processing: 'blocked',
      });
      record.planVersion++;
      break;
    default:
      throw new Error('Unknown teaching action.');
  }
  record.history.push(`${action} · plan v${record.planVersion} · demonstration only`);
  return next;
}

export function availableActions(state, record) {
  const queues = queuesFor(state.records);
  const rules = [
    ['planner', 'propose', 'Propose acquisition'],
    ['planReview', 'review-plan', 'Approve acquisition plan'],
    ['ground', 'reserve', 'Reserve contact'],
    ['validation', 'validate', 'Run deterministic checks'],
    ['authorization', 'authorize', 'Authorize plan version'],
    ['reception', 'receive', 'Record reception'],
    ['production', 'process', 'Run processing / quality check'],
  ];
  return rules.filter(([queue]) => queues[queue].some(item => item.id === record.id)).map(([, action, title]) => [action, title]);
}
