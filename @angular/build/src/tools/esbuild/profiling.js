"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetCumulativeDurations = resetCumulativeDurations;
exports.getAndClearCumulativeDurations = getAndClearCumulativeDurations;
exports.mergeCumulativeDurations = mergeCumulativeDurations;
exports.logCumulativeDurations = logCumulativeDurations;
exports.profileAsync = profileAsync;
exports.profileSync = profileSync;
const environment_options_1 = require("../../utils/environment-options");
let cumulativeDurations;
function resetCumulativeDurations() {
    cumulativeDurations?.clear();
}
function getAndClearCumulativeDurations() {
    if (!cumulativeDurations || cumulativeDurations.size === 0) {
        return undefined;
    }
    const data = Object.fromEntries(cumulativeDurations);
    cumulativeDurations.clear();
    return data;
}
function mergeCumulativeDurations(data) {
    cumulativeDurations ??= new Map();
    for (const [name, durations] of Object.entries(data)) {
        let existing = cumulativeDurations.get(name);
        if (!existing) {
            existing = [];
            cumulativeDurations.set(name, existing);
        }
        existing.push(...durations);
    }
}
function logCumulativeDurations() {
    if (!environment_options_1.debugPerformance || !cumulativeDurations) {
        return;
    }
    for (const [name, durations] of cumulativeDurations) {
        let total = 0;
        let min;
        let max;
        for (const duration of durations) {
            total += duration;
            if (min === undefined || duration < min) {
                min = duration;
            }
            if (max === undefined || duration > max) {
                max = duration;
            }
        }
        const average = total / durations.length;
        // eslint-disable-next-line no-console
        console.log(`DURATION[${name}]: ${total.toFixed(9)}s [count: ${durations.length}; avg: ${average.toFixed(9)}s; min: ${min?.toFixed(9)}s; max: ${max?.toFixed(9)}s]`);
    }
}
function recordDuration(name, startTime, cumulative) {
    const duration = Number(process.hrtime.bigint() - startTime) / 10 ** 9;
    if (cumulative) {
        cumulativeDurations ??= new Map();
        const durations = cumulativeDurations.get(name) ?? [];
        durations.push(duration);
        cumulativeDurations.set(name, durations);
    }
    else {
        // eslint-disable-next-line no-console
        console.log(`DURATION[${name}]: ${duration.toFixed(9)}s`);
    }
}
async function profileAsync(name, action, cumulative) {
    if (!environment_options_1.debugPerformance) {
        return action();
    }
    const startTime = process.hrtime.bigint();
    try {
        return await action();
    }
    finally {
        recordDuration(name, startTime, cumulative);
    }
}
function profileSync(name, action, cumulative) {
    if (!environment_options_1.debugPerformance) {
        return action();
    }
    const startTime = process.hrtime.bigint();
    try {
        return action();
    }
    finally {
        recordDuration(name, startTime, cumulative);
    }
}
//# sourceMappingURL=profiling.js.map