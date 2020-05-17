import { DomElement } from "./DomElement";
import { Input, InputDomElementConfig } from "./Input";
import { Label, LabelDomElementConfig } from "./Label";
import { ArrowKeyInput, ArrowKeyInputDomElementConfig } from "./ArowKeyInput";
import { requestInit } from "./requestInit";

export class InputWithLabel extends DomElement<HTMLSpanElement> {

    htmlElement: HTMLSpanElement;

    static create(config: InputDomElementConfig & LabelDomElementConfig) {
        return new InputWithLabel(
            Input.create(config),
            Label.create(config),
        );
    }

    static createArrowKeyInput(config: ArrowKeyInputDomElementConfig & LabelDomElementConfig) {
        return new InputWithLabel(
            ArrowKeyInput.create(config),
            Label.create(config),
        );
    }

    constructor(
        public input: Input | ArrowKeyInput,
        public label: Label,
    ) {
        super(null);
        this.htmlElement = document.createElement("span");
        this.htmlElement.appendChild(label.htmlElement);
        this.htmlElement.appendChild(input.htmlElement);
        requestInit(input.htmlElement);
    }

    get value() {
        return this.input.value;
    }

    set onInit(onInit: EventListener) {
        this.input.htmlElement.addEventListener("init", onInit);
    }

    focus() {
        this.input.focus();
    }
}