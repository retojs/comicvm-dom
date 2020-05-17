import { Rectangle } from "@comicvm-geometry-2d/Rectangle";
import { DomElement, DomElementContainer, DomElementConfig, StyleClassConfig } from "./DomElement";
import { parseConfigFileTextToJson } from "typescript";

export interface ImgDomElementConfig extends DomElementConfig, StyleClassConfig {
    src?: string;
    width?: number;
    height?: number;
}

export class Img extends DomElement<HTMLImageElement> {

    htmlElement: HTMLImageElement;

    bounds: Rectangle;
    bitmapShape: Rectangle;

    static create(config?: ImgDomElementConfig) {
        return config
            ? new Img(config.container, config.src, config.width, config.height, config.styleClass)
            : new Img();
    }

    constructor(
        container?: DomElementContainer,
        src?: string,
        width?: number,
        height?: number,
        styleClass?: string,
    ) {
        super(container);
        this.createImgElement();

        this.htmlElement.src = src;
        this.htmlElement.crossOrigin = "Anonymous";

        if (width && height) {
            this.bounds = new Rectangle(0, 0, width, height);
        }

        this.class = styleClass;

        this.onLoad = () => {
            if (!this.htmlElement.width) {
                console.log("Image has no size!? ", this.src);
            }
            this.bitmapShape = new Rectangle(0, 0, this.htmlElement.width, this.htmlElement.height);
            if (this.bounds) {
                const shape = Rectangle.fitIntoBounds(this.bitmapShape.clone(), this.bounds);
                this.htmlElement.width = shape.width;
                this.htmlElement.height = shape.height;
            }
        };

        this.disableDrag();
    }

    get src(): string {
        return this.htmlElement.src;
    }

    set src(src: string) {
        this.htmlElement.src = src;
    }

    set onLoad(onLoad: EventListener) {
        this.htmlElement.addEventListener("load", onLoad);
    }

    protected createImgElement(): HTMLImageElement {
        return this.htmlElement = this.appendToContainer(document.createElement("img"));
    }
}