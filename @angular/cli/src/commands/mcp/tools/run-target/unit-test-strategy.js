"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitTestTargetStrategy = void 0;
const utils_1 = require("../../utils");
const options_serializer_1 = require("./options-serializer");
class UnitTestTargetStrategy {
    canHandle(targetName, builder) {
        return (targetName === 'test' &&
            (builder === '@angular-devkit/build-angular:karma' ||
                builder === '@angular/build:karma' ||
                builder === '@angular/build:unit-test'));
    }
    async execute(input, context) {
        const args = ['test', input.projectName];
        if (input.configuration) {
            args.push('-c', input.configuration);
        }
        const builder = input.targetDefinition?.builder;
        if (builder === '@angular/build:unit-test') {
            const isKarma = input.targetDefinition?.options?.['runner'] === 'karma';
            if (isKarma) {
                args.push('--browsers', 'ChromeHeadless');
            }
            else {
                args.push('--headless', 'true');
            }
        }
        else {
            // Default Karma-based builders require explicit ChromeHeadless
            args.push('--browsers', 'ChromeHeadless');
        }
        // Force non-interactive one-off execution
        args.push('--watch', 'false');
        args.push(...(0, options_serializer_1.serializeOptions)(input.options, new Set(['watch'])));
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
        return { status, logs };
    }
}
exports.UnitTestTargetStrategy = UnitTestTargetStrategy;
//# sourceMappingURL=unit-test-strategy.js.map