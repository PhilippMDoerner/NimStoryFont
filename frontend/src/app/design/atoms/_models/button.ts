export const ELEMENT_TYPES = [
  'PRIMARY',
  'SECONDARY',
  'DARK',
  'DANGER',
  'WARNING',
  'LIGHT',
  'INFO',
] as const;
export type ElementKind = (typeof ELEMENT_TYPES)[number];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BUTTON_OUTLINE_KINDS = [
  'PRIMARY-OUTLINE',
  'SECONDARY-OUTLINE',
  'DARK-OUTLINE',
  'DANGER-OUTLINE',
  'WARNING-OUTLINE',
  'LIGHT-OUTLINE',
  'INFO-OUTLINE',
] as const;
export type ButtonOutlineKind = (typeof BUTTON_OUTLINE_KINDS)[number];
export type ButtonKind = ElementKind | ButtonOutlineKind | 'NONE';

export function toOutlineKind(kind: ButtonKind): ButtonOutlineKind | undefined {
  switch (kind) {
    case 'PRIMARY':
    case 'SECONDARY':
    case 'DARK':
    case 'DANGER':
    case 'WARNING':
    case 'LIGHT':
    case 'INFO':
      return `${kind}-OUTLINE`;
    case 'PRIMARY-OUTLINE':
    case 'SECONDARY-OUTLINE':
    case 'DARK-OUTLINE':
    case 'DANGER-OUTLINE':
    case 'WARNING-OUTLINE':
    case 'LIGHT-OUTLINE':
    case 'INFO-OUTLINE':
      return kind;
    case 'NONE':
      return undefined;
  }
}

export function toElementKind(kind: ButtonKind): ElementKind | undefined {
  switch (kind) {
    case 'PRIMARY':
    case 'SECONDARY':
    case 'DARK':
    case 'DANGER':
    case 'WARNING':
    case 'LIGHT':
    case 'INFO':
      return kind;
    case 'PRIMARY-OUTLINE':
    case 'SECONDARY-OUTLINE':
    case 'DARK-OUTLINE':
    case 'DANGER-OUTLINE':
    case 'WARNING-OUTLINE':
    case 'LIGHT-OUTLINE':
    case 'INFO-OUTLINE':
      return kind.replace('-OUTLINE', '') as ElementKind;
    case 'NONE':
      return undefined;
  }
}

const BS_SIZE_CLASS_MAP: { [key in ElementSize]: string } = {
  SMALL: 'btn-sm',
  MEDIUM: '',
  LARGE: 'btn-lg',
};

const BS_KIND_CLASS_MAP: { [key in ButtonKind]: string } = {
  PRIMARY: 'btn-primary',
  SECONDARY: 'btn-secondary',
  DARK: 'btn-dark',
  DANGER: 'btn-danger',
  WARNING: 'btn-warning',
  LIGHT: 'btn-light',
  INFO: 'btn-info',
  'PRIMARY-OUTLINE': 'btn-outline-primary',
  'SECONDARY-OUTLINE': 'btn-outline-secondary',
  'DARK-OUTLINE': 'btn-outline-dark',
  'DANGER-OUTLINE': 'btn-outline-danger',
  'WARNING-OUTLINE': 'btn-outline-warning',
  'LIGHT-OUTLINE': 'btn-outline-light',
  'INFO-OUTLINE': 'btn-outline-info',
  NONE: 'btn-none',
};

export function toButtonClasses(kind: ButtonKind, size: ElementSize): string {
  const btnClass = kind !== 'NONE' ? 'btn' : '';
  const sizeClass = BS_SIZE_CLASS_MAP[size];
  const kindClass = BS_KIND_CLASS_MAP[kind];
  return `${btnClass} ${sizeClass} ${kindClass}`;
}

export const ELEMENT_SIZES = ['SMALL', 'MEDIUM', 'LARGE'] as const;
export type ElementSize = (typeof ELEMENT_SIZES)[number];

export const INTERACTION_MODE = ['BUTTON', 'LINK', 'NONE'] as const;
export type InteractionMode = (typeof INTERACTION_MODE)[number];
