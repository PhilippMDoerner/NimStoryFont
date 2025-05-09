import { ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { LatLng, LatLngBounds, LeafletEvent, LeafletMouseEvent, Map, MapOptions } from 'leaflet';
import * as i0 from "@angular/core";
export declare class LeafletDirective implements OnChanges, OnDestroy, OnInit {
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
    static ɵdir: i0.ɵɵDirectiveDeclaration<LeafletDirective, "[leaflet]", never, { "fitBoundsOptions": { "alias": "leafletFitBoundsOptions"; "required": false; }; "panOptions": { "alias": "leafletPanOptions"; "required": false; }; "zoomOptions": { "alias": "leafletZoomOptions"; "required": false; }; "zoomPanOptions": { "alias": "leafletZoomPanOptions"; "required": false; }; "options": { "alias": "leafletOptions"; "required": false; }; "zoom": { "alias": "leafletZoom"; "required": false; }; "center": { "alias": "leafletCenter"; "required": false; }; "fitBounds": { "alias": "leafletFitBounds"; "required": false; }; "maxBounds": { "alias": "leafletMaxBounds"; "required": false; }; "minZoom": { "alias": "leafletMinZoom"; "required": false; }; "maxZoom": { "alias": "leafletMaxZoom"; "required": false; }; }, { "mapReady": "leafletMapReady"; "zoomChange": "leafletZoomChange"; "centerChange": "leafletCenterChange"; "onClick": "leafletClick"; "onDoubleClick": "leafletDoubleClick"; "onMouseDown": "leafletMouseDown"; "onMouseUp": "leafletMouseUp"; "onMouseMove": "leafletMouseMove"; "onMouseOver": "leafletMouseOver"; "onMouseOut": "leafletMouseOut"; "onMapMove": "leafletMapMove"; "onMapMoveStart": "leafletMapMoveStart"; "onMapMoveEnd": "leafletMapMoveEnd"; "onMapZoom": "leafletMapZoom"; "onMapZoomStart": "leafletMapZoomStart"; "onMapZoomEnd": "leafletMapZoomEnd"; }, never, never, false, never>;
}
