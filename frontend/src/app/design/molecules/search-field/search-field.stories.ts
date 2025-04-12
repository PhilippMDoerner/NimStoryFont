import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/angular';
import { SearchFieldComponent } from './search-field.component';

export default {
  title: 'DesignSystem/Molecules/SearchFieldComponent',
  component: SearchFieldComponent,
  args: {},
} as Meta<SearchFieldComponent>;

const Template: StoryFn<SearchFieldComponent> = (args) => ({
  props: {
    ...args,
    search: action('search'),
  },
});

export const Default = Template.bind({});
Default.args = {};
