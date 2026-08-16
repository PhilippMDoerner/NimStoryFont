import { ComponentTitle, StoryKind, StoryName } from "storybook/internal/types";
import React, { PureComponent, ReactNode } from "react";

//#region code/addons/links/.dts-emit/code/addons/links/src/react/components/link.d.ts
interface Props {
  kind?: StoryKind;
  title?: ComponentTitle;
  story?: StoryName;
  name?: StoryName;
  children: ReactNode;
}
interface State {
  href: string;
}
declare class LinkTo extends PureComponent<Props, State> {
  static defaultProps: Props;
  state: State;
  componentDidMount(): void;
  componentDidUpdate(prevProps: Props): void;
  updateHref: () => Promise<void>;
  handleClick: () => void;
  render(): React.JSX.Element;
}
//#endregion
export { LinkTo as default };