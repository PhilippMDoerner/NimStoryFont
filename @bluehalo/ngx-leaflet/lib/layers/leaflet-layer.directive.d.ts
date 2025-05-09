import { EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { Layer, LeafletEvent } from 'leaflet';
import { LeafletDirective } from '../core/leaflet.directive';
import * as i0 from "@angular/core";
/**
 * Layer directive
 *
 * This directive is used to directly control a single map layer. The purpose of this directive is to
 * be used as part of a child structural directive of the map element.
 *
 */
export declare class LeafletLayerDirective implements OnChanges, OnDestroy, OnInit {
    private zone;
    layer: Layer;
    onAdd: EventEmitter<LeafletEvent>;
    onRemove: EventEmitter<LeafletEvent>;
    private onAddLayerHandler;
    private onRemoveLayerHandler;
    private leafletDirective;
    constructor(leafletDirective: LeafletDirective, zone: NgZone);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    private addLayerEventListeners;
    private removeLayerEventListeners;
    static ɵfac: i0.ɵɵFactoryDeclaration<LeafletLayerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LeafletLayerDirective, "[leafletLayer]", never, { "layer": { "alias": "leafletLayer"; "required": false; }; }, { "onAdd": "leafletLayerAdd"; "onRemove": "leafletLayerRemove"; }, never, never, false, never>;
}
