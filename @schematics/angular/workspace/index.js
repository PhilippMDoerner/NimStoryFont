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
const schematics_1 = require("@angular-devkit/schematics");
const node_child_process_1 = require("node:child_process");
const latest_versions_1 = require("../utility/latest-versions");
function default_1(options) {
    return () => {
        const packageManager = options.packageManager;
        let packageManagerWithVersion;
        if (packageManager) {
            let packageManagerVersion;
            try {
                packageManagerVersion = (0, node_child_process_1.execSync)(`${packageManager} --version`, {
                    encoding: 'utf8',
                    stdio: 'pipe',
                    env: {
                        ...process.env,
                        //  NPM updater notifier will prevents the child process from closing until it timeout after 3 minutes.
                        NO_UPDATE_NOTIFIER: '1',
                        NPM_CONFIG_UPDATE_NOTIFIER: 'false',
                    },
                }).trim();
            }
            catch { }
            if (packageManagerVersion) {
                packageManagerWithVersion = `${packageManager}@${packageManagerVersion}`;
            }
        }
        return (0, schematics_1.mergeWith)((0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            options.minimal ? (0, schematics_1.filter)((path) => !path.endsWith('editorconfig.template')) : (0, schematics_1.noop)(),
            (0, schematics_1.applyTemplates)({
                utils: schematics_1.strings,
                ...options,
                'dot': '.',
                latestVersions: latest_versions_1.latestVersions,
                packageManagerWithVersion,
            }),
        ]));
    };
}
//# sourceMappingURL=index.js.map