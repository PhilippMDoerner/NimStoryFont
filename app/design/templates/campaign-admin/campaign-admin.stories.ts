import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { action } from 'storybook/actions';
import { FORMLY_MODULE } from '../../../_modules/formly_constants';
import {
  dummyCampaign,
  dummyStatistics,
} from '../../../_services/utils/campaign.mock.service';
import { CampaignAdminComponent } from './campaign-admin.component';

export default {
  title: 'DesignSystem/Templates/CampaignAdminComponent',
  component: CampaignAdminComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, FORMLY_MODULE, BrowserAnimationsModule],
    }),
  ],
  args: {
    campaign: dummyCampaign,
    campaignStatistics: dummyStatistics,
    serverUrl: 'https://www.aldrune.com',
  },
} as Meta<CampaignAdminComponent>;

const Template: StoryFn<CampaignAdminComponent> = (args) => ({
  props: {
    ...args,
    removeMember: action('removeMember'),
    addMember: action('addMember'),
    removeAdmin: action('removeAdmin'),
    addAdmin: action('addAdmin'),
    removeGuest: action('removeGuest'),
    addGuest: action('addGuest'),
    removeEmptySearchResponse: action('removeEmptySearchResponse'),
    addEmptySearchResponse: action('addEmptySearchResponse'),
    deactivateCampaign: action('deactivateCampaign'),
  },
});

export const Default = Template.bind({});
Default.args = {};
