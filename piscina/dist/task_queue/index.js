"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskInfo = exports.FixedQueue = exports.ArrayTaskQueue = void 0;
exports.isTaskQueue = isTaskQueue;
const node_perf_hooks_1 = require("node:perf_hooks");
const node_async_hooks_1 = require("node:async_hooks");
const abort_1 = require("../abort");
const common_1 = require("../common");
const symbols_1 = require("../symbols");
var array_queue_1 = require("./array_queue");
Object.defineProperty(exports, "ArrayTaskQueue", { enumerable: true, get: function () { return array_queue_1.ArrayTaskQueue; } });
var fixed_queue_1 = require("./fixed_queue");
Object.defineProperty(exports, "FixedQueue", { enumerable: true, get: function () { return fixed_queue_1.FixedQueue; } });
/**
 * Verifies if a given TaskQueue is valid
 *
 * @export
 * @param {*} value
 * @return {*}  {boolean}
 */
function isTaskQueue(value) {
    return (typeof value === 'object' &&
        value !== null &&
        'size' in value &&
        typeof value.shift === 'function' &&
        typeof value.remove === 'function' &&
        typeof value.push === 'function');
}
let taskIdCounter = 0;
// Extend AsyncResource so that async relations between posting a task and
// receiving its result are visible to diagnostic tools.
class TaskInfo extends node_async_hooks_1.AsyncResource {
    constructor({ task, transferList, filename, name, abortSignal, triggerAsyncId, }, callback) {
        super('Piscina.Task', { requireManualDestroy: true, triggerAsyncId });
        this.workerInfo = null;
        this.aborted = false;
        this._abortListener = () => { this.aborted = true; };
        this._abortCleaner = null;
        this.callback = callback;
        this.task = task;
        this.transferList = transferList;
        // If the task is a Transferable returned by
        // Piscina.move(), then add it to the transferList
        // automatically
        if ((0, common_1.isMovable)(task)) {
            // This condition should never be hit but typescript
            // complains if we dont do the check.
            /* c8 ignore next */
            if (this.transferList == null) {
                this.transferList = [];
            }
            this.transferList = this.transferList.concat(task[symbols_1.kTransferable]);
            this.task = task[symbols_1.kValue];
        }
        this.filename = filename;
        this.name = name;
        // TODO: This should not be global
        this.taskId = taskIdCounter++;
        this.abortSignal = abortSignal;
        this.created = node_perf_hooks_1.performance.now();
        this.started = 0;
    }
    onAbort(value) {
        this._abortListener = () => {
            this.aborted = true;
            value();
        };
    }
    setAbortListener(signal) {
        this._abortCleaner = (0, abort_1.onabort)(signal, this._abortListener);
    }
    releaseTask() {
        const ret = this.task;
        this.task = null;
        return ret;
    }
    // TODO: implement - helpful for streaming chunks of data from worker to parent
    onResponse(_result) { }
    done(err, result) {
        var _a;
        this.runInAsyncScope(this.callback, null, err, result);
        this.emitDestroy(); // `TaskInfo`s are used only once.
        // If an abort signal was used, remove the listener from it when
        // done to make sure we do not accidentally leak.
        (_a = this._abortCleaner) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    get [symbols_1.kQueueOptions]() {
        var _a, _b;
        return (_b = (_a = this.task) === null || _a === void 0 ? void 0 : _a[symbols_1.kQueueOptions]) !== null && _b !== void 0 ? _b : null;
    }
    get interface() {
        return {
            taskId: this.taskId,
            filename: this.filename,
            name: this.name,
            created: this.created,
            isAbortable: this.abortSignal !== null,
            [symbols_1.kQueueOptions]: this[symbols_1.kQueueOptions]
        };
    }
}
exports.TaskInfo = TaskInfo;
//# sourceMappingURL=index.js.map