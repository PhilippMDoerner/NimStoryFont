import * as _angular_core from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { AccordionTriggerPattern, AccordionGroupPattern } from './_accordion-chunk.js';
import { DeferredContentAware, DeferredContent } from './_deferred-content-chunk.js';
import * as _angular_cdk_bidi from '@angular/cdk/bidi';
import { SortedCollection } from './_collection-chunk.js';
import './_keyboard-event-manager-chunk.js';
import './_click-event-manager-chunk.js';
import './_expansion-chunk.js';
import './_list-navigation-chunk.js';

/**
 * The content panel of an accordion item that is conditionally visible.
 *
 * This directive is a container for the content that is shown or hidden. It should
 * expose a template reference that will be used by the corresponding `ngAccordionTrigger`.
 * The content within the panel should be provided using an `ng-template` with the
 * `ngAccordionContent` directive so that the content is not rendered on the page until the trigger
 * is expanded. It applies `role="region"` for accessibility and uses the `inert` attribute to hide
 * its content from assistive technologies when not visible.
 *
 * ```html
 * <div ngAccordionPanel #panel="ngAccordionPanel">
 *   <ng-template ngAccordionContent>
 *     <p>This content is lazily rendered and will be shown when the panel is expanded.</p>
 *   </ng-template>
 * </div>
 * ```
 *
 * @see [Accordion](guide/aria/accordion)
 */
declare class AccordionPanel {
    /** A reference to the trigger element. */
    private readonly _elementRef;
    /** A reference to the trigger element. */
    readonly element: HTMLElement;
    /** The DeferredContentAware host directive. */
    private readonly _deferredContentAware;
    private readonly _accordionContent;
    /** A global unique identifier for the panel. */
    readonly id: _angular_core.InputSignal<string>;
    /** Whether the accordion panel is visible. True if the associated trigger is expanded. */
    readonly visible: _angular_core.Signal<boolean>;
    /**
     * The pattern for the accordion trigger that controls this panel.
     * This is set by the trigger when it initializes.
     * There is no need for a panel pattern, as the trigger has all the necessary logic.
     */
    _pattern?: AccordionTriggerPattern;
    constructor();
    /** Expands this item. */
    expand(): void;
    /** Collapses this item. */
    collapse(): void;
    /** Toggles the expansion state of this item. */
    toggle(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<AccordionPanel, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<AccordionPanel, "[ngAccordionPanel]", ["ngAccordionPanel"], { "id": { "alias": "id"; "required": false; "isSignal": true; }; }, {}, ["_accordionContent"], never, true, [{ directive: typeof DeferredContentAware; inputs: { "preserveContent": "preserveContent"; }; outputs: {}; }]>;
}

/**
 * The trigger that toggles the visibility of its associated `ngAccordionPanel`.
 *
 * This directive requires the `panel` input be set to the template reference of the `ngAccordionPanel`
 * it controls. When clicked, it will expand or collapse the panel. It also handles keyboard
 * interactions for navigation within the `ngAccordionGroup`. It applies `role="button"` and manages
 * `aria-expanded`, `aria-controls`, and `aria-disabled` attributes for accessibility.
 * The `disabled` input can be used to disable the trigger.
 *
 * ```html
 * <button ngAccordionTrigger [panel]="panel">
 *   Accordion Trigger Text
 * </button>
 * ```
 *
 * @see [Accordion](guide/aria/accordion)
 */
declare class AccordionTrigger implements OnInit, OnDestroy {
    /** A reference to the trigger element. */
    private readonly _elementRef;
    /** A reference to the trigger element. */
    readonly element: HTMLElement;
    /** The parent AccordionGroup. */
    private readonly _accordionGroup;
    /** The associated AccordionPanel. */
    readonly panel: _angular_core.InputSignal<AccordionPanel>;
    /** The unique identifier for the trigger. */
    readonly id: _angular_core.InputSignal<string>;
    /** The unique identifier for the corresponding trigger panel. */
    readonly panelId: _angular_core.Signal<string>;
    /** Whether the trigger is disabled. */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Whether the corresponding panel is expanded. */
    readonly expanded: _angular_core.ModelSignal<boolean>;
    /** Whether the trigger is active. */
    readonly active: _angular_core.Signal<boolean>;
    /** The UI pattern instance for this trigger. */
    _pattern: AccordionTriggerPattern;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** Expands this item. */
    expand(): void;
    /** Collapses this item. */
    collapse(): void;
    /** Toggles the expansion state of this item. */
    toggle(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<AccordionTrigger, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<AccordionTrigger, "[ngAccordionTrigger]", ["ngAccordionTrigger"], { "panel": { "alias": "panel"; "required": true; "isSignal": true; }; "id": { "alias": "id"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "expanded": { "alias": "expanded"; "required": false; "isSignal": true; }; }, { "expanded": "expandedChange"; }, never, never, true, never>;
}

/**
 * A container for a group of accordion items. It manages the overall state and
 * interactions of the accordion, such as keyboard navigation and expansion mode.
 *
 * The `ngAccordionGroup` serves as the root of a group of accordion triggers and panels,
 * coordinating the behavior of the `ngAccordionTrigger` and `ngAccordionPanel` elements within it.
 * It supports both single and multiple expansion modes.
 *
 * ```html
 * <div ngAccordionGroup [multiExpandable]="true">
 *   <div class="accordion-item">
 *     <h3>
 *       <button ngAccordionTrigger [panel]="panel1">Item 1</button>
 *     </h3>
 *     <div ngAccordionPanel #panel1="ngAccordionPanel">
 *       <ng-template ngAccordionContent>
 *         <p>Content for Item 1.</p>
 *       </ng-template>
 *     </div>
 *   </div>
 *   <div class="accordion-item">
 *     <h3>
 *       <button ngAccordionTrigger [panel]="panel2">Item 2</button>
 *     </h3>
 *     <div ngAccordionPanel #panel2="ngAccordionPanel">
 *       <ng-template ngAccordionContent>
 *         <p>Content for Item 2.</p>
 *       </ng-template>
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * @see [Accordion](guide/aria/accordion)
 */
declare class AccordionGroup implements OnDestroy {
    /** A reference to the group element. */
    private readonly _elementRef;
    /** A reference to the group element. */
    readonly element: HTMLElement;
    /** The collection of AccordionTriggers. */
    readonly _collection: SortedCollection<AccordionTrigger>;
    /** The corresponding patterns for the accordion triggers. */
    private readonly _triggerPatterns;
    /** The text direction (ltr or rtl). */
    readonly textDirection: _angular_core.WritableSignal<_angular_cdk_bidi.Direction>;
    /** Whether the entire accordion group is disabled. */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Whether multiple accordion items can be expanded simultaneously. */
    readonly multiExpandable: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /**
     * Whether to allow disabled items to receive focus. When `true`, disabled items are
     * focusable but not interactive. When `false`, disabled items are skipped during navigation.
     */
    readonly softDisabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Whether keyboard navigation should wrap around from the last item to the first, and vice-versa. */
    readonly wrap: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** The UI pattern instance for this accordion group. */
    readonly _pattern: AccordionGroupPattern;
    constructor();
    ngOnDestroy(): void;
    /** Expands all accordion panels if multi-expandable. */
    expandAll(): void;
    /** Collapses all accordion panels. */
    collapseAll(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<AccordionGroup, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<AccordionGroup, "[ngAccordionGroup]", ["ngAccordionGroup"], { "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "multiExpandable": { "alias": "multiExpandable"; "required": false; "isSignal": true; }; "softDisabled": { "alias": "softDisabled"; "required": false; "isSignal": true; }; "wrap": { "alias": "wrap"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * A structural directive that provides a mechanism for lazily rendering the content for an
 * `ngAccordionPanel`.
 *
 * This directive should be applied to an `ng-template` inside an `ngAccordionPanel`.
 * It allows the content of the panel to be lazily rendered, improving performance
 * by only creating the content when the panel is first expanded.
 *
 * ```html
 * <div ngAccordionPanel>
 *   <ng-template ngAccordionContent>
 *     <p>This is the content that will be displayed inside the panel.</p>
 *   </ng-template>
 * </div>
 * ```
 *
 * @see [Accordion](guide/aria/accordion)
 */
declare class AccordionContent {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<AccordionContent, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<AccordionContent, "ng-template[ngAccordionContent]", never, {}, {}, never, never, true, [{ directive: typeof DeferredContent; inputs: {}; outputs: {}; }]>;
}

export { AccordionContent, AccordionGroup, AccordionPanel, AccordionTrigger, DeferredContent as ɵɵDeferredContent, DeferredContentAware as ɵɵDeferredContentAware };
