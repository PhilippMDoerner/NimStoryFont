import { Icon } from 'src/app/design/atoms/_models/icon';

export interface ItemCategory {
  label: string;
  active: boolean;
  color: string;
  value: string;
  icon?: Icon;
}

export const DEFAULT_SEARCH_PREFERENCES = [
  {
    value: 'Character',
    label: 'Character',
    active: false,
    color: '--character-color',
  },
  {
    value: 'Creature',
    label: 'Creature',
    active: false,
    color: '--creature-color',
  },
  {
    value: 'Diaryentry',
    label: 'Diaryentry',
    active: false,
    color: '--diaryentry-color',
  },
  {
    value: 'Encounter',
    label: 'Encounter',
    active: false,
    color: '--encounter-color',
  },
  { value: 'Item', label: 'Item', active: false, color: '--item-color' },
  {
    value: 'Location',
    label: 'Location',
    active: false,
    color: '--location-color',
  },
  { value: 'Map', label: 'Map', active: false, color: '--map-color' },
  {
    value: 'Organization',
    label: 'Organization',
    active: false,
    color: '--organization-color',
  },
  { value: 'Quest', label: 'Quest', active: false, color: '--quest-color' },
  {
    value: 'SessionAudio',
    label: 'SessionAudio',
    active: false,
    color: '--sessionaudio-color',
  },
  { value: 'Rules', label: 'Rules', active: false, color: '--rules-color' },
  { value: 'Spell', label: 'Spell', active: false, color: '--spell-color' },
] as const satisfies ItemCategory[];

export type ArticleCategoryLabel =
  (typeof DEFAULT_SEARCH_PREFERENCES)[number]['label'];

export const GRAPH_NODE_CATEGORIES = [
  'Character',
  'Item',
  'Organization',
  'Location',
] as const satisfies ArticleCategoryLabel[];

const availableNodeTypes = new Set<ArticleCategoryLabel>(GRAPH_NODE_CATEGORIES);
export const NODE_TYPE_OPTIONS = DEFAULT_SEARCH_PREFERENCES.filter((option) =>
  availableNodeTypes.has(option.label),
);
