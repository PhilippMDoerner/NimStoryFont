import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FormlyModule } from '@ngx-formly/core';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { Item } from 'src/app/_models/item';
import {
  integerValidator,
  notIntegerMessage,
  requiredMessage,
  requiredValidator,
} from 'src/app/_services/formly/validators';
import { FormlyFileFieldComponent } from '../../molecules';
import { ItemComponent } from './item.component';

const dummyItem: Item = {
  pk: 123,
  name: 'Sword of the Paladin',
  description: `
    <div>
      <p>The Holy Sword is a legendary weapon of immense power and great significance. It is said to have been forged by the gods themselves and imbued with their divine energy, making it one of the most powerful weapons in existence. The sword is said to have been wielded by the greatest heroes throughout history, and it is believed that whoever possesses the sword is destined to become a hero themselves.</p>
      <p>The Holy Sword is a longsword with a blade made of a bright, shimmering metal that seems to radiate with its own light. The hilt of the sword is wrapped in a soft, white leather that is said to have been taken from the hide of a unicorn. The pommel of the sword is made of a gleaming silver that is shaped like a holy symbol, and it is said that the sword's power is activated by touching the pommel to the forehead of the wielder and reciting a sacred incantation.</p>
      <p>Legend has it that the Holy Sword has the power to vanquish any evil, no matter how powerful, and that it can only be wielded by a true hero. It is said that the sword will only respond to someone who is pure of heart and strong in spirit, and that it will reject anyone who tries to use it for their own selfish purposes. The Holy Sword is a symbol of hope and righteousness, and its very presence is said to inspire courage and valor in those who fight for what is right.</p>
    </div>
  `,
  owner: 456,
  owner_details: { name: 'John Doe', pk: 456 },
  images: [
    {
      pk: 789,
      image: '/breeds/mastiff-tibetan/n02108551_5830.jpg',
      name: 'Sword Image',
      item_article: 123,
      article_type: 'Item',
    },
    {
      pk: 790,
      image: '/breeds/mastiff-tibetan/n02108551_5830.jpg',
      name: 'Sword Close-Up',
      item_article: 123,
      article_type: 'Item',
    },
    {
      pk: 791,
      image: '/breeds/mastiff-tibetan/n02108551_5830.jpg',
      item_article: 123,
      article_type: 'Item',
    },
  ],
  campaign: 1,
  campaign_details: { id: 1, name: 'Campaign of Adventures' },
  creation_datetime: '2022-04-01T12:00:00Z',
  update_datetime: '2022-04-03T09:30:00Z',
  getAbsoluteRouterUrl: () => 'https://example.com/items/123',
};

export default {
  title: 'DesignSystem/Templates/ItemComponent',
  component: ItemComponent,
  decorators: [
    moduleMetadata({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        FormlyModule.forRoot({
          types: [
            {
              name: 'file',
              component: FormlyFileFieldComponent,
              wrappers: ['form-field'],
            },
          ],
          validationMessages: [requiredMessage, notIntegerMessage],
          validators: [requiredValidator, integerValidator],
        }),
      ],
      declarations: [],
    }),
  ],
  args: {
    imageServerModel: undefined,
    canCreate: true,
    canUpdate: true,
    canDelete: true,
    item: dummyItem,
    serverUrl: 'https://images.dog.ceo',
  },
} as Meta<ItemComponent>;

const Template: StoryFn<ItemComponent> = (args) => ({
  props: {
    ...args,
    createImage: action('createImage'),
    deleteImage: action('deleteImage'),
    updateImage: action('updateImage'),
    itemDelete: action('itemDelete'),
  },
});

export const Default = Template.bind({});
Default.args = {};

export const NoPermission = Template.bind({});
NoPermission.args = {
  canDelete: false,
  canUpdate: false,
  canCreate: false,
};
