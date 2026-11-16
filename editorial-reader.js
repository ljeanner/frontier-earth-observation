import { bookTitle, publication, definitions, definitionList, systems, scenarioOptions } from './book-content.js';
import { createEditorialContent } from './editorial-content.js';
import { assetBriefs } from './editorial-assets.js';
import { createExplorerPreview } from './explorer-preview.js';
import { legacyAnchors } from './manuscript-content.js';
import { createMissionInteractions } from './mission-interactions.js';
import { enhanceProcessIllustrations } from './process-illustrations.js';

const root = document.querySelector('#reading-content');
const notice = document.querySelector('#storage-notice');
const drawer = document.querySelector('#contents-drawer');
const navigation = document.querySelector('#navigation');
const bookmark = document.querySelector('#bookmark');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const mobileActions = matchMedia('(max-width: 620px)');
const explorer = createExplorerPreview(root, { editorial: true });
const aliases = { ...legacyAnchors, 'contents-continued': 'contents' };
let model;
let mission;
let activeId = 'cover';
let saved = null;
let scrollFrame = 0;
let positionStorageAvailable = true;
let restoredId = null;
const positionKey = 'earth-observation-position';
const dialogOrigins = new WeakMap();
const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const canonical = value => aliases[value.split('~')[0]] ?? value.split('~')[0];

function showNotice(message) {
  notice.textContent = message;
  notice.hidden = false;
}

function fragment(html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content;
}

function enhanceImages(container, eager = false) {
  for (const image of container.querySelectorAll('img')) {
    image.loading = eager ? 'eager' : 'lazy';
    image.decoding = 'async';
    const brief = assetBriefs.find(entry => image.getAttribute('src')?.endsWith(entry.file));
    if (brief) {
      const [width, height] = brief.aspectRatio.split(':').map(Number);
      image.width = width;
      image.height = height;
      image.dataset.assetKind = brief.kind;
    }
    image.addEventListener('error', () => {
      const error = document.createElement('p');
      error.className = 'image-failure notice';
      error.setAttribute('role', 'alert');
      error.textContent = `Illustration unavailable: ${image.alt}. See the image credits for its source.`;
      const control = image.closest('button[data-inspect]');
      if (control) control.replaceWith(error);
      else image.replaceWith(error);
    }, { once: true });
    if (image.classList.contains('explorer-poster')) continue;
    const link = image.closest('a');
    if (link) {
      link.dataset.inspect = '';
      link.setAttribute('aria-haspopup', 'dialog');
    } else {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'inspect-button';
      button.dataset.inspect = '';
      button.setAttribute('aria-label', `Inspect illustration: ${image.alt}`);
      button.setAttribute('aria-haspopup', 'dialog');
      image.replaceWith(button);
      button.append(image);
    }
  }
}

function enhanceDiagrams(container) {
  const boards = [...container.querySelectorAll('.si-diagram')];
  const gateway = container.querySelector('.gateway');
  if (gateway && !gateway.closest('.si-diagram')) {
    const board = document.createElement('figure');
    board.className = 'si-diagram';
    const first = container.querySelector('.domain');
    const last = container.querySelector('.system-detail');
    first.before(board);
    let node = first;
    while (node) {
      const next = node.nextSibling;
      board.append(node);
      if (node === last) break;
      node = next;
    }
    boards.push(board);
  }
  for (const board of boards) {
    const shell = document.createElement('div');
    shell.className = 'diagram-shell';
    shell.innerHTML = `<div class="diagram-controls"><label>Diagram scale <input type="range" min="100" max="180" value="100" step="10" data-diagram-scale aria-label="Diagram scale"></label><button type="button" data-diagram-reset>Reset</button><button type="button" data-diagram-layer>Highlight next responsibility</button><button type="button" data-diagram-pan="-1" aria-label="Pan diagram left">←</button><button type="button" data-diagram-pan="1" aria-label="Pan diagram right">→</button></div><div class="diagram-viewport" tabindex="0" role="region" aria-label="Scrollable architecture diagram. Use arrow keys to pan."></div>`;
    board.replaceWith(shell);
    board.classList.add('diagram-board');
    const viewport = shell.querySelector('.diagram-viewport');
    viewport.append(board);
    // A concrete baseline width keeps zoom from simply reflowing to fit.
    new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) board.style.width = `${entry.contentRect.width}px`;
    }).observe(viewport);
  }
}

function enhanceComparisons(container) {
  for (const plate of container.querySelectorAll('.comparison-plate')) {
    const controls = document.createElement('label');
    controls.className = 'cloud-control';
    controls.innerHTML = 'Simulated cloud opacity <input type="range" min="0" max="100" value="100" data-cloud-control aria-label="Simulated cloud opacity"><output>100%</output>';
    plate.querySelector('.observation-pair').after(controls);
  }
  const slot = container.querySelector('.explorer-slot');
  if (slot) {
    const actions = document.createElement('div');
    actions.className = 'explorer-actions';
    actions.innerHTML = '<button type="button" data-explorer-fullscreen>Enter fullscreen</button>';
    slot.after(actions);
    actions.append(container.querySelector('.explorer-open'));
  }
}

function renderSection(section) {
  if (section.id === 'cover') {
    const source = fragment(section.left + section.right);
    const hero = document.createElement('section');
    hero.id = 'cover';
    hero.className = 'hero';
    hero.tabIndex = -1;
    hero.setAttribute('aria-labelledby', 'hero-title');
    const paragraph = source.querySelector('p');
    const image = source.querySelector('img');
    hero.innerHTML = `<div class="hero-copy"><span class="eyebrow">${escape(publication.eyebrow)}</span><h1 id="hero-title">${escape(publication.title)}<em>${escape(publication.subtitle)}</em></h1><p class="publication-byline">${escape(publication.author)}</p><a class="begin-reading" href="#part-1">Begin reading <span aria-hidden="true">→</span></a></div><div class="hero-art"></div>`;
    hero.querySelector('.publication-byline').before(paragraph);
    hero.querySelector('.hero-art').append(image);
    enhanceImages(hero, true);
    return hero;
  }
  const article = document.createElement('section');
  article.id = section.id;
  article.className = `sequence template-${section.template}`;
  article.dataset.template = section.template;
  article.dataset.sequence = section.sequenceNumber ?? '';
  article.tabIndex = -1;
  const page = model.readingPages[section.part];
  const isPartBody = page?.sectionIds.length === 1 && page.title === section.title;
  article.setAttribute('aria-labelledby', `heading-${isPartBody ? page.id : section.id}`);
  const kicker = page ? '' : '<span class="sequence-kicker">REFERENCE MATERIAL</span>';
  const headingLevel = page ? 'h3' : 'h2';
  const header = isPartBody ? '' : `<header class="sequence-header">${kicker}<${headingLevel} class="sequence-heading" id="heading-${section.id}">${escape(section.title)}</${headingLevel}></header>`;
  article.innerHTML = `${header}<div class="sequence-body"><div class="sequence-prose"></div></div>`;
  const prose = article.querySelector('.sequence-prose');
  prose.append(fragment(section.left + section.right));
  if (isPartBody) {
    for (const details of [...prose.querySelectorAll(':scope>details.supporting-note')]) {
      const subsection = document.createElement('section');
      subsection.className = 'technical-subsection';
      const heading = document.createElement('h3');
      heading.className = 'technical-heading';
      heading.textContent = details.querySelector('summary').textContent;
      const copy = document.createElement('div');
      copy.className = 'technical-copy';
      copy.append(...details.querySelector(':scope>div').childNodes);
      let visual = [...copy.querySelectorAll('figure')].find(figure => figure.querySelector('img') && !figure.matches('.si-diagram'));
      if (!visual && copy.querySelector('.agent-card')) {
        visual = document.createElement('figure');
        visual.innerHTML = '<img src="./art/mission-review-reading.webp" alt="Graphite hand and pencil reviewing a fictional mission plan."><figcaption>Conceptual human review of a mission plan. Safety-critical validation and command authorization remain outside the language model.</figcaption>';
      }
      if (visual) {
        visual.classList.add('technical-art');
        copy.prepend(visual);
      }
      subsection.append(heading, copy);
      details.replaceWith(subsection);
    }
  }
  for (const heading of [...prose.querySelectorAll('h2,h3')]) {
    if (heading.classList.contains('technical-heading')) continue;
    const level = heading.tagName === 'H2' ? (page ? 'h4' : 'h3') : (page ? 'h5' : 'h4');
    const replacement = document.createElement(level);
    replacement.className = 'prose-heading';
    replacement.innerHTML = heading.innerHTML;
    heading.replaceWith(replacement);
  }
  for (const table of prose.querySelectorAll('table')) {
    const scroll = document.createElement('div');
    scroll.className = 'table-scroll';
    scroll.tabIndex = 0;
    scroll.setAttribute('role', 'region');
    scroll.setAttribute('aria-label', 'Scrollable reference table');
    table.replaceWith(scroll);
    scroll.append(table);
  }
  const company = prose.querySelector(':scope>.meridian-company-plate');
  if (company) prose.before(company);
  if (section.template === 'split-screen') {
    const visual = prose.querySelector(':scope>figure:not(.si-diagram)');
    if (visual) {
      const composition = document.createElement('div');
      composition.className = 'split-composition';
      const aside = document.createElement('div');
      aside.className = 'split-visual';
      prose.before(composition);
      composition.append(aside, prose);
      aside.append(visual);
      const portrait = prose.querySelector('.meridian-portrait');
      if (portrait) composition.after(portrait);
    }
  }
  for (const plate of [...prose.querySelectorAll('.process-plate,.comparison-plate,.sensor-plate')]) {
    plate.classList.add('wide-block');
    if (section.id !== 'sensors-and-customers') article.querySelector('.sequence-body').append(plate);
  }
  if (section.id === 'glossary') {
    prose.querySelector('#definition-results').innerHTML = definitionList(definitions);
    prose.querySelector('#definition-count').textContent = `Showing all ${definitions.length} terms.`;
  }
  if (section.id === 'accelerator') {
    const print = document.createElement('div');
    print.className = 'print-only';
    const entries = section.id === 'accelerator' ? systems.map(([title, , description]) => [title, description]) : scenarioOptions.map(([, title, , outcome]) => [title, outcome]);
    print.innerHTML = entries.map(([title, description]) => `<h4>${escape(title)}</h4><p>${escape(description)}</p>`).join('');
    prose.append(print);
  }
  const wideElements = section.template === 'split-screen'
    ? [...prose.children].filter(element => element.matches('.mission-widget,.si-diagram,.customer-uses,.business-choices,.process-list,.supporting-links'))
    : [];
  if (wideElements.length) {
    const body = article.querySelector('.sequence-body');
    body.append(...wideElements);
    body.append(...prose.querySelectorAll(':scope>.support-link,:scope>.note-foot'));
  }
  enhanceProcessIllustrations(article);
  enhanceImages(article);
  enhanceDiagrams(article);
  enhanceComparisons(article);
  return article;
}

function renderReadingPages() {
  const sections = new Map(model.sections.map(section => [section.id, renderSection(section)]));
  const parts = model.readingPages.map(page => {
    const article = document.createElement('section');
    article.id = page.id;
    article.className = 'part-page';
    article.tabIndex = -1;
    article.setAttribute('aria-labelledby', `heading-${page.id}`);
    article.innerHTML = `<header class="reading-part-header"><span class="eyebrow">PART ${String(page.number).padStart(2, '0')}</span><h2 class="part-title" id="heading-${page.id}">${escape(page.title)}</h2></header>`;
    article.append(...page.sectionIds.map(id => sections.get(id)));
    return article;
  });
  const contents = document.createElement('nav');
  contents.id = 'part-navigation';
  contents.className = 'part-switcher';
  contents.setAttribute('aria-label', 'Reading parts');
  contents.innerHTML = model.readingPages.map(part => `<a href="#${part.id}" data-part-page="${part.id}">${String(part.number).padStart(2, '0')} · ${escape(part.title)}</a>`).join('');
  root.replaceChildren(sections.get('cover'), contents, ...parts,
    ...model.sections.filter(section => section.part < 0 && section.id !== 'cover').map(section => sections.get(section.id)));
  root.dataset.layout = 'continuous';
}

function sectionFor(id) {
  const page = model.readingPages.find(page => page.id === id);
  return model.sections.find(section => section.id === (page ? page.sectionIds[0] : id));
}

function buildNavigation() {
  document.querySelector('#contents-summary').textContent = `${model.readingPages.length} parts, with subsections, glossary, sources and image credits.`;
  const link = section => `<a href="#${section.id}" data-page="${section.id}">${escape(section.title)}</a>`;
  navigation.innerHTML = link(model.sections[0]) + model.sections.filter(section => section.type === 'front' && section.id !== 'cover').map(link).join('') +
    model.readingPages.map(page => `<section class="contents-part"><h3><a href="#${page.id}" data-part-page="${page.id}">Part ${page.number} — ${escape(page.title)}</a></h3>${page.sectionIds.filter(id => page.sectionIds.length > 1 || sectionFor(id).title !== page.title).map(id => link(sectionFor(id))).join('')}</section>`).join('') +
    '<h3>APPENDICES</h3>' + model.sections.filter(section => section.type === 'back' && section.part < 0).map(link).join('');
}

function updateBookmark() {
  const isSaved = saved === activeId;
  bookmark.setAttribute('aria-pressed', String(isSaved));
  bookmark.textContent = isSaved ? 'Bookmarked' : 'Bookmark';
  bookmark.setAttribute('aria-label', isSaved ? 'Remove this bookmark' : 'Bookmark this location');
  const link = document.querySelector('#saved-page');
  link.hidden = !saved;
  if (saved) {
    link.href = `#${saved}`;
    link.textContent = 'Return to bookmark';
  }
  for (const item of navigation.querySelectorAll('[data-page]')) item.dataset.saved = String(item.dataset.page === saved);
}

function setActive(id, updateAddress = true) {
  const section = model.sections.find(entry => entry.id === id);
  if (!section) return;
  const page = model.readingPages[section.part];
  const changed = activeId !== id;
  activeId = id;
  root.dataset.location = id;
  root.dataset.page = page?.id ?? id;
  document.querySelector('#position').textContent = page ? `PART ${page.number} / ${model.readingPages.length}` : section.title.toUpperCase();
  document.querySelector('#current-title').textContent = section.title;
  const distance = document.documentElement.scrollHeight - innerHeight;
  document.querySelector('#progress').style.width = `${distance > 0 ? Math.min(100, Math.max(0, scrollY / distance * 100)) : 0}%`;
  document.querySelector('#book-view').href = `./book.html#${id}`;
  document.title = id === 'cover' ? bookTitle : `${page ? `Part ${page.number} — ${page.title}` : section.title} | ${bookTitle}`;
  for (const item of navigation.querySelectorAll('[data-page]')) {
    if (item.dataset.page === id) item.setAttribute('aria-current', 'location');
    else item.removeAttribute('aria-current');
  }
  for (const link of document.querySelectorAll('[data-part-page]')) {
    if (link.dataset.partPage === page?.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  updateBookmark();
  if (changed && positionStorageAvailable) {
    try { localStorage.setItem(positionKey, id); }
    catch {
      positionStorageAvailable = false;
      showNotice('Reading position could not be saved. Local browser storage is unavailable.');
    }
  }
  const atPartStart = page?.sectionIds[0] === id && location.hash === `#${page.id}`;
  if (updateAddress && !atPartStart && location.hash !== `#${id}`) history.replaceState(null, '', `#${id}`);
}

function openDialog(dialog, origin) {
  dialogOrigins.set(dialog, origin);
  if (origin?.hasAttribute('aria-haspopup')) origin.setAttribute('aria-expanded', 'true');
  dialog.showModal();
  dialog.querySelector('[data-close-dialog]')?.focus();
}

function goTo(id, { focus = true } = {}) {
  const section = sectionFor(id);
  if (!section) return;
  const page = model.readingPages[section.part];
  const target = document.getElementById(page?.sectionIds.length === 1 && page.title === section.title ? page.id : id);
  if (!target) return;
  if (id === 'cover') window.scrollTo({ top: 0, behavior: 'instant' });
  else target.scrollIntoView({ behavior: 'instant', block: 'start' });
  setActive(section.id, false);
  if (focus) target.focus({ preventScroll: true });
  document.querySelector('#announcement').textContent = section.title;
  explorer.sync();
}

function readAddress(focus = false) {
  let id;
  try { id = canonical(decodeURIComponent(location.hash.slice(1)) || 'cover'); }
  catch {
    showNotice('This link is malformed. The cover is displayed instead.');
    id = 'cover';
  }
  if (id === 'contents') {
    history.replaceState(null, '', `#${activeId}`);
    if (!drawer.open) openDialog(drawer, document.querySelector('#contents-button'));
    return;
  }
  if (!sectionFor(id)) {
    showNotice('This reading location does not exist. The cover is displayed instead.');
    id = 'cover';
  }
  if (location.hash !== `#${id}`) history.replaceState(null, '', `#${id}`);
  goTo(id, { focus });
}

function onScroll() {
  if (!model || scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0;
    if (preparingPrint || document.querySelector('dialog[open]')) return;
    if (location.hash && sectionFor(canonical(location.hash.slice(1)))?.id !== activeId) return;
    const threshold = document.querySelector('.editorial-header').getBoundingClientRect().bottom + Math.min(130, innerHeight * .15);
    const elements = [...root.querySelectorAll('.hero,.reading-part-header,.sequence')];
    let current = 'cover';
    for (const element of elements) {
      if (element.getBoundingClientRect().top <= threshold)
        current = element.matches('.reading-part-header') ? sectionFor(element.parentElement.id).id : element.id;
    }
    setActive(current);
    for (const process of root.querySelectorAll('.process-map,.process-list')) {
      if (process.closest('.process-illustrated')) continue;
      if (!process.getClientRects().length) continue;
      const steps = [...process.children];
      let chosen;
      if (process.classList.contains('process-map')) {
        const rect = process.getBoundingClientRect();
        const start = Math.max(0, scrollY + rect.top - innerHeight * .8);
        const end = Math.min(document.documentElement.scrollHeight - innerHeight, scrollY + rect.bottom - threshold);
        const progress = (scrollY - start) / Math.max(1, end - start);
        chosen = steps[Math.max(0, Math.min(steps.length - 1, Math.floor(progress * steps.length)))];
      } else chosen = steps.find(step => step.getBoundingClientRect().bottom >= threshold) ?? steps.at(-1);
      for (const step of steps) step.classList.toggle('is-current', step === chosen);
    }
    explorer.sync();
  });
}

document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('[data-close-dialog]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    if (dialog === drawer) document.querySelector('#contents-button').setAttribute('aria-expanded', 'false');
    const origin = dialogOrigins.get(dialog);
    if (origin?.isConnected) {
      origin.setAttribute('aria-expanded', 'false');
      origin.focus({ preventScroll: true });
    }
  });
});

document.querySelector('#contents-button').addEventListener('click', event => openDialog(drawer, event.currentTarget));
bookmark.addEventListener('click', () => {
  const next = saved === activeId ? null : activeId;
  try {
    if (next) localStorage.setItem('frontier-notebook-mark', next);
    else localStorage.removeItem('frontier-notebook-mark');
    saved = next;
    updateBookmark();
  } catch { showNotice('The bookmark could not be saved. Local browser storage is unavailable.'); }
});
document.querySelector('#print-button').addEventListener('click', async () => {
  const images = [...root.querySelectorAll('img')];
  images.forEach(image => { image.loading = 'eager'; });
  const results = await Promise.allSettled(images.map(image => image.decode()));
  if (results.some(result => result.status === 'rejected')) showNotice('Some illustrations could not be prepared for print. Their source links and missing-image notices remain in the document.');
  window.print();
});

document.addEventListener('click', async event => {
  if (!(event.target instanceof Element)) return;
  const definition = event.target.closest('[data-definition]');
  if (definition) {
    const entry = definitions.find(([name]) => name === definition.dataset.definition);
    document.querySelector('#definition-title').textContent = entry[0];
    document.querySelector('#definition-content').innerHTML = `<p>${escape(entry[1])}</p>`;
    definition.setAttribute('aria-expanded', 'true');
    openDialog(document.querySelector('#definition-dialog'), definition);
    return;
  }
  const inspect = event.target.closest('[data-inspect]');
  if (inspect) {
    event.preventDefault();
    const image = inspect.querySelector('img');
    if (!image) return;
    const original = inspect.getAttribute('href');
    const display = document.querySelector('#inspected-image');
    display.src = original ?? image.src;
    display.alt = image.alt;
    display.style.width = '100%';
    document.querySelector('#image-dialog [data-image-scale]').value = '100';
    document.querySelector('#image-caption').textContent = inspect.closest('figure')?.querySelector('figcaption')?.textContent ?? image.alt;
    document.querySelector('#image-original').href = original ?? image.src;
    document.querySelector('#image-original').textContent = original ? 'Open original image' : 'Open image file';
    openDialog(document.querySelector('#image-dialog'), inspect);
    return;
  }
  const full = event.target.closest('[data-explorer-fullscreen]');
  if (full) {
    const slot = full.closest('.explorer-plate').querySelector('.explorer-slot');
    try {
      if (!slot.requestFullscreen) throw new Error('Fullscreen is not supported in this browser.');
      await slot.requestFullscreen();
      explorer.sync();
    } catch (error) { showNotice(`Unable to open fullscreen: ${error.message} Use the full Explorer link instead.`); }
    return;
  }
  const system = event.target.closest('[data-system]');
  if (system) {
    const detail = systems[Number(system.dataset.system)];
    root.querySelectorAll('[data-system]').forEach(button => button.setAttribute('aria-pressed', String(button === system)));
    root.querySelector('#system-detail').innerHTML = `<h4>${escape(detail[0])}</h4><p>${escape(detail[2])}</p>`;
    return;
  }
  const choice = event.target.closest('[data-scenario]');
  if (choice) {
    const detail = scenarioOptions.find(([id]) => id === choice.dataset.scenario);
    root.querySelectorAll('[data-scenario]').forEach(button => button.setAttribute('aria-pressed', String(button === choice)));
    root.querySelector('#scenario-result').innerHTML = `<span class="eyebrow">CONDITIONS &amp; APPROVAL BOUNDARY</span><p>${escape(detail[3])}</p>`;
    return;
  }
  const reset = event.target.closest('[data-diagram-reset]');
  const layer = event.target.closest('[data-diagram-layer]');
  const pan = event.target.closest('[data-diagram-pan]');
  if (pan) {
    const viewport = pan.closest('.diagram-shell').querySelector('.diagram-viewport');
    viewport.scrollBy({ left: Number(pan.dataset.diagramPan) * viewport.clientWidth * .75, behavior: 'instant' });
    return;
  }
  if (reset || layer) {
    const shell = (reset ?? layer).closest('.diagram-shell');
    const board = shell.querySelector('.diagram-board');
    if (reset) {
      shell.querySelector('input').value = '100';
      board.style.setProperty('--diagram-scale', 1);
      shell.querySelector('.diagram-viewport').scrollTo({ left: 0, top: 0, behavior: 'instant' });
      board.querySelectorAll('.is-highlighted').forEach(node => node.classList.remove('is-highlighted'));
      shell.dataset.layer = '-1';
    } else {
      const nodes = [...board.querySelectorAll('.si-entry,.domain,.si-boundary,.si-flow li,.gateway')];
      if (nodes.length) {
        const index = (Number(shell.dataset.layer ?? -1) + 1) % nodes.length;
        nodes.forEach((node, offset) => node.classList.toggle('is-highlighted', offset === index));
        shell.dataset.layer = String(index);
        document.querySelector('#announcement').textContent = nodes[index].textContent;
      }
    }
    return;
  }
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const id = canonical(link.hash.slice(1));
  if (id === 'contents') {
    if (!drawer.open) openDialog(drawer, link);
    return;
  }
  if (drawer.open) {
    dialogOrigins.delete(drawer);
    drawer.close();
  }
  if (id === 'reading-content') {
    root.focus();
    return;
  }
  if (sectionFor(id)) {
    history.pushState(null, '', `#${id}`);
    goTo(id);
  }
});

root.addEventListener('input', event => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) return;
  if (input.hasAttribute('data-cloud-control')) {
    input.closest('.comparison-plate').style.setProperty('--cloud-opacity', Number(input.value) / 100);
    input.closest('.cloud-control').querySelector('output').textContent = `${input.value}%`;
  }
  if (input.hasAttribute('data-diagram-scale')) input.closest('.diagram-shell').querySelector('.diagram-board').style.setProperty('--diagram-scale', Number(input.value) / 100);
  if (input.id === 'definition-search') {
    const query = input.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    const matches = definitions.filter(entry => entry.join(' ').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(query));
    root.querySelector('#definition-results').innerHTML = definitionList(matches);
    root.querySelector('#definition-count').textContent = `${matches.length} ${matches.length === 1 ? 'definition' : 'definitions'} found.`;
  }
});

document.addEventListener('keydown', event => {
  if (!model || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || document.querySelector('dialog[open]')) return;
  if (event.target instanceof Element && event.target.closest('input,textarea,select,button,.diagram-viewport,.mission-widget,[contenteditable="true"]')) return;
  if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  const sections = [...root.querySelectorAll('.hero,.sequence')];
  const index = sections.findIndex(section => section.id === activeId) + (event.key === 'ArrowRight' ? 1 : -1);
  const next = sections[index];
  if (next) {
    event.preventDefault();
    history.pushState(null, '', `#${next.id}`);
    goTo(next.id);
  }
});

function syncActionMenu() {
  document.querySelector('#reader-actions').open = !mobileActions.matches;
}
mobileActions.addEventListener('change', syncActionMenu);
syncActionMenu();

const imageZoom = document.createElement('label');
imageZoom.className = 'image-zoom';
imageZoom.innerHTML = 'Image scale <input type="range" min="100" max="250" value="100" step="25" data-image-scale aria-label="Image scale">';
document.querySelector('.image-viewport').before(imageZoom);
imageZoom.querySelector('input').addEventListener('input', event => {
  document.querySelector('#inspected-image').style.width = `${event.target.value}%`;
});
document.querySelector('#inspected-image').addEventListener('error', () => {
  document.querySelector('#image-caption').textContent = 'The enlarged image could not be loaded. Use the image-file link below.';
});

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
window.addEventListener('hashchange', () => readAddress(true));
document.addEventListener('fullscreenchange', () => requestAnimationFrame(() => explorer.sync()));
let printDetails = [];
let printGlossary = null;
let preparingPrint = false;
let printPosition;
window.addEventListener('beforeprint', () => {
  if (preparingPrint) return;
  preparingPrint = true;
  printPosition = { top: scrollY, left: scrollX, behavior: 'instant' };
  root.querySelectorAll('img').forEach(image => { image.loading = 'eager'; });
  printDetails = [...root.querySelectorAll('details:not([open])')];
  printDetails.forEach(details => { details.open = true; });
  const glossary = root.querySelector('#definition-results');
  if (glossary) {
    printGlossary = { html: glossary.innerHTML, count: root.querySelector('#definition-count').textContent };
    glossary.innerHTML = definitionList(definitions);
    root.querySelector('#definition-count').textContent = `All ${definitions.length} terms.`;
  }
});
window.addEventListener('afterprint', () => {
  if (!preparingPrint) return;
  printDetails.forEach(details => { details.open = false; });
  if (printGlossary) {
    root.querySelector('#definition-results').innerHTML = printGlossary.html;
    root.querySelector('#definition-count').textContent = printGlossary.count;
    printGlossary = null;
  }
  window.scrollTo(printPosition);
  preparingPrint = false;
  explorer.sync();
});

async function initialize() {
  if (new URLSearchParams(location.search).get('view') === 'book') {
    location.replace(`./book.html${location.hash}`);
    return;
  }
  try {
    const response = await fetch('./data/meridian.json');
    if (!response.ok) throw new Error(`Dataset request failed (${response.status})`);
    const data = await response.json();
    if (data.fleet.satellites !== data.fleet.radar + data.fleet.optical || data.groundStations.count !== data.groundStations.items.length)
      throw new Error('The shared mission dataset is inconsistent');
    model = createEditorialContent(data);
    renderReadingPages();
    mission = createMissionInteractions(root, data);
    mission.renderInto(root);
    buildNavigation();
  } catch (error) {
    console.error('Unable to load the editorial white paper:', error);
    root.innerHTML = `<div class="notice" role="alert"><h1>White paper unavailable</h1><p>${escape(error.message)}</p><p>No substitute content or mission data has been used.</p></div>`;
    bookmark.disabled = true;
    return;
  }
  try {
    const value = localStorage.getItem('frontier-notebook-mark');
    const id = value ? canonical(value) : null;
    saved = model.sections.some(section => section.id === id) ? id : null;
    const storedPosition = localStorage.getItem(positionKey);
    const position = storedPosition ? canonical(storedPosition) : null;
    restoredId = model.sections.some(section => section.id === position) ? position : null;
  } catch {
    positionStorageAvailable = false;
    showNotice('Local storage is unavailable. Bookmarks and reading position cannot be preserved after closing this browser.');
  }
  await document.fonts.ready;
  if (!location.hash && restoredId) history.replaceState(null, '', `#${restoredId}`);
  readAddress();
  updateBookmark();
  root.dataset.ready = 'true';
  reducedMotion.addEventListener('change', onScroll);
}

await initialize();
