"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsynchronouslyCreatedResourcePool = exports.WorkerInfo = void 0;
const node_worker_threads_1 = require("node:worker_threads");
const node_perf_hooks_1 = require("node:perf_hooks");
const node_assert_1 = __importDefault(require("node:assert"));
const errors_1 = require("../errors");
const symbols_1 = require("../symbols");
const histogram_1 = require("../histogram");
const base_1 = require("./base");
Object.defineProperty(exports, "AsynchronouslyCreatedResourcePool", { enumerable: true, get: function () { return base_1.AsynchronouslyCreatedResourcePool; } });
__exportStar(require("./balancer"), exports);
class WorkerInfo extends base_1.AsynchronouslyCreatedResource {
    constructor({ worker, port, enableHistogram }, onMessage) {
        super();
        this.idleTimeout = null;
        this.lastSeenResponseCount = 0;
        this.terminating = false;
        this.destroyed = false;
        const { filename, ...workerOpts } = worker;
        this.worker = new node_worker_threads_1.Worker(filename, workerOpts);
        this.port = port;
        this.onMessage = onMessage;
        this.port.on('message', this._handleResponse.bind(this));
        this.taskInfos = new Map();
        this.sharedBuffer = new Int32Array(new SharedArrayBuffer(symbols_1.kFieldCount * Int32Array.BYTES_PER_ELEMENT));
        this.histogram = enableHistogram ? (0, node_perf_hooks_1.createHistogram)() : null;
    }
    get id() {
        return this.worker.threadId;
    }
    onWorkerMessage(handler) {
        this.worker.on('message', handler);
    }
    onWorkerError(handler) {
        this.worker.on('error', handler);
    }
    onWorkerExit(handler) {
        this.worker.on('exit', handler);
    }
    onPortClose(handler) {
        this.port.on('close', handler);
    }
    init(msg, toTransfer) {
        this.worker.postMessage(msg, toTransfer);
        return this;
    }
    workerRef() {
        this.worker.ref();
        return this;
    }
    workerUnref() {
        this.worker.unref();
        return this;
    }
    destroy() {
        if (this.terminating || this.destroyed)
            return;
        this.terminating = true;
        this.clearIdleTimeout();
        this.worker.terminate();
        this.port.close();
        for (const taskInfo of this.taskInfos.values()) {
            taskInfo.done(errors_1.Errors.ThreadTermination());
        }
        this.taskInfos.clear();
        this.terminating = false;
        this.destroyed = true;
        this.markAsDestroyed();
    }
    setIdleTimeout(handler, ms, ...args) {
        this.idleTimeout = setTimeout(handler, ms, ...args).unref();
    }
    clearIdleTimeout() {
        if (this.idleTimeout != null) {
            clearTimeout(this.idleTimeout);
            this.idleTimeout = null;
        }
    }
    ref() {
        this.port.ref();
        return this;
    }
    unref() {
        this.port.unref();
        return this;
    }
    _handleResponse(message) {
        var _a;
        // Both cannot be in different state if histogram enabled.
        (_a = this.histogram) === null || _a === void 0 ? void 0 : _a.record(histogram_1.PiscinaHistogramHandler.toHistogramIntegerNano(message === null || message === void 0 ? void 0 : message.time));
        this.onMessage(message);
        if (this.taskInfos.size === 0) {
            // No more tasks running on this Worker means it should not keep the
            // process running.
            this.unref();
        }
    }
    postTask(taskInfo) {
        // Avoid duplicates
        (0, node_assert_1.default)(!this.taskInfos.has(taskInfo.taskId));
        // Avoid posting when pool is shutting down or worker already destroyed
        (0, node_assert_1.default)(!this.terminating && !this.destroyed);
        const message = {
            task: taskInfo.releaseTask(),
            taskId: taskInfo.taskId,
            filename: taskInfo.filename,
            name: taskInfo.name,
            histogramEnabled: this.histogram != null ? 1 : 0
        };
        try {
            this.port.postMessage(message, taskInfo.transferList);
            queueMicrotask(() => this.clearIdleTimeout());
            taskInfo.workerInfo = this;
            this.taskInfos.set(taskInfo.taskId, taskInfo);
            this.ref();
            // Inform the worker that there are new messages posted, and wake it up
            // if it is waiting for one.
            Atomics.add(this.sharedBuffer, symbols_1.kRequestCountField, 1);
            Atomics.notify(this.sharedBuffer, symbols_1.kRequestCountField, 1);
        }
        catch (err) {
            // This would mostly happen if e.g. message contains unserializable data
            // or transferList is invalid.
            taskInfo.done(err);
        }
    }
    processPendingMessages() {
        if (this.destroyed)
            return;
        // If we *know* that there are more messages than we have received using
        // 'message' events yet, then try to load and handle them synchronously,
        // without the need to wait for more expensive events on the event loop.
        // This would usually break async tracking, but in our case, we already have
        // the extra TaskInfo/AsyncResource layer that rectifies that situation.
        const actualResponseCount = Atomics.load(this.sharedBuffer, symbols_1.kResponseCountField);
        if (actualResponseCount !== this.lastSeenResponseCount) {
            this.lastSeenResponseCount = actualResponseCount;
            let entry;
            while ((entry = (0, node_worker_threads_1.receiveMessageOnPort)(this.port)) != null) {
                this._handleResponse(entry.message);
            }
        }
    }
    isRunningAbortableTask() {
        // If there are abortable tasks, we are running one at most per Worker.
        if (this.taskInfos.size !== 1)
            return false;
        const [[, task]] = this.taskInfos;
        return task.abortSignal != null;
    }
    currentUsage() {
        return this.isRunningAbortableTask() ? Infinity : this.taskInfos.size;
    }
    popTask(taskId) {
        var _a;
        const task = (_a = this.taskInfos.get(taskId)) !== null && _a !== void 0 ? _a : null;
        if (task != null)
            this.taskInfos.delete(taskId);
        return task;
    }
    get interface() {
        const worker = this;
        return {
            get id() {
                return worker.worker.threadId;
            },
            get currentUsage() {
                return worker.currentUsage();
            },
            get isRunningAbortableTask() {
                return worker.isRunningAbortableTask();
            },
            get histogram() {
                return worker.histogram != null ? histogram_1.PiscinaHistogramHandler.createHistogramSummary(worker.histogram) : null;
            },
            get terminating() {
                return worker.terminating;
            },
            get destroyed() {
                return worker.destroyed;
            },
            [symbols_1.kWorkerData]: worker
        };
    }
}
exports.WorkerInfo = WorkerInfo;
//# sourceMappingURL=index.js.map