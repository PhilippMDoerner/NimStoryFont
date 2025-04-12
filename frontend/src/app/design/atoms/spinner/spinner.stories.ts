import { Meta, StoryFn, moduleMetadata } from "@storybook/angular";
import { SpinnerComponent } from "./spinner.component";

export default {
  title: "DesignSystem/Atoms/SpinnerComponent",
  component: SpinnerComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  args: {
    thickness: 24,
  },
} as Meta<SpinnerComponent>;

const Template: StoryFn<SpinnerComponent> = (args: SpinnerComponent) => ({
  props: {
    ...args,
  },
  template: `
    <h4> <strong> Note </strong>: Thickness is controlled via CSS variable 'thickness' </h4>
    <app-spinner style="--thickness:{{thickness}}px;"></app-spinner>
  `,
});

export const Default = Template.bind({});
Default.args = {};
