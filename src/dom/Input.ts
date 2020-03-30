import { DomElement, DomElementContainer, DomElementConfig, StyleClassConfig } from "./DomElement";

export const enum InputType {
    TEXT = "text",
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

    domElement: HTMLInputElement;
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
        this.domElement.type = type;
        this.domElement.name = name;
        this.domElement.value = value || "";
        this.domElement.placeholder = placeholder;
        this.class = styleClass;
    }

    protected createInputElement(): HTMLInputElement {
        return this.domElement = this.appendToContainer(document.createElement("input"));
    }

    get value() {
        return this.domElement.value;
    }
}
