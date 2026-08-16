import type { ESLint } from 'eslint';
import type { Schema } from '../schema';
/**
 * The conventional flat config file names that ESLint resolves automatically.
 *
 * NOTE: this is NOT a restriction on what an explicitly provided config file may
 * be named. ESLint's own `--config`/`overrideConfigFile` accepts a flat config
 * file with any name, and so does this builder (see the legacy eslintrc denylist
 * below). This list only mirrors the names ESLint discovers on its own when no
 * explicit config is given, so we can reconstruct a likely config path for
 * diagnostic messages.
 */
export declare const defaultFlatConfigNames: string[];
export declare function resolveAndInstantiateESLint(eslintConfigPath: string | undefined, options: Schema): Promise<{
    ESLint: typeof import("eslint").ESLint;
    eslint: ESLint;
}>;
//# sourceMappingURL=eslint-utils.d.ts.map