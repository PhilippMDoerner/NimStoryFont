/**
 * @license Angular v20.0.3
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { ɵNavigation as _Navigation, ɵNavigationHistoryEntry as _NavigationHistoryEntry, ɵNavigationUpdateCurrentEntryOptions as _NavigationUpdateCurrentEntryOptions, ɵNavigationTransition as _NavigationTransition, ɵNavigationNavigateOptions as _NavigationNavigateOptions, ɵNavigationResult as _NavigationResult, ɵNavigationReloadOptions as _NavigationReloadOptions, ɵNavigationOptions as _NavigationOptions, ɵNavigateEvent as _NavigateEvent, ɵNavigationCurrentEntryChangeEvent as _NavigationCurrentEntryChangeEvent, OnDestroy, Version, Provider, InjectionToken, OnInit, OnChanges, SimpleChanges } from '@angular/core';
export { DOCUMENT, ɵIMAGE_CONFIG as IMAGE_CONFIG, ɵImageConfig as ImageConfig } from '@angular/core';
import { LocationStrategy } from './common_module.d-Cpp8wYHt.js';
export { APP_BASE_HREF, AsyncPipe, CommonModule, CurrencyPipe, DATE_PIPE_DEFAULT_OPTIONS, DATE_PIPE_DEFAULT_TIMEZONE, DatePipe, DatePipeConfig, DecimalPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValue, KeyValuePipe, Location, LowerCasePipe, NgClass, NgComponentOutlet, NgForOf as NgFor, NgForOf, NgForOfContext, NgIf, NgIfContext, NgLocaleLocalization, NgLocalization, NgPlural, NgPluralCase, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet, PathLocationStrategy, PercentPipe, PopStateEvent, SlicePipe, TitleCasePipe, UpperCasePipe } from './common_module.d-Cpp8wYHt.js';
import { PlatformLocation, LocationChangeListener } from './platform_location.d-Lbv6Ueec.js';
export { BrowserPlatformLocation, LOCATION_INITIALIZED, LocationChangeEvent } from './platform_location.d-Lbv6Ueec.js';
export { XhrFactory } from './xhr.d-D_1kTQR5.js';
import 'rxjs';

declare function getDOM(): DomAdapter;
declare function setRootDomAdapter(adapter: DomAdapter): void;
/**
 * Provides DOM operations in an environment-agnostic way.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
declare abstract class DomAdapter {
    abstract dispatchEvent(el: any, evt: any): any;
    abstract readonly supportsDOMEvents: boolean;
    abstract remove(el: any): void;
    abstract createElement(tagName: any, doc?: any): HTMLElement;
    abstract createHtmlDocument(): Document;
    abstract getDefaultDocument(): Document;
    abstract isElementNode(node: any): boolean;
    abstract isShadowRoot(node: any): boolean;
    abstract onAndCancel(el: any, evt: any, listener: any, options?: any): Function;
    abstract getGlobalEventTarget(doc: Document, target: string): any;
    abstract getBaseHref(doc: Document): string | null;
    abstract resetBaseElement(): void;
    abstract getUserAgent(): string;
    abstract getCookie(name: string): string | null;
}

/**
 * This class wraps the platform Navigation API which allows server-specific and test
 * implementations.
 */
declare abstract class PlatformNavigation implements _Navigation {
    abstract entries(): _NavigationHistoryEntry[];
    abstract currentEntry: _NavigationHistoryEntry | null;
    abstract updateCurrentEntry(options: _NavigationUpdateCurrentEntryOptions): void;
    abstract transition: _NavigationTransition | null;
    abstract canGoBack: boolean;
    abstract canGoForward: boolean;
    abstract navigate(url: string, options?: _NavigationNavigateOptions | undefined): _NavigationResult;
    abstract reload(options?: _NavigationReloadOptions | undefined): _NavigationResult;
    abstract traverseTo(key: string, options?: _NavigationOptions | undefined): _NavigationResult;
    abstract back(options?: _NavigationOptions | undefined): _NavigationResult;
    abstract forward(options?: _NavigationOptions | undefined): _NavigationResult;
    abstract onnavigate: ((this: _Navigation, ev: _NavigateEvent) => any) | null;
    abstract onnavigatesuccess: ((this: _Navigation, ev: Event) => any) | null;
    abstract onnavigateerror: ((this: _Navigation, ev: ErrorEvent) => any) | null;
    abstract oncurrententrychange: ((this: _Navigation, ev: _NavigationCurrentEntryChangeEvent) => any) | null;
    abstract addEventListener(type: unknown, listener: unknown, options?: unknown): void;
    abstract removeEventListener(type: unknown, listener: unknown, options?: unknown): void;
    abstract dispatchEvent(event: Event): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<PlatformNavigation, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PlatformNavigation>;
}

/**
 * @description
 * A {@link LocationStrategy} used to configure the {@link Location} service to
 * represent its state in the
 * [hash fragment](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax)
 * of the browser's URL.
 *
 * For instance, if you call `location.go('/foo')`, the browser's URL will become
 * `example.com#/foo`.
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example common/location/ts/hash_location_component.ts region='LocationComponent'}
 *
 * @publicApi
 */
declare class HashLocationStrategy extends LocationStrategy implements OnDestroy {
    private _platformLocation;
    private _baseHref;
    private _removeListenerFns;
    constructor(_platformLocation: PlatformLocation, _baseHref?: string);
    /** @docs-private */
    ngOnDestroy(): void;
    onPopState(fn: LocationChangeListener): void;
    getBaseHref(): string;
    path(includeHash?: boolean): string;
    prepareExternalUrl(internal: string): string;
    pushState(state: any, title: string, path: string, queryParams: string): void;
    replaceState(state: any, title: string, path: string, queryParams: string): void;
    forward(): void;
    back(): void;
    getState(): unknown;
    historyGo(relativePosition?: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HashLocationStrategy, [null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HashLocationStrategy>;
}

/**
 * @ngModule CommonModule
 * @description
 *
 * Formats a date according to locale rules.
 *
 * @param value The date to format, as a Date, or a number (milliseconds since UTC epoch)
 * or an [ISO date-time string](https://www.w3.org/TR/NOTE-datetime).
 * @param format The date-time components to include. See `DatePipe` for details.
 * @param locale A locale code for the locale format rules to use.
 * @param timezone The time zone. A time zone offset from GMT (such as `'+0430'`).
 * If not specified, uses host system settings.
 *
 * @returns The formatted date string.
 *
 * @see {@link DatePipe}
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 */
declare function formatDate(value: string | number | Date, format: string, locale: string, timezone?: string): string;

/**
 * @ngModule CommonModule
 * @description
 *
 * Formats a number as currency using locale rules.
 *
 * @param value The number to format.
 * @param locale A locale code for the locale format rules to use.
 * @param currency A string containing the currency symbol or its name,
 * such as "$" or "Canadian Dollar". Used in output string, but does not affect the operation
 * of the function.
 * @param currencyCode The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217)
 * currency code, such as `USD` for the US dollar and `EUR` for the euro.
 * Used to determine the number of digits in the decimal part.
 * @param digitsInfo Decimal representation options, specified by a string in the following format:
 * `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}`. See `DecimalPipe` for more details.
 *
 * @returns The formatted currency value.
 *
 * @see {@link formatNumber}
 * @see {@link DecimalPipe}
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 */
declare function formatCurrency(value: number, locale: string, currency: string, currencyCode?: string, digitsInfo?: string): string;
/**
 * @ngModule CommonModule
 * @description
 *
 * Formats a number as a percentage according to locale rules.
 *
 * @param value The number to format.
 * @param locale A locale code for the locale format rules to use.
 * @param digitsInfo Decimal representation options, specified by a string in the following format:
 * `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}`. See `DecimalPipe` for more details.
 *
 * @returns The formatted percentage value.
 *
 * @see {@link formatNumber}
 * @see {@link DecimalPipe}
 * @see [Internationalization (i18n) Guide](guide/i18n)
 * @publicApi
 *
 */
declare function formatPercent(value: number, locale: string, digitsInfo?: string): string;
/**
 * @ngModule CommonModule
 * @description
 *
 * Formats a number as text, with group sizing, separator, and other
 * parameters based on the locale.
 *
 * @param value The number to format.
 * @param locale A locale code for the locale format rules to use.
 * @param digitsInfo Decimal representation options, specified by a string in the following format:
 * `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}`. See `DecimalPipe` for more details.
 *
 * @returns The formatted text string.
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 */
declare function formatNumber(value: number, locale: string, digitsInfo?: string): string;

/**
 * Register global data to be used internally by Angular. See the
 * ["I18n guide"](guide/i18n/format-data-locale) to know how to import additional locale
 * data.
 *
 * The signature registerLocaleData(data: any, extraData?: any) is deprecated since v5.1
 *
 * @publicApi
 */
declare function registerLocaleData(data: any, localeId?: string | any, extraData?: any): void;

/**
 * Format styles that can be used to represent numbers.
 * @see {@link getLocaleNumberFormat}
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 *
 * @deprecated `getLocaleNumberFormat` is deprecated
 */
declare enum NumberFormatStyle {
    Decimal = 0,
    Percent = 1,
    Currency = 2,
    Scientific = 3
}
/**
 * Plurality cases used for translating plurals to different languages.
 *
 * @see {@link NgPlural}
 * @see {@link NgPluralCase}
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 *
 * @deprecated `getLocalePluralCase` is deprecated
 */
declare enum Plural {
    Zero = 0,
    One = 1,
    Two = 2,
    Few = 3,
    Many = 4,
    Other = 5
}
/**
 * Context-dependant translation forms for strings.
 * Typically the standalone version is for the nominative form of the word,
 * and the format version is used for the genitive case.
 * @see [CLDR website](http://cldr.unicode.org/translation/date-time-1/date-time#TOC-Standalone-vs.-Format-Styles)
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 *
 * @deprecated locale data getters are deprecated
 */
declare enum FormStyle {
    Format = 0,
    Standalone = 1
}
/**
 * String widths available for translations.
 * The specific character widths are locale-specific.
 * Examples are given for the word "Sunday" in English.
 *
 * @publicApi
 *
 * @deprecated locale data getters are deprecated
 */
declare enum TranslationWidth {
    /** 1 character for `en-US`. For example: 'S' */
    Narrow = 0,
    /** 3 characters for `en-US`. For example: 'Sun' */
    Abbreviated = 1,
    /** Full length for `en-US`. For example: "Sunday" */
    Wide = 2,
    /** 2 characters for `en-US`, For example: "Su" */
    Short = 3
}
/**
 * String widths available for date-time formats.
 * The specific character widths are locale-specific.
 * Examples are given for `en-US`.
 *
 * @see {@link getLocaleDateFormat}
 * @see {@link getLocaleTimeFormat}
 * @see {@link getLocaleDateTimeFormat}
 * @see [Internationalization (i18n) Guide](guide/i18n)
 * @publicApi
 *
 * @deprecated 18.0
 * Date locale data getters are deprecated
 */
declare enum FormatWidth {
    /**
     * For `en-US`, `'M/d/yy, h:mm a'`
     * (Example: `6/15/15, 9:03 AM`)
     */
    Short = 0,
    /**
     * For `en-US`, `'MMM d, y, h:mm:ss a'`
     * (Example: `Jun 15, 2015, 9:03:01 AM`)
     */
    Medium = 1,
    /**
     * For `en-US`, `'MMMM d, y, h:mm:ss a z'`
     * (Example: `June 15, 2015 at 9:03:01 AM GMT+1`)
     */
    Long = 2,
    /**
     * For `en-US`, `'EEEE, MMMM d, y, h:mm:ss a zzzz'`
     * (Example: `Monday, June 15, 2015 at 9:03:01 AM GMT+01:00`)
     */
    Full = 3
}
/**
 * Symbols that can be used to replace placeholders in number patterns.
 * Examples are based on `en-US` values.
 *
 * @see {@link getLocaleNumberSymbol}
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 *
 * @deprecated `getLocaleNumberSymbol` is deprecated
 *
 * @object-literal-as-enum
 */
declare const NumberSymbol: {
    /**
     * Decimal separator.
     * For `en-US`, the dot character.
     * Example: 2,345`.`67
     */
    readonly Decimal: 0;
    /**
     * Grouping separator, typically for thousands.
     * For `en-US`, the comma character.
     * Example: 2`,`345.67
     */
    readonly Group: 1;
    /**
     * List-item separator.
     * Example: "one, two, and three"
     */
    readonly List: 2;
    /**
     * Sign for percentage (out of 100).
     * Example: 23.4%
     */
    readonly PercentSign: 3;
    /**
     * Sign for positive numbers.
     * Example: +23
     */
    readonly PlusSign: 4;
    /**
     * Sign for negative numbers.
     * Example: -23
     */
    readonly MinusSign: 5;
    /**
     * Computer notation for exponential value (n times a power of 10).
     * Example: 1.2E3
     */
    readonly Exponential: 6;
    /**
     * Human-readable format of exponential.
     * Example: 1.2x103
     */
    readonly SuperscriptingExponent: 7;
    /**
     * Sign for permille (out of 1000).
     * Example: 23.4‰
     */
    readonly PerMille: 8;
    /**
     * Infinity, can be used with plus and minus.
     * Example: ∞, +∞, -∞
     */
    readonly Infinity: 9;
    /**
     * Not a number.
     * Example: NaN
     */
    readonly NaN: 10;
    /**
     * Symbol used between time units.
     * Example: 10:52
     */
    readonly TimeSeparator: 11;
    /**
     * Decimal separator for currency values (fallback to `Decimal`).
     * Example: $2,345.67
     */
    readonly CurrencyDecimal: 12;
    /**
     * Group separator for currency values (fallback to `Group`).
     * Example: $2,345.67
     */
    readonly CurrencyGroup: 13;
};
type NumberSymbol = (typeof NumberSymbol)[keyof typeof NumberSymbol];
/**
 * The value for each day of the week, based on the `en-US` locale
 *
 * @publicApi
 *
 * @deprecated Week locale getters are deprecated
 */
declare enum WeekDay {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}
/**
 * Retrieves the locale ID from the currently loaded locale.
 * The loaded locale could be, for example, a global one rather than a regional one.
 * @param locale A locale code, such as `fr-FR`.
 * @returns The locale code. For example, `fr`.
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 *
 * @deprecated Angular recommends relying on the `Intl` API for i18n.
 * This function serves no purpose when relying on the `Intl` API.
 */
declare function getLocaleId(locale: string): string;
/**
 * Retrieves day period strings for the given locale.
 *
 * @param locale A locale code for the locale format rules to use.
 * @param formStyle The required grammatical form.
 * @param width The required character width.
 * @returns An array of localized period strings. For example, `[AM, PM]` for `en-US`.
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 *
 * @deprecated Angular recommends relying on the `Intl` API for i18n.
 * Use `Intl.DateTimeFormat` for date formating instead.
 */
declare function getLocaleDayPeriods(locale: string, formStyle: FormStyle, width: TranslationWidth): Readonly<[string, string]>;
/**
 * Retrieves days of the week for the given locale, using the Gregorian calendar.
 *
 * @param locale A locale code for the locale format rules to use.
 * @param formStyle The required grammatical form.
 * @param width The required character width.
 * @returns An array of localized name strings.
 * For example,`[Sunday, Monday, ... Saturday]` for `en-US`.
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 *
 * @deprecated Angular recommends relying on the `Intl` API for i18n.
 * Use `Intl.DateTimeFormat` for date formating instead.
 */
declare function getLocaleDayNames(locale: string, formStyle: FormStyle, width: TranslationWidth): ReadonlyArray<string>;
/**
 * Retrieves months of the year for the given locale, using the Gregorian calendar.
 *
 * @param locale A locale code for the locale format rules to use.
 * @param formStyle The required grammatical form.
 * @param width The required character width.
 * @returns An array of localized name strings.
 * For example,  `[January, February, ...]` for `en-US`.
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 *
 * @deprecated Angular recommends relying on the `Intl` API for i18n.
 * Use `Intl.DateTimeFormat` for date formating instead.
 */
declare function getLocaleMonthNames(locale: string, formStyle: FormStyle, width: TranslationWidth): ReadonlyArray<string>;
/**
 * Retrieves Gregorian-calendar eras for the given locale.
 * @param locale A locale code for the locale format rules to use.
 * @param width The required character width.

 * @returns An array of localized era strings.
 * For example, `[AD, BC]` for `en-US`.
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 *
 * @deprecated Angular recommends relying on the `Intl` API for i18n.
 * Use `Intl.DateTimeFormat` for date formating instead.
 */
declare function getLocaleEraNames(locale: string, width: TranslationWidth): Readonly<[string, string]>;
/**
 * Retrieves the first day of the week for the given locale.
 *
 * @param locale A locale code for the locale format rules to use.
 * @returns A day index number, using the 0-based week-day index for `en-US`
 * (Sunday = 0, Monday = 1, ...).
 * For example, for `fr-FR`, returns 1 to indicate that the first day is Monday.
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 *
 * @deprecated Angular recommends relying on the `Intl` API for i18n.
 * Intl's [`getWeekInfo`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getWeekInfo) has partial support (Chromium M99 & Safari 17).
 * You may want to rely on the following alternatives:
 * - Libraries like [`Luxon`](https://moment.github.io/luxon/#/) rely on `Intl` but fallback on the ISO 8601 definition (monday) if `getWeekInfo` is not supported.
 * - Other librairies like [`date-fns`](https://date-fns.org/), [`day.js`](https://day.js.org/en/) or [`weekstart`](https://www.npmjs.com/package/weekstart) library provide their own locale based data for the first day of the week.
 */
declare function getLocaleFirstDayOfWeek(locale: string): WeekDay;
/**
 * Range of week days that are considered the week-end for the given locale.
 *
 * @param locale A locale code for the locale format rules to use.
 * @returns The range of day values, `[startDay, endDay]`.
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 *
 * @deprecated Angular recommends relying on the `Intl` API for i18n.
 * Intl's [`getWeekInfo`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getWeekInfo) has partial support (Chromium M99 & Safari 17).
 * Libraries like [`Luxon`](https://moment.github.io/luxon/#/) rely on `Intl` but fallback on the ISO 8601 definition (Saturday+Sunday) if `getWeekInfo` is not supported .
 */
declare function getLocaleWeekEndRange(locale: string): [WeekDay, WeekDay];
/**
 * Retrieves a localized date-value formatting string.
 *
 * @param locale A locale code for the locale format rules to use.
 * @param width The format type.
 * @returns The localized formatting string.
 * @see {@link FormatWidth}
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 *
 * @deprecated Angular recommends relying on the `Intl` API for i18n.
 * Use `Intl.DateTimeFormat` for date formating instead.
 */
declare function getLocaleDateFormat(locale: string, width: FormatWidth): string;
/**
 * Retrieves a localized time-value formatting string.
 *
 * @param locale A locale code for the locale format rules to use.
 * @param width The format type.
 * @returns The localized formatting string.
 * @see {@link FormatWidth}
 * @see [Internationalization (i18n) Guide](guide/i18n)

 * @publicApi
 * @deprecated Angular recommends relying on the `Intl` API for i18n.
 * Use `Intl.DateTimeFormat` for date formating instead.
 */
declare function getLocaleTimeFormat(locale: string, width: FormatWidth): string;
/**
 * Retrieves a localized date-time formatting string.
 *
 * @param locale A locale code for the locale format rules to use.
 * @param width The format type.
 * @returns The localized formatting string.
 * @see {@link FormatWidth}
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 *
 * @deprecated Angular recommends relying on the `Intl` API for i18n.
 * Use `Intl.DateTimeFormat` for date formating instead.
 */
declare function getLocaleDateTimeFormat(locale: string, width: FormatWidth): string;
/**
 * Retrieves a localized number symbol that can be used to replace placeholders in number formats.
 * @param locale The locale code.
 * @param symbol The symbol to localize. Must be one of `NumberSymbol`.
 * @returns The character for the localized symbol.
 * @see {@link NumberSymbol}
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 *
 * @deprecated Angular recommends relying on the `Intl` API for i18n.
 * Use `Intl.NumberFormat` to format numbers instead.
 */
declare function getLocaleNumberSymbol(locale: string, symbol: NumberSymbol): string;
/**
 * Retrieves a number format for a given locale.
 *
 * Numbers are formatted using patterns, like `#,###.00`. For example, the pattern `#,###.00`
 * when used to format the number 12345.678 could result in "12'345,678". That would happen if the
 * grouping separator for your language is an apostrophe, and the decimal separator is a comma.
 *
 * <b>Important:</b> The characters `.` `,` `0` `#` (and others below) are special placeholders
 * that stand for the decimal separator, and so on, and are NOT real characters.
 * You must NOT "translate" the placeholders. For example, don't change `.` to `,` even though in
 * your language the decimal point is written with a comma. The symbols should be replaced by the
 * local equivalents, using the appropriate `NumberSymbol` for your language.
 *
 * Here are the special characters used in number patterns:
 *
 * | Symbol | Meaning |
 * |--------|---------|
 * | . | Replaced automatically by the character used for the decimal point. |
 * | , | Replaced by the "grouping" (thousands) separator. |
 * | 0 | Replaced by a digit (or zero if there aren't enough digits). |
 * | # | Replaced by a digit (or nothing if there aren't enough). |
 * | ¤ | Replaced by a currency symbol, such as $ or USD. |
 * | % | Marks a percent format. The % symbol may change position, but must be retained. |
 * | E | Marks a scientific format. The E symbol may change position, but must be retained. |
 * | ' | Special characters used as literal characters are quoted with ASCII single quotes. |
 *
 * @param locale A locale code for the locale format rules to use.
 * @param type The type of numeric value to be formatted (such as `Decimal` or `Currency`.)
 * @returns The localized format string.
 * @see {@link NumberFormatStyle}
 * @see [CLDR website](http://cldr.unicode.org/translation/number-patterns)
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 *
 * @deprecated Angular recommends relying on the `Intl` API for i18n.
 * Let `Intl.NumberFormat` determine the number format instead
 */
declare function getLocaleNumberFormat(locale: string, type: NumberFormatStyle): string;
/**
 * Retrieves the symbol used to represent the currency for the main country
 * corresponding to a given locale. For example, '$' for `en-US`.
 *
 * @param locale A locale code for the locale format rules to use.
 * @returns The localized symbol character,
 * or `null` if the main country cannot be determined.
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 *
 * @deprecated Use the `Intl` API to format a currency with from currency code
 */
declare function getLocaleCurrencySymbol(locale: string): string | null;
/**
 * Retrieves the name of the currency for the main country corresponding
 * to a given locale. For example, 'US Dollar' for `en-US`.
 * @param locale A locale code for the locale format rules to use.
 * @returns The currency name,
 * or `null` if the main country cannot be determined.
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 *
 * @deprecated Use the `Intl` API to format a currency with from currency code
 */
declare function getLocaleCurrencyName(locale: string): string | null;
/**
 * Retrieves the default currency code for the given locale.
 *
 * The default is defined as the first currency which is still in use.
 *
 * @param locale The code of the locale whose currency code we want.
 * @returns The code of the default currency for the given locale.
 *
 * @publicApi
 *
 * @deprecated We recommend you create a map of locale to ISO 4217 currency codes.
 * Time relative currency data is provided by the CLDR project. See https://www.unicode.org/cldr/charts/44/supplemental/detailed_territory_currency_information.html
 */
declare function getLocaleCurrencyCode(locale: string): string | null;
/**
 * @publicApi
 *
 * @deprecated Angular recommends relying on the `Intl` API for i18n.
 * Use `Intl.PluralRules` instead
 */
declare const getLocalePluralCase: (locale: string) => (value: number) => Plural;
/**
 * Retrieves locale-specific rules used to determine which day period to use
 * when more than one period is defined for a locale.
 *
 * There is a rule for each defined day period. The
 * first rule is applied to the first day period and so on.
 * Fall back to AM/PM when no rules are available.
 *
 * A rule can specify a period as time range, or as a single time value.
 *
 * This functionality is only available when you have loaded the full locale data.
 * See the ["I18n guide"](guide/i18n/format-data-locale).
 *
 * @param locale A locale code for the locale format rules to use.
 * @returns The rules for the locale, a single time value or array of *from-time, to-time*,
 * or null if no periods are available.
 *
 * @see {@link getLocaleExtraDayPeriods}
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 *
 * @deprecated Angular recommends relying on the `Intl` API for i18n.
 * Let `Intl.DateTimeFormat` determine the day period instead.
 */
declare function getLocaleExtraDayPeriodRules(locale: string): (Time | [Time, Time])[];
/**
 * Retrieves locale-specific day periods, which indicate roughly how a day is broken up
 * in different languages.
 * For example, for `en-US`, periods are morning, noon, afternoon, evening, and midnight.
 *
 * This functionality is only available when you have loaded the full locale data.
 * See the ["I18n guide"](guide/i18n/format-data-locale).
 *
 * @param locale A locale code for the locale format rules to use.
 * @param formStyle The required grammatical form.
 * @param width The required character width.
 * @returns The translated day-period strings.
 * @see {@link getLocaleExtraDayPeriodRules}
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 *
 * @deprecated Angular recommends relying on the `Intl` API for i18n.
 * To extract a day period use `Intl.DateTimeFormat` with the `dayPeriod` option instead.
 */
declare function getLocaleExtraDayPeriods(locale: string, formStyle: FormStyle, width: TranslationWidth): string[];
/**
 * Retrieves the writing direction of a specified locale
 * @param locale A locale code for the locale format rules to use.
 * @publicApi
 * @returns 'rtl' or 'ltr'
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @deprecated Angular recommends relying on the `Intl` API for i18n.
 * For dates and numbers, let `Intl.DateTimeFormat()` and `Intl.NumberFormat()` determine the writing direction.
 * The `Intl` alternative [`getTextInfo`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getTextInfo).
 * has only partial support (Chromium M99 & Safari 17).
 * 3rd party alternatives like [`rtl-detect`](https://www.npmjs.com/package/rtl-detect) can work around this issue.
 */
declare function getLocaleDirection(locale: string): 'ltr' | 'rtl';
/**
 * Represents a time value with hours and minutes.
 *
 * @publicApi
 *
 * @deprecated Locale date getters are deprecated
 */
type Time = {
    hours: number;
    minutes: number;
};
/**
 * Retrieves the currency symbol for a given currency code.
 *
 * For example, for the default `en-US` locale, the code `USD` can
 * be represented by the narrow symbol `$` or the wide symbol `US$`.
 *
 * @param code The currency code.
 * @param format The format, `wide` or `narrow`.
 * @param locale A locale code for the locale format rules to use.
 *
 * @returns The symbol, or the currency code if no symbol is available.
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 *
 * @deprecated Angular recommends relying on the `Intl` API for i18n.
 * You can use `Intl.NumberFormat().formatToParts()` to extract the currency symbol.
 * For example: `Intl.NumberFormat('en', {style:'currency', currency: 'USD'}).formatToParts().find(part => part.type === 'currency').value`
 * returns `$` for USD currency code in the `en` locale.
 * Note: `US$` is a currency symbol for the `en-ca` locale but not the `en-us` locale.
 */
declare function getCurrencySymbol(code: string, format: 'wide' | 'narrow', locale?: string): string;
/**
 * Reports the number of decimal digits for a given currency.
 * The value depends upon the presence of cents in that particular currency.
 *
 * @param code The currency code.
 * @returns The number of decimal digits, typically 0 or 2.
 * @see [Internationalization (i18n) Guide](guide/i18n)
 *
 * @publicApi
 *
 * @deprecated Angular recommends relying on the `Intl` API for i18n.
 * This function should not be used anymore. Let `Intl.NumberFormat` determine the number of digits to display for the currency
 */
declare function getNumberOfCurrencyDigits(code: string): number;

declare function parseCookieValue(cookieStr: string, name: string): string | null;

declare const PLATFORM_BROWSER_ID = "browser";
declare const PLATFORM_SERVER_ID = "server";
/**
 * Returns whether a platform id represents a browser platform.
 * @publicApi
 */
declare function isPlatformBrowser(platformId: Object): boolean;
/**
 * Returns whether a platform id represents a server platform.
 * @publicApi
 */
declare function isPlatformServer(platformId: Object): boolean;

/**
 * @module
 * @description
 * Entry point for all public APIs of the common package.
 */

/**
 * @publicApi
 */
declare const VERSION: Version;

/**
 * Defines a scroll position manager. Implemented by `BrowserViewportScroller`.
 *
 * @publicApi
 */
declare abstract class ViewportScroller {
    /** @nocollapse */
    static ɵprov: unknown;
    /**
     * Configures the top offset used when scrolling to an anchor.
     * @param offset A position in screen coordinates (a tuple with x and y values)
     * or a function that returns the top offset position.
     *
     */
    abstract setOffset(offset: [number, number] | (() => [number, number])): void;
    /**
     * Retrieves the current scroll position.
     * @returns A position in screen coordinates (a tuple with x and y values).
     */
    abstract getScrollPosition(): [number, number];
    /**
     * Scrolls to a specified position.
     * @param position A position in screen coordinates (a tuple with x and y values).
     */
    abstract scrollToPosition(position: [number, number], options?: ScrollOptions): void;
    /**
     * Scrolls to an anchor element.
     * @param anchor The ID of the anchor element.
     */
    abstract scrollToAnchor(anchor: string, options?: ScrollOptions): void;
    /**
     * Disables automatic scroll restoration provided by the browser.
     * See also [window.history.scrollRestoration
     * info](https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration).
     */
    abstract setHistoryScrollRestoration(scrollRestoration: 'auto' | 'manual'): void;
}
/**
 * Provides an empty implementation of the viewport scroller.
 */
declare class NullViewportScroller implements ViewportScroller {
    /**
     * Empty implementation
     */
    setOffset(offset: [number, number] | (() => [number, number])): void;
    /**
     * Empty implementation
     */
    getScrollPosition(): [number, number];
    /**
     * Empty implementation
     */
    scrollToPosition(position: [number, number]): void;
    /**
     * Empty implementation
     */
    scrollToAnchor(anchor: string): void;
    /**
     * Empty implementation
     */
    setHistoryScrollRestoration(scrollRestoration: 'auto' | 'manual'): void;
}

/**
 * Function that generates an ImageLoader for [Cloudflare Image
 * Resizing](https://developers.cloudflare.com/images/image-resizing/) and turns it into an Angular
 * provider. Note: Cloudflare has multiple image products - this provider is specifically for
 * Cloudflare Image Resizing; it will not work with Cloudflare Images or Cloudflare Polish.
 *
 * @param path Your domain name, e.g. https://mysite.com
 * @returns Provider that provides an ImageLoader function
 *
 * @publicApi
 */
declare const provideCloudflareLoader: (path: string) => Provider[];

/**
 * Config options recognized by the image loader function.
 *
 * @see {@link ImageLoader}
 * @see {@link NgOptimizedImage}
 * @publicApi
 */
interface ImageLoaderConfig {
    /**
     * Image file name to be added to the image request URL.
     */
    src: string;
    /**
     * Width of the requested image (to be used when generating srcset).
     */
    width?: number;
    /**
     * Whether the loader should generate a URL for a small image placeholder instead of a full-sized
     * image.
     */
    isPlaceholder?: boolean;
    /**
     * Additional user-provided parameters for use by the ImageLoader.
     */
    loaderParams?: {
        [key: string]: any;
    };
}
/**
 * Represents an image loader function. Image loader functions are used by the
 * NgOptimizedImage directive to produce full image URL based on the image name and its width.
 *
 * @publicApi
 */
type ImageLoader = (config: ImageLoaderConfig) => string;
/**
 * Injection token that configures the image loader function.
 *
 * @see {@link ImageLoader}
 * @see {@link NgOptimizedImage}
 * @publicApi
 */
declare const IMAGE_LOADER: InjectionToken<ImageLoader>;

/**
 * Function that generates an ImageLoader for Cloudinary and turns it into an Angular provider.
 *
 * @param path Base URL of your Cloudinary images
 * This URL should match one of the following formats:
 * https://res.cloudinary.com/mysite
 * https://mysite.cloudinary.com
 * https://subdomain.mysite.com
 * @returns Set of providers to configure the Cloudinary loader.
 *
 * @publicApi
 */
declare const provideCloudinaryLoader: (path: string) => Provider[];

/**
 * Function that generates an ImageLoader for ImageKit and turns it into an Angular provider.
 *
 * @param path Base URL of your ImageKit images
 * This URL should match one of the following formats:
 * https://ik.imagekit.io/myaccount
 * https://subdomain.mysite.com
 * @returns Set of providers to configure the ImageKit loader.
 *
 * @publicApi
 */
declare const provideImageKitLoader: (path: string) => Provider[];

/**
 * Function that generates an ImageLoader for Imgix and turns it into an Angular provider.
 *
 * @param path path to the desired Imgix origin,
 * e.g. https://somepath.imgix.net or https://images.mysite.com
 * @returns Set of providers to configure the Imgix loader.
 *
 * @publicApi
 */
declare const provideImgixLoader: (path: string) => Provider[];

/**
 * Function that generates an ImageLoader for Netlify and turns it into an Angular provider.
 *
 * @param path optional URL of the desired Netlify site. Defaults to the current site.
 * @returns Set of providers to configure the Netlify loader.
 *
 * @publicApi
 */
declare function provideNetlifyLoader(path?: string): Provider[];

/**
 * Config options used in rendering placeholder images.
 *
 * @see {@link NgOptimizedImage}
 * @publicApi
 */
interface ImagePlaceholderConfig {
    blur?: boolean;
}
/**
 * Directive that improves image loading performance by enforcing best practices.
 *
 * `NgOptimizedImage` ensures that the loading of the Largest Contentful Paint (LCP) image is
 * prioritized by:
 * - Automatically setting the `fetchpriority` attribute on the `<img>` tag
 * - Lazy loading non-priority images by default
 * - Automatically generating a preconnect link tag in the document head
 *
 * In addition, the directive:
 * - Generates appropriate asset URLs if a corresponding `ImageLoader` function is provided
 * - Automatically generates a srcset
 * - Requires that `width` and `height` are set
 * - Warns if `width` or `height` have been set incorrectly
 * - Warns if the image will be visually distorted when rendered
 *
 * @usageNotes
 * The `NgOptimizedImage` directive is marked as [standalone](guide/components/importing) and can
 * be imported directly.
 *
 * Follow the steps below to enable and use the directive:
 * 1. Import it into the necessary NgModule or a standalone Component.
 * 2. Optionally provide an `ImageLoader` if you use an image hosting service.
 * 3. Update the necessary `<img>` tags in templates and replace `src` attributes with `ngSrc`.
 * Using a `ngSrc` allows the directive to control when the `src` gets set, which triggers an image
 * download.
 *
 * Step 1: import the `NgOptimizedImage` directive.
 *
 * ```ts
 * import { NgOptimizedImage } from '@angular/common';
 *
 * // Include it into the necessary NgModule
 * @NgModule({
 *   imports: [NgOptimizedImage],
 * })
 * class AppModule {}
 *
 * // ... or a standalone Component
 * @Component({
 *   imports: [NgOptimizedImage],
 * })
 * class MyStandaloneComponent {}
 * ```
 *
 * Step 2: configure a loader.
 *
 * To use the **default loader**: no additional code changes are necessary. The URL returned by the
 * generic loader will always match the value of "src". In other words, this loader applies no
 * transformations to the resource URL and the value of the `ngSrc` attribute will be used as is.
 *
 * To use an existing loader for a **third-party image service**: add the provider factory for your
 * chosen service to the `providers` array. In the example below, the Imgix loader is used:
 *
 * ```ts
 * import {provideImgixLoader} from '@angular/common';
 *
 * // Call the function and add the result to the `providers` array:
 * providers: [
 *   provideImgixLoader("https://my.base.url/"),
 * ],
 * ```
 *
 * The `NgOptimizedImage` directive provides the following functions:
 * - `provideCloudflareLoader`
 * - `provideCloudinaryLoader`
 * - `provideImageKitLoader`
 * - `provideImgixLoader`
 *
 * If you use a different image provider, you can create a custom loader function as described
 * below.
 *
 * To use a **custom loader**: provide your loader function as a value for the `IMAGE_LOADER` DI
 * token.
 *
 * ```ts
 * import {IMAGE_LOADER, ImageLoaderConfig} from '@angular/common';
 *
 * // Configure the loader using the `IMAGE_LOADER` token.
 * providers: [
 *   {
 *      provide: IMAGE_LOADER,
 *      useValue: (config: ImageLoaderConfig) => {
 *        return `https://example.com/${config.src}-${config.width}.jpg`;
 *      }
 *   },
 * ],
 * ```
 *
 * Step 3: update `<img>` tags in templates to use `ngSrc` instead of `src`.
 *
 * ```html
 * <img ngSrc="logo.png" width="200" height="100">
 * ```
 *
 * @publicApi
 */
declare class NgOptimizedImage implements OnInit, OnChanges {
    private imageLoader;
    private config;
    private renderer;
    private imgElement;
    private injector;
    private lcpObserver?;
    /**
     * Calculate the rewritten `src` once and store it.
     * This is needed to avoid repetitive calculations and make sure the directive cleanup in the
     * `ngOnDestroy` does not rely on the `IMAGE_LOADER` logic (which in turn can rely on some other
     * instance that might be already destroyed).
     */
    private _renderedSrc;
    /**
     * Name of the source image.
     * Image name will be processed by the image loader and the final URL will be applied as the `src`
     * property of the image.
     */
    ngSrc: string;
    /**
     * A comma separated list of width or density descriptors.
     * The image name will be taken from `ngSrc` and combined with the list of width or density
     * descriptors to generate the final `srcset` property of the image.
     *
     * Example:
     * ```html
     * <img ngSrc="hello.jpg" ngSrcset="100w, 200w" />  =>
     * <img src="path/hello.jpg" srcset="path/hello.jpg?w=100 100w, path/hello.jpg?w=200 200w" />
     * ```
     */
    ngSrcset: string;
    /**
     * The base `sizes` attribute passed through to the `<img>` element.
     * Providing sizes causes the image to create an automatic responsive srcset.
     */
    sizes?: string;
    /**
     * For responsive images: the intrinsic width of the image in pixels.
     * For fixed size images: the desired rendered width of the image in pixels.
     */
    width: number | undefined;
    /**
     * For responsive images: the intrinsic height of the image in pixels.
     * For fixed size images: the desired rendered height of the image in pixels.
     */
    height: number | undefined;
    /**
     * The desired loading behavior (lazy, eager, or auto). Defaults to `lazy`,
     * which is recommended for most images.
     *
     * Warning: Setting images as loading="eager" or loading="auto" marks them
     * as non-priority images and can hurt loading performance. For images which
     * may be the LCP element, use the `priority` attribute instead of `loading`.
     */
    loading?: 'lazy' | 'eager' | 'auto';
    /**
     * Indicates whether this image should have a high priority.
     */
    priority: boolean;
    /**
     * Data to pass through to custom loaders.
     */
    loaderParams?: {
        [key: string]: any;
    };
    /**
     * Disables automatic srcset generation for this image.
     */
    disableOptimizedSrcset: boolean;
    /**
     * Sets the image to "fill mode", which eliminates the height/width requirement and adds
     * styles such that the image fills its containing element.
     */
    fill: boolean;
    /**
     * A URL or data URL for an image to be used as a placeholder while this image loads.
     */
    placeholder?: string | boolean;
    /**
     * Configuration object for placeholder settings. Options:
     *   * blur: Setting this to false disables the automatic CSS blur.
     */
    placeholderConfig?: ImagePlaceholderConfig;
    constructor();
    /** @docs-private */
    ngOnInit(): void;
    private setHostAttributes;
    /** @docs-private */
    ngOnChanges(changes: SimpleChanges): void;
    private callImageLoader;
    private getLoadingBehavior;
    private getFetchPriority;
    private getRewrittenSrc;
    private getRewrittenSrcset;
    private getAutomaticSrcset;
    private getResponsiveSrcset;
    private updateSrcAndSrcset;
    private getFixedSrcset;
    private shouldGenerateAutomaticSrcset;
    /**
     * Returns an image url formatted for use with the CSS background-image property. Expects one of:
     * * A base64 encoded image, which is wrapped and passed through.
     * * A boolean. If true, calls the image loader to generate a small placeholder url.
     */
    protected generatePlaceholder(placeholderInput: string | boolean): string | boolean | null;
    /**
     * Determines if blur should be applied, based on an optional boolean
     * property `blur` within the optional configuration object `placeholderConfig`.
     */
    protected shouldBlurPlaceholder(placeholderConfig?: ImagePlaceholderConfig): boolean;
    private removePlaceholderOnLoad;
    private setHostAttribute;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgOptimizedImage, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgOptimizedImage, "img[ngSrc]", never, { "ngSrc": { "alias": "ngSrc"; "required": true; }; "ngSrcset": { "alias": "ngSrcset"; "required": false; }; "sizes": { "alias": "sizes"; "required": false; }; "width": { "alias": "width"; "required": false; }; "height": { "alias": "height"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "priority": { "alias": "priority"; "required": false; }; "loaderParams": { "alias": "loaderParams"; "required": false; }; "disableOptimizedSrcset": { "alias": "disableOptimizedSrcset"; "required": false; }; "fill": { "alias": "fill"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "placeholderConfig": { "alias": "placeholderConfig"; "required": false; }; "src": { "alias": "src"; "required": false; }; "srcset": { "alias": "srcset"; "required": false; }; }, {}, never, never, true, never>;
    static ngAcceptInputType_ngSrc: string | i0.ɵSafeValue;
    static ngAcceptInputType_width: unknown;
    static ngAcceptInputType_height: unknown;
    static ngAcceptInputType_priority: unknown;
    static ngAcceptInputType_disableOptimizedSrcset: unknown;
    static ngAcceptInputType_fill: unknown;
    static ngAcceptInputType_placeholder: boolean | string;
}

/**
 * Injection token to configure which origins should be excluded
 * from the preconnect checks. It can either be a single string or an array of strings
 * to represent a group of origins, for example:
 *
 * ```ts
 *  {provide: PRECONNECT_CHECK_BLOCKLIST, useValue: 'https://your-domain.com'}
 * ```
 *
 * or:
 *
 * ```ts
 *  {provide: PRECONNECT_CHECK_BLOCKLIST,
 *   useValue: ['https://your-domain-1.com', 'https://your-domain-2.com']}
 * ```
 *
 * @publicApi
 */
declare const PRECONNECT_CHECK_BLOCKLIST: InjectionToken<(string | string[])[]>;

/**
 * Normalizes URL parameters by prepending with `?` if needed.
 *
 * @param  params String of URL parameters.
 *
 * @returns The normalized URL parameters string.
 */
declare function normalizeQueryParams(params: string): string;

export { FormStyle, FormatWidth, HashLocationStrategy, IMAGE_LOADER, LocationChangeListener, LocationStrategy, NgOptimizedImage, NumberFormatStyle, NumberSymbol, PRECONNECT_CHECK_BLOCKLIST, PlatformLocation, Plural, TranslationWidth, VERSION, ViewportScroller, WeekDay, formatCurrency, formatDate, formatNumber, formatPercent, getCurrencySymbol, getLocaleCurrencyCode, getLocaleCurrencyName, getLocaleCurrencySymbol, getLocaleDateFormat, getLocaleDateTimeFormat, getLocaleDayNames, getLocaleDayPeriods, getLocaleDirection, getLocaleEraNames, getLocaleExtraDayPeriodRules, getLocaleExtraDayPeriods, getLocaleFirstDayOfWeek, getLocaleId, getLocaleMonthNames, getLocaleNumberFormat, getLocaleNumberSymbol, getLocalePluralCase, getLocaleTimeFormat, getLocaleWeekEndRange, getNumberOfCurrencyDigits, isPlatformBrowser, isPlatformServer, provideCloudflareLoader, provideCloudinaryLoader, provideImageKitLoader, provideImgixLoader, provideNetlifyLoader, registerLocaleData, DomAdapter as ɵDomAdapter, NullViewportScroller as ɵNullViewportScroller, PLATFORM_BROWSER_ID as ɵPLATFORM_BROWSER_ID, PLATFORM_SERVER_ID as ɵPLATFORM_SERVER_ID, PlatformNavigation as ɵPlatformNavigation, getDOM as ɵgetDOM, normalizeQueryParams as ɵnormalizeQueryParams, parseCookieValue as ɵparseCookieValue, setRootDomAdapter as ɵsetRootDomAdapter };
export type { ImageLoader, ImageLoaderConfig, ImagePlaceholderConfig, Time };
