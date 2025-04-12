import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { OverviewItem } from 'src/app/_models/overview';
import { QuestOverviewComponent } from './quest-overview.component';

const dummyQuests: OverviewItem[] = [
  {
    article_type: 'quest',
    name: 'The Black Knight',
    name_full: 'The Black Knight - A quest to defeat a powerful undead warrior',
    description:
      'The players are hired to find and defeat the Black Knight, a powerful undead warrior who is terrorizing the countryside',
    update_datetime: '2022-05-10',
    campaign_details: { id: 456, name: 'Medieval Fantasy RPG' },
    getAbsoluteRouterUrl: () => '/quests/345',
    pk: 345,
    taker_details: {
      name: 'Franz',
      name_full: 'Franz the warrior',
      pk: 1,
    },
    status: 'In progress',
  },
  {
    article_type: 'quest',
    name: "The Dragon's Hoard",
    name_full:
      "The Dragon's Hoard - A quest to recover a stolen treasure hoard",
    description:
      'The players must find and recover a stolen treasure hoard from a fearsome dragon who is guarding it in a remote mountain cave',
    update_datetime: '2022-05-12',
    campaign_details: { id: 456, name: 'Medieval Fantasy RPG' },
    getAbsoluteRouterUrl: () => '/quests/346',
    pk: 346,
    taker_details: {
      name: 'Gwen',
      name_full: 'Gwen the rogue',
      pk: 2,
    },
    status: 'Completed',
  },
  {
    article_type: 'quest',
    name: 'The Lost Artifact',
    name_full:
      'The Lost Artifact - A quest to recover a powerful magical artifact',
    description:
      'The players are hired to find and recover a powerful magical artifact that has been lost for centuries',
    update_datetime: '2022-05-14',
    campaign_details: { id: 456, name: 'Medieval Fantasy RPG' },
    getAbsoluteRouterUrl: () => '/quests/347',
    pk: 347,
    taker_details: {
      name: 'Lucas',
      name_full: 'Lucas the mage',
      pk: 3,
    },
    status: 'On Hold',
  },
  {
    article_type: 'quest',
    name: 'The Bandit King',
    name_full: 'The Bandit King - A quest to defeat a powerful bandit leader',
    description:
      'The players are hired to find and defeat a powerful bandit leader who has been raiding caravans and terrorizing the local towns',
    update_datetime: '2022-05-16',
    campaign_details: { id: 456, name: 'Medieval Fantasy RPG' },
    getAbsoluteRouterUrl: () => '/quests/348',
    pk: 348,
    taker_details: {
      name: 'Ella',
      name_full: 'Ella the paladin',
      pk: 4,
    },
    status: 'Failed',
  },
  {
    article_type: 'quest',
    name: 'The Abandoned Mine',
    name_full: 'The Abandoned Mine - A quest to investigate a mysterious mine',
    description:
      'The players are hired to investigate a mysterious mine that was abandoned years ago',
    update_datetime: '2022-05-20',
    campaign_details: { id: 456, name: 'Medieval Fantasy RPG' },
    getAbsoluteRouterUrl: () => '/quests/350',
    pk: 350,
    taker_details: {
      name: 'Gwen',
      name_full: 'Gwen the rogue',
      pk: 2,
    },
    status: 'In progress',
  },
  {
    article_type: 'quest',
    name: 'The Cursed Castle',
    name_full: 'The Cursed Castle - A quest to break a powerful curse',
    description:
      'The players are hired to break a powerful curse that has plagued a local castle for generations',
    update_datetime: '2022-05-22',
    campaign_details: { id: 456, name: 'Medieval Fantasy RPG' },
    getAbsoluteRouterUrl: () => '/quests/351',
    pk: 351,
    taker_details: {
      name: 'Lucas',
      name_full: 'Lucas the mage',
      pk: 3,
    },
    status: 'In progress',
  },
  {
    article_type: 'quest',
    name: 'The Goblin King',
    name_full: 'The Goblin King - A quest to defeat a powerful goblin leader',
    description:
      'The players are hired to find and defeat a powerful goblin leader who has been raiding villages and hoarding treasure',
    update_datetime: '2022-05-24',
    campaign_details: { id: 456, name: 'Medieval Fantasy RPG' },
    getAbsoluteRouterUrl: () => '/quests/352',
    pk: 352,
    taker_details: {
      name: 'Ella',
      name_full: 'Ella the paladin',
      pk: 4,
    },
    status: 'Completed',
  },
  {
    article_type: 'quest',
    name: 'The Forbidden Forest',
    name_full: 'The Forbidden Forest - A quest to explore a dangerous forest',
    description:
      'The players are hired to explore a dangerous forest that is said to be home to powerful monsters and ancient magic',
    update_datetime: '2022-05-26',
    campaign_details: { id: 456, name: 'Medieval Fantasy RPG' },
    getAbsoluteRouterUrl: () => '/quests/353',
    pk: 353,
    taker_details: {
      name: 'Franz',
      name_full: 'Franz the warrior',
      pk: 1,
    },
    status: 'On Hold',
  },
  {
    article_type: 'quest',
    name: 'The Haunted Mansion',
    name_full: 'The Haunted Mansion - A quest to investigate a haunted mansion',
    description:
      'The players are hired to investigate a haunted mansion that is said to be cursed and haunted by vengeful spirits',
    update_datetime: '2022-05-28',
    campaign_details: { id: 456, name: 'Medieval Fantasy RPG' },
    getAbsoluteRouterUrl: () => '/quests/354',
    pk: 354,
    taker_details: {
      name: 'Gwen',
      name_full: 'Gwen the rogue',
      pk: 2,
    },
    status: 'In progress',
  },
];

export default {
  title: 'DesignSystem/Templates/QuestOverviewComponent',
  component: QuestOverviewComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, BrowserAnimationsModule],
      declarations: [],
    }),
  ],
  args: {
    quests: dummyQuests,
    campaignName: 'Aldrune',
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<QuestOverviewComponent>;

const Template: StoryFn<QuestOverviewComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const Default = Template.bind({});
Default.args = {};
