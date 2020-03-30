import { Img } from "./Img";

describe("Img", () => {

    it("can be created with constructor", () => {
        const btn = new Img(
            "container",
            "image-src",
            300,
            200,
            "style-class"
        );
        expect(btn).toBeDefined();
        expect(btn.domElement).toBeDefined();
        expect(btn.domElement.src).toContain("image-src");
        expect(btn.bounds).toBeDefined();
        expect(btn.bounds.width).toBe(300);
        expect(btn.bounds.height).toBe(200);
        expect(btn.domElement.classList).toContain("style-class");
    });

    it("can be created with config", () => {
        const btn = Img.create({
            container: "container",
            src: "image-src",
            width: 300,
            height: 200,
            styleClass: "style-class",
        });
        expect(btn).toBeDefined();
        expect(btn.domElement).toBeDefined();
        expect(btn.domElement.src).toContain("image-src");
        expect(btn.bounds).toBeDefined();
        expect(btn.bounds.width).toBe(300);
        expect(btn.bounds.height).toBe(200);
        expect(btn.domElement.classList).toContain("style-class");
    });

    it("can be created without config", () => {
        const btn = Img.create();
        expect(btn).toBeDefined();
        expect(btn.domElement).toBeDefined();
    });

    it("can be created without constructor arguments", () => {
        const btn = new Img();
        expect(btn).toBeDefined();
        expect(btn.domElement).toBeDefined();
    });
});