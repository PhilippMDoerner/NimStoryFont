"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @vitest-environment happy-dom
const vitest_1 = require("vitest");
const rxjs_1 = require("rxjs");
const BootstrapQueue_1 = require("./BootstrapQueue");
const instantWaitFor = (fn) => {
    return vitest_1.vi.waitFor(fn, {
        interval: 0,
        timeout: 10000,
    });
};
(0, vitest_1.describe)('BootstrapQueue', { retry: 3 }, () => {
    (0, vitest_1.beforeEach)(async () => {
        vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)('@flaky should wait until complete', async () => {
        const pendingSubject = new rxjs_1.Subject();
        const bootstrapApp = vitest_1.vi.fn().mockImplementation(async () => {
            return (0, rxjs_1.lastValueFrom)(pendingSubject);
        });
        const bootstrapAppFinished = vitest_1.vi.fn();
        (0, BootstrapQueue_1.queueBootstrapping)(bootstrapApp).then(() => {
            bootstrapAppFinished();
        });
        await instantWaitFor(() => {
            if (bootstrapApp.mock.calls.length !== 1) {
                throw new Error('bootstrapApp should not have been called yet');
            }
        });
        (0, vitest_1.expect)(bootstrapApp).toHaveBeenCalled();
        (0, vitest_1.expect)(bootstrapAppFinished).not.toHaveBeenCalled();
        pendingSubject.next();
        pendingSubject.complete();
        await instantWaitFor(() => {
            if (bootstrapAppFinished.mock.calls.length !== 1) {
                throw new Error('bootstrapApp should have been called once');
            }
        });
        (0, vitest_1.expect)(bootstrapAppFinished).toHaveBeenCalled();
    });
    (0, vitest_1.it)('should prevent following tasks, until the preview tasks are complete', async () => {
        const pendingSubject = new rxjs_1.Subject();
        const bootstrapApp = vitest_1.vi.fn().mockImplementation(async () => {
            return (0, rxjs_1.lastValueFrom)(pendingSubject);
        });
        const bootstrapAppFinished = vitest_1.vi.fn();
        const pendingSubject2 = new rxjs_1.Subject();
        const bootstrapApp2 = vitest_1.vi.fn().mockImplementation(async () => {
            return (0, rxjs_1.lastValueFrom)(pendingSubject2);
        });
        const bootstrapAppFinished2 = vitest_1.vi.fn();
        const pendingSubject3 = new rxjs_1.Subject();
        const bootstrapApp3 = vitest_1.vi.fn().mockImplementation(async () => {
            return (0, rxjs_1.lastValueFrom)(pendingSubject3);
        });
        const bootstrapAppFinished3 = vitest_1.vi.fn();
        (0, BootstrapQueue_1.queueBootstrapping)(bootstrapApp).then(bootstrapAppFinished);
        (0, BootstrapQueue_1.queueBootstrapping)(bootstrapApp2).then(bootstrapAppFinished2);
        (0, BootstrapQueue_1.queueBootstrapping)(bootstrapApp3).then(bootstrapAppFinished3);
        await instantWaitFor(() => {
            if (bootstrapApp.mock.calls.length !== 1) {
                throw new Error('bootstrapApp should have been called once');
            }
        });
        (0, vitest_1.expect)(bootstrapApp).toHaveBeenCalled();
        (0, vitest_1.expect)(bootstrapAppFinished).not.toHaveBeenCalled();
        (0, vitest_1.expect)(bootstrapApp2).not.toHaveBeenCalled();
        (0, vitest_1.expect)(bootstrapAppFinished2).not.toHaveBeenCalled();
        (0, vitest_1.expect)(bootstrapApp3).not.toHaveBeenCalled();
        (0, vitest_1.expect)(bootstrapAppFinished3).not.toHaveBeenCalled();
        pendingSubject.next();
        pendingSubject.complete();
        await instantWaitFor(() => {
            if (bootstrapApp2.mock.calls.length !== 1) {
                throw new Error('bootstrapApp2 should have been called once');
            }
        });
        (0, vitest_1.expect)(bootstrapApp).toHaveReturnedTimes(1);
        (0, vitest_1.expect)(bootstrapAppFinished).toHaveBeenCalled();
        (0, vitest_1.expect)(bootstrapApp2).toHaveBeenCalled();
        (0, vitest_1.expect)(bootstrapAppFinished2).not.toHaveBeenCalled();
        (0, vitest_1.expect)(bootstrapApp3).not.toHaveBeenCalled();
        (0, vitest_1.expect)(bootstrapAppFinished3).not.toHaveBeenCalled();
        pendingSubject2.next();
        pendingSubject2.complete();
        await instantWaitFor(() => {
            if (bootstrapApp3.mock.calls.length !== 1) {
                throw new Error('bootstrapApp3 should have been called once');
            }
        });
        (0, vitest_1.expect)(bootstrapApp).toHaveReturnedTimes(1);
        (0, vitest_1.expect)(bootstrapAppFinished).toHaveBeenCalled();
        (0, vitest_1.expect)(bootstrapApp2).toHaveReturnedTimes(1);
        (0, vitest_1.expect)(bootstrapAppFinished2).toHaveBeenCalled();
        (0, vitest_1.expect)(bootstrapApp3).toHaveBeenCalled();
        (0, vitest_1.expect)(bootstrapAppFinished3).not.toHaveBeenCalled();
        pendingSubject3.next();
        pendingSubject3.complete();
        await instantWaitFor(() => {
            if (bootstrapAppFinished3.mock.calls.length !== 1) {
                throw new Error('bootstrapAppFinished3 should have been called once');
            }
        });
        (0, vitest_1.expect)(bootstrapApp).toHaveReturnedTimes(1);
        (0, vitest_1.expect)(bootstrapAppFinished).toHaveBeenCalled();
        (0, vitest_1.expect)(bootstrapApp2).toHaveReturnedTimes(1);
        (0, vitest_1.expect)(bootstrapAppFinished2).toHaveBeenCalled();
        (0, vitest_1.expect)(bootstrapApp3).toHaveReturnedTimes(1);
        (0, vitest_1.expect)(bootstrapAppFinished3).toHaveBeenCalled();
    });
    (0, vitest_1.it)('should throw and continue next bootstrap on error', async () => {
        const pendingSubject = new rxjs_1.Subject();
        const bootstrapApp = vitest_1.vi.fn().mockImplementation(async () => {
            return (0, rxjs_1.lastValueFrom)(pendingSubject);
        });
        const bootstrapAppFinished = vitest_1.vi.fn();
        const bootstrapAppError = vitest_1.vi.fn();
        const pendingSubject2 = new rxjs_1.Subject();
        const bootstrapApp2 = vitest_1.vi.fn().mockImplementation(async () => {
            return (0, rxjs_1.lastValueFrom)(pendingSubject2);
        });
        const bootstrapAppFinished2 = vitest_1.vi.fn();
        const bootstrapAppError2 = vitest_1.vi.fn();
        (0, BootstrapQueue_1.queueBootstrapping)(bootstrapApp).then(bootstrapAppFinished).catch(bootstrapAppError);
        (0, BootstrapQueue_1.queueBootstrapping)(bootstrapApp2).then(bootstrapAppFinished2).catch(bootstrapAppError2);
        await instantWaitFor(() => {
            if (bootstrapApp.mock.calls.length !== 1) {
                throw new Error('bootstrapApp should have been called once');
            }
        });
        (0, vitest_1.expect)(bootstrapApp).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(bootstrapAppFinished).not.toHaveBeenCalled();
        (0, vitest_1.expect)(bootstrapApp2).not.toHaveBeenCalled();
        pendingSubject.error(new Error('test error'));
        await instantWaitFor(() => {
            if (bootstrapAppError.mock.calls.length !== 1) {
                throw new Error('bootstrapAppError should have been called once');
            }
        });
        (0, vitest_1.expect)(bootstrapApp).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(bootstrapAppFinished).not.toHaveBeenCalled();
        (0, vitest_1.expect)(bootstrapAppError).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(bootstrapApp2).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(bootstrapAppFinished2).not.toHaveBeenCalled();
        (0, vitest_1.expect)(bootstrapAppError2).not.toHaveBeenCalled();
        pendingSubject2.next();
        pendingSubject2.complete();
        await instantWaitFor(() => {
            if (bootstrapAppFinished2.mock.calls.length !== 1) {
                throw new Error('bootstrapAppFinished2 should have been called once');
            }
        });
        (0, vitest_1.expect)(bootstrapApp).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(bootstrapAppFinished).not.toHaveBeenCalled();
        (0, vitest_1.expect)(bootstrapAppError).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(bootstrapApp2).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(bootstrapAppFinished2).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(bootstrapAppError2).not.toHaveBeenCalled();
    });
});
