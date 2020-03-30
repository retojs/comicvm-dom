import { TextArea } from "./TextArea";

describe("TextArea", () => {

    it("can be created with constructor", () => {
        const btn = new TextArea(
            "container",
            7,
            8,
            "text",
            "style-class",
        );
        expect(btn).toBeDefined();
        expect(btn.domElement).toBeDefined();
        expect(btn.domElement.cols).toBe(7);
        expect(btn.domElement.rows).toBe(8);
        expect(btn.domElement.innerText).toBe("text");
        expect(btn.domElement.classList).toContain("style-class");
    });

    it("can be created with config", () => {
        const btn = TextArea.create({
            container: "container",
            cols: 7,
            rows: 8,
            text: "text",
            styleClass: "style-class",
        });
        expect(btn).toBeDefined();
        expect(btn.domElement).toBeDefined();
        expect(btn.domElement.cols).toBe(7);
        expect(btn.domElement.rows).toBe(8);
        expect(btn.domElement.innerText).toBe("text");
        expect(btn.domElement.classList).toContain("style-class");
    });

    it("can be created without config", () => {
        const btn = TextArea.create();
        expect(btn).toBeDefined();
        expect(btn.domElement).toBeDefined();
    });

    it("can be created without constructor arguments", () => {
        const btn = new TextArea();
        expect(btn).toBeDefined();
        expect(btn.domElement).toBeDefined();
    });
});