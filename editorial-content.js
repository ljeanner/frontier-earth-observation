import { createBook } from './book-content.js';

export const editorialParts = [
  { title: 'Understanding Earth observation', chapters: ['01'] },
  { title: 'The operational challenge', chapters: ['02', '03', '04'] },
  { title: 'Engineering agentic operations', chapters: ['05', '06', '07'] },
];

const templates = {
  industry: 'split-screen',
  'safety-and-approval': 'split-screen',
  'business-applications': 'split-screen',
  'building-with-foundry': 'split-screen',
  'foundry-dataset': 'split-screen',
  'observation-lifecycle': 'process-fresco',
  'continuous-planning': 'process-fresco',
  'sensors-and-customers': 'visual-comparison',
  'orbital-network': 'immersive-interactive',
  'existing-architecture': 'architecture-explorer',
  'information-boundaries': 'architecture-explorer',
  accelerator: 'architecture-explorer',
  wildfire: 'case-study',
  'mission-lab': 'case-study',
  'mission-debrief': 'case-study',
};

export function createEditorialContent(data) {
  const book = createBook(data);
  let sequenceNumber = 0;
  return {
    ...book,
    sections: book.pages.filter(page => !page.contents).map(page => ({
      ...page,
      template: templates[page.id] ?? 'editorial-explanation',
      sequenceNumber: page.type === 'chapter' ? ++sequenceNumber : null,
      part: editorialParts.findIndex(part => part.chapters.includes(page.chapter)),
    })),
    sequenceCount: book.chapters.reduce((count, chapter) => count + chapter.sections.length, 0),
  };
}
