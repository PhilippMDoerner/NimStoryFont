"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const compodoc_1 = require("./compodoc");
const makeProperty = (compodocType) => ({
    type: compodocType,
    name: 'dummy',
    decorators: [],
    optional: true,
});
const getDummyCompodocJson = () => {
    return {
        miscellaneous: {
            typealiases: [
                {
                    name: 'EnumAlias',
                    ctype: 'miscellaneous',
                    subtype: 'typealias',
                    rawtype: 'EnumNumeric',
                    file: 'src/stories/component-with-enums/enums.component.ts',
                    description: '',
                    kind: 161,
                },
                {
                    name: 'TypeAlias',
                    ctype: 'miscellaneous',
                    subtype: 'typealias',
                    rawtype: '"Type Alias 1" | "Type Alias 2" | "Type Alias 3"',
                    file: 'src/stories/component-with-enums/enums.component.ts',
                    description: '',
                    kind: 168,
                },
            ],
            enumerations: [
                {
                    name: 'EnumNumeric',
                    childs: [
                        {
                            name: 'FIRST',
                        },
                        {
                            name: 'SECOND',
                        },
                        {
                            name: 'THIRD',
                        },
                    ],
                    ctype: 'miscellaneous',
                    subtype: 'enum',
                    description: '<p>Button Priority</p>\n',
                    file: 'src/stories/component-with-enums/enums.component.ts',
                },
                {
                    name: 'EnumNumericInitial',
                    childs: [
                        {
                            name: 'UNO',
                            value: '1',
                        },
                        {
                            name: 'DOS',
                        },
                        {
                            name: 'TRES',
                        },
                    ],
                    ctype: 'miscellaneous',
                    subtype: 'enum',
                    description: '',
                    file: 'src/stories/component-with-enums/enums.component.ts',
                },
                {
                    name: 'EnumStringValues',
                    childs: [
                        {
                            name: 'PRIMARY',
                            value: 'PRIMARY',
                        },
                        {
                            name: 'SECONDARY',
                            value: 'SECONDARY',
                        },
                        {
                            name: 'TERTIARY',
                            value: 'TERTIARY',
                        },
                    ],
                    ctype: 'miscellaneous',
                    subtype: 'enum',
                    description: '',
                    file: 'src/stories/component-with-enums/enums.component.ts',
                },
            ],
        },
    };
};
(0, vitest_1.describe)('extractType', () => {
    (0, vitest_1.describe)('with compodoc type', () => {
        (0, compodoc_1.setCompodocJson)(getDummyCompodocJson());
        vitest_1.it.each([
            ['string', { name: 'string' }],
            ['boolean', { name: 'boolean' }],
            ['number', { name: 'number' }],
            // ['object', { name: 'object' }], // seems to be wrong | TODO: REVISIT
            // ['foo', { name: 'other', value: 'empty-enum' }], // seems to be wrong | TODO: REVISIT
            [null, { name: 'other', value: 'void' }],
            [undefined, { name: 'other', value: 'void' }],
            // ['T[]', { name: 'other', value: 'empty-enum' }], // seems to be wrong | TODO: REVISIT
            ['[]', { name: 'other', value: 'empty-enum' }],
            ['"primary" | "secondary"', { name: 'enum', value: ['primary', 'secondary'] }],
            ['TypeAlias', { name: 'enum', value: ['Type Alias 1', 'Type Alias 2', 'Type Alias 3'] }],
            // ['EnumNumeric', { name: 'other', value: 'empty-enum' }], // seems to be wrong | TODO: REVISIT
            // ['EnumNumericInitial', { name: 'other', value: 'empty-enum' }], // seems to be wrong | TODO: REVISIT
            ['EnumStringValues', { name: 'enum', value: ['PRIMARY', 'SECONDARY', 'TERTIARY'] }],
        ])('%s', (compodocType, expected) => {
            (0, vitest_1.expect)((0, compodoc_1.extractType)(makeProperty(compodocType), null)).toEqual(expected);
        });
    });
    (0, vitest_1.describe)('without compodoc type', () => {
        vitest_1.it.each([
            ['string', { name: 'string' }],
            ['', { name: 'string' }],
            [false, { name: 'boolean' }],
            [10, { name: 'number' }],
            // [['abc'], { name: 'object' }], // seems to be wrong | TODO: REVISIT
            // [{ foo: 1 }, { name: 'other', value: 'empty-enum' }], // seems to be wrong | TODO: REVISIT
            [undefined, { name: 'other', value: 'void' }],
        ])('%s', (defaultValue, expected) => {
            (0, vitest_1.expect)((0, compodoc_1.extractType)(makeProperty(null), defaultValue)).toEqual(expected);
        });
    });
});
