import { DomElement, DomElementContainer, DomElementConfig, StyleClassConfig } from "./DomElement";

export interface SelectDomElementConfig extends DomElementConfig, StyleClassConfig {
    options?: string[]
}

export class Select extends DomElement<HTMLSelectElement> {

    htmlElement: HTMLSelectElement;

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
        return this.htmlElement = this.appendToContainer(document.createElement("select"));
    }

    set options(options: string[]) {
        this.htmlElement.innerHTML = (options || [])
            .map(option => `<option value="${option}">${option}</option>`)
            .join('');
    }

    set selectedOption(option: string) {
        this.htmlElement.value = option;
    }

    get selectedOption(): string {
        return this.htmlElement.options[this.htmlElement.selectedIndex].value;
    }

    get value(): string {
        return this.selectedOption
    }
}
