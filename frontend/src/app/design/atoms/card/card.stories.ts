import { Meta, StoryFn } from '@storybook/angular';
import { CardComponent } from './card.component';

export default {
  title: 'DesignSystem/Atoms/CardComponent',
  component: CardComponent,
  args: {
    text: '<h1> BadgeText </h1>',
    bgColor: 'var(--bs-card-bg)',
  },
} as Meta<CardComponent>;

const Template: StoryFn<CardComponent> = (args: CardComponent) => ({
  props: args,
  template: `
    <app-card style="--card-bg-color:{{bgColor}}!important;">
      <div [innerHTML]="text"></div>
      Written inside of the card, how beautiful
    </app-card>  
  `,
});

export const Default = Template.bind({});
Default.args = {};

export const Red = Template.bind({});
Red.args = {
  bgColor: 'red',
};
