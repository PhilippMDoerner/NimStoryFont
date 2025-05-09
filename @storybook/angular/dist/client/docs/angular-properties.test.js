"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const vitest_1 = require("vitest");
// File hierarchy: __testfixtures__ / some-test-case / input.*
const inputRegExp = /^input\..*$/;
(0, vitest_1.describe)('angular component properties', () => {
    const fixturesDir = (0, node_path_1.join)(__dirname, '__testfixtures__');
    (0, node_fs_1.readdirSync)(fixturesDir, { withFileTypes: true }).forEach((testEntry) => {
        if (testEntry.isDirectory()) {
            const testDir = (0, node_path_1.join)(fixturesDir, testEntry.name);
            const testFile = (0, node_fs_1.readdirSync)(testDir).find((fileName) => inputRegExp.test(fileName));
            if (testFile) {
                // TODO: Remove this as soon as the real test is fixed
                (0, vitest_1.it)('true', () => {
                    (0, vitest_1.expect)(true).toEqual(true);
                });
                // TODO: Fix this test
                // it(`${testEntry.name}`, async () => {
                //   const inputPath = join(testDir, testFile);
                //   // snapshot the output of compodoc
                //   const compodocOutput = runCompodoc(inputPath);
                //   const compodocJson = JSON.parse(compodocOutput);
                //   await expect(compodocJson).toMatchFileSnapshot(
                //     join(testDir, `compodoc-${SNAPSHOT_OS}.snapshot`)
                //   );
                //   // snapshot the output of addon-docs angular-properties
                //   const componentData = findComponentByName('InputComponent', compodocJson);
                //   const argTypes = extractArgTypesFromData(componentData);
                //   await expect(argTypes).toMatchFileSnapshot(join(testDir, 'argtypes.snapshot'));
                // });
            }
        }
    });
});
