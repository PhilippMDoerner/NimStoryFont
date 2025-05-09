export interface PlayerClass {
  pk?: number;
  name: string;
  campaign_id?: number;
  update_datetime?: string;
}

export interface CharacterPlayerClassConnectionRaw {
  pk?: number;
  player_class: number;
  character: number;
}

export interface CharacterPlayerClassConnectionDetail {
  pk: number;
  player_class: number;
  character: number;
  player_class_details?: PlayerClass;
}

export interface SpellClassConnection {
  pk?: number;
  player_class: number;
  spell: number;
}
