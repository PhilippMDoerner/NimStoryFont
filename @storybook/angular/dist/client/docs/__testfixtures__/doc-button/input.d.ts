import { EventEmitter, ElementRef } from '@angular/core';
export declare const exportedConstant = "An exported constant";
export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge';
export declare enum ButtonAccent {
    'Normal' = "Normal",
    'High' = "High"
}
export interface ISomeInterface {
    one: string;
    two: boolean;
    three: any[];
}
/**
 * This is a simple button that demonstrates various JSDoc handling in Storybook Docs for Angular.
 *
 * It supports [markdown](https://en.wikipedia.org/wiki/Markdown), so you can embed formatted text,
 * like **bold**, _italic_, and `inline code`.> How you like dem apples?! It's never been easier to
 * document all your components.
 *
 * @string Hello world
 * @link [Example](http://example.com)
 * @code `ThingThing`
 * @html <span class="badge">aaa</span>
 */
export declare class InputComponent<T> {
    buttonRef: ElementRef;
    /** Appearance style of the button. */
    appearance: 'primary' | 'secondary';
    /** Specify the accent-type of the button */
    accent: ButtonAccent;
    /** Sets the button to a disabled state. */
    isDisabled: boolean;
    /**
     * The inner text of the button.
     *
     * @required
     */
    label: string;
    /** Size of the button. */
    size?: ButtonSize;
    /** Specifies some arbitrary object */
    someDataObject: ISomeInterface;
    /**
     * Some input you shouldn't use.
     *
     * @deprecated
     */
    somethingYouShouldNotUse: boolean;
    /**
     * Handler to be called when the button is clicked by a user.
     *
     * Will also block the emission of the event if `isDisabled` is true.
     */
    onClick: EventEmitter<Event>;
    /**
     * This is an internal method that we don't want to document and have added the `ignore`
     * annotation to.
     *
     * @ignore
     */
    handleClick(event: Event): void;
    private _inputValue;
    /** Setter for `inputValue` that is also an `@Input`. */
    set inputValue(value: string);
    /** Getter for `inputValue`. */
    get inputValue(): string;
    onClickListener(btn: any): void;
    focus: boolean;
    /**
     * Returns all the CSS classes for the button.
     *
     * @ignore
     */
    get classes(): string[];
    /** @ignore */
    ignoredProperty: string;
    /** Public value. */
    internalProperty: string;
    /** Private value. */
    private _value;
    /** Set the private value. */
    set value(value: string | number);
    /** Get the private value. */
    get value(): string | number;
    /**
     * An internal calculation method which adds `x` and `y` together.
     *
     * @param x Some number you'd like to use.
     * @param y Some other number or string you'd like to use, will have `parseInt()` applied before
     *   calculation.
     */
    calc(x: number, y: string | number): number;
    /** A public method using an interface. */
    publicMethod(things: ISomeInterface): void;
    /**
     * A protected method.
     *
     * @param id Some `id`.
     */
    protected protectedMethod(id?: number): void;
    /**
     * A private method.
     *
     * @param password Some `password`.
     */
    private privateMethod;
    showKey: keyof T;
    set item(item: T[]);
    processedItem: T[];
}
