import { Div } from "./Div";

describe("Div", () => {

    it("can be created with constructor", () => {
        const btn = new Div("container",  "style-class");
        expect(btn).toBeDefined();
        expect(btn.domElement).toBeDefined();
        expect(btn.domElement.classList).toContain("style-class");
    });

    it("can be created with config", () => {
        const btn = Div.create({
            container: "container",
            styleClass: "style-class",
        });
        expect(btn).toBeDefined();
        expect(btn.domElement).toBeDefined();
        expect(btn.domElement.classList).toContain("style-class");
    });

    it("can be created without config", () => {
        const btn = Div.create();
        expect(btn).toBeDefined();
        expect(btn.domElement).toBeDefined();
    });

    it("can be created without constructor arguments", () => {
        const btn = new Div();
        expect(btn).toBeDefined();
        expect(btn.domElement).toBeDefined();
    });
});