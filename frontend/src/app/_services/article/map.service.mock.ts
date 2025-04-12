import { ExtendedMap } from 'src/app/_models/map';
import { OverviewItem } from 'src/app/_models/overview';
import { dummyMarkers } from './marker.service.mock';

export const dummyMap: ExtendedMap = {
  getAbsoluteRouterUrl: () => '/map/url',
  pk: 2,
  name: 'The World',
  image: '/media/Aldrune_World_1.jpg',
  icon: '/media/globe',
  creation_datetime: '2023-04-22T12:00:00.000Z',
  update_datetime: '2023-04-23T12:00:00.000Z',
  campaign: 1,
  campaign_details: {
    name: 'Aldrune',
    id: 1,
  },
  markers: dummyMarkers,
};

export const dummyMaps: OverviewItem[] = [
  {
    getAbsoluteRouterUrl: () => '/map/url1',
    article_type: 'map',
    description: 'A map of East Academy Year 2 Dorms ',
    pk: 13,
    name_full: 'East Academy Year 2 Dorms ',
    name: 'East Academy Year 2 Dorms ',
    campaign_details: { name: 'Empress-City', id: 3 },
    update_datetime: '2024-08-25T20:44:28.629572Z',
    icon: undefined,
  },
  {
    getAbsoluteRouterUrl: () => '/map/url2',
    article_type: 'map',
    description: 'A map of Forgian',
    pk: 12,
    name_full: 'Forgian',
    name: 'Forgian',
    campaign_details: { name: 'Empress-City', id: 4 },
    update_datetime: '2024-08-23T21:58:05.094772Z',
    icon: undefined,
  },
];
