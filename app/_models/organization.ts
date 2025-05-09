import { ArticleObject } from './article';
import { Image } from './image';

export interface OrganizationRaw {
  name: string;
  campaign: number;
  description?: string;
  leader?: string;
  headquarter?: number;
}

export interface Organization extends ArticleObject {
  leader: string;
  description: string;
  headquarter: number;
  headquarter_details?: {
    name: string;
    parent_name: string;
    pk: number;
    name_full: string;
  };
  members?: OrganizationMember[];
  images?: Image[];
}

export interface OrganizationMember {
  name: string;
  pk: number;
  alive: boolean;
  organization_id: number;
  role: string;
  membership_id: number;
}
