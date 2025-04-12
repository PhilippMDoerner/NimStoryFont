/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouterTestingModule } from '@angular/router/testing';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { ImageGridComponent } from './image-grid.component';

const dummyEntries: any[] = [
  {
    entryType: 'CHARACTER',
    icon: 'user',
    link: 'https://images.dog.ceo/breeds/schnauzer-giant/n02097130_878.jpg',
    title: 'John Smith',
    subText: 'Level 10 Paladin',
    updateDatetime: '2022-04-28T14:30:00Z',
    image: '/media/campaign_backgrounds/bg.jpg',
  },
  {
    entryType: 'CREATURE',
    icon: 'dragon',
    link: 'https://images.dog.ceo/breeds/schnauzer-giant/n02097130_878.jpg',
    title: 'Red Dragon',
    subText: 'CR 10',
    updateDatetime: '2022-04-27T10:15:00Z',
    image: '/media/campaign_backgrounds/bg.jpg',
  },
  {
    entryType: 'DIARYENTRY',
    icon: 'book-open',
    link: 'https://images.dog.ceo/breeds/schnauzer-giant/n02097130_878.jpg',
    title: 'Adventures in the Underdark',
    subText: 'Session 3',
    updateDatetime: '2022-04-26T18:00:00Z',
    image: '/media/campaign_backgrounds/bg.jpg',
  },
  {
    entryType: 'ENCOUNTER',
    icon: 'dice',
    link: 'https://images.dog.ceo/breeds/schnauzer-giant/n02097130_878.jpg',
    title: 'Orc Ambush',
    subText: 'Difficulty: Hard',
    updateDatetime: '2022-04-25T15:30:00Z',
    image: '/media/campaign_backgrounds/bg.jpg',
  },
  {
    entryType: 'ITEM',
    icon: 'magic',
    link: 'https://images.dog.ceo/breeds/schnauzer-giant/n02097130_878.jpg',
    title: 'Sword of Sharpness',
    subText: 'Legendary Weapon',
    updateDatetime: '2022-04-24T12:00:00Z',
    image: '/media/campaign_backgrounds/bg.jpg',
  },
  {
    entryType: 'LOCATION',
    icon: 'map-marker-alt',
    link: 'https://images.dog.ceo/breeds/schnauzer-giant/n02097130_878.jpg',
    title: 'The Forbidden Forest',
    subText: 'Home of the Treants',
    updateDatetime: '2022-04-23T09:45:00Z',
    image: '/media/campaign_backgrounds/bg.jpg',
  },
  {
    entryType: 'MAP',
    icon: 'map',
    link: 'https://images.dog.ceo/breeds/schnauzer-giant/n02097130_878.jpg',
    title: 'World Map',
    subText: 'All regions',
    updateDatetime: '2022-04-22T17:30:00Z',
    image: '/media/campaign_backgrounds/bg.jpg',
  },
  {
    entryType: 'MARKER_TYPE',
    icon: 'map-marker',
    link: 'https://images.dog.ceo/breeds/schnauzer-giant/n02097130_878.jpg',
    title: 'City',
    subText: 'Capital of the Kingdom',
    updateDatetime: '2022-04-21T14:15:00Z',
    image: '/media/campaign_backgrounds/bg.jpg',
  },
];

export default {
  title: 'DesignSystem/Organisms/ImageGridComponent',
  component: ImageGridComponent,
  args: {
    entries: dummyEntries,
    imageProp: 'image',
    labelProp: 'title',
    serverUrl: 'https://www.aldrune.com',
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [RouterTestingModule],
    }),
  ],
} as Meta<ImageGridComponent>;

const Template: StoryFn<ImageGridComponent> = (args) => ({
  props: {
    ...args,
    entryClick: action('entryClick'),
  },
});

export const Default = Template.bind({});
Default.args = {};

export const TwoEntries = Template.bind({});
TwoEntries.args = {
  entries: dummyEntries.slice(0, 2),
};

export const ThreeEntries = Template.bind({});
ThreeEntries.args = {
  entries: dummyEntries.slice(0, 3),
};

export const FourEntries = Template.bind({});
FourEntries.args = {
  entries: dummyEntries.slice(0, 4),
};

export const FiveEntries = Template.bind({});
FiveEntries.args = {
  entries: dummyEntries.slice(0, 5),
};
