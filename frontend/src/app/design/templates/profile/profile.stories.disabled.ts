import { RouterTestingModule } from '@angular/router/testing';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { User } from 'src/app/_models/user';
import { FORMLY_MODULE } from 'src/app/_modules/formly_constants';
import { TokenMockService } from 'src/app/_services/utils/token.mock.service';
import { TokenService } from 'src/app/_services/utils/token.service';
import { CampaignMembership } from '../_models/campaign-membership';
import { ProfileComponent } from './profile.component';

const dummyUser: User = {
  username: 'john_doe',
  password: 'password123',
  pk: 1,
  api_permissions: ['read', 'write'],
  groups: [1, 2],
  group_details: [
    { name: 'Group A', pk: 1 },
    { name: 'Group B', pk: 2 },
  ],
  is_staff: false,
  is_superuser: false,
  email: 'john_doe@example-long-email-address.com',
  is_active: true,
};

const dummyMemberships: CampaignMembership[] = [
  {
    campaignName: 'Campaign A',
    role: 'admin',
  },
  {
    campaignName: 'Campaign B',
    role: 'member',
  },
  {
    campaignName: 'Campaign C',
    role: 'guest',
  },
];

export default {
  title: 'DesignSystem/Templates/ProfileComponent',
  component: ProfileComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, FORMLY_MODULE],
      providers: [
        {
          provide: TokenService,
          useClass: TokenMockService,
        },
      ],
    }),
  ],
  args: {
    user: dummyUser,
    campaignName: 'Aldrune',
    memberships: dummyMemberships,
    canDeleteProfile: true,
    showProfileEditForm: false,
    showPasswordEditForm: false,
  },
} as Meta<ProfileComponent>;

const Template: StoryFn<ProfileComponent> = (args) => ({
  props: {
    ...args,
    profileUpdate: action('profileUpdate'),
    profileDelete: action('profileDelete'),
    campaignLeave: action('campaignLeave'),
    passwordUpdate: action('passwordUpdate'),
  },
});

export const Default = Template.bind({});
Default.args = {};
