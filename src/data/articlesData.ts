import { ArticleCard, ConstitutionPart } from '../types';

export const ARTICLE_DATA: ArticleCard[] = [
  { uid: '1', article: "Article 12", expl: "Defines the meaning of 'State' under Fundamental Rights." },
  { uid: '2', article: "Article 14", expl: "Guarantees equality before the law and equal protection of the laws." },
  { uid: '3', article: "Article 19", expl: "Protects freedoms like speech, assembly, association — subject to reasonable restrictions." },
  { uid: '4', article: "Article 21", expl: "Right to life and personal liberty — a broad protection covering many derived rights." },
  { uid: '5', article: "Article 32", expl: "Right to constitutional remedies — approach the Supreme Court for enforcement of Fundamental Rights." },
  { uid: '6', article: "Article 368", expl: "Procedure for amending the Constitution — special majority and conditions for some amendments." },
  { uid: '7', article: "Article 370", expl: "(Historic) Special status clause — now abrogated in 2019." },
  { uid: '8', article: "Article 51A", expl: "Fundamental duties of citizens, such as respecting the Constitution." }
];

export const CONSTITUTION_PARTS: ConstitutionPart[] = [
  {
    id: 'part-1',
    partNumber: 1,
    title: 'The Union and Its Territory',
    description: 'Defines India as a Union of States and describes the territory of India.',
    articles: ['Article 1', 'Article 2', 'Article 3', 'Article 4'],
    totalArticles: 4,
    category: 'union',
    difficulty: 'beginner'
  },
  {
    id: 'part-2',
    partNumber: 2,
    title: 'Citizenship',
    description: 'Deals with citizenship of India at the commencement of the Constitution.',
    articles: ['Article 5', 'Article 6', 'Article 7', 'Article 8', 'Article 9', 'Article 10', 'Article 11'],
    totalArticles: 7,
    category: 'other',
    difficulty: 'beginner'
  },
  {
    id: 'part-3',
    partNumber: 3,
    title: 'Fundamental Rights',
    description: 'Guarantees basic rights to all citizens, including equality, freedom, and protection against discrimination.',
    articles: ['Article 12-35'],
    totalArticles: 24,
    category: 'fundamental-rights',
    difficulty: 'beginner'
  },
  {
    id: 'part-4',
    partNumber: 4,
    title: 'Directive Principles of State Policy',
    description: 'Guidelines for the framing of laws by the government, aimed at establishing social and economic democracy.',
    articles: ['Article 36-51'],
    totalArticles: 16,
    category: 'directive-principles',
    difficulty: 'intermediate'
  },
  {
    id: 'part-5',
    partNumber: 5,
    title: 'The Union',
    description: 'Deals with the Union Government, including the President, Parliament, and Supreme Court.',
    articles: ['Article 52-151'],
    totalArticles: 100,
    category: 'union',
    difficulty: 'intermediate'
  },
  // Add remaining parts (6-25) here...
];

export const RECOMMENDED_ARTICLES = [
  {
    id: 'rec-1',
    article: 'Article 14',
    title: 'Equality Before Law',
    summary: 'Learn about the fundamental principle of equality and how it protects every citizen.',
    readTime: 5,
    category: 'fundamental-rights'
  },
  {
    id: 'rec-2',
    article: 'Article 21',
    title: 'Right to Life',
    summary: 'Discover the most important fundamental right that forms the foundation of human dignity.',
    readTime: 7,
    category: 'fundamental-rights'
  },
  {
    id: 'rec-3',
    article: 'Article 19',
    title: 'Freedom of Speech',
    summary: 'Understand your right to express yourself and the reasonable restrictions on it.',
    readTime: 6,
    category: 'fundamental-rights'
  }
];