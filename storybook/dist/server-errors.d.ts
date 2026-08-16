import { Is as StandardSchemaV1, Os as ServiceId, i as Status, l as StatusTypeId } from "./chunk-Cp-ouEY1.js";
import { t as StorybookError } from "./chunk-CMHAf_uD.js";

//#region code/core/.dts-emit/code/core/src/shared/open-service/errors.d.ts
/** Identifies which operation surface produced a validation failure. */
type OperationKind = 'query' | 'command';
/**
 * Describes the operation and validation phase associated with a schema failure.
 */
type ValidationMeta = {
  kind: OperationKind;
  serviceId: ServiceId;
  name: string;
  phase: 'input' | 'output';
  issues: ReadonlyArray<StandardSchemaV1.Issue>;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/server-errors.d.ts
/**
 * If you can't find a suitable category for your error, create one based on the package name/file
 * path of which the error is thrown. For instance: If it's from `@storybook/node-logger`, then
 * NODE-LOGGER If it's from a package that is too broad, e.g. @storybook/cli in the init command,
 * then use a combination like CLI_INIT
 */
declare enum Category {
  CLI = "CLI",
  CLI_INIT = "CLI_INIT",
  CLI_AUTOMIGRATE = "CLI_AUTOMIGRATE",
  CLI_UPGRADE = "CLI_UPGRADE",
  CLI_ADD = "CLI_ADD",
  CODEMOD = "CODEMOD",
  CORE_SERVER = "CORE-SERVER",
  CSF_PLUGIN = "CSF-PLUGIN",
  CSF_TOOLS = "CSF-TOOLS",
  CORE_COMMON = "CORE-COMMON",
  NODE_LOGGER = "NODE-LOGGER",
  TELEMETRY = "TELEMETRY",
  BUILDER_MANAGER = "BUILDER-MANAGER",
  BUILDER_VITE = "BUILDER-VITE",
  BUILDER_WEBPACK5 = "BUILDER-WEBPACK5",
  SOURCE_LOADER = "SOURCE-LOADER",
  POSTINSTALL = "POSTINSTALL",
  DOCS_TOOLS = "DOCS-TOOLS",
  CORE_WEBPACK = "CORE-WEBPACK",
  FRAMEWORK_ANGULAR = "FRAMEWORK_ANGULAR",
  FRAMEWORK_EMBER = "FRAMEWORK_EMBER",
  FRAMEWORK_HTML_VITE = "FRAMEWORK_HTML-VITE",
  FRAMEWORK_HTML_WEBPACK5 = "FRAMEWORK_HTML-WEBPACK5",
  FRAMEWORK_NEXTJS = "FRAMEWORK_NEXTJS",
  FRAMEWORK_PREACT_VITE = "FRAMEWORK_PREACT-VITE",
  FRAMEWORK_PREACT_WEBPACK5 = "FRAMEWORK_PREACT-WEBPACK5",
  FRAMEWORK_REACT_VITE = "FRAMEWORK_REACT-VITE",
  FRAMEWORK_REACT_WEBPACK5 = "FRAMEWORK_REACT-WEBPACK5",
  FRAMEWORK_SERVER_WEBPACK5 = "FRAMEWORK_SERVER-WEBPACK5",
  FRAMEWORK_SVELTE_VITE = "FRAMEWORK_SVELTE-VITE",
  FRAMEWORK_SVELTEKIT = "FRAMEWORK_SVELTEKIT",
  FRAMEWORK_VUE_VITE = "FRAMEWORK_VUE-VITE",
  FRAMEWORK_VUE_WEBPACK5 = "FRAMEWORK_VUE-WEBPACK5",
  FRAMEWORK_VUE3_VITE = "FRAMEWORK_VUE3-VITE",
  FRAMEWORK_VUE3_WEBPACK5 = "FRAMEWORK_VUE3-WEBPACK5",
  FRAMEWORK_WEB_COMPONENTS_VITE = "FRAMEWORK_WEB-COMPONENTS-VITE",
  FRAMEWORK_WEB_COMPONENTS_WEBPACK5 = "FRAMEWORK_WEB-COMPONENTS-WEBPACK5"
}
declare class NxProjectDetectedError extends StorybookError {
  constructor();
}
declare class MissingFrameworkFieldError extends StorybookError {
  constructor();
}
declare class InvalidFrameworkNameError extends StorybookError {
  data: {
    frameworkName: string;
  };
  constructor(data: {
    frameworkName: string;
  });
}
declare class CouldNotEvaluateFrameworkError extends StorybookError {
  data: {
    frameworkName: string;
  };
  constructor(data: {
    frameworkName: string;
  });
}
declare class ConflictingStaticDirConfigError extends StorybookError {
  constructor();
}
declare class InvalidStoriesEntryError extends StorybookError {
  constructor();
}
declare class OpenServiceValidationError extends StorybookError {
  data: ValidationMeta;
  constructor(data: ValidationMeta);
}
declare class OpenServiceDuplicateRegistrationError extends StorybookError {
  data: {
    serviceId: ServiceId;
  };
  constructor(data: {
    serviceId: ServiceId;
  });
}
declare class OpenServiceMissingServiceError extends StorybookError {
  data: {
    serviceId: ServiceId;
  };
  constructor(data: {
    serviceId: ServiceId;
  });
}
declare class OpenServiceUnimplementedOperationError extends StorybookError {
  data: {
    serviceId: ServiceId;
    name: string;
    kind: 'query' | 'command';
  };
  constructor(data: {
    serviceId: ServiceId;
    name: string;
    kind: 'query' | 'command';
  });
}
declare class OpenServiceInvalidStaticPathError extends StorybookError {
  data: {
    serviceId: ServiceId;
    name: string;
    path: string;
  };
  constructor(data: {
    serviceId: ServiceId;
    name: string;
    path: string;
  });
}
declare class OpenServiceAsyncSchemaError extends StorybookError {
  data: {
    serviceId: ServiceId;
    name: string;
    kind: 'query' | 'command';
    phase: 'input' | 'output';
  };
  constructor(data: {
    serviceId: ServiceId;
    name: string;
    kind: 'query' | 'command';
    phase: 'input' | 'output';
  });
}
declare class OpenServiceLoadedDrainExceededError extends StorybookError {
  data: {
    serviceId: ServiceId;
    name: string;
    iterations: number;
  };
  constructor(data: {
    serviceId: ServiceId;
    name: string;
    iterations: number;
  });
}
declare class OpenServiceDocgenMissingComponentError extends StorybookError {
  data: {
    id: string;
  };
  constructor(data: {
    id: string;
  });
}
declare class OpenServiceMissingChannelError extends StorybookError {
  data: {
    serviceId?: ServiceId;
  };
  constructor(data?: {
    serviceId?: ServiceId;
  });
}
declare class OpenServiceRemoteCommandDisconnectedError extends StorybookError {
  data: {
    serviceId: ServiceId;
  };
  constructor(data: {
    serviceId: ServiceId;
  });
}
declare class OpenServiceRemoteCommandUnhandledError extends StorybookError {
  data: {
    serviceId: ServiceId;
    commandName: string;
  };
  constructor(data: {
    serviceId: ServiceId;
    commandName: string;
  });
}
declare class WebpackMissingStatsError extends StorybookError {
  constructor();
}
declare class WebpackInvocationError extends StorybookError {
  data: {
    error: Error;
  };
  constructor(data: {
    error: Error;
  });
}
declare class WebpackCompilationError extends StorybookError {
  data: {
    errors: {
      message: string;
      stack?: string;
      name?: string;
    }[];
  };
  constructor(data: {
    errors: {
      message: string;
      stack?: string;
      name?: string;
    }[];
  });
}
declare class MissingAngularJsonError extends StorybookError {
  data: {
    path: string;
  };
  constructor(data: {
    path: string;
  });
}
declare class AngularLegacyBuildOptionsError extends StorybookError {
  constructor();
}
declare class CriticalPresetLoadError extends StorybookError {
  data: {
    error: Error;
    presetName: string;
  };
  constructor(data: {
    error: Error;
    presetName: string;
  });
}
declare class MissingBuilderError extends StorybookError {
  constructor();
}
declare class GoogleFontsDownloadError extends StorybookError {
  data: {
    fontFamily: string;
    url: string;
  };
  constructor(data: {
    fontFamily: string;
    url: string;
  });
}
declare class GoogleFontsLoadingError extends StorybookError {
  data: {
    error: unknown | Error;
    url: string;
  };
  constructor(data: {
    error: unknown | Error;
    url: string;
  });
}
declare class SvelteViteWithSvelteKitError extends StorybookError {
  constructor();
}
declare class NoMatchingExportError extends StorybookError {
  data: {
    error: unknown | Error;
  };
  constructor(data: {
    error: unknown | Error;
  });
}
declare class MainFileMissingError extends StorybookError {
  data: {
    location: string;
    source?: 'storybook' | 'vitest';
  };
  constructor(data: {
    location: string;
    source?: 'storybook' | 'vitest';
  });
}
declare class MainFileEvaluationError extends StorybookError {
  data: {
    location: string;
    error: Error;
  };
  constructor(data: {
    location: string;
    error: Error;
  });
}
declare class StatusTypeIdMismatchError extends StorybookError {
  data: {
    status: Status;
    typeId: StatusTypeId;
  };
  constructor(data: {
    status: Status;
    typeId: StatusTypeId;
  });
}
declare class NoFreePortError extends StorybookError {
  data: {
    requestedPort?: number;
  };
  constructor(data: {
    requestedPort?: number;
  });
}
declare class GenerateNewProjectOnInitError extends StorybookError {
  data: {
    error: unknown | Error;
    packageManager: string;
    projectType: string;
  };
  constructor(data: {
    error: unknown | Error;
    packageManager: string;
    projectType: string;
  });
}
type MinimumReleaseAgeHandledErrorData = {
  message: string;
  cause?: unknown;
} | {
  packageManagerName: string;
  minimumReleaseAgeConfigName: string;
  minimumReleaseAgeConfigDocs: string;
  minimumReleaseAgeExclusionsConfigName?: string;
  minimumReleaseAgeExclusionsConfigDocs?: string;
  failedPackage?: string | null;
  cause?: unknown;
};
declare class MinimumReleaseAgeHandledError extends StorybookError {
  data: MinimumReleaseAgeHandledErrorData;
  constructor(data: MinimumReleaseAgeHandledErrorData);
}
declare class AddonVitestPostinstallPrerequisiteCheckError extends StorybookError {
  data: {
    reasons: string[];
  };
  constructor(data: {
    reasons: string[];
  });
}
declare class AddonVitestPostinstallFailedAddonA11yError extends StorybookError {
  data: {
    error: unknown | Error;
  };
  constructor(data: {
    error: unknown | Error;
  });
}
declare class AddonVitestPostinstallWorkspaceUpdateError extends StorybookError {
  data: {
    filePath: string;
  };
  constructor(data: {
    filePath: string;
  });
}
declare class AddonVitestPostinstallConfigUpdateError extends StorybookError {
  data: {
    filePath: string;
  };
  constructor(data: {
    filePath: string;
  });
}
declare class AddonVitestPostinstallError extends StorybookError {
  data: {
    errors: StorybookError[];
  };
  constructor(data: {
    errors: StorybookError[];
  });
}
declare class UpgradeStorybookToLowerVersionError extends StorybookError {
  data: {
    beforeVersion: string;
    currentVersion: string;
  };
  constructor(data: {
    beforeVersion: string;
    currentVersion: string;
  });
}
declare class UpgradeStorybookUnknownCurrentVersionError extends StorybookError {
  constructor();
}
declare class NoStatsForViteDevError extends StorybookError {
  constructor();
}
declare class ViteModuleGraphSubscriptionError extends StorybookError {
  constructor();
}
declare class FindPackageVersionsError extends StorybookError {
  data: {
    error: Error | unknown;
    packageName: string;
    packageManager: string;
  };
  constructor(data: {
    error: Error | unknown;
    packageName: string;
    packageManager: string;
  });
}
declare class IncompatiblePostCssConfigError extends StorybookError {
  data: {
    error: Error;
  };
  constructor(data: {
    error: Error;
  });
}
declare class SavingGlobalSettingsFileError extends StorybookError {
  data: {
    filePath: string;
    error: Error | unknown;
  };
  constructor(data: {
    filePath: string;
    error: Error | unknown;
  });
}
declare class CommonJsConfigNotSupportedError extends StorybookError {
  constructor();
}
declare class AutomigrateError extends StorybookError {
  data: {
    errors: Array<Error | unknown>;
  };
  constructor(data: {
    errors: Array<Error | unknown>;
  });
}
//#endregion
export { AddonVitestPostinstallConfigUpdateError, AddonVitestPostinstallError, AddonVitestPostinstallFailedAddonA11yError, AddonVitestPostinstallPrerequisiteCheckError, AddonVitestPostinstallWorkspaceUpdateError, AngularLegacyBuildOptionsError, AutomigrateError, Category, CommonJsConfigNotSupportedError, ConflictingStaticDirConfigError, CouldNotEvaluateFrameworkError, CriticalPresetLoadError, FindPackageVersionsError, GenerateNewProjectOnInitError, GoogleFontsDownloadError, GoogleFontsLoadingError, IncompatiblePostCssConfigError, InvalidFrameworkNameError, InvalidStoriesEntryError, MainFileEvaluationError, MainFileMissingError, MinimumReleaseAgeHandledError, MissingAngularJsonError, MissingBuilderError, MissingFrameworkFieldError, NoFreePortError, NoMatchingExportError, NoStatsForViteDevError, NxProjectDetectedError, OpenServiceAsyncSchemaError, OpenServiceDocgenMissingComponentError, OpenServiceDuplicateRegistrationError, OpenServiceInvalidStaticPathError, OpenServiceLoadedDrainExceededError, OpenServiceMissingChannelError, OpenServiceMissingServiceError, OpenServiceRemoteCommandDisconnectedError, OpenServiceRemoteCommandUnhandledError, OpenServiceUnimplementedOperationError, OpenServiceValidationError, SavingGlobalSettingsFileError, StatusTypeIdMismatchError, StorybookError, SvelteViteWithSvelteKitError, UpgradeStorybookToLowerVersionError, UpgradeStorybookUnknownCurrentVersionError, ViteModuleGraphSubscriptionError, WebpackCompilationError, WebpackInvocationError, WebpackMissingStatsError };