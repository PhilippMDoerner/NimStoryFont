import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { action } from 'storybook/actions';
import { dummyGroups } from '../../../_services/article/group.service.mock';
import { dummyUsers } from '../../../_services/article/user.mock.service';
import {
  dummyCampaigns,
  dummyStatistics,
} from '../../../_services/utils/campaign.mock.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORMLY_MODULE } from '../../../_modules/formly_constants';
import { SiteAdminComponent } from './site-admin.component';

export default {
  title: 'DesignSystem/Templates/SiteAdminComponent',
  component: SiteAdminComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        NgbModule,
        RouterTestingModule,
        FORMLY_MODULE,
        BrowserAnimationsModule,
      ],
      declarations: [],
    }),
  ],
  args: {
    users: dummyUsers,
    campaigns: dummyCampaigns,
    allGroups: dummyGroups,
    statistics: dummyStatistics,
    serverUrl: 'https://www.aldrune.com',
  },
} as Meta<SiteAdminComponent>;

const Template: StoryFn<SiteAdminComponent> = (args) => ({
  props: {
    ...args,
    createCampaign: action('createCampaign'),
    createUser: action('createUser'),
    addUserGroup: action('addUserGroup'),
    removeUserGroup: action('removeUserGroup'),
    downloadDatabase: action('downloadDatabase'),
    deleteUser: action('deleteUser'),
  },
});

export const Default = Template.bind({});
Default.args = {};
