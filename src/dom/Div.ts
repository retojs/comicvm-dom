import { DomElement, DomElementContainer, DomElementConfig, DomElementContent, StyleClassConfig } from "./DomElement";

export interface DivDomElementConfig extends DomElementConfig, StyleClassConfig { }

export class Div extends DomElement<HTMLDivElement> {

    domElement: HTMLDivElement;

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
        this.domElement = this.appendToContainer(this.createDivElement(styleClass));
        this.class = styleClass;
    }

    protected createDivElement(styleClass: string): HTMLDivElement {
        return this.domElement = document.createElement("div");
    }
}