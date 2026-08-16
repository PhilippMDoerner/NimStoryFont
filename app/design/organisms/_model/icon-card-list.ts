import { ArticleKind } from '../../../_models/overview';
import { Icon } from '../../atoms/_models/icon';

export interface IconCardEntry {
  entryType: ArticleKind;
  icon: Icon;
  link: string;
  title: string;
  subText: string;
  updateDatetime: string;
  decoration?: string;
}
