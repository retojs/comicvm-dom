import { DomElement, DomElementConfig, DomElementContainer, StyleClassConfig } from "./DomElement";

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
        this.htmlElement = this.appendToContainer(this.createDivElement());
        this.class = styleClass;
    }

    protected createDivElement(): HTMLDivElement {
        return this.htmlElement = document.createElement("div");
    }
}