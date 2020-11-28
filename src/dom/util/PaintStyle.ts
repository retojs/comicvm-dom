import { Font } from "./Font";
import { TextAlign } from "./TextAlign";
import { Line } from "comicvm-geometry-2d/src/geometry-2d/Line";

export const enum LineCap {
    Butt = "butt",
    Round = "round",
    Square = "square"
}

export const enum GradientType {
    Linear = "linar",
    Radial = "radial"
}

export interface GradientProperties {
    type: GradientType;
    colors: string[];
    direction: Line;
    fill: boolean;
    stroke: boolean;
}

export interface PaintStyleConfig {
    strokeStyle?: string | CanvasGradient;
    fillStyle?: string | CanvasGradient;
    lineWidth?: number;
    lineCap?: LineCap;
    font?: Font;
    textAlign?: TextAlign;
    gradient?: GradientProperties;
    enabled?: boolean;
};

export class PaintStyle {

    static create(config: PaintStyleConfig) {
        return config
            ? new PaintStyle(
                config.fillStyle,
                config.strokeStyle,
                config.lineWidth,
                config.lineCap,
                config.font,
                config.textAlign,
                config.gradient,
                config.enabled
            )
            : new PaintStyle();
    }

    private constructor(
        public fillStyle?: string | CanvasGradient,
        public strokeStyle?: string | CanvasGradient,
        public lineWidth?: number,
        public lineCap?: LineCap,
        public font?: Font,
        public textAlign?: TextAlign,
        public gradient?: GradientProperties,
        public enabled: boolean = true
    ) { }

    static stroke(color: string, lineWidth?: number, lineCap?: LineCap, enabled?: boolean): PaintStyle {
        return new PaintStyle(null, color, lineWidth, lineCap, null, null, null, enabled);
    }

    static fill(color: string, enabled?: boolean): PaintStyle {
        return new PaintStyle(color, null, null, null, null, null, null, enabled);
    }

    static text(color: string, textAlign?: TextAlign, font?: Font, enabled?: boolean): PaintStyle {
        return new PaintStyle(color, null, null, null, font, textAlign, null, enabled);
    }

    static fillAndStroke(fillStyle: string, strokeStyle: string, lineWidth?: number, lineCap?: LineCap, enabled?: boolean) {
        return new PaintStyle(fillStyle, strokeStyle, lineWidth, lineCap, null, null, null, enabled);
    }

    static gradientFill(type: GradientType, colors: string[], direction?: Line) {
        return new PaintStyle(null, null, null, null, null, null,
            { type, colors, direction, fill: true, stroke: false }
        );
    }

    static gradientStroke(type: GradientType, colors: string[], direction?: Line, lineWidth?: number) {
        return new PaintStyle(null, null, lineWidth, null, null, null,
            { type, colors, direction, fill: false, stroke: true }
        );
    }

    static font(font: Font) {
        return new PaintStyle(null, null, null, null, font);
    }

    clone(): PaintStyle {
        return new PaintStyle(this.strokeStyle, this.fillStyle, this.lineWidth, this.lineCap, this.font, this.textAlign, this.gradient, this.enabled);
    }
}