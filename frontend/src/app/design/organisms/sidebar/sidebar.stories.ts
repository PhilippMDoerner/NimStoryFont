import { RouterTestingModule } from '@angular/router/testing';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { dummyCampaign } from 'src/app/_services/utils/campaign.mock.service';
import { SidebarComponent } from './sidebar.component';

// Add MockTokenService

export default {
  title: 'DesignSystem/Organisms/SidebarComponent',
  component: SidebarComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
      declarations: [],
      providers: [],
    }),
  ],
  args: {
    campaign: dummyCampaign,
  },
} as Meta<SidebarComponent>;

const Template: StoryFn<SidebarComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const Default = Template.bind({});
Default.args = {};
