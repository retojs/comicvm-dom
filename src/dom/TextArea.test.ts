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
        expect(btn.htmlElement).toBeDefined();
        expect(btn.htmlElement.cols).toBe(7);
        expect(btn.htmlElement.rows).toBe(8);
        expect(btn.htmlElement.innerText).toBe("text");
        expect(btn.htmlElement.classList).toContain("style-class");
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
        expect(btn.htmlElement).toBeDefined();
        expect(btn.htmlElement.cols).toBe(7);
        expect(btn.htmlElement.rows).toBe(8);
        expect(btn.htmlElement.innerText).toBe("text");
        expect(btn.htmlElement.classList).toContain("style-class");
    });

    it("can be created without config", () => {
        const btn = TextArea.create();
        expect(btn).toBeDefined();
        expect(btn.htmlElement).toBeDefined();
    });

    it("can be created without constructor arguments", () => {
        const btn = new TextArea();
        expect(btn).toBeDefined();
        expect(btn.htmlElement).toBeDefined();
    });
});