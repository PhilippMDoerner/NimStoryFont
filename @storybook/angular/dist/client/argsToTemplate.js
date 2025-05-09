"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argsToTemplate = argsToTemplate;
const ComputesTemplateFromComponent_1 = require("./angular-beta/ComputesTemplateFromComponent");
/**
 * Converts an object of arguments to a string of property and event bindings and excludes undefined
 * values. Why? Because Angular treats undefined values in property bindings as an actual value and
 * does not apply the default value of the property as soon as the binding is set. This feels
 * counter-intuitive and is a common source of bugs in stories.
 *
 * @example
 *
 * ```ts
 * // component.ts
 * ㅤ@Component({ selector: 'example' })
 *  export class ExampleComponent {
 *   ㅤ@Input() input1: string = 'Default Input1';
 *   ㅤ@Input() input2: string = 'Default Input2';
 *   ㅤ@Output() click = new EventEmitter();
 *  }
 *
 * // component.stories.ts
 * import { argsToTemplate } from '@storybook/angular';
 * export const Input1: Story = {
 *  render: (args) => ({
 *    props: args,
 *    // Problem1: <example [input1]="input1" [input2]="input2" (click)="click($event)"></example>
 *    // This will set input2 to undefined and the internal default value will not be used.
 *    // Problem2: <example [input1]="input1" (click)="click($event)"></example>
 *    // The default value of input2 will be used, but it is not overridable by the user via controls.
 *    // Solution: Now the controls will be applicable to both input1 and input2, and the default values will be used if the user does not override them.
 *    template: `<example ${argsToTemplate(args)}"></example>`,
 *  }),
 *  args: {
 *    // In this Story, we want to set the input1 property, and the internal default property of input2 should be used.
 *    input1: 'Input 1',
 *    click: { action: 'clicked' },
 *  },
 * };
 * ```
 */
function argsToTemplate(args, options = {}) {
    const includeSet = options.include ? new Set(options.include) : null;
    const excludeSet = options.exclude ? new Set(options.exclude) : null;
    return Object.entries(args)
        .filter(([key]) => args[key] !== undefined)
        .filter(([key]) => {
        if (includeSet)
            return includeSet.has(key);
        if (excludeSet)
            return !excludeSet.has(key);
        return true;
    })
        .map(([key, value]) => typeof value === 'function'
        ? `(${key})="${(0, ComputesTemplateFromComponent_1.formatPropInTemplate)(key)}($event)"`
        : `[${key}]="${(0, ComputesTemplateFromComponent_1.formatPropInTemplate)(key)}"`)
        .join(' ');
}
