import { HttpErrorResponse } from '@angular/common/http';
import { ElementKind } from 'src/app/design/atoms/_models/button';
import { Icon } from 'src/app/design/atoms/_models/icon';
import { copyToClipboard } from 'src/utils/clipboard';

export interface ToastButton {
  label: string;
  icon?: Icon;
  onClick: (dismiss: () => void) => void;
}

export type ToastButtons = [] | [ToastButton] | [ToastButton, ToastButton];

export type ToastType = ElementKind | 'SUCCESS';

export interface ToastConfig {
  type: ToastType;
  important?: boolean;
  header?: {
    icon?: Icon;
    text: string;
  };
  body: {
    text?: string;
    icon?: Icon;
    buttons?: ToastButtons;
  };
  dismissMs?: 1500 | 3000 | 5000;
  onHide?: () => void;
  onShow?: () => void;
  onToastClick?: (dismiss: () => void) => void;
  styles?: { [key: string]: string };
}

export function errorToast(errorMsg: string): ToastConfig {
  return {
    type: 'DANGER',
    body: {
      text: errorMsg,
    },
  };
}

export function httpErrorToast(err: HttpErrorResponse): ToastConfig {
  const isHttpErrorResponse =
    err.status?.constructor?.name.toLowerCase() === 'number';
  if (!isHttpErrorResponse) {
    throw err;
  }

  const buttons: ToastButtons =
    err.status === 500
      ? [
          {
            label: 'Copy to Clipboard',
            icon: 'clipboard',
            onClick: () => copyToClipboard(err.error),
          },
        ]
      : [];

  return {
    type: 'DANGER',
    body: {
      text: `
        <strong> Please copy the error and send it to the developer: </strong>  <br>
        ${getErrorBody(err)}
      `,
      buttons,
    },
    header: { text: getErrorHeading(err) },
  };
}

export function successToast(msg: string): ToastConfig {
  return {
    type: 'SUCCESS',
    body: {
      text: msg,
      icon: 'check',
    },
    dismissMs: 3000,
    onToastClick: (dismiss) => dismiss(),
    styles: { width: '200px' },
  };
}

function getErrorHeading(error: HttpErrorResponse): string {
  switch (error.status) {
    case 0:
    case 504:
      return "This can't be done without an internet connection";
    case 200:
      return 'The target URL for the requested action does not seem to exist';
    case 500:
      return `The server exploded somehow!`;
    default:
      return 'An error occurred';
  }
}

function getErrorBody(error: HttpErrorResponse): string {
  return JSON.stringify(error.error);
}
