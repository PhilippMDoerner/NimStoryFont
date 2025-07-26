/**
 * Unit testing options for Angular applications.
 */
export type Schema = {
    /**
     * A list of browsers to use for test execution. If undefined, jsdom on Node.js will be used
     * instead of a browser.
     */
    browsers?: string[];
    /**
     * A build builder target to serve in the format of `project:target[:configuration]`. You
     * can also pass in more than one configuration name as a comma-separated list. Example:
     * `project:target:production,staging`.
     */
    buildTarget: string;
    /**
     * Output a code coverage report.
     */
    codeCoverage?: boolean;
    /**
     * Globs to exclude from code coverage.
     */
    codeCoverageExclude?: string[];
    /**
     * Initialize the test runner to support using the Node Inspector for test debugging.
     */
    debug?: boolean;
    /**
     * Globs of files to exclude, relative to the project root.
     */
    exclude?: string[];
    /**
     * Globs of files to include, relative to project root.
     * There are 2 special cases:
     * - when a path to directory is provided, all spec files ending ".spec.@(ts|tsx)" will be
     * included
     * - when a path to a file is provided, and a matching spec file exists it will be included
     * instead.
     */
    include?: string[];
    /**
     * TypeScript file that exports an array of Angular providers to use during test execution.
     * The array must be a default export.
     */
    providersFile?: string;
    /**
     * Test runner reporters to use. Directly passed to the test runner.
     */
    reporters?: string[];
    /**
     * The name of the test runner to use for test execution.
     */
    runner: Runner;
    /**
     * The name of the TypeScript configuration file.
     */
    tsConfig: string;
    /**
     * Run build when files change.
     */
    watch?: boolean;
};
/**
 * The name of the test runner to use for test execution.
 */
export declare enum Runner {
    Karma = "karma",
    Vitest = "vitest"
}
