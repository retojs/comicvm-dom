import { Select } from "./Select";

describe("Select", () => {

    it("can be created with constructor", () => {
        const btn = new Select(
            "container",
            ["option-1", "option-2"],
            "style-class",
        );
        expect(btn).toBeDefined();
        expect(btn.htmlElement).toBeDefined();
        expect(btn.htmlElement.innerHTML).toBeDefined();
        expect(btn.htmlElement.innerHTML.indexOf("option-1")).toBeGreaterThan(0);
        expect(btn.htmlElement.innerHTML.indexOf("option-2")).toBeGreaterThan(0);
        expect(btn.htmlElement.classList).toContain("style-class");
    });

    it("can be created with config", () => {
        const btn = Select.create({
            container: "container",
            options: ["option-1", "option-2"],
            styleClass: "style-class",
        });
        expect(btn).toBeDefined();
        expect(btn.htmlElement).toBeDefined();
        expect(btn.htmlElement.innerHTML).toBeDefined();
        expect(btn.htmlElement.innerHTML.indexOf("option-1")).toBeGreaterThan(0);
        expect(btn.htmlElement.innerHTML.indexOf("option-2")).toBeGreaterThan(0);
        expect(btn.htmlElement.classList).toContain("style-class");
    });

    it("can be created without config", () => {
        const btn = Select.create();
        expect(btn).toBeDefined();
        expect(btn.htmlElement).toBeDefined();
    });

    it("can be created without constructor arguments", () => {
        const btn = new Select();
        expect(btn).toBeDefined();
        expect(btn.htmlElement).toBeDefined();
    });
});