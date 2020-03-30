import { Rectangle } from "@comicvm-geometry-2d/Rectangle";
import { DomElement, DomElementContainer, DomElementConfig, StyleClassConfig } from "./DomElement";
import { parseConfigFileTextToJson } from "typescript";

export interface ImgDomElementConfig extends DomElementConfig, StyleClassConfig {
    src?: string;
    width?: number;
    height?: number;
}

export class Img extends DomElement<HTMLImageElement> {

    domElement: HTMLImageElement;

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

        this.domElement.src = src;
        this.domElement.crossOrigin = "Anonymous";

        if (width && height) {
            this.bounds = new Rectangle(0, 0, width, height);
        }

        this.class = styleClass;

        this.onLoad = () => {
            if (!this.domElement.width) {
                console.log("Image has no size!? ", this.src);
            }
            this.bitmapShape = new Rectangle(0, 0, this.domElement.width, this.domElement.height);
            if (this.bounds) {
                const shape = Rectangle.fitIntoBounds(this.bitmapShape.clone(), this.bounds);
                this.domElement.width = shape.width;
                this.domElement.height = shape.height;
            }
        };

        this.disableDrag();
    }

    get src(): string {
        return this.domElement.src;
    }

    set src(src: string) {
        this.domElement.src = src;
    }

    set onLoad(onLoad: EventListener) {
        this.domElement.addEventListener("load", onLoad);
    }

    protected createImgElement(): HTMLImageElement {
        return this.domElement = this.appendToContainer(document.createElement("img"));
    }
}