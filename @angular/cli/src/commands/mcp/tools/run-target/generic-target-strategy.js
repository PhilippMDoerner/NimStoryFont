"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericTargetStrategy = void 0;
const utils_1 = require("../../utils");
const options_serializer_1 = require("./options-serializer");
const BUILT_IN_COMMANDS = new Set([
    'build',
    'test',
    'e2e',
    'serve',
    'deploy',
    'extract-i18n',
    'lint',
]);
class GenericTargetStrategy {
    canHandle(targetName, builder) {
        return true; // Universal fallback strategy
    }
    async execute(input, context) {
        if (input.targetName === 'serve' || input.options?.['watch'] === true) {
            throw new Error(`Watch mode execution (serve target or watch option) is not yet supported by 'run_target'. ` +
                `Please use the legacy 'devserver_start' / 'devserver_wait_for_build' tools instead.`);
        }
        const args = [];
        if (BUILT_IN_COMMANDS.has(input.targetName)) {
            args.push(input.targetName, input.projectName);
        }
        else {
            args.push('run', `${input.projectName}:${input.targetName}`);
        }
        if (input.configuration) {
            args.push('-c', input.configuration);
        }
        let options = input.options;
        if (input.targetName === 'test') {
            options = {
                ...options,
                watch: false,
            };
        }
        args.push(...(0, options_serializer_1.serializeOptions)(options));
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
exports.GenericTargetStrategy = GenericTargetStrategy;
//# sourceMappingURL=generic-target-strategy.js.map