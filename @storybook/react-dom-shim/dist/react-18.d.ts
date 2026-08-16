import { ReactElement } from "react";
import { RootOptions } from "react-dom/client";

//#region code/lib/react-dom-shim/.dts-emit/code/lib/react-dom-shim/src/react-18.d.ts
declare const renderElement: (node: ReactElement, el: Element, rootOptions?: RootOptions) => Promise<void>;
declare const unmountElement: (el: Element, shouldUseNewRootApi?: boolean) => void;
//#endregion
export { renderElement, unmountElement };