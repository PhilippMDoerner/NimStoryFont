import { MapMarker } from 'src/app/_models/mapMarker';

export const dummyMarkers: MapMarker[] = [
  {
    getAbsoluteRouterUrl: () => '/marker1/url',
    pk: 106,
    color: undefined,
    icon: undefined,
    longitude: 532,
    latitude: 553,
    map: 2,
    map_details: {
      name: 'The World',
    },
    location: 50,
    location_details: {
      name: 'Galway',
      description:
        "<p>The New Capital of Fen's High Kingdom</p>\n<p>&nbsp;</p>\n<p>Galway City Breakdown</p>\n<p>Eastern Lakeway - 15 Buildings<br />Western Lakeway - 40 Buildings<br />Myria Island - 7 Buildings<br />River District - 46 Buildings, several temporary Refugee Shelters<br />Forest District - 85 Buildings<br />Hill District - 149 Buildings<br />Galway Proper - 60 Buildings</p>\n<p>Total - 402 Civilian Buildings in Galway</p>\n<p>Estimated Population: 4000+</p>",
      parent_location_name: 'none',
      sublocations: [],
    },
    type: 11,
    type_details: {
      campaign_id: undefined,
      name: 'Settlement',
      icon: 'home',
      is_text_marker: false,
      fontawesome_type: 'fa',
      color: 'lightgreen',
      id: 11,
      update_datetime: '2021-07-27T15:28:05.887185Z',
      creation_datetime: '2021-07-03T17:56:33.339291Z',
    },
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/marker2/url',
    pk: 137,
    color: undefined,
    icon: undefined,
    longitude: 752,
    latitude: 579,
    map: 2,
    map_details: {
      name: 'The World',
    },
    location: 206,
    location_details: {
      name: 'Eastern sea',
      description:
        '<p>The ocean east of Aldrune, now accessible through the path carved by the world serpent.</p>',
      parent_location_name: 'none',
      sublocations: ['Lighthouse'],
    },
    type: 23,
    type_details: {
      campaign_id: 1,
      name: 'Sea/Ocean',
      icon: 'water',
      is_text_marker: true,
      fontawesome_type: 'fa',
      color: 'gray',
      id: 23,
      update_datetime: '2021-07-27T15:28:05.887185Z',
      creation_datetime: '2021-07-03T17:56:33.339291Z',
    },
    campaign_details: { name: 'Aldrune', id: 1 },
  },
];
