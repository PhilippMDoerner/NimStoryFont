import { ComponentRef, TemplateRef, Type, ViewRef } from '@angular/core';
import { Observable } from 'rxjs';
export declare class ContentRef {
    nodes: Node[][];
    viewRef?: ViewRef | undefined;
    componentRef?: ComponentRef<any> | undefined;
    constructor(nodes: Node[][], viewRef?: ViewRef | undefined, componentRef?: ComponentRef<any> | undefined);
}
export declare class PopupService<T> {
    private _componentType;
    private _windowRef;
    private _contentRef;
    private _document;
    private _applicationRef;
    private _injector;
    private _viewContainerRef;
    private _ngZone;
    constructor(_componentType: Type<T>);
    open(content?: string | TemplateRef<any>, templateContext?: any, animation?: boolean): {
        windowRef: ComponentRef<T>;
        transition$: Observable<void>;
    };
    close(animation?: boolean): Observable<void>;
    private _getContentRef;
}
