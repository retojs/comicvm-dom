import { DomElementContainer, DomElement } from "./DomElement";
import { Margin } from "@comicvm-geometry-2d/Margin";
import { Input, InputDomElementConfig } from "./Input";

import { fromEvent, interval } from 'rxjs';
import { tap, switchMap, takeUntil, filter, map, debounce, debounceTime } from 'rxjs/operators';

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
        //    this.setupKeyboardListeners(onKeyUp);
        this.setupKeyboardListenersRxJs(onKeyUp)
    }

    get value(): string {
        return this.input.htmlElement.value;
    }

    set value(value: string) {
        this.input.htmlElement.value = value;
    }

    focus() {
        this.input.focus();
    }

    setupKeyboardListenersRxJs(onChange: ParameterListener<string>) {
        let isCtrlPressed = false;
        this.input.onKeyDown$.subscribe(e => {
            isCtrlPressed = e.code === "Ctrl";
            e.preventDefault();
            console.log('ctrl pressed', isCtrlPressed);
        })
        this.input.onKeyUp$.subscribe(e => {
            isCtrlPressed = !(e.code === "Ctrl");
            e.preventDefault();
            console.log('ctrl pressed', isCtrlPressed);
        })

        let isKeydown = false;
        this.input.onKeyUp$.subscribe(() => isKeydown = false);
        this.input.onKeyDown$.pipe(

            // If you keep a key pressed, many keyboard events are emitted,
            // but we are only interested in the first one. 
            filter(() => !isKeydown),
            tap(() => isKeydown = true),
            // We are only interested in arrow keys.
            filter((e) => isArrowKeyPressed(e)),
            tap((e: KeyboardEvent) => e.preventDefault()),
            debounceTime(300),
            // start emitting events in regular intervals...
            switchMap(e => interval(ARROW_KEY_CONFIG.repeatInterval).pipe(
                // until the key is not pressed anymore.
                takeUntil(this.input.onKeyUp$),
                map(i => e),
            )
            ),
        ).subscribe(e => {
            this.value = this.getIncrementedValue(e, isCtrlPressed);
            console.log('new value', this.value);
            console.log('ctrl pressed', isCtrlPressed);
            onChange(this.value);
        });


    }


    /**
     * Feature:
     *
     *   * Keeping any of the arrow keys pressed should increase or decrease the parameter value in a regular speed.
     *   * The increment should match the incremented value to get a smooth increase
     *      i.e. the increment should be reasonably small relative to the current value
     *   * Pressing the CTRL key should produce a faster increase.
     *
     * Concept of Implementation:
     *
     *   - the flag isRepeatingKeyDown indicates if a regular increment is in progress
     *   - on keydown
     *      - this flag is set to true
     *      - the method startRepeatKeyDown starts a loop calling repeatKeyDown in each iteration
     *   - on keyup
     *      - this flag is set to false
     *      - the method stopRepeatingKeyDown stops the loop
     *
     *   - In each step of the repeatKeyDown loop
     *      - the incremented value is calculated in the method getIncrementedValue.
     *      - the increment size depends on
     *          - the arrow key (up/right = increase, down/left = decrease)
     *          - the Ctrl key (larger increment if Ctrl is pressed)
     *          - the current value (smaller increment if value is smaller than Config.isSmallValue())
     *      - the incremented value is passed to the change listener
     *      - the next iteration is initiated if looping has not been stopped through the flag mentioned above.
     *
     * @param onChange: the change listener to be notified of a new value
     */

    private lastKeyUp: number;
    private arrowKeyTimeoutId: any;
    private isRepeatingKeyDown = false;

    setupKeyboardListeners(onChange: ParameterListener<string>) {
        this.input.onKeyDown = (event: KeyboardEvent) => {
            if (isArrowKeyPressed(event) && !this.isRepeatingKeyDown) {
                this.startRepeatingKeyDown(event, onChange);
            }
        };
        this.input.onKeyUp = (event: KeyboardEvent) => {
            if (this.isRepeatingKeyDown) {
                this.stopRepeatingKeyDown();
                this.value = this.getIncrementedValue(event, event.code === "Ctrl");
                onChange(this.value);
            } else {
                this.getDebounced(onChange)(event);
            }
        }
    }

    startRepeatingKeyDown(event: KeyboardEvent, onChange: ParameterListener<string>) {
        this.isRepeatingKeyDown = true;
        this.arrowKeyTimeoutId = setTimeout(
            () => this.repeatKeyDown(event, onChange),
            ARROW_KEY_CONFIG.debounceInterval
        );
    }

    stopRepeatingKeyDown() {
        this.isRepeatingKeyDown = false;
        this.stopArrowKeyTimeout();
    }

    stopArrowKeyTimeout() {
        clearTimeout(this.arrowKeyTimeoutId);
        this.arrowKeyTimeoutId = null;
    }

    repeatKeyDown(event: KeyboardEvent, onChange: ParameterListener<string>) {
        this.value = this.getIncrementedValue(event, event.code === "Ctrl");
        onChange(this.value);

        this.stopArrowKeyTimeout();
        if (this.isRepeatingKeyDown) {
            this.arrowKeyTimeoutId = setTimeout(
                () => this.repeatKeyDown(event, onChange),
                ARROW_KEY_CONFIG.repeatInterval
            );
        }
    }

    getIncrementedValue(event: KeyboardEvent, isCtrlPressed: boolean): string {
        if (!this.value) {
            return this.value;
        }
        const value = parseFloat(this.value);

        const incConfig = ARROW_KEY_CONFIG.isSmallValue(value)
            ? ARROW_KEY_CONFIG.smallValues
            : ARROW_KEY_CONFIG.largeValues;

        const inc = isCtrlPressed
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

    /**
     * Returns a debounced version of the specified change listener.
     * The debounced version only calls the change listener after the user has stopped typing for a certain amount of time.
     * @param onChange
     */
    getDebounced(onChange: ParameterListener<string>) {
        return (event: KeyboardEvent) => {
            if (!isArrowKeyPressed(event)) {
                this.lastKeyUp = Date.now();
                setTimeout(() => {
                    if (Date.now() >= this.lastKeyUp + ARROW_KEY_CONFIG.debounceInterval) {
                        onChange(this.value);
                    }
                }, ARROW_KEY_CONFIG.debounceInterval);
            }
        };
    }
}

function isArrowKeyPressed(event: KeyboardEvent) {
    return event.code === "ArrowUp" || event.code === "ArrowDown"
        || event.code === "ArrowLeft" || event.code === "ArrowRight"
}
