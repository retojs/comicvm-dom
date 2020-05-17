import { DomElement, DomElementContainer, DomElementConfig, StyleClassConfig } from "./DomElement";

export interface TextAreaDomElementConfig extends DomElementConfig, StyleClassConfig {
    cols?: number,
    rows?: number,
    text?: string
}

export class TextArea extends DomElement<HTMLTextAreaElement> {

    htmlElement: HTMLTextAreaElement;

    public static create(config?: TextAreaDomElementConfig): TextArea {
        return config
            ? new TextArea(config.container, config.cols, config.rows, config.text, config.styleClass)
            : new TextArea();
    }

    constructor(
        container?: DomElementContainer,
        cols?: number,
        rows?: number,
        text?: string,
        styleClass?: string,
    ) {
        super(container);
        this.htmlElement = this.createTextAreaElement();
        this.htmlElement.cols = cols != null ? cols : 1;
        this.htmlElement.rows = rows != null ? rows : 1;
        this.text = text;
        this.class = styleClass;
    }

    protected createTextAreaElement(): HTMLTextAreaElement {
        return this.htmlElement = this.appendToContainer(document.createElement("textarea"));
    }

    set text(text: string) {
        this.htmlElement.innerText = text || "";
    }
}