"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const core_1 = require("@angular-devkit/core");
const workspace_1 = require("../../utility/workspace");
const workspace_models_1 = require("../../utility/workspace-models");
/**
 * Migration to update the angular workspace configuration.
 */
function default_1() {
    return (0, workspace_1.updateWorkspace)((workspace) => {
        for (const project of workspace.projects.values()) {
            if (project.extensions['projectType'] !== workspace_models_1.ProjectType.Application) {
                continue;
            }
            for (const target of project.targets.values()) {
                if (target.builder !== workspace_models_1.Builders.Application &&
                    target.builder !== workspace_models_1.Builders.BuildApplication) {
                    continue;
                }
                for (const [, options] of (0, workspace_1.allTargetOptions)(target)) {
                    const ssr = options['ssr'];
                    if (!ssr || !(0, core_1.isJsonObject)(ssr)) {
                        continue;
                    }
                    const platform = ssr['experimentalPlatform'];
                    if (platform) {
                        ssr['platform'] = platform;
                        delete ssr['experimentalPlatform'];
                    }
                }
            }
        }
    });
}
//# sourceMappingURL=migration.js.map