import { RouterTestingModule } from '@angular/router/testing';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { Location } from 'src/app/_models/location';
import { FORMLY_MODULE } from 'src/app/_modules/formly_constants';
import { LocationTemplateComponent } from './location-template.component';

const dummyLocation: Location = {
  getAbsoluteRouterUrl: () => 'location/2',
  name_full: 'Central Park',
  name: 'Central Park',
  description: 'A large public park in New York City.',
  parent_location: 456,
  creation_datetime: '2022-05-06T09:30:00.000Z',
  update_datetime: '2022-05-06T10:15:00.000Z',
  campaign: 1,
  campaign_details: { id: 1, name: 'Campaign of Adventures' },
  images: [
    {
      pk: 1,
      image: '/breeds/mastiff-tibetan/n02108551_5830.jpg',
      name: 'Goblin portrait',
      creature_article: 123,
    },
    {
      pk: 2,
      image: '/breeds/germanshepherd/IMG_20200801_005830_387.jpg',
      name: 'Goblin horde',
      creature_article: 123,
    },
  ],
  parent_location_details: {
    pk: 456,
    name: 'New York City',
    parent_location: 'United States',
    name_full: 'New York City, United States',
  },
  parent_location_list: ['United States', 'New York City'],
  characters: [
    { name: 'John Smith', pk: 789, name_full: 'John Smith' },
    { name: 'Jane Doe', pk: 987, name_full: 'Jane Doe' },
  ],
  sublocations: [
    {
      creation_datetime: '2022-05-06T09:30:00.000Z',
      update_datetime: '2022-05-06T10:15:00.000Z',
      name: 'The Pond',
      pk: 124,
      characters: [
        { name: 'Bob Johnson', pk: 456, name_full: 'Bob Johnson' },
        { name: 'Alice Williams', pk: 654, name_full: 'Alice Williams' },
      ],
      name_full: 'The Pond, Central Park',
      description: 'A small body of water in Central Park.',
      getAbsoluteRouterUrl: () => '/location/1',
      campaign: 1,
      campaign_details: { name: 'The War of the Ring', id: 1 },
    },
  ],
  marker_details: [
    { map: 'map1', map_icon: 'icon1' },
    { map: 'map2', map_icon: 'icon2' },
  ],
  getAbsoluteRouterUrlForParentLocation() {
    return `https://example.com/locations/${this.parent_location}`;
  },
};

export default {
  title: 'DesignSystem/Templates/LocationTemplateComponent',
  component: LocationTemplateComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, FORMLY_MODULE],
      declarations: [],
    }),
  ],
  args: {
    imageServerModel: undefined,
    canCreate: true,
    canUpdate: true,
    canDelete: true,
    location: dummyLocation,
    serverUrl: 'https://images.dog.ceo',
  },
} as Meta<LocationTemplateComponent>;

const Template: StoryFn<LocationTemplateComponent> = (args) => ({
  props: {
    ...args,
    createImage: action('createImage'),
    deleteImage: action('deleteImage'),
    updateImage: action('updateImage'),
    locationDelete: action('locationDelete'),
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
