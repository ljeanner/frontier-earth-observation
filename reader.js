import { bookTitle, createBook, definitionList, definitions, renderContents, scenarioOptions, systems } from './book-content.js';
import { createExplorerPreview } from './explorer-preview.js';
import { legacyAnchors } from './manuscript-content.js';
import { createMissionInteractions } from './mission-interactions.js';
import { enhanceAtticaTimeline } from './attica-timeline.js';

const book = document.querySelector('#book');
enhanceAtticaTimeline(book);
const explorerPreview = createExplorerPreview(book);
const navigation = document.querySelector('#navigation');
const chapterTabs = document.querySelector('#chapter-tabs');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const bookmarkButton = document.querySelector('#bookmark');
const notice = document.querySelector('#storage-notice');
const stage = document.querySelector('.book-shell');
const definitionDialog = document.querySelector('#definition-dialog');
const aliases = legacyAnchors;
let mission;
let pages = [];
let chapters = [];
let currentIndex = 0;
let readingMark = null;
let initialNavigation = true;
let currentLeaf = 0;
let visibleLeaves = 2;
let layouts = new Map();
let totalLeaves = 0;
let definitionCall = null;
let resizeFrame = 0;
let paginationReady = false;
let touchStart = null;
const interactionState = { system: 0, scenario: null, glossary: '' };
const illustrationSizes = new Map();

function showNotice(message) {
  notice.textContent = message;
  notice.hidden = false;
}

function escape(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function leaf(page, offset) {
  const chapter = page.chapter ? `PART ${page.chapter} / SEQUENCE ${page.sectionNumber}` : 'EARTH OBSERVATION / WHITE PAPER';
  const layout = layouts.get(page.id);
  const exists = currentLeaf + offset < layout.count;
  const folio = exists && page.id !== 'cover' ? String(layout.start + currentLeaf + offset).padStart(2, '0') : '';
  return `<div class="leaf" aria-hidden="true"><div class="leaf-header"><span>${exists ? chapter : 'EARTH OBSERVATION'}</span><span>${page.type === 'chapter' ? 'COORDINATING EARTH OBSERVATION' : '2026'}</span></div><div class="leaf-footer"><span>THE WORLD CAN’T WAIT</span><span>${folio}</span></div></div>`;
}

function contentsBody(page) {
  const first = page.id === 'contents';
  const middle = Math.ceil(page.contents.length / 2);
  const continuation = pages.find(entry => entry.id === 'contents-continued');
  const left = `<span class="section-label">Contents / ${first ? 'I' : 'II'}</span><h2>${first ? 'Contents' : 'Contents<br><em>continued.</em>'}</h2>${renderContents(page.contents.slice(0, middle), pages)}`;
  const right = `<span class="section-label">${first ? 'Contents continued' : 'Case study & appendices'}</span>${renderContents(page.contents.slice(middle), pages)}${first ?
    `<a class="text-button" href="#contents-continued">Part III and supporting material <span aria-hidden="true">→</span></a>` :
    `<section class="toc-chapter"><h3>Supporting material</h3><ol class="toc-sections">${pages.filter(entry => entry.type === 'back').map(entry => `<li><a href="#${entry.id}" data-toc-section="${entry.id}"><span class="toc-section-number">${entry.label}</span><span>${entry.title}</span><span class="toc-section-folio">${String(entry.folio).padStart(2, '0')}</span></a></li>`).join('')}</ol></section><a class="text-button" href="#contents">Parts I–II <span aria-hidden="true">←</span></a>`}`;
  return { left, right };
}

function flowContent(page) {
  const body = page.contents ? contentsBody(page) : page;
  const opening = page.chapter ? `${page.opening ? `<div class="chapter-topline"><span>PART ${page.chapter}</span><span>${page.sectionNumber}</span></div><h2>${page.chapterTitle}</h2>` : ''}<span class="section-label">SEQUENCE ${page.sectionNumber}</span><h2>${escape(page.title)}</h2>` : '';
  if (page.id === 'cover') {
    return `<section class="cover-page cover-left">${body.left}</section><section class="cover-page cover-right">${body.right}</section>`;
  }
  const html = `${opening}${body.left}<div class="column-start"></div>${body.right}`;
  const template = document.createElement('template');
  template.innerHTML = html;
  for (const image of template.content.querySelectorAll('img')) {
    const size = illustrationSizes.get(image.getAttribute('src'));
    if (size) {
      image.width = size.width;
      image.height = size.height;
    }
    for (const table of template.content.querySelectorAll('.matrix')) {
      const headings = [...table.querySelectorAll('thead th')].map(heading => heading.textContent);
      for (const row of table.querySelectorAll('tbody tr')) {
        [...row.children].forEach((cell, index) => {
          if (headings[index]) cell.dataset.column = headings[index];
        });
      }
    }
  }
  for (const details of template.content.querySelectorAll('details.supporting-note')) details.open = true;
  applyInteractionState(template.content);
  mission?.renderInto(template.content);
  for (const details of template.content.querySelectorAll('details')) details.open = true;
  return template.innerHTML;
}

function renderContent(page) {
  return `<div class="spread ${page.className ?? ''}">${Array.from({ length: visibleLeaves }, (_, offset) => leaf(page, offset)).join('')}<div class="flow-window"><div class="page-flow">${flowContent(page)}</div></div></div>`;
}

function measureBook() {
  visibleLeaves = matchMedia('(max-width: 800px)').matches ? 1 : 2;
  const probe = document.createElement('div');
  probe.className = 'pagination-probe';
  probe.setAttribute('aria-hidden', 'true');
  book.append(probe);
  const nextLayouts = new Map();
  // Contents folios depend on pagination. Repeat until their own page counts settle.
  for (let pass = 0; pass < 4; pass++) {
    let start = 1;
    let changed = false;
    for (const page of pages) {
      probe.innerHTML = `<div class="spread ${page.className ?? ''}"><div class="flow-window"><div class="page-flow">${flowContent(page)}</div></div></div>`;
      const flow = probe.querySelector('.page-flow');
      const gap = parseFloat(getComputedStyle(flow).columnGap);
      const columnWidth = (parseFloat(getComputedStyle(flow).width) - gap * (visibleLeaves - 1)) / visibleLeaves;
      const count = Math.max(1, Math.round((flow.scrollWidth + gap) / (columnWidth + gap)));
      const padded = Math.ceil(count / visibleLeaves) * visibleLeaves;
      if (nextLayouts.get(page.id)?.count !== count || page.folio !== start) changed = true;
      nextLayouts.set(page.id, { count, start });
      page.folio = start;
      start += padded;
    }
    totalLeaves = start - 1;
    if (!changed) break;
  }
  probe.remove();
  layouts = nextLayouts;
}

function applyPagePosition(animate = false, direction = 1) {
  const page = pages[currentIndex];
  const layout = layouts.get(page.id);
  const flow = book.querySelector('.page-flow');
  const gap = parseFloat(getComputedStyle(flow).columnGap);
  const columnWidth = (parseFloat(getComputedStyle(flow).width) - gap * (visibleLeaves - 1)) / visibleLeaves;
  flow.parentElement.scrollLeft = 0;
  flow.parentElement.scrollTop = 0;
  flow.style.transform = `translateX(${-currentLeaf * (columnWidth + gap)}px)`;
  // Off-page links must not steal keyboard focus or scroll the column strip.
  const windowRect = book.querySelector('.flow-window').getBoundingClientRect();
  for (const element of flow.querySelectorAll('a, button, input, iframe, [tabindex]')) {
    const rect = element.getBoundingClientRect();
    const visible = rect.width > 0 && rect.right > windowRect.left + 1 && rect.left < windowRect.right - 1;
    if (!element.hasAttribute('data-original-tabindex')) element.dataset.originalTabindex = element.getAttribute('tabindex') ?? '';
    if (visible) {
      if (element.dataset.originalTabindex === '') element.removeAttribute('tabindex');
      else element.setAttribute('tabindex', element.dataset.originalTabindex);
    } else element.setAttribute('tabindex', '-1');
  }
  const end = Math.min(currentLeaf + visibleLeaves, layout.count);
  const folios = `${layout.start + currentLeaf}${end - currentLeaf > 1 ? `–${layout.start + end - 1}` : ''}`;
  document.querySelector('#position').textContent = `PAGE${end - currentLeaf > 1 ? 'S' : ''} ${folios} / ${totalLeaves}`;
  document.querySelector('#progress').style.width = `${((layout.start + end - 1) / totalLeaves) * 100}%`;
  previous.disabled = currentIndex === 0 && currentLeaf === 0;
  next.disabled = currentIndex === pages.length - 1 && end === layout.count;
  document.querySelector('#next-label').textContent = currentIndex === 0 && currentLeaf === 0 ? 'Open' : next.disabled ? 'End' : 'Next';
  book.querySelectorAll('.leaf').forEach((element, offset) => {
    element.querySelector('.leaf-footer span:last-child').textContent = currentLeaf + offset < layout.count && page.id !== 'cover' ? String(layout.start + currentLeaf + offset).padStart(2, '0') : '';
  });
  if (animate && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    book.querySelectorAll('.turning-sheet').forEach(sheet => sheet.remove());
    const sheet = document.createElement('div');
    sheet.className = `turning-sheet ${direction < 0 ? 'turn-back' : ''}`;
    sheet.setAttribute('aria-hidden', 'true');
    book.append(sheet);
    const animation = sheet.animate([
      { transform: 'rotateY(0deg)', opacity: 0.85 },
      { transform: `rotateY(${direction < 0 ? 75 : -75}deg)`, opacity: 0.65, offset: 0.65 },
      { transform: `rotateY(${direction < 0 ? 135 : -135}deg)`, opacity: 0 },
    ], { duration: 420, easing: 'cubic-bezier(.25,.65,.25,1)' });
    animation.addEventListener('finish', () => sheet.remove(), { once: true });
  }
  updateBookmark();
  book.dataset.location = pageAddress();
  explorerPreview.sync();
}

function refreshPagination() {
  const before = currentLeaf;
  measureBook();
  currentLeaf = Math.min(before, Math.floor((layouts.get(pages[currentIndex].id).count - 1) / visibleLeaves) * visibleLeaves);
  applyPagePosition();
}

function pageAddress(page = pages[currentIndex], offset = currentLeaf) {
  return offset ? `${page.id}~${offset + 1}` : page.id;
}

function turnPage(direction) {
  if (!pages.length || definitionDialog.open) return;
  const count = layouts.get(pages[currentIndex].id).count;
  const candidate = currentLeaf + direction * visibleLeaves;
  if (candidate >= 0 && candidate < count) {
    location.hash = pageAddress(pages[currentIndex], candidate);
  } else {
    const index = currentIndex + direction;
    if (index < 0 || index >= pages.length) return;
    const offset = direction < 0 ? Math.floor((layouts.get(pages[index].id).count - 1) / visibleLeaves) * visibleLeaves : 0;
    location.hash = pageAddress(pages[index], offset);
  }
}

function buildNavigation() {
  const page = pages[currentIndex];
  const front = pages.filter(entry => entry.type === 'front');
  const back = pages.filter(entry => entry.type === 'back');
  const simpleLink = entry => `<a class="nav-link" data-page="${entry.id}" href="#${entry.id}" ${entry.id === page.id ? 'aria-current="page"' : ''}><span class="nav-number">${entry.label}</span>${entry.title}</a>`;
  navigation.innerHTML = `<span class="nav-group">FRONT MATTER</span>${front.map(simpleLink).join('')}<span class="nav-group">PARTS</span>${chapters.map(chapter => {
    const active = page.chapter === chapter.number;
    return `<a class="nav-link ${active ? 'active-chapter' : ''}" data-page="${chapter.id}" data-chapter="${chapter.number}" href="#${chapter.id}" ${page.id === chapter.id ? 'aria-current="page"' : ''}><span class="nav-number">${chapter.number}</span>${chapter.title}</a>${active ? `<div class="nav-subsections">${chapter.sections.map(([id, title]) => `<a href="#${id}" data-page="${id}" ${id === page.id ? 'aria-current="location"' : ''}><span>${pages.find(page => page.id === id).sectionNumber}</span>${title}</a>`).join('')}</div>` : ''}`;
  }).join('')}<span class="nav-group">APPENDICES</span>${back.map(simpleLink).join('')}`;
  chapterTabs.innerHTML = chapters.map(chapter => `<a class="chapter-tab" href="#${chapter.id}" ${page.chapter === chapter.number ? 'aria-current="true"' : ''} aria-label="Part ${chapter.number}: ${chapter.title}" title="${chapter.title}">${chapter.number}</a>`).join('');
  const savedLink = document.querySelector('#saved-page');
  const markedPage = pages.find(entry => entry.id === readingMark?.split('~')[0]);
  savedLink.hidden = !markedPage;
  if (markedPage) {
    savedLink.href = `#${readingMark}`;
    savedLink.textContent = `Bookmark: ${markedPage.sectionNumber ?? markedPage.title}`;
  }
}

function updateBookmark() {
  const marked = readingMark === pageAddress();
  bookmarkButton.setAttribute('aria-pressed', String(marked));
  bookmarkButton.innerHTML = `${marked ? '◆' : '◇'} <span>${marked ? 'Bookmarked' : 'Bookmark'}</span>`;
  bookmarkButton.setAttribute('aria-label', marked ? 'Remove bookmark from this spread' : 'Bookmark this spread');
  navigation.querySelectorAll('[data-page]').forEach(link => link.classList.toggle('saved', link.dataset.page === readingMark?.split('~')[0]));
}

function renderPage() {
  let requested;
  try {
    requested = decodeURIComponent(location.hash.slice(1));
  } catch {
    requested = '';
    showNotice('This link is malformed. The cover is displayed instead.');
  }
  if (aliases[requested.split('~')[0]]) {
    requested = aliases[requested.split('~')[0]];
    history.replaceState(null, '', `#${requested}`);
  }
  const [sectionId, offset] = requested.split('~');
  const index = pages.findIndex(page => page.id === sectionId);
  const oldIndex = currentIndex;
  const oldLeaf = currentLeaf;
  currentIndex = index >= 0 ? index : 0;
  const page = pages[currentIndex];
  const count = layouts.get(page.id).count;
  const leafNumber = Number(offset ?? 1);
  currentLeaf = Number.isSafeInteger(leafNumber) && leafNumber > 0 ? Math.min(Math.floor((leafNumber - 1) / visibleLeaves) * visibleLeaves, Math.floor((count - 1) / visibleLeaves) * visibleLeaves) : 0;
  if (requested && requested !== 'book' && index < 0) showNotice('This section does not exist. The cover is displayed instead.');
  if (definitionDialog.open) definitionDialog.close();
  if (initialNavigation || oldIndex !== currentIndex || !book.querySelector('.page-flow')) {
    explorerPreview.stop();
    book.innerHTML = renderContent(page);
    restoreInteractions();
  }
  document.title = page.id === 'cover' ? bookTitle : `${page.title} | ${bookTitle}`;
  document.querySelector('#breadcrumb').textContent = page.chapter ? `${page.chapter} / ${page.sectionNumber} ${page.title}` : page.title;
  document.querySelector('#web-view').href = `./#${page.id}`;
  buildNavigation();
  applyPagePosition(!initialNavigation, currentIndex === oldIndex ? Math.sign(currentLeaf - oldLeaf) : Math.sign(currentIndex - oldIndex));
  book.querySelectorAll('img').forEach(image => {
    image.addEventListener('error', () => {
      const error = document.createElement('p');
      error.className = 'image-failure';
      error.setAttribute('role', 'alert');
      error.textContent = `Illustration unavailable: ${image.alt}`;
      image.replaceWith(error);
    }, { once: true });
  });
  if (!initialNavigation) {
    book.focus({ preventScroll: true });
  }
  initialNavigation = false;
  document.querySelector('#announcement').textContent = `${page.chapter ? `Section ${page.sectionNumber}: ` : ''}${page.title}. ${document.querySelector('#position').textContent}`;
}

definitionDialog.addEventListener('close', () => {
  if (definitionCall?.isConnected) {
    definitionCall.setAttribute('aria-expanded', 'false');
    definitionCall.focus({ preventScroll: true });
  }
});
document.querySelector('#close-definition').addEventListener('click', () => definitionDialog.close());

book.addEventListener('click', event => {
  if (!(event.target instanceof Element)) return;
  const system = event.target.closest('[data-system]');
  if (system) {
    interactionState.system = Number(system.dataset.system);
    const detail = systems[Number(system.dataset.system)];
    book.querySelectorAll('[data-system]').forEach(button => button.setAttribute('aria-pressed', String(button === system)));
    document.querySelector('#system-detail').innerHTML = `<h3>${detail[0]}</h3><p>${detail[2]}</p>`;
    refreshPagination();
  }
  const scenario = event.target.closest('[data-scenario]');
  if (scenario) {
    interactionState.scenario = scenario.dataset.scenario;
    const detail = scenarioOptions.find(([id]) => id === scenario.dataset.scenario);
    book.querySelectorAll('[data-scenario]').forEach(button => button.setAttribute('aria-pressed', String(button === scenario)));
    document.querySelector('#scenario-result').innerHTML = `<span class="eyebrow">CONDITIONS & APPROVAL BOUNDARY</span><p>${detail[3]}</p>`;
    refreshPagination();
  }
  const definition = event.target.closest('[data-definition]');
  if (definition) {
    const panel = document.getElementById(definition.getAttribute('aria-controls'));
    definitionCall = definition;
    definition.setAttribute('aria-expanded', 'true');
    const content = document.querySelector('#definition-content');
    content.replaceChildren(...[...panel.children].filter(child => !child.matches('button')).map(child => child.cloneNode(true)));
    content.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
    definitionDialog.showModal();
    document.querySelector('#close-definition').focus();
  }
});

function normalise(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('en');
}

book.addEventListener('input', event => {
  if (!(event.target instanceof HTMLInputElement) || event.target.id !== 'definition-search') return;
  const query = normalise(event.target.value.trim());
  interactionState.glossary = event.target.value;
  const results = query ? definitions.filter(entry => normalise(entry.join(' ')).includes(query)) : definitions;
  document.querySelector('#definition-results').innerHTML = definitionList(results);
  document.querySelector('#definition-count').textContent = query ? `${results.length} ${results.length === 1 ? 'definition' : 'definitions'} found.` : `All ${definitions.length} terms.`;
  refreshPagination();
});

bookmarkButton.addEventListener('click', () => {
  if (!pages.length) return;
  const nextMark = readingMark === pageAddress() ? null : pageAddress();
  try {
    if (nextMark) localStorage.setItem('frontier-notebook-mark', nextMark);
    else localStorage.removeItem('frontier-notebook-mark');
    readingMark = nextMark;
    buildNavigation();
    updateBookmark();
  } catch {
    showNotice('The bookmark could not be saved. Local browser storage is unavailable.');
  }
});

document.querySelector('#contents-button').addEventListener('click', () => { location.hash = 'contents'; });
document.querySelector('#print-button').addEventListener('click', () => window.print());
document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault();
  book.focus();
});
previous.addEventListener('click', () => turnPage(-1));
next.addEventListener('click', () => turnPage(1));
book.addEventListener('touchstart', event => {
  if (event.touches.length !== 1 || event.target.closest('button, a, input, .detail-panel, .scenario-result')) {
    touchStart = null;
    return;
  }
  touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
}, { passive: true });
book.addEventListener('touchend', event => {
  if (!touchStart || !event.changedTouches.length) return;
  const dx = event.changedTouches[0].clientX - touchStart.x;
  const dy = event.changedTouches[0].clientY - touchStart.y;
  touchStart = null;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) turnPage(dx < 0 ? 1 : -1);
}, { passive: true });
document.addEventListener('keydown', event => {
  if (!pages.length || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (definitionDialog.open) return;
  if (event.target instanceof Element && event.target.closest('input, textarea, select, button, .mission-widget, [contenteditable="true"], [role="slider"]')) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    turnPage(event.key === 'ArrowRight' ? 1 : -1);
  }
});

function applyInteractionState(root) {
  const detail = systems[interactionState.system];
  root.querySelectorAll('[data-system]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.system) === interactionState.system)));
  const system = root.querySelector('#system-detail');
  if (system) system.innerHTML = `<h3>${detail[0]}</h3><p>${detail[2]}</p>`;
  const choice = scenarioOptions.find(([id]) => id === interactionState.scenario);
  if (choice) {
    root.querySelectorAll('[data-scenario]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.scenario === interactionState.scenario)));
    const result = root.querySelector('#scenario-result');
    if (result) result.innerHTML = `<span class="eyebrow">CONDITIONS & APPROVAL BOUNDARY</span><p>${choice[3]}</p>`;
  }
  const search = root.querySelector('#definition-search');
  if (search) {
    search.value = interactionState.glossary;
    const query = normalise(interactionState.glossary.trim());
    const results = query ? definitions.filter(entry => normalise(entry.join(' ')).includes(query)) : definitions;
    root.querySelector('#definition-results').innerHTML = definitionList(results);
    root.querySelector('#definition-count').textContent = query ? `${results.length} ${results.length === 1 ? 'definition' : 'definitions'} found.` : `All ${definitions.length} terms.`;
  }
}

function restoreInteractions() {
  applyInteractionState(book);
}

new ResizeObserver(() => {
  if (!paginationReady || resizeFrame) return;
  resizeFrame = requestAnimationFrame(() => {
    resizeFrame = 0;
    if (matchMedia('print').matches) return;
    explorerPreview.stop();
    measureBook();
    currentLeaf = Math.min(Math.floor(currentLeaf / visibleLeaves) * visibleLeaves, Math.floor((layouts.get(pages[currentIndex].id).count - 1) / visibleLeaves) * visibleLeaves);
    book.innerHTML = renderContent(pages[currentIndex]);
    restoreInteractions();
    applyPagePosition();
    if (location.hash.slice(1).includes('~')) history.replaceState(null, '', `#${pageAddress()}`);
    if (definitionDialog.open && definitionCall) {
      definitionCall = book.querySelector(`[data-definition="${definitionCall.dataset.definition}"]`);
      definitionCall?.setAttribute('aria-expanded', 'true');
    }
  });
}).observe(stage);

async function initialize() {
  try {
    const response = await fetch('./data/meridian.json');
    if (!response.ok) throw new Error(`Dataset request failed (${response.status})`);
    const data = await response.json();
    if (data.fleet.satellites !== data.fleet.radar + data.fleet.optical ||
        data.groundStations.count !== data.groundStations.items.length) {
      throw new Error('The shared mission dataset is inconsistent');
    }
    ({ pages, chapters } = createBook(data));
    mission = createMissionInteractions(book, data, { onChange: refreshPagination });
    const romanFolios = { 'title-page': 'ii', abstract: 'iv', contents: 'vi', 'contents-continued': 'viii' };
    pages.forEach(page => { if (romanFolios[page.id]) page.rightFolio = romanFolios[page.id]; });
  } catch (error) {
    console.error('Unable to load the white paper:', error);
    showNotice('The white paper could not be loaded. Check the shared dataset and reload the page.');
    book.innerHTML = `<div class="load-error"><h1>White paper unavailable</h1><p>${escape(error.message)}</p><p>No substitute fleet or scenario data has been used.</p></div>`;
    previous.disabled = true;
    next.disabled = true;
    bookmarkButton.disabled = true;
    return;
  }
  try {
    const saved = localStorage.getItem('frontier-notebook-mark');
    const canonical = aliases[saved?.split('~')[0]] ?? saved;
    readingMark = pages.some(page => page.id === canonical?.split('~')[0]) ? canonical : null;
  } catch {
    showNotice('Local storage is unavailable. A bookmark cannot be preserved after closing this browser.');
  }
  window.addEventListener('hashchange', renderPage);
  await document.fonts.ready;
  const illustrations = document.createElement('template');
  illustrations.innerHTML = pages.map(page => `${page.left ?? ''}${page.right ?? ''}`).join('');
  const sources = [...new Set([...illustrations.content.querySelectorAll('img')].map(image => image.getAttribute('src')))];
  const missing = await Promise.all(sources.map(async src => {
    const image = new Image();
    image.src = src;
    try {
      await image.decode();
      illustrationSizes.set(src, { width: image.naturalWidth, height: image.naturalHeight });
    }
    catch (error) {
      console.error(`Unable to load illustration ${src}:`, error);
      return src;
    }
  }));
  if (missing.some(Boolean)) showNotice('Some illustrations could not be loaded. Their reading pages will identify the missing images.');
  measureBook();
  renderPage();
  paginationReady = true;
}

await initialize();
