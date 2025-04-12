import { RouterTestingModule } from '@angular/router/testing';
import { action } from '@storybook/addon-actions';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { InteractiveBadgeComponent } from './interactive-badge.component';

export default {
  title: 'DesignSystem/Atoms/InteractiveBadgeComponent',
  component: InteractiveBadgeComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    }),
  ],
  args: {
    text: 'BadgeText',
    kind: 'PRIMARY',
    icon: 'times',
    textLink: undefined,
  },
} as Meta<InteractiveBadgeComponent>;

const Template: StoryFn<InteractiveBadgeComponent> = (args) => ({
  props: {
    ...args,
    iconClick: action('iconClick'),
    labelClick: action('labelClick'),
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

export const WithLink = Template.bind({});
WithLink.args = {
  textLink: '/to/other/page',
};
