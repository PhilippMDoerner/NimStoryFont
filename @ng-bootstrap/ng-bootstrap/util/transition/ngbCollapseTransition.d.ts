import { NgbTransitionStartFn } from './ngbTransition';
export interface NgbCollapseCtx {
    direction: 'show' | 'hide';
    dimension: 'width' | 'height';
    maxSize?: string;
}
export declare const ngbCollapsingTransition: NgbTransitionStartFn<NgbCollapseCtx>;
