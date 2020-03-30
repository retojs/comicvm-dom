export interface FontConfig {
    size?: number;
    family?: string;
    weight?: number;
    style?: FontStyle;
}

export const enum FontStyle {
    NORMAL = "normal",
    ITALIC = "italic"
}

export class Font {

    static create(config: FontConfig): Font {
        return new Font(
            config.size,
            config.family,
            config.weight,
            config.style,
        );
    }

    constructor(
        public size: number = 14,
        public family: string = "Arial",
        public weight?: number,
        public style?: FontStyle
    ) { }

    toString(): string {
        return this.size + "px " + this.family;
    }
}