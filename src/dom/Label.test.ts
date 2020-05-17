import { Label } from "./Label";

describe("Label", () => {

    it("can be created with constructor", () => {
        const btn = new Label(
            "container",
            "label-text",
            "for-element-id",
            "style-class",
        );
        expect(btn).toBeDefined();
        expect(btn.htmlElement).toBeDefined();
        expect(btn.htmlElement.innerText).toBe("label-text");
        expect(btn.htmlElement.htmlFor).toBe("for-element-id");
        expect(btn.htmlElement.classList).toContain("style-class");
    });

    it("can be created with config", () => {
        const btn = Label.create({
            container: "container",
            text: "label-text",
            htmlFor: "for-element-id",
            styleClass: "style-class",
        });
        expect(btn).toBeDefined();
        expect(btn.htmlElement).toBeDefined();
        expect(btn.htmlElement.innerText).toBe("label-text");
        expect(btn.htmlElement.htmlFor).toBe("for-element-id");
        expect(btn.htmlElement.classList).toContain("style-class");
    });

    it("can be created without config", () => {
        const btn = Label.create();
        expect(btn).toBeDefined();
        expect(btn.htmlElement).toBeDefined();
    });

    it("can be created without constructor arguments", () => {
        const btn = new Label();
        expect(btn).toBeDefined();
        expect(btn.htmlElement).toBeDefined();
    });
});