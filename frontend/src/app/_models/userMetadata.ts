import { KeyCombination } from './hotkey';

export interface MetaDataEntryRaw<T = string> {
  name: string;
  value: T;
  category: MetaDataKind;
}

export type MetaDataEntry<T = string> = MetaDataEntryRaw<T> & {
  id?: number;
};

const META_DATA_KINDS = ['general', 'shortcut'] as const;
export const metaDataKinds = new Set<string>(META_DATA_KINDS);
export type MetaDataKind = (typeof META_DATA_KINDS)[number];

export interface GeneralMetadata {
  hasSeenOnboarding: boolean;
}

export const generalMetaDataKeys: Set<string> = new Set<keyof GeneralMetadata>([
  'hasSeenOnboarding',
]);

export type ShortcutMetadataEntry = MetaDataEntry<KeyCombination>;

export const SHORTCUT_KEY_SEPARATOR = '-';
