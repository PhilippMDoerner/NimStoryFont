import { ApiObject, MinimumCampaignOverview } from './article';

export type QuestStatus = 'Completed' | 'Failed' | 'In progress' | 'On Hold';

export type ArticleKind =
  | 'CHARACTER'
  | 'CREATURE'
  | 'DIARYENTRY'
  | 'ENCOUNTER'
  | 'ITEM'
  | 'LOCATION'
  | 'MAP'
  | 'MARKER_TYPE'
  | 'MARKER_TYPE_TYPE'
  | 'ORGANIZATION'
  | 'QUEST'
  | 'QUOTE'
  | 'RULE'
  | 'SPELL'
  | 'USER'
  | 'SESSION'
  | 'SESSIONAUDIO';

// export type OverviewItem = any;

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
