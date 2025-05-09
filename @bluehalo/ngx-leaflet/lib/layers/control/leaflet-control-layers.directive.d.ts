import { DoCheck, EventEmitter, KeyValueDiffer, KeyValueDiffers, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Control, Layer } from 'leaflet';
import { LeafletDirective } from '../../core/leaflet.directive';
import { LeafletControlLayersConfig } from './leaflet-control-layers-config.model';
import * as i0 from "@angular/core";
/**
 * Layers Control
 *
 * This directive is used to configure the layers control. The input accepts an object with two
 * key-value maps of layer name -> layer. Mutable changes are detected. On changes, a differ is
 * used to determine what changed so that layers are appropriately added or removed.
 *
 * To specify which layer to show as the 'active' baselayer, you will want to add it to the map
 * using the layers directive. Otherwise, the last one it sees will be used.
 */
export declare class LeafletLayersControlDirective implements DoCheck, OnDestroy, OnInit {
    private differs;
    private zone;
    layersControlConfigValue: LeafletControlLayersConfig;
    baseLayersDiffer: KeyValueDiffer<string, Layer>;
    overlaysDiffer: KeyValueDiffer<string, Layer>;
    set layersControlConfig(v: LeafletControlLayersConfig);
    get layersControlConfig(): LeafletControlLayersConfig;
    layersControlOptions: any;
    layersControlReady: EventEmitter<Control.Layers>;
    private controlLayers;
    private leafletDirective;
    constructor(leafletDirective: LeafletDirective, differs: KeyValueDiffers, zone: NgZone);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngDoCheck(): void;
    protected updateLayers(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LeafletLayersControlDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LeafletLayersControlDirective, "[leafletLayersControl]", never, { "layersControlConfig": { "alias": "leafletLayersControl"; "required": false; }; "layersControlOptions": { "alias": "leafletLayersControlOptions"; "required": false; }; }, { "layersControlReady": "leafletLayersControlReady"; }, never, never, false, never>;
}
