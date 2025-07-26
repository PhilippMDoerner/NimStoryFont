import { Buttons } from './buttons.js';
import { Device } from './device.js';
import { Mouse } from './mouse.js';
import { Pointer } from './pointer.js';

function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
class PointerHost {
    isKeyPressed(keyDef) {
        return this.devices.get(keyDef.pointerType).isPressed(keyDef);
    }
    async press(instance, keyDef, position) {
        this.devices.get(keyDef.pointerType).addPressed(keyDef);
        this.buttons.down(keyDef);
        const pointerName = this.getPointerName(keyDef);
        const pointer = keyDef.pointerType === 'touch' ? this.pointers.new(pointerName, keyDef.pointerType, this.buttons) : this.pointers.get(pointerName);
        // TODO: deprecate the following implicit setting of position
        pointer.position = position;
        if (pointer.pointerType !== 'touch') {
            this.mouse.position = position;
        }
        if (pointer.pointerType === 'touch') {
            pointer.init(instance);
        }
        pointer.down(instance, keyDef.button);
        if (pointer.pointerType !== 'touch') {
            this.mouse.down(instance, keyDef, pointer.isPrevented);
        }
    }
    async move(instance, pointerName, position) {
        const pointer = this.pointers.get(pointerName);
        // In (some?) browsers this order of events can be observed.
        // This interweaving of events is probably unnecessary.
        // While the order of mouse (or pointer) events is defined per spec,
        // the order in which they interweave/follow on a user interaction depends on the implementation.
        const pointermove = pointer.move(instance, position);
        const mousemove = pointer.pointerType === 'touch' ? undefined : this.mouse.move(instance, position, pointer.isPrevented);
        pointermove === null || pointermove === undefined ? undefined : pointermove.leave();
        mousemove === null || mousemove === undefined ? undefined : mousemove.leave();
        pointermove === null || pointermove === undefined ? undefined : pointermove.enter();
        mousemove === null || mousemove === undefined ? undefined : mousemove.enter();
        pointermove === null || pointermove === undefined ? undefined : pointermove.move();
        mousemove === null || mousemove === undefined ? undefined : mousemove.move();
    }
    async release(instance, keyDef, position) {
        const device = this.devices.get(keyDef.pointerType);
        device.removePressed(keyDef);
        this.buttons.up(keyDef);
        const pointer = this.pointers.get(this.getPointerName(keyDef));
        const isPrevented = pointer.isPrevented;
        // TODO: deprecate the following implicit setting of position
        pointer.position = position;
        if (pointer.pointerType !== 'touch') {
            this.mouse.position = position;
        }
        if (device.countPressed === 0) {
            pointer.up(instance, keyDef.button);
        }
        if (pointer.pointerType === 'touch') {
            pointer.release(instance);
        }
        if (pointer.pointerType === 'touch' && !pointer.isMultitouch) {
            const mousemove = this.mouse.move(instance, position, isPrevented);
            mousemove === null || mousemove === undefined ? undefined : mousemove.leave();
            mousemove === null || mousemove === undefined ? undefined : mousemove.enter();
            mousemove === null || mousemove === undefined ? undefined : mousemove.move();
            this.mouse.down(instance, keyDef, isPrevented);
        }
        if (!pointer.isMultitouch) {
            const mousemove = this.mouse.move(instance, position, isPrevented);
            mousemove === null || mousemove === undefined ? undefined : mousemove.leave();
            mousemove === null || mousemove === undefined ? undefined : mousemove.enter();
            mousemove === null || mousemove === undefined ? undefined : mousemove.move();
            this.mouse.up(instance, keyDef, isPrevented);
        }
    }
    getPointerName(keyDef) {
        return keyDef.pointerType === 'touch' ? keyDef.name : keyDef.pointerType;
    }
    getPreviousPosition(pointerName) {
        return this.pointers.has(pointerName) ? this.pointers.get(pointerName).position : undefined;
    }
    resetClickCount() {
        this.mouse.resetClickCount();
    }
    getMouseTarget(instance) {
        var _this_mouse_position_target;
        return (_this_mouse_position_target = this.mouse.position.target) !== null && _this_mouse_position_target !== undefined ? _this_mouse_position_target : instance.config.document.body;
    }
    setMousePosition(position) {
        this.mouse.position = position;
        this.pointers.get('mouse').position = position;
    }
    constructor(system){
        _define_property(this, "system", undefined);
        _define_property(this, "mouse", undefined);
        _define_property(this, "buttons", undefined);
        _define_property(this, "devices", new class {
            get(k) {
                var _this_registry, _k;
                var _;
                return (_ = (_this_registry = this.registry)[_k = k]) !== null && _ !== undefined ? _ : _this_registry[_k] = new Device();
            }
            constructor(){
                _define_property(this, "registry", {});
            }
        }());
        _define_property(this, "pointers", new class {
            new(pointerName, pointerType, buttons) {
                const isPrimary = pointerType !== 'touch' || !Object.values(this.registry).some((p)=>p.pointerType === 'touch' && !p.isCancelled);
                if (!isPrimary) {
                    Object.values(this.registry).forEach((p)=>{
                        if (p.pointerType === pointerType && !p.isCancelled) {
                            p.isMultitouch = true;
                        }
                    });
                }
                this.registry[pointerName] = new Pointer({
                    pointerId: this.nextId++,
                    pointerType,
                    isPrimary
                }, buttons);
                return this.registry[pointerName];
            }
            get(pointerName) {
                if (!this.has(pointerName)) {
                    throw new Error(`Trying to access pointer "${pointerName}" which does not exist.`);
                }
                return this.registry[pointerName];
            }
            has(pointerName) {
                return pointerName in this.registry;
            }
            constructor(){
                _define_property(this, "registry", {});
                _define_property(this, "nextId", 1);
            }
        }());
        this.system = system;
        this.buttons = new Buttons();
        this.mouse = new Mouse();
        this.pointers.new('mouse', 'mouse', this.buttons);
    }
}

export { PointerHost };
