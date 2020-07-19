import {DomElement} from "./DomElement";
import {Input, InputDomElementConfig} from "./Input";
import {interval, of} from 'rxjs';
import {debounceTime, filter, map, switchMap, takeUntil, tap} from 'rxjs/operators';

export type ParameterListener<T> = (value: T) => void;

export interface ValueIncrementConfig {
    increment: number;
    incrementCtrlKey: number;
    fractionDigits: number;
}

export interface ArrowKeyConfig {
    repeatInterval: number;
    debounceInterval: number;
    smallValues: ValueIncrementConfig;
    largeValues: ValueIncrementConfig;
    isSmallValue: (n: number) => boolean;
}

export const ARROW_KEY_CONFIG: ArrowKeyConfig = {
    repeatInterval: 10,
    debounceInterval: 300,
    smallValues: {
        increment: 0.01,
        incrementCtrlKey: 0.05,
        fractionDigits: 2,
    },
    largeValues: {
        increment: 1,
        incrementCtrlKey: 5,
        fractionDigits: 0,
    },
    isSmallValue: (v: number) => v < 5,
}

export interface ArrowKeyInputDomElementConfig extends InputDomElementConfig {
    onKeyUp?: ParameterListener<string>;
}

export class ArrowKeyInput extends DomElement<HTMLSpanElement> {

    htmlElement: HTMLSpanElement;

    static create(config: ArrowKeyInputDomElementConfig) {
        return new ArrowKeyInput(
            Input.create(config),
            config.onKeyUp,
        );
    }

    constructor(
        protected input: Input,
        onKeyUp: ParameterListener<string>
    ) {
        super(null);
        this.htmlElement = document.createElement("span");
        this.htmlElement.appendChild(input.htmlElement);
        this.setupKeyboardListenersRxJs(onKeyUp)
    }

    get value(): string {
        return this.input.htmlElement.value;
    }

    set value(value: string) {
        this.input.htmlElement.value = value;
    }

    setupKeyboardListenersRxJs(onChange: ParameterListener<string>) {
        let isKeydown = false;

        const keyUp$ = this.input.onKeyUp$.pipe(
            filter((e) => isArrowKeyPressed(e)),
            tap(() => isKeydown = false),
        );

        const keyDown$ = this.input.onKeyDown$.pipe(
            filter((e) => isArrowKeyPressed(e)),
            tap((e: KeyboardEvent) => e.preventDefault()),
            // If you keep a key pressed, many keyboard events are emitted,
            // but we are only interested in the first one.
            filter(() => !isKeydown),
            tap(() => isKeydown = true),
            // after a short delay start emitting events in regular intervals...
            debounceTime(300),
            switchMap(e => {
                    if (isKeydown) {
                        return interval(ARROW_KEY_CONFIG.repeatInterval).pipe(
                            // until the key is not pressed anymore
                            takeUntil(this.input.onKeyUp$),
                            // emit the initial event object each time
                            map(i => e),
                        )
                    } else {
                        return of(undefined);
                    }
                }
            ),
        );

        const onInputChanged = e => {
            if (e) {
                this.value = this.getIncrementedValue(e);
                onChange(this.value);
            }
        }

        keyUp$.subscribe(onInputChanged);
        keyDown$.subscribe(onInputChanged);
    }

    focus() {
        this.input.focus();
    }

    getIncrementedValue(event: KeyboardEvent): string {
        if (!this.value) {
            return this.value;
        }
        const value = parseFloat(this.value);

        const incConfig = ARROW_KEY_CONFIG.isSmallValue(value)
            ? ARROW_KEY_CONFIG.smallValues
            : ARROW_KEY_CONFIG.largeValues;

        const inc = event.ctrlKey
            ? incConfig.incrementCtrlKey
            : incConfig.increment;

        if (typeof value === "number") {
            switch (event.code) {
                case "ArrowUp":
                case "ArrowRight":
                    return "" + (value + inc).toFixed(incConfig.fractionDigits);
                case "ArrowDown":
                case "ArrowLeft":
                    return "" + (value - inc).toFixed(incConfig.fractionDigits);
                default:
                    return this.value;
            }
        } else {
            return this.value;
        }
    }
}

function isArrowKeyPressed(event: KeyboardEvent) {
    return event.code === "ArrowUp" || event.code === "ArrowDown"
        || event.code === "ArrowLeft" || event.code === "ArrowRight"
}
