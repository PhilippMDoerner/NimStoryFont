import { Meta, StoryFn, moduleMetadata } from "@storybook/angular";
import { SeparatorComponent } from "./separator.component";

export default {
  title: "DesignSystem/Atoms/SeparatorComponent",
  component: SeparatorComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      declarations: [],
    }),
  ],
  args: {
    separatorColor: "#fff",
    separatorThickness: 1,
  },
} as Meta<SeparatorComponent>;

const Template: StoryFn<SeparatorComponent> = (args: SeparatorComponent) => ({
  props: {
    ...args,
  },
  template: `
    <div class="my-5">
      <app-separator 
        style="--separator-color: {{separatorColor}}; --separator-thickness: {{separatorThickness}}px"
      ></app-separator>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {};
