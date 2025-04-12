import { ArticleObject } from './article';
import { Image } from './image';

export interface LocationRaw {
  name: string;
  description: string;
  parent_location?: string;
  campaign: number;
}

export interface Location extends ArticleObject {
  name_full?: string;
  description: string;
  parent_location?: number;
  images?: Image[];
  parent_location_details?: {
    pk: number;
    name: string;
    parent_location: string;
    name_full: string;
  };
  parent_location_list?: string[];
  characters?: LocationCharacter[];
  sublocations?: Location[];
  marker_details?: { map: string; map_icon: string }[];

  getAbsoluteRouterUrlForParentLocation?(): string;
}

export interface SubLocation {
  creation_datetime: string;
  update_datetime: string;
  name: string;
  pk: number;
  characters: LocationCharacter[];
  name_full: string;
  description: string;
  parent_location_name: string;
}

export interface LocationCharacter {
  name: string;
  pk: number;
  name_full: string;
}
