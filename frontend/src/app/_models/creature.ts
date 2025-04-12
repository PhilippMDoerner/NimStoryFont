import { ArticleObject } from './article';
import { Image } from './image';

export interface Creature extends ArticleObject {
  images?: Image[];
  description: string;
  campaign: number;
}

export interface CreatureRaw {
  name: string;
  campaign: number;
}
