/* eslint-disable @typescript-eslint/no-explicit-any */
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { ToastConfig } from 'src/app/_models/toast';
import { ELEMENT_TYPES } from 'src/app/design/atoms/_models/button';
import { ALL_ICONS } from 'src/app/design/atoms/_models/icon';
import { ToastOverlayComponent, ToastService } from './toast-overlay.component';

const toastService = new ToastService();

export default {
  title: 'DesignSystem/Organisms/ToastOverlayComponent',
  component: ToastOverlayComponent,
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: ToastService,
          useValue: toastService,
        },
      ],
    }),
  ],
  args: {
    toastService,
    headerText: 'Hello',
    bodyText: 'World',
    important: false,
    dismissMs: 1500,
    hasBody: true,
    hasHeader: true,
  },
  argTypes: {
    toastType: {
      control: 'select',
      options: [...ELEMENT_TYPES, 'SUCCESS'],
    },
    headerIcon: {
      control: 'select',
      options: [null, ...ALL_ICONS],
    },
    bodyIcon: {
      control: 'select',
      options: [null, ...ALL_ICONS],
    },
  },
} as Meta<ToastOverlayComponent>;

type Story = StoryObj<ToastOverlayComponent>;

export const WithHeaderToast: Story = {
  render: (args: any) => {
    const toast: ToastConfig = {
      type: args.toastType ?? 'INFO',
      header: args.hasHeader
        ? { text: args.headerText, icon: args.headerIcon }
        : undefined,
      body: { text: args.bodyText, icon: args.bodyIcon },
      onToastClick: (dismiss) => dismiss(),
    };
    (args as any).toast = toast;

    return {
      props: args,
      template: `
        <button btn style="color: black;" (click)="toastService.addToast(toast)"> Click </button>
        <app-toast-overlay></app-toast-overlay>
      `,
    };
  },
};
