import { RouterTestingModule } from '@angular/router/testing';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { IconCardEntry } from '../_model/icon-card-list';
import { IconCardListComponent } from './icon-card-list.component';

const dummyArticles: IconCardEntry[] = [
  {
    entryType: 'CHARACTER',
    icon: 'user',
    link: 'https://example.com/characters/123',
    title: 'John Smith',
    subText: 'Level 10 Paladin',
    updateDatetime: '2022-04-28T14:30:00Z',
  },
  {
    entryType: 'CREATURE',
    icon: 'dragon',
    link: 'https://example.com/creatures/456',
    title: 'Red Dragon',
    subText: 'CR 10',
    updateDatetime: '2022-04-27T10:15:00Z',
  },
  {
    entryType: 'DIARYENTRY',
    icon: 'book-open',
    link: 'https://example.com/diary/789',
    title: 'Adventures in the Underdark',
    subText: 'Session 3',
    updateDatetime: '2022-04-26T18:00:00Z',
  },
  {
    entryType: 'ENCOUNTER',
    icon: 'dice',
    link: 'https://example.com/encounters/1234',
    title: 'Orc Ambush',
    subText: 'Difficulty: Hard',
    updateDatetime: '2022-04-25T15:30:00Z',
  },
  {
    entryType: 'ITEM',
    icon: 'magic',
    link: 'https://example.com/items/567',
    title: 'Sword of Sharpness',
    subText: 'Legendary Weapon',
    updateDatetime: '2022-04-24T12:00:00Z',
  },
  {
    entryType: 'LOCATION',
    icon: 'location-dot',
    link: 'https://example.com/locations/890',
    title: 'The Forbidden Forest',
    subText: 'Home of the Treants',
    updateDatetime: '2022-04-23T09:45:00Z',
  },
  {
    entryType: 'MAP',
    icon: 'map',
    link: 'https://example.com/maps/1234',
    title: 'World Map',
    subText: 'All regions',
    updateDatetime: '2022-04-22T17:30:00Z',
  },
  {
    entryType: 'MARKER_TYPE',
    icon: 'location-dot',
    link: 'https://example.com/markers/4567',
    title: 'City',
    subText: 'Capital of the Kingdom',
    updateDatetime: '2022-04-21T14:15:00Z',
  },
  {
    entryType: 'MARKER_TYPE_TYPE',
    icon: 'location-dot',
    link: 'https://example.com/markers/4567',
    title: 'City',
    subText: 'Capital of the Kingdom',
    updateDatetime: '2022-04-20T11:00:00Z',
  },
  {
    entryType: 'ORGANIZATION',
    icon: 'user',
    link: 'https://example.com/organizations/123',
    title: 'The Order of the Silver Hand',
    subText: 'Defenders of the Realm',
    updateDatetime: '2022-04-19T08:30:00Z',
  },
];

export default {
  title: 'DesignSystem/Organisms/IconCardListComponent',
  component: IconCardListComponent,
  args: {
    articles: dummyArticles,
    isLoading: false,
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [RouterTestingModule],
    }),
  ],
} as Meta<IconCardListComponent>;

const Template: StoryFn<IconCardListComponent> = (args) => ({
  props: {
    ...args,
    reachEndOfList: action('reachEndOfList'),
  },
});

export const Default = Template.bind({});
Default.args = {};
