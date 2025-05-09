"use strict";
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
const core_1 = require("@angular/core");
exports.exportedConstant = 'An exported constant';
var ButtonAccent;
(function (ButtonAccent) {
    ButtonAccent["Normal"] = "Normal";
    ButtonAccent["High"] = "High";
})(ButtonAccent || (exports.ButtonAccent = ButtonAccent = {}));
let InputComponent = class InputComponent {
    constructor() {
        /** Appearance style of the button. */
        this.appearance = 'secondary';
        /** Sets the button to a disabled state. */
        this.isDisabled = false;
        this.onClick = new core_1.EventEmitter();
        this.dashOut = new core_1.EventEmitter();
    }
};
exports.InputComponent = InputComponent;
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", String)
], InputComponent.prototype, "appearance", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Number)
], InputComponent.prototype, "counter", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", String)
], InputComponent.prototype, "accent", void 0);
__decorate([
    (0, core_1.Input)('color'),
    __metadata("design:type", String)
], InputComponent.prototype, "foregroundColor", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Object)
], InputComponent.prototype, "isDisabled", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", String)
], InputComponent.prototype, "label", void 0);
__decorate([
    (0, core_1.Input)('aria-label'),
    __metadata("design:type", String)
], InputComponent.prototype, "ariaLabel", void 0);
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", Object)
], InputComponent.prototype, "someDataObject", void 0);
__decorate([
    (0, core_1.Output)(),
    __metadata("design:type", Object)
], InputComponent.prototype, "onClick", void 0);
__decorate([
    (0, core_1.Output)('dash-out'),
    __metadata("design:type", Object)
], InputComponent.prototype, "dashOut", void 0);
exports.InputComponent = InputComponent = __decorate([
    (0, core_1.Component)({
        selector: 'doc-button',
        template: '<button>{{ label }}</button>',
    })
], InputComponent);
