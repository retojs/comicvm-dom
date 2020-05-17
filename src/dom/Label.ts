import { DomElement, DomElementContainer, DomElementConfig, StyleClassConfig } from "./DomElement";

export interface LabelDomElementConfig extends DomElementConfig, StyleClassConfig {
    text?: string;
    htmlFor?: string;
}

export class Label extends DomElement<HTMLLabelElement> {

    htmlElement: HTMLLabelElement;

    public static create(config?: LabelDomElementConfig) {
        return config
            ? new Label(config.container, config.text, config.htmlFor, config.styleClass)
            : new Label();
    }

    constructor(
        container?: DomElementContainer,
        text?: string,
        htmlFor?: string,
        styleClass?: string,
    ) {
        super(container);
        this.htmlElement = this.createLabelElement();
        this.text = text;
        if (htmlFor) {
            this.htmlElement.htmlFor = htmlFor;
        }
        this.class = styleClass;
    }

    protected createLabelElement(): HTMLLabelElement {
        return this.htmlElement = this.appendToContainer(document.createElement("label"));
    }

    set text(text: string) {
        this.htmlElement.innerText = text || "";
    }
}