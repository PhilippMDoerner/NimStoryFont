import { RouterTestingModule } from '@angular/router/testing';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { dummyCharacter } from 'src/app/_services/article/character-service.mock';
import { FormlyProvider } from 'src/app/_services/formly/formly-service.mock';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORMLY_MODULE } from 'src/app/_modules/formly_constants';
import { CharacterCreateUpdateComponent } from './character-create-update.component';

export default {
  title: 'DesignSystem/Templates/CharacterCreateUpdateComponent',
  component: CharacterCreateUpdateComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, FORMLY_MODULE, BrowserAnimationsModule],
      declarations: [],
      providers: [FormlyProvider],
    }),
  ],
  args: {
    campaignName: 'Aldrune',
    state: 'CREATE',
    userModel: {},
    serverModel: undefined,
    lastVisitedPlaceOptions: [],
  },
} as Meta<CharacterCreateUpdateComponent>;

const Template: StoryFn<CharacterCreateUpdateComponent> = (args) => ({
  props: {
    ...args,
    create: action('create'),
    update: action('update'),
    cancel: action('cancel'),
    addClass: action('addClass'),
    removeClass: action('removeClass'),
    addOrganizationMembership: action('addOrganizationMembership'),
    removeOrganizationMembership: action('removeOrganizationMembership'),
  },
});

export const Default = Template.bind({});
Default.args = {};

export const Update = Template.bind({});
Update.args = {
  state: 'UPDATE',
  userModel: dummyCharacter,
};

export const OutdatedUpdate = Template.bind({});
OutdatedUpdate.args = {
  state: 'OUTDATED_UPDATE',
  userModel: dummyCharacter,
  serverModel: {
    ...dummyCharacter,
    alive: !dummyCharacter.alive,
    description:
      dummyCharacter.description +
      ' <strong> Some text added by somebody else <strong>',
  },
};
