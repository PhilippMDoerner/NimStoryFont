"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRenderer = exports.STORY_UID_ATTRIBUTE = void 0;
const platform_browser_1 = require("@angular/platform-browser");
const rxjs_1 = require("rxjs");
const telejson_1 = require("telejson");
const StorybookModule_1 = require("./StorybookModule");
const StorybookProvider_1 = require("./StorybookProvider");
const BootstrapQueue_1 = require("./utils/BootstrapQueue");
const PropertyExtractor_1 = require("./utils/PropertyExtractor");
const applicationRefs = new Map();
/**
 * Attribute name for the story UID that may be written to the targetDOMNode.
 *
 * If a target DOM node has a story UID attribute, it will be used as part of the selector for the
 * Angular component.
 */
exports.STORY_UID_ATTRIBUTE = 'data-sb-story-uid';
class AbstractRenderer {
    constructor() {
        this.previousStoryRenderInfo = new Map();
    }
    /** Wait and destroy the platform */
    static resetApplications(domNode) {
        applicationRefs.forEach((appRef, appDOMNode) => {
            if (!appRef.destroyed && (!domNode || appDOMNode === domNode)) {
                appRef.destroy();
            }
        });
    }
    /**
     * Bootstrap main angular module with main component or send only new `props` with storyProps$
     *
     * @param storyFnAngular {StoryFnAngularReturnType}
     * @param forced {boolean} If :
     *
     *   - True render will only use the StoryFn `props' in storyProps observable that will update sotry's
     *       component/template properties. Improves performance without reloading the whole
     *       module&component if props changes
     *   - False fully recharges or initializes angular module & component
     *
     * @param component {Component}
     */
    async render({ storyFnAngular, forced, component, targetDOMNode, }) {
        const targetSelector = this.generateTargetSelectorFromStoryId(targetDOMNode.id);
        const newStoryProps$ = new rxjs_1.BehaviorSubject(storyFnAngular.props);
        if (!this.fullRendererRequired({
            targetDOMNode,
            storyFnAngular,
            moduleMetadata: {
                ...storyFnAngular.moduleMetadata,
            },
            forced,
        })) {
            this.storyProps$.next(storyFnAngular.props);
            return;
        }
        await this.beforeFullRender(targetDOMNode);
        // Complete last BehaviorSubject and set a new one for the current module
        if (this.storyProps$) {
            this.storyProps$.complete();
        }
        this.storyProps$ = newStoryProps$;
        this.initAngularRootElement(targetDOMNode, targetSelector);
        const analyzedMetadata = new PropertyExtractor_1.PropertyExtractor(storyFnAngular.moduleMetadata, component);
        await analyzedMetadata.init();
        const storyUid = this.generateStoryUIdFromRawStoryUid(targetDOMNode.getAttribute(exports.STORY_UID_ATTRIBUTE));
        const componentSelector = storyUid !== null ? `${targetSelector}[${storyUid}]` : targetSelector;
        if (storyUid !== null) {
            const element = targetDOMNode.querySelector(targetSelector);
            element.toggleAttribute(storyUid, true);
        }
        const application = (0, StorybookModule_1.getApplication)({
            storyFnAngular,
            component,
            targetSelector: componentSelector,
            analyzedMetadata,
        });
        const providers = [
            (0, StorybookProvider_1.storyPropsProvider)(newStoryProps$),
            ...analyzedMetadata.applicationProviders,
            ...(storyFnAngular.applicationConfig?.providers ?? []),
        ];
        if (STORYBOOK_ANGULAR_OPTIONS?.experimentalZoneless) {
            const { provideExperimentalZonelessChangeDetection } = await Promise.resolve().then(() => __importStar(require('@angular/core')));
            if (!provideExperimentalZonelessChangeDetection) {
                throw new Error('Experimental zoneless change detection requires Angular 18 or higher');
            }
            else {
                providers.unshift(provideExperimentalZonelessChangeDetection());
            }
        }
        const applicationRef = await (0, BootstrapQueue_1.queueBootstrapping)(() => {
            return (0, platform_browser_1.bootstrapApplication)(application, {
                ...storyFnAngular.applicationConfig,
                providers,
            });
        });
        applicationRefs.set(targetDOMNode, applicationRef);
    }
    /**
     * Only ASCII alphanumerics can be used as HTML tag name. https://html.spec.whatwg.org/#elements-2
     *
     * Therefore, stories break when non-ASCII alphanumerics are included in target selector.
     * https://github.com/storybookjs/storybook/issues/15147
     *
     * This method returns storyId when it doesn't contain any non-ASCII alphanumerics. Otherwise, it
     * generates a valid HTML tag name from storyId by removing non-ASCII alphanumerics from storyId,
     * prefixing "sb-", and suffixing "-component"
     *
     * @memberof AbstractRenderer
     * @protected
     */
    generateTargetSelectorFromStoryId(id) {
        const invalidHtmlTag = /[^A-Za-z0-9-]/g;
        const storyIdIsInvalidHtmlTagName = invalidHtmlTag.test(id);
        return storyIdIsInvalidHtmlTagName ? `sb-${id.replace(invalidHtmlTag, '')}-component` : id;
    }
    /**
     * Angular is unable to handle components that have selectors with accented attributes.
     *
     * Therefore, stories break when meta's title contains accents.
     * https://github.com/storybookjs/storybook/issues/29132
     *
     * This method filters accents from a given raw id. For example, this method converts
     * 'Example/Button with an "é" accent' into 'Example/Button with an "e" accent'.
     *
     * @memberof AbstractRenderer
     * @protected
     */
    generateStoryUIdFromRawStoryUid(rawStoryUid) {
        if (rawStoryUid === null) {
            return rawStoryUid;
        }
        const accentCharacters = /[\u0300-\u036f]/g;
        return rawStoryUid.normalize('NFD').replace(accentCharacters, '');
    }
    /** Adds DOM element that angular will use as bootstrap component. */
    initAngularRootElement(targetDOMNode, targetSelector) {
        targetDOMNode.innerHTML = '';
        targetDOMNode.appendChild(document.createElement(targetSelector));
    }
    fullRendererRequired({ targetDOMNode, storyFnAngular, moduleMetadata, forced, }) {
        const previousStoryRenderInfo = this.previousStoryRenderInfo.get(targetDOMNode);
        const currentStoryRender = {
            storyFnAngular,
            moduleMetadataSnapshot: (0, telejson_1.stringify)(moduleMetadata, { allowFunction: false }),
        };
        this.previousStoryRenderInfo.set(targetDOMNode, currentStoryRender);
        if (
        // check `forceRender` of story RenderContext
        !forced ||
            // if it's the first rendering and storyProps$ is not init
            !this.storyProps$) {
            return true;
        }
        // force the rendering if the template has changed
        const hasChangedTemplate = !!storyFnAngular?.template &&
            previousStoryRenderInfo?.storyFnAngular?.template !== storyFnAngular.template;
        if (hasChangedTemplate) {
            return true;
        }
        // force the rendering if the metadata structure has changed
        const hasChangedModuleMetadata = currentStoryRender.moduleMetadataSnapshot !== previousStoryRenderInfo?.moduleMetadataSnapshot;
        return hasChangedModuleMetadata;
    }
}
exports.AbstractRenderer = AbstractRenderer;
