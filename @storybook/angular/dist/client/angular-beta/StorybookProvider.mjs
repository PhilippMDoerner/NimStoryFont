import { InjectionToken, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
export const STORY_PROPS = new InjectionToken('STORY_PROPS');
export const storyPropsProvider = (storyProps$) => ({
    provide: STORY_PROPS,
    useFactory: storyDataFactory(storyProps$.asObservable()),
    deps: [NgZone],
});
function storyDataFactory(data) {
    return (ngZone) => new Observable((subscriber) => {
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
