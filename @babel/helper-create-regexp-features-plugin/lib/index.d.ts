import { PluginObject } from '@babel/core';

declare const FEATURES: Readonly<{
    unicodeFlag: number;
    dotAllFlag: number;
    unicodePropertyEscape: number;
    namedCaptureGroups: number;
    unicodeSetsFlag_syntax: number;
    unicodeSetsFlag: number;
    duplicateNamedCaptureGroups: number;
    modifiers: number;
}>;

interface Options {
    name: string;
    feature: keyof typeof FEATURES;
    options?: {
        useUnicodeFlag?: boolean;
        runtime?: boolean;
    };
    manipulateOptions?: PluginObject["manipulateOptions"];
}
declare function createRegExpFeaturePlugin({ name, feature, options, manipulateOptions, }: Options): PluginObject;

export { type Options, createRegExpFeaturePlugin };
