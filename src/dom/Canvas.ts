import { Margin } from "@comicvm-geometry-2d/Margin";
import { Point } from "@comicvm-geometry-2d/Point";
import { Rectangle } from "@comicvm-geometry-2d/Rectangle";
import { Transform } from "@comicvm-geometry-2d/Transform";
import { DomElement, DomElementContainer, DomElementConfig, StyleClassConfig } from "./DomElement";
import { Img } from "./Img";
import { Font } from "./util/Font";
import { PaintStyle } from "./util/PaintStyle";
import { TextAlign } from "./util/TextAlign";
import { Line } from "@comicvm-geometry-2d/Line";

export const defaultCanvasFont = new Font(14, "Roboto");

export interface CanvasDomElementConfig extends DomElementConfig, StyleClassConfig {
    width?: number;
    height?: number;
    scale?: number;
    font?: Font;
}

export class Canvas extends DomElement<HTMLCanvasElement> {

    domElement: HTMLCanvasElement;

    width: number;
    height: number;
    scale: number;
    font: Font;

    globalAlpha = 1.0;
    backgroundColor = PaintStyle.fill("white");

    private lineHeights: number[] = [];  // a cache for line heights per font

    public static create(config?: CanvasDomElementConfig) {
        return config
            ? new Canvas(config.container, config.width, config.height, config.scale, config.font, config.styleClass)
            : new Canvas();
    }

    constructor(
        container?: DomElementContainer,
        width?: number,
        height?: number,
        scale?: number,
        font?: Font,
        styleClass?: string,
    ) {
        super(container);
        this.domElement = this.createCanvasElement();

        this.setDimensions(width, height);
        this.setFont(this.font = font);
        this.setScale(scale);

        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';

        this.class = styleClass;
    }

    get ctx(): CanvasRenderingContext2D {
        return this.domElement.getContext("2d");
    }

    createCanvasElement(): HTMLCanvasElement {
        return this.domElement = this.appendToContainer(document.createElement("canvas"));
    }

    setDimensions(width: number, height: number): Canvas {
        if (width != null && height != null) {
            const newScale = this.scale * width / this.width;
            this.width = width;
            this.height = height;
            this.domElement.width = width;
            this.domElement.height = height;
            this.setScale(newScale);
        }
        return this;
    }

    setScale(scale: number): Canvas {
        this.scale = scale || 1;
        this.resetTransform();
        this.ctx.scale(this.scale, this.scale);
        this.setFont(this.font);
        return this;
    }

    setFont(font: Font): Canvas {
        this.font = font || defaultCanvasFont;
        this.ctx.font = this.font.toString();
        return this;
    }

    /**
     * Sets the canvas globalAlpha property to the specified value and returns the previous globalAlpha value that was overwritten.
     */
    setGlobalAlpha(alpha: number): number {
        const currentAlpha = this.globalAlpha;
        this.globalAlpha = alpha;
        return currentAlpha;
    }

    setClip(clip: Rectangle) {
        this.ctx.beginPath();
        this.ctx.moveTo(clip.x, clip.y);
        this.ctx.lineTo(clip.x + clip.width, clip.y);
        this.ctx.lineTo(clip.x + clip.width, clip.y + clip.height);
        this.ctx.lineTo(clip.x, clip.y + clip.height);
        this.ctx.clip();
    }

    transform(transform: Transform) {
        this.setScale(transform.scale);
        this.ctx.translate(transform.dx, transform.dy);
    }

    /**
     * Translates and scales the canvas such that the specified rectangle
     * is drawn perfectly fitted into the second specified rectangle.
     *
     * @param shape: the rectangle that should fit the target
     * @param target: the target rectangle
     */
    transformTo(shape: Rectangle, target?: Rectangle) {
        target = target || this.shape.translateToOrigin();
        const scale = Rectangle.getMinScale(shape, target);
        this.setScale(scale);

        const targetShape = Rectangle.fitIntoBounds(shape.clone(), target);
        const dx = targetShape.x / scale - shape.x;
        const dy = targetShape.y / scale - shape.y;
        this.ctx.translate(dx, dy);
    }

    resetTransform() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    clear() {
        this.rect(
            new Rectangle(0, 0, this.width / this.scale, this.height / this.scale),
            this.backgroundColor
        );
    }

    begin() {
        this.ctx.save();
        this.ctx.globalAlpha = this.globalAlpha;
    }

    end() {
        this.ctx.restore();
    }

    circle(origin: Point, radius: number, config: PaintStyle) {
        if (!config.enabled) { return; }

        this.begin();
        this.ctx.beginPath();
        this.ctx.arc(origin.x, origin.y, radius, 0, 2 * Math.PI);
        this.strokeOrFill(config);
        this.end();
    }

    line(line: Line, config: PaintStyle) {
        return this.lineFromTo(line.from, line.to, config);
    }

    lineFromTo(from: Point, to: Point, config: PaintStyle) {
        return this.lineXY(from.x, from.y, to.x, to.y, config);
    }

    lineXY(fromX: number, fromY: number, toX: number, toY: number, config: PaintStyle) {
        if (!config.enabled) { return; }

        this.begin();
        this.ctx.lineWidth = config.lineWidth || this.ctx.lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(fromX, fromY);
        this.ctx.lineTo(toX, toY);
        this.strokeOrFill(config);
        this.end();
    }

    bezier(from: Point, to: Point, cp: Point, config: PaintStyle) {
        if (!config.enabled) { return; }

        this.begin();
        this.ctx.lineWidth = config.lineWidth || this.ctx.lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(from.x, from.y);
        this.ctx.quadraticCurveTo(cp.x, cp.y, to.x, to.y);
        this.strokeOrFill(config);
        this.end();
    }

    rect(rectangle: Rectangle, config: PaintStyle) {
        if (!config.enabled) { return; }

        this.begin();
        this.ctx.beginPath();
        this.ctx.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        this.strokeOrFill(config);
        this.end();
    }

    roundRect(rectangle: Rectangle, radius: Margin, config: PaintStyle) {
        if (!config.enabled) { return; }
        this.begin();
        this.ctx.beginPath();
        this.ctx.moveTo(
            rectangle.x + radius.left,
            rectangle.y
        );
        this.ctx.lineTo(
            rectangle.x + rectangle.width - radius.right,
            rectangle.y
        );
        this.ctx.quadraticCurveTo(
            rectangle.x + rectangle.width,
            rectangle.y,
            rectangle.x + rectangle.width,
            rectangle.y + radius.top
        );
        this.ctx.lineTo(
            rectangle.x + rectangle.width,
            rectangle.y + rectangle.height - radius.top
        );
        this.ctx.quadraticCurveTo(
            rectangle.x + rectangle.width,
            rectangle.y + rectangle.height,
            rectangle.x + rectangle.width - radius.right,
            rectangle.y + rectangle.height
        );
        this.ctx.lineTo(
            rectangle.x + radius.left,
            rectangle.y + rectangle.height
        );
        this.ctx.quadraticCurveTo(
            rectangle.x,
            rectangle.y + rectangle.height,
            rectangle.x,
            rectangle.y + rectangle.height - radius.bottom
        );
        this.ctx.lineTo(
            rectangle.x,
            rectangle.y + radius.top
        );
        this.ctx.quadraticCurveTo(
            rectangle.x,
            rectangle.y,
            rectangle.x + radius.left,
            rectangle.y
        );
        this.ctx.closePath();
        this.strokeOrFill(config);
        this.end();
    }

    strokeOrFill(config: PaintStyle) {
        if (config.gradient) {
            const from = config.gradient.direction.from;
            const to = config.gradient.direction.to;
            const colorStopDistance = 1.0 / (config.gradient.colors.length - 1) || 1;
            const gradient = this.ctx.createLinearGradient(from.x, from.y, to.x, to.y);
            config.gradient.colors.forEach((color, index) => gradient.addColorStop(index * colorStopDistance, color));
            if (config.gradient.fill) {
                config.fillStyle = gradient;
            }
            if (config.gradient.stroke) {
                config.strokeStyle = gradient;
            }
        }
        if (config.fillStyle) {
            this.ctx.fillStyle = config.fillStyle;
            this.ctx.fill();
        }
        if (config.strokeStyle) {
            this.ctx.lineWidth = config.lineWidth || this.ctx.lineWidth;
            this.ctx.lineCap = config.lineCap || this.ctx.lineCap;
            this.ctx.strokeStyle = config.strokeStyle;
            this.ctx.stroke();
        }
    }

    text(text: string, pos: Point, config: PaintStyle) {
        if (!config.enabled) { return; }

        this.begin();
        if (config.fillStyle) {
            this.ctx.fillStyle = config.fillStyle;
        }
        this.ctx.font = this.font.toString();
        if (config.font) {
            this.ctx.font = config.font.toString();
        }
        let x = pos.x;
        if (config.textAlign === TextAlign.Center) {
            x -= this.getTextWidth(text) / 2;
        } else if (config.textAlign === TextAlign.Right) {
            x -= this.getTextWidth(text);
        }
        this.ctx.fillText(text, x, pos.y);

        this.end();
    }

    getTextWidth(text: string, font?: Font): number {
        this.begin();
        if (font) {
            this.ctx.font = font.toString();
        }
        const textWidth = this.ctx.measureText(text).width;
        this.end();
        return textWidth;
    }

    getLineHeight(font?: Font): number {
        this.begin();
        if (font) {
            this.ctx.font = font.toString();
        }
        const currentFont = this.ctx.font;
        if (!this.lineHeights[currentFont]) {
            const temp = document.createElement("div");
            temp.setAttribute("style", "margin: 0px; padding: 0px; font:" + currentFont);
            temp.innerHTML = ".";
            document.body.appendChild(temp);
            this.lineHeights[currentFont] = temp.clientHeight;
            temp.parentNode.removeChild(temp);
        }
        this.end();

        return this.lineHeights[currentFont];
    }

    drawImage(img: Img, shape: Rectangle) {
        if (!img) { return; }

        if (!img.domElement.crossOrigin
            || img.domElement.crossOrigin.toLowerCase() !== "Anonymous".toLowerCase()) {
            throw new Error("img.crossOrigin not set to 'Anonymous'")
        }

        this.begin();
        this.ctx.drawImage(
            img.domElement,
            shape.x,
            shape.y,
            shape.width,
            shape.height
        );
        this.end();
    }

    getImageData(clip: Rectangle): ImageData {
        return this.ctx.getImageData(clip.x, clip.y, clip.width, clip.height);
    }

    putImageData(imageData: ImageData, dx: number, dy: number): void {
        this.ctx.putImageData(imageData, dx, dy);
    }

    /**
     * Returns the canvas coordinates to draw a point at the specified mouse position (clientX, clientY)
     *
     * @param clientX
     * @param clientY
     */
    getCanvasPositionFromMousePosition(clientX: number, clientY: number): Point {
        const x = clientX - this.domElement.getBoundingClientRect().left;
        const y = clientY - this.domElement.getBoundingClientRect().top;

        return new Point(x / this.scale, y / this.scale);
    }

    /**
     * Returns the mouse coordinates (clientX, clientY) of the point drawn on the canvas
     * at the specified position (x, y).
     *
     * @param x
     * @param y
     */
    getDomPositionFromCanvasPosition(x: number, y: number): Point {
        const clientX = x * this.scale + this.domElement.getBoundingClientRect().left;
        const clientY = y * this.scale + this.domElement.getBoundingClientRect().top;

        return new Point(clientX, clientY);
    }

    markCenter() {
        const stroke = PaintStyle.stroke("teal", 2);
        const pos = this.shape.translateToOrigin().center;
        const markSize = 50;
        this.lineFromTo(
            pos.clone().translate(0, -markSize / 2),
            pos.clone().translate(0, markSize / 2),
            stroke
        );
        this.lineFromTo(
            pos.clone().translate(-markSize / 2, 0),
            pos.clone().translate(markSize / 2, 0),
            stroke
        );
    }
}