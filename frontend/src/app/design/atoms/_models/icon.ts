export const ALL_REGULAR_ICONS = [
  'calendar',
  'circle-user',
  'clock',
  'copy',
  'envelope',
  'hourglass',
  'map',
  'plus-square',
  'user',
] as const;
export const REGULAR_ICON_SET = new Set<string>(ALL_REGULAR_ICONS);
type RegularIcon = (typeof ALL_REGULAR_ICONS)[number]; // this compiles to 'comments' | 'magic'...

export const ALL_SOLID_ICONS = [
  'anchor',
  'arrow-down',
  'arrow-down-long',
  'arrow-left-long',
  'arrow-left',
  'arrow-right-long',
  'arrow-right',
  'arrow-up',
  'arrow-up-long',
  'bars',
  'ban',
  'bolt',
  'book-open',
  'book',
  'calendar-alt',
  'calendar-day',
  'calendar-week',
  'check',
  'chess-rook',
  'chevron-down',
  'chevron-left',
  'chevron-right',
  'chevron-up',
  'circle',
  'circle-exclamation',
  'clipboard',
  'cog',
  'comments',
  'compass',
  'copy',
  'crown',
  'cut',
  'home',
  'database',
  'desktop',
  'diagram-project',
  'diamond',
  'dice',
  'down-long',
  'download',
  'dragon',
  'dungeon',
  'exclamation',
  'expand',
  'file-arrow-down',
  'file-audio',
  'file-import',
  'file',
  'filter',
  'gear',
  'gavel',
  'globe-americas',
  'hammer',
  'hand-sparkles',
  'hat-wizard',
  'hand-fist',
  'house',
  'handshake',
  'hotel',
  'hourglass-half',
  'infinity',
  'info-circle',
  'info',
  'location-dot',
  'lock',
  'link',
  'list',
  'magic',
  'male',
  'minus',
  'monument',
  'moon',
  'mountain',
  'newspaper',
  'paw',
  'pen',
  'pencil',
  'place-of-worship',
  'plus',
  'question-circle',
  'rectangle-list',
  'redo-alt',
  'refresh',
  'right-from-bracket',
  'search',
  'sign-out-alt',
  'sitemap',
  'spinner',
  'square-check',
  'store',
  'table',
  'tag',
  'th-list',
  'times',
  'tint',
  'trash',
  'tree',
  'triangle-exclamation',
  'umbrella-beach',
  'university',
  'up-long',
  'up-down-left-right',
  'up-right-from-square',
  'upload',
  'user-cog',
  'user-plus',
  'users-gear',
  'volume-up',
  'water',
  'xmark',
] as const;
export const SOLID_ICONS_SET = new Set<string>(ALL_SOLID_ICONS);
type SolidIcon = (typeof ALL_SOLID_ICONS)[number]; // this compiles to 'male' | 'book-open'...

export const ALL_BRAND_ICONS = ['fort-awesome'] as const;
export const BRAND_ICON_SET = new Set<string>(ALL_BRAND_ICONS);
export type BrandIcon = (typeof ALL_BRAND_ICONS)[number];

export type Icon = SolidIcon | RegularIcon | BrandIcon;
export const ALL_ICONS = [
  ...ALL_REGULAR_ICONS,
  ...ALL_SOLID_ICONS,
  ...ALL_BRAND_ICONS,
];

export type IconKind = 'fa-brands' | 'fa-solid' | 'fa-regular';
export function toIconKind(icon: Icon): IconKind | undefined {
  const ico = icon;
  if (SOLID_ICONS_SET.has(ico)) {
    return 'fa-solid';
  } else if (BRAND_ICON_SET.has(ico)) {
    return 'fa-brands';
  } else if (REGULAR_ICON_SET.has(ico)) {
    return 'fa-regular';
  } else {
    // const e = new Error('Invalid icon: ' + icon);
    // console.error(e);
    return 'fa-solid';
  }
}
