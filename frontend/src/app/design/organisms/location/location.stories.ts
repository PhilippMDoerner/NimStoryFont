import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { Location, LocationCharacter } from 'src/app/_models/location';
import { OverviewItem } from 'src/app/_models/overview';
import { RoutingServiceMock } from 'src/app/_services/routing.mock.service';
import { RoutingService } from 'src/app/_services/routing.service';
import { LocationComponent } from './location.component';

const dummyLocation: Location = {
  name: 'The Dark Forest',
  name_full: 'The Dark Forest',
  description:
    '<p>The Dark Forest is a dense, sprawling forest shrouded in perpetual mist and darkness. It is said that those who enter the forest are never seen again, their screams echoing through the trees for eternity.</p><p>Legends speak of ancient curses and malevolent spirits haunting the forest, and travelers are warned to stay away. However, some brave or foolish souls venture into the forest in search of rare herbs and magical artifacts, risking life and limb to uncover its secrets.</p><p>Rumors also abound of a hidden village deep within the forest, where a secretive society of druids and witches practice forbidden magic and worship dark deities.</p>',
  parent_location: 1,
  images: [],
  campaign: 1,
  campaign_details: {
    id: 1,
    name: 'The War of the Ring',
  },
  parent_location_details: {
    pk: 1,
    name: 'The Kingdom of Eldrid',
    parent_location: '',
    name_full: 'The Kingdom of Eldrid',
  },
  creation_datetime: '2023-01-01T09:00:00.000Z',
  update_datetime: '2023-01-01T09:00:00.000Z',
  parent_location_list: ['The Kingdom of Eldrid', 'The Northern Territories'],
  characters: [
    {
      name: 'Elena',
      pk: 123,
      name_full: 'Elena, the Witch of the Dark Forest',
    },
    { name: 'Thorne', pk: 456, name_full: 'Thorne, the Shadow Assassin' },
  ],
  sublocations: [
    {
      creation_datetime: '2022-03-15T10:22:34.567Z',
      update_datetime: '2022-05-01T14:12:45.678Z',
      name: "The Witch's Hut",
      pk: 789,
      characters: [
        { name: 'Morgana', pk: 234, name_full: 'Morgana, the Dark Witch' },
      ],
      campaign: 1,
      campaign_details: {
        id: 1,
        name: 'The War of the Ring',
      },
      name_full: "The Witch's Hut in the Dark Forest",
      description: `
        <p>
          The Witch's Hut is a small, dilapidated cabin hidden deep in the heart of the Dark Forest. 
          It is said to be the dwelling place of Elena, the Witch of the Dark Forest, who brews powerful potions and performs arcane rituals within its walls.
        </p>
        
        <p>
          The hut is surrounded by twisted trees and eerie toadstools, and the air is thick with the scent of herbs and incense. 
          Visitors are warned to approach with caution, as Elena is known to be both unpredictable and dangerous.
        </p>
      `,
      parent_location: 2,
      getAbsoluteRouterUrl: () => '/locations/the-kingdom-of-eldrid',
    },
  ],
  marker_details: [
    {
      map: 'The Kingdom of Eldrid',
      map_icon: 'https://example.com/dark-forest-icon.png',
    },
  ],
  getAbsoluteRouterUrl: () => '/locations/the-kingdom-of-eldrid',
  getAbsoluteRouterUrlForParentLocation: () =>
    '/locations/the-kingdom-of-eldrid',
};

const dummyCharacters: OverviewItem[] = [
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Gandalf',
    pk: 1,
    name_full: 'Gandalf the Grey',
    player_character: true,
    images: ['https://example.com/images/lirien1.jpg'],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Frodo',
    pk: 2,
    name_full: 'Frodo Baggins',
    player_character: true,
    images: [],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Gimli',
    pk: 3,
    name_full: 'Gimli son of Glóin',
    player_character: false,
    images: [],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Legolas',
    pk: 4,
    name_full: 'Legolas Greenleaf',
    player_character: false,
    images: ['https://example.com/images/lirien1.jpg'],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Bilbo',
    pk: 5,
    name_full: 'Bilbo Baggins',
    player_character: false,
    images: [],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Aragorn',
    pk: 6,
    name_full: 'Aragorn son of Arathorn',
    player_character: false,
    images: ['https://example.com/images/lirien1.jpg'],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Saruman',
    pk: 7,
    name_full: 'Saruman the White',
    player_character: false,
    images: [],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Sif',
    pk: 18,
    name_full: 'Sif the Swift',
    description:
      'Sif is a skilled warrior known for her lightning-fast strikes and agility. She is fiercely loyal to her friends and will stop at nothing to protect them.',
    update_datetime: '2022-03-15T10:30:00.000Z',
    player_character: true,
    images: [],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Gorin',
    pk: 19,
    name_full: 'Gorin Ironfist',
    description:
      'Gorin is a dwarf from the Iron Hills, known for his strength and unwavering determination. He has a fondness for ale and a good brawl.',
    update_datetime: '2022-02-23T14:15:00.000Z',
    player_character: true,
    images: [
      'https://example.com/images/lirien1.jpg',
      'https://example.com/images/lirien1.jpg',
    ],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Lirien',
    pk: 20,
    name_full: 'Lirien Windrider',
    description:
      'Lirien is an elven archer, renowned for her skill with the bow. She is fiercely independent and often clashes with authority figures.',
    update_datetime: '2022-03-20T08:45:00.000Z',
    player_character: true,
    images: ['https://example.com/images/lirien1.jpg'],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
];

export default {
  title: 'DesignSystem/Organisms/LocationComponent',
  component: LocationComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, BrowserAnimationsModule],
      providers: [
        {
          provide: RoutingService,
          useClass: RoutingServiceMock,
        },
      ],
    }),
  ],
  args: {
    campaignCharacters: dummyCharacters,
    location: dummyLocation,
  },
} as Meta<LocationComponent>;

const Template: StoryFn<LocationComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const Default = Template.bind({});
Default.args = {};

const shortCharacterList = dummyLocation.characters?.slice(
  0,
  3,
) as LocationCharacter[];
export const FewerConnections = Template.bind({});
FewerConnections.args = {
  location: {
    ...dummyLocation,
    characters: [...shortCharacterList],
  },
};
