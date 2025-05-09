/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouterTestingModule } from '@angular/router/testing';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { BadgeListEntry } from '../_models/badge-list';
import { BadgeListComponent } from './badge-list.component';

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
  { myLabel: 'The value of friendship', myValue: 7 },
  { myLabel: 'The value of knowledge', myValue: 314 },
  { myLabel: 'The value of wisdom', myValue: 999 },
  { myLabel: 'The value of power', myValue: 666 },
];

const dummyBadgeList: BadgeListEntry<{ count: number; color: string }>[] = [
  {
    text: 'Badge 1',
    link: 'https://example.com/badge1',
    badgeValue: {
      count: 10,
      color: 'green',
    },
  },
  {
    text: 'Badge 2',
    link: 'https://example.com/badge2',
    badgeValue: {
      count: 5,
      color: 'blue',
    },
  },
  {
    text: 'Badge 3',
    link: 'https://example.com/badge3',
    badgeValue: {
      count: 2,
      color: 'red',
    },
  },
  {
    text: 'Badge 4',
    link: 'https://example.com/badge4',
    badgeValue: {
      count: 20,
      color: 'purple',
    },
  },
  {
    text: 'Badge 5',
    link: 'https://example.com/badge5',
    badgeValue: {
      count: 7,
      color: 'orange',
    },
  },
];

export default {
  title: 'DesignSystem/Molecules/BadgeListComponent',
  component: BadgeListComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    }),
  ],
  args: {
    entries: dummyBadgeList,
    createOptions: {
      kind: 'SELECT',
      config: {
        options: dummyOptions,
        labelProp: 'myLabel',
        valueProp: 'myValue',
      },
    },
    label: 'Character',
    canCreate: true,
    canDelete: true,
    submitButtonType: 'PRIMARY',
    cancelButtonType: 'SECONDARY',
  } as any,
} as Meta<BadgeListComponent<any, any>>;

const Template: StoryFn<BadgeListComponent<any, any>> = (args: any) => ({
  props: {
    ...args,
    entryDelete: action('entryDelete'),
    entryCreate: action('entryCreate'),
  },
});

export const Default = Template.bind({});
Default.args = {};

export const LinkCreate = Template.bind({});
LinkCreate.args = {
  createOptions: '/link/to/create/page',
} as any;

export const NoCreate = Template.bind({});
NoCreate.args = {
  createOptions: undefined,
};

export const NoLinks = Template.bind({});
NoLinks.args = {
  entries: dummyBadgeList.map((badge) => ({
    ...badge,
    link: undefined,
  })),
};

export const NoPermissions = Template.bind({});
NoPermissions.args = {
  canCreate: false,
  canDelete: false,
};
