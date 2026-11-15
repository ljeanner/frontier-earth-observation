// Generated from the shared sources by sync-dataset.mjs; do not edit.
export const missionData = {
  "source": "scenarios/attica.ts and eo-operator-explorer/src/data/requests.json",
  "scenarioSha256": "c7d13a3f9e0f7ed71793e4f8eecbabcac62b495b417fbd514b7a4627bcd982cc",
  "attica": {
    "id": "attica-20260714-afternoon",
    "requestId": "AR-1842",
    "legacyRequestId": "req-fire-attica",
    "customerId": "CUST-GR-CIVPROT",
    "customer": "Greek Civil Protection",
    "title": "Wildfire observation — Attica, Greece",
    "product": "Optical fire-impact map",
    "start": "2026-07-14T14:00:00.000Z",
    "deadline": "2026-07-14T18:00:00.000Z",
    "deliveredAt": "2026-07-15T14:00:00.000Z",
    "aoi": {
      "id": "AOI-ATTICA-01",
      "name": "Attica, Greece",
      "lat": 38.08,
      "lon": 23.75,
      "radiusKm": 25,
      "bbox": [
        23.55,
        37.95,
        23.95,
        38.23
      ]
    },
    "stationId": "gs-norway",
    "first": {
      "opportunityId": "OPP-7712",
      "satelliteId": "OPT-02",
      "acquisitionAt": "2026-07-14T14:12:00.000Z",
      "uploadStart": "2026-07-14T14:09:00.000Z",
      "uploadEnd": "2026-07-14T14:09:30.000Z",
      "processingStart": "2026-07-14T14:38:00.000Z",
      "reviewedAt": "2026-07-14T14:55:00.000Z",
      "cloudForecastPct": 12,
      "measuredCloudPct": 82,
      "measuredSmokePct": 38,
      "usableCoveragePct": 18
    },
    "retry": {
      "opportunityId": "OPP-7714",
      "satelliteId": "OPT-04",
      "acquisitionAt": "2026-07-15T12:50:00.000Z",
      "uploadStart": "2026-07-15T12:47:00.000Z",
      "uploadEnd": "2026-07-15T12:47:30.000Z",
      "processingStart": "2026-07-15T13:19:40.000Z",
      "reviewedAt": "2026-07-15T13:36:40.000Z",
      "cloudForecastPct": 8,
      "measuredCloudPct": 8,
      "measuredSmokePct": 2,
      "usableCoveragePct": 97
    },
    "collectionSeconds": 38,
    "resolutionM": 0.5,
    "swathKm": 50,
    "offNadirDeg": 0,
    "plannedCoveragePct": 98,
    "volumeGb": 9,
    "downlinkSeconds": 180,
    "rateMbps": 400
  },
  "contacts": [
    {
      "start": "2026-07-14T14:18:42.000Z",
      "end": "2026-07-14T14:21:42.000Z"
    },
    {
      "start": "2026-07-15T12:56:42.000Z",
      "end": "2026-07-15T12:59:42.000Z"
    }
  ],
  "requests": [
    {
      "id": "req-flood-emilia",
      "title": "Flood – Emilia-Romagna, Italy",
      "segment": "emergency",
      "lat": 44.5,
      "lng": 11.3,
      "radiusKm": 60,
      "urgency": "urgent",
      "neededWithinHours": 4,
      "receivedAtSimHour": 10
    },
    {
      "id": "req-maritime-med",
      "title": "Maritime surveillance – Central Mediterranean",
      "segment": "defence",
      "lat": 35,
      "lng": 15,
      "radiusKm": 150,
      "urgency": "urgent",
      "neededWithinHours": 4,
      "receivedAtSimHour": 12
    },
    {
      "id": "req-crop-andalusia",
      "title": "Crop monitoring – Andalusia, Spain",
      "segment": "agriculture",
      "lat": 37.4,
      "lng": -4.8,
      "radiusKm": 120,
      "urgency": "standard",
      "receivedAtSimHour": 3
    },
    {
      "id": "req-crop-po",
      "title": "Crop monitoring – Po Valley, Italy",
      "segment": "agriculture",
      "lat": 45.1,
      "lng": 9.8,
      "radiusKm": 100,
      "urgency": "standard",
      "receivedAtSimHour": 17
    }
  ]
};
