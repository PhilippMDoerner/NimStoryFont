import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/angular';
import { Image } from 'src/app/_models/image';
import { ImageCarouselComponent } from './image-carousel.component';

const dummyImages: Image[] = [
  {
    pk: 1,
    image: '/breeds/germanshepherd/IMG_20200801_005830_387.jpg',
    name: 'Image 1',
    character_article: 1,
    creature_article: undefined,
    encounter_article: undefined,
    item_article: undefined,
    location_article: undefined,
    organization_article: undefined,
    article_type: 'Type A',
  },
  {
    pk: 2,
    image: '/breeds/mastiff-tibetan/n02108551_5830.jpg',
    name: 'Image 2',
    character_article: undefined,
    creature_article: 3,
    encounter_article: undefined,
    item_article: undefined,
    location_article: undefined,
    organization_article: undefined,
    article_type: 'Type B',
  },
  {
    pk: 3,
    image: '/breeds/malinois/n02105162_1572.jpg',
    name: 'Image 3',
    character_article: undefined,
    creature_article: undefined,
    encounter_article: 5,
    item_article: undefined,
    location_article: undefined,
    organization_article: undefined,
    article_type: 'Type C',
  },
  {
    pk: 4,
    image: '/breeds/ridgeback-rhodesian/n02087394_1352.jpg',
    name: 'Image 4',
    character_article: undefined,
    creature_article: undefined,
    encounter_article: undefined,
    item_article: 7,
    location_article: undefined,
    organization_article: undefined,
    article_type: 'Type D',
  },
];

export default {
  title: 'DesignSystem/Organisms/ImageCarouselComponent',
  component: ImageCarouselComponent,
  args: {
    images: dummyImages,
    serverUrl: 'https://images.dog.ceo',
    canCreate: true,
    canUpdate: true,
    canDelete: true,
    currentSlideIndex: 0,
  },
} as Meta<ImageCarouselComponent>;

const Template: StoryFn<ImageCarouselComponent> = (args) => ({
  props: {
    ...args,
    deleteImage: action('deleteImage'),
    createImage: action('createImage'),
    updateImage: action('updateImage'),
    slide: action('slide'),
    slideEnd: action('slideEnd'),
  },
});

export const Default = Template.bind({});
Default.args = {};

export const NoImages = Template.bind({});
NoImages.args = {
  images: [],
};
