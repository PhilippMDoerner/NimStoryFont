import { Meta, StoryFn } from '@storybook/angular';
import { ButtonComponent } from './button.component';

export default {
  title: 'DesignSystem/Atoms/ButtonComponent',
  component: ButtonComponent,
  args: {
    kind: 'PRIMARY',
    text: 'ButtonText',
    icon: 'plus',
    size: 'MEDIUM',
    isSubmitButton: false,
  },
} as Meta<ButtonComponent>;

const Template: StoryFn<ButtonComponent> = (args) => ({
  props: args,
  template: `
    <div class="d-flex flex-column">
      <div>
        Button Size: {{size}}
        <button btn [text]="text" [icon]="icon" [kind]="kind" [size]="size">
        </button>
        <button btn [text]="text" [icon]="icon" [kind]="kind + '-OUTLINE'" [size]="size">
        </button>
      </div>
      
      <div class="my-4">
        Button Size: SMALL
        <button btn [text]="text" [icon]="icon" [kind]="kind" [size]="'SMALL'">
        </button>
        <button btn [text]="text" [icon]="icon" [kind]="kind + '-OUTLINE'" [size]="'SMALL'">
        </button>
      </div>
      
      <div>
        Button Size: LARGE
        <button btn [text]="text" [icon]="icon" [kind]="kind" [size]="'LARGE'">
        </button>
        <button btn [text]="text" [icon]="icon" [kind]="kind + '-OUTLINE'" [size]="'LARGE'">
        </button>
      </div>
      
    </div>
  `,
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

export const NoText = Template.bind({});
NoText.args = {
  text: undefined,
};

export const NoIcon = Template.bind({});
NoIcon.args = {
  icon: undefined,
};
