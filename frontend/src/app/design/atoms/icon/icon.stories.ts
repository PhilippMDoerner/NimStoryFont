import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { ALL_REGULAR_ICONS, ALL_SOLID_ICONS } from '../_models/icon';
import { IconComponent } from './icon.component';

export default {
  title: 'DesignSystem/Atoms/IconComponent',
  component: IconComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<IconComponent>;

const Template: StoryFn<IconComponent> = (args) => ({
  props: {
    ...args,
    solidIcons: ALL_SOLID_ICONS,
    regularIcons: ALL_REGULAR_ICONS,
  },
  template: `
    <h3 *ngFor="let regIcon of regularIcons">
      <app-icon [icon]="regIcon"></app-icon>
      {{ regIcon }}
    </h3>
    <h3 *ngFor="let solIcon of solidIcons">
      <app-icon [icon]="solIcon"></app-icon>
      {{ solIcon }}
    </h3>
  `,
});

export const Default = Template.bind({});
Default.args = {};
