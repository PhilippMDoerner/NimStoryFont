import { InjectionToken, Provider } from '@angular/core';
import { Subject } from 'rxjs';
import { ICollection } from '../types';
export declare const STORY_PROPS: InjectionToken<Subject<ICollection | undefined>>;
export declare const storyPropsProvider: (storyProps$: Subject<ICollection | undefined>) => Provider;
