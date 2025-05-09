import { ArticleObject } from './article';

export interface EncounterConnectionRaw {
  encounter: number;
  character: number;
  campaign: number;
}

export interface EncounterConnection {
  pk?: number;
  encounter: number;
  encounter_details?: { name: string; name_full: string; pk: number };
  character: number;
  character_details?: { name: string; name_full: string; pk: number };
}

export interface EncounterRaw {
  description: string;
  location?: number;
  title: string;
  diaryentry: number;
  order_index: number;
}

export interface Encounter extends ArticleObject {
  pk: number;
  description: string;
  encounterConnections?: EncounterConnection[];
  location: number;
  location_details?: {
    name: string;
    pk: number;
    name_full: string;
    parent_location_name: string;
  };
  title: string;
  diaryentry: number;
  diaryentry_details?: {
    author_name: string;
    is_main_session: 0 | 1;
    session_number: number;
  };
  order_index: number;
  getAbsoluteRouterUrl: () => string;
}

const ORDER_INDEX_INCREMENT = 10;
export function hasShiftedOrderIndex(
  encounter: Encounter | EncounterRaw,
): boolean {
  return encounter.order_index % ORDER_INDEX_INCREMENT > 0;
}

export function getShiftedOrderIndex(
  encounter: Encounter | EncounterRaw,
): number {
  return hasShiftedOrderIndex(encounter)
    ? encounter.order_index
    : encounter.order_index + 1;
}

export function getUnshiftedOrderIndex(
  encounter: Encounter | EncounterRaw,
): number {
  return (
    Math.floor(encounter.order_index / ORDER_INDEX_INCREMENT) *
    ORDER_INDEX_INCREMENT
  );
}

export function unshiftOrderIndex(encounter: Encounter | EncounterRaw): void {
  encounter.order_index = getUnshiftedOrderIndex(encounter);
}

export function swapOrderIndexState(encounter: Encounter): void {
  if (hasShiftedOrderIndex(encounter)) {
    unshiftOrderIndex(encounter);
  } else {
    shiftOrderIndex(encounter);
  }
}

export function shiftOrderIndex(encounter: Encounter): Encounter {
  return {
    ...encounter,
    order_index: encounter.order_index++,
  };
}

export function nextOrderIndex(encounter: Encounter | EncounterRaw) {
  return getUnshiftedOrderIndex(encounter) + ORDER_INDEX_INCREMENT;
}

export function priorOrderIndex(encounter: Encounter | EncounterRaw) {
  return getUnshiftedOrderIndex(encounter) - ORDER_INDEX_INCREMENT;
}
