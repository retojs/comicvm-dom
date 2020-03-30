import { DomElement, DomElementContainer, DomElementConfig, StyleClassConfig } from "./DomElement";

export interface SelectDomElementConfig extends DomElementConfig, StyleClassConfig {
    options?: string[]
}

export class Select extends DomElement<HTMLSelectElement> {

    domElement: HTMLSelectElement;

    public static create(config?: SelectDomElementConfig) {
        return config
            ? new Select(config.container, config.options, config.styleClass)
            : new Select();
    }

    constructor(
        container?: DomElementContainer,
        options?: string[],
        styleClass?: string,
    ) {
        super(container);
        this.createSelectElement();
        this.options = options;
        this.class = styleClass;
    }

    protected createSelectElement(): HTMLSelectElement {
        return this.domElement = this.appendToContainer(document.createElement("select"));
    }

    set options(options: string[]) {
        this.domElement.innerHTML = (options || [])
            .map(option => `<option value="${option}">${option}</option>`)
            .join('');
    }

    set selectedOption(option: string) {
        this.domElement.value = option;
    }

    get selectedOption(): string {
        return this.domElement.options[this.domElement.selectedIndex].value;
    }

    get value(): string {
        return this.selectedOption
    }
}
