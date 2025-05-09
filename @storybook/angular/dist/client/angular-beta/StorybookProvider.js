"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storyPropsProvider = exports.STORY_PROPS = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
exports.STORY_PROPS = new core_1.InjectionToken('STORY_PROPS');
const storyPropsProvider = (storyProps$) => ({
    provide: exports.STORY_PROPS,
    useFactory: storyDataFactory(storyProps$.asObservable()),
    deps: [core_1.NgZone],
});
exports.storyPropsProvider = storyPropsProvider;
function storyDataFactory(data) {
    return (ngZone) => new rxjs_1.Observable((subscriber) => {
        const sub = data.subscribe((v) => {
            ngZone.run(() => subscriber.next(v));
        }, (err) => {
            ngZone.run(() => subscriber.error(err));
        }, () => {
            ngZone.run(() => subscriber.complete());
        });
        return () => {
            sub.unsubscribe();
        };
    });
}
