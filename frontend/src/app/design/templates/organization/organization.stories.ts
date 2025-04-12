import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FormlyModule } from '@ngx-formly/core';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { Organization } from 'src/app/_models/organization';
import {
  integerValidator,
  notIntegerMessage,
  requiredMessage,
  requiredValidator,
} from 'src/app/_services/formly/validators';
import { FormlyFileFieldComponent } from '../../molecules';
import { OrganizationComponent } from './organization.component';

const dummyOrganization: Organization = {
  pk: 123,
  name: 'Order of the Silver Lance',
  description: 'A knightly order dedicated to protecting the innocent.',
  leader: 'Sir Cedric',
  headquarter: 456,
  headquarter_details: {
    name: 'Castle Silverkeep',
    parent_name: 'Kingdom of Arathia',
    pk: 456,
    name_full: 'Castle Silverkeep, Kingdom of Arathia',
  },
  members: [
    {
      name: 'Sir Cedric',
      membership_id: 1,
      pk: 789,
      alive: true,
      organization_id: 123,
      role: 'Grandmaster',
    },
    {
      name: 'Lady Elspeth',
      membership_id: 2,
      pk: 790,
      alive: true,
      organization_id: 123,
      role: 'Commander',
    },
    {
      name: 'Sir Richard',
      membership_id: 3,
      pk: 791,
      alive: false,
      organization_id: 123,
      role: 'Knight',
    },
  ],
  images: [
    {
      pk: 234,
      image: '/breeds/mastiff-tibetan/n02108551_5830.jpg',
      name: 'Order Emblem',
      organization_article: 123,
      article_type: 'Organization',
    },
    {
      pk: 235,
      image: '/breeds/mastiff-tibetan/n02108551_5830.jpg',
      name: 'Order Emblem',
      organization_article: 123,
      article_type: 'Organization',
    },
  ],
  campaign: 1,
  campaign_details: { id: 1, name: 'Campaign of Adventures' },
  creation_datetime: '2022-04-01T12:00:00Z',
  update_datetime: '2022-04-03T09:30:00Z',
  getAbsoluteRouterUrl: () => 'https://example.com/organizations/123',
};

export default {
  title: 'DesignSystem/Templates/OrganizationComponent',
  component: OrganizationComponent,
  decorators: [
    moduleMetadata({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        FormlyModule.forRoot({
          types: [
            {
              name: 'file',
              component: FormlyFileFieldComponent,
              wrappers: ['form-field'],
            },
          ],
          validationMessages: [requiredMessage, notIntegerMessage],
          validators: [requiredValidator, integerValidator],
        }),
      ],
      declarations: [],
    }),
  ],
  args: {
    imageServerModel: undefined,
    canCreate: true,
    canUpdate: true,
    canDelete: true,
    organization: dummyOrganization,
    serverUrl: 'https://images.dog.ceo',
  },
} as Meta<OrganizationComponent>;

const Template: StoryFn<OrganizationComponent> = (args) => ({
  props: {
    ...args,
    createImage: action('createImage'),
    deleteImage: action('deleteImage'),
    updateImage: action('updateImage'),
    organizationDelete: action('organizationDelete'),
  },
});

export const Default = Template.bind({});
Default.args = {};

export const NoPermission = Template.bind({});
NoPermission.args = {
  canDelete: false,
  canUpdate: false,
  canCreate: false,
};
