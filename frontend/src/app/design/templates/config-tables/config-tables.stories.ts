import { RouterTestingModule } from '@angular/router/testing';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { action } from 'storybook/actions';
import { dummyMarkerTypes } from '../../../_services/article/marker-type.service.mock';
import { dummyClasses } from '../../../_services/article/player-class.service.mock';
import { FormlyProvider } from '../../../_services/formly/formly-service.mock';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORMLY_MODULE } from '../../../_modules/formly_constants';
import { ConfigTablesComponent } from './config-tables.component';

export default {
  title: 'DesignSystem/Templates/ConfigTablesComponent',
  component: ConfigTablesComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, FORMLY_MODULE, BrowserAnimationsModule],
      declarations: [],
      providers: [FormlyProvider],
    }),
  ],
  args: {
    currentCampaignId: 1,
    campaignName: 'Aldrune',
    tableData: {},
    canDeleteGlobalEntries: true,
    hasCampaignWritePermission: true,
  },
} as Meta<ConfigTablesComponent>;

const Template: StoryFn<ConfigTablesComponent> = (args) => ({
  props: {
    ...args,
    loadTableEntries: action('loadTableEntries'),
    deleteTableEntry: action('deleteTableEntry'),
    createTableEntry: action('createTableEntry'),
  },
});

export const Default = Template.bind({});
Default.args = {};

export const WithData = Template.bind({});
WithData.args = {
  tableData: {
    MARKER_TYPE: dummyMarkerTypes,
    PLAYER_CLASS: dummyClasses,
  },
};
