import {
  NON_NORMAL_CHARACTER_REGEXP,
  TWO_OR_MORE_WHITESPACE_REGEXP,
} from 'src/utils/string';

export type Formatter = (searchTerm: string | undefined) => string | undefined;

export function matchesSearchterm(
  searchTerm: string,
  value: unknown,
  formatter?: Formatter,
): boolean {
  const searchRegex = new RegExp(searchTerm.split('').join('.*'));

  switch (typeof value) {
    case 'string':
    case 'number':
    case 'bigint':
    case 'boolean': {
      const opt1 = formatter
        ? (formatter(`${value}`.toLowerCase()) ?? '')
        : `${value}`.toLowerCase();
      return opt1.match(searchRegex) != null;
    }
    case 'symbol': {
      const opt2 = formatter
        ? (formatter(value.description?.toLowerCase()) ?? '')
        : (value.description?.toLowerCase() ?? '');
      return opt2.match(searchRegex) != null;
    }
    case 'undefined':
    case 'object':
    case 'function':
    default:
      return false;
  }
}
export function cleanSearchTerm(
  searchTerm: string | undefined,
): string | undefined {
  return searchTerm
    ?.replaceAll(NON_NORMAL_CHARACTER_REGEXP, ' ')
    .trim()
    .replace(TWO_OR_MORE_WHITESPACE_REGEXP, ' ')
    .trim();
}
