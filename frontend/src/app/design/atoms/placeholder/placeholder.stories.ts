import { Meta, StoryObj } from '@storybook/angular';
import { PlaceholderComponent } from './placeholder.component';

export default {
  title: 'DesignSystem/Atoms/PlaceholderComponent',
  component: PlaceholderComponent,
  args: {
    width: 400,
    height: 40,
    color: '173, 181, 189',
  },
} as Meta<PlaceholderComponent>;

type Story = StoryObj<typeof PlaceholderComponent>;

export const Default: Story = {
  render: (args) => {
    return {
      props: args,
      template: `
        <app-placeholder style="height:{{height}}px; width:{{width}}px; --animation-color-rgb:{{color}};"></app-placeholder>
      `,
    };
  },
};
