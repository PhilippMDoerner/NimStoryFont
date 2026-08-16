import { Worker, MessagePort, WorkerOptions, Transferable } from 'node:worker_threads';
import { RecordableHistogram } from 'node:perf_hooks';
import { ResponseMessage, StartupMessage } from '../types';
import { TaskInfo } from '../task_queue';
import { kWorkerData } from '../symbols';
import { PiscinaHistogramSummary } from '../histogram';
import { AsynchronouslyCreatedResource, AsynchronouslyCreatedResourcePool } from './base';
export * from './balancer';
type ResponseCallback = (response: ResponseMessage) => void;
export type PiscinaWorker = {
    id: number;
    currentUsage: number;
    isRunningAbortableTask: boolean;
    histogram: PiscinaHistogramSummary | null;
    terminating: boolean;
    destroyed: boolean;
    [kWorkerData]: WorkerInfo;
};
type WorkerInfoParams = {
    worker: {
        filename: string;
    } & WorkerOptions;
    port: MessagePort;
    enableHistogram: boolean;
};
export declare class WorkerInfo extends AsynchronouslyCreatedResource {
    worker: Worker;
    taskInfos: Map<number, TaskInfo>;
    idleTimeout: NodeJS.Timeout | null;
    port: MessagePort;
    sharedBuffer: Int32Array;
    lastSeenResponseCount: number;
    onMessage: ResponseCallback;
    histogram: RecordableHistogram | null;
    terminating: boolean;
    destroyed: boolean;
    constructor({ worker, port, enableHistogram }: WorkerInfoParams, onMessage: ResponseCallback);
    get id(): number;
    onWorkerMessage(handler: (msg: any) => void): void;
    onWorkerError(handler: (err: Error) => void): void;
    onWorkerExit(handler: (code: number) => void): void;
    onPortClose(handler: () => void): void;
    init(msg: StartupMessage, toTransfer: Transferable[]): WorkerInfo;
    workerRef(): WorkerInfo;
    workerUnref(): WorkerInfo;
    destroy(): void;
    setIdleTimeout(handler: (_: void) => void, ms: number, ...args: any[]): void;
    clearIdleTimeout(): void;
    ref(): WorkerInfo;
    unref(): WorkerInfo;
    _handleResponse(message: ResponseMessage): void;
    postTask(taskInfo: TaskInfo): void;
    processPendingMessages(): void;
    isRunningAbortableTask(): boolean;
    currentUsage(): number;
    popTask(taskId: number): TaskInfo | null;
    get interface(): PiscinaWorker;
}
export { AsynchronouslyCreatedResourcePool };
