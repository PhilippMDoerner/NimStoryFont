export type AriaText =
  | {
      kind: 'aria-label';
      label: string;
    }
  | {
      kind: 'aria-labelledby';
      id: string;
    };
