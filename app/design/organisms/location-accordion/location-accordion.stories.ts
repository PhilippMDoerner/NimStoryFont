import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { Location } from 'src/app/_models/location';
import { FORMLY_MODULE } from 'src/app/_modules/formly_constants';
import { dummyOverviewCharacters } from 'src/app/_services/article/character-service.mock';
import { RoutingServiceMock } from 'src/app/_services/routing.mock.service';
import { RoutingService } from 'src/app/_services/routing.service';
import { LocationAccordionComponent } from './location-accordion.component';

const dummyLocations: Location[] = [
  {
    creation_datetime: '2022-03-15T10:22:34.567Z',
    update_datetime: '2022-05-01T14:12:45.678Z',
    name: 'The Dark Forest',
    name_full: 'The Dark Forest',
    description:
      '<p>The Dark Forest is a dense, sprawling forest shrouded in perpetual mist and darkness. It is said that those who enter the forest are never seen again, their screams echoing through the trees for eternity.</p><p>Legends speak of ancient curses and malevolent spirits haunting the forest, and travelers are warned to stay away. However, some brave or foolish souls venture into the forest in search of rare herbs and magical artifacts, risking life and limb to uncover its secrets.</p><p>Rumors also abound of a hidden village deep within the forest, where a secretive society of druids and witches practice forbidden magic and worship dark deities.</p>',
    parent_location: 1,
    campaign: 1,
    campaign_details: {
      id: 1,
      name: 'The War of the Ring',
    },
    images: [],
    parent_location_details: {
      pk: 1,
      name: 'The Kingdom of Eldrid',
      parent_location: '',
      name_full: 'The Kingdom of Eldrid',
    },
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
        campaign: 1,
        campaign_details: {
          id: 1,
          name: 'The War of the Ring',
        },
        name: "The Witch's Hut",
        pk: 789,
        characters: [
          { name: 'Morgana', pk: 234, name_full: 'Morgana, the Dark Witch' },
        ],
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
  },
  {
    name: "Dragon's Lair",
    name_full: "Dragon's Lair",
    description:
      "<p>The Dragon's Lair is a massive cavern deep within a mountain range, filled with glittering treasures and the bones of unlucky adventurers. The lair is home to a powerful dragon, feared throughout the land for its fiery breath and razor-sharp claws.</p><p>Legends say that the dragon guards a magical artifact of immense power, capable of granting wishes or unleashing destruction upon the world. Many brave heroes have attempted to slay the dragon and claim the artifact, but none have returned alive.</p><p>The lair itself is a maze of twisting tunnels and treacherous traps, with pools of lava and poisonous gas waiting to ensnare the unwary. Only the bravest and most skilled adventurers stand a chance of surviving the dragon's deadly lair.</p>",
    parent_location: 2,
    images: [],
    parent_location_details: {
      pk: 2,
      name: 'The Kingdom of Aloria',
      parent_location: '',
      name_full: 'The Kingdom of Aloria',
    },
    campaign: 1,
    campaign_details: {
      id: 1,
      name: 'The War of the Ring',
    },
    creation_datetime: '2023-01-01T09:00:00.000Z',
    update_datetime: '2023-01-01T09:00:00.000Z',
    parent_location_list: ['The Kingdom of Aloria', 'The Mountains of Doom'],
    characters: [
      { name: 'Gareth', pk: 345, name_full: 'Gareth, the Dragonslayer' },
      { name: 'Kaida', pk: 678, name_full: 'Kaida, the Fire Mage' },
    ],
    sublocations: [
      {
        creation_datetime: '2022-06-10T09:15:23.456Z',
        update_datetime: '2022-06-10T09:15:23.456Z',
        name: "The Dragon's Hoard",
        pk: 890,
        characters: [
          { name: 'Smaug', pk: 123, name_full: 'Smaug, the Dragon' },
        ],
        campaign: 1,
        campaign_details: {
          id: 1,
          name: 'The War of the Ring',
        },
        name_full: "The Dragon's Hoard in the Dragon's Lair",
        description:
          "<p>The Dragon's Hoard is a vast chamber filled with gold, jewels, and magical artifacts, all stolen from hapless adventurers and nearby kingdoms. The hoard is guarded by Smaug, the fearsome dragon, who sleeps atop a massive pile of treasure.</p><p>Many have attempted to steal from the hoard, but none have succeeded. The hoard is protected by magical wards and traps, and Smaug is always watching, ready to unleash his fiery wrath upon any intruders.</p>",
        parent_location: 6,
        getAbsoluteRouterUrl: () => '/locations/the-kingdom-of-eldrid',
      },
    ],
    marker_details: [
      {
        map: 'The Kingdom of Aloria',
        map_icon: 'https://example.com/dragons-lair-icon.png',
      },
    ],
    getAbsoluteRouterUrl: () => '/locations/the-kingdom-of-eldrid',
    getAbsoluteRouterUrlForParentLocation: () =>
      '/locations/the-kingdom-of-aloria',
  },
  {
    name: 'The Black Tower',
    name_full: 'The Black Tower',
    description:
      '<p>The Black Tower looms high above the surrounding forest, casting a long shadow over the land. It is said to be the home of an ancient sorcerer, who uses dark magic to control the minds of his enemies.</p><p>Many brave warriors have tried to storm the tower and defeat the sorcerer, but few have returned. The tower is guarded by powerful spells and fierce creatures, making it an almost impenetrable fortress.</p><p>Despite its ominous reputation, some say that the sorcerer is not evil, but merely misunderstood. Others claim that he possesses untold wealth and knowledge, making the risk of attempting to enter the tower worth the reward.</p>',
    parent_location: 4,
    images: [],
    creation_datetime: '2023-01-01T09:00:00.000Z',
    update_datetime: '2023-01-01T09:00:00.000Z',
    campaign: 1,
    campaign_details: {
      id: 1,
      name: 'The War of the Ring',
    },
    parent_location_details: {
      pk: 4,
      name: 'The Kingdom of Norgard',
      parent_location: '',
      name_full: 'The Kingdom of Norgard',
    },
    parent_location_list: ['The Kingdom of Norgard'],
    characters: [
      { name: 'Aria', pk: 345, name_full: 'Aria, the Enchantress' },
      { name: 'Garrick', pk: 678, name_full: 'Garrick, the Dark Knight' },
    ],
    sublocations: [
      {
        creation_datetime: '2023-01-01T09:00:00.000Z',
        update_datetime: '2023-01-01T09:00:00.000Z',
        name: "The Sorcerer's Study",
        pk: 890,
        characters: [
          { name: 'Zoltar', pk: 123, name_full: 'Zoltar, the Sorcerer' },
        ],
        campaign: 1,
        campaign_details: {
          id: 1,
          name: 'The War of the Ring',
        },
        name_full: "The Sorcerer's Study in the Black Tower",
        description:
          'A dark and musty room filled with dusty tomes and strange artifacts.',
        parent_location: 6,
        getAbsoluteRouterUrl: () => '/locations/the-kingdom-of-eldrid',
      },
    ],
    marker_details: [
      {
        map: 'The Kingdom of Norgard',
        map_icon: 'https://example.com/black-tower-icon.png',
      },
    ],
    getAbsoluteRouterUrl: () => '/locations/the-kingdom-of-eldrid',
    getAbsoluteRouterUrlForParentLocation: () =>
      '/locations/the-kingdom-of-norgard',
  },
];

export default {
  title: 'DesignSystem/Organisms/LocationAccordionComponent',
  component: LocationAccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, BrowserAnimationsModule, FORMLY_MODULE],
      providers: [
        {
          provide: RoutingService,
          useClass: RoutingServiceMock,
        },
      ],
    }),
  ],
  args: {
    locations: dummyLocations,
    campaignCharacters: dummyOverviewCharacters,
    canCreate: true,
    campaignName: 'Aldrune',
  },
} as Meta<LocationAccordionComponent>;

const Template: StoryFn<LocationAccordionComponent> = (args) => ({
  props: {
    ...args,
    connectionDelete: action('connectionDelete'),
    connectionCreate: action('connectionCreate'),
    encounterDelete: action('encounterDelete'),
    encounterUpdate: action('encounterUpdate'),
  },
});

export const Default = Template.bind({});
Default.args = {};

export const NoPermissions = Template.bind({});
NoPermissions.args = {
  canCreate: false,
};

export const NoLocations = Template.bind({});
NoLocations.args = {
  locations: [],
};
