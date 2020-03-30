import { DomElement, DomElementContainer, DomElementConfig, StyleClassConfig } from "./DomElement";

export interface TextAreaDomElementConfig extends DomElementConfig, StyleClassConfig {
    cols?: number,
    rows?: number,
    text?: string
}

export class TextArea extends DomElement<HTMLTextAreaElement> {

    domElement: HTMLTextAreaElement;

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
        this.domElement = this.createTextAreaElement();
        this.domElement.cols = cols != null ? cols : 1;
        this.domElement.rows = rows != null ? rows : 1;
        this.text = text;
        this.class = styleClass;
    }

    protected createTextAreaElement(): HTMLTextAreaElement {
        return this.domElement = this.appendToContainer(document.createElement("textarea"));
    }

    set text(text: string) {
        this.domElement.innerText = text || "";
    }
}