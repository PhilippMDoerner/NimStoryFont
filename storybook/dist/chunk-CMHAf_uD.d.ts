//#region code/core/.dts-emit/code/core/src/storybook-error.d.ts
declare abstract class StorybookError extends Error {
  private _name;
  /** Category of the error. Used to classify the type of error, e.g., 'PREVIEW_API'. */
  readonly category: string;
  /** Code representing the error. Used to uniquely identify the error, e.g., 1. */
  readonly code: number;
  /**
   * Data associated with the error. Used to provide additional information in the error message or
   * to be passed to telemetry.
   */
  readonly data: {};
  /**
   * Specifies the documentation for the error.
   *
   * - If `true`, links to a documentation page on the Storybook website (make sure it exists before
   *   enabling) – This is not implemented yet.
   * - If a string, uses the provided URL for documentation (external or FAQ links).
   * - If `false` (default), no documentation link is added.
   */
  readonly documentation: boolean | string | string[];
  /** Flag used to easily determine if the error originates from Storybook. */
  readonly fromStorybook: true;
  /**
   * Flag used to determine if the error is handled by us and should therefore not be shown to the
   * user.
   */
  isHandledError: boolean;
  get fullErrorCode(): `SB_${string}_${string}`;
  /** Overrides the default `Error.name` property in the format: SB_<CATEGORY>_<CODE>. */
  get name(): string;
  set name(name: string);
  /**
   * A collection of sub errors which relate to a parent error.
   *
   * Sub-errors are used to represent multiple related errors that occurred together. When a
   * StorybookError with sub-errors is sent to telemetry, both the parent error and each sub-error
   * are sent as separate telemetry events. This allows for better error tracking and debugging.
   *
   * @example
   *
   * ```ts
   * const error1 = new SomeError();
   * const error2 = new AnotherError();
   * const parentError = new ParentError({
   *   // ... other props
   *   subErrors: [error1, error2],
   * });
   * ```
   */
  subErrors: StorybookError[];
  constructor(props: {
    category: string;
    code: number;
    message: string;
    cause?: unknown;
    documentation?: boolean | string | string[];
    isHandledError?: boolean;
    name: string;
    /**
     * Optional array of sub-errors that are related to this error. When this error is sent to
     * telemetry, each sub-error will be sent as a separate event.
     */
    subErrors?: StorybookError[];
  });
  /** Generates the error message along with additional documentation link (if applicable). */
  static getFullMessage({
    documentation,
    code,
    category,
    message
  }: ConstructorParameters<typeof StorybookError>[0]): string;
}
//#endregion
export { StorybookError as t };