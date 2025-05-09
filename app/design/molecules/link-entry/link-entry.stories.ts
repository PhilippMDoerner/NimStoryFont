/* eslint-disable @typescript-eslint/no-explicit-any */
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { LinkEntryComponent } from './link-entry.component';

export default {
  title: 'DesignSystem/Molecules/LinkEntryComponent',
  component: LinkEntryComponent,
  decorators: [moduleMetadata({})],
  args: {
    canDelete: true,
    columnSizes: [3, 8, 1],
    entry: {
      label: 'Some Label',
      linkText: 'Link me to thing',
      value: { x: 'Super value' },
    },
  },
} as Meta<LinkEntryComponent<any>>;

const Template: StoryFn<LinkEntryComponent<any>> = (args) => ({
  props: {
    ...args,
    delete: action('delete'),
    linkClick: action('linkClick'),
  },
});

export const Default = Template.bind({});
Default.args = {};
