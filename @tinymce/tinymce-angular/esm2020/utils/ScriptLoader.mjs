/**
 * Copyright (c) 2017-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { defer, fromEvent } from 'rxjs';
import { mapTo, shareReplay, take } from 'rxjs/operators';
const createState = () => ({
    script$: null,
});
const CreateScriptLoader = () => {
    let state = createState();
    const load = (doc, url) => (state.script$ ||
        // Caretaker note: the `script$` is a multicast observable since it's piped with `shareReplay`,
        // so if there're multiple editor components simultaneously on the page, they'll subscribe to the internal
        // `ReplaySubject`. The script will be loaded only once, and `ReplaySubject` will cache the result.
        (state.script$ = defer(() => {
            const scriptTag = doc.createElement('script');
            scriptTag.referrerPolicy = 'origin';
            scriptTag.type = 'application/javascript';
            scriptTag.src = url;
            doc.head.appendChild(scriptTag);
            return fromEvent(scriptTag, 'load').pipe(take(1), mapTo(undefined));
        }).pipe(shareReplay({ bufferSize: 1, refCount: true }))));
    // Only to be used by tests.
    const reinitialize = () => {
        state = createState();
    };
    return {
        load,
        reinitialize,
    };
};
const ScriptLoader = CreateScriptLoader();
export { ScriptLoader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NyaXB0TG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGlueW1jZS1hbmd1bGFyLWNvbXBvbmVudC9zcmMvbWFpbi90cy91dGlscy9TY3JpcHRMb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQWdDLE1BQU0sTUFBTSxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTTFELE1BQU0sV0FBVyxHQUFHLEdBQWMsRUFBRSxDQUFDLENBQUM7SUFDcEMsT0FBTyxFQUFFLElBQUk7Q0FDZCxDQUFDLENBQUM7QUFPSCxNQUFNLGtCQUFrQixHQUFHLEdBQWlCLEVBQUU7SUFDNUMsSUFBSSxLQUFLLEdBQUcsV0FBVyxFQUFFLENBQUM7SUFFMUIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFhLEVBQUUsR0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUMzQyxLQUFLLENBQUMsT0FBTztRQUNiLCtGQUErRjtRQUMvRiwwR0FBMEc7UUFDMUcsbUdBQW1HO1FBQ25HLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQzFCLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUMsU0FBUyxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7WUFDcEMsU0FBUyxDQUFDLElBQUksR0FBRyx3QkFBd0IsQ0FBQztZQUMxQyxTQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNwQixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNoQyxPQUFPLFNBQVMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUF1QyxDQUFDLENBQUM7UUFDNUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUN6RCxDQUFDO0lBRUYsNEJBQTRCO0lBQzVCLE1BQU0sWUFBWSxHQUFHLEdBQUcsRUFBRTtRQUN4QixLQUFLLEdBQUcsV0FBVyxFQUFFLENBQUM7SUFDeEIsQ0FBQyxDQUFDO0lBRUYsT0FBTztRQUNMLElBQUk7UUFDSixZQUFZO0tBQ2IsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLE1BQU0sWUFBWSxHQUFHLGtCQUFrQixFQUFFLENBQUM7QUFFMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTctcHJlc2VudCwgRXBob3gsIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgMiBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuXG5pbXBvcnQgeyBkZWZlciwgZnJvbUV2ZW50LCBPYnNlcnZhYmxlLCBPcGVyYXRvckZ1bmN0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXBUbywgc2hhcmVSZXBsYXksIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0YXRlT2JqIHtcbiAgc2NyaXB0JDogT2JzZXJ2YWJsZTx2b2lkPiB8IG51bGw7XG59XG5cbmNvbnN0IGNyZWF0ZVN0YXRlID0gKCk6IElTdGF0ZU9iaiA9PiAoe1xuICBzY3JpcHQkOiBudWxsLFxufSk7XG5cbmludGVyZmFjZSBTY3JpcHRMb2FkZXIge1xuICBsb2FkOiAoZG9jOiBEb2N1bWVudCwgdXJsOiBzdHJpbmcpID0+IE9ic2VydmFibGU8dm9pZD47XG4gIHJlaW5pdGlhbGl6ZTogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgQ3JlYXRlU2NyaXB0TG9hZGVyID0gKCk6IFNjcmlwdExvYWRlciA9PiB7XG4gIGxldCBzdGF0ZSA9IGNyZWF0ZVN0YXRlKCk7XG5cbiAgY29uc3QgbG9hZCA9IChkb2M6IERvY3VtZW50LCB1cmw6IHN0cmluZykgPT4gKFxuICAgIHN0YXRlLnNjcmlwdCQgfHxcbiAgICAvLyBDYXJldGFrZXIgbm90ZTogdGhlIGBzY3JpcHQkYCBpcyBhIG11bHRpY2FzdCBvYnNlcnZhYmxlIHNpbmNlIGl0J3MgcGlwZWQgd2l0aCBgc2hhcmVSZXBsYXlgLFxuICAgIC8vIHNvIGlmIHRoZXJlJ3JlIG11bHRpcGxlIGVkaXRvciBjb21wb25lbnRzIHNpbXVsdGFuZW91c2x5IG9uIHRoZSBwYWdlLCB0aGV5J2xsIHN1YnNjcmliZSB0byB0aGUgaW50ZXJuYWxcbiAgICAvLyBgUmVwbGF5U3ViamVjdGAuIFRoZSBzY3JpcHQgd2lsbCBiZSBsb2FkZWQgb25seSBvbmNlLCBhbmQgYFJlcGxheVN1YmplY3RgIHdpbGwgY2FjaGUgdGhlIHJlc3VsdC5cbiAgICAoc3RhdGUuc2NyaXB0JCA9IGRlZmVyKCgpID0+IHtcbiAgICAgIGNvbnN0IHNjcmlwdFRhZyA9IGRvYy5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIHNjcmlwdFRhZy5yZWZlcnJlclBvbGljeSA9ICdvcmlnaW4nO1xuICAgICAgc2NyaXB0VGFnLnR5cGUgPSAnYXBwbGljYXRpb24vamF2YXNjcmlwdCc7XG4gICAgICBzY3JpcHRUYWcuc3JjID0gdXJsO1xuICAgICAgZG9jLmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0VGFnKTtcbiAgICAgIHJldHVybiBmcm9tRXZlbnQoc2NyaXB0VGFnLCAnbG9hZCcpLnBpcGUodGFrZSgxKSwgbWFwVG8odW5kZWZpbmVkKSBhcyBPcGVyYXRvckZ1bmN0aW9uPEV2ZW50LCB1bmRlZmluZWQ+KTtcbiAgICB9KS5waXBlKHNoYXJlUmVwbGF5KHsgYnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IHRydWUgfSkpKVxuICApO1xuXG4gIC8vIE9ubHkgdG8gYmUgdXNlZCBieSB0ZXN0cy5cbiAgY29uc3QgcmVpbml0aWFsaXplID0gKCkgPT4ge1xuICAgIHN0YXRlID0gY3JlYXRlU3RhdGUoKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGxvYWQsXG4gICAgcmVpbml0aWFsaXplLFxuICB9O1xufTtcblxuY29uc3QgU2NyaXB0TG9hZGVyID0gQ3JlYXRlU2NyaXB0TG9hZGVyKCk7XG5cbmV4cG9ydCB7IFNjcmlwdExvYWRlciB9O1xuIl19