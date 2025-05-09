import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { PageContainerComponent } from './page-container.component';

export default {
  title: 'DesignSystem/Organisms/PageContainerComponent',
  component: PageContainerComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrowserAnimationsModule],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'grey' }, // https://storybook.js.org/docs/angular/essentials/backgrounds
  },
  args: {},
} as Meta<PageContainerComponent>;

const Template: StoryFn<PageContainerComponent> = (
  args: PageContainerComponent,
) => ({
  props: {
    ...args,
  },
  template: `
    <app-page-container>
      <h1 class="text-center"> A headline </h1>
      <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt aliquam sapiente facilis laudantium eveniet laborum explicabo perspiciatis tempore culpa quia vitae, modi ullam animi, molestias itaque alias fugit in neque. </p>
    </app-page-container>
  `,
});

export const Default = Template.bind({});
Default.args = {};
