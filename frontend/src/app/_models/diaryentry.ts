import { ApiObject } from './article';
import { Encounter } from './encounter';
import { Session } from './session';

export interface DiaryEntry extends ApiObject {
  title: string;
  author: number;
  author_details?: DiaryEntryUser;
  session: number;
  session_details?: Session;
  encounters: Encounter[];
  campaign_details: { name: string; pk: number };
  adjacent_diaryentries: {
    next_diaryentry: DiaryEntryStump;
    prior_diaryentry: DiaryEntryStump;
  };
}

export interface DiaryEntryRaw {
  title: string;
  author: number;
  session: number;
}

export interface DiaryEntryStump {
  author_details: DiaryEntryUser;
  session_details: Session;
}

export interface DiaryEntryUser {
  pk: number;
  name: string;
}
