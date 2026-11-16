import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { createBook, bookTitle } from './book-content.js';
import { compileManuscript } from './compile-manuscript.mjs';
import { manuscriptSections } from './manuscript-data.js';
import { createEditorialContent } from './editorial-content.js';

test('both editions identify the personal publication without incidental branding', async () => {
  const data = JSON.parse(await readFile(new URL('./data/meridian.json', import.meta.url), 'utf8'));
  const { pages } = createBook(data);
  assert.equal(bookTitle, 'Agentic Earth Observation — Tasking & Downlink');
  for (const id of ['cover', 'back-cover']) {
    const page = pages.find(entry => entry.id === id);
    assert.match(page.left + page.right, /Lucile Jeanneret/);
    assert.match(page.left + page.right, /Agentic Earth Observation/);
  }
  assert.doesNotMatch(pages.map(page => (page.left ?? '') + (page.right ?? '')).join(''), /\bFrontier\b|MISSION ARCHITECTURE/i);
  for (const name of ['index.html', 'book.html']) {
    const html = await readFile(new URL(name, import.meta.url), 'utf8');
    assert.match(html, /name="author" content="Lucile Jeanneret"/);
    assert.match(html, /<title>Agentic Earth Observation — Tasking &amp; Downlink<\/title>/);
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
    ['part-1', 4], ['part-2', 7], ['part-3', 6], ['part-4', 1],
  ]);
  assert.equal(manuscriptSections.length, 17);
  assert.equal(pages.filter(page => page.chapter)[1].id, 'orbital-network');
  assert.equal(pages.filter(page => page.chapter)[4].id, 'meet-meridian');
  assert.doesNotMatch(pages.filter(page => page.chapter).slice(0, 4)
    .map(page => page.left + page.right).join('').replace(/<[^>]*>/g, ''), /Meridian/);
  for (const file of ['meridian-logo-reading.webp', 'meridian-offices-rome-reading.webp', 'meridian-world-map-reading.webp'])
    assert.ok((await readFile(new URL(`./art/${file}`, import.meta.url))).length > 0);
  for (const [index, section] of manuscriptSections.entries()) {
    const page = pages.filter(page => page.chapter)[index];
    assert.equal(page.title, section.title);
    assert.match(page.left + page.right, new RegExp(`data-manuscript="${section.number}"`));
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
      : [...content.matchAll(/(?:from\s*|import\s*)['"]\.\/([^'"]+)['"]|@import\s*['"]\.\/([^'"]+)['"]/g)].map(match => match[1] ?? match[2]);
    pending.push(...references);
  }
  for (const required of ['manuscript-content.js', 'manuscript-data.js', 'mission-data.js', 'mission-workflow.js', 'mission-interactions.js', 'mission-widgets.css', 'process-illustrations.js'])
    assert.ok(checked.has(required), `Missing runtime dependency: ${required}`);
});
