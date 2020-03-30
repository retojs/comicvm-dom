import { Canvas } from "./Canvas";
import { Font } from "./util/Font";

describe("Canvas", () => {

    it("can be created with constructor", () => {
        const canvas = new Canvas(
            "container",
            300,
            200,
            1.5,
            new Font(14, "Arial"),
            "style-class",
        );
        expect(canvas).toBeDefined();
        expect(canvas.domElement).toBeDefined();
        expect(canvas.domElement.width).toBe(300);
        expect(canvas.domElement.height).toBe(200);
        expect(canvas.scale).toBe(1.5);
        expect(canvas.font).toBeDefined();
        expect(canvas.font.size).toBe(14);
        expect(canvas.font.family).toBe("Arial");
        expect(canvas.domElement.classList).toContain("style-class");
    });

    it("can be created with config", () => {
        const canvas = Canvas.create({
            container: "container",
            width: 300,
            height: 200,
            scale: 1.5,
            font: new Font(14, "Arial"),
            styleClass: "style-class",
        });
        expect(canvas).toBeDefined();
        expect(canvas.domElement).toBeDefined();
        expect(canvas.domElement.width).toBe(300);
        expect(canvas.domElement.height).toBe(200);
        expect(canvas.scale).toBe(1.5);
        expect(canvas.font).toBeDefined();
        expect(canvas.font.size).toBe(14);
        expect(canvas.font.family).toBe("Arial");
        expect(canvas.domElement.classList).toContain("style-class");
    });

    it("can be created without config", () => {
        const canvas = Canvas.create();
        expect(canvas).toBeDefined();
        expect(canvas.domElement).toBeDefined();
    });

    it("can be created without constructor arguments", () => {
        const canvas = new Canvas();
        expect(canvas).toBeDefined();
        expect(canvas.domElement).toBeDefined();
    });
});