import { StoryId } from 'storybook/internal/types';

interface Call {
    id: string;
    cursor: number;
    storyId: StoryId;
    ancestors: Call['id'][];
    path: Array<string | CallRef>;
    method: string;
    args: any[];
    interceptable: boolean;
    retain: boolean;
    status?: CallStates.DONE | CallStates.ERROR | CallStates.ACTIVE | CallStates.WAITING;
    exception?: {
        name: Error['name'];
        message: Error['message'];
        stack: Error['stack'];
        callId: Call['id'];
        showDiff?: boolean;
        diff?: string;
        actual?: unknown;
        expected?: unknown;
    };
}
declare enum CallStates {
    DONE = "done",
    ERROR = "error",
    ACTIVE = "active",
    WAITING = "waiting"
}
interface CallRef {
    __callId__: Call['id'];
}
interface ElementRef {
    __element__: {
        prefix?: string;
        localName: string;
        id?: string;
        classNames?: string[];
        innerText?: string;
    };
}
interface ControlStates {
    start: boolean;
    back: boolean;
    goto: boolean;
    next: boolean;
    end: boolean;
}
interface LogItem {
    callId: Call['id'];
    status: Call['status'];
    ancestors: Call['id'][];
}
interface SyncPayload {
    controlStates: ControlStates;
    logItems: LogItem[];
    pausedAt?: Call['id'];
}
interface State {
    renderPhase?: 'loading' | 'rendering' | 'playing' | 'played' | 'completed' | 'aborted' | 'errored';
    isDebugging: boolean;
    isPlaying: boolean;
    isLocked: boolean;
    cursor: number;
    calls: Call[];
    shadowCalls: Call[];
    callRefsByResult: Map<any, CallRef & {
        retain: boolean;
    }>;
    chainedCallIds: Set<Call['id']>;
    ancestors: Call['id'][];
    playUntil?: Call['id'];
    resolvers: Record<Call['id'], Function>;
    syncTimeout?: ReturnType<typeof setTimeout>;
    forwardedException?: Error;
}
interface Options {
    intercept?: boolean | ((method: string, path: Array<string | CallRef>) => boolean);
    retain?: boolean;
    mutate?: boolean;
    path?: Array<string | CallRef>;
    getArgs?: (call: Call, state: State) => Call['args'];
    getKeys?: (originalObject: Record<string, unknown>, depth: number) => string[];
}

declare const EVENTS: {
    CALL: string;
    SYNC: string;
    START: string;
    BACK: string;
    GOTO: string;
    NEXT: string;
    END: string;
};
/**
 * Instruments an object or module by traversing its properties, patching any functions (methods) to
 * enable debugging. Patched functions will emit a `call` event when invoked. When intercept = true,
 * patched functions will return a Promise when the debugger stops before this function. As such,
 * "interceptable" functions will have to be `await`-ed.
 */
declare function instrument<TObj extends Record<string, any>>(obj: TObj, options?: Options): TObj;

export { Call, CallRef, CallStates, ControlStates, EVENTS, ElementRef, LogItem, Options, State, SyncPayload, instrument };
