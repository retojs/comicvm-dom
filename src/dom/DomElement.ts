import { Rectangle } from "@comicvm-geometry-2d/Rectangle";
import { Dimensions } from "@comicvm-geometry-2d/Dimensions";


export type DomElementContainer = HTMLElement | DomElement<HTMLElement> | string;
export type DomElementContent = HTMLElement | DomElement<HTMLElement> | string;

export interface DomElementConfig {
    container?: DomElementContainer
}

export interface StyleClassConfig {
    styleClass?: string;
}

export abstract class DomElement<T extends HTMLElement> {

    abstract domElement: T;

    private container: HTMLElement;

    protected constructor(container: DomElementContainer) {
        if (container) {
            if (typeof container === "string") {
                container = document.getElementById(container);
            } else if (container instanceof DomElement) {
                container = container.domElement;
            }
            this.container = container;
        }
    }

    protected appendToContainer<T extends HTMLElement>(element: T): T {
        if (this.container) {
            this.container.appendChild(element);
        }
        return element;
    }

    append(content: DomElementContent) {
        if (content) {
            if (typeof content === "string") {
                this.domElement.insertAdjacentHTML('beforeend', content);
            } else if (content instanceof DomElement) {
                this.domElement.appendChild((content as DomElement<HTMLElement>).domElement);
            } else {
                this.domElement.appendChild(content);
            }
        }
        return this;
    }

    clear() {
        this.domElement.innerHTML = "";
    }

    set class(styleClass: string) {
        if (styleClass) {
            styleClass.split(" ").forEach(name =>
                this.domElement.classList.add(name)
            )
        }
    }

    removeClass(styleClass: string) {
        this.domElement.classList.remove(styleClass);
    }

    get clientOffset(): [number, number] {
        const clientRect = this.domElement.getBoundingClientRect();
        return [clientRect.left, clientRect.top];
    }

    get clientOffsetInv(): [number, number] {
        const clientRect = this.domElement.getBoundingClientRect();
        return [-clientRect.left, -clientRect.top];
    }

    get parentOffset(): [number, number] {
        return [
            this.domElement.offsetLeft,
            this.domElement.offsetTop
        ];
    }

    get borderWidth(): string {
        return window.getComputedStyle(this.domElement).getPropertyValue('border-width');
    }

    get shape(): Rectangle {
        return Rectangle.fromDimensions(this.dimensions).translate(...this.parentOffset);
    }

    set shape(shape: Rectangle) {
        this.domElement.style.left = shape.x + "px";
        this.domElement.style.top = shape.y + "px";
        this.domElement.style.width = shape.width + "px";
        this.domElement.style.height = shape.height + "px";
    }

    get dimensions(): Dimensions {
        const clientRect = this.domElement.getBoundingClientRect();
        const borderWidth: number = parseInt(this.borderWidth);
        return new Dimensions(
            clientRect.width - 2 * borderWidth,
            clientRect.height - 2 * borderWidth
        );
    }

    set onClick(onClick: EventListener) {
        this.domElement.addEventListener("click", onClick);
    }

    set onDblClick(onDblClick: EventListener) {
        this.domElement.addEventListener("dblclick", onDblClick);
    }

    set onMouseDown(onMouseDown: EventListener) {
        this.domElement.addEventListener("mousedown", onMouseDown);
    }

    set onMouseUp(onMouseUp: EventListener) {
        this.domElement.addEventListener("mouseup", onMouseUp);
    }

    set onMouseMove(onMouseMove: EventListener) {
        this.domElement.addEventListener("mousemove", onMouseMove);
    }

    set onMouseEnter(onMouseEnter: EventListener) {
        this.domElement.addEventListener("mouseenter", onMouseEnter);
    }

    set onMouseLeave(onMouseLeave: EventListener) {
        this.domElement.addEventListener("mouseleave", onMouseLeave);
    }

    set onChange(onChange: EventListener) {
        this.domElement.addEventListener("change", onChange);
    }

    set onKeyUp(onKeyUp: EventListener) {
        this.domElement.addEventListener("keyup", onKeyUp);
    }

    set onKeyDown(onKeyDown: EventListener) {
        this.domElement.addEventListener("keydown", onKeyDown);
    }

    set onDrop(onDrop: EventListener) {

        this.domElement.ondragover = (event: DragEvent) => {
            if (isFileDragged(event)) {
                event.preventDefault(); // prerequisite for the drop event to be called
            }
        };

        this.domElement.ondragenter = (event: DragEvent) => {
            if (isFileDragged(event)) {
                event.preventDefault(); // prerequisite for the drop event to be called
            }
        };

        this.domElement.ondrop = (event: DragEvent) => {
            if (event.stopPropagation) {
                event.stopPropagation(); // stops the browser from redirecting.
            }
            onDrop(event);
            return false; // stops the browser from redirecting.
        };

        function isFileDragged(event: DragEvent) {
            return event && event.dataTransfer && event.dataTransfer.types && event.dataTransfer.types.indexOf("Files") > -1;
        }
    }

    disableDrag() {
        this.domElement.ondragstart = (event: DragEvent) => {
            event.preventDefault();
        }
    }
}