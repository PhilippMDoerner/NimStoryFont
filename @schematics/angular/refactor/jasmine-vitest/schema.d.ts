/**
 * Refactors a Jasmine test file to use Vitest.
 */
export type Schema = {
    /**
     * Whether to add imports for the Vitest API. The Angular `unit-test` system automatically
     * uses the Vitest globals option, which means explicit imports for global APIs like
     * `describe`, `it`, `expect`, and `vi` are often not strictly necessary unless Vitest has
     * been configured not to use globals.
     */
    addImports?: boolean;
    /**
     * Whether the tests are intended to run in browser mode. If true, the `toHaveClass`
     * assertions are left as is because Vitest browser mode has such an assertion. Otherwise
     * they're migrated to an equivalent assertion.
     */
    browserMode?: boolean;
    /**
     * Whether to transform `fakeAsync` tests to Vitest fake timers.
     */
    fakeAsync?: boolean;
    /**
     * The file suffix to identify test files (e.g., '.spec.ts', '.test.ts').
     */
    fileSuffix?: string;
    /**
     * A path to a specific file or directory to refactor. If not provided, all test files in
     * the project will be refactored.
     */
    include?: string;
    /**
     * The name of the project where the tests should be refactored. If not specified, the CLI
     * will determine the project from the current directory.
     */
    project?: string;
    /**
     * Whether to generate a summary report file (jasmine-vitest-<date>.md) in the project root.
     */
    report?: boolean;
    /**
     * Enable verbose logging to see detailed information about the transformations being
     * applied.
     */
    verbose?: boolean;
    [property: string]: any;
};
