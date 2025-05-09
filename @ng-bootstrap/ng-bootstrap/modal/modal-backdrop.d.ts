import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class NgbModalBackdrop implements OnInit {
    private _nativeElement;
    private _zone;
    private _injector;
    animation: boolean;
    backdropClass: string;
    ngOnInit(): void;
    hide(): Observable<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbModalBackdrop, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbModalBackdrop, "ngb-modal-backdrop", never, { "animation": { "alias": "animation"; "required": false; }; "backdropClass": { "alias": "backdropClass"; "required": false; }; }, {}, never, never, true, never>;
}
