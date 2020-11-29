import { Dimensions, Rectangle } from "comicvm-geometry-2d";
import { fromEvent, Observable } from "rxjs";
import { requestInit } from "./requestInit";


export type DomElementContainer = HTMLElement | DomElement<HTMLElement> | string;
export type DomElementContent = HTMLElement | DomElement<HTMLElement> | string;

export interface DomElementConfig {
    container?: DomElementContainer
}

export interface StyleClassConfig {
    styleClass?: string;
}

export abstract class DomElement<T extends HTMLElement> {

    abstract htmlElement: T;

    private container: HTMLElement;

    protected constructor(container: DomElementContainer) {
        if (container) {
            if (typeof container === "string") {
                container = document.getElementById(container);
            } else if (container instanceof DomElement) {
                container = container.htmlElement;
            }
            this.container = container;
        }
    }

    protected appendToContainer<T extends HTMLElement>(htmlElement: T): T {
        if (this.container) {
            this.container.appendChild(htmlElement);
        }
        return requestInit(htmlElement) as T;
    }

    append(content: DomElementContent) {
        if (content) {
            if (typeof content === "string") {
                this.htmlElement.insertAdjacentHTML('beforeend', content);
            } else if (content instanceof DomElement) {
                this.htmlElement.appendChild((content as DomElement<HTMLElement>).htmlElement);
            } else {
                this.htmlElement.appendChild(content);
            }
        }
        requestInit(this.htmlElement);
        return this;
    }

    focus() {
        this.htmlElement.focus();
    }

    get onKeyDown$(): Observable<KeyboardEvent> {
        return fromEvent<KeyboardEvent>(this.htmlElement, 'keydown');
    }

    get onKeyUp$(): Observable<KeyboardEvent> {
        return fromEvent<KeyboardEvent>(this.htmlElement, 'keyup');
    }

    clear() {
        this.htmlElement.innerHTML = "";
    }

    set class(styleClass: string) {
        if (styleClass) {
            styleClass.split(" ").forEach(name =>
                this.htmlElement.classList.add(name)
            )
        }
    }

    removeClass(styleClass: string) {
        this.htmlElement.classList.remove(styleClass);
    }

    get clientOffset(): [number, number] {
        const clientRect = this.htmlElement.getBoundingClientRect();
        return [clientRect.left, clientRect.top];
    }

    get clientOffsetInv(): [number, number] {
        const clientRect = this.htmlElement.getBoundingClientRect();
        return [-clientRect.left, -clientRect.top];
    }

    get parentOffset(): [number, number] {
        return [
            this.htmlElement.offsetLeft,
            this.htmlElement.offsetTop
        ];
    }

    get borderWidth(): string {
        return window.getComputedStyle(this.htmlElement).getPropertyValue('border-width');
    }

    get shape(): Rectangle {
        return Rectangle.fromDimensions(this.dimensions).translate(...this.parentOffset);
    }

    set shape(shape: Rectangle) {
        this.htmlElement.style.left = shape.x + "px";
        this.htmlElement.style.top = shape.y + "px";
        this.htmlElement.style.width = shape.width + "px";
        this.htmlElement.style.height = shape.height + "px";
    }

    get dimensions(): Dimensions {
        const clientRect = this.htmlElement.getBoundingClientRect();
        const borderWidth: number = parseInt(this.borderWidth);
        return new Dimensions(
            clientRect.width - 2 * borderWidth,
            clientRect.height - 2 * borderWidth
        );
    }

    set onInit(onInit: EventListener) {
        this.htmlElement.addEventListener("init", onInit);
    }

    set onClick(onClick: EventListener) {
        this.htmlElement.addEventListener("click", onClick);
    }

    set onDblClick(onDblClick: EventListener) {
        this.htmlElement.addEventListener("dblclick", onDblClick);
    }

    set onMouseDown(onMouseDown: EventListener) {
        this.htmlElement.addEventListener("mousedown", onMouseDown);
    }

    set onMouseUp(onMouseUp: EventListener) {
        this.htmlElement.addEventListener("mouseup", onMouseUp);
    }

    set onMouseMove(onMouseMove: EventListener) {
        this.htmlElement.addEventListener("mousemove", onMouseMove);
    }

    set onMouseEnter(onMouseEnter: EventListener) {
        this.htmlElement.addEventListener("mouseenter", onMouseEnter);
    }

    set onMouseLeave(onMouseLeave: EventListener) {
        this.htmlElement.addEventListener("mouseleave", onMouseLeave);
    }

    set onChange(onChange: EventListener) {
        this.htmlElement.addEventListener("change", onChange);
    }

    set onKeyUp(onKeyUp: EventListener) {
        this.htmlElement.addEventListener("keyup", onKeyUp);
    }

    set onKeyDown(onKeyDown: EventListener) {
        this.htmlElement.addEventListener("keydown", onKeyDown);
    }

    set onDrop(onDrop: EventListener) {

        this.htmlElement.ondragover = (event: DragEvent) => {
            if (isFileDragged(event)) {
                event.preventDefault(); // prerequisite for the drop event to be called
            }
        };

        this.htmlElement.ondragenter = (event: DragEvent) => {
            if (isFileDragged(event)) {
                event.preventDefault(); // prerequisite for the drop event to be called
            }
        };

        this.htmlElement.ondrop = (event: DragEvent) => {
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
        this.htmlElement.ondragstart = (event: DragEvent) => {
            event.preventDefault();
        }
    }
}