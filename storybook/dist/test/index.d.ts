import * as domTestingLibrary from "@testing-library/dom";
import * as _userEvent from "@testing-library/user-event";
import { userEvent as userEvent$1 } from "@testing-library/user-event";
import { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import { AsymmetricMatchersContaining, ExpectStatic, JestAssertion, MatcherState, MatchersObject } from "@vitest/expect";
import { MaybeMocked, MaybeMockedDeep, MaybePartiallyMocked, MaybePartiallyMockedDeep, Mock, MockInstance, isMockFunction, mocks, spyOn as spyOn$1 } from "@vitest/spy";
import { FireObject } from "@testing-library/dom/types/events";
export * from "@vitest/spy";

//#region code/core/.dts-emit/code/core/src/test/utils.d.ts
type Promisify<Fn> = Fn extends {
  <T>(...args: infer Args): infer Return;
} ? {
  <T>(...args: Args): Return extends Promise<any> ? Return : Promise<Return>;
} : Fn extends {
  (...args: infer Args): infer Return;
} ? {
  (...args: Args): Return extends Promise<any> ? Return : Promise<Return>;
} : Fn;
type PromisifyObject<O> = { [K in keyof O]: Promisify<O[K]> };
//#endregion
//#region code/core/.dts-emit/code/core/src/test/expect.d.ts
type Matchers<T> = PromisifyObject<JestAssertion<T>> & TestingLibraryMatchers<ReturnType<ExpectStatic['stringContaining']>, Promise<void>>;
interface Assertion<T> extends Matchers<T> {
  toHaveBeenCalledOnce(): Promise<void>;
  toSatisfy<E>(matcher: (value: E) => boolean, message?: string): Promise<void>;
  resolves: Assertion<T>;
  rejects: Assertion<T>;
  not: Assertion<T>;
}
interface Expect extends AsymmetricMatchersContaining {
  <T>(actual: T, message?: string): Assertion<T>;
  unreachable(message?: string): Promise<never>;
  soft<T>(actual: T, message?: string): Assertion<T>;
  extend(expects: MatchersObject): void;
  assertions(expected: number): Promise<void>;
  hasAssertions(): Promise<void>;
  anything(): any;
  any(constructor: unknown): any;
  getState(): MatcherState;
  setState(state: Partial<MatcherState>): void;
  not: AsymmetricMatchersContaining;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/test/spy.d.ts
type Listener = (mock: MockInstance, args: unknown[]) => void;
declare function onMockCall(callback: Listener): () => void;
declare const spyOn: typeof spyOn$1;
type Procedure = (...args: any[]) => any;
declare function fn<T extends Procedure = Procedure>(implementation?: T): Mock<T>;
/**
 * Calls [`.mockClear()`](https://vitest.dev/api/mock#mockclear) on every mocked function. This will
 * only empty `.mock` state, it will not reset implementation.
 *
 * It is useful if you need to clean up mock between different assertions.
 */
declare function clearAllMocks(): void;
/**
 * Calls [`.mockReset()`](https://vitest.dev/api/mock#mockreset) on every mocked function. This will
 * empty `.mock` state, reset "once" implementations and force the base implementation to return
 * `undefined` when invoked.
 *
 * This is useful when you want to completely reset a mock to the default state.
 */
declare function resetAllMocks(): void;
/**
 * Calls [`.mockRestore()`](https://vitest.dev/api/mock#mockrestore) on every mocked function. This
 * will restore all original implementations.
 */
declare function restoreAllMocks(): void;
/**
 * Type helper for TypeScript. Just returns the object that was passed.
 *
 * When `partial` is `true` it will expect a `Partial<T>` as a return value. By default, this will
 * only make TypeScript believe that the first level values are mocked. You can pass down `{ deep:
 * true }` as a second argument to tell TypeScript that the whole object is mocked, if it actually
 * is.
 *
 * @param item Anything that can be mocked
 * @param deep If the object is deeply mocked
 * @param options If the object is partially or deeply mocked
 */
declare function mocked<T>(item: T, deep?: false): MaybeMocked<T>;
declare function mocked<T>(item: T, deep: true): MaybeMockedDeep<T>;
declare function mocked<T>(item: T, options: {
  partial?: false;
  deep?: false;
}): MaybeMocked<T>;
declare function mocked<T>(item: T, options: {
  partial?: false;
  deep: true;
}): MaybeMockedDeep<T>;
declare function mocked<T>(item: T, options: {
  partial: true;
  deep?: false;
}): MaybePartiallyMocked<T>;
declare function mocked<T>(item: T, options: {
  partial: true;
  deep: true;
}): MaybePartiallyMockedDeep<T>;
declare function mocked<T>(item: T): MaybeMocked<T>;
//#endregion
//#region code/core/.dts-emit/code/core/src/test/testing-library.d.ts
declare const buildQueries: typeof domTestingLibrary.buildQueries, configure: typeof domTestingLibrary.configure, createEvent: domTestingLibrary.CreateObject & domTestingLibrary.CreateFunction, fireEvent: (<T>(element: Document | Element | Node | Window, event: Event) => Promise<false> | Promise<true>) & PromisifyObject<FireObject>, findAllByAltText: typeof domTestingLibrary.findAllByAltText, findAllByDisplayValue: typeof domTestingLibrary.findAllByDisplayValue, findAllByLabelText: typeof domTestingLibrary.findAllByLabelText, findAllByPlaceholderText: typeof domTestingLibrary.findAllByPlaceholderText, findAllByRole: typeof domTestingLibrary.findAllByRole, findAllByTestId: typeof domTestingLibrary.findAllByTestId, findAllByText: typeof domTestingLibrary.findAllByText, findAllByTitle: typeof domTestingLibrary.findAllByTitle, findByAltText: typeof domTestingLibrary.findByAltText, findByDisplayValue: typeof domTestingLibrary.findByDisplayValue, findByLabelText: typeof domTestingLibrary.findByLabelText, findByPlaceholderText: typeof domTestingLibrary.findByPlaceholderText, findByRole: typeof domTestingLibrary.findByRole, findByTestId: typeof domTestingLibrary.findByTestId, findByText: typeof domTestingLibrary.findByText, findByTitle: typeof domTestingLibrary.findByTitle, getAllByAltText: typeof domTestingLibrary.getAllByAltText, getAllByDisplayValue: typeof domTestingLibrary.getAllByDisplayValue, getAllByLabelText: typeof domTestingLibrary.getAllByLabelText, getAllByPlaceholderText: typeof domTestingLibrary.getAllByPlaceholderText, getAllByRole: typeof domTestingLibrary.getAllByRole, getAllByTestId: typeof domTestingLibrary.getAllByTestId, getAllByText: typeof domTestingLibrary.getAllByText, getAllByTitle: typeof domTestingLibrary.getAllByTitle, getByAltText: typeof domTestingLibrary.getByAltText, getByDisplayValue: typeof domTestingLibrary.getByDisplayValue, getByLabelText: typeof domTestingLibrary.getByLabelText, getByPlaceholderText: typeof domTestingLibrary.getByPlaceholderText, getByRole: typeof domTestingLibrary.getByRole, getByTestId: typeof domTestingLibrary.getByTestId, getByText: typeof domTestingLibrary.getByText, getByTitle: typeof domTestingLibrary.getByTitle, getConfig: typeof domTestingLibrary.getConfig, getDefaultNormalizer: typeof domTestingLibrary.getDefaultNormalizer, getElementError: typeof domTestingLibrary.getElementError, getNodeText: typeof domTestingLibrary.getNodeText, getQueriesForElement: typeof domTestingLibrary.getQueriesForElement, getRoles: typeof domTestingLibrary.getRoles, getSuggestedQuery: typeof domTestingLibrary.getSuggestedQuery, isInaccessible: typeof domTestingLibrary.isInaccessible, logDOM: typeof domTestingLibrary.logDOM, logRoles: typeof domTestingLibrary.logRoles, prettyDOM: typeof domTestingLibrary.prettyDOM, queries: typeof domTestingLibrary.queries, queryAllByAltText: typeof domTestingLibrary.queryAllByAltText, queryAllByAttribute: domTestingLibrary.AllByAttribute, queryAllByDisplayValue: typeof domTestingLibrary.queryAllByDisplayValue, queryAllByLabelText: typeof domTestingLibrary.queryAllByLabelText, queryAllByPlaceholderText: typeof domTestingLibrary.queryAllByPlaceholderText, queryAllByRole: typeof domTestingLibrary.queryAllByRole, queryAllByTestId: typeof domTestingLibrary.queryAllByTestId, queryAllByText: typeof domTestingLibrary.queryAllByText, queryAllByTitle: typeof domTestingLibrary.queryAllByTitle, queryByAltText: typeof domTestingLibrary.queryByAltText, queryByAttribute: domTestingLibrary.QueryByAttribute, queryByDisplayValue: typeof domTestingLibrary.queryByDisplayValue, queryByLabelText: typeof domTestingLibrary.queryByLabelText, queryByPlaceholderText: typeof domTestingLibrary.queryByPlaceholderText, queryByRole: typeof domTestingLibrary.queryByRole, queryByTestId: typeof domTestingLibrary.queryByTestId, queryByText: typeof domTestingLibrary.queryByText, queryByTitle: typeof domTestingLibrary.queryByTitle, queryHelpers: typeof domTestingLibrary.queryHelpers, screen: domTestingLibrary.Screen<typeof domTestingLibrary.queries>, waitFor: typeof domTestingLibrary.waitFor, waitForElementToBeRemoved: typeof domTestingLibrary.waitForElementToBeRemoved, within: typeof domTestingLibrary.getQueriesForElement, prettyFormat: typeof domTestingLibrary.prettyFormat;
type _UserEvent = typeof _userEvent;
interface UserEvent extends _UserEvent {}
declare const uninstrumentedUserEvent: {
  readonly setup: typeof import("@testing-library/user-event/dist/cjs/setup/setup.js").setupMain;
  readonly clear: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").clear;
  readonly click: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").click;
  readonly copy: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").copy;
  readonly cut: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").cut;
  readonly dblClick: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").dblClick;
  readonly deselectOptions: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").deselectOptions;
  readonly hover: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").hover;
  readonly keyboard: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").keyboard;
  readonly pointer: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").pointer;
  readonly paste: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").paste;
  readonly selectOptions: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").selectOptions;
  readonly tripleClick: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").tripleClick;
  readonly type: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").type;
  readonly unhover: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").unhover;
  readonly upload: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").upload;
  readonly tab: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").tab;
};
declare const userEvent: {
  readonly setup: typeof import("@testing-library/user-event/dist/cjs/setup/setup.js").setupMain;
  readonly clear: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").clear;
  readonly click: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").click;
  readonly copy: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").copy;
  readonly cut: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").cut;
  readonly dblClick: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").dblClick;
  readonly deselectOptions: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").deselectOptions;
  readonly hover: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").hover;
  readonly keyboard: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").keyboard;
  readonly pointer: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").pointer;
  readonly paste: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").paste;
  readonly selectOptions: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").selectOptions;
  readonly tripleClick: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").tripleClick;
  readonly type: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").type;
  readonly unhover: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").unhover;
  readonly upload: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").upload;
  readonly tab: typeof import("@testing-library/user-event/dist/cjs/setup/directApi.js").tab;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/test/index.d.ts
type UserEventObject = ReturnType<typeof userEvent$1.setup>;
declare const expect: Expect;
type ModuleMockOptions = {
  spy?: boolean;
};
type ReturnTypeOfModuleMocker = (path: string | Promise<unknown>, factory?: ModuleMockOptions) => void;
declare const sb: {
  mock: ReturnTypeOfModuleMocker;
};
//#endregion
export { type Assertion, type Expect, UserEvent, UserEventObject, buildQueries, clearAllMocks, configure, createEvent, expect, findAllByAltText, findAllByDisplayValue, findAllByLabelText, findAllByPlaceholderText, findAllByRole, findAllByTestId, findAllByText, findAllByTitle, findByAltText, findByDisplayValue, findByLabelText, findByPlaceholderText, findByRole, findByTestId, findByText, findByTitle, fireEvent, fn, getAllByAltText, getAllByDisplayValue, getAllByLabelText, getAllByPlaceholderText, getAllByRole, getAllByTestId, getAllByText, getAllByTitle, getByAltText, getByDisplayValue, getByLabelText, getByPlaceholderText, getByRole, getByTestId, getByText, getByTitle, getConfig, getDefaultNormalizer, getElementError, getNodeText, getQueriesForElement, getRoles, getSuggestedQuery, isInaccessible, isMockFunction, logDOM, logRoles, mocked, mocks, onMockCall, prettyDOM, prettyFormat, queries, queryAllByAltText, queryAllByAttribute, queryAllByDisplayValue, queryAllByLabelText, queryAllByPlaceholderText, queryAllByRole, queryAllByTestId, queryAllByText, queryAllByTitle, queryByAltText, queryByAttribute, queryByDisplayValue, queryByLabelText, queryByPlaceholderText, queryByRole, queryByTestId, queryByText, queryByTitle, queryHelpers, resetAllMocks, restoreAllMocks, sb, screen, spyOn, uninstrumentedUserEvent, userEvent, waitFor, waitForElementToBeRemoved, within };