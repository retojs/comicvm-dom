import { Canvas } from "./Canvas";
import { Font } from "./util/Font";

describe("Canvas", () => {

    it("can be created with constructor", () => {
        const canvas = new Canvas(
            "container",
            300,
            200,
            { font: new Font(14, "Arial") },
            "style-class",
        );
        expect(canvas).toBeDefined();
        expect(canvas.htmlElement).toBeDefined();
        expect(canvas.htmlElement.width).toBe(300);
        expect(canvas.htmlElement.height).toBe(200);
        expect(canvas.font).toBeDefined();
        expect(canvas.font.size).toBe(14);
        expect(canvas.font.family).toBe("Arial");
        expect(canvas.htmlElement.classList).toContain("style-class");
    });

    it("can be created with config", () => {
        const canvas = Canvas.create({
            container: "container",
            width: 300,
            height: 200,
            paintStyleConfig: { font: new Font(14, "Arial") },
            styleClass: "style-class",
        });
        expect(canvas).toBeDefined();
        expect(canvas.htmlElement).toBeDefined();
        expect(canvas.htmlElement.width).toBe(300);
        expect(canvas.htmlElement.height).toBe(200);
        expect(canvas.font).toBeDefined();
        expect(canvas.font.size).toBe(14);
        expect(canvas.font.family).toBe("Arial");
        expect(canvas.htmlElement.classList).toContain("style-class");
    });

    it("can be created without config", () => {
        const canvas = Canvas.create();
        expect(canvas).toBeDefined();
        expect(canvas.htmlElement).toBeDefined();
    });

    it("can be created without constructor arguments", () => {
        const canvas = new Canvas();
        expect(canvas).toBeDefined();
        expect(canvas.htmlElement).toBeDefined();
    });
});