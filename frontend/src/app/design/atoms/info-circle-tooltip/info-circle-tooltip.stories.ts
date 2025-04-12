/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryFn } from '@storybook/angular';
import { InfoCircleTooltipComponent } from './info-circle-tooltip.component';

export default {
  title: 'DesignSystem/Atoms/InfoCircleTooltipComponent',
  component: InfoCircleTooltipComponent,
  args: {
    text: 'SomeText',
    tooltip: 'Tooltip text beautiful',
  },
} as Meta<InfoCircleTooltipComponent<any>>;

const Template: StoryFn<InfoCircleTooltipComponent<any>> = (args: any) => ({
  props: {
    ...args,
  },
  template: `
    <div class="my-5">
      <app-info-circle-tooltip
        [tooltip]="tooltip"
        [text]="text"
      ></app-info-circle-tooltip>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {};
