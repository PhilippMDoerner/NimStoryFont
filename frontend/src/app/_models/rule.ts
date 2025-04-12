import { ArticleObject } from './article';

export interface RuleRaw {
  name: string;
  description?: string;
  campaign: number;
}

export interface Rule extends ArticleObject {}
