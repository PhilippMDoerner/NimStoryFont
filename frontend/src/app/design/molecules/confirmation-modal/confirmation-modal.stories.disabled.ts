import { action } from '@storybook/addon-actions';
import {
  Meta,
  StoryFn,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { ConfirmationModalComponent } from './confirmation-modal.component';

export default {
  title: 'DesignSystem/Molecules/ConfirmationModalComponent',
  component: ConfirmationModalComponent,
  decorators: [
    moduleMetadata({}),
    componentWrapperDecorator(
      () => `
      <app-confirmation-modal 
        [heading]="heading"
        [confirmValue]="confirmValue"
        [modalType]="modalType"
        [cancelButtonType]="cancelButtonType"
        [submitButtonLabel]="submitButtonLabel"
        [cancelButtonLabel]="cancelButtonLabel"
        [submitIcon]="submitIcon"
        (modalClose)="modalClose($event)" 
        (confirm)="confirm($event)"
        (cancelled)="cancel($event)"
      >
      
        <ng-container body>
          <h3> Body </h3>
          This is the modal body content.
        </ng-container>
        
        <ng-container opener>
          <button btn 
            [kind]="'SECONDARY'" 
            [text]="'Open Modal'"
          ></button>
        </ng-container>
        
      </app-confirmation-modal>
    `,
    ),
  ],
  args: {
    heading: 'Modal Heading',
    cancelButtonLabel: 'No',
    submitButtonLabel: 'Yes',
    modalType: 'PRIMARY',
    cancelButtonType: 'SECONDARY',
    confirmValue: 'Confirm value to emit',
    submitIcon: 'plus',
  },
} as Meta<ConfirmationModalComponent<unknown>>;

const Template: StoryFn<ConfirmationModalComponent<unknown>> = (args) => ({
  props: {
    ...args,
    modalClose: action('modalClose'),
    confirm: action('confirm'),
    cancel: action('cancel'),
  },
});

export const Default = Template.bind({});
Default.args = {};

export const Secondary = Template.bind({});
Secondary.args = {
  modalType: 'SECONDARY',
};

export const Dark = Template.bind({});
Dark.args = {
  modalType: 'DARK',
};

export const Warning = Template.bind({});
Warning.args = {
  modalType: 'WARNING',
};

export const Danger = Template.bind({});
Danger.args = {
  modalType: 'DANGER',
};

export const Light = Template.bind({});
Light.args = {
  modalType: 'LIGHT',
};

export const Info = Template.bind({});
Info.args = {
  modalType: 'INFO',
};
