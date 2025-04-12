import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import * as x from 'leaflet';
import { MapMarker } from 'src/app/_models/mapMarker';
import { dummyMarkers } from 'src/app/_services/article/marker.service.mock';
import { MarkerComponent } from './marker.component';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const y = x;

const dummyMarker: MapMarker = dummyMarkers[0];

export default {
  title: 'DesignSystem/Templates/MarkerComponent',
  component: MarkerComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, BrowserAnimationsModule],
      declarations: [],
    }),
  ],
  args: {
    marker: dummyMarker,
    canUpdate: true,
    canDelete: true,
  },
} as Meta<MarkerComponent>;

const Template: StoryFn<MarkerComponent> = (args) => ({
  props: {
    ...args,
    markerDelete: action('markerDelete'),
  },
});

export const Default = Template.bind({});
Default.args = {};

export const NoPermission = Template.bind({});
NoPermission.args = {
  canDelete: false,
  canUpdate: false,
};
