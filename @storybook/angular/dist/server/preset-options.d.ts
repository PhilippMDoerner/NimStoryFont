import { Options as CoreOptions } from 'storybook/internal/types';
import { BuilderContext } from '@angular-devkit/architect';
import { StandaloneOptions } from '../builders/utils/standalone-options';
export type PresetOptions = CoreOptions & {
    angularBrowserTarget?: string | null;
    angularBuilderOptions?: StandaloneOptions['angularBuilderOptions'];
    angularBuilderContext?: BuilderContext | null;
    tsConfig?: string;
};
