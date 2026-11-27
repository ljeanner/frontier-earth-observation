import { atticaTimeline as chapter } from './attica-timeline-data.js';

const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const inline = value => escape(value).replace(/\[([^\]]+)\]\((https:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
const external = (url, label) => `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)}</a>`;
const story = id => `https://storymaps.arcgis.com/stories/${id}`;
export const atticaStory = story('e72e6348c2f04c1f80e934345e796feb');
export const iceyeSource = 'https://earth.esa.int/eogateway/data-application/feeling-the-heat-commercial-satellites-track-temperature-extremes/iceye-monitors-the-impact-of-a-wildfire-in-greece';

export const atticaReferences = [
  [1, 'CEMS — EMSR746 situational reporting: activation, acquisitions and product publication', atticaStory],
  [2, 'Wildfire Data Portal — Varnavas: documented outbreak at 11 August 2024, 12:02 UTC', 'https://wildfiredataportal.eu/fire/varnavas/'],
  [3, 'ESA — ICEYE Monitors the Impact of a Wildfire in Greece', iceyeSource],
  [4, 'ESA — Feeling the heat: Commercial satellites track temperature extremes', 'https://earth.esa.int/eogateway/data-application/feeling-the-heat-commercial-satellites-track-temperature-extremes'],
  [5, 'CEMS — Mapping service timeline', 'https://mapping.emergency.copernicus.eu/about/mapping-service-timeline/'],
  [6, 'Remote Sensing 13(11), 2114', 'https://www.mdpi.com/2072-4292/13/11/2114'],
  [7, 'Athens time zone and daylight saving', 'https://www.timeanddate.com/time/zone/greece/athens'],
  [8, 'EMSR746 — official delineation map', 'https://civilprotection.gov.gr/sites/default/files/2024-08/EMSR746_AOI01_DEL_PRODUCT_50000_map_v1.pdf'],
  [9, 'Hellenic Fire Service — Varnavas emergency briefing', 'https://www.fireservice.gr/-/ektakte-neotere-enemerose-gia-ten-pyrkagia-sto-barnaba-attikes-pragmatopoiese-o-ekprosopos-typou-tou-pyrosbestikou-somatos'],
  [10, 'EMSR746 — official monitoring 01 map', 'https://civilprotection.gov.gr/sites/default/files/2024-08/EMSR746_AOI01_DEL_MONIT01_50000_map_v1.pdf'],
  [11, 'EMSR746 — official grading map', 'https://civilprotection.gov.gr/sites/default/files/2024-08/EMSR746_AOI01_GRA_PRODUCT_45000_map_v1.pdf'],
  [12, 'ESA Living Planet Symposium 2025 — mapping benchmark presentation', 'https://lps25.esa.int/lps25-presentations/presentations/2540/_2540.pdf'],
  [13, 'ESA — WorldView-2 mission', 'https://earth.esa.int/eogateway/missions/worldview-2'],
  [14, 'ESA — GeoEye-1 mission', 'https://earth.esa.int/eogateway/missions/geoeye-1'],
  [16, 'CEMS — Limitations when using Earth observation data', 'https://mapping.emergency.copernicus.eu/about/limitations-when-using-earth-observation-data/'],
  [17, 'CEMS — EMSR713 Saarland', story('abc39dff5be94b2d9ff53158273b05f9')],
  [18, 'CEMS — EMSR705 Tuscany', story('91d5ce3f435d481098fab9ebabb8f651')],
  [19, 'CEMS — EMSR706 Northern France', story('17f145609f354a2187c0642c96d6fb34')],
  [20, 'Greek Civil Protection — wildfire update', 'https://civilprotection.gov.gr/en/deltia-tupou/latest-update-wildfires-fire-service-spokesperson-fire-colonel-vassilios-0'],
];

export const atticaMaps = [
  ['del', 'Sentinel-2 · DEL', '12 August 2024, 09:05 UTC', '12 August 2024, 19:01 UTC', 'Initial delineation, 10 m; 8,594.2 ha burned area.'],
  ['monit01', 'WorldView-2 · MONIT01', '13 August 2024, 09:33 UTC', '13 August 2024, 18:44 UTC', 'Detailed monitoring, 2 m; 10,409.7 ha burned area.'],
  ['monit02', 'WorldView-2 · MONIT02', '14 August 2024, 08:56 UTC', '14 August 2024, 15:11 UTC', 'Subsequent monitoring, 2 m; 10,413.8 ha burned area.'],
  ['grading', 'GeoEye-1 · Grading', '15 August 2024, 08:41 UTC', '15 August 2024, 20:52 UTC', 'Damage grading, 0.5 m; a different analytical product, not simply another fire outline.'],
];

export function formatMinutes(minutes) {
  if (!Number.isSafeInteger(minutes) || minutes < 0) throw new Error('A duration must be a non-negative integer number of minutes.');
  return `${Math.floor(minutes / 60)} h ${String(minutes % 60).padStart(2, '0')}`;
}

export function atticaBibliography() {
  return `<section class="attica-reference-notes"><h3>Attica historical evidence</h3><p>The Varnavas timeline is reconstructed from the primary Copernicus EMS records listed below, consulted on 16 November 2026. The radar observation by ICEYE on 13 August 2024 is documented by ESA but is not one of the four CEMS products; its tasking and delivery times are not public.</p><ul class="bibliography">${atticaReferences.map(([, label, url]) => `<li>${external(url, label)}</li>`).join('')}</ul></section>`;
}

function mapFigure(stem, title, caption) {
  const base = `cems-emsr746-${stem}`;
  return `<figure class="attica-map"><a href="./art/${base}-original.jpg" target="_blank" rel="noopener noreferrer"><img src="./art/${base}-reading.webp" alt="${escape(title)} — official CEMS EMSR746 map of the area affected by the Varnavas wildfire near Athens. See the caption and retained original for dates, interpretation and credits."></a><figcaption><strong>${escape(title)}</strong> ${caption}</figcaption></figure>`;
}

export function atticaHistory() {
  return `<div class="attica-history" data-evidence="historical"><span class="evidence-badge evidence-real">Real case: Copernicus EMSR746</span>
    <p>To see how long an urgent request really takes, let's look at a real emergency: the August 2024 wildfire near Varnavas, in Greece's Attica region.</p>
    <h3>Why Copernicus Was Activated</h3>
    <p>Around noon on 11 August 2024, a wildfire broke out near Varnavas, north-east of Athens. Driven by strong winds, it spread fast and several villages were evacuated. The Copernicus Emergency Management Service was asked to map the burned area and track the fire's extent.</p>
    <p class="plate-note">${external('https://mapping.emergency.copernicus.eu/activations/EMSR746/', 'CEMS activation record')} · ${external(atticaReferences[1][2], 'Outbreak record')}.</p>
    <h3>From the Request to the Published Maps</h3>
    <p>Copernicus was activated on 12 August at 06:56 UTC. Four optical products followed over four days: a first delineation, two monitoring updates and a damage assessment. Each answered a different question as the fire evolved.</p>
    <div class="attica-map-grid">${atticaMaps.map(([stem, title, acquisition, publication, role]) => mapFigure(stem, title, `${escape(role)} · acquired ${escape(acquisition.replace(' August 2024,', ' Aug'))} · published ${escape(publication.replace(' August 2024,', ' Aug'))}`)).join('')}</div>
    ${mapFigure('fire-evolution', 'Fire evolution', 'Successive mapped extents.')}
    <details class="attica-additional-maps"><summary>Inspect the four damage maps</summary>${[
      ['damage-overview', 'Damage assessment overview', 'CEMS grading overview, not an additional acquisition.'],
      ['damage-detail01', 'Damage assessment detail 01', 'Detail from the CEMS grading product.'],
      ['damage-detail02', 'Damage assessment detail 02', 'Detail from the CEMS grading product.'],
      ['damage-detail03', 'Damage assessment detail 03', 'Detail from the CEMS grading product.'],
    ].map(([stem, title, caption]) => mapFigure(stem, title, caption)).join('')}</details>
    <p class="plate-note attica-gallery-credit">Maps © 2024 European Union, Copernicus EMS (EMSR746). ${external(atticaStory, 'CEMS source')}. Full credits in <a href="#image-credits">Image credits</a>.</p></div>`;
}

export function atticaChart() {
  const maximumMinutes = 96 * 60;
  const groups = [...new Set(chapter.rows.map(row => row.group))];
  return `<figure class="attica-chart" aria-labelledby="attica-chart-title" aria-describedby="attica-chart-note"><h3 id="attica-chart-title">${escape(chapter.chartTitle)}</h3><p>${escape(chapter.chartSubtitle)}</p>
    <div class="attica-legend"><span><i class="attica-blue" aria-hidden="true"></i>Activation → acquisition</span><span><i class="attica-amber" aria-hidden="true"></i>Acquisition → published product</span></div>
    <p class="attica-chart-instruction">Hover, tap or focus a bar for its exact component durations. Press Escape to dismiss the tooltip.</p>
    ${groups.map((group, groupIndex) => `<section class="attica-chart-group" aria-labelledby="attica-group-${groupIndex}"><h4 id="attica-group-${groupIndex}">${escape(chapter.groups[groupIndex])}</h4><p class="attica-scale-label">Shared scale · hours since activation · 0–96 h</p>
      <div class="attica-axis" aria-hidden="true">${[0, 24, 48, 72, 96].map(hour => `<span style="left:${hour / 96 * 100}%">${hour}</span>`).join('')}</div>
      ${chapter.rows.filter(row => row.group === group).map((row, rowIndex) => {
        const total = row.activationToAcquisitionMin + row.acquisitionToProductMin;
        const detail = `Activation → acquisition: ${formatMinutes(row.activationToAcquisitionMin)}; acquisition → published product: ${formatMinutes(row.acquisitionToProductMin)}; total: ${formatMinutes(total)}.`;
        const tooltipId = `attica-duration-${groupIndex}-${rowIndex}`;
        return `<div class="attica-chart-row" data-total-minutes="${total}"><span class="attica-product">${escape(row.label)}</span><button type="button" class="attica-bar" aria-label="${escape(row.label)}: ${escape(detail)}" aria-describedby="${tooltipId}"><span class="attica-track" aria-hidden="true"><span class="attica-segment attica-blue" style="width:${row.activationToAcquisitionMin / maximumMinutes * 100}%"></span><span class="attica-segment attica-amber" style="width:${row.acquisitionToProductMin / maximumMinutes * 100}%"></span><strong class="attica-total">${formatMinutes(total)}</strong></span></button><span class="attica-tooltip" id="${tooltipId}" role="tooltip">${escape(detail)}</span></div>`;
      }).join('')}</section>`).join('')}
    <figcaption id="attica-chart-note">${escape(chapter.figureNote)}</figcaption>
    <p class="attica-chart-sources">Primary timestamp records: ${[1, 17, 18, 19].map(number => {
      const [, label, url] = atticaReferences.find(reference => reference[0] === number);
      return external(url, label);
    }).join(' · ')}.</p>
    <details class="attica-data-table"><summary>Accessible data table · exact durations</summary>${groups.map((group, groupIndex) => `<table class="matrix"><caption>${escape(chapter.groups[groupIndex])}</caption><thead><tr><th scope="col">Product / case</th><th scope="col">Activation → acquisition</th><th scope="col">Acquisition → product</th><th scope="col">Total from activation</th>${groupIndex === 0 ? '<th scope="col">Observation role</th>' : ''}</tr></thead><tbody>${chapter.rows.flatMap((row, index) => {
      if (row.group !== group) return [];
      const cells = chapter.tableRows[index];
      return `<tr><th scope="row">${escape(cells[0])}</th><td>${formatMinutes(row.activationToAcquisitionMin)}</td><td>${formatMinutes(row.acquisitionToProductMin)}</td><td>${formatMinutes(row.activationToAcquisitionMin + row.acquisitionToProductMin)}</td>${groupIndex === 0 ? `<td>${escape(cells[4])}</td>` : ''}</tr>`;
    }).join('')}</tbody></table>`).join('')}</details></figure>`;
}

const copy = (section, key) => `<div class="attica-copy" data-attica-copy="${key}"><h3>${escape(section.title)}</h3>${section.paragraphs.map(paragraph => `<p>${inline(paragraph)}</p>`).join('')}</div>`;

export function atticaHistoricalChapter() {
  return `${atticaHistory()}<div class="attica-timeline-chapter" data-evidence="historical">${copy({ ...chapter.introduction, title: chapter.title }, 'introduction')}${atticaChart()}${copy(chapter.interpretation, 'interpretation')}</div>`;
}

export function atticaEvidenceNotes() {
  const activation = 'https://mapping.emergency.copernicus.eu/activations/EMSR746/';
  return `<section><h3>${chapter.evidenceHeading}</h3>${chapter.evidence.map(note => {
    const text = note.replace(' Link the official activation and individual published maps already referenced in the historical chapter.', '')
      .replace(" Keep its underlying numbered references linked in the site's bibliography; do not present the report itself as the original public data source.", '');
    return `<p>${inline(text)}</p>`;
  }).join('')}<p>${external(activation, 'Official EMSR746 activation')} · ${external(atticaStory, 'Published maps and product chronology')}.</p></section>`;
}

export function enhanceAtticaTimeline(root) {
  root.addEventListener('keydown', event => {
    if (event.key === 'Escape' && event.target.matches('.attica-bar')) {
      event.target.closest('.attica-chart-row').dataset.dismissed = 'true';
      event.stopPropagation();
    }
  });
  for (const type of ['focusin', 'pointerover']) root.addEventListener(type, event => {
    const row = event.target.closest?.('.attica-chart-row');
    if (row && !row.contains(event.relatedTarget)) delete row.dataset.dismissed;
  });
}
