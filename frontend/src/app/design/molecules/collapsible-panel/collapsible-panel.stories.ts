import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { CollapsiblePanelComponent } from './collapsible-panel.component';

export default {
  title: 'DesignSystem/Molecules/CollapsiblePanelComponent',
  component: CollapsiblePanelComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent],
    }),
  ],
  args: {
    isOpen: false,
    heading: 'Some Heading',
  },
} as Meta<CollapsiblePanelComponent>;

const Template: StoryFn<CollapsiblePanelComponent> = (args) => ({
  props: {
    ...args,
  },
  template: `
  <app-collapsible-panel>
    <div heading> {{heading}} </div>
    <button btn body [icon]="'plus'" [text]="'Add things'" [kind]="'PRIMARY'"></button>
    
  </app-collapsible-panel>
`,
});

export const Default = Template.bind({});
Default.args = {};
