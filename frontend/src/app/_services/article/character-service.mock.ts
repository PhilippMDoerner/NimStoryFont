import { Observable, of } from 'rxjs';
import { CharacterDetails } from 'src/app/_models/character';
import { OverviewItem } from 'src/app/_models/overview';
import { CharacterService } from './character.service';

export const dummyOverviewCharacters: OverviewItem[] = [
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

export const dummyCharacter: CharacterDetails = {
  pk: 100,
  getAbsoluteRouterUrl: () => '/dummy/url',
  player_character: false,
  alive: true,
  name: 'Gandalf',
  title: 'Gandalf the Grey',
  gender: 'Male',
  race: 'Maia',
  description:
    'A wise and powerful wizard, Gandalf the Grey is a member of the Fellowship of the Ring and a key figure in the fight against the Dark Lord Sauron.',
  creation_datetime: '2023-04-22T12:00:00.000Z',
  update_datetime: '2023-04-23T12:00:00.000Z',
  organizations: [
    {
      pk: 1,
      name: 'The White Council',
      organization_id: 1,
      role: 'Member',
    },
    {
      pk: 2,
      name: 'The Fellowship of the Ring',
      organization_id: 2,
      role: 'Member',
    },
  ],
  current_location: 3,
  current_location_details: {
    pk: 3,
    name_full: 'Moria',
    parent_location: 'Middle-earth',
  },
  items: [
    {
      pk: 1,
      name: 'Glamdring',
    },
    {
      pk: 2,
      name: 'Staff',
    },
  ],
  encounters: [
    {
      name: 'The Council of Elrond',
      creation_datetime: '2023-04-22T12:00:00.000Z',
      update_datetime: '2023-04-23T12:00:00.000Z',
      title: 'Council of Elrond',
      diaryentry: 50,
      order_index: 20,
      encounterConnections: [
        {
          pk: 1,
          encounter: 2,
          character: 3,
        },
        {
          pk: 2,
          encounter: 3,
          character: 4,
        },
      ],
      description:
        'At the Council of Elrond, Gandalf reveals the true nature of the One Ring and urges the Fellowship to destroy it in the fires of Mount Doom.',
      pk: 1,
      campaign_details: { name: 'Aldrune', id: 1 },
    },
    {
      name: "The Battle of Helm's Deep",
      title: "The Battle of Helm's Deep",
      diaryentry: 20,
      order_index: 30,
      creation_datetime: '2023-04-23T12:00:00.000Z',
      update_datetime: '2023-04-24T12:00:00.000Z',
      encounterConnections: [
        {
          pk: 324,
          encounter: 223,
          encounter_details: {
            name: 'Main Session 6 - A new job',
            name_full: 'Main Session 6 - A new job',
            pk: 223,
          },
          character: 43,
          character_details: {
            name: 'Aliana Sterent',
            name_full: 'Aliana Sterent',
            pk: 43,
          },
        },
        {
          pk: 325,
          encounter: 223,
          encounter_details: {
            name: 'Main Session 6 - A new job',
            name_full: 'Main Session 6 - A new job',
            pk: 223,
          },
          character: 29,
          character_details: {
            name: 'Ateula',
            name_full: 'Ateula',
            pk: 29,
          },
        },
      ],
      description:
        "Gandalf arrives at Helm's Deep with reinforcements and turns the tide of the battle against Saruman's forces.",
      pk: 2,
      campaign_details: { name: 'Aldrune', id: 1 },
    },
  ],
  images: [],
  player_class_connections: [
    {
      pk: 1,
      player_class: 8,
      character: 5,
      player_class_details: {
        update_datetime: '2023-04-24T12:00:00.000Z',
        name: 'Paladin',
        pk: 8,
      },
    },
  ],
  campaign: 1,
  campaign_details: {
    id: 1,
    name: 'The War of the Ring',
  },
};

export class CharacterServiceMock implements Partial<CharacterService> {
  campaignList(): Observable<OverviewItem[]> {
    return of(dummyOverviewCharacters);
  }
}
