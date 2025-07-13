import { HotkeyAction } from 'src/app/_models/hotkey';
import { ElementKind } from '../../atoms/_models/button';
import { Icon } from '../../atoms/_models/icon';

export type MenuItem =
  | {
      kind: 'HEADER';
      label: string;
      headerKind: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    }
  | {
      kind: 'SEPARATOR';
    }
  | {
      kind: 'BUTTON';
      label: string;
      actionName: string;
      disabled?: boolean;
      icon?: Icon;
      hotkeyAction?: HotkeyAction;
      active?: boolean;
    }
  | {
      kind: 'LINK';
      label: string;
      url: string;
      disabled?: boolean;
      icon?: Icon;
      hotkeyAction?: HotkeyAction;
      active?: boolean;
    }
  | {
      kind: 'CONFIRM';
      label: string;
      actionName: string; // Gets fired when action is confirmed
      modal: {
        heading: string;
        body: string;
        submitLabel: string;
        cancelLabel: string;
        submitIcon?: Icon;
        kind: ElementKind;
      };
      disabled?: boolean;
      icon?: Icon;
      hotkeyAction?: HotkeyAction;
      active?: boolean;
    };

type ContextModalData = Extract<MenuItem, { kind: 'CONFIRM' }>['modal'];
export const DEFAULT_DELETE_MODAL_DATA: ContextModalData = {
  heading: 'Delete article',
  body: 'Are you sure you want to delete this article?',
  submitLabel: 'Delete',
  submitIcon: 'trash',
  cancelLabel: 'Cancel',
  kind: 'DANGER',
};
