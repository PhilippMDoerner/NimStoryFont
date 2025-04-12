import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { FORMLY_MODULE } from 'src/app/_modules/formly_constants';
import { LoginComponent } from './login.component';

export default {
  title: 'DesignSystem/Templates/LoginComponent',
  component: LoginComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, FORMLY_MODULE, BrowserAnimationsModule],
      declarations: [],
    }),
  ],
  args: {
    extraMessage: 'Extra message of some sort',
    resetErrorMessage: 'Message for error during reset',
  },
} as Meta<LoginComponent>;

const Template: StoryFn<LoginComponent> = (args) => ({
  props: {
    ...args,
    login: action('login'),
    resetPassword: action('resetPassword'),
  },
});

export const Default = Template.bind({});
Default.args = {};
