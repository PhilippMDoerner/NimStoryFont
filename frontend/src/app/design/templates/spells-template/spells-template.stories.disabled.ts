import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { PlayerClass } from 'src/app/_models/playerclass';
import { Spell } from 'src/app/_models/spell';
import { FORMLY_MODULE } from 'src/app/_modules/formly_constants';
import * as all from 'tinymce/tinymce';
import { SpellsTemplateComponent } from './spells-template.component';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const x = all;

const dummySpell: Spell = {
  getAbsoluteRouterUrl: () => '/spells/1',
  spell_level: 3,
  casting_time: '1 Action',
  range: 'Self',
  components: 'VSM*',
  duration: 'Instantaneous',
  concentration: true,
  ritual: false,
  school: 'Necromancy',
  saving_throw: 'CON',
  damage: '8d6',
  description: 'You draw forth the soul of a creature you have slain...',
  player_class_connections: [
    {
      player_class: 1,
      spell: 1,
      player_class_details: {
        pk: 1,
        name: 'Wizard',
      },
    },
    {
      player_class: 2,
      spell: 1,
      player_class_details: {
        pk: 2,
        name: 'Sorcerer',
      },
    },
  ],
  pk: 123,
  name: 'Soul Cage',
  creation_datetime: '2022-04-25T12:00:00.000Z',
  update_datetime: '2022-04-25T14:30:00.000Z',
  campaign: 1,
  campaign_details: {
    id: 1,
    name: 'Tales from the Sword Coast',
  },
};

const dummySpell2: Spell = {
  getAbsoluteRouterUrl: () => '/spells/1',
  spell_level: 3,
  casting_time: '1 Action',
  range: 'Self',
  components: 'VSM*',
  duration: 'Instantaneous',
  concentration: true,
  ritual: false,
  school: 'Necromancy',
  saving_throw: 'CON',
  damage: '8d6',
  description: 'You draw forth the soul of a creature you have slain...',
  player_class_connections: [
    {
      player_class: 1,
      spell: 1,
      player_class_details: {
        pk: 1,
        name: 'Paladin',
      },
    },
  ],
  pk: 123,
  name: 'Pally spell',
  creation_datetime: '2022-04-25T12:00:00.000Z',
  update_datetime: '2022-04-25T14:30:00.000Z',
  campaign: 1,
  campaign_details: {
    id: 1,
    name: 'Tales from the Sword Coast',
  },
};

const dummyClasses: PlayerClass[] = [
  { pk: 1, name: 'Barbarian' },
  { pk: 2, name: 'Bard' },
  { pk: 3, name: 'Cleric' },
  { pk: 4, name: 'Druid' },
  { pk: 5, name: 'Fighter' },
  { pk: 6, name: 'Monk' },
  { pk: 7, name: 'Paladin' },
  { pk: 8, name: 'Ranger' },
  { pk: 9, name: 'Rogue' },
  { pk: 10, name: 'Wizard' },
];

export default {
  title: 'DesignSystem/Templates/SpellsTemplateComponent',
  component: SpellsTemplateComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, NgbModule, RouterTestingModule, FORMLY_MODULE],
      declarations: [],
    }),
  ],
  args: {
    spells: [...Array(3).fill(dummySpell), dummySpell2],
    playerClasses: dummyClasses,
    canCreate: true,
    canUpdate: true,
    canDelete: true,
    serverModel: undefined,
    campaignName: 'Aldrune',
  },
} as Meta<SpellsTemplateComponent>;

const Template: StoryFn<SpellsTemplateComponent> = (args) => ({
  props: {
    ...args,
    spellDelete: action('spellDelete'),
    spellUpdate: action('spellUpdate'),
    spellCreate: action('spellCreate'),
    connectionDelete: action('connectionDelete'),
    connectionCreate: action('connectionCreate'),
  },
});

export const Default = Template.bind({});
Default.args = {};

export const NoPermissions = Template.bind({});
NoPermissions.args = {
  canUpdate: false,
  canCreate: false,
  canDelete: false,
};

export const NoSpells = Template.bind({});
NoSpells.args = {
  spells: [],
};
