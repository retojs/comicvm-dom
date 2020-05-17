import { Button } from "./Button";

describe("Button", () => {

    it("can be created with constructor", () => {
        const btn = new Button(
            "container",
            "label",
            (e: MouseEvent) => expect(e).toBeDefined(),
            "style-class"
        );
        expect(btn).toBeDefined();
        expect(btn.htmlElement).toBeDefined();
        expect(btn.htmlElement.innerText).toBe("label");
        expect(btn.htmlElement.classList).toContain("style-class");
        btn.htmlElement.click();
    });

    it("can be created with config", () => {
        const btn = Button.create({
            container: "container",
            label: "label",
            onClick: (e: MouseEvent) => expect(e).toBeDefined(),
            styleClass: "style-class"
        });
        expect(btn).toBeDefined();
        expect(btn.htmlElement).toBeDefined();
        expect(btn.htmlElement.innerText).toBe("label");
        expect(btn.htmlElement.classList).toContain("style-class");
        btn.htmlElement.click();
    });

    it("can be created without config", () => {
        const btn = Button.create();
        expect(btn).toBeDefined();
        expect(btn.htmlElement).toBeDefined();
        expect(btn.htmlElement.innerText).toBeUndefined();
    });

    it("can be created without constructor arguments", () => {
        const btn = new Button();
        expect(btn).toBeDefined();
        expect(btn.htmlElement).toBeDefined();
        expect(btn.htmlElement.innerText).toBeUndefined();
    });
});