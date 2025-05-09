import * as i0 from '@angular/core';
import { EventEmitter, Directive, Input, Output, HostListener, NgModule } from '@angular/core';
import { latLng, map, control, tileLayer } from 'leaflet';

class LeafletUtil {
    static mapToArray(map) {
        const toReturn = [];
        for (const k in map) {
            if (map.hasOwnProperty(k)) {
                toReturn.push(map[k]);
            }
        }
        return toReturn;
    }
    static handleEvent(zone, eventEmitter, event) {
        // Don't want to emit if there are no observers
        if (0 < eventEmitter.observers.length) {
            zone.run(() => {
                eventEmitter.emit(event);
            });
        }
    }
}

class LeafletDirective {
    constructor(element, zone) {
        this.element = element;
        this.zone = zone;
        this.DEFAULT_ZOOM = 1;
        this.DEFAULT_CENTER = latLng(38.907192, -77.036871);
        this.DEFAULT_FPZ_OPTIONS = {};
        this.fitBoundsOptions = this.DEFAULT_FPZ_OPTIONS;
        this.panOptions = this.DEFAULT_FPZ_OPTIONS;
        this.zoomOptions = this.DEFAULT_FPZ_OPTIONS;
        this.zoomPanOptions = this.DEFAULT_FPZ_OPTIONS;
        // Default configuration
        this.options = {};
        // Configure callback function for the map
        this.mapReady = new EventEmitter();
        this.zoomChange = new EventEmitter();
        this.centerChange = new EventEmitter();
        // Mouse Map Events
        this.onClick = new EventEmitter();
        this.onDoubleClick = new EventEmitter();
        this.onMouseDown = new EventEmitter();
        this.onMouseUp = new EventEmitter();
        this.onMouseMove = new EventEmitter();
        this.onMouseOver = new EventEmitter();
        this.onMouseOut = new EventEmitter();
        // Map Move Events
        this.onMapMove = new EventEmitter();
        this.onMapMoveStart = new EventEmitter();
        this.onMapMoveEnd = new EventEmitter();
        // Map Zoom Events
        this.onMapZoom = new EventEmitter();
        this.onMapZoomStart = new EventEmitter();
        this.onMapZoomEnd = new EventEmitter();
        // Nothing here
    }
    ngOnInit() {
        // Create the map outside of angular so the various map events don't trigger change detection
        this.zone.runOutsideAngular(() => {
            // Create the map with some reasonable defaults
            this.map = map(this.element.nativeElement, this.options);
            this.addMapEventListeners();
        });
        // Only setView if there is a center/zoom
        if (null != this.center && null != this.zoom) {
            this.setView(this.center, this.zoom);
        }
        // Set up all the initial settings
        if (null != this.fitBounds) {
            this.setFitBounds(this.fitBounds);
        }
        if (null != this.maxBounds) {
            this.setMaxBounds(this.maxBounds);
        }
        if (null != this.minZoom) {
            this.setMinZoom(this.minZoom);
        }
        if (null != this.maxZoom) {
            this.setMaxZoom(this.maxZoom);
        }
        this.doResize();
        // Fire map ready event
        this.mapReady.emit(this.map);
    }
    ngOnChanges(changes) {
        /*
         * The following code is to address an issue with our (basic) implementation of
         * zooming and panning. From our testing, it seems that a pan operation followed
         * by a zoom operation in the same thread will interfere with eachother. The zoom
         * operation interrupts/cancels the pan, resulting in a final center point that is
         * inaccurate. The solution seems to be to either separate them with a timeout or
          * to collapse them into a setView call.
         */
        // Zooming and Panning
        if (changes['zoom'] && changes['center'] && null != this.zoom && null != this.center) {
            this.setView(changes['center'].currentValue, changes['zoom'].currentValue);
        }
        // Set the zoom level
        else if (changes['zoom']) {
            this.setZoom(changes['zoom'].currentValue);
        }
        // Set the map center
        else if (changes['center']) {
            this.setCenter(changes['center'].currentValue);
        }
        // Other options
        if (changes['fitBounds']) {
            this.setFitBounds(changes['fitBounds'].currentValue);
        }
        if (changes['maxBounds']) {
            this.setMaxBounds(changes['maxBounds'].currentValue);
        }
        if (changes['minZoom']) {
            this.setMinZoom(changes['minZoom'].currentValue);
        }
        if (changes['maxZoom']) {
            this.setMaxZoom(changes['maxZoom'].currentValue);
        }
    }
    ngOnDestroy() {
        // If this directive is destroyed, the map is too
        if (null != this.map) {
            this.map.remove();
        }
    }
    getMap() {
        return this.map;
    }
    onResize() {
        this.delayResize();
    }
    addMapEventListeners() {
        const registerEventHandler = (eventName, handler) => {
            this.map.on(eventName, handler);
        };
        // Add all the pass-through mouse event handlers
        registerEventHandler('click', (e) => LeafletUtil.handleEvent(this.zone, this.onClick, e));
        registerEventHandler('dblclick', (e) => LeafletUtil.handleEvent(this.zone, this.onDoubleClick, e));
        registerEventHandler('mousedown', (e) => LeafletUtil.handleEvent(this.zone, this.onMouseDown, e));
        registerEventHandler('mouseup', (e) => LeafletUtil.handleEvent(this.zone, this.onMouseUp, e));
        registerEventHandler('mouseover', (e) => LeafletUtil.handleEvent(this.zone, this.onMouseOver, e));
        registerEventHandler('mouseout', (e) => LeafletUtil.handleEvent(this.zone, this.onMouseOut, e));
        registerEventHandler('mousemove', (e) => LeafletUtil.handleEvent(this.zone, this.onMouseMove, e));
        registerEventHandler('zoomstart', (e) => LeafletUtil.handleEvent(this.zone, this.onMapZoomStart, e));
        registerEventHandler('zoom', (e) => LeafletUtil.handleEvent(this.zone, this.onMapZoom, e));
        registerEventHandler('zoomend', (e) => LeafletUtil.handleEvent(this.zone, this.onMapZoomEnd, e));
        registerEventHandler('movestart', (e) => LeafletUtil.handleEvent(this.zone, this.onMapMoveStart, e));
        registerEventHandler('move', (e) => LeafletUtil.handleEvent(this.zone, this.onMapMove, e));
        registerEventHandler('moveend', (e) => LeafletUtil.handleEvent(this.zone, this.onMapMoveEnd, e));
        // Update any things for which we provide output bindings
        const outputUpdateHandler = () => {
            const zoom = this.map.getZoom();
            if (zoom !== this.zoom) {
                this.zoom = zoom;
                LeafletUtil.handleEvent(this.zone, this.zoomChange, zoom);
            }
            const center = this.map.getCenter();
            if (null != center || null != this.center) {
                if (((null == center || null == this.center) && center !== this.center)
                    || (center.lat !== this.center.lat || center.lng !== this.center.lng)) {
                    this.center = center;
                    LeafletUtil.handleEvent(this.zone, this.centerChange, center);
                }
            }
        };
        registerEventHandler('moveend', outputUpdateHandler);
        registerEventHandler('zoomend', outputUpdateHandler);
    }
    /**
     * Resize the map to fit it's parent container
     */
    doResize() {
        // Run this outside of angular so the map events stay outside of angular
        this.zone.runOutsideAngular(() => {
            // Invalidate the map size to trigger it to update itself
            if (null != this.map) {
                this.map.invalidateSize({});
            }
        });
    }
    /**
     * Manage a delayed resize of the component
     */
    delayResize() {
        if (null != this.resizeTimer) {
            clearTimeout(this.resizeTimer);
        }
        this.resizeTimer = setTimeout(this.doResize.bind(this), 200);
    }
    /**
     * Set the view (center/zoom) all at once
     * @param center The new center
     * @param zoom The new zoom level
     */
    setView(center, zoom) {
        if (null != this.map && null != center && null != zoom) {
            this.map.setView(center, zoom, this.zoomPanOptions);
        }
    }
    /**
     * Set the map zoom level
     * @param zoom the new zoom level for the map
     */
    setZoom(zoom) {
        if (null != this.map && null != zoom) {
            this.map.setZoom(zoom, this.zoomOptions);
        }
    }
    /**
     * Set the center of the map
     * @param center the center point
     */
    setCenter(center) {
        if (null != this.map && null != center) {
            this.map.panTo(center, this.panOptions);
        }
    }
    /**
     * Fit the map to the bounds
     * @param latLngBounds the boundary to set
     */
    setFitBounds(latLngBounds) {
        if (null != this.map && null != latLngBounds) {
            this.map.fitBounds(latLngBounds, this.fitBoundsOptions);
        }
    }
    /**
     * Set the map's max bounds
     * @param latLngBounds the boundary to set
     */
    setMaxBounds(latLngBounds) {
        if (null != this.map && null != latLngBounds) {
            this.map.setMaxBounds(latLngBounds);
        }
    }
    /**
     * Set the map's min zoom
     * @param number the new min zoom
     */
    setMinZoom(zoom) {
        if (null != this.map && null != zoom) {
            this.map.setMinZoom(zoom);
        }
    }
    /**
     * Set the map's min zoom
     * @param number the new min zoom
     */
    setMaxZoom(zoom) {
        if (null != this.map && null != zoom) {
            this.map.setMaxZoom(zoom);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0", ngImport: i0, type: LeafletDirective, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.0", type: LeafletDirective, isStandalone: false, selector: "[leaflet]", inputs: { fitBoundsOptions: ["leafletFitBoundsOptions", "fitBoundsOptions"], panOptions: ["leafletPanOptions", "panOptions"], zoomOptions: ["leafletZoomOptions", "zoomOptions"], zoomPanOptions: ["leafletZoomPanOptions", "zoomPanOptions"], options: ["leafletOptions", "options"], zoom: ["leafletZoom", "zoom"], center: ["leafletCenter", "center"], fitBounds: ["leafletFitBounds", "fitBounds"], maxBounds: ["leafletMaxBounds", "maxBounds"], minZoom: ["leafletMinZoom", "minZoom"], maxZoom: ["leafletMaxZoom", "maxZoom"] }, outputs: { mapReady: "leafletMapReady", zoomChange: "leafletZoomChange", centerChange: "leafletCenterChange", onClick: "leafletClick", onDoubleClick: "leafletDoubleClick", onMouseDown: "leafletMouseDown", onMouseUp: "leafletMouseUp", onMouseMove: "leafletMouseMove", onMouseOver: "leafletMouseOver", onMouseOut: "leafletMouseOut", onMapMove: "leafletMapMove", onMapMoveStart: "leafletMapMoveStart", onMapMoveEnd: "leafletMapMoveEnd", onMapZoom: "leafletMapZoom", onMapZoomStart: "leafletMapZoomStart", onMapZoomEnd: "leafletMapZoomEnd" }, host: { listeners: { "window:resize": "onResize()" } }, usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0", ngImport: i0, type: LeafletDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[leaflet]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.NgZone }], propDecorators: { fitBoundsOptions: [{
                type: Input,
                args: ['leafletFitBoundsOptions']
            }], panOptions: [{
                type: Input,
                args: ['leafletPanOptions']
            }], zoomOptions: [{
                type: Input,
                args: ['leafletZoomOptions']
            }], zoomPanOptions: [{
                type: Input,
                args: ['leafletZoomPanOptions']
            }], options: [{
                type: Input,
                args: ['leafletOptions']
            }], mapReady: [{
                type: Output,
                args: ['leafletMapReady']
            }], zoom: [{
                type: Input,
                args: ['leafletZoom']
            }], zoomChange: [{
                type: Output,
                args: ['leafletZoomChange']
            }], center: [{
                type: Input,
                args: ['leafletCenter']
            }], centerChange: [{
                type: Output,
                args: ['leafletCenterChange']
            }], fitBounds: [{
                type: Input,
                args: ['leafletFitBounds']
            }], maxBounds: [{
                type: Input,
                args: ['leafletMaxBounds']
            }], minZoom: [{
                type: Input,
                args: ['leafletMinZoom']
            }], maxZoom: [{
                type: Input,
                args: ['leafletMaxZoom']
            }], onClick: [{
                type: Output,
                args: ['leafletClick']
            }], onDoubleClick: [{
                type: Output,
                args: ['leafletDoubleClick']
            }], onMouseDown: [{
                type: Output,
                args: ['leafletMouseDown']
            }], onMouseUp: [{
                type: Output,
                args: ['leafletMouseUp']
            }], onMouseMove: [{
                type: Output,
                args: ['leafletMouseMove']
            }], onMouseOver: [{
                type: Output,
                args: ['leafletMouseOver']
            }], onMouseOut: [{
                type: Output,
                args: ['leafletMouseOut']
            }], onMapMove: [{
                type: Output,
                args: ['leafletMapMove']
            }], onMapMoveStart: [{
                type: Output,
                args: ['leafletMapMoveStart']
            }], onMapMoveEnd: [{
                type: Output,
                args: ['leafletMapMoveEnd']
            }], onMapZoom: [{
                type: Output,
                args: ['leafletMapZoom']
            }], onMapZoomStart: [{
                type: Output,
                args: ['leafletMapZoomStart']
            }], onMapZoomEnd: [{
                type: Output,
                args: ['leafletMapZoomEnd']
            }], onResize: [{
                type: HostListener,
                args: ['window:resize', []]
            }] } });

class LeafletDirectiveWrapper {
    constructor(leafletDirective) {
        this.leafletDirective = leafletDirective;
    }
    init() {
        // Nothing for now
    }
    getMap() {
        return this.leafletDirective.getMap();
    }
}

/**
 * Layer directive
 *
 * This directive is used to directly control a single map layer. The purpose of this directive is to
 * be used as part of a child structural directive of the map element.
 *
 */
class LeafletLayerDirective {
    constructor(leafletDirective, zone) {
        this.zone = zone;
        // Layer Events
        this.onAdd = new EventEmitter();
        this.onRemove = new EventEmitter();
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
    }
    ngOnInit() {
        // Init the map
        this.leafletDirective.init();
    }
    ngOnDestroy() {
        if (null != this.layer) {
            // Unregister the event handlers
            this.removeLayerEventListeners(this.layer);
            // Remove the layer from the map
            this.layer.remove();
        }
    }
    ngOnChanges(changes) {
        if (changes['layer']) {
            // Update the layer
            const p = changes['layer'].previousValue;
            const n = changes['layer'].currentValue;
            this.zone.runOutsideAngular(() => {
                if (null != p) {
                    this.removeLayerEventListeners(p);
                    p.remove();
                }
                if (null != n) {
                    this.addLayerEventListeners(n);
                    this.leafletDirective.getMap().addLayer(n);
                }
            });
        }
    }
    addLayerEventListeners(l) {
        this.onAddLayerHandler = (e) => LeafletUtil.handleEvent(this.zone, this.onAdd, e);
        l.on('add', this.onAddLayerHandler);
        this.onRemoveLayerHandler = (e) => LeafletUtil.handleEvent(this.zone, this.onRemove, e);
        l.on('remove', this.onRemoveLayerHandler);
    }
    removeLayerEventListeners(l) {
        l.off('add', this.onAddLayerHandler);
        l.off('remove', this.onRemoveLayerHandler);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0", ngImport: i0, type: LeafletLayerDirective, deps: [{ token: LeafletDirective }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.0", type: LeafletLayerDirective, isStandalone: false, selector: "[leafletLayer]", inputs: { layer: ["leafletLayer", "layer"] }, outputs: { onAdd: "leafletLayerAdd", onRemove: "leafletLayerRemove" }, usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0", ngImport: i0, type: LeafletLayerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[leafletLayer]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: LeafletDirective }, { type: i0.NgZone }], propDecorators: { layer: [{
                type: Input,
                args: ['leafletLayer']
            }], onAdd: [{
                type: Output,
                args: ['leafletLayerAdd']
            }], onRemove: [{
                type: Output,
                args: ['leafletLayerRemove']
            }] } });

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
class LeafletLayersDirective {
    // Set/get the layers
    set layers(v) {
        this.layersValue = v;
        // Now that we have a differ, do an immediate layer update
        this.updateLayers();
    }
    get layers() {
        return this.layersValue;
    }
    constructor(leafletDirective, differs, zone) {
        this.differs = differs;
        this.zone = zone;
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
        this.layersDiffer = this.differs.find([]).create();
    }
    ngDoCheck() {
        this.updateLayers();
    }
    ngOnInit() {
        // Init the map
        this.leafletDirective.init();
        // Update layers once the map is ready
        this.updateLayers();
    }
    ngOnDestroy() {
        this.layers = [];
    }
    /**
     * Update the state of the layers.
     * We use an iterable differ to synchronize the map layers with the state of the bound layers array.
     * This is important because it allows us to react to changes to the contents of the array as well
     * as changes to the actual array instance.
     */
    updateLayers() {
        const map = this.leafletDirective.getMap();
        if (null != map && null != this.layersDiffer) {
            const changes = this.layersDiffer.diff(this.layersValue);
            if (null != changes) {
                // Run outside angular to ensure layer events don't trigger change detection
                this.zone.runOutsideAngular(() => {
                    changes.forEachRemovedItem((c) => {
                        map.removeLayer(c.item);
                    });
                    changes.forEachAddedItem((c) => {
                        map.addLayer(c.item);
                    });
                });
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0", ngImport: i0, type: LeafletLayersDirective, deps: [{ token: LeafletDirective }, { token: i0.IterableDiffers }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.0", type: LeafletLayersDirective, isStandalone: false, selector: "[leafletLayers]", inputs: { layers: ["leafletLayers", "layers"] }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0", ngImport: i0, type: LeafletLayersDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[leafletLayers]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: LeafletDirective }, { type: i0.IterableDiffers }, { type: i0.NgZone }], propDecorators: { layers: [{
                type: Input,
                args: ['leafletLayers']
            }] } });

class LeafletControlLayersChanges {
    constructor() {
        this.layersRemoved = 0;
        this.layersChanged = 0;
        this.layersAdded = 0;
    }
    changed() {
        return !(this.layersRemoved === 0 && this.layersChanged === 0 && this.layersAdded === 0);
    }
}

class LeafletControlLayersWrapper {
    constructor(zone, layersControlReady) {
        this.zone = zone;
        this.layersControlReady = layersControlReady;
    }
    getLayersControl() {
        return this.layersControl;
    }
    init(controlConfig, controlOptions) {
        const baseLayers = controlConfig.baseLayers || {};
        const overlays = controlConfig.overlays || {};
        // Create the control outside of angular to ensure events don't trigger change detection
        this.zone.runOutsideAngular(() => {
            this.layersControl = control.layers(baseLayers, overlays, controlOptions);
        });
        this.layersControlReady.emit(this.layersControl);
        return this.layersControl;
    }
    applyBaseLayerChanges(changes) {
        let results = new LeafletControlLayersChanges();
        if (null != this.layersControl) {
            results = this.applyChanges(changes, this.layersControl.addBaseLayer);
        }
        return results;
    }
    applyOverlayChanges(changes) {
        let results = new LeafletControlLayersChanges();
        if (null != this.layersControl) {
            results = this.applyChanges(changes, this.layersControl.addOverlay);
        }
        return results;
    }
    applyChanges(changes, addFn) {
        const results = new LeafletControlLayersChanges();
        if (null != changes) {
            // All layer management is outside angular to avoid layer events from triggering change detection
            this.zone.runOutsideAngular(() => {
                changes.forEachChangedItem((c) => {
                    this.layersControl.removeLayer(c.previousValue);
                    addFn.call(this.layersControl, c.currentValue, c.key);
                    results.layersChanged++;
                });
                changes.forEachRemovedItem((c) => {
                    this.layersControl.removeLayer(c.previousValue);
                    results.layersRemoved++;
                });
                changes.forEachAddedItem((c) => {
                    addFn.call(this.layersControl, c.currentValue, c.key);
                    results.layersAdded++;
                });
            });
        }
        return results;
    }
}

class LeafletControlLayersConfig {
    constructor() {
        this.baseLayers = {};
        this.overlays = {};
    }
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
class LeafletLayersControlDirective {
    set layersControlConfig(v) {
        // Validation/init stuff
        if (null == v) {
            v = new LeafletControlLayersConfig();
        }
        if (null == v.baseLayers) {
            v.baseLayers = {};
        }
        if (null == v.overlays) {
            v.overlays = {};
        }
        // Store the value
        this.layersControlConfigValue = v;
        // Update the map
        this.updateLayers();
    }
    get layersControlConfig() {
        return this.layersControlConfigValue;
    }
    constructor(leafletDirective, differs, zone) {
        this.differs = differs;
        this.zone = zone;
        this.layersControlReady = new EventEmitter();
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
        this.controlLayers = new LeafletControlLayersWrapper(this.zone, this.layersControlReady);
        // Generate differs
        this.baseLayersDiffer = this.differs.find({}).create();
        this.overlaysDiffer = this.differs.find({}).create();
    }
    ngOnInit() {
        // Init the map
        this.leafletDirective.init();
        // Set up control outside of angular to avoid change detection when using the control
        this.zone.runOutsideAngular(() => {
            // Set up all the initial settings
            this.controlLayers
                .init({}, this.layersControlOptions)
                .addTo(this.leafletDirective.getMap());
        });
        this.updateLayers();
    }
    ngOnDestroy() {
        this.layersControlConfig = { baseLayers: {}, overlays: {} };
        this.controlLayers.getLayersControl().remove();
    }
    ngDoCheck() {
        this.updateLayers();
    }
    updateLayers() {
        const map = this.leafletDirective.getMap();
        const layersControl = this.controlLayers.getLayersControl();
        if (null != map && null != layersControl) {
            // Run the baselayers differ
            if (null != this.baseLayersDiffer && null != this.layersControlConfigValue.baseLayers) {
                const changes = this.baseLayersDiffer.diff(this.layersControlConfigValue.baseLayers);
                this.controlLayers.applyBaseLayerChanges(changes);
            }
            // Run the overlays differ
            if (null != this.overlaysDiffer && null != this.layersControlConfigValue.overlays) {
                const changes = this.overlaysDiffer.diff(this.layersControlConfigValue.overlays);
                this.controlLayers.applyOverlayChanges(changes);
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0", ngImport: i0, type: LeafletLayersControlDirective, deps: [{ token: LeafletDirective }, { token: i0.KeyValueDiffers }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.0", type: LeafletLayersControlDirective, isStandalone: false, selector: "[leafletLayersControl]", inputs: { layersControlConfig: ["leafletLayersControl", "layersControlConfig"], layersControlOptions: ["leafletLayersControlOptions", "layersControlOptions"] }, outputs: { layersControlReady: "leafletLayersControlReady" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0", ngImport: i0, type: LeafletLayersControlDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[leafletLayersControl]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: LeafletDirective }, { type: i0.KeyValueDiffers }, { type: i0.NgZone }], propDecorators: { layersControlConfig: [{
                type: Input,
                args: ['leafletLayersControl']
            }], layersControlOptions: [{
                type: Input,
                args: ['leafletLayersControlOptions']
            }], layersControlReady: [{
                type: Output,
                args: ['leafletLayersControlReady']
            }] } });

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
class LeafletBaseLayersDirective {
    // Set/get baseLayers
    set baseLayers(v) {
        this.baseLayersValue = v;
        this.updateBaseLayers();
    }
    get baseLayers() {
        return this.baseLayersValue;
    }
    constructor(leafletDirective, differs, zone) {
        this.differs = differs;
        this.zone = zone;
        // Output for once the layers control is ready
        this.layersControlReady = new EventEmitter();
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
        this.controlLayers = new LeafletControlLayersWrapper(this.zone, this.layersControlReady);
        this.baseLayersDiffer = this.differs.find({}).create();
    }
    ngOnDestroy() {
        this.baseLayers = {};
        if (null != this.controlLayers.getLayersControl()) {
            this.controlLayers.getLayersControl().remove();
        }
    }
    ngOnInit() {
        // Init the map
        this.leafletDirective.init();
        // Create the control outside angular to prevent events from triggering chnage detection
        this.zone.runOutsideAngular(() => {
            // Initially configure the controlLayers
            this.controlLayers
                .init({}, this.layersControlOptions)
                .addTo(this.leafletDirective.getMap());
        });
        this.updateBaseLayers();
    }
    ngDoCheck() {
        this.updateBaseLayers();
    }
    updateBaseLayers() {
        const map = this.leafletDirective.getMap();
        const layersControl = this.controlLayers.getLayersControl();
        if (null != map && null != layersControl && null != this.baseLayersDiffer) {
            const changes = this.baseLayersDiffer.diff(this.baseLayersValue);
            const results = this.controlLayers.applyBaseLayerChanges(changes);
            if (results.changed()) {
                this.syncBaseLayer();
            }
        }
    }
    /**
     * Check the current base layer and change it to the new one if necessary
     */
    syncBaseLayer() {
        const map = this.leafletDirective.getMap();
        const layers = LeafletUtil.mapToArray(this.baseLayers);
        let foundLayer;
        // Search all the layers in the map to see if we can find them in the baselayer array
        map.eachLayer((l) => {
            foundLayer = layers.find((bl) => (l === bl));
        });
        // Did we find the layer?
        if (null != foundLayer) {
            // Yes - set the baselayer to the one we found
            this.baseLayer = foundLayer;
        }
        else {
            // No - set the baselayer to the first in the array and add it to the map
            if (layers.length > 0) {
                this.baseLayer = layers[0];
                // Add layers outside of angular to prevent events from triggering change detection
                this.zone.runOutsideAngular(() => {
                    this.baseLayer.addTo(map);
                });
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0", ngImport: i0, type: LeafletBaseLayersDirective, deps: [{ token: LeafletDirective }, { token: i0.KeyValueDiffers }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.0", type: LeafletBaseLayersDirective, isStandalone: false, selector: "[leafletBaseLayers]", inputs: { baseLayers: ["leafletBaseLayers", "baseLayers"], layersControlOptions: ["leafletLayersControlOptions", "layersControlOptions"] }, outputs: { layersControlReady: "leafletLayersControlReady" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0", ngImport: i0, type: LeafletBaseLayersDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[leafletBaseLayers]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: LeafletDirective }, { type: i0.KeyValueDiffers }, { type: i0.NgZone }], propDecorators: { baseLayers: [{
                type: Input,
                args: ['leafletBaseLayers']
            }], layersControlOptions: [{
                type: Input,
                args: ['leafletLayersControlOptions']
            }], layersControlReady: [{
                type: Output,
                args: ['leafletLayersControlReady']
            }] } });

class LeafletModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0", ngImport: i0, type: LeafletModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.0", ngImport: i0, type: LeafletModule, declarations: [LeafletDirective,
            LeafletLayerDirective,
            LeafletLayersDirective,
            LeafletLayersControlDirective,
            LeafletBaseLayersDirective], exports: [LeafletDirective,
            LeafletLayerDirective,
            LeafletLayersDirective,
            LeafletLayersControlDirective,
            LeafletBaseLayersDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.0", ngImport: i0, type: LeafletModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0", ngImport: i0, type: LeafletModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [
                        LeafletDirective,
                        LeafletLayerDirective,
                        LeafletLayersDirective,
                        LeafletLayersControlDirective,
                        LeafletBaseLayersDirective
                    ],
                    declarations: [
                        LeafletDirective,
                        LeafletLayerDirective,
                        LeafletLayersDirective,
                        LeafletLayersControlDirective,
                        LeafletBaseLayersDirective
                    ]
                }]
        }] });

class LeafletTileLayerDefinition {
    constructor(type, url, options) {
        this.type = type;
        this.url = url;
        this.options = options;
    }
    /**
     * Creates a TileLayer from the provided definition. This is a convenience function
     * to help with generating layers from objects.
     *
     * @param layerDef The layer to create
     * @returns {TileLayer} The TileLayer that has been created
     */
    static createTileLayer(layerDef) {
        let layer;
        switch (layerDef.type) {
            case 'xyz':
                layer = tileLayer(layerDef.url, layerDef.options);
                break;
            case 'wms':
            default:
                layer = tileLayer.wms(layerDef.url, layerDef.options);
                break;
        }
        return layer;
    }
    /**
     * Creates a TileLayer for each key in the incoming map. This is a convenience function
     * for generating an associative array of layers from an associative array of objects
     *
     * @param layerDefs A map of key to tile layer definition
     * @returns {{[p: string]: TileLayer}} A new map of key to TileLayer
     */
    static createTileLayers(layerDefs) {
        const layers = {};
        for (const k in layerDefs) {
            if (layerDefs.hasOwnProperty(k)) {
                layers[k] = (LeafletTileLayerDefinition.createTileLayer(layerDefs[k]));
            }
        }
        return layers;
    }
    /**
     * Create a Tile Layer from the current state of this object
     *
     * @returns {TileLayer} A new TileLayer
     */
    createTileLayer() {
        return LeafletTileLayerDefinition.createTileLayer(this);
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { LeafletBaseLayersDirective, LeafletControlLayersChanges, LeafletControlLayersConfig, LeafletControlLayersWrapper, LeafletDirective, LeafletDirectiveWrapper, LeafletLayerDirective, LeafletLayersControlDirective, LeafletLayersDirective, LeafletModule, LeafletTileLayerDefinition, LeafletUtil };
//# sourceMappingURL=bluehalo-ngx-leaflet.mjs.map
