import { createBook } from './book-content.js';

export const editorialParts = [
  { title: 'Understanding Earth Observation', chapters: ['01'] },
  { title: "Meridian's Operational Challenge", chapters: ['02'] },
  { title: 'Engineering Agentic Operations', chapters: ['03'] },
  { title: 'Architecture and Foundry technical notes', chapters: [], sectionIds: ['technical-notes'] },
];

const templates = {
  industry: 'split-screen',
  'building-with-foundry': 'split-screen',
  'observation-lifecycle': 'process-fresco',
  'agent-responsibilities': 'process-fresco',
  'sensors-and-customers': 'visual-comparison',
  'orbital-network': 'immersive-interactive',
  'existing-architecture': 'architecture-explorer',
  accelerator: 'architecture-explorer',
  'customer-request': 'case-study',
  challenges: 'case-study',
  wildfire: 'split-screen',
  'mission-debrief': 'case-study',
};

export function createEditorialContent(data) {
  const book = createBook(data);
  let sequenceNumber = 0;
  const sections = book.pages.filter(page => !page.contents).map(page => ({
    ...page,
    template: templates[page.id] ?? 'editorial-explanation',
    sequenceNumber: page.type === 'chapter' ? ++sequenceNumber : null,
    part: editorialParts.findIndex(part => part.chapters.includes(page.chapter) || part.sectionIds?.includes(page.id)),
  }));
  return {
    ...book,
    sections,
    readingPages: editorialParts.map((part, index) => ({
      id: `part-${index + 1}`,
      number: index + 1,
      title: part.title,
      sectionIds: sections.filter(section => section.part === index).map(section => section.id),
    })),
    sequenceCount: book.chapters.reduce((count, chapter) => count + chapter.sections.length, 0),
  };
}
