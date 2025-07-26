import { CLIOptions } from 'storybook/internal/types';
import { BuilderOutput, Builder as DevkitBuilder } from '@angular-devkit/architect';
import { StylePreprocessorOptions } from '@angular-devkit/build-angular';
import { AssetPattern, SourceMapUnion, StyleElement } from '@angular-devkit/build-angular/src/builders/browser/schema';
import { JsonObject } from '@angular-devkit/core';
export type StorybookBuilderOptions = JsonObject & {
    browserTarget?: string | null;
    tsConfig?: string;
    test: boolean;
    docs: boolean;
    compodoc: boolean;
    compodocArgs: string[];
    enableProdMode?: boolean;
    styles?: StyleElement[];
    stylePreprocessorOptions?: StylePreprocessorOptions;
    preserveSymlinks?: boolean;
    assets?: AssetPattern[];
    sourceMap?: SourceMapUnion;
    experimentalZoneless?: boolean;
} & Pick<CLIOptions, 'outputDir' | 'configDir' | 'loglevel' | 'quiet' | 'test' | 'webpackStatsJson' | 'statsJson' | 'disableTelemetry' | 'debugWebpack' | 'previewUrl'>;
export type StorybookBuilderOutput = JsonObject & BuilderOutput & {
    [key: string]: any;
};
declare const _default: DevkitBuilder<StorybookBuilderOptions & JsonObject>;
export default _default;
