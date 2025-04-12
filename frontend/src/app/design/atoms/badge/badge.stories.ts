import { Meta, StoryFn } from '@storybook/angular';
import { BadgeComponent } from './badge.component';

export default {
  title: 'DesignSystem/Atoms/BadgeComponent',
  component: BadgeComponent,
  args: {
    text: 'BadgeText',
    kind: 'PRIMARY',
    icon: undefined,
  },
} as Meta<BadgeComponent>;

const Template: StoryFn<BadgeComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const Default = Template.bind({});
Default.args = {};

export const Secondary = Template.bind({});
Secondary.args = {
  kind: 'SECONDARY',
};

export const Dark = Template.bind({});
Dark.args = {
  kind: 'DARK',
};

export const Warning = Template.bind({});
Warning.args = {
  kind: 'WARNING',
};

export const Danger = Template.bind({});
Danger.args = {
  kind: 'DANGER',
};

export const Light = Template.bind({});
Light.args = {
  kind: 'LIGHT',
};

export const Info = Template.bind({});
Info.args = {
  kind: 'INFO',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: 'times',
};
