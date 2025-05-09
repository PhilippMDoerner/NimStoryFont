import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { EditToggleComponent } from './edit-toggle.component';

export default {
  title: 'DesignSystem/Molecules/EditToggleComponent',
  component: EditToggleComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
    }),
  ],
  args: {
    toggled: false,
    buttonKind: 'SECONDARY',
  },
} as Meta<EditToggleComponent>;

const Template: StoryFn<EditToggleComponent> = (args) => ({
  props: {
    ...args,
    toggle: action('toggle'),
  },
});

export const Default = Template.bind({});
Default.args = {};
