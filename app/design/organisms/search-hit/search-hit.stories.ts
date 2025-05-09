import { RouterTestingModule } from '@angular/router/testing';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { OverviewItem } from 'src/app/_models/overview';
import { SearchHitComponent } from './search-hit.component';

const dummyLocation: OverviewItem = {
  article_type: 'location',
  name: 'Castle Black',
  name_full: 'Castle Black - The Night’s Watch',
  description: 'The primary headquarters of the Night’s Watch',
  update_datetime: '2022-03-15',
  parent_location_details: { name: 'The Wall', pk: 123 },
  getAbsoluteRouterUrl: () => '/locations/456',
  pk: 456,
  campaign_details: { id: 567, name: 'Game of Thrones RPG' },
};

const dummyCharacter: OverviewItem = {
  article_type: 'character',
  name: 'Jon Snow',
  name_full: 'Jon Snow - The Bastard of Winterfell',
  description: 'A member of the Night’s Watch and former Lord Commander',
  update_datetime: '2022-04-01',
  player_character: true,
  images: [],
  getAbsoluteRouterUrl: () => '/characters/789',
  pk: 789,
  campaign_details: { id: 567, name: 'Game of Thrones RPG' },
};

const dummyDiaryEntry: OverviewItem = {
  article_type: 'diaryentry',
  name: 'Jon Snow - Journal Entry #1',
  name_full: 'Jon Snow - Journal Entry #1 - First Day on the Wall',
  description: 'My first day at Castle Black was...interesting',
  update_datetime: '2022-04-05',
  session_details: {
    pk: 234,
    session_number: 1,
    is_main_session: true,
    is_main_session_int: 1,
  },
  author_details: { pk: 789, name: 'Jon Snow' },
  getAbsoluteRouterUrl: () => '/diaryentries/345',
  pk: 345,
  campaign_details: { id: 567, name: 'Game of Thrones RPG' },
};

const dummyItem: OverviewItem = {
  article_type: 'item',
  name: 'Longclaw',
  name_full: 'Longclaw - The Valyrian steel sword of Jon Snow',
  description:
    'A bastard sword made of Valyrian steel, with a hilt fashioned like a wolf',
  update_datetime: '2022-04-10',
  campaign_details: { id: 567, name: 'Game of Thrones RPG' },
  getAbsoluteRouterUrl: () => '/items/890',
  pk: 890,
};

const dummySessionAudio: OverviewItem = {
  article_type: 'sessionaudio',
  name: 'Game of Thrones RPG - Session 1',
  name_full: 'Game of Thrones RPG - Session 1 - Beginning of the campaign',
  update_datetime: '2022-04-15',
  audio_url: 'https://example.com/gameofthrones-session1.mp3',
  download_url: 'https://example.com/gameofthrones-session1-download.mp3',
  session_details: {
    pk: 234,
    session_number: 1,
    is_main_session: true,
    is_main_session_int: 1,
  },
  getAbsoluteRouterUrl: () => '/session-audios/901',
  pk: 901,
  campaign_details: { id: 567, name: 'Game of Thrones RPG' },
};

const dummyEncounter: OverviewItem = {
  article_type: 'encounter',
  name: 'Ambush in the Kingsroad',
  name_full: 'Ambush in the Kingsroad - A band of bandits attack the party',
  description:
    'The party is ambushed while travelling on the Kingsroad, by a group of bandits led by a dangerous outlaw',
  update_datetime: '2022-04-20',
  icon: 'swords-crossed',
  campaign_details: { id: 567, name: 'Game of Thrones RPG' },
  getAbsoluteRouterUrl: () => '/encounters/123',
  pk: 123,
};

const dummySpell: OverviewItem = {
  article_type: 'spell',
  name: 'Fireball',
  name_full: 'Fireball - A powerful explosion of fire',
  description:
    'A spell that creates a powerful explosion of fire, causing damage to all creatures within a certain area',
  update_datetime: '2022-04-25',
  campaign_details: { id: 789, name: 'Dungeons and Dragons' },
  getAbsoluteRouterUrl: () => '/spells/234',
  pk: 234,
};

const dummyRule: OverviewItem = {
  article_type: 'rule',
  name: 'Critical Hits and Misses',
  name_full:
    'Critical Hits and Misses - Rules for critical hits and misses in combat',
  description:
    'A set of rules for determining the effects of critical hits and misses during combat',
  update_datetime: '2022-04-30',
  campaign_details: { id: 789, name: 'Dungeons and Dragons' },
  getAbsoluteRouterUrl: () => '/rules/567',
  pk: 567,
};

const dummyQuest: OverviewItem = {
  article_type: 'quest',
  name: 'The Black Knight',
  name_full: 'The Black Knight - A quest to defeat a powerful undead warrior',
  description:
    'The players are hired to find and defeat the Black Knight, a powerful undead warrior who is terrorizing the countryside',
  update_datetime: '2022-05-10',
  campaign_details: { id: 456, name: 'Medieval Fantasy RPG' },
  getAbsoluteRouterUrl: () => '/quests/345',
  pk: 345,
};

const dummyOrganization: OverviewItem = {
  article_type: 'organization',
  name: 'The Thieves Guild',
  name_full: 'The Thieves Guild - A secret organization of skilled thieves',
  description:
    'The Thieves Guild is a secret organization of skilled thieves, who operate in the shadows and have their own code of honor',
  update_datetime: '2022-05-15',
  campaign_details: { id: 456, name: 'Medieval Fantasy RPG' },
  getAbsoluteRouterUrl: () => '/organizations/678',
  pk: 678,
};

const dummyCreature = {
  article_type: 'creature',
  name: 'Beholder',
  name_full:
    'Beholder - A monstrous creature with numerous eyes and deadly abilities',
  description:
    'The Beholder is a monstrous creature with a large central eye and numerous smaller eyes around its head, each with a different deadly ability',
  update_datetime: '2022-05-20',
  campaign_details: { id: 789, name: 'Dungeons and Dragons' },
  getAbsoluteRouterUrl: () => '/creatures/901',
  pk: 901,
};

export default {
  title: 'DesignSystem/Organisms/SearchHitComponent',
  component: SearchHitComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    }),
  ],
  args: {
    article: dummyCharacter,
  },
} as Meta<SearchHitComponent>;

const Template: StoryFn<SearchHitComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const Default = Template.bind({});
Default.args = {};

export const Location = Template.bind({});
Location.args = {
  article: dummyLocation,
};

export const DiaryEntry = Template.bind({});
DiaryEntry.args = {
  article: dummyDiaryEntry,
};

export const Encounter = Template.bind({});
Encounter.args = {
  article: dummyEncounter,
};

export const Item = Template.bind({});
Item.args = {
  article: dummyItem,
};

export const SessionAudio = Template.bind({});
SessionAudio.args = {
  article: dummySessionAudio,
};

export const Rule = Template.bind({});
Rule.args = {
  article: dummyRule,
};

export const Spell = Template.bind({});
Spell.args = {
  article: dummySpell,
};

export const Quest = Template.bind({});
Quest.args = {
  article: dummyQuest,
};

export const Organization = Template.bind({});
Organization.args = {
  article: dummyOrganization,
};

export const Creature = Template.bind({});
Creature.args = {
  article: dummyCreature,
};
