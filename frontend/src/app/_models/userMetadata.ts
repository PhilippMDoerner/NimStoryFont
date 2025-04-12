export interface MetaDataEntry {
  name: string;
  value: string;
  category: MetaDataKind;
}

const META_DATA_KINDS = ['general'] as const;
export const metaDataKinds = new Set<string>(META_DATA_KINDS);
export type MetaDataKind = (typeof META_DATA_KINDS)[number];

export interface GeneralMetadata {
  hasSeenOnboarding: boolean;
}

export const generalMetaDataKeys: Set<string> = new Set<keyof GeneralMetadata>([
  'hasSeenOnboarding',
]);
