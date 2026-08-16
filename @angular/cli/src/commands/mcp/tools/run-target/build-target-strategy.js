"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildTargetStrategy = void 0;
const utils_1 = require("../../utils");
const options_serializer_1 = require("./options-serializer");
class BuildTargetStrategy {
    canHandle(targetName, builder) {
        return (targetName === 'build' &&
            (builder === '@angular-devkit/build-angular:application' ||
                builder === '@angular-devkit/build-angular:browser' ||
                builder === '@angular/build:application' ||
                builder === '@angular-devkit/build-angular:ng-packagr'));
    }
    async execute(input, context) {
        const args = ['build', input.projectName];
        if (input.configuration) {
            args.push('-c', input.configuration);
        }
        args.push(...(0, options_serializer_1.serializeOptions)(input.options));
        let status = 'success';
        let logs;
        try {
            const result = await context.host.executeNgCommand(args, { cwd: input.workspacePath });
            logs = result.logs;
        }
        catch (e) {
            status = 'failure';
            logs = (0, utils_1.getCommandErrorLogs)(e);
        }
        let outputPath;
        for (const line of logs) {
            const match = line.match(/Output location: (.*)/);
            if (match) {
                outputPath = match[1].trim();
                break;
            }
        }
        return {
            status,
            logs,
            extensions: outputPath ? { outputPath } : undefined,
        };
    }
}
exports.BuildTargetStrategy = BuildTargetStrategy;
//# sourceMappingURL=build-target-strategy.js.map