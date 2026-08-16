import { r as StyledComponent } from "./chunk-CSYKg21N.js";
import { r as BackgroundTypes } from "./chunk-CrbgZRtX.js";
import { i as HighlightTypes } from "./chunk-mKTEiqNQ.js";
import { l as ViewportTypes } from "./chunk-BKd7G5t3.js";
import React, { ComponentProps } from "react";
import { StorybookTypes } from "storybook/internal/types";
import { BoundFunctions, queries } from "@testing-library/dom";
import { userEvent } from "@testing-library/user-event";

//#region node_modules/type-fest/source/union-to-intersection.d.ts
/**
Convert a union type to an intersection type.

Inspired by [this Stack Overflow answer](https://stackoverflow.com/a/50375286/2172153).

@example
```
import type {UnionToIntersection} from 'type-fest';

type Union = {the(): void} | {great(arg: string): void} | {escape: boolean};

type Intersection = UnionToIntersection<Union>;
//=> {the(): void} & {great(arg: string): void} & {escape: boolean}
```

@category Type
*/
type UnionToIntersection<Union> = (// `extends unknown` is always going to be the case and is used to convert the
// `Union` into a [distributive conditional
// type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types).
Union extends unknown // The union type is used as the only argument to a function since the union
// of function arguments is an intersection.
? (distributedUnion: Union) => void // This won't happen.
: never // Infer the `Intersection` type since TypeScript represents the positional
// arguments of unions of functions as an intersection of the union.
) extends ((mergedIntersection: infer Intersection) => void) // The `& Union` is to ensure result of `UnionToIntersection<A | B>` is always assignable to `A | B`
? Intersection & Union : never;
//#endregion
//#region node_modules/type-fest/source/simplify.d.ts
/**
Useful to flatten the type output to improve type hints shown in editors. And also to transform an interface into a type to aide with assignability.

@example
```
import type {Simplify} from 'type-fest';

type PositionProps = {
	top: number;
	left: number;
};

type SizeProps = {
	width: number;
	height: number;
};

// In your editor, hovering over `Props` will show a flattened object with all the properties.
type Props = Simplify<PositionProps & SizeProps>;
```

Sometimes it is desired to pass a value as a function argument that has a different type. At first inspection it may seem assignable, and then you discover it is not because the `value`'s type definition was defined as an interface. In the following example, `fn` requires an argument of type `Record<string, unknown>`. If the value is defined as a literal, then it is assignable. And if the `value` is defined as type using the `Simplify` utility the value is assignable.  But if the `value` is defined as an interface, it is not assignable because the interface is not sealed and elsewhere a non-string property could be added to the interface.

If the type definition must be an interface (perhaps it was defined in a third-party npm package), then the `value` can be defined as `const value: Simplify<SomeInterface> = ...`. Then `value` will be assignable to the `fn` argument.  Or the `value` can be cast as `Simplify<SomeInterface>` if you can't re-declare the `value`.

@example
```
import type {Simplify} from 'type-fest';

interface SomeInterface {
	foo: number;
	bar?: string;
	baz: number | undefined;
}

type SomeType = {
	foo: number;
	bar?: string;
	baz: number | undefined;
};

const literal = {foo: 123, bar: 'hello', baz: 456};
const someType: SomeType = literal;
const someInterface: SomeInterface = literal;

declare function fn(object: Record<string, unknown>): void;

fn(literal); // Good: literal object type is sealed
fn(someType); // Good: type is sealed
// @ts-expect-error
fn(someInterface); // Error: Index signature for type 'string' is missing in type 'someInterface'. Because `interface` can be re-opened
fn(someInterface as Simplify<SomeInterface>); // Good: transform an `interface` into a `type`
```

@link https://github.com/microsoft/TypeScript/issues/15300
@see {@link SimplifyDeep}
@category Object
*/
type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};
//#endregion
//#region node_modules/type-fest/source/omit-index-signature.d.ts
/**
Omit any index signatures from the given object type, leaving only explicitly defined properties.

This is the counterpart of `PickIndexSignature`.

Use-cases:
- Remove overly permissive signatures from third-party types.

This type was taken from this [StackOverflow answer](https://stackoverflow.com/a/68261113/420747).

It relies on the fact that an empty object (`{}`) is assignable to an object with just an index signature, like `Record<string, unknown>`, but not to an object with explicitly defined keys, like `Record<'foo' | 'bar', unknown>`.

(The actual value type, `unknown`, is irrelevant and could be any type. Only the key type matters.)

```
const indexed: Record<string, unknown> = {}; // Allowed

// @ts-expect-error
const keyed: Record<'foo', unknown> = {}; // Error
// TS2739: Type '{}' is missing the following properties from type 'Record<"foo" | "bar", unknown>': foo, bar
```

Instead of causing a type error like the above, you can also use a [conditional type](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) to test whether a type is assignable to another:

```
type Indexed = {} extends Record<string, unknown>
	? '✅ `{}` is assignable to `Record<string, unknown>`'
	: '❌ `{}` is NOT assignable to `Record<string, unknown>`';

type IndexedResult = Indexed;
//=> '✅ `{}` is assignable to `Record<string, unknown>`'

type Keyed = {} extends Record<'foo' | 'bar', unknown>
	? '✅ `{}` is assignable to `Record<\'foo\' | \'bar\', unknown>`'
	: '❌ `{}` is NOT assignable to `Record<\'foo\' | \'bar\', unknown>`';

type KeyedResult = Keyed;
//=> '❌ `{}` is NOT assignable to `Record<\'foo\' | \'bar\', unknown>`'
```

Using a [mapped type](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#further-exploration), you can then check for each `KeyType` of `ObjectType`...

```
type OmitIndexSignature<ObjectType> = {
	[KeyType in keyof ObjectType // Map each key of `ObjectType`...
	]: ObjectType[KeyType]; // ...to its original value, i.e. `OmitIndexSignature<Foo> == Foo`.
};
```

...whether an empty object (`{}`) would be assignable to an object with that `KeyType` (`Record<KeyType, unknown>`)...

```
type OmitIndexSignature<ObjectType> = {
	[KeyType in keyof ObjectType
	// Is `{}` assignable to `Record<KeyType, unknown>`?
	as {} extends Record<KeyType, unknown>
		? never // ✅ `{}` is assignable to `Record<KeyType, unknown>`
		: KeyType // ❌ `{}` is NOT assignable to `Record<KeyType, unknown>`
	]: ObjectType[KeyType];
};
```

If `{}` is assignable, it means that `KeyType` is an index signature and we want to remove it. If it is not assignable, `KeyType` is a "real" key and we want to keep it.

@example
```
import type {OmitIndexSignature} from 'type-fest';

type Example = {
	// These index signatures will be removed.
	[x: string]: any;
	[x: number]: any;
	[x: symbol]: any;
	[x: `head-${string}`]: string;
	[x: `${string}-tail`]: string;
	[x: `head-${string}-tail`]: string;
	[x: `${bigint}`]: string;
	[x: `embedded-${number}`]: string;

	// These explicitly defined keys will remain.
	foo: 'bar';
	qux?: 'baz';
};

type ExampleWithoutIndexSignatures = OmitIndexSignature<Example>;
//=> {foo: 'bar'; qux?: 'baz'}
```

@see {@link PickIndexSignature}
@category Object
*/
type OmitIndexSignature<ObjectType> = { [KeyType in keyof ObjectType as {} extends Record<KeyType, unknown> ? never : KeyType]: ObjectType[KeyType] };
//#endregion
//#region code/core/.dts-emit/code/core/src/components/components/icon/icon.d.ts
type IconType = keyof typeof icons;
declare const Svg: StyledComponent<{
  theme?: import("storybook/theming").Theme;
  as?: React.ElementType;
}, React.SVGProps<SVGSVGElement>, {}>;
interface IconsProps extends ComponentProps<typeof Svg> {
  icon: IconType;
  useSymbol?: boolean;
  onClick?: () => void;
  __suppressDeprecationWarning?: boolean;
}
declare const icons: {
  readonly user: 'UserIcon';
  readonly useralt: 'UserAltIcon';
  readonly useradd: 'UserAddIcon';
  readonly users: 'UsersIcon';
  readonly profile: 'ProfileIcon';
  readonly facehappy: 'FaceHappyIcon';
  readonly faceneutral: 'FaceNeutralIcon';
  readonly facesad: 'FaceSadIcon';
  readonly accessibility: 'AccessibilityIcon';
  readonly accessibilityalt: 'AccessibilityAltIcon';
  readonly arrowup: 'ChevronUpIcon';
  readonly arrowdown: 'ChevronDownIcon';
  readonly arrowleft: 'ChevronLeftIcon';
  readonly arrowright: 'ChevronRightIcon';
  readonly arrowupalt: 'ArrowUpIcon';
  readonly arrowdownalt: 'ArrowDownIcon';
  readonly arrowleftalt: 'ArrowLeftIcon';
  readonly arrowrightalt: 'ArrowRightIcon';
  readonly expandalt: 'ExpandAltIcon';
  readonly collapse: 'CollapseIcon';
  readonly expand: 'ExpandIcon';
  readonly unfold: 'UnfoldIcon';
  readonly transfer: 'TransferIcon';
  readonly redirect: 'RedirectIcon';
  readonly undo: 'UndoIcon';
  readonly reply: 'ReplyIcon';
  readonly sync: 'SyncIcon';
  readonly upload: 'UploadIcon';
  readonly download: 'DownloadIcon';
  readonly back: 'BackIcon';
  readonly proceed: 'ProceedIcon';
  readonly refresh: 'RefreshIcon';
  readonly globe: 'GlobeIcon';
  readonly compass: 'CompassIcon';
  readonly location: 'LocationIcon';
  readonly pin: 'PinIcon';
  readonly time: 'TimeIcon';
  readonly dashboard: 'DashboardIcon';
  readonly timer: 'TimerIcon';
  readonly home: 'HomeIcon';
  readonly admin: 'AdminIcon';
  readonly info: 'InfoIcon';
  readonly question: 'QuestionIcon';
  readonly support: 'SupportIcon';
  readonly alert: 'AlertIcon';
  readonly email: 'EmailIcon';
  readonly phone: 'PhoneIcon';
  readonly link: 'LinkIcon';
  readonly unlink: 'LinkBrokenIcon';
  readonly bell: 'BellIcon';
  readonly rss: 'RSSIcon';
  readonly sharealt: 'ShareAltIcon';
  readonly share: 'ShareIcon';
  readonly circle: 'CircleIcon';
  readonly circlehollow: 'CircleHollowIcon';
  readonly bookmarkhollow: 'BookmarkHollowIcon';
  readonly bookmark: 'BookmarkIcon';
  readonly hearthollow: 'HeartHollowIcon';
  readonly heart: 'HeartIcon';
  readonly starhollow: 'StarHollowIcon';
  readonly star: 'StarIcon';
  readonly certificate: 'CertificateIcon';
  readonly verified: 'VerifiedIcon';
  readonly thumbsup: 'ThumbsUpIcon';
  readonly shield: 'ShieldIcon';
  readonly basket: 'BasketIcon';
  readonly beaker: 'BeakerIcon';
  readonly hourglass: 'HourglassIcon';
  readonly flag: 'FlagIcon';
  readonly cloudhollow: 'CloudHollowIcon';
  readonly edit: 'EditIcon';
  readonly cog: 'CogIcon';
  readonly nut: 'NutIcon';
  readonly wrench: 'WrenchIcon';
  readonly ellipsis: 'EllipsisIcon';
  readonly check: 'CheckIcon';
  readonly form: 'FormIcon';
  readonly batchdeny: 'BatchDenyIcon';
  readonly batchaccept: 'BatchAcceptIcon';
  readonly controls: 'ControlsIcon';
  readonly plus: 'PlusIcon';
  readonly closeAlt: 'CloseAltIcon';
  readonly cross: 'CrossIcon';
  readonly trash: 'TrashIcon';
  readonly pinalt: 'PinAltIcon';
  readonly unpin: 'UnpinIcon';
  readonly add: 'AddIcon';
  readonly subtract: 'SubtractIcon';
  readonly close: 'CloseIcon';
  readonly delete: 'DeleteIcon';
  readonly passed: 'PassedIcon';
  readonly changed: 'ChangedIcon';
  readonly failed: 'FailedIcon';
  readonly clear: 'ClearIcon';
  readonly comment: 'CommentIcon';
  readonly commentadd: 'CommentAddIcon';
  readonly requestchange: 'RequestChangeIcon';
  readonly comments: 'CommentsIcon';
  readonly lock: 'LockIcon';
  readonly unlock: 'UnlockIcon';
  readonly key: 'KeyIcon';
  readonly outbox: 'OutboxIcon';
  readonly credit: 'CreditIcon';
  readonly button: 'ButtonIcon';
  readonly type: 'TypeIcon';
  readonly pointerdefault: 'PointerDefaultIcon';
  readonly pointerhand: 'PointerHandIcon';
  readonly browser: 'BrowserIcon';
  readonly tablet: 'TabletIcon';
  readonly mobile: 'MobileIcon';
  readonly watch: 'WatchIcon';
  readonly sidebar: 'SidebarIcon';
  readonly sidebaralt: 'SidebarAltIcon';
  readonly sidebaralttoggle: 'SidebarAltToggleIcon';
  readonly sidebartoggle: 'SidebarToggleIcon';
  readonly bottombar: 'BottomBarIcon';
  readonly bottombartoggle: 'BottomBarToggleIcon';
  readonly cpu: 'CPUIcon';
  readonly database: 'DatabaseIcon';
  readonly memory: 'MemoryIcon';
  readonly structure: 'StructureIcon';
  readonly box: 'BoxIcon';
  readonly power: 'PowerIcon';
  readonly photo: 'PhotoIcon';
  readonly component: 'ComponentIcon';
  readonly grid: 'GridIcon';
  readonly outline: 'OutlineIcon';
  readonly photodrag: 'PhotoDragIcon';
  readonly search: 'SearchIcon';
  readonly zoom: 'ZoomIcon';
  readonly zoomout: 'ZoomOutIcon';
  readonly zoomreset: 'ZoomResetIcon';
  readonly eye: 'EyeIcon';
  readonly eyeclose: 'EyeCloseIcon';
  readonly lightning: 'LightningIcon';
  readonly lightningoff: 'LightningOffIcon';
  readonly contrast: 'ContrastIcon';
  readonly switchalt: 'SwitchAltIcon';
  readonly mirror: 'MirrorIcon';
  readonly grow: 'GrowIcon';
  readonly paintbrush: 'PaintBrushIcon';
  readonly ruler: 'RulerIcon';
  readonly stop: 'StopIcon';
  readonly camera: 'CameraIcon';
  readonly video: 'VideoIcon';
  readonly speaker: 'SpeakerIcon';
  readonly play: 'PlayIcon';
  readonly playback: 'PlayBackIcon';
  readonly playnext: 'PlayNextIcon';
  readonly rewind: 'RewindIcon';
  readonly fastforward: 'FastForwardIcon';
  readonly stopalt: 'StopAltIcon';
  readonly sidebyside: 'SideBySideIcon';
  readonly stacked: 'StackedIcon';
  readonly sun: 'SunIcon';
  readonly moon: 'MoonIcon';
  readonly book: 'BookIcon';
  readonly document: 'DocumentIcon';
  readonly copy: 'CopyIcon';
  readonly category: 'CategoryIcon';
  readonly folder: 'FolderIcon';
  readonly print: 'PrintIcon';
  readonly graphline: 'GraphLineIcon';
  readonly calendar: 'CalendarIcon';
  readonly graphbar: 'GraphBarIcon';
  readonly menu: 'MenuIcon';
  readonly menualt: 'MenuIcon';
  readonly filter: 'FilterIcon';
  readonly docchart: 'DocChartIcon';
  readonly doclist: 'DocListIcon';
  readonly markup: 'MarkupIcon';
  readonly bold: 'BoldIcon';
  readonly paperclip: 'PaperClipIcon';
  readonly listordered: 'ListOrderedIcon';
  readonly listunordered: 'ListUnorderedIcon';
  readonly paragraph: 'ParagraphIcon';
  readonly markdown: 'MarkdownIcon';
  readonly repository: 'RepoIcon';
  readonly commit: 'CommitIcon';
  readonly branch: 'BranchIcon';
  readonly pullrequest: 'PullRequestIcon';
  readonly merge: 'MergeIcon';
  readonly apple: 'AppleIcon';
  readonly linux: 'LinuxIcon';
  readonly ubuntu: 'UbuntuIcon';
  readonly windows: 'WindowsIcon';
  readonly storybook: 'StorybookIcon';
  readonly azuredevops: 'AzureDevOpsIcon';
  readonly bitbucket: 'BitbucketIcon';
  readonly chrome: 'ChromeIcon';
  readonly chromatic: 'ChromaticIcon';
  readonly componentdriven: 'ComponentDrivenIcon';
  readonly discord: 'DiscordIcon';
  readonly facebook: 'FacebookIcon';
  readonly figma: 'FigmaIcon';
  readonly gdrive: 'GDriveIcon';
  readonly github: 'GithubIcon';
  readonly gitlab: 'GitlabIcon';
  readonly google: 'GoogleIcon';
  readonly graphql: 'GraphqlIcon';
  readonly medium: 'MediumIcon';
  readonly redux: 'ReduxIcon';
  readonly twitter: 'TwitterIcon';
  readonly youtube: 'YoutubeIcon';
  readonly vscode: 'VSCodeIcon';
};
//#endregion
//#region code/core/.dts-emit/code/core/src/toolbar/types.d.ts
type ToolbarShortcutType = 'next' | 'previous' | 'reset';
type ToolbarItemType = 'item' | 'reset';
interface ToolbarShortcutConfig {
  label: string;
  keys: string[];
}
type ToolbarShortcuts = Record<ToolbarShortcutType, ToolbarShortcutConfig>;
interface ToolbarItem {
  value?: string;
  icon?: IconsProps['icon'];
  right?: string;
  title?: string;
  hideIcon?: boolean;
  type?: ToolbarItemType;
}
interface NormalizedToolbarConfig {
  /** The label to show for this toolbar item */
  title?: string;
  /** Choose an icon to show for this toolbar item */
  icon?: IconsProps['icon'];
  /** Set to true to prevent default update of icon to match any present selected items icon */
  preventDynamicIcon?: boolean;
  items: ToolbarItem[];
  shortcuts?: ToolbarShortcuts;
  /** Change title based on selected value */
  dynamicTitle?: boolean;
}
type ToolbarConfig = Omit<NormalizedToolbarConfig, 'items'> & {
  items: (string | ToolbarItem)[];
};
type ToolbarArgType = {
  name?: string;
  description?: string;
  defaultValue?: any;
  toolbar?: ToolbarConfig;
  /**
   * @deprecated This loose index signature has been added for compatibility with InputType, and
   *   will be removed in Storybook 11
   */
  [key: string]: any;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/csf/SBType.d.ts
interface SBBaseType {
  required?: boolean;
  raw?: string;
}
type SBScalarType = SBBaseType & {
  name: 'boolean' | 'string' | 'number' | 'function' | 'symbol' | 'date';
};
type SBArrayType = SBBaseType & {
  name: 'array';
  value: SBType;
};
type SBNodeType = SBBaseType & {
  name: 'node';
  renderer: string;
};
type SBObjectType = SBBaseType & {
  name: 'object';
  value: Record<string, SBType>;
};
type SBEnumType = SBBaseType & {
  name: 'enum';
  value: (string | number)[];
};
type SBIntersectionType = SBBaseType & {
  name: 'intersection';
  value: SBType[];
};
type SBUnionType = SBBaseType & {
  name: 'union';
  value: SBType[];
};
type SBLiteralType = SBBaseType & {
  name: 'literal';
  value: unknown;
};
type SBTupleType = SBBaseType & {
  name: 'tuple';
  value: SBType[];
};
type SBOtherType = SBBaseType & {
  name: 'other';
  value: string;
};
type SBType = SBScalarType | SBEnumType | SBArrayType | SBNodeType | SBObjectType | SBIntersectionType | SBUnionType | SBLiteralType | SBTupleType | SBOtherType;
//#endregion
//#region code/core/.dts-emit/code/core/src/actions/types.d.ts
interface ActionsParameters {
  /**
   * Actions configuration
   *
   * @see https://storybook.js.org/docs/essentials/actions#parameters
   */
  actions?: {
    /**
     * Create actions for each arg that matches the regex. (**NOT recommended, see below**)
     *
     * This is quite useful when your component has dozens (or hundreds) of methods and you do not
     * want to manually apply the fn utility for each of those methods. However, this is not the
     * recommended way of writing actions. That's because automatically inferred args are not
     * available as spies in your play function. If you use argTypesRegex and your stories have play
     * functions, you will need to also define args with the fn utility to test them in your play
     * function.
     *
     * @example `argTypesRegex: '^on.*'`
     */
    argTypesRegex?: string;
    /**
     * Removes the addon panel and turns off the feature's behavior. If you wish to turn off this
     * feature for the entire Storybook, you can set the option in your `main.js|ts` configuration
     * file.
     *
     * @see https://storybook.js.org/docs/essentials/actions#disable
     */
    disable?: boolean;
    /**
     * Binds a standard HTML event handler to the outermost HTML element rendered by your component
     * and triggers an action when the event is called for a given selector. The format is
     * `<eventname> <selector>`. The selector is optional; it defaults to all elements.
     *
     * **To enable this feature, you must use the `withActions` decorator.**
     *
     * @example `handles: ['mouseover', 'click .btn']`
     */
    handles?: string[];
    /**
     * An integer specifying to which level the tree should be initially expanded.
     *
     * @default 1
     */
    expandLevel?: number;
  };
}
interface ActionsTypes {
  parameters: ActionsParameters;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/controls/types.d.ts
interface ControlsParameters {
  /**
   * Controls configuration
   *
   * @see https://storybook.js.org/docs/essentials/controls#parameters-1
   */
  controls?: {
    /**
     * Removes the addon panel and turns off the feature's behavior. If you wish to turn off this
     * feature for the entire Storybook, you can set the option in your `main.js|ts` configuration
     * file.
     *
     * @see https://storybook.js.org/docs/essentials/controls#disable
     */
    disable?: boolean; /** Disable the ability to create or edit stories from the Controls panel */
    disableSaveFromUI?: boolean; /** Exclude specific properties from the Controls panel */
    exclude?: string[] | RegExp;
    /**
     * Show the full documentation for each property in the Controls addon panel, including the
     * description and default value.
     */
    expanded?: boolean; /** Exclude only specific properties in the Controls panel */
    include?: string[] | RegExp;
    /**
     * Custom control type matchers
     *
     * @see https://storybook.js.org/docs/essentials/controls#custom-control-type-matchers
     */
    matchers?: {
      date?: RegExp;
      color?: RegExp;
    };
    /**
     * Preset color swatches for the color picker control
     *
     * @example PresetColors: [{ color: '#ff4785', title: 'Coral' }, 'rgba(0, 159, 183, 1)',
     * '#fe4a49']
     */
    presetColors?: Array<string | {
      color: string;
      title?: string;
    }>; /** Controls sorting order */
    sort?: 'none' | 'alpha' | 'requiredFirst';
  };
}
interface ControlsTypes {
  parameters: ControlsParameters;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/measure/types.d.ts
interface MeasureParameters {
  /**
   * Measure configuration
   *
   * @see https://storybook.js.org/docs/essentials/measure-and-outline#parameters
   */
  measure?: {
    /**
     * Removes the tool and disables the feature's behavior. If you wish to turn off this feature
     * for the entire Storybook, you can set the option in your `main.js|ts` configuration file.
     *
     * @see https://storybook.js.org/docs/essentials/measure-and-outline#disable
     */
    disable?: boolean;
  };
}
interface MeasureTypes {
  parameters: MeasureParameters;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/outline/types.d.ts
interface OutlineParameters {
  /**
   * Outline configuration
   *
   * @see https://storybook.js.org/docs/essentials/measure-and-outline#parameters
   */
  outline?: {
    /**
     * Removes the tool and disables the feature's behavior. If you wish to turn off this feature
     * for the entire Storybook, you can set the option in your `main.js|ts` configuration file.
     *
     * @see https://storybook.js.org/docs/essentials/measure-and-outline#disable
     */
    disable?: boolean;
  };
}
interface OutlineTypes {
  parameters: OutlineParameters;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/test/preview.d.ts
interface TestParameters {
  test?: {
    /** Ignore unhandled errors during test execution */dangerouslyIgnoreUnhandledErrors?: boolean; /** Whether to throw exceptions coming from the play function */
    throwPlayFunctionExceptions?: boolean;
  };
}
interface TestTypes {
  parameters: TestParameters;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/csf/core-annotations.d.ts
type CoreTypes = StorybookTypes & ActionsTypes & BackgroundTypes & ControlsTypes & HighlightTypes & MeasureTypes & OutlineTypes & TestTypes & ViewportTypes;
/** Flag a project-annotations object as already containing the core annotations. */
declare function markAsComposedWithCoreAnnotations<T extends object>(annotations: T): T;
/** Whether a project-annotations object already contains the core annotations. */
declare function hasCoreAnnotations(annotations: unknown): boolean;
declare function getCoreAnnotations(): any[];
//#endregion
//#region code/core/.dts-emit/code/core/src/csf/story.d.ts
type StoryId$1 = string;
type ComponentId = string;
type ComponentTitle$1 = string;
type StoryName$1 = string;
/** @deprecated */
type StoryKind = ComponentTitle$1;
type Tag$1 = string;
interface StoryIdentifier {
  componentId: ComponentId;
  title: ComponentTitle$1;
  /** @deprecated */
  kind: ComponentTitle$1;
  id: StoryId$1;
  name: StoryName$1;
  /** @deprecated */
  story: StoryName$1;
  tags: Tag$1[];
}
interface Parameters$1 {
  [name: string]: any;
}
interface StrictParameters {
  [name: string]: unknown;
}
type ControlType = 'object' | 'boolean' | 'check' | 'inline-check' | 'radio' | 'inline-radio' | 'select' | 'multi-select' | 'number' | 'range' | 'file' | 'color' | 'date' | 'text';
type ConditionalTest = {
  truthy?: boolean;
} | {
  exists: boolean;
} | {
  eq: any;
} | {
  neq: any;
};
type ConditionalValue = {
  arg: string;
} | {
  global: string;
};
type Conditional = ConditionalValue & ConditionalTest;
interface ControlBase {
  [key: string]: any;
  /** @see https://storybook.js.org/docs/api/arg-types#controltype */
  type?: ControlType;
  disable?: boolean;
}
interface Report {
  type: string;
  version?: number;
  result: unknown;
  status: 'failed' | 'passed' | 'warning';
}
interface ReportingAPI {
  reports: Report[];
  addReport: (report: Report) => void;
}
type Control = ControlType | false | (ControlBase & (ControlBase | {
  type: 'color'; /** @see https://storybook.js.org/docs/api/arg-types#controlpresetcolors */
  presetColors?: string[];
} | {
  type: 'file'; /** @see https://storybook.js.org/docs/api/arg-types#controlaccept */
  accept?: string;
} | {
  type: 'inline-check' | 'radio' | 'inline-radio' | 'select' | 'multi-select'; /** @see https://storybook.js.org/docs/api/arg-types#controllabels */
  labels?: {
    [options: string]: string;
  };
} | {
  type: 'number' | 'range'; /** @see https://storybook.js.org/docs/api/arg-types#controlmax */
  max?: number; /** @see https://storybook.js.org/docs/api/arg-types#controlmin */
  min?: number; /** @see https://storybook.js.org/docs/api/arg-types#controlstep */
  step?: number;
}));
interface InputType {
  /** @see https://storybook.js.org/docs/api/arg-types#control */
  control?: Control;
  /** @see https://storybook.js.org/docs/api/arg-types#description */
  description?: string;
  /** @see https://storybook.js.org/docs/api/arg-types#if */
  if?: Conditional;
  /** @see https://storybook.js.org/docs/api/arg-types#mapping */
  mapping?: {
    [key: string]: any;
  };
  /** @see https://storybook.js.org/docs/api/arg-types#name */
  name?: string;
  /** @see https://storybook.js.org/docs/api/arg-types#options */
  options?: readonly any[];
  /** @see https://storybook.js.org/docs/api/arg-types#table */
  table?: {
    [key: string]: unknown; /** @see https://storybook.js.org/docs/api/arg-types#tablecategory */
    category?: string; /** @see https://storybook.js.org/docs/api/arg-types#tabledefaultvalue */
    defaultValue?: {
      summary?: string | undefined;
      detail?: string | undefined;
    }; /** @see https://storybook.js.org/docs/api/arg-types#tabledisable */
    disable?: boolean; /** @see https://storybook.js.org/docs/api/arg-types#tablesubcategory */
    subcategory?: string; /** @see https://storybook.js.org/docs/api/arg-types#tabletype */
    type?: {
      summary?: string | undefined;
      detail?: string | undefined;
    };
  };
  /** @see https://storybook.js.org/docs/api/arg-types#type */
  type?: SBType | SBScalarType['name'];
  /**
   * @deprecated Use `table.defaultValue.summary` instead.
   * @see https://storybook.js.org/docs/api/arg-types#defaultvalue
   */
  defaultValue?: any;
  [key: string]: any;
}
interface StrictInputType extends InputType {
  name: string;
  type?: SBType;
}
interface Args$1 {
  [name: string]: any;
}
interface StrictArgs {
  [name: string]: unknown;
}
/** @see https://storybook.js.org/docs/api/arg-types#argtypes */
type ArgTypes$1<TArgs = Args$1> = { [name in keyof TArgs]: InputType };
type StrictArgTypes$1<TArgs = Args$1> = { [name in keyof TArgs]: StrictInputType };
interface Globals$1 {
  [name: string]: any;
}
interface GlobalTypes$1 {
  [name: string]: ToolbarArgType;
}
/**
 * AddonTypes allows addons to extend the type system with additional args, parameters, and globals.
 *
 * Addons can use `definePreviewAddon<AddonTypes>()` to declare additional types that will be merged
 * into the story context. For example, an addon that provides a `theme` arg could declare:
 *
 * ```ts
 * const themeAddon = definePreviewAddon<{ args: { theme: 'light' | 'dark' } }>({
 *   decorators: [(Story, { args }) => <ThemeProvider theme={args.theme}><Story /></ThemeProvider>]
 * });
 * ```
 *
 * When users include this addon in their preview config, the `theme` arg becomes available and
 * type-checked across all stories.
 */
interface AddonTypes {
  tags?: Tag$1[] | undefined;
  args?: unknown;
  parameters?: Record<string, any>;
  globals?: Record<string, any>;
}
interface Renderer$1 extends AddonTypes {
  /** What is the type of the `component` annotation in this renderer? */
  component: any;
  /** What does the story function return in this renderer? */
  storyResult: any;
  /** What type of element does this renderer render to? */
  canvasElement: any;
  mount(): Promise<Canvas>;
  T?: unknown;
  args: unknown;
  csf4: boolean;
}
/** @deprecated - Use `Renderer` */
type AnyFramework = Renderer$1;
interface StoryContextForEnhancers$1<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> extends StoryIdentifier {
  component?: (TRenderer & {
    T: any;
  })['component'];
  subcomponents?: Record<string, (TRenderer & {
    T: any;
  })['component']>;
  parameters: Parameters$1;
  initialArgs: TArgs;
  argTypes: StrictArgTypes$1<TArgs>;
}
type ArgsEnhancer<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> = (context: StoryContextForEnhancers$1<TRenderer, TArgs>) => TArgs;
type ArgTypesEnhancer<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> = ((context: StoryContextForEnhancers$1<TRenderer, TArgs>) => StrictArgTypes$1<TArgs>) & {
  secondPass?: boolean;
};
interface StoryContextUpdate$1<TArgs = Args$1> {
  args?: TArgs;
  globals?: Globals$1;
  [key: string]: any;
}
type ViewMode$1 = 'story' | 'docs';
type LoaderFunction<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> = (context: StoryContextForLoaders<TRenderer, TArgs>) => Promise<Record<string, any> | void> | Record<string, any> | void;
type Awaitable<T> = T | PromiseLike<T>;
type CleanupCallback = () => Awaitable<unknown>;
type BeforeAll = () => Awaitable<CleanupCallback | void>;
type BeforeEach<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> = (context: StoryContext$1<TRenderer, TArgs>) => Awaitable<CleanupCallback | void>;
type AfterEach<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> = (context: StoryContext$1<TRenderer, TArgs>) => Awaitable<void>;
interface Canvas extends BoundFunctions<typeof queries> {}
interface StoryContext$1<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> extends StoryContextForEnhancers$1<TRenderer, TArgs>, Required<StoryContextUpdate$1<TArgs>> {
  loaded: Record<string, any>;
  abortSignal: AbortSignal;
  canvasElement: TRenderer['canvasElement'];
  hooks: unknown;
  originalStoryFn: ArgsStoryFn<TRenderer>;
  viewMode: ViewMode$1;
  step: StepFunction<TRenderer, TArgs>;
  context: this;
  canvas: Canvas;
  userEvent: ReturnType<typeof userEvent.setup>;
  mount: TRenderer['mount'];
  reporting: ReportingAPI;
}
/** @deprecated Use {@link StoryContext} instead. */
interface StoryContextForLoaders<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> extends StoryContext$1<TRenderer, TArgs> {}
/** @deprecated Use {@link StoryContext} instead. */
interface PlayFunctionContext<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> extends StoryContext$1<TRenderer, TArgs> {}
type StepLabel = string;
type StepFunction<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> = (label: StepLabel, play: PlayFunction<TRenderer, TArgs>) => Promise<void> | void;
type PlayFunction<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> = (context: PlayFunctionContext<TRenderer, TArgs>) => Promise<void> | void;
type TestFunction$1<TRenderer extends Renderer$1 = Renderer$1, TArgs = TRenderer['args']> = (context: StoryContext$1<TRenderer, TArgs>) => Promise<void> | void;
type PartialStoryFn$1<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> = (update?: StoryContextUpdate$1<Partial<TArgs>>) => TRenderer['storyResult'];
type LegacyStoryFn$1<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> = (context: StoryContext$1<TRenderer, TArgs>) => TRenderer['storyResult'];
type ArgsStoryFn<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> = (args: TArgs, context: StoryContext$1<TRenderer, TArgs>) => (TRenderer & {
  T: TArgs;
})['storyResult'];
type StoryFn<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> = LegacyStoryFn$1<TRenderer, TArgs> | ArgsStoryFn<TRenderer, TArgs>;
type DecoratorFunction$1<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> = (fn: PartialStoryFn$1<TRenderer, TArgs>, c: StoryContext$1<TRenderer, TArgs>) => TRenderer['storyResult'];
type DecoratorApplicator$1<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> = (storyFn: LegacyStoryFn$1<TRenderer, TArgs>, decorators: DecoratorFunction$1<TRenderer, TArgs>[]) => LegacyStoryFn$1<TRenderer, TArgs>;
type StepRunner$1<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> = (label: StepLabel, play: PlayFunction<TRenderer, TArgs>, context: StoryContext$1<TRenderer, TArgs>) => Promise<void>;
interface BaseAnnotations<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> {
  /**
   * Wrapper components or Storybook decorators that wrap a story.
   *
   * Decorators defined in Meta will be applied to every story variation.
   *
   * @see [Decorators](https://storybook.js.org/docs/writing-stories/decorators)
   */
  decorators?: DecoratorFunction$1<TRenderer, Simplify<TArgs>>[] | DecoratorFunction$1<TRenderer, Simplify<TArgs>>;
  /**
   * Custom metadata for a story.
   *
   * @see [Parameters](https://storybook.js.org/docs/writing-stories/parameters)
   */
  parameters?: Parameters$1 & (TRenderer['csf4'] extends true ? CoreTypes['parameters'] & TRenderer['parameters'] : unknown);
  /**
   * Dynamic data that are provided (and possibly updated by) Storybook and its addons.
   *
   * @see [Args](https://storybook.js.org/docs/writing-stories/args)
   */
  args?: Partial<TArgs>;
  /**
   * ArgTypes encode basic metadata for args, such as `name`, `description`, `defaultValue` for an
   * arg. These get automatically filled in by Storybook Docs.
   *
   * @see [ArgTypes](https://storybook.js.org/docs/api/arg-types)
   */
  argTypes?: Partial<ArgTypes$1<TArgs>>;
  /**
   * Asynchronous functions which provide data for a story.
   *
   * @see [Loaders](https://storybook.js.org/docs/writing-stories/loaders)
   */
  loaders?: LoaderFunction<TRenderer, TArgs>[] | LoaderFunction<TRenderer, TArgs>;
  /**
   * Function to be called before each story. When the function is async, it will be awaited.
   *
   * `beforeEach` can be added to preview, the default export and to a specific story. They are run
   * (and awaited) in the order: preview, default export, story
   *
   * A cleanup function can be returned.
   */
  beforeEach?: BeforeEach<TRenderer, TArgs>[] | BeforeEach<TRenderer, TArgs>;
  /**
   * Function to be called after each play function for post-test assertions. Don't use this
   * function for cleaning up state. You can use the return callback of `beforeEach` for that, which
   * is run when switching stories. When the function is async, it will be awaited.
   *
   * `afterEach` can be added to preview, the default export and to a specific story. They are run
   * (and awaited) reverse order: preview, default export, story
   */
  afterEach?: AfterEach<TRenderer, TArgs>[] | AfterEach<TRenderer, TArgs>;
  /**
   * Define a custom render function for the story(ies). If not passed, a default render function by
   * the renderer will be used.
   */
  render?: ArgsStoryFn<TRenderer, TArgs>;
  /** Named tags for a story, used to filter stories in different contexts. */
  tags?: (TRenderer['tags'] extends Tag$1[] ? TRenderer['tags'] : Tag$1[]) | undefined;
  mount?: (context: StoryContext$1<TRenderer, TArgs>) => TRenderer['mount'];
}
interface ProjectAnnotations$1<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> extends BaseAnnotations<TRenderer, TArgs> {
  argsEnhancers?: ArgsEnhancer<TRenderer, Args$1>[];
  argTypesEnhancers?: ArgTypesEnhancer<TRenderer, Args$1>[];
  /**
   * Lifecycle hook which runs once, before any loaders, decorators or stories, and may rerun when
   * configuration changes or when reinitializing (e.g. between test runs). The function may be
   * synchronous or asynchronous, and may return a cleanup function which may also be synchronous or
   * asynchronous. The cleanup function is not guaranteed to run (e.g. when the browser closes), but
   * runs when configuration changes or when reinitializing. This hook may only be defined globally
   * (i.e. not on component or story level). When multiple hooks are specified, they are to be
   * executed sequentially (and awaited) in the following order:
   *
   * - Addon hooks (in order of addons array in e.g. .storybook/main.js)
   * - Annotation hooks (in order of previewAnnotations array in e.g. .storybook/main.js)
   * - Preview hook (via e.g. .storybook/preview.js) Cleanup functions are executed sequentially in
   *   reverse order of initialization.
   */
  beforeAll?: BeforeAll;
  initialGlobals?: Globals$1 & (TRenderer['csf4'] extends true ? CoreTypes['globals'] & TRenderer['globals'] : unknown);
  globalTypes?: GlobalTypes$1;
  applyDecorators?: DecoratorApplicator$1<TRenderer, Args$1>;
  runStep?: StepRunner$1<TRenderer, TArgs>;
}
type StoryDescriptor = string[] | RegExp;
interface ComponentAnnotations$1<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> extends BaseAnnotations<TRenderer, TArgs> {
  /**
   * Title of the component which will be presented in the navigation. **Should be unique.**
   *
   * Components can be organized in a nested structure using "/" as a separator.
   *
   * Since CSF 3.0 this property is optional -- it can be inferred from the filesystem path
   *
   * @example Export default { ... title: 'Design System/Atoms/Button' }
   *
   * @see [Story Hierarchy](https://storybook.js.org/docs/writing-stories/naming-components-and-hierarchy#structure-and-hierarchy)
   */
  title?: ComponentTitle$1;
  /**
   * Id of the component (prefix of the story id) which is used for URLs.
   *
   * By default is inferred from sanitizing the title
   *
   * @see [Permalink to stories](https://storybook.js.org/docs/configure/sidebar-and-urls#permalink-to-stories)
   */
  id?: ComponentId;
  /**
   * Used to only include certain named exports as stories. Useful when you want to have non-story
   * exports such as mock data or ignore a few stories.
   *
   * @example IncludeStories: ['SimpleStory', 'ComplexStory'] includeStories: /.*Story$/
   *
   * @see [Non-story exports](https://storybook.js.org/docs/api/csf#non-story-exports)
   */
  includeStories?: StoryDescriptor;
  /**
   * Used to exclude certain named exports. Useful when you want to have non-story exports such as
   * mock data or ignore a few stories.
   *
   * @example ExcludeStories: ['simpleData', 'complexData'] excludeStories: /.*Data$/
   *
   * @see [Non-story exports](https://storybook.js.org/docs/api/csf#non-story-exports)
   */
  excludeStories?: StoryDescriptor;
  /**
   * The primary component for your story.
   *
   * Used by addons for automatic prop table generation and display of other component metadata.
   */
  component?: (TRenderer & {
    T: Record<string, unknown> extends Required<TArgs> ? any : TArgs;
  })['component'];
  /**
   * Auxiliary subcomponents that are part of the stories.
   *
   * Used by addons for automatic prop table generation and display of other component metadata.
   *
   * @example Import { Button, ButtonGroup } from './components';
   *
   * Export default { ... subcomponents: { Button, ButtonGroup } }
   *
   * By defining them each component will have its tab in the args table.
   */
  subcomponents?: Record<string, (TRenderer & {
    T: any;
  })['component']>;
  /** Function that is executed after the story is rendered. */
  play?: PlayFunction<TRenderer, TArgs>;
  /** Override the globals values for all stories in this component */
  globals?: Partial<Globals$1 & (TRenderer['csf4'] extends true ? CoreTypes['globals'] & TRenderer['globals'] : unknown)>;
}
type StoryAnnotations$1<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1, TRequiredArgs = Partial<TArgs>> = BaseAnnotations<TRenderer, TArgs> & {
  /** Override the display name in the UI (CSF v3) */name?: StoryName$1; /** Override the display name in the UI (CSF v2) */
  storyName?: StoryName$1; /** Function that is executed after the story is rendered. */
  play?: PlayFunction<TRenderer, TArgs>; /** Override the globals values for this story */
  globals?: Partial<Globals$1 & (TRenderer['csf4'] extends true ? CoreTypes['globals'] & TRenderer['globals'] : unknown)>; /** @deprecated */
  story?: Omit<StoryAnnotations$1<TRenderer, TArgs>, 'story'>;
} & ({} extends TRequiredArgs ? {
  args?: TRequiredArgs;
} : {
  args: TRequiredArgs;
});
type LegacyAnnotatedStoryFn<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> = StoryFn<TRenderer, TArgs> & StoryAnnotations$1<TRenderer, TArgs>;
type LegacyStoryAnnotationsOrFn$1<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> = LegacyAnnotatedStoryFn<TRenderer, TArgs> | StoryAnnotations$1<TRenderer, TArgs>;
type AnnotatedStoryFn<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> = ArgsStoryFn<TRenderer, TArgs> & StoryAnnotations$1<TRenderer, TArgs>;
type StoryAnnotationsOrFn$1<TRenderer extends Renderer$1 = Renderer$1, TArgs = Args$1> = AnnotatedStoryFn<TRenderer, TArgs> | StoryAnnotations$1<TRenderer, TArgs>;
type ArgsFromMeta<TRenderer extends Renderer$1, Meta> = Meta extends {
  render?: ArgsStoryFn<TRenderer, infer RArgs>;
  loaders?: (infer Loaders)[] | (infer Loaders);
  decorators?: (infer Decorators)[] | (infer Decorators);
} ? Simplify<OmitIndexSignature<RArgs & DecoratorsArgs<TRenderer, Decorators> & LoaderArgs<TRenderer, Loaders>>> : unknown;
type DecoratorsArgs<TRenderer extends Renderer$1, Decorators> = UnionToIntersection<Decorators extends DecoratorFunction$1<TRenderer, infer TArgs> ? TArgs : unknown>;
type LoaderArgs<TRenderer extends Renderer$1, Loaders> = UnionToIntersection<Loaders extends LoaderFunction<TRenderer, infer TArgs> ? TArgs : unknown>;
//#endregion
export { Tag$1 as $, PartialStoryFn$1 as A, StoryContext$1 as B, Globals$1 as C, Simplify as Ct, LegacyStoryFn$1 as D, LegacyStoryAnnotationsOrFn$1 as E, StepFunction as F, StoryId$1 as G, StoryContextForLoaders as H, StepLabel as I, StoryName$1 as J, StoryIdentifier as K, StepRunner$1 as L, PlayFunctionContext as M, ProjectAnnotations$1 as N, LoaderFunction as O, Renderer$1 as P, StrictParameters as Q, StoryAnnotations$1 as R, GlobalTypes$1 as S, OmitIndexSignature as St, LegacyAnnotatedStoryFn as T, StoryContextUpdate$1 as U, StoryContextForEnhancers$1 as V, StoryFn as W, StrictArgs as X, StrictArgTypes$1 as Y, StrictInputType as Z, ComponentId as _, SBOtherType as _t, ArgTypes$1 as a, markAsComposedWithCoreAnnotations as at, DecoratorApplicator$1 as b, SBType as bt, ArgsEnhancer as c, MeasureTypes as ct, BaseAnnotations as d, SBArrayType as dt, TestFunction$1 as et, BeforeAll as f, SBEnumType as ft, ComponentAnnotations$1 as g, SBObjectType as gt, CleanupCallback as h, SBNodeType as ht, AnyFramework as i, hasCoreAnnotations as it, PlayFunction as j, Parameters$1 as k, ArgsFromMeta as l, ControlsTypes as lt, Canvas as m, SBLiteralType as mt, AfterEach as n, CoreTypes as nt, ArgTypesEnhancer as o, TestTypes as ot, BeforeEach as p, SBIntersectionType as pt, StoryKind as q, AnnotatedStoryFn as r, getCoreAnnotations as rt, Args$1 as s, OutlineTypes as st, AddonTypes as t, ViewMode$1 as tt, ArgsStoryFn as u, ActionsTypes as ut, ComponentTitle$1 as v, SBScalarType as vt, InputType as w, UnionToIntersection as wt, DecoratorFunction$1 as x, SBUnionType as xt, Conditional as y, SBTupleType as yt, StoryAnnotationsOrFn$1 as z };