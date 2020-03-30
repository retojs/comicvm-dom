import { DomElement, DomElementContainer, DomElementConfig, StyleClassConfig } from "./DomElement";


export interface ButtonDomElementConfig extends DomElementConfig, StyleClassConfig {
    label?: string,
    onClick?: EventListener,
}

export class Button extends DomElement<HTMLButtonElement> {

    domElement: HTMLButtonElement;

    public static create(config?: ButtonDomElementConfig): Button {
        return config
            ? new Button(config.container, config.label, config.onClick, config.styleClass)
            : new Button();
    }

    constructor(
        container?: DomElementContainer,
        label?: string,
        onClick?: EventListener,
        styleClass?: string
    ) {
        super(container);
        this.appendToContainer(this.createButtonElement(label));
        this.domElement.innerText = label;
        this.onClick = onClick;
        this.class = styleClass;
    }

    protected createButtonElement(label: string): HTMLButtonElement {
        return this.domElement = document.createElement("button");
    }

    set label(label: string) {
        this.domElement.innerText = label;
    }
}
