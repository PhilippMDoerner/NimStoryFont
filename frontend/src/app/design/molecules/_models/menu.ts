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
      hotkey?: string;
      active?: boolean;
    }
  | {
      kind: 'LINK';
      label: string;
      url: string;
      disabled?: boolean;
      icon?: Icon;
      hotkey?: string;
      active?: boolean;
    };
