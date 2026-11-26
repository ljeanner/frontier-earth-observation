import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { createBook, bookTitle } from './book-content.js';
import { compileManuscript, compileAtticaTimeline } from './compile-manuscript.mjs';
import { manuscriptSections } from './manuscript-data.js';
import { createEditorialContent } from './editorial-content.js';

test('both editions identify the personal publication without incidental branding', async () => {
  const data = JSON.parse(await readFile(new URL('./data/meridian.json', import.meta.url), 'utf8'));
  const { pages } = createBook(data);
  assert.equal(bookTitle, 'The Doe Project — Coordinating Earth Observation with AI Agents');
  for (const id of ['cover', 'back-cover']) {
    const page = pages.find(entry => entry.id === id);
    assert.match(page.left + page.right, /Lucile Jeanneret/);
    assert.match(page.left + page.right, /The Doe Project/);
  }
  assert.doesNotMatch(pages.map(page => (page.left ?? '') + (page.right ?? '')).join(''), /\bFrontier\b|MISSION ARCHITECTURE/i);
  for (const name of ['index.html', 'book.html']) {
    const html = await readFile(new URL(name, import.meta.url), 'utf8');
    assert.match(html, /name="author" content="Lucile Jeanneret"/);
    assert.match(html, /<title>The Doe Project — Coordinating Earth Observation with AI Agents<\/title>/);
    assert.doesNotMatch(html, /\bFrontier\b|MISSION ARCHITECTURE/i);
  }
});

test('the published reader compiles the revised opening verbatim and preserves the continuous article', async () => {
  const source = await readFile(new URL('./content/agentic-earth-observation-manuscript-v3.md', import.meta.url), 'utf8');
  const compiled = await readFile(new URL('./manuscript-data.js', import.meta.url), 'utf8');
  assert.equal(compileManuscript(source), compiled);
  const data = JSON.parse(await readFile(new URL('./data/meridian.json', import.meta.url), 'utf8'));
  const { pages, chapters } = createBook(data);
  assert.equal(chapters.length, 3);
  assert.deepEqual(createEditorialContent(data).readingPages.map(page => [page.id, page.sectionIds.length]), [
    ['part-1', 4], ['part-2', 6], ['part-3', 6], ['part-4', 1],
  ]);
  assert.equal(manuscriptSections.length, 17);
  assert.equal(pages.filter(page => page.chapter)[1].id, 'orbital-network');
  assert.equal(pages.filter(page => page.chapter)[4].id, 'meet-meridian');
  assert.doesNotMatch(pages.filter(page => page.chapter).slice(0, 4)
    .map(page => page.left + page.right).join('').replace(/<[^>]*>/g, ''), /Meridian/);
  for (const file of ['meridian-logo-reading.webp', 'meridian-offices-rome-reading.webp', 'meridian-world-map-reading.webp'])
    assert.ok((await readFile(new URL(`./art/${file}`, import.meta.url))).length > 0);
  assert.equal(pages.filter(page => page.chapter).length, 16);
  assert.equal(pages.some(page => page.id === 'challenges'), false);
  for (const section of manuscriptSections.filter(section => ![9, 10].includes(section.number))) {
    const page = pages.find(page => page.chapter && page.sequenceNumber === section.number);
    assert.equal(page.title, section.title);
    assert.match(page.left + page.right, new RegExp(`data-manuscript="${section.number}"`));
  }
});

test('the opening film is featured once before Part I and historical evidence remains distinct', async () => {
  const data = JSON.parse(await readFile(new URL('./data/meridian.json', import.meta.url), 'utf8'));
  const { pages } = createBook(data);
  const film = pages.find(page => page.id === 'trailer');
  assert.equal(pages.indexOf(film), 1);
  assert.match(film.right, /data-mission-intro-featured/);
  assert.match(film.right, /not a reconstruction of the 2024 Varnavas fire/);
  assert.doesNotMatch(film.right, /optional|only when requested/i);
  assert.equal(pages.map(page => page.left + page.right).join('').match(/class="mission-intro-slot"/g).length, 1);
  const historical = pages.find(page => page.id === 'wildfire');
  assert.match(historical.left, /Historical record|EMSR746/);
  assert.doesNotMatch(historical.left + historical.right, /AR-1842|data-mission-widget/);
  const chapter = await readFile(new URL('./content/attica-timeline-chapter.md', import.meta.url), 'utf8');
  assert.equal(await readFile(new URL('./attica-timeline-data.js', import.meta.url), 'utf8'), compileAtticaTimeline(chapter));
  for (const page of pages) {
    for (const [, file] of `${page.left ?? ''}${page.right ?? ''}`.matchAll(/(?:src|href)="\.\/art\/([^"#?]+)"/g))
      assert.ok((await readFile(new URL(`./art/${file}`, import.meta.url))).length > 0, file);
  }
});

test('static publication contains the runtime module and stylesheet dependency graph', async () => {
  const pending = ['index.html', 'book.html'];
  const checked = new Set();
  while (pending.length) {
    const name = pending.pop();
    if (checked.has(name)) continue;
    checked.add(name);
    const content = await readFile(new URL(name, import.meta.url), 'utf8');
    const references = name.endsWith('.html')
      ? [...content.matchAll(/(?:src|href)="\.\/([^"#?]+\.(?:js|css))"/g)].map(match => match[1])
      : [...content.matchAll(/(?:from\s*|import\s*)['"]\.\/([^'"]+)['"]|@import\s*(?:url\(\s*)?['"]\.\/([^'"]+)['"]/g)].map(match => match[1] ?? match[2]);
    pending.push(...references);
  }
  for (const required of ['manuscript-content.js', 'manuscript-data.js', 'mission-data.js', 'mission-workflow.js', 'mission-interactions.js', 'mission-widgets.css', 'process-illustrations.js', 'attica-timeline.js', 'attica-timeline-data.js', 'attica-timeline.css'])
    assert.ok(checked.has(required), `Missing runtime dependency: ${required}`);
});

test('the recurring doe drawings close the narrative parts, outside historical evidence', async () => {
  const data = JSON.parse(await readFile(new URL('./data/meridian.json', import.meta.url), 'utf8'));
  const { pages } = createBook(data);
  for (const [id, drawing] of [
    ['observation-lifecycle', 'clearing'],
    ['business-case', 'listening'],
    ['deployment-and-evaluation', 'onward'],
  ]) {
    const page = pages.find(page => page.id === id);
    assert.match(page.right, /class="doe-vignette"/);
    assert.ok(page.right.includes(`doe-${drawing}-reading.webp`));
    assert.ok(page.right.includes(`doe-${drawing}.png`));
    for (const file of [`doe-${drawing}.png`, `doe-${drawing}-reading.webp`])
      assert.ok((await readFile(new URL(`./art/${file}`, import.meta.url))).length > 0);
  }
  const historical = pages.find(page => page.id === 'wildfire');
  assert.doesNotMatch(historical.left + historical.right, /doe-vignette/);
  const accelerator = pages.find(page => page.id === 'accelerator');
  assert.doesNotMatch(accelerator.right, /data-system|Layered agent and mission-system architecture/);
});
