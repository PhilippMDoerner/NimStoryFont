import { ArticleObject } from './article';
import { PlayerClass } from './playerclass';

export interface SpellRaw {
  campaign: number;
  name: string;
  spell_level: number;
  casting_time: string;
  range: string;
  components: string;
  duration: string;
  concentration: boolean;
  ritual: boolean;
  school: string;
  saving_throw: string;
  damage: string;
  description: string;
}

export interface Spell extends ArticleObject {
  spell_level: number;
  casting_time: string;
  range: string;
  components: string;
  duration: string;
  concentration: boolean;
  ritual: boolean;
  school: string;
  saving_throw: string;
  damage: string;
  description: string;
  player_class_connections: SpellPlayerClassConnection[];
  pk?: number;
}

export interface SpellPlayerClassConnection {
  pk?: number;
  player_class: number;
  spell: number;
  player_class_details?: PlayerClass;
}

export const SPELL_CASTING_TIME = [
  { label: '1 Action', value: '1 Action' },
  { label: '1 Bonus Action', value: '1 Bonus Action' },
  { label: '1 Reaction', value: '1 Reaction' },
  { label: '1 Minute', value: '1 Minute' },
  { label: '10 Minutes', value: '10 Minutes' },
  { label: '1 Hour', value: '1 Hour' },
  { label: '8 Hours', value: '8 Hours' },
  { label: '12 Hours', value: '12 Hours' },
  { label: '24 Hours', value: '24 Hours' },
];

export const SPELL_SAVES = [
  { value: 'ATK', label: 'Attack' },
  { value: 'STR', label: 'Strength' },
  { value: 'CON', label: 'Constitution' },
  { value: 'DEX', label: 'Dexterity' },
  { value: 'INT', label: 'Intelligence' },
  { value: 'WIS', label: 'Wisdom' },
  { value: 'CHA', label: 'Charisma' },
];

export const SPELL_LEVELS = [
  { value: 0, label: 'Cantrip' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
];

export const SPELL_DURATION = [
  { value: 'Instantaneous', label: 'Instantaneous' },
  { value: '1 Round', label: '1 Round' },
  { value: '6 Rounds', label: '6 Rounds' },
  { value: '1 Minute', label: '1 Minute' },
  { value: '10 Minutes', label: '10 Minutes' },
  { value: '1 Hour', label: '1 Hour' },
  { value: '2 Hours', label: '2 Hours' },
  { value: '8 Hours', label: '8 Hours' },
  { value: '24 Hours', label: '24 Hours' },
  { value: '1 Day', label: '1 Day' },
  { value: '7 Day', label: '7 Days' },
  { value: '10 Day', label: '10 Days' },
  { value: '30 Day', label: '30 Days' },
  { value: 'Special', label: 'Special' },
  { value: 'Until Dispelled', label: 'Until Dispelled' },
];

export const SPELL_RANGES = [
  { value: 'Self', label: 'Self' },
  { value: '5 Feet', label: '5 Feet' },
  { value: '10 Feet', label: '10 Feet' },
  { value: '15 Feet', label: '15 Feet' },
  { value: '30 Feet', label: '30 Feet' },
  { value: '60 Feet', label: '60 Feet' },
  { value: '90 Feet', label: '90 Feet' },
  { value: '100 Feet', label: '100 Feet' },
  { value: '120 Feet', label: '120 Feet' },
  { value: '150 Feet', label: '150 Feet' },
  { value: '1 Mile', label: '1 Mile' },
  { value: '3 Miles', label: '3 Miles' },
  { value: '10 Miles', label: '10 Miles' },
];

export const SPELL_COMPONENTS = [
  { value: 'V', label: 'V' },
  { value: 'S', label: 'S' },
  { value: 'M', label: 'M' },
  { value: 'VS', label: 'VS' },
  { value: 'VM', label: 'VM' },
  { value: 'SM', label: 'SM' },
  { value: 'VSM', label: 'VSM' },
  { value: 'VSM*', label: 'VSM*' },
];

export const SPELL_SCHOOLS = [
  { value: 'Abjuration', label: 'Abjuration' },
  { value: 'Conjuration', label: 'Conjuration' },
  { value: 'Divination', label: 'Divination' },
  { value: 'Enchantment', label: 'Enchantment' },
  { value: 'Evocation', label: 'Evocation' },
  { value: 'Illusion', label: 'Illusion' },
  { value: 'Necromancy', label: 'Necromancy' },
  { value: 'Transmutation', label: 'Transmutation' },
];
