import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import * as x from 'leaflet';
import { dummyMap } from 'src/app/_services/article/map.service.mock';
import { RoutingServiceMock } from 'src/app/_services/routing.mock.service';
import { RoutingService } from 'src/app/_services/routing.service';
import { NgxLeafletMapComponent } from './ngx-leaflet-map.component';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const y = x;

export default {
  title: 'DesignSystem/Organisms/NgxLeafletMapComponent',
  component: NgxLeafletMapComponent,
  decorators: [
    moduleMetadata({
      imports: [LeafletModule],
      declarations: [],
      providers: [
        {
          provide: RoutingService,
          useClass: RoutingServiceMock,
        },
      ],
    }),
  ],
  args: {
    mapData: dummyMap,
    serverUrl: 'https://www.aldrune.com',
  },
} as Meta<NgxLeafletMapComponent>;

const Template: StoryFn<NgxLeafletMapComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const Default = Template.bind({});
Default.args = {};
