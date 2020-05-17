import { DomElement, DomElementConfig, DomElementContainer, StyleClassConfig } from "./DomElement";

export const enum InputType {
    TEXT = "text",
    NUMBER = "number",
    BUTTON = "button",
    CHECKBOX = "checkbox",
    RADIO = "radio",
    DATE = "date",
    FILE = "file",
    COLOR = "color",
    RANGE = "range"
}

export interface InputDomElementConfig extends DomElementConfig, StyleClassConfig {
    type?: InputType | string;
    name?: string;
    value?: any;
    placeholder?: string;
}

export class Input extends DomElement<HTMLInputElement> {

    htmlElement: HTMLInputElement;
    static create(config?: InputDomElementConfig) {
        return config
            ? new Input(config.container, config.type, config.name, config.value, config.placeholder, config.styleClass)
            : new Input();
    }

    constructor(
        container?: DomElementContainer,
        type?: InputType | string,
        name?: string,
        value?: any,
        placeholder?: string,
        styleClass?: string,
    ) {
        super(container);
        this.createInputElement();
        this.htmlElement.type = type;
        this.htmlElement.name = name;
        this.htmlElement.value = value || "";
        this.htmlElement.placeholder = placeholder || "";
        this.class = styleClass;
    }

    protected createInputElement(): HTMLInputElement {
        return this.htmlElement = this.appendToContainer(document.createElement("input"));
    }

    get value() {
        return this.htmlElement.value;
    }
}
