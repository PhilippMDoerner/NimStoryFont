import { EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class NgbOffcanvasBackdrop implements OnInit {
    private _nativeElement;
    private _zone;
    private _injector;
    animation: boolean;
    backdropClass: string;
    static: boolean;
    dismissEvent: EventEmitter<any>;
    ngOnInit(): void;
    hide(): Observable<void>;
    dismiss(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbOffcanvasBackdrop, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbOffcanvasBackdrop, "ngb-offcanvas-backdrop", never, { "animation": { "alias": "animation"; "required": false; }; "backdropClass": { "alias": "backdropClass"; "required": false; }; "static": { "alias": "static"; "required": false; }; }, { "dismissEvent": "dismiss"; }, never, never, true, never>;
}
