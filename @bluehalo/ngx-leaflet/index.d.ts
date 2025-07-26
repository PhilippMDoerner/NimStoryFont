import * as i0 from '@angular/core';
import { OnChanges, OnDestroy, OnInit, EventEmitter, ElementRef, NgZone, SimpleChange, DoCheck, IterableDiffer, IterableDiffers, KeyValueDiffer, KeyValueDiffers, KeyValueChanges } from '@angular/core';
import { LatLng, Map, MapOptions, LatLngBounds, LeafletMouseEvent, LeafletEvent, Layer, Control, TileLayer } from 'leaflet';

declare class LeafletDirective implements OnChanges, OnDestroy, OnInit {
    private element;
    private zone;
    readonly DEFAULT_ZOOM = 1;
    readonly DEFAULT_CENTER: LatLng;
    readonly DEFAULT_FPZ_OPTIONS: {};
    resizeTimer: any;
    map: Map;
    fitBoundsOptions: {};
    panOptions: {};
    zoomOptions: {};
    zoomPanOptions: {};
    options: MapOptions;
    mapReady: EventEmitter<Map>;
    zoom: number;
    zoomChange: EventEmitter<number>;
    center: LatLng;
    centerChange: EventEmitter<LatLng>;
    fitBounds: LatLngBounds;
    maxBounds: LatLngBounds;
    minZoom: number;
    maxZoom: number;
    onClick: EventEmitter<LeafletMouseEvent>;
    onDoubleClick: EventEmitter<LeafletMouseEvent>;
    onMouseDown: EventEmitter<LeafletMouseEvent>;
    onMouseUp: EventEmitter<LeafletMouseEvent>;
    onMouseMove: EventEmitter<LeafletMouseEvent>;
    onMouseOver: EventEmitter<LeafletMouseEvent>;
    onMouseOut: EventEmitter<LeafletMouseEvent>;
    onMapMove: EventEmitter<LeafletEvent>;
    onMapMoveStart: EventEmitter<LeafletEvent>;
    onMapMoveEnd: EventEmitter<LeafletEvent>;
    onMapZoom: EventEmitter<LeafletEvent>;
    onMapZoomStart: EventEmitter<LeafletEvent>;
    onMapZoomEnd: EventEmitter<LeafletEvent>;
    constructor(element: ElementRef, zone: NgZone);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
    getMap(): Map;
    onResize(): void;
    private addMapEventListeners;
    /**
     * Resize the map to fit it's parent container
     */
    private doResize;
    /**
     * Manage a delayed resize of the component
     */
    private delayResize;
    /**
     * Set the view (center/zoom) all at once
     * @param center The new center
     * @param zoom The new zoom level
     */
    private setView;
    /**
     * Set the map zoom level
     * @param zoom the new zoom level for the map
     */
    private setZoom;
    /**
     * Set the center of the map
     * @param center the center point
     */
    private setCenter;
    /**
     * Fit the map to the bounds
     * @param latLngBounds the boundary to set
     */
    private setFitBounds;
    /**
     * Set the map's max bounds
     * @param latLngBounds the boundary to set
     */
    private setMaxBounds;
    /**
     * Set the map's min zoom
     * @param number the new min zoom
     */
    private setMinZoom;
    /**
     * Set the map's min zoom
     * @param number the new min zoom
     */
    private setMaxZoom;
    static ɵfac: i0.ɵɵFactoryDeclaration<LeafletDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LeafletDirective, "[leaflet]", never, { "fitBoundsOptions": { "alias": "leafletFitBoundsOptions"; "required": false; }; "panOptions": { "alias": "leafletPanOptions"; "required": false; }; "zoomOptions": { "alias": "leafletZoomOptions"; "required": false; }; "zoomPanOptions": { "alias": "leafletZoomPanOptions"; "required": false; }; "options": { "alias": "leafletOptions"; "required": false; }; "zoom": { "alias": "leafletZoom"; "required": false; }; "center": { "alias": "leafletCenter"; "required": false; }; "fitBounds": { "alias": "leafletFitBounds"; "required": false; }; "maxBounds": { "alias": "leafletMaxBounds"; "required": false; }; "minZoom": { "alias": "leafletMinZoom"; "required": false; }; "maxZoom": { "alias": "leafletMaxZoom"; "required": false; }; }, { "mapReady": "leafletMapReady"; "zoomChange": "leafletZoomChange"; "centerChange": "leafletCenterChange"; "onClick": "leafletClick"; "onDoubleClick": "leafletDoubleClick"; "onMouseDown": "leafletMouseDown"; "onMouseUp": "leafletMouseUp"; "onMouseMove": "leafletMouseMove"; "onMouseOver": "leafletMouseOver"; "onMouseOut": "leafletMouseOut"; "onMapMove": "leafletMapMove"; "onMapMoveStart": "leafletMapMoveStart"; "onMapMoveEnd": "leafletMapMoveEnd"; "onMapZoom": "leafletMapZoom"; "onMapZoomStart": "leafletMapZoomStart"; "onMapZoomEnd": "leafletMapZoomEnd"; }, never, never, true, never>;
}

/**
 * Layer directive
 *
 * This directive is used to directly control a single map layer. The purpose of this directive is to
 * be used as part of a child structural directive of the map element.
 *
 */
declare class LeafletLayerDirective implements OnChanges, OnDestroy, OnInit {
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
    static ɵdir: i0.ɵɵDirectiveDeclaration<LeafletLayerDirective, "[leafletLayer]", never, { "layer": { "alias": "leafletLayer"; "required": false; }; }, { "onAdd": "leafletLayerAdd"; "onRemove": "leafletLayerRemove"; }, never, never, true, never>;
}

/**
 * Layers directive
 *
 * This directive is used to directly control map layers. As changes are made to the input array of
 * layers, the map is synched to the array. As layers are added or removed from the input array, they
 * are also added or removed from the map. The input array is treated as immutable. To detect changes,
 * you must change the array instance.
 *
 * Important Note: The input layers array is assumed to be immutable. This means you need to use an
 * immutable array implementation or create a new copy of your array when you make changes, otherwise
 * this directive won't detect the change. This is by design. It's for performance reasons. Change
 * detection of mutable arrays requires diffing the state of the array on every DoCheck cycle, which
 * is extremely expensive from a time complexity perspective.
 *
 */
declare class LeafletLayersDirective implements DoCheck, OnDestroy, OnInit {
    private differs;
    private zone;
    layersValue: Layer[];
    layersDiffer: IterableDiffer<Layer>;
    set layers(v: Layer[]);
    get layers(): Layer[];
    private leafletDirective;
    constructor(leafletDirective: LeafletDirective, differs: IterableDiffers, zone: NgZone);
    ngDoCheck(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Update the state of the layers.
     * We use an iterable differ to synchronize the map layers with the state of the bound layers array.
     * This is important because it allows us to react to changes to the contents of the array as well
     * as changes to the actual array instance.
     */
    private updateLayers;
    static ɵfac: i0.ɵɵFactoryDeclaration<LeafletLayersDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LeafletLayersDirective, "[leafletLayers]", never, { "layers": { "alias": "leafletLayers"; "required": false; }; }, {}, never, never, true, never>;
}

declare class LeafletControlLayersConfig {
    baseLayers: {
        [name: string]: Layer;
    };
    overlays: {
        [name: string]: Layer;
    };
}

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
declare class LeafletLayersControlDirective implements DoCheck, OnDestroy, OnInit {
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
    static ɵdir: i0.ɵɵDirectiveDeclaration<LeafletLayersControlDirective, "[leafletLayersControl]", never, { "layersControlConfig": { "alias": "leafletLayersControl"; "required": false; }; "layersControlOptions": { "alias": "leafletLayersControlOptions"; "required": false; }; }, { "layersControlReady": "leafletLayersControlReady"; }, never, never, true, never>;
}

/**
 * Baselayers directive
 *
 * This directive is provided as a convenient way to add baselayers to the map. The input accepts
 * a key-value map of layer name -> layer. Mutable changed are detected. On changes, a differ is
 * used to determine what changed so that layers are appropriately added or removed. This directive
 * will also add the layers control so users can switch between available base layers.
 *
 * To specify which layer to show as the 'active' baselayer, you will want to add it to the map
 * using the layers directive. Otherwise, the plugin will use the last one it sees.
 */
declare class LeafletBaseLayersDirective implements DoCheck, OnDestroy, OnInit {
    private differs;
    private zone;
    baseLayersValue: {
        [name: string]: Layer;
    };
    baseLayersDiffer: KeyValueDiffer<string, Layer>;
    set baseLayers(v: {
        [name: string]: Layer;
    });
    get baseLayers(): {
        [name: string]: Layer;
    };
    layersControlOptions: Control.LayersOptions;
    layersControlReady: EventEmitter<Control.Layers>;
    private baseLayer;
    private leafletDirective;
    private controlLayers;
    constructor(leafletDirective: LeafletDirective, differs: KeyValueDiffers, zone: NgZone);
    ngOnDestroy(): void;
    ngOnInit(): void;
    ngDoCheck(): void;
    protected updateBaseLayers(): void;
    /**
     * Check the current base layer and change it to the new one if necessary
     */
    protected syncBaseLayer(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LeafletBaseLayersDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LeafletBaseLayersDirective, "[leafletBaseLayers]", never, { "baseLayers": { "alias": "leafletBaseLayers"; "required": false; }; "layersControlOptions": { "alias": "leafletLayersControlOptions"; "required": false; }; }, { "layersControlReady": "leafletLayersControlReady"; }, never, never, true, never>;
}

declare class LeafletModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<LeafletModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<LeafletModule, never, [typeof LeafletDirective, typeof LeafletLayerDirective, typeof LeafletLayersDirective, typeof LeafletLayersControlDirective, typeof LeafletBaseLayersDirective], [typeof LeafletDirective, typeof LeafletLayerDirective, typeof LeafletLayersDirective, typeof LeafletLayersControlDirective, typeof LeafletBaseLayersDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<LeafletModule>;
}

declare class LeafletDirectiveWrapper {
    protected leafletDirective: LeafletDirective;
    constructor(leafletDirective: LeafletDirective);
    init(): void;
    getMap(): Map;
}

declare class LeafletUtil {
    static mapToArray<T>(map: {
        [key: string]: T;
    }): T[];
    static handleEvent<T>(zone: NgZone, eventEmitter: EventEmitter<T>, event: T): void;
}

declare class LeafletTileLayerDefinition {
    type: string;
    url: string;
    options: any;
    constructor(type: string, url: string, options: any);
    /**
     * Creates a TileLayer from the provided definition. This is a convenience function
     * to help with generating layers from objects.
     *
     * @param layerDef The layer to create
     * @returns {TileLayer} The TileLayer that has been created
     */
    static createTileLayer(layerDef: LeafletTileLayerDefinition): TileLayer;
    /**
     * Creates a TileLayer for each key in the incoming map. This is a convenience function
     * for generating an associative array of layers from an associative array of objects
     *
     * @param layerDefs A map of key to tile layer definition
     * @returns {{[p: string]: TileLayer}} A new map of key to TileLayer
     */
    static createTileLayers(layerDefs: {
        [key: string]: LeafletTileLayerDefinition;
    }): {
        [key: string]: TileLayer;
    };
    /**
     * Create a Tile Layer from the current state of this object
     *
     * @returns {TileLayer} A new TileLayer
     */
    createTileLayer(): TileLayer;
}

declare class LeafletControlLayersChanges {
    layersRemoved: number;
    layersChanged: number;
    layersAdded: number;
    changed(): boolean;
}

declare class LeafletControlLayersWrapper {
    private zone;
    protected layersControl: Control.Layers;
    protected layersControlReady: EventEmitter<Control.Layers>;
    constructor(zone: NgZone, layersControlReady: EventEmitter<Control.Layers>);
    getLayersControl(): Control.Layers;
    init(controlConfig: any, controlOptions: any): Control.Layers;
    applyBaseLayerChanges(changes: KeyValueChanges<string, Layer>): LeafletControlLayersChanges;
    applyOverlayChanges(changes: KeyValueChanges<string, Layer>): LeafletControlLayersChanges;
    private applyChanges;
}

export { LeafletBaseLayersDirective, LeafletControlLayersChanges, LeafletControlLayersConfig, LeafletControlLayersWrapper, LeafletDirective, LeafletDirectiveWrapper, LeafletLayerDirective, LeafletLayersControlDirective, LeafletLayersDirective, LeafletModule, LeafletTileLayerDefinition, LeafletUtil };
