import { ARTICLE_COLORS } from 'src/app/_models/overview';
import {
  SEARCHABLE_ARTICLE_KINDS,
  SearchableArticleKind,
} from 'src/app/_models/search';
import { capitalize } from 'src/utils/string';
import { Icon } from '../../atoms/_models/icon';

export type ToggleState = 'TOGGLED' | 'UNTOGGLED';

export interface Toggle<T> {
  value: T;
  active: boolean;
  color: string;
  text: string;
  icon?: Icon;
}

export const SEARCH_TOGGLES: Toggle<SearchableArticleKind[]>[] = [
  {
    active: true,
    color: 'unset',
    value: SEARCHABLE_ARTICLE_KINDS,
    text: 'All',
  },
  ...SEARCHABLE_ARTICLE_KINDS.map(
    (kind) =>
      ({
        active: true,
        color:
          ARTICLE_COLORS[
            kind.toUpperCase() as Uppercase<SearchableArticleKind>
          ],
        value: [kind],
        text: capitalize(kind.replaceAll('_', ' ')),
      }) satisfies Toggle<SearchableArticleKind[]>,
  ),
];
