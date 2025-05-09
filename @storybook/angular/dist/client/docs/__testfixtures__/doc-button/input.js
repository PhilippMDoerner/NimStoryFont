"use strict";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputComponent = exports.ButtonAccent = exports.exportedConstant = void 0;
/* eslint-disable no-underscore-dangle */
const core_1 = require("@angular/core");
exports.exportedConstant = 'An exported constant';
var ButtonAccent;
(function (ButtonAccent) {
    ButtonAccent["Normal"] = "Normal";
    ButtonAccent["High"] = "High";
})(ButtonAccent || (exports.ButtonAccent = ButtonAccent = {}));
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
let InputComponent = class InputComponent {
    constructor() {
        /** Appearance style of the button. */
        this.appearance = 'secondary';
        /** Sets the button to a disabled state. */
        this.isDisabled = false;
        /** Size of the button. */
        this.size = 'medium';
        /**
         * Some input you shouldn't use.
         *
         * @deprecated
         */
        this.somethingYouShouldNotUse = false;
        /**
         * Handler to be called when the button is clicked by a user.
         *
         * Will also block the emission of the event if `isDisabled` is true.
         */
        this.onClick = new core_1.EventEmitter();
        this._inputValue = 'some value';
        this.focus = false;
        /** @ignore */
        this.ignoredProperty = 'Ignore me';
        /** Public value. */
        this.internalProperty = 'Public hello';
        /** Private value. */
        this._value = 'Private hello';
    }
    /**
     * This is an internal method that we don't want to document and have added the `ignore`
     * annotation to.
     *
     * @ignore
     */
    handleClick(event) {
        event.stopPropagation();
        if (!this.isDisabled) {
            this.onClick.emit(event);
        }
    }
    /** Setter for `inputValue` that is also an `@Input`. */
    set inputValue(value) {
        this._inputValue = value;
    }
    /** Getter for `inputValue`. */
    get inputValue() {
        return this._inputValue;
    }
    onClickListener(btn) {
        console.log('button', btn);
    }
    /**
     * Returns all the CSS classes for the button.
     *
     * @ignore
     */
    get classes() {
        return [this.appearance, this.size]
            .filter((_class) => !!_class)
            .map((_class) => `btn-${_class}`);
    }
    /** Set the private value. */
    set value(value) {
        this._value = `${value}`;
    }
    /** Get the private value. */
    get value() {
        return this._value;
    }
    /**
     * An internal calculation method which adds `x` and `y` together.
     *
     * @param x Some number you'd like to use.
     * @param y Some other number or string you'd like to use, will have `parseInt()` applied before
     *   calculation.
     */
    calc(x, y) {
        return x + parseInt(`${y}`, 10);
    }
    /** A public method using an interface. */
    publicMethod(things) {
        console.log(things);
    }
    /**
     * A protected method.
     *
     * @param id Some `id`.
     */
    protectedMethod(id) {
        console.log(id);
    }
    /**
     * A private method.
     *
     * @param password Some `password`.
     */
    privateMethod(password) {
        console.log(password);
    }
    set item(item) {
        this.processedItem = item;
    }
};
exports.InputComponent = InputComponent;
__decorate([
    (0, core_1.ViewChild)('buttonRef', { static: false }),
    __metadata("design:type", core_1.ElementRef)
], InputComponent.prototype, "buttonRef", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", String)
], InputComponent.prototype, "appearance", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", String)
], InputComponent.prototype, "accent", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Object)
], InputComponent.prototype, "isDisabled", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", String)
], InputComponent.prototype, "label", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", String)
], InputComponent.prototype, "size", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Object)
], InputComponent.prototype, "someDataObject", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Object)
], InputComponent.prototype, "somethingYouShouldNotUse", void 0);
__decorate([
    (0, core_1.Output)(),
    __metadata("design:type", Object)
], InputComponent.prototype, "onClick", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], InputComponent.prototype, "inputValue", null);
__decorate([
    (0, core_1.HostListener)('click', ['$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InputComponent.prototype, "onClickListener", null);
__decorate([
    (0, core_1.HostBinding)('class.focused'),
    __metadata("design:type", Object)
], InputComponent.prototype, "focus", void 0);
__decorate([
    (0, core_1.Input)('showKeyAlias'),
    __metadata("design:type", Object)
], InputComponent.prototype, "showKey", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], InputComponent.prototype, "item", null);
exports.InputComponent = InputComponent = __decorate([
    (0, core_1.Component)({
        selector: 'doc-button',
        template: '<button>{{ label }}</button>',
    })
], InputComponent);
