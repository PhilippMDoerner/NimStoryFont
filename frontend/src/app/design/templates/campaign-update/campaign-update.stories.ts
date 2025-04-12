import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FORMLY_CHILD_MODULE } from 'src/app/_modules/formly_constants';
import { dummyMaps } from 'src/app/_services/article/map.service.mock';
import { dummyCampaign } from 'src/app/_services/utils/campaign.mock.service';
import { CampaignUpdateComponent } from './campaign-update.component';

export default {
  title: 'DesignSystem/Templates/CampaignUpdate',
  component: CampaignUpdateComponent,

  decorators: [
    moduleMetadata({
      imports: [FORMLY_CHILD_MODULE, BrowserAnimationsModule],
    }),
  ],
  args: {
    userModel: dummyCampaign,
    serverModel: undefined,
    mapOptions: dummyMaps,
  },
  argTypes: {
    cancel: { action: 'cancel' },
  },
} as Meta<CampaignUpdateComponent>;

type Story = StoryObj<CampaignUpdateComponent>;

export const Default: Story = {};
