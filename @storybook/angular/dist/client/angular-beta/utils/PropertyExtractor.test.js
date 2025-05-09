"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const animations_1 = require("@angular/platform-browser/animations");
const vitest_1 = require("vitest");
const test_module_1 = require("../__testfixtures__/test.module");
const PropertyExtractor_1 = require("./PropertyExtractor");
const TEST_TOKEN = new core_1.InjectionToken('testToken');
const TestTokenProvider = { provide: TEST_TOKEN, useValue: 123 };
const TestService = (0, core_1.Injectable)()(class {
});
const TestComponent1 = (0, core_1.Component)({ standalone: false })(class {
});
const TestComponent2 = (0, core_1.Component)({ standalone: false })(class {
});
const StandaloneTestComponent = (0, core_1.Component)({})(class {
});
const StandaloneTestDirective = (0, core_1.Directive)({})(class {
});
const MixedTestComponent1 = (0, core_1.Component)({})(class extends StandaloneTestComponent {
});
const MixedTestComponent2 = (0, core_1.Component)({ standalone: false })(class extends MixedTestComponent1 {
});
const MixedTestComponent3 = (0, core_1.Component)({})(class extends MixedTestComponent2 {
});
const TestModuleWithDeclarations = (0, core_1.NgModule)({ declarations: [TestComponent1] })(class {
});
const TestModuleWithImportsAndProviders = (0, core_1.NgModule)({
    imports: [TestModuleWithDeclarations],
    providers: [TestTokenProvider],
})(class {
});
const analyzeMetadata = async (metadata, component) => {
    const propertyExtractor = new PropertyExtractor_1.PropertyExtractor(metadata, component);
    await propertyExtractor.init();
    return propertyExtractor;
};
const extractImports = async (metadata, component) => {
    const propertyExtractor = new PropertyExtractor_1.PropertyExtractor(metadata, component);
    await propertyExtractor.init();
    return propertyExtractor.imports;
};
const extractDeclarations = async (metadata, component) => {
    const propertyExtractor = new PropertyExtractor_1.PropertyExtractor(metadata, component);
    await propertyExtractor.init();
    return propertyExtractor.declarations;
};
const extractProviders = async (metadata, component) => {
    const propertyExtractor = new PropertyExtractor_1.PropertyExtractor(metadata, component);
    await propertyExtractor.init();
    return propertyExtractor.providers;
};
const extractApplicationProviders = async (metadata, component) => {
    const propertyExtractor = new PropertyExtractor_1.PropertyExtractor(metadata, component);
    await propertyExtractor.init();
    return propertyExtractor.applicationProviders;
};
(0, vitest_1.describe)('PropertyExtractor', () => {
    vitest_1.vi.spyOn(console, 'warn').mockImplementation(() => { });
    (0, vitest_1.describe)('analyzeMetadata', () => {
        (0, vitest_1.it)('should remove BrowserModule', async () => {
            const metadata = {
                imports: [platform_browser_1.BrowserModule],
            };
            const { imports, providers, applicationProviders } = await analyzeMetadata(metadata);
            (0, vitest_1.expect)(imports.flat(Number.MAX_VALUE)).toEqual([common_1.CommonModule]);
            (0, vitest_1.expect)(providers.flat(Number.MAX_VALUE)).toEqual([]);
            (0, vitest_1.expect)(applicationProviders.flat(Number.MAX_VALUE)).toEqual([]);
        });
        (0, vitest_1.it)('should remove BrowserAnimationsModule and use its providers instead', async () => {
            const metadata = {
                imports: [animations_1.BrowserAnimationsModule],
            };
            const { imports, providers, applicationProviders } = await analyzeMetadata(metadata);
            (0, vitest_1.expect)(imports.flat(Number.MAX_VALUE)).toEqual([common_1.CommonModule]);
            (0, vitest_1.expect)(providers.flat(Number.MAX_VALUE)).toEqual([]);
            (0, vitest_1.expect)(applicationProviders.flat(Number.MAX_VALUE)).toEqual((0, animations_1.provideAnimations)());
        });
        (0, vitest_1.it)('should remove NoopAnimationsModule and use its providers instead', async () => {
            const metadata = {
                imports: [animations_1.NoopAnimationsModule],
            };
            const { imports, providers, applicationProviders } = await analyzeMetadata(metadata);
            (0, vitest_1.expect)(imports.flat(Number.MAX_VALUE)).toEqual([common_1.CommonModule]);
            (0, vitest_1.expect)(providers.flat(Number.MAX_VALUE)).toEqual([]);
            (0, vitest_1.expect)(applicationProviders.flat(Number.MAX_VALUE)).toEqual((0, animations_1.provideNoopAnimations)());
        });
        (0, vitest_1.it)('should remove Browser/Animations modules recursively', async () => {
            const metadata = {
                imports: [animations_1.BrowserAnimationsModule, platform_browser_1.BrowserModule],
            };
            const { imports, providers, applicationProviders } = await analyzeMetadata(metadata);
            (0, vitest_1.expect)(imports.flat(Number.MAX_VALUE)).toEqual([common_1.CommonModule]);
            (0, vitest_1.expect)(providers.flat(Number.MAX_VALUE)).toEqual([]);
            (0, vitest_1.expect)(applicationProviders.flat(Number.MAX_VALUE)).toEqual((0, animations_1.provideAnimations)());
        });
        (0, vitest_1.it)('should not destructure Angular official module', async () => {
            const metadata = {
                imports: [test_module_1.WithOfficialModule],
            };
            const { imports, providers, applicationProviders } = await analyzeMetadata(metadata);
            (0, vitest_1.expect)(imports.flat(Number.MAX_VALUE)).toEqual([common_1.CommonModule, test_module_1.WithOfficialModule]);
            (0, vitest_1.expect)(providers.flat(Number.MAX_VALUE)).toEqual([]);
            (0, vitest_1.expect)(applicationProviders.flat(Number.MAX_VALUE)).toEqual([]);
        });
    });
    (0, vitest_1.describe)('extractImports', () => {
        (0, vitest_1.it)('should return Angular official modules', async () => {
            const imports = await extractImports({ imports: [TestModuleWithImportsAndProviders] });
            (0, vitest_1.expect)(imports).toEqual([common_1.CommonModule, TestModuleWithImportsAndProviders]);
        });
        (0, vitest_1.it)('should return standalone components', async () => {
            const imports = await extractImports({
                imports: [TestModuleWithImportsAndProviders],
            }, StandaloneTestComponent);
            (0, vitest_1.expect)(imports).toEqual([
                common_1.CommonModule,
                TestModuleWithImportsAndProviders,
                StandaloneTestComponent,
            ]);
        });
        (0, vitest_1.it)('should return standalone directives', async () => {
            const imports = await extractImports({
                imports: [TestModuleWithImportsAndProviders],
            }, StandaloneTestDirective);
            (0, vitest_1.expect)(imports).toEqual([
                common_1.CommonModule,
                TestModuleWithImportsAndProviders,
                StandaloneTestDirective,
            ]);
        });
    });
    (0, vitest_1.describe)('extractDeclarations', () => {
        (0, vitest_1.it)('should return an array of declarations that contains `storyComponent`', async () => {
            const declarations = await extractDeclarations({ declarations: [TestComponent1] }, TestComponent2);
            (0, vitest_1.expect)(declarations).toEqual([TestComponent1, TestComponent2]);
        });
    });
    (0, vitest_1.describe)('analyzeDecorators', () => {
        (0, vitest_1.it)('isStandalone should be false', () => {
            const { isStandalone } = PropertyExtractor_1.PropertyExtractor.analyzeDecorators(TestComponent1);
            (0, vitest_1.expect)(isStandalone).toBe(false);
        });
        (0, vitest_1.it)('isStandalone should be true', () => {
            const { isStandalone } = PropertyExtractor_1.PropertyExtractor.analyzeDecorators(StandaloneTestComponent);
            (0, vitest_1.expect)(isStandalone).toBe(true);
        });
        (0, vitest_1.it)('isStandalone should be true', () => {
            const { isStandalone } = PropertyExtractor_1.PropertyExtractor.analyzeDecorators(MixedTestComponent1);
            (0, vitest_1.expect)(isStandalone).toBe(true);
        });
        (0, vitest_1.it)('isStandalone should be false', () => {
            const { isStandalone } = PropertyExtractor_1.PropertyExtractor.analyzeDecorators(MixedTestComponent2);
            (0, vitest_1.expect)(isStandalone).toBe(false);
        });
        (0, vitest_1.it)('isStandalone should be true', () => {
            const { isStandalone } = PropertyExtractor_1.PropertyExtractor.analyzeDecorators(MixedTestComponent3);
            (0, vitest_1.expect)(isStandalone).toBe(true);
        });
    });
    (0, vitest_1.describe)('extractProviders', () => {
        (0, vitest_1.it)('should return an array of providers', async () => {
            const providers = await extractProviders({
                providers: [TestService],
            });
            (0, vitest_1.expect)(providers).toEqual([TestService]);
        });
        (0, vitest_1.it)('should return an array of singletons extracted', async () => {
            const singeltons = await extractApplicationProviders({
                imports: [animations_1.BrowserAnimationsModule],
            });
            (0, vitest_1.expect)(singeltons).toEqual((0, animations_1.provideAnimations)());
        });
    });
});
