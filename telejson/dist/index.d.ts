interface Options {
    allowRegExp: boolean;
    allowSymbol: boolean;
    allowDate: boolean;
    allowUndefined: boolean;
    allowError: boolean;
    maxDepth: number;
    space: number | undefined;
}
declare const isJSON: (input: string) => RegExpMatchArray | null;
declare const replacer: (options: Options) => any;
declare const reviver: (options: Options) => any;
declare const stringify: (data: unknown, options?: Partial<Options>) => string;
declare const parse: (data: string, options?: Partial<Options>) => any;

export { Options, isJSON, parse, replacer, reviver, stringify };
