import { RouterTestingModule } from '@angular/router/testing';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { ImageCardComponent } from './image-card.component';

export default {
  title: 'DesignSystem/Molecules/ImageCardComponent',
  component: ImageCardComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    }),
  ],
  args: {
    serverUrl: 'https://images.dog.ceo',
    imageUrls: '/breeds/malinois/n02105162_1572.jpg',
    text: 'Cute Doggo',
    alt: 'A cute little doggo',
  },
} as Meta<ImageCardComponent>;

const Template: StoryFn<ImageCardComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const Default = Template.bind({});
Default.args = {};
