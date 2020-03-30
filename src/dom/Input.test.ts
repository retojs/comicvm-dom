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
        expect(btn.domElement).toBeDefined();
        expect(btn.domElement.type).toBe(InputType.TEXT);
        expect(btn.domElement.name).toBe("name");
        expect(btn.domElement.value).toBe("value");
        expect(btn.domElement.placeholder).toBe("placeholder");
        expect(btn.domElement.classList).toContain("style-class");
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
        expect(btn.domElement).toBeDefined();
        expect(btn.domElement.type).toBe(InputType.CHECKBOX);
        expect(btn.domElement.name).toBe("name");
        expect(btn.domElement.value).toBe("value");
        expect(btn.domElement.placeholder).toBe("placeholder");
        expect(btn.domElement.classList).toContain("style-class");
    });

    it("can be created without config", () => {
        const btn = Input.create();
        expect(btn).toBeDefined();
        expect(btn.domElement).toBeDefined();
    });

    it("can be created without constructor arguments", () => {
        const btn = new Input();
        expect(btn).toBeDefined();
        expect(btn.domElement).toBeDefined();
    });
});