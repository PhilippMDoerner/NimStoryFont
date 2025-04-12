/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import {
  Meta,
  StoryFn,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/_models/user';
import {
  requiredMessage,
  requiredValidator,
} from 'src/app/_services/formly/validators';
import { FormlySelectDisableFieldComponent } from './formly-select-disable-field.component';

const dummyData: User[] = [
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

const dummyConfig: FormlyFieldConfig = {
  key: 'username',
  type: 'select-disable',
  props: {
    label: 'User',
    labelProp: 'username',
    valueProp: 'username',
    options: of(dummyData),
    warningMessage: 'The user you selected is already member of this campaign',
    additionalProperties: {
      disabledExpression: (selectOption: any) =>
        isInGroup(selectOption, 'group a'),
      tooltipMessage:
        'Members typically represent the individual player characters + the GM(s)',
      showWrapperLabel: true,
    },
  },
};

const isInGroup = (
  selectOption: any,
  groupName: string,
): Observable<boolean> => {
  const groupsOfUser: any[] = selectOption.group_details;
  const hasGroups = groupsOfUser != null;
  if (!hasGroups) {
    return of(false);
  }

  const isMember = groupsOfUser.some(
    (group) => group.name.toLowerCase() === groupName,
  );
  return of(isMember);
};

export default {
  title: 'DesignSystem/Organisms/FormlySelectDisableFieldComponent',
  component: FormlySelectDisableFieldComponent,
  args: {
    form: new FormGroup({}),
    model: {},
    options: {},
    fields: [dummyConfig],
  },
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        FormlyModule.forRoot({
          types: [
            {
              name: 'select-disable',
              component: FormlySelectDisableFieldComponent,
            },
          ],
          validationMessages: [requiredMessage],
          validators: [requiredValidator],
        }),
      ],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => FormlySelectDisableFieldComponent),
          multi: true,
        },
      ],
    }),
    componentWrapperDecorator(
      () => `
      <form [formGroup]="form">
        <formly-form 
          [model]="model" 
          [fields]="fields" 
          [options]="options" 
          [form]="form"
        ></formly-form>
      </form>
    `,
    ),
  ],
} as Meta<FormlySelectDisableFieldComponent>;

const Template: StoryFn<FormlySelectDisableFieldComponent> = (args) => ({
  props: {
    ...args,
    fields: [dummyConfig],
  },
});

export const Default = Template.bind({});
Default.args = {};

const TemplateNoOptions: StoryFn<FormlySelectDisableFieldComponent> = (
  args,
) => ({
  props: {
    ...args,
    fields: [
      {
        ...dummyConfig,
        props: {
          ...dummyConfig.props,
          options: of(null),
        },
      },
    ],
  },
});
export const Loading = TemplateNoOptions.bind({});
Loading.args = {};
