import { ParserOptions } from '@babel/parser';
import * as _babel_types from '@babel/types';

/**
 * These are the options that 'babel-template' actually accepts and typechecks
 * when called. All other options are passed through to the parser.
 */
type PublicOpts = {
    /**
     * A set of placeholder names to automatically accept, ignoring the given
     * pattern entirely.
     *
     * This option can be used when using %%foo%% style placeholders.
     */
    placeholderAllowlist?: Set<string>;
    /**
     * A pattern to search for when looking for Identifier and StringLiteral
     * nodes that can be replaced.
     *
     * 'false' will disable placeholder searching entirely, leaving only the
     * 'placeholderAllowlist' value to find replacements.
     *
     * Defaults to /^[_$A-Z0-9]+$/.
     *
     * This option can be used when using %%foo%% style placeholders.
     */
    placeholderPattern?: RegExp | false;
    /**
     * 'true' to pass through comments from the template into the resulting AST,
     * or 'false' to automatically discard comments. Defaults to 'false'.
     */
    preserveComments?: boolean;
    /**
     * 'true' to use %%foo%% style placeholders, 'false' to use legacy placeholders
     * described by placeholderPattern or placeholderAllowlist.
     * When it is not set, it behaves as 'true' if there are syntactic placeholders,
     * otherwise as 'false'.
     */
    syntacticPlaceholders?: boolean | null;
} & ParserOptions;
type PublicReplacements = Record<string, unknown> | unknown[];

type TemplateBuilder<T> = {
    (opts: PublicOpts): TemplateBuilder<T>;
    (tpl: string, opts?: PublicOpts): (replacements?: PublicReplacements) => T;
    (tpl: TemplateStringsArray, ...args: unknown[]): (replacements?: PublicReplacements) => T;
    ast: {
        (tpl: string, opts?: PublicOpts): T;
        (tpl: TemplateStringsArray, ...args: unknown[]): T;
    };
};

declare const smart: TemplateBuilder<_babel_types.Statement | _babel_types.Statement[]>;
declare const statement: TemplateBuilder<_babel_types.Statement>;
declare const statements: TemplateBuilder<_babel_types.Statement[]>;
declare const expression: TemplateBuilder<_babel_types.Expression>;
declare const program: TemplateBuilder<_babel_types.Program>;
declare const _default: TemplateBuilder<_babel_types.Statement | _babel_types.Statement[]> & {
    smart: typeof smart;
    statement: typeof statement;
    statements: typeof statements;
    expression: typeof expression;
    program: typeof program;
} & {
    smart: TemplateBuilder<_babel_types.Statement | _babel_types.Statement[]>;
    statement: TemplateBuilder<_babel_types.Statement>;
    statements: TemplateBuilder<_babel_types.Statement[]>;
    expression: TemplateBuilder<_babel_types.Expression>;
    program: TemplateBuilder<_babel_types.Program>;
    ast: {
        (tpl: string, opts?: PublicOpts): _babel_types.Statement | _babel_types.Statement[];
        (tpl: TemplateStringsArray, ...args: unknown[]): _babel_types.Statement | _babel_types.Statement[];
    };
};

export { type PublicOpts as Options, type PublicReplacements as Replacements, _default as default, expression, program, smart, statement, statements };
