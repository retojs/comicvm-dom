import { DomElement, DomElementContainer, DomElementConfig, DomElementContent, StyleClassConfig } from "./DomElement";

export interface DivDomElementConfig extends DomElementConfig, StyleClassConfig { }

export class Div extends DomElement<HTMLDivElement> {

    htmlElement: HTMLDivElement;

    public static create(config?: DivDomElementConfig): Div {
        return config
            ? new Div(config.container, config.styleClass)
            : new Div();
    }

    constructor(
        container?: DomElementContainer,
        styleClass?: string,
    ) {
        super(container);
        this.htmlElement = this.appendToContainer(this.createDivElement(styleClass));
        this.class = styleClass;
    }

    protected createDivElement(styleClass: string): HTMLDivElement {
        return this.htmlElement = document.createElement("div");
    }
}