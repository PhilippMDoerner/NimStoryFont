import { n as FrameworkOptions, r as StorybookConfig, t as AngularOptions } from "./chunk-D12NRfQ8.js";
import { AnnotatedStoryFn, ArgTypes, Args, Args as Args$1, ArgsStoryFn, ComponentAnnotations, DecoratorFunction, LoaderFunction, NamedOrDefaultProjectAnnotations, NormalizedProjectAnnotations, Parameters as Parameters$2, Parameters as Parameters$3, ProjectAnnotations, Renderer, StoryAnnotations, StoryContext as StoryContext$1, StrictArgs, StrictArgs as StrictArgs$1, WebRenderer } from "storybook/internal/types";
import * as AngularCore from "@angular/core";
import { ApplicationConfig, Provider, Type } from "@angular/core";
import { AddonTypes, InferTypes, Meta as Meta$1, Preview as Preview$1, PreviewAddon, Story } from "storybook/internal/csf";

//#region code/frameworks/angular/.dts-emit/code/frameworks/angular/src/client/types.d.ts
interface NgModuleMetadata {
  /** List of components, directives, and pipes that belong to your component. */
  declarations?: any[];
  entryComponents?: any[];
  /**
   * List of modules that should be available to the root Storybook Component and all its children.
   * If you want to register application providers or if you want to use the forRoot() pattern,
   * please use the `applicationConfig` decorator in combination with the importProvidersFrom helper
   * function from @angular/core instead.
   */
  imports?: any[];
  schemas?: any[];
  /**
   * List of providers that should be available on the root component and all its children. Use the
   * `applicationConfig` decorator to register environemt and application-wide providers.
   */
  providers?: Provider[];
}
interface ICollection {
  [p: string]: any;
}
interface StoryFnAngularReturnType {
  props?: ICollection;
  moduleMetadata?: NgModuleMetadata;
  applicationConfig?: ApplicationConfig;
  template?: string;
  styles?: string[];
  userDefinedTemplate?: boolean;
}
interface AngularRenderer extends WebRenderer {
  component: any;
  storyResult: StoryFnAngularReturnType;
}
type Parameters$1 = Parameters$3 & {
  bootstrapModuleOptions?: unknown;
};
//#endregion
//#region code/frameworks/angular/.dts-emit/code/frameworks/angular/src/client/public-types.d.ts
/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/api/csf#default-export)
 */
type Meta<TArgs = Args$1> = ComponentAnnotations<AngularRenderer, TransformComponentType<TArgs>>;
/**
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/api/csf#named-story-exports)
 */
type StoryFn<TArgs = Args$1> = AnnotatedStoryFn<AngularRenderer, TransformComponentType<TArgs>>;
/**
 * Story object that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/api/csf#named-story-exports)
 */
type StoryObj<TArgs = Args$1> = StoryAnnotations<AngularRenderer, TransformComponentType<TArgs>>;
type Decorator<TArgs = StrictArgs$1> = DecoratorFunction<AngularRenderer, TArgs>;
type Loader<TArgs = StrictArgs$1> = LoaderFunction<AngularRenderer, TArgs>;
type StoryContext<TArgs = StrictArgs$1> = StoryContext$1<AngularRenderer, TArgs>;
type Preview = ProjectAnnotations<AngularRenderer>;
/**
 * Transforms InputSignal, ModelSignal, OutputEmitterRef and EventEmitter member
 * types into the values/handlers Storybook args expect.
 *
 * Do NOT reorder: `TransformModelSignalType` must stay innermost. It synthesizes
 * the `${K}Change` output key before the outer transforms run, and because
 * `ModelSignal<T> extends InputSignal<T>` the model value field is then
 * idempotently re-collapsed by `TransformInputSignalType` to the same type.
 */
type TransformComponentType<T> = TransformInputSignalType<TransformOutputSignalType<TransformEventType<TransformModelSignalType<T>>>>;
type AngularInputSignal<T> = AngularCore.InputSignal<T>;
type AngularInputSignalWithTransform<T, U> = AngularCore.InputSignalWithTransform<T, U>;
type AngularOutputEmitterRef<T> = AngularCore.OutputEmitterRef<T>;
type AngularModelSignal<T> = AngularCore.ModelSignal<T>;
type AngularHasInputSignal = typeof AngularCore extends {
  input: infer U;
} ? true : false;
type AngularHasOutputSignal = typeof AngularCore extends {
  output: infer U;
} ? true : false;
type AngularHasModelSignal = typeof AngularCore extends {
  model: infer U;
} ? true : false;
type InputSignal<T> = AngularHasInputSignal extends true ? AngularInputSignal<T> : never;
type InputSignalWithTransform<T, U> = AngularHasInputSignal extends true ? AngularInputSignalWithTransform<T, U> : never;
type OutputEmitterRef<T> = AngularHasOutputSignal extends true ? AngularOutputEmitterRef<T> : never;
type ModelSignal<T> = AngularHasModelSignal extends true ? AngularModelSignal<T> : never;
type TransformInputSignalType<T> = { [K in keyof T]: T[K] extends InputSignal<infer E> ? E : T[K] extends InputSignalWithTransform<any, infer U> ? U : T[K] };
type TransformOutputSignalType<T> = { [K in keyof T]: T[K] extends OutputEmitterRef<infer E> ? (e: E) => void : T[K] };
type TransformModelSignalType<T> = { [K in keyof T]: T[K] extends ModelSignal<infer E> ? E : T[K] } & { [K in keyof T as T[K] extends ModelSignal<infer _E> ? `${K & string}Change` : never]: T[K] extends ModelSignal<infer E> ? (e: E) => void : never };
type TransformEventType<T> = { [K in keyof T]: T[K] extends AngularCore.EventEmitter<infer E> ? (e: E) => void : T[K] };
//#endregion
//#region code/frameworks/angular/.dts-emit/code/frameworks/angular/src/client/portable-stories.d.ts
/**
 * Function that sets the globalConfig of your storybook. The global config is the preview module of
 * your .storybook folder.
 *
 * It should be run a single time, so that your global config (e.g. decorators) is applied to your
 * stories when using `composeStories` or `composeStory`.
 *
 * Example:
 *
 * ```jsx
 * // setup-file.js
 * import { setProjectAnnotations } from '@storybook/angular';
 *
 * import projectAnnotations from './.storybook/preview';
 *
 * setProjectAnnotations(projectAnnotations);
 * ```
 *
 * @param projectAnnotations - E.g. (import projectAnnotations from '../.storybook/preview')
 */
declare function setProjectAnnotations(projectAnnotations: NamedOrDefaultProjectAnnotations<any> | NamedOrDefaultProjectAnnotations<any>[]): NormalizedProjectAnnotations<AngularRenderer>;
//#endregion
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
//#region node_modules/type-fest/source/keys-of-union.d.ts
/**
Create a union of all keys from a given type, even those exclusive to specific union members.

Unlike the native `keyof` keyword, which returns keys present in **all** union members, this type returns keys from **any** member.

@link https://stackoverflow.com/a/49402091

@example
```
import type {KeysOfUnion} from 'type-fest';

type A = {
	common: string;
	a: number;
};

type B = {
	common: string;
	b: string;
};

type C = {
	common: string;
	c: boolean;
};

type Union = A | B | C;

type CommonKeys = keyof Union;
//=> 'common'

type AllKeys = KeysOfUnion<Union>;
//=> 'common' | 'a' | 'b' | 'c'
```

@category Object
*/
type KeysOfUnion<ObjectType> = // Hack to fix https://github.com/sindresorhus/type-fest/issues/1008
keyof UnionToIntersection<ObjectType extends unknown ? Record<keyof ObjectType, never> : never>;
//#endregion
//#region node_modules/type-fest/source/is-any.d.ts
/**
Returns a boolean for whether the given type is `any`.

@link https://stackoverflow.com/a/49928360/1490091

Useful in type utilities, such as disallowing `any`s to be passed to a function.

@example
```
import type {IsAny} from 'type-fest';

const typedObject = {a: 1, b: 2} as const;
const anyObject: any = {a: 1, b: 2};

function get<O extends (IsAny<O> extends true ? {} : Record<string, number>), K extends keyof O = keyof O>(object: O, key: K) {
	return object[key];
}

const typedA = get(typedObject, 'a');
//=> 1

const anyA = get(anyObject, 'a');
//=> any
```

@category Type Guard
@category Utilities
*/
type IsAny<T> = 0 extends 1 & NoInfer<T> ? true : false;
//#endregion
//#region node_modules/type-fest/source/is-optional-key-of.d.ts
/**
Returns a boolean for whether the given key is an optional key of type.

This is useful when writing utility types or schema validators that need to differentiate `optional` keys.

@example
```
import type {IsOptionalKeyOf} from 'type-fest';

type User = {
	name: string;
	surname: string;

	luckyNumber?: number;
};

type Admin = {
	name: string;
	surname?: string;
};

type T1 = IsOptionalKeyOf<User, 'luckyNumber'>;
//=> true

type T2 = IsOptionalKeyOf<User, 'name'>;
//=> false

type T3 = IsOptionalKeyOf<User, 'name' | 'luckyNumber'>;
//=> boolean

type T4 = IsOptionalKeyOf<User | Admin, 'name'>;
//=> false

type T5 = IsOptionalKeyOf<User | Admin, 'surname'>;
//=> boolean
```

@category Type Guard
@category Utilities
*/
type IsOptionalKeyOf<Type extends object, Key extends keyof Type> = IsAny<Type | Key> extends true ? never : Key extends keyof Type ? Type extends Record<Key, Type[Key]> ? false : true : false;
//#endregion
//#region node_modules/type-fest/source/optional-keys-of.d.ts
/**
Extract all optional keys from the given type.

This is useful when you want to create a new type that contains different type values for the optional keys only.

@example
```
import type {OptionalKeysOf, Except} from 'type-fest';

type User = {
	name: string;
	surname: string;

	luckyNumber?: number;
};

const REMOVE_FIELD = Symbol('remove field symbol');
type UpdateOperation<Entity extends object> = Except<Partial<Entity>, OptionalKeysOf<Entity>> & {
	[Key in OptionalKeysOf<Entity>]?: Entity[Key] | typeof REMOVE_FIELD;
};

const update1: UpdateOperation<User> = {
	name: 'Alice',
};

const update2: UpdateOperation<User> = {
	name: 'Bob',
	luckyNumber: REMOVE_FIELD,
};
```

@category Utilities
*/
type OptionalKeysOf<Type extends object> = Type extends unknown // For distributing `Type`
? (keyof { [Key in keyof Type as IsOptionalKeyOf<Type, Key> extends false ? never : Key]: never }) & keyof Type // Intersect with `keyof Type` to ensure result of `OptionalKeysOf<Type>` is always assignable to `keyof Type`
: never;
//#endregion
//#region node_modules/type-fest/source/required-keys-of.d.ts
/**
Extract all required keys from the given type.

This is useful when you want to create a new type that contains different type values for the required keys only or use the list of keys for validation purposes, etc...

@example
```
import type {RequiredKeysOf} from 'type-fest';

declare function createValidation<
	Entity extends object,
	Key extends RequiredKeysOf<Entity> = RequiredKeysOf<Entity>,
>(field: Key, validator: (value: Entity[Key]) => boolean): (entity: Entity) => boolean;

type User = {
	name: string;
	surname: string;
	luckyNumber?: number;
};

const validator1 = createValidation<User>('name', value => value.length < 25);
const validator2 = createValidation<User>('surname', value => value.length < 25);

// @ts-expect-error
const validator3 = createValidation<User>('luckyNumber', value => value > 0);
// Error: Argument of type '"luckyNumber"' is not assignable to parameter of type '"name" | "surname"'.
```

@category Utilities
*/
type RequiredKeysOf<Type extends object> = Type extends unknown // For distributing `Type`
? Exclude<keyof Type, OptionalKeysOf<Type>> : never;
//#endregion
//#region node_modules/type-fest/source/is-never.d.ts
/**
Returns a boolean for whether the given type is `never`.

@link https://github.com/microsoft/TypeScript/issues/31751#issuecomment-498526919
@link https://stackoverflow.com/a/53984913/10292952
@link https://www.zhenghao.io/posts/ts-never

Useful in type utilities, such as checking if something does not occur.

@example
```
import type {IsNever, And} from 'type-fest';

type A = IsNever<never>;
//=> true

type B = IsNever<any>;
//=> false

type C = IsNever<unknown>;
//=> false

type D = IsNever<never[]>;
//=> false

type E = IsNever<object>;
//=> false

type F = IsNever<string>;
//=> false
```

@example
```
import type {IsNever} from 'type-fest';

type IsTrue<T> = T extends true ? true : false;

// When a distributive conditional is instantiated with `never`, the entire conditional results in `never`.
type A = IsTrue<never>;
//=> never

// If you don't want that behaviour, you can explicitly add an `IsNever` check before the distributive conditional.
type IsTrueFixed<T> =
	IsNever<T> extends true ? false : T extends true ? true : false;

type B = IsTrueFixed<never>;
//=> false
```

@category Type Guard
@category Utilities
*/
type IsNever<T> = [T] extends [never] ? true : false;
//#endregion
//#region node_modules/type-fest/source/if.d.ts
/**
An if-else-like type that resolves depending on whether the given `boolean` type is `true` or `false`.

Use-cases:
- You can use this in combination with `Is*` types to create an if-else-like experience. For example, `If<IsAny<any>, 'is any', 'not any'>`.

Note:
- Returns a union of if branch and else branch if the given type is `boolean` or `any`. For example, `If<boolean, 'Y', 'N'>` will return `'Y' | 'N'`.
- Returns the else branch if the given type is `never`. For example, `If<never, 'Y', 'N'>` will return `'N'`.

@example
```
import type {If} from 'type-fest';

type A = If<true, 'yes', 'no'>;
//=> 'yes'

type B = If<false, 'yes', 'no'>;
//=> 'no'

type C = If<boolean, 'yes', 'no'>;
//=> 'yes' | 'no'

type D = If<any, 'yes', 'no'>;
//=> 'yes' | 'no'

type E = If<never, 'yes', 'no'>;
//=> 'no'
```

@example
```
import type {If, IsAny, IsNever} from 'type-fest';

type A = If<IsAny<unknown>, 'is any', 'not any'>;
//=> 'not any'

type B = If<IsNever<never>, 'is never', 'not never'>;
//=> 'is never'
```

@example
```
import type {If, IsEqual} from 'type-fest';

type IfEqual<T, U, IfBranch, ElseBranch> = If<IsEqual<T, U>, IfBranch, ElseBranch>;

type A = IfEqual<string, string, 'equal', 'not equal'>;
//=> 'equal'

type B = IfEqual<string, number, 'equal', 'not equal'>;
//=> 'not equal'
```

Note: Sometimes using the `If` type can make an implementation non–tail-recursive, which can impact performance. In such cases, it’s better to use a conditional directly. Refer to the following example:

@example
```
import type {If, IsEqual, StringRepeat} from 'type-fest';

type HundredZeroes = StringRepeat<'0', 100>;

// The following implementation is not tail recursive
type Includes<S extends string, Char extends string> =
	S extends `${infer First}${infer Rest}`
		? If<IsEqual<First, Char>,
			'found',
			Includes<Rest, Char>>
		: 'not found';

// Hence, instantiations with long strings will fail
// @ts-expect-error
type Fails = Includes<HundredZeroes, '1'>;
//           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Error: Type instantiation is excessively deep and possibly infinite.

// However, if we use a simple conditional instead of `If`, the implementation becomes tail-recursive
type IncludesWithoutIf<S extends string, Char extends string> =
	S extends `${infer First}${infer Rest}`
		? IsEqual<First, Char> extends true
			? 'found'
			: IncludesWithoutIf<Rest, Char>
		: 'not found';

// Now, instantiations with long strings will work
type Works = IncludesWithoutIf<HundredZeroes, '1'>;
//=> 'not found'
```

@category Type Guard
@category Utilities
*/
type If<Type extends boolean, IfBranch, ElseBranch> = IsNever<Type> extends true ? ElseBranch : Type extends true ? IfBranch : ElseBranch;
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
//#region node_modules/type-fest/source/is-equal.d.ts
/**
Returns a boolean for whether the two given types are equal.

@link https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650
@link https://stackoverflow.com/questions/68961864/how-does-the-equals-work-in-typescript/68963796#68963796

Use-cases:
- If you want to make a conditional branch based on the result of a comparison of two types.

@example
```
import type {IsEqual} from 'type-fest';

// This type returns a boolean for whether the given array includes the given item.
// `IsEqual` is used to compare the given array at position 0 and the given item and then return true if they are equal.
type Includes<Value extends readonly any[], Item> =
	Value extends readonly [Value[0], ...infer rest]
		? IsEqual<Value[0], Item> extends true
			? true
			: Includes<rest, Item>
		: false;
```

@category Type Guard
@category Utilities
*/
type IsEqual<A, B> = [A] extends [B] ? [B] extends [A] ? _IsEqual<A, B> : false : false;
// This version fails the `equalWrappedTupleIntersectionToBeNeverAndNeverExpanded` test in `test-d/is-equal.ts`.
type _IsEqual<A, B> = (<G>() => G extends A & G | G ? 1 : 2) extends (<G>() => G extends B & G | G ? 1 : 2) ? true : false;
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
//#region node_modules/type-fest/source/pick-index-signature.d.ts
/**
Pick only index signatures from the given object type, leaving out all explicitly defined properties.

This is the counterpart of `OmitIndexSignature`.

@example
```
import type {PickIndexSignature} from 'type-fest';

declare const symbolKey: unique symbol;

type Example = {
	// These index signatures will remain.
	[x: string]: unknown;
	[x: number]: unknown;
	[x: symbol]: unknown;
	[x: `head-${string}`]: string;
	[x: `${string}-tail`]: string;
	[x: `head-${string}-tail`]: string;
	[x: `${bigint}`]: string;
	[x: `embedded-${number}`]: string;

	// These explicitly defined keys will be removed.
	['kebab-case-key']: string;
	[symbolKey]: string;
	foo: 'bar';
	qux?: 'baz';
};

type ExampleIndexSignature = PickIndexSignature<Example>;
// {
// 	[x: string]: unknown;
// 	[x: number]: unknown;
// 	[x: symbol]: unknown;
// 	[x: `head-${string}`]: string;
// 	[x: `${string}-tail`]: string;
// 	[x: `head-${string}-tail`]: string;
// 	[x: `${bigint}`]: string;
// 	[x: `embedded-${number}`]: string;
// }
```

@see {@link OmitIndexSignature}
@category Object
*/
type PickIndexSignature<ObjectType> = { [KeyType in keyof ObjectType as {} extends Record<KeyType, unknown> ? KeyType : never]: ObjectType[KeyType] };
//#endregion
//#region node_modules/type-fest/source/merge.d.ts
// Merges two objects without worrying about index signatures.
type SimpleMerge<Destination, Source> = Simplify<{ [Key in keyof Destination as Key extends keyof Source ? never : Key]: Destination[Key] } & Source>;
/**
Merge two types into a new type. Keys of the second type overrides keys of the first type.

This is different from the TypeScript `&` (intersection) operator. With `&`, conflicting property types are intersected, which often results in `never`. For example, `{a: string} & {a: number}` makes `a` become `string & number`, which resolves to `never`. With `Merge`, the second type's keys cleanly override the first, so `Merge<{a: string}, {a: number}>` gives `{a: number}` as expected. `Merge` also produces a flattened type (via `Simplify`), making it more readable in IDE tooltips compared to `A & B`.

@example
```
import type {Merge} from 'type-fest';

type Foo = {
	a: string;
	b: number;
};

type Bar = {
	a: number; // Conflicts with Foo['a']
	c: boolean;
};

// With `&`, `a` becomes `string & number` which is `never`. Not what you want.
type WithIntersection = (Foo & Bar)['a'];
//=> never

// With `Merge`, `a` is cleanly overridden to `number`.
type WithMerge = Merge<Foo, Bar>['a'];
//=> number
```

@example
```
import type {Merge} from 'type-fest';

type Foo = {
	[x: string]: unknown;
	[x: number]: unknown;
	foo: string;
	bar: symbol;
};

type Bar = {
	[x: number]: number;
	[x: symbol]: unknown;
	bar: Date;
	baz: boolean;
};

export type FooBar = Merge<Foo, Bar>;
//=> {
// 	[x: string]: unknown;
// 	[x: number]: number;
// 	[x: symbol]: unknown;
// 	foo: string;
// 	bar: Date;
// 	baz: boolean;
// }
```

Note: If you want a merge type that more accurately reflects the runtime behavior of object spread or `Object.assign`, refer to the {@link ObjectMerge} type.

@see {@link ObjectMerge}
@category Object
*/
type Merge<Destination, Source> = Destination extends unknown // For distributing `Destination`
? Source extends unknown // For distributing `Source`
? If<IsEqual<Destination, Source>, Destination, _Merge<Destination, Source>> : never // Should never happen
: never;
// Should never happen
type _Merge<Destination, Source> = Simplify<SimpleMerge<PickIndexSignature<Destination>, PickIndexSignature<Source>> & SimpleMerge<OmitIndexSignature<Destination>, OmitIndexSignature<Source>>>;
//#endregion
//#region node_modules/type-fest/source/internal/object.d.ts
/**
Works similar to the built-in `Pick` utility type, except for the following differences:
- Distributes over union types and allows picking keys from any member of the union type.
- Primitives types are returned as-is.
- Picks all keys if `Keys` is `any`.
- Doesn't pick `number` from a `string` index signature.

@example
```
type ImageUpload = {
	url: string;
	size: number;
	thumbnailUrl: string;
};

type VideoUpload = {
	url: string;
	duration: number;
	encodingFormat: string;
};

// Distributes over union types and allows picking keys from any member of the union type
type MediaDisplay = HomomorphicPick<ImageUpload | VideoUpload, "url" | "size" | "duration">;
//=> {url: string; size: number} | {url: string; duration: number}

// Primitive types are returned as-is
type Primitive = HomomorphicPick<string | number, 'toUpperCase' | 'toString'>;
//=> string | number

// Picks all keys if `Keys` is `any`
type Any = HomomorphicPick<{a: 1; b: 2} | {c: 3}, any>;
//=> {a: 1; b: 2} | {c: 3}

// Doesn't pick `number` from a `string` index signature
type IndexSignature = HomomorphicPick<{[k: string]: unknown}, number>;
//=> {}
*/
type HomomorphicPick<T, Keys extends KeysOfUnion<T>> = { [P in keyof T as Extract<P, Keys>]: T[P] };
/**
Merges user specified options with default options.

@example
```
type PathsOptions = {maxRecursionDepth?: number; leavesOnly?: boolean};
type DefaultPathsOptions = {maxRecursionDepth: 10; leavesOnly: false};
type SpecifiedOptions = {leavesOnly: true};

type Result = ApplyDefaultOptions<PathsOptions, DefaultPathsOptions, SpecifiedOptions>;
//=> {maxRecursionDepth: 10; leavesOnly: true}
```

@example
```
// Complains if default values are not provided for optional options

type PathsOptions = {maxRecursionDepth?: number; leavesOnly?: boolean};
type DefaultPathsOptions = {maxRecursionDepth: 10};
type SpecifiedOptions = {};

type Result = ApplyDefaultOptions<PathsOptions, DefaultPathsOptions, SpecifiedOptions>;
//                                              ~~~~~~~~~~~~~~~~~~~
// Property 'leavesOnly' is missing in type 'DefaultPathsOptions' but required in type '{ maxRecursionDepth: number; leavesOnly: boolean; }'.
```

@example
```
// Complains if an option's default type does not conform to the expected type

type PathsOptions = {maxRecursionDepth?: number; leavesOnly?: boolean};
type DefaultPathsOptions = {maxRecursionDepth: 10; leavesOnly: 'no'};
type SpecifiedOptions = {};

type Result = ApplyDefaultOptions<PathsOptions, DefaultPathsOptions, SpecifiedOptions>;
//                                              ~~~~~~~~~~~~~~~~~~~
// Types of property 'leavesOnly' are incompatible. Type 'string' is not assignable to type 'boolean'.
```

@example
```
// Complains if an option's specified type does not conform to the expected type

type PathsOptions = {maxRecursionDepth?: number; leavesOnly?: boolean};
type DefaultPathsOptions = {maxRecursionDepth: 10; leavesOnly: false};
type SpecifiedOptions = {leavesOnly: 'yes'};

type Result = ApplyDefaultOptions<PathsOptions, DefaultPathsOptions, SpecifiedOptions>;
//                                                                   ~~~~~~~~~~~~~~~~
// Types of property 'leavesOnly' are incompatible. Type 'string' is not assignable to type 'boolean'.
```
*/
type ApplyDefaultOptions<Options extends object, Defaults extends Simplify<Omit<Required<Options>, RequiredKeysOf<Options>> & Partial<Record<RequiredKeysOf<Options>, never>>>, SpecifiedOptions extends Options> = If<IsAny<SpecifiedOptions>, Defaults, If<IsNever<SpecifiedOptions>, Defaults, Simplify<Merge<Defaults, { [Key in keyof SpecifiedOptions as Key extends OptionalKeysOf<Options> ? undefined extends SpecifiedOptions[Key] ? never : Key : Key]: SpecifiedOptions[Key] }> & Required<Options>>>>;
//#endregion
//#region node_modules/type-fest/source/except.d.ts
/**
Filter out keys from an object.

Returns `never` if `Exclude` is strictly equal to `Key`.
Returns `never` if `Key` extends `Exclude`.
Returns `Key` otherwise.

@example
```
type Filtered = Filter<'foo', 'foo'>;
//=> never
```

@example
```
type Filtered = Filter<'bar', string>;
//=> never
```

@example
```
type Filtered = Filter<'bar', 'foo'>;
//=> 'bar'
```

@see {Except}
*/
type Filter<KeyType, ExcludeType> = IsEqual<KeyType, ExcludeType> extends true ? never : (KeyType extends ExcludeType ? never : KeyType);
type ExceptOptions = {
  /**
  Disallow assigning non-specified properties.
  	Note that any omitted properties in the resulting type will be present in autocomplete as `undefined`.
  	@default false
  */
  requireExactProps?: boolean;
};
type DefaultExceptOptions = {
  requireExactProps: false;
};
/**
Create a type from an object type without certain keys.

We recommend setting the `requireExactProps` option to `true`.

This type is a stricter version of [`Omit`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-5.html#the-omit-helper-type). The `Omit` type does not restrict the omitted keys to be keys present on the given type, while `Except` does. The benefits of a stricter type are avoiding typos and allowing the compiler to pick up on rename refactors automatically.

This type was proposed to the TypeScript team, which declined it, saying they prefer that libraries implement stricter versions of the built-in types ([microsoft/TypeScript#30825](https://github.com/microsoft/TypeScript/issues/30825#issuecomment-523668235)).

@example
```
import type {Except} from 'type-fest';

type Foo = {
	a: number;
	b: string;
};

type FooWithoutA = Except<Foo, 'a'>;
//=> {b: string}

// @ts-expect-error
const fooWithoutA: FooWithoutA = {a: 1, b: '2'};
// errors: 'a' does not exist in type '{ b: string; }'

type FooWithoutB = Except<Foo, 'b', {requireExactProps: true}>;
//=> {a: number} & Partial<Record<'b', never>>

// @ts-expect-error
const fooWithoutB: FooWithoutB = {a: 1, b: '2'};
// errors at 'b': Type 'string' is not assignable to type 'undefined'.

// The `Omit` utility type doesn't work when omitting specific keys from objects containing index signatures.

// Consider the following example:

type UserData = {
	[metadata: string]: string;
	email: string;
	name: string;
	role: 'admin' | 'user';
};

// `Omit` clearly doesn't behave as expected in this case:
type PostPayload = Omit<UserData, 'email'>;
//=> {[x: string]: string; [x: number]: string}

// In situations like this, `Except` works better.
// It simply removes the `email` key while preserving all the other keys.
type PostPayloadFixed = Except<UserData, 'email'>;
//=> {[x: string]: string; name: string; role: 'admin' | 'user'}
```

@category Object
*/
type Except<ObjectType, KeysType extends keyof ObjectType, Options extends ExceptOptions = {}> = _Except<ObjectType, KeysType, ApplyDefaultOptions<ExceptOptions, DefaultExceptOptions, Options>>;
type _Except<ObjectType, KeysType extends keyof ObjectType, Options extends Required<ExceptOptions>> = { [KeyType in keyof ObjectType as Filter<KeyType, KeysType>]: ObjectType[KeyType] } & (Options['requireExactProps'] extends true ? Partial<Record<KeysType, never>> : {});
//#endregion
//#region node_modules/type-fest/source/set-optional.d.ts
/**
Create a type that makes the given keys optional, while keeping the remaining keys as is.

Use-case: You want to define a single model where the only thing that changes is whether or not some of the keys are optional.

@example
```
import type {SetOptional} from 'type-fest';

type Foo = {
	a: number;
	b?: string;
	c: boolean;
};

type SomeOptional = SetOptional<Foo, 'b' | 'c'>;
//=> {a: number; b?: string; c?: boolean}
```

@category Object
*/
type SetOptional<BaseType, Keys extends keyof BaseType> = (BaseType extends ((...arguments_: never) => any) ? (...arguments_: Parameters<BaseType>) => ReturnType<BaseType> : unknown) & _SetOptional<BaseType, Keys>;
type _SetOptional<BaseType, Keys extends keyof BaseType> = BaseType extends unknown // To distribute `BaseType` when it's a union type.
? Simplify< // Pick just the keys that are readonly from the base type.
Except<BaseType, Keys> // Pick the keys that should be mutable from the base type and make them mutable.
& Partial<HomomorphicPick<BaseType, Keys>>> : never;
//#endregion
//#region code/frameworks/angular/.dts-emit/code/frameworks/angular/src/client/preview.d.ts
/**
 * Creates an Angular-specific preview configuration with CSF factories support.
 *
 * This function wraps the base `definePreview` and adds Angular-specific annotations for rendering
 * and documentation. It returns an `AngularPreview` that provides type-safe `meta()` and `story()`
 * factory methods.
 *
 * @example
 *
 * ```ts
 * // .storybook/preview.ts
 * import { definePreview } from '@storybook/angular';
 *
 * export const preview = definePreview({
 *   addons: [],
 *   parameters: { layout: 'centered' },
 * });
 * ```
 */
declare function __definePreview<Addons extends PreviewAddon<never>[]>(input: {
  addons: Addons;
} & ProjectAnnotations<AngularRenderer & InferTypes<Addons>>): AngularPreview<AngularRenderer & InferTypes<Addons>>;
type InferArgs<TArgs, T, Decorators> = Simplify<TArgs & Simplify<OmitIndexSignature<DecoratorsArgs<AngularRenderer & T, Decorators>>>>;
type InferComponentArgs<C extends abstract new (...args: any) => any> = Partial<TransformComponentType<InstanceType<C>>>;
type InferAngularTypes<T, TArgs, Decorators> = AngularRenderer & T & {
  args: Simplify<InferArgs<TArgs, T, Decorators>>;
};
/**
 * Angular-specific Preview interface that provides type-safe CSF factory methods.
 *
 * Use `preview.meta()` to create a meta configuration for a component, and then `meta.story()` to
 * create individual stories. The type system will infer args from the component, decorators, and
 * any addon types.
 *
 * @example
 *
 * ```ts
 * const meta = preview.meta({ component: ButtonComponent });
 * export const Primary = meta.story({ args: { label: 'Click me' } });
 * ```
 */
interface AngularPreview<T extends AddonTypes> extends Preview$1<AngularRenderer & T> {
  /**
   * Narrows the type of the preview to include additional type information. This is useful when you
   * need to add args that aren't inferred from the component.
   *
   * @example
   *
   * ```ts
   * const meta = preview.type<{ args: { theme: 'light' | 'dark' } }>().meta({
   *   component: ButtonComponent,
   * });
   * ```
   */
  type<S>(): AngularPreview<T & S>;
  meta<C extends abstract new (...args: any) => any, Decorators extends DecoratorFunction<AngularRenderer & T, any>, TMetaArgs extends Partial<InferComponentArgs<C> & T['args']>>(meta: {
    component?: C;
    args?: TMetaArgs;
    decorators?: Decorators | Decorators[];
  } & Omit<ComponentAnnotations<AngularRenderer & T, InferComponentArgs<C> & T['args']>, 'decorators' | 'component' | 'args'>): AngularMeta<InferAngularTypes<T, InferComponentArgs<C>, Decorators>, Omit<ComponentAnnotations<InferAngularTypes<T, InferComponentArgs<C>, Decorators>>, 'args'> & {
    args: {} extends TMetaArgs ? {} : TMetaArgs;
  }>;
  meta<TArgs, Decorators extends DecoratorFunction<AngularRenderer & T, any>, TMetaArgs extends Partial<TArgs & T['args']>>(meta: {
    render?: ArgsStoryFn<AngularRenderer & T, TArgs & T['args']>;
    args?: TMetaArgs;
    decorators?: Decorators | Decorators[];
  } & Omit<ComponentAnnotations<AngularRenderer & T, TArgs & T['args']>, 'decorators' | 'args' | 'render' | 'component'>): AngularMeta<InferAngularTypes<T, TArgs, Decorators>, Omit<ComponentAnnotations<InferAngularTypes<T, TArgs, Decorators>>, 'args'> & {
    args: {} extends TMetaArgs ? {} : TMetaArgs;
  }>;
}
/** Extracts and unions all args types from an array of decorators. */
type DecoratorsArgs<TRenderer extends Renderer, Decorators> = UnionToIntersection<Decorators extends DecoratorFunction<TRenderer, infer TArgs> ? TArgs : unknown>;
/**
 * Angular-specific Meta interface returned by `preview.meta()`.
 *
 * Provides the `story()` method to create individual stories with proper type inference. Args
 * provided in meta become optional in stories, while missing required args must be provided at the
 * story level.
 */
interface AngularMeta<T extends AngularRenderer, MetaInput extends ComponentAnnotations<T>> extends Meta$1<T, MetaInput> {
  /**
   * Creates a story with a custom render function that takes no args.
   *
   * This overload allows you to define a story using just a render function or an object with a
   * render function that doesn't depend on args. Since the render function doesn't use args, no
   * args need to be provided regardless of what's required by the component.
   *
   * @example
   *
   * ```ts
   * // Using just a render function
   * export const CustomTemplate = meta.story(() => ({
   *   template: '<div>Custom static content</div>',
   * }));
   *
   * // Using an object with render
   * export const WithRender = meta.story({
   *   render: () => ({ template: '<my-component></my-component>' }),
   * });
   * ```
   */
  story<TInput extends (() => AngularRenderer['storyResult']) | (StoryAnnotations<T, T['args']> & {
    render: () => AngularRenderer['storyResult'];
  })>(story: TInput): AngularStory<T, TInput extends (() => AngularRenderer['storyResult']) ? {
    render: TInput;
  } : TInput>;
  /**
   * Creates a story with custom configuration including args, decorators, or other annotations.
   *
   * This is the primary overload for defining stories. Args that were already provided in meta
   * become optional, while any remaining required args must be specified here.
   *
   * @example
   *
   * ```ts
   * // Provide required args not in meta
   * export const Primary = meta.story({
   *   args: { label: 'Click me', disabled: false },
   * });
   *
   * // Override meta args and add story-specific configuration
   * export const Disabled = meta.story({
   *   args: { disabled: true },
   *   decorators: [withCustomWrapper],
   * });
   * ```
   */
  story<TInput extends Simplify<StoryAnnotations<T, T['args'], SetOptional<T['args'], keyof T['args'] & keyof MetaInput['args']>>>>(story: TInput): AngularStory<T, TInput>;
  /**
   * Creates a story with no additional configuration.
   *
   * This overload is only available when all required args have been provided in meta. The
   * conditional type `Partial<T['args']> extends SetOptional<...>` checks if the remaining required
   * args (after accounting for args provided in meta) are all optional. If so, the function accepts
   * zero arguments `[]`. Otherwise, it requires `[never]` which makes this overload unmatchable,
   * forcing the user to provide args.
   *
   * @example
   *
   * ```ts
   * // When meta provides all required args, story() can be called with no arguments
   * const meta = preview.meta({ component: Button, args: { label: 'Hi', disabled: false } });
   * export const Default = meta.story(); // Valid - all args provided in meta
   * ```
   */
  story(..._args: Partial<T['args']> extends SetOptional<T['args'], keyof T['args'] & keyof MetaInput['args']> ? [] : [never]): AngularStory<T, {}>;
}
/**
 * Angular-specific Story interface returned by `meta.story()`.
 *
 * Represents a single story with its configuration and provides access to the composed story for
 * testing via `story.run()`.
 */
interface AngularStory<T extends AngularRenderer, TInput extends StoryAnnotations<T, T['args']>> extends Story<T, TInput> {}
//#endregion
//#region code/frameworks/angular/.dts-emit/code/frameworks/angular/src/client/decorators.d.ts
declare const moduleMetadata: <TArgs = any>(metadata: Partial<NgModuleMetadata>) => DecoratorFunction<AngularRenderer, TArgs>;
/**
 * Decorator to set the config options which are available during the application bootstrap
 * operation
 */
declare function applicationConfig<TArgs = any>(/** Set of config options available during the application bootstrap operation. */

config: ApplicationConfig): DecoratorFunction<AngularRenderer, TArgs>;
declare const componentWrapperDecorator: <TArgs = any>(element: Type<unknown> | ((story: string) => string), props?: ICollection | ((storyContext: StoryContext$1<AngularRenderer, TArgs>) => ICollection)) => DecoratorFunction<AngularRenderer, TArgs>;
//#endregion
//#region code/frameworks/angular/.dts-emit/code/frameworks/angular/src/client/argsToTemplate.d.ts
/**
 * Options for controlling the behavior of the argsToTemplate function.
 *
 * @template T The type of the keys in the target object.
 */
interface ArgsToTemplateOptions<T> {
  /**
   * An array of keys to specifically include in the output. If provided, only the keys from this
   * array will be included in the output, irrespective of the `exclude` option. Undefined values
   * will still be excluded from the output.
   */
  include?: Array<T>;
  /**
   * An array of keys to specifically exclude from the output. If provided, these keys will be
   * omitted from the output. This option is ignored if the `include` option is also provided
   */
  exclude?: Array<T>;
}
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
declare function argsToTemplate<A extends Record<string, any>>(args: A, options?: ArgsToTemplateOptions<keyof A>): string;
//#endregion
export { AngularMeta, AngularOptions, type Parameters$1 as AngularParameters, AngularPreview, type AngularRenderer, AngularStory, type ArgTypes, type Args, Decorator, FrameworkOptions, type StoryFnAngularReturnType as IStory, Loader, Meta, type Parameters$2 as Parameters, Preview, StoryContext, StoryFn, StoryObj, StorybookConfig, type StrictArgs, TransformComponentType, __definePreview, __definePreview as definePreview, applicationConfig, argsToTemplate, componentWrapperDecorator, moduleMetadata, setProjectAnnotations };