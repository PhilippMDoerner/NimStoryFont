import { RouterTestingModule } from '@angular/router/testing';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { OverviewItem } from 'src/app/_models/overview';

import { CharacterDetails } from 'src/app/_models/character';
import { Quote } from 'src/app/_models/quote';
import { FORMLY_MODULE } from 'src/app/_modules/formly_constants';
import { RoutingServiceMock } from 'src/app/_services/routing.mock.service';
import { RoutingService } from 'src/app/_services/routing.service';
import { QuoteFieldComponent } from './quote-field.component';

const dummyQuote: Quote = {
  quote: 'In the darkest of times, the light within us shines the brightest.',
  description:
    'Said by a wise old wizard to a young hero about to embark on a perilous quest.',
  pk: 1,
  session: 3,
  creation_datetime: '2023-04-22T12:00:00.000Z',
  update_datetime: '2023-04-23T12:00:00.000Z',
  session_details: {
    pk: 3,
    is_main_session: true,
    is_main_session_int: 1,
    session_number: 3,
    session_date: '2023-04-20',
    start_day: 1,
    end_day: 5,
    name: 'The Quest for the Sacred Amulet',
    title: 'The Quest',
    creation_datetime: '2023-04-22T12:00:00.000Z',
    update_datetime: '2023-04-23T12:00:00.000Z',
    campaign: 1,
    campaign_details: {
      name: 'Aldrune',
      pk: 1,
    },
    has_recording: false,
    diaryentries: [],
  },
  encounter: 2,
  connections: [
    {
      character: 1,
      character_details: {
        pk: 1,
        name: 'Gandalf',
        name_full: 'Gandalf the Grey',
      },
      quote: 2,
      pk: 2,
    },
    {
      character: 2,
      character_details: {
        pk: 2,
        name: 'Frodo',
        name_full: 'Frodo Baggins',
      },
      quote: 3,
      pk: 3,
    },
  ],
};

const dummyCharacter: CharacterDetails = {
  getAbsoluteRouterUrl: () => '/dummy/url',
  creation_datetime: '2023-04-22T12:00:00.000Z',
  update_datetime: '2023-04-23T12:00:00.000Z',
  player_character: false,
  alive: true,
  name: 'Gandalf',
  title: 'Gandalf the Grey',
  gender: 'Male',
  race: 'Maia',
  description:
    'A wise and powerful wizard, Gandalf the Grey is a member of the Fellowship of the Ring and a key figure in the fight against the Dark Lord Sauron.',
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
  title: 'DesignSystem/Organisms/QuoteFieldComponent',
  component: QuoteFieldComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, FORMLY_MODULE],
      providers: [
        {
          provide: RoutingService,
          useClass: RoutingServiceMock,
        },
      ],
    }),
  ],
  args: {
    quote: dummyQuote,
    character: dummyCharacter,
    canCreate: true,
    canUpdate: true,
    canDelete: true,
    campaignCharacters: dummyCharacters,
  },
} as Meta<QuoteFieldComponent>;

const Template: StoryFn<QuoteFieldComponent> = (args) => ({
  props: {
    ...args,
    quoteDelete: action('quoteDelete'),
    quoteCreate: action('quoteCreate'),
    quoteUpdate: action('quoteUpdate'),
    refreshQuote: action('refreshQuote'),
    connectionDelete: action('connectionDelete'),
    connectionCreate: action('connectionCreate'),
  },
});

export const Default = Template.bind({});
Default.args = {};

export const NoPermission = Template.bind({});
NoPermission.args = {
  canCreate: false,
  canUpdate: false,
  canDelete: false,
};
