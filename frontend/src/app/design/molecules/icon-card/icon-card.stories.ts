import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { IconCardComponent } from './icon-card.component';

export default {
  title: 'DesignSystem/Molecules/IconCardComponent',
  component: IconCardComponent,
  decorators: [moduleMetadata({})],
  args: {
    icon: 'magic',
    title: 'Cute Doggo',
    subText: 'Spell',
    updateDatetime: '2022-04-23T13:34:56.789Z',
  },
} as Meta<IconCardComponent>;

const Template: StoryFn<IconCardComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const Default = Template.bind({});
Default.args = {};
