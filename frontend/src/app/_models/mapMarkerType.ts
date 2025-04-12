import { Icon } from 'src/app/design/atoms/_models/icon';

export interface MapMarkerTypeRaw {
  name: string;
  is_text_marker: boolean;
  icon: Icon;
  color: string;
  fontawesome_type: 'fas' | 'fa';
  campaign_id: number;
}

export interface MapMarkerType {
  name: string;
  is_text_marker: boolean;
  icon: Icon;
  color: string;
  id: number;
  fontawesome_type: 'fas' | 'fa';
  campaign_id?: number;
  creation_datetime: string;
  update_datetime: string;
}
