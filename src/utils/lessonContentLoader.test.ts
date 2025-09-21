import { loadLessonContent, getAvailableChapters, isOldFormat, isNewFormat } from './lessonContentLoader';

describe('lessonContentLoader', () => {
  test('loads Grade 12 content correctly', () => {
    const content = loadLessonContent(1, 12);
    expect(content).not.toBeNull();
    if (content && isNewFormat(content)) {
      expect(content.title).toBe('Relations and Functions');
      expect(content.chapters.length).toBeGreaterThan(0);
    }
  });

  test('loads Grade 6 content correctly', () => {
    const content = loadLessonContent(1, 6);
    expect(content).not.toBeNull();
    if (content && isOldFormat(content)) {
      expect(content.title).toBeDefined();
      expect(content.subtopics.length).toBeGreaterThan(0);
    }
  });

  test('returns correct available chapters for Grade 12', () => {
    const chapters = getAvailableChapters(12);
    expect(chapters).toEqual([1, 2, 3]);
  });

  test('returns correct available chapters for Grade 6', () => {
    const chapters = getAvailableChapters(6);
    expect(chapters).toEqual([1, 2, 3]);
  });
});