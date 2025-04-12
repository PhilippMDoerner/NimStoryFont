/* eslint-disable @typescript-eslint/no-explicit-any */
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/angular';
import { SmallCreateFormComponent } from './small-create-form.component';

const dummyOptions: any[] = [
  { myLabel: 'A value', myValue: 5 },
  { myLabel: 'Another value', myValue: 7 },
  { myLabel: 'Yet another value', myValue: 2 },
  { myLabel: 'More values', myValue: 9 },
  { myLabel: 'Even more values', myValue: 4 },
  { myLabel: 'Values galore', myValue: 1 },
  { myLabel: 'The value of values', myValue: 8 },
  { myLabel: 'The value of life', myValue: 42 },
  { myLabel: 'The value of time', myValue: 24 },
  { myLabel: 'The value of money', myValue: 100 },
  { myLabel: 'The value of love', myValue: 99 },
  { myLabel: 'The value of friendship', myValue: 10 },
  { myLabel: 'The value of knowledge', myValue: 314 },
  { myLabel: 'The value of wisdom', myValue: 999 },
  { myLabel: 'The value of power', myValue: 666 },
];

export default {
  title: 'DesignSystem/Molecules/SmallCreateFormComponent',
  component: SmallCreateFormComponent,
  args: {
    options: dummyOptions,
    labelProp: 'myLabel',
    valueProp: 'myValue',
    badgeText: 'Add Entry',
    submitButtonType: 'PRIMARY',
    cancelButtonType: 'SECONDARY',
  },
} as Meta<SmallCreateFormComponent<any>>;

const Template: StoryFn<SmallCreateFormComponent<any>> = (args) => ({
  props: {
    ...args,
    create: action('create'),
  },
});

export const Default = Template.bind({});
Default.args = {};

export const NoOptions = Template.bind({});
NoOptions.args = {
  options: [],
};

export const UndefinedOptions = Template.bind({});
UndefinedOptions.args = {
  options: undefined,
};

export const DisabledOptions = Template.bind({});
DisabledOptions.args = {
  isDisabledFunction: (opt: any) => opt.myValue > 5,
} as any;
