import { RouterTestingModule } from '@angular/router/testing';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { RoutingServiceMock } from 'src/app/_services/routing.mock.service';
import { RoutingService } from 'src/app/_services/routing.service';
import { dummyCampaign } from 'src/app/_services/utils/campaign.mock.service';
import { FaviconService } from 'src/app/_services/utils/favicon.service';
import { GlobalStore } from 'src/app/global.store';
import { PageComponent } from './page.component';

const dummyUserData = {
  accessToken: {
    token: 'abc123',
    exp: 1651345060,
    type: 'access',
  },
  refreshToken: {
    token: 'def456',
    exp: 1651345090,
    type: 'refresh',
  },
  userId: 123,
  userName: 'John Doe',
  isAdmin: true,
  isSuperUser: false,
  campaignMemberships: {
    'Campaign A': 'member',
    'Campaign B': 'admin',
  },
};

export default {
  title: 'DesignSystem/Organisms/PageComponent',
  component: PageComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: FaviconService,
          useValue: { currentPageTitle: () => 'Some Title' },
        },
        {
          provide: RoutingService,
          useClass: RoutingServiceMock,
        },
        GlobalStore,
      ],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    serverUrl: 'https://www.aldrune.com',
    user: dummyUserData,
    campaign: dummyCampaign,
  },
} as Meta<PageComponent>;

const Template: StoryFn<PageComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const Default = Template.bind({});
Default.args = {};
