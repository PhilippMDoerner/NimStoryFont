import { RouterTestingModule } from '@angular/router/testing';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { DiaryEntry } from 'src/app/_models/diaryentry';
import { Encounter } from 'src/app/_models/encounter';
import { OverviewItem } from 'src/app/_models/overview';
import { FORMLY_MODULE } from 'src/app/_modules/formly_constants';
import { DiaryentryComponent } from './diaryentry.component';

const dummyEncounters: Encounter[] = [
  {
    pk: 1,
    description: `
      <p>In this <strong>epic encounter</strong>, the adventurers find themselves facing a fearsome <em>red dragon</em> deep within the twisting caverns of the mountains. The air is thick with the stench of sulfur as the dragon's massive form looms before them, its scales glinting in the flickering light of the torches.</p>

      <p>The dragon roars, its fiery breath scorching the stone walls and causing the ground to tremble beneath the adventurers' feet. But they stand firm, weapons at the ready, knowing that this is the moment they have been training for.</p>

      <p>The battle is fierce, with the dragon lashing out with razor-sharp claws and blasting the adventurers with jets of searing flame. But they are determined to prevail, and with each blow they strike, they chip away at the dragon's armor and weaken its resolve.</p>

      <p>Finally, with a mighty roar, the dragon falls, its lifeless body crashing to the ground in a thunderous heap. The adventurers are battered and bruised, but they emerge victorious, their spirits lifted by the knowledge that they have faced one of the greatest challenges of their lives and emerged triumphant.</p>
    `,
    encounterConnections: [
      {
        pk: 1,
        encounter: 1,
        encounter_details: {
          name: 'Dragon',
          name_full: 'Red Dragon',
          pk: 1,
        },
        character: 1,
        character_details: {
          name: 'Adventurer',
          name_full: 'Adventurer One',
          pk: 1,
        },
      },
      {
        pk: 2,
        encounter: 1,
        encounter_details: {
          name: 'Dragon',
          name_full: 'Red Dragon',
          pk: 1,
        },
        character: 2,
        character_details: {
          name: 'Adventurer',
          name_full: 'Adventurer Two',
          pk: 2,
        },
      },
      {
        pk: 1,
        encounter: 4,
        encounter_details: {
          name: 'Goblin Ambush',
          name_full: 'Goblin Ambush',
          pk: 4,
        },
        character: 4,
        character_details: {
          name: 'Warrior',
          name_full: 'Warrior Four',
          pk: 4,
        },
      },
      {
        pk: 1,
        encounter: 5,
        encounter_details: {
          name: 'Treasure Hunt',
          name_full: 'Treasure Hunt',
          pk: 5,
        },
        character: 5,
        character_details: {
          name: 'Wizard',
          name_full: 'Wizard Five',
          pk: 5,
        },
      },
      {
        pk: 1,
        encounter: 6,
        encounter_details: {
          name: 'Orc Battle',
          name_full: 'Orc Battle',
          pk: 6,
        },
        character: 6,
        character_details: {
          name: 'Ranger',
          name_full: 'Ranger Six',
          pk: 6,
        },
      },
      {
        pk: 1,
        encounter: 7,
        encounter_details: {
          name: 'Bandit Raid',
          name_full: 'Bandit Raid',
          pk: 7,
        },
        character: 7,
        character_details: {
          name: 'Paladin',
          name_full: 'Paladin Seven',
          pk: 7,
        },
      },
    ],
    location: 1,
    location_details: {
      name: 'Cave',
      pk: 1,
      name_full: 'Cave of the Red Dragon',
      parent_location_name: 'Mountains',
    },
    title: "The Battle of the Red Dragon's Lair",
    diaryentry: 1,
    diaryentry_details: {
      author_name: 'Dungeon Master',
      is_main_session: 1,
      session_number: 1,
    },
    order_index: 1,
    name: 'Encounter 1',
    creation_datetime: '2022-04-23T12:34:56.789Z',
    update_datetime: '2022-04-23T12:34:56.789Z',
    campaign: 1,
    campaign_details: {
      id: 1,
      name: 'Campaign 1',
    },
    getAbsoluteRouterUrl: () => '/encounters/1/',
  },
  {
    pk: 2,
    description: `
      <p>A group of adventurers are hired to retrieve a stolen artifact from a well-guarded tomb. The tomb is filled with traps and monsters, but the adventurers are determined to complete the job and earn their reward.</p>
    `,
    encounterConnections: [
      {
        pk: 1,
        encounter: 2,
        encounter_details: {
          name: 'Tomb',
          name_full: 'The Tomb of the Lost Artifact',
          pk: 2,
        },
        character: 1,
        character_details: {
          name: 'Rogue',
          name_full: 'Rogue One',
          pk: 1,
        },
      },
      {
        pk: 2,
        encounter: 2,
        encounter_details: {
          name: 'Tomb',
          name_full: 'The Tomb of the Lost Artifact',
          pk: 2,
        },
        character: 2,
        character_details: {
          name: 'Fighter',
          name_full: 'Fighter Two',
          pk: 2,
        },
      },
      {
        pk: 3,
        encounter: 2,
        encounter_details: {
          name: 'Tomb',
          name_full: 'The Tomb of the Lost Artifact',
          pk: 2,
        },
        character: 3,
        character_details: {
          name: 'Cleric',
          name_full: 'Cleric Three',
          pk: 3,
        },
      },
    ],
    location: 2,
    location_details: {
      name: 'Tomb',
      pk: 2,
      name_full: 'The Tomb of the Lost Artifact',
      parent_location_name: 'Desert',
    },
    title: 'The Tomb of the Lost Artifact',
    diaryentry: 2,
    diaryentry_details: {
      author_name: 'Dungeon Master',
      is_main_session: 1,
      session_number: 2,
    },
    order_index: 2,
    name: 'Encounter 2',
    creation_datetime: '2022-04-23T12:34:56.789Z',
    update_datetime: '2022-04-23T12:34:56.789Z',
    campaign: 1,
    campaign_details: {
      id: 1,
      name: 'Campaign 1',
    },
    getAbsoluteRouterUrl: () => '/encounters/2/',
  },
  {
    pk: 2,
    description: `
      <p>A peaceful meadow is disturbed by the sudden appearance of a swarm of angry bees. The buzzing grows louder as the bees form a whirlwind around the adventurers, stinging them fiercely. Despite the pain, the adventurers remain calm and work together to disperse the swarm.</p>
    `,
    encounterConnections: [
      {
        pk: 3,
        encounter: 2,
        encounter_details: {
          name: 'Bee Swarm',
          name_full: 'Angry Bee Swarm',
          pk: 2,
        },
        character: 3,
        character_details: {
          name: 'Bard',
          name_full: 'Bard Three',
          pk: 3,
        },
      },
      {
        pk: 4,
        encounter: 2,
        encounter_details: {
          name: 'Bee Swarm',
          name_full: 'Angry Bee Swarm',
          pk: 2,
        },
        character: 4,
        character_details: {
          name: 'Warrior',
          name_full: 'Warrior Four',
          pk: 4,
        },
      },
    ],
    location: 2,
    location_details: {
      name: 'Meadow',
      pk: 2,
      name_full: 'Meadow of the Angry Bees',
      parent_location_name: 'Forest',
    },
    title: 'The Bee Swarm Attack',
    diaryentry: 2,
    diaryentry_details: {
      author_name: 'Dungeon Master',
      is_main_session: 0,
      session_number: 2,
    },
    order_index: 2,
    name: 'Encounter 2',
    creation_datetime: '2022-04-23T13:34:56.789Z',
    update_datetime: '2022-04-23T13:34:56.789Z',
    campaign: 1,
    campaign_details: {
      id: 1,
      name: 'Campaign 1',
    },
    getAbsoluteRouterUrl: () => '/encounters/2/',
  },
];

const dummyDiaryEntry: DiaryEntry = {
  pk: 456,
  title: 'Session Recap - Orc Raid',
  author: 789,
  author_details: { pk: 789, name: 'Jane Doe' },
  session: 123,
  session_details: {
    pk: 123,
    is_main_session: true,
    session_number: 5,
    session_date: '2022-05-01',
    campaign_details: { pk: 1, name: 'Campaign of Adventures' },
    diaryentries: [
      { author_name: 'John Doe', name: 'Session Recap - Goblin Ambush' },
    ],
    creation_datetime: '2023-04-22T12:00:00.000Z',
    update_datetime: '2023-04-23T12:00:00.000Z',
    campaign: 1,
    has_recording: false,
    is_main_session_int: 1,
    end_day: 20,
    start_day: 15,
    name: 'Session Recap - Orc Raid',
    title: 'Session Recap - Orc Raid',
  },
  encounters: dummyEncounters,
  campaign_details: { pk: 1, name: 'Campaign of Adventures' },
  adjacent_diaryentries: {
    next_diaryentry: {
      author_details: { pk: 789, name: 'Jane Doe' },
      session_details: {
        pk: 124,
        is_main_session: true,
        session_number: 6,
        session_date: '2022-05-08',
        campaign_details: { pk: 1, name: 'Campaign of Adventures' },
        creation_datetime: '2023-04-22T12:00:00.000Z',
        update_datetime: '2023-04-23T12:00:00.000Z',
        campaign: 1,
        has_recording: false,
        is_main_session_int: 1,
        end_day: 20,
        start_day: 15,
        name: 'Session Recap - Orc Raid',
        title: 'Session Recap - Orc Raid',
        diaryentries: [],
      },
    },
    prior_diaryentry: {
      author_details: { pk: 789, name: 'Jane Doe' },
      session_details: {
        pk: 122,
        is_main_session: true,
        session_number: 4,
        session_date: '2022-04-24',
        campaign_details: { pk: 1, name: 'Campaign of Adventures' },
        creation_datetime: '2023-04-22T12:00:00.000Z',
        update_datetime: '2023-04-23T12:00:00.000Z',
        campaign: 1,
        has_recording: false,
        is_main_session_int: 1,
        end_day: 20,
        start_day: 15,
        name: 'Session Recap - Orc Raid',
        title: 'Session Recap - Orc Raid',
        diaryentries: [],
      },
    },
  },
  getAbsoluteRouterUrl: () => 'https://example.com/diaryentries/456',
};

const dummyCharacters: OverviewItem[] = [];

export default {
  title: 'DesignSystem/Templates/DiaryentryComponent',
  component: DiaryentryComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, FORMLY_MODULE],
      declarations: [],
    }),
  ],
  args: {
    diaryentry: dummyDiaryEntry,
    campaignCharacters: dummyCharacters,
    encounterServerModel: undefined,
    canCreate: true,
    canUpdate: true,
    canDelete: true,
  },
} as Meta<DiaryentryComponent>;

const Template: StoryFn<DiaryentryComponent> = (args) => ({
  props: {
    ...args,
    diaryentryDelete: action('diaryentryDelete'),
    encounterConnectionDelete: action('encounterConnectionDelete'),
    encounterConnectionCreate: action('encounterConnectionCreate'),
    encounterDelete: action('encounterDelete'),
    encounterUpdate: action('encounterUpdate'),
    encounterCreate: action('encounterCreate'),
    encounterCutInsert: action('encounterCutInsert'),
    encounterSwap: action('encounterSwap'),
  },
});

export const Default = Template.bind({});
Default.args = {};

export const NoPermission = Template.bind({});
NoPermission.args = {
  canDelete: false,
  canUpdate: false,
  canCreate: false,
};
