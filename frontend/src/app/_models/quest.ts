import { ArticleObject } from './article';
import { Session } from './session';

export interface QuestRaw {
  name: string;
  status: string;
  taker: number;
  abstract: string;
  description: string;
  giver: number;
  start_session: number;
  end_session: number;
  campaign: number;
}

export interface Quest extends ArticleObject {
  status: string;
  taker: number;
  taker_details?: { name: string; name_full: string; pk: number };
  abstract: string;
  description: string;
  giver: number;
  giver_details?: { name: string; name_full: string; pk: number };
  start_session: number;
  start_session_details?: Session;
  end_session: number;
  end_session_details?: Session;
}
