import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { dummyCampaigns } from 'src/app/_services/utils/campaign.mock.service';
import { CampaignOverviewComponent } from './campaign-overview.component';

export default {
  title: 'DesignSystem/Templates/CampaignOverviewComponent',
  component: CampaignOverviewComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, BrowserAnimationsModule],
      declarations: [],
      providers: [],
    }),
  ],
  args: {
    isGlobalAdmin: false,
    userName: 'Isofruit',
    campaigns: dummyCampaigns,
    serverUrl: 'https://www.aldrune.com',
  },
} as Meta<CampaignOverviewComponent>;

const Template: StoryFn<CampaignOverviewComponent> = (args) => ({
  props: {
    ...args,
    logout: action('logout'),
  },
});

export const Default = Template.bind({});
Default.args = {};

export const Admin = Template.bind({});
Admin.args = {
  isGlobalAdmin: true,
};
