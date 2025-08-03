import { Icon } from '../design/atoms/_models/icon';
import { ApiObject, MinimumCampaignOverview } from './article';

export type QuestStatus = 'Completed' | 'Failed' | 'In progress' | 'On Hold';

export const ARTICLE_KINDS = [
  'CHARACTER',
  'CREATURE',
  'DIARYENTRY',
  'ENCOUNTER',
  'ITEM',
  'LOCATION',
  'MAP',
  'MARKER_TYPE',
  'MARKER_TYPE_TYPE',
  'ORGANIZATION',
  'QUEST',
  'QUOTE',
  'RULE',
  'SPELL',
  'USER',
  'SESSION',
  'SESSIONAUDIO',
] as const;

export type ArticleKind = (typeof ARTICLE_KINDS)[number];

export const ARTICLE_COLORS: { [key in ArticleKind]: string } = {
  CHARACTER: 'var(--character-color)',
  CREATURE: 'var(--creature-color)',
  DIARYENTRY: 'var(--diaryentry-color)',
  ENCOUNTER: 'var(--encounter-color)',
  ITEM: 'var(--item-color)',
  LOCATION: 'var(--location-color)',
  MAP: 'var(--map-color)',
  MARKER_TYPE: 'var(--marker-type-color)',
  MARKER_TYPE_TYPE: 'var(--marker-type-type-color)',
  ORGANIZATION: 'var(--organization-color)',
  QUEST: 'var(--quest-color)',
  QUOTE: 'var(--quote-color)',
  RULE: 'var(--rule-color)',
  SPELL: 'var(--spell-color)',
  USER: 'var(--user-color)',
  SESSION: 'var(--session-color)',
  SESSIONAUDIO: 'var(--sessionaudio-color)',
};

export const ARTICLE_ICONS: { [key in ArticleKind]: Icon } = {
  CHARACTER: 'male',
  CREATURE: 'dragon',
  DIARYENTRY: 'book-open',
  ENCOUNTER: 'comments',
  ITEM: 'magic',
  LOCATION: 'compass',
  MAP: 'map',
  ORGANIZATION: 'sitemap',
  QUEST: 'question-circle',
  RULE: 'book',
  SPELL: 'hand-sparkles',
  USER: 'user',
  SESSIONAUDIO: 'file-audio',
  SESSION: 'calendar-alt',
  // The values below are dummy icons
  MARKER_TYPE: 'anchor',
  MARKER_TYPE_TYPE: 'anchor',
  QUOTE: 'anchor',
};

export type VisitedState = 'SEEN' | 'NEW_UPDATED' | 'NEW_CREATED';

export interface OverviewItem extends ApiObject {
  article_type: string;
  name: string;
  name_full: string;
  description?: string;
  update_datetime?: string;
  visited_state?: VisitedState;
  campaign_details: MinimumCampaignOverview;

  //For Character-Type OverviewItems
  player_character?: boolean;
  images?: string[];

  //For Location-Type OverviewItems
  parent_location_details?: { name: string; pk: number };

  //For Diaryentry-Type OverviewItems
  session_details?: OverviewSession; //Also for Session Audio Type overview-items
  author_details?: { pk: number; name: string };
  session_date: string;
  is_main_session: boolean;

  //For Session Audio-Type OverviewItems
  audio_url?: string;
  download_url?: string;

  //For Map-Type OverviewItems
  icon?: string;

  //For Session-Type OverviewItems (Solely for diaryentry-create and update select statements)
  author_ids?: number[];
  session_number?: number;

  // For quests
  status?: QuestStatus;
  abstract?: string;
  taker_details?: {
    name: string;
    name_full: string;
    pk: number;
  };

  // For User
  username?: string;
}

export interface OverviewSession {
  pk: number;
  session_number: number;
  is_main_session: boolean;
  is_main_session_int: number;
  start_day?: number;
  end_day?: number;
}
