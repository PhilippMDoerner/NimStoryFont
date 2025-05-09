"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const vitest_1 = require("vitest");
const NgModulesAnalyzer_1 = require("./NgModulesAnalyzer");
const FooComponent = (0, core_1.Component)({})(class {
});
const BarComponent = (0, core_1.Component)({})(class {
});
const BetaModule = (0, core_1.NgModule)({ declarations: [FooComponent] })(class {
});
const AlphaModule = (0, core_1.NgModule)({ imports: [BetaModule] })(class {
});
(0, vitest_1.describe)('isComponentAlreadyDeclaredInModules', () => {
    (0, vitest_1.it)('should return true when the component is already declared in one of modules', () => {
        (0, vitest_1.expect)((0, NgModulesAnalyzer_1.isComponentAlreadyDeclared)(FooComponent, [], [AlphaModule])).toEqual(true);
    });
    (0, vitest_1.it)('should return true if the component is in moduleDeclarations', () => {
        (0, vitest_1.expect)((0, NgModulesAnalyzer_1.isComponentAlreadyDeclared)(BarComponent, [BarComponent], [AlphaModule])).toEqual(true);
    });
    (0, vitest_1.it)('should return false if the component is not declared', () => {
        (0, vitest_1.expect)((0, NgModulesAnalyzer_1.isComponentAlreadyDeclared)(BarComponent, [], [AlphaModule])).toEqual(false);
    });
});
