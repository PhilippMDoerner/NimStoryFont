import { ArticleKind } from './overview';

export type SearchableArticleKind = Lowercase<
  Exclude<
    ArticleKind,
    'MARKER_TYPE' | 'MARKER_TYPE_TYPE' | 'QUOTE' | 'SESSION' | 'USER'
  >
>;

export const SEARCHABLE_ARTICLE_KINDS: SearchableArticleKind[] = [
  'character',
  'creature',
  'diaryentry',
  'encounter',
  'item',
  'location',
  'map',
  'organization',
  'quest',
  'rule',
  'spell',
  'sessionaudio',
];
