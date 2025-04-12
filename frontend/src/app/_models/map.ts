import { ArticleObject } from './article';
import { MapMarker } from './mapMarker';

export interface MapRaw {
  name: string;
  icon?: string;
  campaign: number;
  image: string;
}

export interface Map extends Omit<ArticleObject, 'description'> {
  icon: string;
  image: string;
}

export interface ExtendedMap extends Map {
  markers?: MapMarker[];
}
