import * as i0 from '@angular/core';
import { Service, inject, LOCALE_ID, forwardRef, Input, ChangeDetectionStrategy, ViewEncapsulation, Component, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { toInteger, isNumber, isInteger, padNumber } from './_ngb-ngbootstrap-utilities.mjs';
import { formatDate } from '@angular/common';

class NgbTime {
    constructor(hour, minute, second) {
        this.hour = toInteger(hour);
        this.minute = toInteger(minute);
        this.second = toInteger(second);
    }
    changeHour(step = 1) {
        this.updateHour((isNaN(this.hour) ? 0 : this.hour) + step);
    }
    updateHour(hour) {
        if (isNumber(hour)) {
            this.hour = (hour < 0 ? 24 + hour : hour) % 24;
        }
        else {
            this.hour = NaN;
        }
    }
    changeMinute(step = 1) {
        this.updateMinute((isNaN(this.minute) ? 0 : this.minute) + step);
    }
    updateMinute(minute) {
        if (isNumber(minute)) {
            this.minute = minute % 60 < 0 ? 60 + (minute % 60) : minute % 60;
            this.changeHour(Math.floor(minute / 60));
        }
        else {
            this.minute = NaN;
        }
    }
    changeSecond(step = 1) {
        this.updateSecond((isNaN(this.second) ? 0 : this.second) + step);
    }
    updateSecond(second) {
        if (isNumber(second)) {
            this.second = second < 0 ? 60 + (second % 60) : second % 60;
            this.changeMinute(Math.floor(second / 60));
        }
        else {
            this.second = NaN;
        }
    }
    isValid(checkSecs = true) {
        return isNumber(this.hour) && isNumber(this.minute) && (checkSecs ? isNumber(this.second) : true);
    }
    toString() {
        return `${this.hour || 0}:${this.minute || 0}:${this.second || 0}`;
    }
}

/**
 * A configuration service for the [`NgbTimepicker`](#/components/timepicker/api#NgbTimepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the timepickers used in the application.
 */
class NgbTimepickerConfig {
    constructor() {
        this.meridian = false;
        this.spinners = true;
        this.seconds = false;
        this.hourStep = 1;
        this.minuteStep = 1;
        this.secondStep = 1;
        this.disabled = false;
        this.readonlyInputs = false;
        this.size = 'medium';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTimepickerConfig, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbTimepickerConfig }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTimepickerConfig, decorators: [{
            type: Service
        }] });

function NGB_DATEPICKER_TIME_ADAPTER_FACTORY() {
    return new NgbTimeStructAdapter();
}
/**
 * An abstract service that does the conversion between the internal timepicker `NgbTimeStruct` model and
 * any provided user time model `T`, ex. a string, a native date, etc.
 *
 * The adapter is used **only** for conversion when binding timepicker to a form control,
 * ex. `[(ngModel)]="userTimeModel"`. Here `userTimeModel` can be of any type.
 *
 * The default timepicker implementation assumes we use `NgbTimeStruct` as a user model.
 *
 * See the [custom time adapter demo](#/components/timepicker/examples#adapter) for an example.
 *
 * @since 2.2.0
 */
class NgbTimeAdapter {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTimeAdapter, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbTimeAdapter, factory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTimeAdapter, decorators: [{
            type: Service,
            args: [{ factory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY }]
        }] });
class NgbTimeStructAdapter extends NgbTimeAdapter {
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     */
    fromModel(time) {
        return time && isInteger(time.hour) && isInteger(time.minute)
            ? { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null }
            : null;
    }
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     */
    toModel(time) {
        return time && isInteger(time.hour) && isInteger(time.minute)
            ? { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null }
            : null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTimeStructAdapter, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbTimeStructAdapter, autoProvided: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTimeStructAdapter, decorators: [{
            type: Service,
            args: [{ autoProvided: false }]
        }] });

/**
 * Type of the service supplying day periods (for example, 'AM' and 'PM') to NgbTimepicker component.
 * The default implementation of this service honors the Angular locale, and uses the registered locale data,
 * as explained in the Angular i18n guide.
 */
class NgbTimepickerI18n {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTimepickerI18n, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbTimepickerI18n, factory: () => new NgbTimepickerI18nDefault() }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTimepickerI18n, decorators: [{
            type: Service,
            args: [{
                    factory: () => new NgbTimepickerI18nDefault(),
                }]
        }] });
class NgbTimepickerI18nDefault extends NgbTimepickerI18n {
    constructor() {
        super(...arguments);
        this._locale = inject(LOCALE_ID);
        this._periods = [
            formatDate(new Date(3600000), 'a', this._locale, 'UTC'),
            formatDate(new Date(3600000 * 13), 'a', this._locale, 'UTC'),
        ];
    }
    getMorningPeriod() {
        return this._periods[0];
    }
    getAfternoonPeriod() {
        return this._periods[1];
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTimepickerI18nDefault, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbTimepickerI18nDefault, autoProvided: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTimepickerI18nDefault, decorators: [{
            type: Service,
            args: [{ autoProvided: false }]
        }] });

const FILTER_REGEX = /[^0-9]/g;
/**
 * A directive that helps with wth picking hours, minutes and seconds.
 */
class NgbTimepicker {
    /**
     * The number of hours to add/subtract when clicking hour spinners.
     */
    set hourStep(step) {
        this._hourStep = isInteger(step) ? step : this._config.hourStep;
    }
    get hourStep() {
        return this._hourStep;
    }
    /**
     * The number of minutes to add/subtract when clicking minute spinners.
     */
    set minuteStep(step) {
        this._minuteStep = isInteger(step) ? step : this._config.minuteStep;
    }
    get minuteStep() {
        return this._minuteStep;
    }
    /**
     * The number of seconds to add/subtract when clicking second spinners.
     */
    set secondStep(step) {
        this._secondStep = isInteger(step) ? step : this._config.secondStep;
    }
    get secondStep() {
        return this._secondStep;
    }
    constructor(_config, _ngbTimeAdapter, _cd, i18n) {
        this._config = _config;
        this._ngbTimeAdapter = _ngbTimeAdapter;
        this._cd = _cd;
        this.i18n = i18n;
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this.meridian = _config.meridian;
        this.spinners = _config.spinners;
        this.seconds = _config.seconds;
        this.hourStep = _config.hourStep;
        this.minuteStep = _config.minuteStep;
        this.secondStep = _config.secondStep;
        this.disabled = _config.disabled;
        this.readonlyInputs = _config.readonlyInputs;
        this.size = _config.size;
    }
    writeValue(value) {
        const structValue = this._ngbTimeAdapter.fromModel(value);
        this.model = structValue ? new NgbTime(structValue.hour, structValue.minute, structValue.second) : new NgbTime();
        if (!this.seconds && (!structValue || !isNumber(structValue.second))) {
            this.model.second = 0;
        }
        this._cd.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * Increments the hours by the given step.
     */
    changeHour(step) {
        this.model?.changeHour(step);
        this.propagateModelChange();
    }
    /**
     * Increments the minutes by the given step.
     */
    changeMinute(step) {
        this.model?.changeMinute(step);
        this.propagateModelChange();
    }
    /**
     * Increments the seconds by the given step.
     */
    changeSecond(step) {
        this.model?.changeSecond(step);
        this.propagateModelChange();
    }
    /**
     * Update hours with the new value.
     */
    updateHour(newVal) {
        const isPM = this.model ? this.model.hour >= 12 : false;
        const enteredHour = toInteger(newVal);
        if (this.meridian && ((isPM && enteredHour < 12) || (!isPM && enteredHour === 12))) {
            this.model?.updateHour(enteredHour + 12);
        }
        else {
            this.model?.updateHour(enteredHour);
        }
        this.propagateModelChange();
    }
    /**
     * Update minutes with the new value.
     */
    updateMinute(newVal) {
        this.model?.updateMinute(toInteger(newVal));
        this.propagateModelChange();
    }
    /**
     * Update seconds with the new value.
     */
    updateSecond(newVal) {
        this.model?.updateSecond(toInteger(newVal));
        this.propagateModelChange();
    }
    toggleMeridian() {
        if (this.model && isNumber(this.model.hour) && this.meridian) {
            this.changeHour(12);
        }
    }
    formatInput(input) {
        input.value = input.value.replace(FILTER_REGEX, '');
    }
    formatHour(value) {
        if (isNumber(value)) {
            if (this.meridian) {
                return padNumber(value % 12 === 0 ? 12 : value % 12);
            }
            else {
                return padNumber(value % 24);
            }
        }
        else {
            return padNumber(NaN);
        }
    }
    formatMinSec(value) {
        return padNumber(isNumber(value) ? value : NaN);
    }
    handleBlur() {
        this.onTouched();
    }
    get isSmallSize() {
        return this.size === 'small';
    }
    get isLargeSize() {
        return this.size === 'large';
    }
    ngOnChanges(changes) {
        if (changes['seconds'] && !this.seconds && this.model && !isNumber(this.model.second)) {
            this.model.second = 0;
            this.propagateModelChange(false);
        }
    }
    propagateModelChange(touched = true) {
        if (touched) {
            this.onTouched();
        }
        if (this.model?.isValid(this.seconds)) {
            this.onChange(this._ngbTimeAdapter.toModel({ hour: this.model.hour, minute: this.model.minute, second: this.model.second }));
        }
        else {
            this.onChange(this._ngbTimeAdapter.toModel(null));
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTimepicker, deps: [{ token: NgbTimepickerConfig }, { token: NgbTimeAdapter }, { token: i0.ChangeDetectorRef }, { token: NgbTimepickerI18n }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.1", type: NgbTimepicker, isStandalone: true, selector: "ngb-timepicker", inputs: { meridian: "meridian", spinners: "spinners", seconds: "seconds", hourStep: "hourStep", minuteStep: "minuteStep", secondStep: "secondStep", readonlyInputs: "readonlyInputs", size: "size" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbTimepicker), multi: true }], exportAs: ["ngbTimepicker"], usesOnChanges: true, ngImport: i0, template: `
		<fieldset [disabled]="disabled" [class.disabled]="disabled">
			<div class="ngb-tp">
				<div class="ngb-tp-input-container ngb-tp-hour">
					@if (spinners) {
						<button
							tabindex="-1"
							type="button"
							(click)="changeHour(hourStep)"
							class="btn btn-link"
							[class.btn-sm]="isSmallSize"
							[class.btn-lg]="isLargeSize"
							[class.disabled]="disabled"
							[disabled]="disabled"
						>
							<span class="chevron ngb-tp-chevron"></span>
							<span class="visually-hidden" i18n="@@ngb.timepicker.increment-hours">Increment hours</span>
						</button>
					}
					<input
						type="text"
						class="ngb-tp-input form-control"
						[class.form-control-sm]="isSmallSize"
						[class.form-control-lg]="isLargeSize"
						maxlength="2"
						inputmode="numeric"
						placeholder="HH"
						i18n-placeholder="@@ngb.timepicker.HH"
						[value]="formatHour($safeNavigationMigration(model?.hour))"
						(change)="updateHour($any($event).target.value)"
						[readOnly]="readonlyInputs"
						[disabled]="disabled"
						aria-label="Hours"
						i18n-aria-label="@@ngb.timepicker.hours"
						(blur)="handleBlur()"
						(input)="formatInput($any($event).target)"
						(keydown.ArrowUp)="changeHour(hourStep); $event.preventDefault()"
						(keydown.ArrowDown)="changeHour(-hourStep); $event.preventDefault()"
					/>
					@if (spinners) {
						<button
							tabindex="-1"
							type="button"
							(click)="changeHour(-hourStep)"
							class="btn btn-link"
							[class.btn-sm]="isSmallSize"
							[class.btn-lg]="isLargeSize"
							[class.disabled]="disabled"
							[disabled]="disabled"
						>
							<span class="chevron ngb-tp-chevron bottom"></span>
							<span class="visually-hidden" i18n="@@ngb.timepicker.decrement-hours">Decrement hours</span>
						</button>
					}
				</div>
				<div class="ngb-tp-spacer">:</div>
				<div class="ngb-tp-input-container ngb-tp-minute">
					@if (spinners) {
						<button
							tabindex="-1"
							type="button"
							(click)="changeMinute(minuteStep)"
							class="btn btn-link"
							[class.btn-sm]="isSmallSize"
							[class.btn-lg]="isLargeSize"
							[class.disabled]="disabled"
							[disabled]="disabled"
						>
							<span class="chevron ngb-tp-chevron"></span>
							<span class="visually-hidden" i18n="@@ngb.timepicker.increment-minutes">Increment minutes</span>
						</button>
					}
					<input
						type="text"
						class="ngb-tp-input form-control"
						[class.form-control-sm]="isSmallSize"
						[class.form-control-lg]="isLargeSize"
						maxlength="2"
						inputmode="numeric"
						placeholder="MM"
						i18n-placeholder="@@ngb.timepicker.MM"
						[value]="formatMinSec($safeNavigationMigration(model?.minute))"
						(change)="updateMinute($any($event).target.value)"
						[readOnly]="readonlyInputs"
						[disabled]="disabled"
						aria-label="Minutes"
						i18n-aria-label="@@ngb.timepicker.minutes"
						(blur)="handleBlur()"
						(input)="formatInput($any($event).target)"
						(keydown.ArrowUp)="changeMinute(minuteStep); $event.preventDefault()"
						(keydown.ArrowDown)="changeMinute(-minuteStep); $event.preventDefault()"
					/>
					@if (spinners) {
						<button
							tabindex="-1"
							type="button"
							(click)="changeMinute(-minuteStep)"
							class="btn btn-link"
							[class.btn-sm]="isSmallSize"
							[class.btn-lg]="isLargeSize"
							[class.disabled]="disabled"
							[disabled]="disabled"
						>
							<span class="chevron ngb-tp-chevron bottom"></span>
							<span class="visually-hidden" i18n="@@ngb.timepicker.decrement-minutes">Decrement minutes</span>
						</button>
					}
				</div>
				@if (seconds) {
					<div class="ngb-tp-spacer">:</div>
					<div class="ngb-tp-input-container ngb-tp-second">
						@if (spinners) {
							<button
								tabindex="-1"
								type="button"
								(click)="changeSecond(secondStep)"
								class="btn btn-link"
								[class.btn-sm]="isSmallSize"
								[class.btn-lg]="isLargeSize"
								[class.disabled]="disabled"
								[disabled]="disabled"
							>
								<span class="chevron ngb-tp-chevron"></span>
								<span class="visually-hidden" i18n="@@ngb.timepicker.increment-seconds">Increment seconds</span>
							</button>
						}
						<input
							type="text"
							class="ngb-tp-input form-control"
							[class.form-control-sm]="isSmallSize"
							[class.form-control-lg]="isLargeSize"
							maxlength="2"
							inputmode="numeric"
							placeholder="SS"
							i18n-placeholder="@@ngb.timepicker.SS"
							[value]="formatMinSec($safeNavigationMigration(model?.second))"
							(change)="updateSecond($any($event).target.value)"
							[readOnly]="readonlyInputs"
							[disabled]="disabled"
							aria-label="Seconds"
							i18n-aria-label="@@ngb.timepicker.seconds"
							(blur)="handleBlur()"
							(input)="formatInput($any($event).target)"
							(keydown.ArrowUp)="changeSecond(secondStep); $event.preventDefault()"
							(keydown.ArrowDown)="changeSecond(-secondStep); $event.preventDefault()"
						/>
						@if (spinners) {
							<button
								tabindex="-1"
								type="button"
								(click)="changeSecond(-secondStep)"
								class="btn btn-link"
								[class.btn-sm]="isSmallSize"
								[class.btn-lg]="isLargeSize"
								[class.disabled]="disabled"
								[disabled]="disabled"
							>
								<span class="chevron ngb-tp-chevron bottom"></span>
								<span class="visually-hidden" i18n="@@ngb.timepicker.decrement-seconds">Decrement seconds</span>
							</button>
						}
					</div>
				}
				@if (meridian) {
					<div class="ngb-tp-spacer"></div>
					<div class="ngb-tp-meridian">
						<button
							type="button"
							class="btn btn-outline-primary"
							[class.btn-sm]="isSmallSize"
							[class.btn-lg]="isLargeSize"
							[disabled]="disabled"
							[class.disabled]="disabled"
							(click)="toggleMeridian()"
						>
							@if (model && model.hour >= 12) {
								<ng-container i18n="@@ngb.timepicker.PM">{{ i18n.getAfternoonPeriod() }}</ng-container>
							} @else {
								<ng-container>{{ i18n.getMorningPeriod() }}</ng-container>
							}
						</button>
					</div>
				}
			</div>
		</fieldset>
	`, isInline: true, styles: ["ngb-timepicker{font-size:1rem}.ngb-tp{display:flex;align-items:center}.ngb-tp-input-container{width:4em}.ngb-tp-chevron:before{border-style:solid;border-width:.29em .29em 0 0;content:\"\";display:inline-block;height:.69em;left:.05em;position:relative;top:.15em;transform:rotate(-45deg);vertical-align:middle;width:.69em}.ngb-tp-chevron.bottom:before{top:-.3em;transform:rotate(135deg)}.ngb-tp-input{text-align:center}.ngb-tp-hour,.ngb-tp-minute,.ngb-tp-second,.ngb-tp-meridian{display:flex;flex-direction:column;align-items:center;justify-content:space-around}.ngb-tp-spacer{width:1em;text-align:center}\n"], changeDetection: i0.ChangeDetectionStrategy.Eager, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTimepicker, decorators: [{
            type: Component,
            args: [{ exportAs: 'ngbTimepicker', selector: 'ngb-timepicker', encapsulation: ViewEncapsulation.None, template: `
		<fieldset [disabled]="disabled" [class.disabled]="disabled">
			<div class="ngb-tp">
				<div class="ngb-tp-input-container ngb-tp-hour">
					@if (spinners) {
						<button
							tabindex="-1"
							type="button"
							(click)="changeHour(hourStep)"
							class="btn btn-link"
							[class.btn-sm]="isSmallSize"
							[class.btn-lg]="isLargeSize"
							[class.disabled]="disabled"
							[disabled]="disabled"
						>
							<span class="chevron ngb-tp-chevron"></span>
							<span class="visually-hidden" i18n="@@ngb.timepicker.increment-hours">Increment hours</span>
						</button>
					}
					<input
						type="text"
						class="ngb-tp-input form-control"
						[class.form-control-sm]="isSmallSize"
						[class.form-control-lg]="isLargeSize"
						maxlength="2"
						inputmode="numeric"
						placeholder="HH"
						i18n-placeholder="@@ngb.timepicker.HH"
						[value]="formatHour($safeNavigationMigration(model?.hour))"
						(change)="updateHour($any($event).target.value)"
						[readOnly]="readonlyInputs"
						[disabled]="disabled"
						aria-label="Hours"
						i18n-aria-label="@@ngb.timepicker.hours"
						(blur)="handleBlur()"
						(input)="formatInput($any($event).target)"
						(keydown.ArrowUp)="changeHour(hourStep); $event.preventDefault()"
						(keydown.ArrowDown)="changeHour(-hourStep); $event.preventDefault()"
					/>
					@if (spinners) {
						<button
							tabindex="-1"
							type="button"
							(click)="changeHour(-hourStep)"
							class="btn btn-link"
							[class.btn-sm]="isSmallSize"
							[class.btn-lg]="isLargeSize"
							[class.disabled]="disabled"
							[disabled]="disabled"
						>
							<span class="chevron ngb-tp-chevron bottom"></span>
							<span class="visually-hidden" i18n="@@ngb.timepicker.decrement-hours">Decrement hours</span>
						</button>
					}
				</div>
				<div class="ngb-tp-spacer">:</div>
				<div class="ngb-tp-input-container ngb-tp-minute">
					@if (spinners) {
						<button
							tabindex="-1"
							type="button"
							(click)="changeMinute(minuteStep)"
							class="btn btn-link"
							[class.btn-sm]="isSmallSize"
							[class.btn-lg]="isLargeSize"
							[class.disabled]="disabled"
							[disabled]="disabled"
						>
							<span class="chevron ngb-tp-chevron"></span>
							<span class="visually-hidden" i18n="@@ngb.timepicker.increment-minutes">Increment minutes</span>
						</button>
					}
					<input
						type="text"
						class="ngb-tp-input form-control"
						[class.form-control-sm]="isSmallSize"
						[class.form-control-lg]="isLargeSize"
						maxlength="2"
						inputmode="numeric"
						placeholder="MM"
						i18n-placeholder="@@ngb.timepicker.MM"
						[value]="formatMinSec($safeNavigationMigration(model?.minute))"
						(change)="updateMinute($any($event).target.value)"
						[readOnly]="readonlyInputs"
						[disabled]="disabled"
						aria-label="Minutes"
						i18n-aria-label="@@ngb.timepicker.minutes"
						(blur)="handleBlur()"
						(input)="formatInput($any($event).target)"
						(keydown.ArrowUp)="changeMinute(minuteStep); $event.preventDefault()"
						(keydown.ArrowDown)="changeMinute(-minuteStep); $event.preventDefault()"
					/>
					@if (spinners) {
						<button
							tabindex="-1"
							type="button"
							(click)="changeMinute(-minuteStep)"
							class="btn btn-link"
							[class.btn-sm]="isSmallSize"
							[class.btn-lg]="isLargeSize"
							[class.disabled]="disabled"
							[disabled]="disabled"
						>
							<span class="chevron ngb-tp-chevron bottom"></span>
							<span class="visually-hidden" i18n="@@ngb.timepicker.decrement-minutes">Decrement minutes</span>
						</button>
					}
				</div>
				@if (seconds) {
					<div class="ngb-tp-spacer">:</div>
					<div class="ngb-tp-input-container ngb-tp-second">
						@if (spinners) {
							<button
								tabindex="-1"
								type="button"
								(click)="changeSecond(secondStep)"
								class="btn btn-link"
								[class.btn-sm]="isSmallSize"
								[class.btn-lg]="isLargeSize"
								[class.disabled]="disabled"
								[disabled]="disabled"
							>
								<span class="chevron ngb-tp-chevron"></span>
								<span class="visually-hidden" i18n="@@ngb.timepicker.increment-seconds">Increment seconds</span>
							</button>
						}
						<input
							type="text"
							class="ngb-tp-input form-control"
							[class.form-control-sm]="isSmallSize"
							[class.form-control-lg]="isLargeSize"
							maxlength="2"
							inputmode="numeric"
							placeholder="SS"
							i18n-placeholder="@@ngb.timepicker.SS"
							[value]="formatMinSec($safeNavigationMigration(model?.second))"
							(change)="updateSecond($any($event).target.value)"
							[readOnly]="readonlyInputs"
							[disabled]="disabled"
							aria-label="Seconds"
							i18n-aria-label="@@ngb.timepicker.seconds"
							(blur)="handleBlur()"
							(input)="formatInput($any($event).target)"
							(keydown.ArrowUp)="changeSecond(secondStep); $event.preventDefault()"
							(keydown.ArrowDown)="changeSecond(-secondStep); $event.preventDefault()"
						/>
						@if (spinners) {
							<button
								tabindex="-1"
								type="button"
								(click)="changeSecond(-secondStep)"
								class="btn btn-link"
								[class.btn-sm]="isSmallSize"
								[class.btn-lg]="isLargeSize"
								[class.disabled]="disabled"
								[disabled]="disabled"
							>
								<span class="chevron ngb-tp-chevron bottom"></span>
								<span class="visually-hidden" i18n="@@ngb.timepicker.decrement-seconds">Decrement seconds</span>
							</button>
						}
					</div>
				}
				@if (meridian) {
					<div class="ngb-tp-spacer"></div>
					<div class="ngb-tp-meridian">
						<button
							type="button"
							class="btn btn-outline-primary"
							[class.btn-sm]="isSmallSize"
							[class.btn-lg]="isLargeSize"
							[disabled]="disabled"
							[class.disabled]="disabled"
							(click)="toggleMeridian()"
						>
							@if (model && model.hour >= 12) {
								<ng-container i18n="@@ngb.timepicker.PM">{{ i18n.getAfternoonPeriod() }}</ng-container>
							} @else {
								<ng-container>{{ i18n.getMorningPeriod() }}</ng-container>
							}
						</button>
					</div>
				}
			</div>
		</fieldset>
	`, changeDetection: ChangeDetectionStrategy.Eager, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbTimepicker), multi: true }], styles: ["ngb-timepicker{font-size:1rem}.ngb-tp{display:flex;align-items:center}.ngb-tp-input-container{width:4em}.ngb-tp-chevron:before{border-style:solid;border-width:.29em .29em 0 0;content:\"\";display:inline-block;height:.69em;left:.05em;position:relative;top:.15em;transform:rotate(-45deg);vertical-align:middle;width:.69em}.ngb-tp-chevron.bottom:before{top:-.3em;transform:rotate(135deg)}.ngb-tp-input{text-align:center}.ngb-tp-hour,.ngb-tp-minute,.ngb-tp-second,.ngb-tp-meridian{display:flex;flex-direction:column;align-items:center;justify-content:space-around}.ngb-tp-spacer{width:1em;text-align:center}\n"] }]
        }], ctorParameters: () => [{ type: NgbTimepickerConfig }, { type: NgbTimeAdapter }, { type: i0.ChangeDetectorRef }, { type: NgbTimepickerI18n }], propDecorators: { meridian: [{
                type: Input
            }], spinners: [{
                type: Input
            }], seconds: [{
                type: Input
            }], hourStep: [{
                type: Input
            }], minuteStep: [{
                type: Input
            }], secondStep: [{
                type: Input
            }], readonlyInputs: [{
                type: Input
            }], size: [{
                type: Input
            }] } });

class NgbTimepickerModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTimepickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "22.0.1", ngImport: i0, type: NgbTimepickerModule, imports: [NgbTimepicker], exports: [NgbTimepicker] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTimepickerModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTimepickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbTimepicker],
                    exports: [NgbTimepicker],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NgbTimeAdapter, NgbTimepicker, NgbTimepickerConfig, NgbTimepickerI18n, NgbTimepickerModule };
//# sourceMappingURL=ng-bootstrap-ng-bootstrap-timepicker.mjs.map
