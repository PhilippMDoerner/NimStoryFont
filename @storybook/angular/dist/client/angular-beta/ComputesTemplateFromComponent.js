"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computesTemplateSourceFromComponent = exports.computesTemplateFromComponent = exports.formatPropInTemplate = void 0;
const NgComponentAnalyzer_1 = require("./utils/NgComponentAnalyzer");
/**
 * Check if the name matches the criteria for a valid identifier. A valid identifier can only
 * contain letters, digits, underscores, or dollar signs. It cannot start with a digit.
 */
const isValidIdentifier = (name) => /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name);
/**
 * Returns the property name, if it can be accessed with dot notation. If not, it returns
 * `this['propertyName']`.
 */
const formatPropInTemplate = (propertyName) => isValidIdentifier(propertyName) ? propertyName : `this['${propertyName}']`;
exports.formatPropInTemplate = formatPropInTemplate;
const separateInputsOutputsAttributes = (ngComponentInputsOutputs, props = {}) => {
    const inputs = ngComponentInputsOutputs.inputs
        .filter((i) => i.templateName in props)
        .map((i) => i.templateName);
    const outputs = ngComponentInputsOutputs.outputs
        .filter((o) => o.templateName in props)
        .map((o) => o.templateName);
    return {
        inputs,
        outputs,
        otherProps: Object.keys(props).filter((k) => ![...inputs, ...outputs].includes(k)),
    };
};
/**
 * Converts a component into a template with inputs/outputs present in initial props
 *
 * @param component
 * @param initialProps
 * @param innerTemplate
 */
const computesTemplateFromComponent = (component, initialProps, innerTemplate = '') => {
    const ngComponentMetadata = (0, NgComponentAnalyzer_1.getComponentDecoratorMetadata)(component);
    const ngComponentInputsOutputs = (0, NgComponentAnalyzer_1.getComponentInputsOutputs)(component);
    if (!ngComponentMetadata.selector) {
        // Allow to add renderer component when NgComponent selector is undefined
        return `<ng-container *ngComponentOutlet="storyComponent"></ng-container>`;
    }
    const { inputs: initialInputs, outputs: initialOutputs } = separateInputsOutputsAttributes(ngComponentInputsOutputs, initialProps);
    const templateInputs = initialInputs.length > 0
        ? ` ${initialInputs.map((i) => `[${i}]="${(0, exports.formatPropInTemplate)(i)}"`).join(' ')}`
        : '';
    const templateOutputs = initialOutputs.length > 0
        ? ` ${initialOutputs.map((i) => `(${i})="${(0, exports.formatPropInTemplate)(i)}($event)"`).join(' ')}`
        : '';
    return buildTemplate(ngComponentMetadata.selector, innerTemplate, templateInputs, templateOutputs);
};
exports.computesTemplateFromComponent = computesTemplateFromComponent;
/** Stringify an object with a placholder in the circular references. */
function stringifyCircular(obj) {
    const seen = new Set();
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return '[Circular]';
            }
            seen.add(value);
        }
        return value;
    });
}
const createAngularInputProperty = ({ propertyName, value, argType, }) => {
    let templateValue;
    switch (typeof value) {
        case 'string':
            templateValue = `'${value}'`;
            break;
        case 'object':
            templateValue = stringifyCircular(value)
                .replace(/'/g, '\u2019')
                .replace(/\\"/g, '\u201D')
                .replace(/"([^-"]+)":/g, '$1: ')
                .replace(/"/g, "'")
                .replace(/\u2019/g, "\\'")
                .replace(/\u201D/g, "\\'")
                .split(',')
                .join(', ');
            break;
        default:
            templateValue = value;
    }
    return `[${propertyName}]="${templateValue}"`;
};
/**
 * Converts a component into a template with inputs/outputs present in initial props
 *
 * @param component
 * @param initialProps
 * @param innerTemplate
 */
const computesTemplateSourceFromComponent = (component, initialProps, argTypes) => {
    const ngComponentMetadata = (0, NgComponentAnalyzer_1.getComponentDecoratorMetadata)(component);
    if (!ngComponentMetadata) {
        return null;
    }
    if (!ngComponentMetadata.selector) {
        // Allow to add renderer component when NgComponent selector is undefined
        return `<ng-container *ngComponentOutlet="${component.name}"></ng-container>`;
    }
    const ngComponentInputsOutputs = (0, NgComponentAnalyzer_1.getComponentInputsOutputs)(component);
    const { inputs: initialInputs, outputs: initialOutputs } = separateInputsOutputsAttributes(ngComponentInputsOutputs, initialProps);
    const templateInputs = initialInputs.length > 0
        ? ` ${initialInputs
            .map((propertyName) => createAngularInputProperty({
            propertyName,
            value: initialProps[propertyName],
            argType: argTypes?.[propertyName],
        }))
            .join(' ')}`
        : '';
    const templateOutputs = initialOutputs.length > 0
        ? ` ${initialOutputs.map((i) => `(${i})="${(0, exports.formatPropInTemplate)(i)}($event)"`).join(' ')}`
        : '';
    return buildTemplate(ngComponentMetadata.selector, '', templateInputs, templateOutputs);
};
exports.computesTemplateSourceFromComponent = computesTemplateSourceFromComponent;
const buildTemplate = (selector, innerTemplate, inputs, outputs) => {
    // https://www.w3.org/TR/2011/WD-html-markup-20110113/syntax.html#syntax-elements
    const voidElements = [
        'area',
        'base',
        'br',
        'col',
        'command',
        'embed',
        'hr',
        'img',
        'input',
        'keygen',
        'link',
        'meta',
        'param',
        'source',
        'track',
        'wbr',
    ];
    const firstSelector = selector.split(',')[0];
    const templateReplacers = [
        [/(^.*?)(?=[,])/, '$1'],
        [/(^\..+)/, 'div$1'],
        [/(^\[.+?])/, 'div$1'],
        [/([\w[\]]+)(\s*,[\w\s-[\],]+)+/, `$1`],
        [/#([\w-]+)/, ` id="$1"`],
        [/((\.[\w-]+)+)/, (_, c) => ` class="${c.split `.`.join ` `.trim()}"`],
        [/(\[.+?])/g, (_, a) => ` ${a.slice(1, -1)}`],
        [
            /([\S]+)(.*)/,
            (template, elementSelector) => {
                return voidElements.some((element) => elementSelector === element)
                    ? template.replace(/([\S]+)(.*)/, `<$1$2${inputs}${outputs} />`)
                    : template.replace(/([\S]+)(.*)/, `<$1$2${inputs}${outputs}>${innerTemplate}</$1>`);
            },
        ],
    ];
    return templateReplacers.reduce((prevSelector, [searchValue, replacer]) => prevSelector.replace(searchValue, replacer), firstSelector);
};
