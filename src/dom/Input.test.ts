import { Input, InputType } from "./Input";

describe("Input", () => {

    it("can be created with constructor", () => {
        const btn = new Input(
            "container",
            InputType.TEXT,
            "name",
            "value",
            "placeholder",
            "style-class",
        );
        expect(btn).toBeDefined();
        expect(btn.htmlElement).toBeDefined();
        expect(btn.htmlElement.type).toBe(InputType.TEXT);
        expect(btn.htmlElement.name).toBe("name");
        expect(btn.htmlElement.value).toBe("value");
        expect(btn.htmlElement.placeholder).toBe("placeholder");
        expect(btn.htmlElement.classList).toContain("style-class");
    });

    it("can be created with config", () => {
        const btn = Input.create({
            container: "container",
            type: InputType.CHECKBOX,
            name: "name",
            value: "value",
            placeholder: "placeholder",
            styleClass: "style-class",
        });
        expect(btn).toBeDefined();
        expect(btn.htmlElement).toBeDefined();
        expect(btn.htmlElement.type).toBe(InputType.CHECKBOX);
        expect(btn.htmlElement.name).toBe("name");
        expect(btn.htmlElement.value).toBe("value");
        expect(btn.htmlElement.placeholder).toBe("placeholder");
        expect(btn.htmlElement.classList).toContain("style-class");
    });

    it("can be created without config", () => {
        const btn = Input.create();
        expect(btn).toBeDefined();
        expect(btn.htmlElement).toBeDefined();
    });

    it("can be created without constructor arguments", () => {
        const btn = new Input();
        expect(btn).toBeDefined();
        expect(btn.htmlElement).toBeDefined();
    });
});