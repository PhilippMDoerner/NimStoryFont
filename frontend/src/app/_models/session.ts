export interface SessionRaw {
  session_number: number;
  session_date: string;
  is_main_session: boolean;
  end_day?: number;
  start_day?: number;
  campaign: number;
}

export interface Session {
  pk?: number;
  is_main_session: boolean;
  is_main_session_int: number | undefined;
  session_number: number;
  session_date: string;
  start_day: number | undefined;
  end_day: number | undefined;
  name: string | undefined;
  title: string | undefined;
  has_recording: boolean | undefined;
  diaryentries: SessionDiaryEntry[] | undefined;
  campaign?: number;
  campaign_details: { pk: number; name: string } | undefined;
  creation_datetime: string | undefined;
  update_datetime: string | undefined;
}

export interface SessionDiaryEntry {
  author_name: string;
  name: string;
}
