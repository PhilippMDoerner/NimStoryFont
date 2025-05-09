import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import * as x from 'leaflet';
import { ExtendedMap } from 'src/app/_models/map';
import { OverviewItem } from 'src/app/_models/overview';
import { dummyMarkers } from 'src/app/_services/article/marker.service.mock';
import { MapComponent } from './map.component';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const y = x;

const dummyMap: ExtendedMap = {
  getAbsoluteRouterUrl: () => '/map/url',
  pk: 2,
  name: 'The World',
  image: '/media/Aldrune_World_1.jpg',
  icon: '/media/globe',
  update_datetime: '2021-06-26T17:10:35.352119Z',
  creation_datetime: '2021-06-26T17:10:35.352119Z',
  campaign: 1,
  campaign_details: {
    name: 'Aldrune',
    id: 1,
  },
  markers: dummyMarkers,
};

const mapChoices: OverviewItem[] = [
  {
    getAbsoluteRouterUrl: () => '/map/1',
    article_type: 'map',
    description: 'A map of Aldrune',
    pk: 1,
    name_full: 'Aldrune',
    name: 'Aldrune',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-06-26T17:10:35.352119Z',
    icon: '/media/map',
  },
  {
    getAbsoluteRouterUrl: () => '/map/5',
    article_type: 'map',
    description: 'A map of Bug-people map',
    pk: 5,
    name_full: 'Bug-people map',
    name: 'Bug-people map',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-07-24T15:25:48.488498Z',
    icon: '/media/sun-o',
  },
  {
    getAbsoluteRouterUrl: () => '/map/4',
    article_type: 'map',
    description: 'A map of Etruscan',
    pk: 4,
    name_full: 'Etruscan',
    name: 'Etruscan',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-06-26T17:10:35.352119Z',
    icon: '/media/university',
  },
  {
    getAbsoluteRouterUrl: () => '/map/8',
    article_type: 'map',
    description: 'A map of Guiniverse Magical Worldmap',
    pk: 8,
    name_full: 'Guiniverse Magical Worldmap',
    name: 'Guiniverse Magical Worldmap',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-10-13T20:21:11.923497Z',
    icon: '/media/globe',
  },
  {
    getAbsoluteRouterUrl: () => '/map/6',
    article_type: 'map',
    description: 'A map of Land of the dead',
    pk: 6,
    name_full: 'Land of the dead',
    name: 'Land of the dead',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-08-10T19:03:46.874796Z',
    icon: '/media/skull-crossbones',
  },
  {
    getAbsoluteRouterUrl: () => '/map/3',
    article_type: 'map',
    description: 'A map of The Galway Region',
    pk: 3,
    name_full: 'The Galway Region',
    name: 'The Galway Region',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-06-26T17:10:35.352119Z',
    icon: '/media/lightbulb-o',
  },
  {
    getAbsoluteRouterUrl: () => '/map/2',
    article_type: 'map',
    description: 'A map of The World',
    pk: 2,
    name_full: 'The World',
    name: 'The World',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-06-26T17:10:35.352119Z',
    icon: '/media/globe',
  },
];
export default {
  title: 'DesignSystem/Templates/MapComponent',
  component: MapComponent,
  decorators: [
    moduleMetadata({
      imports: [LeafletModule, RouterTestingModule, BrowserAnimationsModule],
      declarations: [],
    }),
  ],
  args: {
    map: dummyMap,
    serverUrl: 'https://www.aldrune.com',
    canCreate: true,
    canUpdate: true,
    canDelete: true,
    mapChoices: mapChoices,
  },
} as Meta<MapComponent>;

const Template: StoryFn<MapComponent> = (args) => ({
  props: {
    ...args,
    mapDelete: action('mapDelete'),
    mapChange: action('mapChange'),
  },
});

export const Default = Template.bind({});
Default.args = {};

export const NoMap = Template.bind({});
NoMap.args = {
  mapChoices: [],
};

export const NoPermission = Template.bind({});
NoPermission.args = {
  canDelete: false,
  canUpdate: false,
  canCreate: false,
};
