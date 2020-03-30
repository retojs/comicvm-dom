import { DomElement, DomElementContainer, DomElementConfig, StyleClassConfig } from "./DomElement";

export interface LabelDomElementConfig extends DomElementConfig, StyleClassConfig {
    text?: string;
    htmlFor?: string;
}

export class Label extends DomElement<HTMLLabelElement> {

    domElement: HTMLLabelElement;

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
        this.domElement = this.createLabelElement();
        this.text = text;
        if (htmlFor) {
            this.domElement.htmlFor = htmlFor;
        }
        this.class = styleClass;
    }

    protected createLabelElement(): HTMLLabelElement {
        return this.domElement = this.appendToContainer(document.createElement("label"));
    }

    set text(text: string) {
        this.domElement.innerText = text || "";
    }
}