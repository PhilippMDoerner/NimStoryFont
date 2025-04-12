export type ImageType =
  | 'character'
  | 'creature'
  | 'encounter'
  | 'item'
  | 'location'
  | 'organization';

export interface Image {
  pk: number;
  image: string;
  name?: string;
  character_article?: number;
  creature_article?: number;
  encounter_article?: number;
  item_article?: number;
  location_article?: number;
  organization_article?: number;
  article_type?: string;
  imageFile?: File;
}
