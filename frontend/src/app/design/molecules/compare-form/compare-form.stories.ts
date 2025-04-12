/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { EditorModule } from '@tinymce/tinymce-angular';
import { Observable, of } from 'rxjs';
import * as all from 'tinymce/tinymce';

import { FORMLY_MODULE } from 'src/app/_modules/formly_constants';
import { CompareFormComponent } from './compare-form.component';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const x = all;

const dummyData = [
  {
    username: 'john_doe',
    password: 'password123',
    email: 'john_doe@example.com',
    is_active: true,
  },
  {
    username: 'jane_doe',
    password: 'jane_password',
    email: 'jane_doe@example.com',
    is_active: true,
    groups: [1, 2],
  },
  {
    username: 'admin',
    password: 'admin_password',
    email: 'admin@example.com',
    is_active: true,
    is_staff: true,
    is_superuser: true,
  },
  {
    username: 'bob_smith',
    password: 'bob_password',
    email: 'bob_smith@example.com',
    is_active: false,
  },
  {
    username: 'sara_smith',
    password: 'sara_password',
    email: 'sara_smith@example.com',
    is_active: true,
    api_permissions: ['read', 'write'],
  },
  {
    username: 'jim_brown',
    password: 'jim_password',
    email: 'jim_brown@example.com',
    is_active: true,
    group_details: [
      { name: 'Group A', pk: 1 },
      { name: 'Group B', pk: 2 },
    ],
  },
  {
    username: 'lisa_green',
    password: 'lisa_password',
    email: 'lisa_green@example.com',
    is_active: true,
    pk: 123,
  },
  {
    username: 'jessica_jones',
    password: 'jessica_password',
    email: 'jessica_jones@example.com',
    is_active: false,
    groups: [2, 3],
  },
  {
    username: 'peter_parker',
    password: 'spidey_password',
    email: 'peter_parker@example.com',
    is_active: true,
  },
  {
    username: 'mary_jane',
    password: 'mary_password',
    email: 'mary_jane@example.com',
    is_active: true,
    is_staff: true,
  },
  {
    username: 'clark_kent',
    password: 'superman_password',
    email: 'clark_kent@example.com',
    is_active: true,
    is_superuser: true,
  },
  {
    username: 'bruce_wayne',
    password: 'batman_password',
    email: 'bruce_wayne@example.com',
    is_active: false,
    group_details: [{ name: 'Justice League', pk: 10 }],
  },
  {
    username: 'diana_prince',
    password: 'wonder_woman_password',
    email: 'diana_prince@example.com',
    is_active: true,
    api_permissions: ['read'],
  },
  {
    username: 'thor_odinson',
    password: 'hammer_password',
    email: 'thor_odinson@example.com',
    is_active: true,
    groups: [5],
  },
  {
    username: 'steve_rogers',
    password: 'cap_password',
    email: 'steve_rogers@example.com',
    is_active: false,
  },
  {
    username: 'tony_stark',
    password: 'ironman_password',
    email: 'tony_stark@example.com',
    is_active: true,
  },
  {
    username: 'natasha_romanoff',
    password: 'black_widow_password',
    email: 'natasha_romanoff@example.com',
    is_active: true,
    groups: [4],
  },
  {
    username: 'vision',
    password: 'mindstone_password',
    email: 'vision@example.com',
    is_active: true,
  },
  {
    username: 'wanda_maximoff',
    password: 'scarlet_witch_password',
    email: 'wanda_maximoff@example.com',
    is_active: true,
    group_details: [{ name: 'Avengers', pk: 11 }],
  },
  {
    username: 'sam_wilson',
    password: 'falcon_password',
    email: 'sam_wilson@example.com',
    is_active: false,
  },
  {
    username: 'bucky_barnes',
    password: 'winter_soldier_password',
    email: 'bucky_barnes@example.com',
    is_active: true,
  },
  {
    username: 'stephen_strange',
    password: 'dr_strange_password',
    email: 'stephen_strange@example.com',
    is_active: true,
  },
  {
    username: 'pietro_maximoff',
    password: 'quicksilver_password',
    email: 'pietro_maximoff@example.com',
    is_active: false,
  },
  { username: 'groot', email: 'groot@example.com', is_active: true },
  {
    username: 'rocket',
    password: 'rocket_password',
    email: 'rocket@example.com',
    is_active: true,
  },
  {
    username: 'drax',
    password: 'drax_password',
    email: 'drax@example.com',
    is_active: true,
    groups: [5],
  },
  {
    username: 'gamora',
    password: 'gamora_password',
    email: 'gamora@example.com',
    is_active: false,
  },
  {
    username: 'nebula',
    password: 'nebula_password',
    email: 'nebula@example.com',
    is_active: true,
  },
  { username: 'mantis', email: 'mantis@example.com', is_active: true },
  {
    username: 'okoye',
    password: 'okoye_password',
    email: 'okoye@example.com',
    is_active: true,
    group_details: [{ name: 'Dora Milaje', pk: 12 }],
  },
  { username: 'shuri', email: 'shuri@example.com', is_active: false },
  {
    username: 'nakia',
    password: 'nakia_password',
    email: 'nakia@example.com',
    is_active: true,
  },
  { username: 'ramonda', email: 'ramonda@example.com', is_active: true },
  {
    username: 'mbaku',
    password: 'mbaku_password',
    email: 'mbaku@example.com',
    is_active: true,
    groups: [4],
  },
  {
    username: 'erik_killmonger',
    password: 'killmonger_password',
    email: 'erik_killmonger@example.com',
    is_active: false,
  },
  {
    username: 'hank_pym',
    password: 'antman_password',
    email: 'hank_pym@example.com',
    is_active: true,
    group_details: [{ name: 'Ant-Man and the Wasp', pk: 13 }],
  },
];

const dummySelectDisableConfig: FormlyFieldConfig = {
  key: 'username',
  type: 'select-disable',
  props: {
    label: 'User',
    labelProp: 'username',
    valueProp: 'username',
    options: of(dummyData) as unknown as Observable<any[]>,
    additionalProperties: {
      disabledExpression: (selectOption: any) =>
        of(isInGroup(selectOption, 'group a')),
    },
    tooltipMessage:
      'Members typically represent the individual player characters + the GM(s)',
    warningMessage: 'The user you selected is already member of this campaign',
  },
};

const dummyForm: FormlyFieldConfig[] = [
  {
    key: 'text',
    type: 'text-editor',
    props: {
      label: 'SomeText',
    },
  },
  {
    key: 'file',
    type: 'file',
    props: {
      label: 'SomeFile',
      buttonType: 'SECONDARY',
    },
  },
  dummySelectDisableConfig,
  {
    key: 'date',
    type: 'datepicker',
    props: {
      label: 'SomeDate',
    },
  },
];

const isInGroup = (selectOption: any, groupName: string): boolean => {
  const groupsOfUser: any[] = selectOption.group_details;
  const hasGroups = groupsOfUser != null;
  if (!hasGroups) {
    return false;
  }

  const isMember = groupsOfUser.some(
    (group) => group.name.toLowerCase() === groupName,
  );
  return isMember;
};

const serverModel = {
  text: 'Some prefill text',
  date: '2023-04-14',
  username: 'admin',
  file: 'C:\\fakepath\\some\\file.jpg',
};
const userModel = {
  text: 'Other prefill text',
  date: '2023-04-03',
  username: 'groot',
  file: 'C:\\fakepath\\other\\file.jpg',
};

export default {
  title: 'DesignSystem/Molecules/CompareFormComponent',
  component: CompareFormComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrowserModule, CommonModule, EditorModule, FORMLY_MODULE],
    }),
  ],
  args: {
    enctype: 'application/x-www-form-urlencoded',
    fields: dummyForm,
    modelFromServer: serverModel,
    modelFromUser: userModel,
    displayVertically: false,
  },
} as Meta<CompareFormComponent<any>>;

const Template: StoryFn<CompareFormComponent<any>> = (args) => ({
  props: {
    ...args,
    formlySubmit: action('formlySubmit'),
    formlyCancel: action('formlyCancel'),
  },
});

export const Default = Template.bind({});
Default.args = {};
