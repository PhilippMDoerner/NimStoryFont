import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FormlyModule } from '@ngx-formly/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { action } from 'storybook/actions';
import { dummyGroups } from '../../../_services/article/group.service.mock';
import { dummyUsers } from '../../../_services/article/user.mock.service';
import {
  requiredMessage,
  requiredValidator,
} from '../../../_services/formly/validators';
import { UserRowComponent } from './user-row.component';

export default {
  title: 'DesignSystem/Organisms/UserRowComponent',
  component: UserRowComponent,
  decorators: [
    moduleMetadata({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        FormlyModule.forRoot({
          validationMessages: [requiredMessage],
          validators: [requiredValidator],
        }),
      ],
    }),
  ],
  args: {
    user: dummyUsers[0],
    groups: dummyGroups,
    canDelete: true,
    canCreate: true,
  },
} as Meta<UserRowComponent>;

const Template: StoryFn<UserRowComponent> = (args) => ({
  props: {
    ...args,
    addGroup: action('addGroup'),
    removeGroup: action('removeGroup'),
    deleteUser: action('deleteUser'),
  },
});

export const Default = Template.bind({});
Default.args = {};

export const NoPermissions = Template.bind({});
NoPermissions.args = {
  canCreate: false,
  canDelete: false,
};
