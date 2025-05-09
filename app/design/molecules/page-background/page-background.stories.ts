import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { PageBackgroundComponent } from './page-background.component';

export default {
  title: 'DesignSystem/Molecules/PageBackgroundComponent',
  component: PageBackgroundComponent,
  decorators: [moduleMetadata({})],
  args: {
    serverUrl: 'https://www.aldrune.com',
    imageUrl: '/assets/default_images/audio_pic_default.webp',
  },
} as Meta<PageBackgroundComponent>;

const Template: StoryFn<PageBackgroundComponent> = (args) => ({
  props: {
    ...args,
  },
  template: `
    <div style="height: 100vh;">
      <app-page-background
        [serverUrl]="serverUrl"
        [imageUrl]="imageUrl"
      ></app-page-background>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {};

export const NoImage = Template.bind({});
NoImage.args = {
  imageUrl: undefined,
};
