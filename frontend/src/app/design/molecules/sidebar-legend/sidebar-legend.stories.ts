import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { DEFAULT_SEARCH_PREFERENCES } from '../_models/search-preferences';
import { SidebarLegendComponent } from './sidebar-legend.component';

export default {
  title: 'DesignSystem/Molecules/SidebarLegendComponent',
  component: SidebarLegendComponent,
  decorators: [moduleMetadata({})],
  args: {
    interactable: true,
    sidebarEntries: DEFAULT_SEARCH_PREFERENCES,
  },
  parameters: {
    backgrounds: { default: 'grey' }, // https://storybook.js.org/docs/angular/essentials/backgrounds
  },
} as Meta<SidebarLegendComponent>;

const Template: StoryFn<SidebarLegendComponent> = (args) => ({
  props: {
    ...args,
    sidebarChange: action('sidebarChange'),
  },
});

export const Default = Template.bind({});
Default.args = {};
