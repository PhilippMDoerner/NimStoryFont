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
const dependency_1 = require("../../utility/dependency");
const latest_versions_1 = require("../../utility/latest-versions");
const workspace_1 = require("../../utility/workspace");
const workspace_models_1 = require("../../utility/workspace-models");
function default_1() {
    return async (tree) => {
        const workspace = await (0, workspace_1.getWorkspace)(tree);
        let needInstrumenter = false;
        for (const [, project] of workspace.projects) {
            for (const [, target] of project.targets) {
                if (target.builder === workspace_models_1.Builders.Karma || target.builder === workspace_models_1.Builders.BuildKarma) {
                    needInstrumenter = true;
                    break;
                }
                if (target.builder === workspace_models_1.Builders.BuildUnitTest) {
                    for (const [, options] of (0, workspace_1.allTargetOptions)(target)) {
                        if (options['runner'] === 'karma') {
                            needInstrumenter = true;
                            break;
                        }
                    }
                }
                if (needInstrumenter) {
                    break;
                }
            }
            if (needInstrumenter) {
                break;
            }
        }
        if (needInstrumenter) {
            return (0, dependency_1.addDependency)('istanbul-lib-instrument', latest_versions_1.latestVersions['istanbul-lib-instrument'], {
                type: dependency_1.DependencyType.Dev,
                existing: dependency_1.ExistingBehavior.Skip,
            });
        }
    };
}
//# sourceMappingURL=migration.js.map