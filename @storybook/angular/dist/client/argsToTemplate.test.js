"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const argsToTemplate_1 = require("./argsToTemplate");
// adjust path
(0, vitest_1.describe)('argsToTemplate', () => {
    (0, vitest_1.it)('should correctly convert args to template string and exclude undefined values', () => {
        const args = {
            prop1: 'value1',
            prop2: undefined,
            prop3: 'value3',
        };
        const options = {};
        const result = (0, argsToTemplate_1.argsToTemplate)(args, options);
        (0, vitest_1.expect)(result).toBe('[prop1]="prop1" [prop3]="prop3"');
    });
    (0, vitest_1.it)('should include properties from include option', () => {
        const args = {
            prop1: 'value1',
            prop2: 'value2',
            prop3: 'value3',
        };
        const options = {
            include: ['prop1', 'prop3'],
        };
        const result = (0, argsToTemplate_1.argsToTemplate)(args, options);
        (0, vitest_1.expect)(result).toBe('[prop1]="prop1" [prop3]="prop3"');
    });
    (0, vitest_1.it)('should include non-undefined properties from include option', () => {
        const args = {
            prop1: 'value1',
            prop2: 'value2',
            prop3: undefined,
        };
        const options = {
            include: ['prop1', 'prop3'],
        };
        const result = (0, argsToTemplate_1.argsToTemplate)(args, options);
        (0, vitest_1.expect)(result).toBe('[prop1]="prop1"');
    });
    (0, vitest_1.it)('should exclude properties from exclude option', () => {
        const args = {
            prop1: 'value1',
            prop2: 'value2',
            prop3: 'value3',
        };
        const options = {
            exclude: ['prop2'],
        };
        const result = (0, argsToTemplate_1.argsToTemplate)(args, options);
        (0, vitest_1.expect)(result).toBe('[prop1]="prop1" [prop3]="prop3"');
    });
    (0, vitest_1.it)('should exclude properties from exclude option and undefined properties', () => {
        const args = {
            prop1: 'value1',
            prop2: 'value2',
            prop3: undefined,
        };
        const options = {
            exclude: ['prop2'],
        };
        const result = (0, argsToTemplate_1.argsToTemplate)(args, options);
        (0, vitest_1.expect)(result).toBe('[prop1]="prop1"');
    });
    (0, vitest_1.it)('should prioritize include over exclude when both options are given', () => {
        const args = {
            prop1: 'value1',
            prop2: 'value2',
            prop3: 'value3',
        };
        const options = {
            include: ['prop1', 'prop2'],
            exclude: ['prop2', 'prop3'],
        };
        const result = (0, argsToTemplate_1.argsToTemplate)(args, options);
        (0, vitest_1.expect)(result).toBe('[prop1]="prop1" [prop2]="prop2"');
    });
    (0, vitest_1.it)('should work when neither include nor exclude options are given', () => {
        const args = {
            prop1: 'value1',
            prop2: 'value2',
        };
        const options = {};
        const result = (0, argsToTemplate_1.argsToTemplate)(args, options);
        (0, vitest_1.expect)(result).toBe('[prop1]="prop1" [prop2]="prop2"');
    });
    (0, vitest_1.it)('should bind events correctly when value is a function', () => {
        const args = { event1: () => { }, event2: () => { } };
        const result = (0, argsToTemplate_1.argsToTemplate)(args, {});
        (0, vitest_1.expect)(result).toEqual('(event1)="event1($event)" (event2)="event2($event)"');
    });
    (0, vitest_1.it)('should mix properties and events correctly', () => {
        const args = { input: 'Value1', event1: () => { } };
        const result = (0, argsToTemplate_1.argsToTemplate)(args, {});
        (0, vitest_1.expect)(result).toEqual('[input]="input" (event1)="event1($event)"');
    });
    (0, vitest_1.it)('should format for non dot notation', () => {
        const args = { 'non-dot': 'Value1', 'dash-out': () => { } };
        const result = (0, argsToTemplate_1.argsToTemplate)(args, {});
        (0, vitest_1.expect)(result).toEqual('[non-dot]="this[\'non-dot\']" (dash-out)="this[\'dash-out\']($event)"');
    });
});
