import { KeyboardEventManager } from './_keyboard-event-manager-chunk.js';
import { ClickEventManager } from './_click-event-manager-chunk.js';
import { ExpansionItem, ListExpansionInputs, ListExpansion } from './_expansion-chunk.js';
import { ListNavigationItem, ListFocusItem, ListNavigationInputs, ListFocusInputs, ListNavigation, ListFocus } from './_list-navigation-chunk.js';
import { SignalLike, WritableSignalLike } from './_collection-chunk.js';

/** Inputs of the AccordionGroupPattern. */
interface AccordionGroupInputs extends Omit<ListNavigationInputs<AccordionTriggerPattern> & ListFocusInputs<AccordionTriggerPattern> & Omit<ListExpansionInputs, 'items'>, 'focusMode'> {
}
/** A pattern controls the nested Accordions. */
declare class AccordionGroupPattern {
    readonly inputs: AccordionGroupInputs;
    /** Controls navigation for the group. */
    readonly navigationBehavior: ListNavigation<AccordionTriggerPattern>;
    /** Controls focus for the group. */
    readonly focusBehavior: ListFocus<AccordionTriggerPattern>;
    /** Controls expansion for the group. */
    readonly expansionBehavior: ListExpansion;
    constructor(inputs: AccordionGroupInputs);
    /** The key used to navigate to the previous accordion trigger. */
    readonly prevKey: SignalLike<"ArrowUp" | "ArrowRight" | "ArrowLeft">;
    /** The key used to navigate to the next accordion trigger. */
    readonly nextKey: SignalLike<"ArrowRight" | "ArrowLeft" | "ArrowDown">;
    /** The keydown event manager for the accordion trigger. */
    readonly keydown: SignalLike<KeyboardEventManager<KeyboardEvent>>;
    /** The click event manager for the accordion trigger. */
    readonly click: SignalLike<ClickEventManager<PointerEvent>>;
    /** Handles keydown events on the trigger, delegating to the group if not disabled. */
    onKeydown(event: KeyboardEvent): void;
    /** Handles click events on the trigger, delegating to the group if not disabled. */
    onClick(event: PointerEvent): void;
    /** Handles focus events on the trigger. This ensures the tabbing changes the active index. */
    onFocus(event: FocusEvent): void;
    /** Toggles the expansion state of the active accordion item. */
    toggle(): void;
    /** Expands all accordion panels if multi-expandable. */
    expandAll(): void;
    /** Collapses all accordion panels. */
    collapseAll(): void;
    /** Returns a set of violations */
    validate(): string[];
    /** Finds the trigger pattern for a given element. */
    private _findTriggerPattern;
}
/** Inputs for the AccordionTriggerPattern. */
interface AccordionTriggerInputs extends Omit<ListNavigationItem & ListFocusItem, 'index'>, Omit<ExpansionItem, 'expandable'> {
    /** The parent accordion group that controls this trigger. */
    accordionGroup: SignalLike<AccordionGroupPattern>;
    /** The accordion panel id controlled by this trigger. */
    accordionPanelId: SignalLike<string>;
}
/** A pattern controls the expansion state of an accordion. */
declare class AccordionTriggerPattern implements ListNavigationItem, ListFocusItem, ExpansionItem {
    readonly inputs: AccordionTriggerInputs;
    /** A unique identifier for this trigger. */
    readonly id: SignalLike<string>;
    /** A reference to the trigger element. */
    readonly element: SignalLike<HTMLElement>;
    /** Whether this trigger has expandable panel. */
    readonly expandable: SignalLike<boolean>;
    /** Whether the corresponding panel is expanded. */
    readonly expanded: WritableSignalLike<boolean>;
    /** Whether the trigger is active. */
    readonly active: SignalLike<boolean>;
    /** Id of the accordion panel controlled by the trigger. */
    readonly controls: SignalLike<string>;
    /** The tabindex of the trigger. */
    readonly tabIndex: SignalLike<-1 | 0>;
    /** Whether the trigger is disabled. Disabling an accordion group disables all the triggers. */
    readonly disabled: SignalLike<boolean>;
    /** Whether the trigger is hard disabled.  */
    readonly hardDisabled: SignalLike<boolean>;
    constructor(inputs: AccordionTriggerInputs);
    /** Opens the accordion panel. */
    open(): void;
    /** Closes the accordion panel. */
    close(): void;
    /** Toggles the accordion panel. */
    toggle(): void;
}

export { AccordionGroupPattern, AccordionTriggerPattern };
export type { AccordionGroupInputs, AccordionTriggerInputs };
