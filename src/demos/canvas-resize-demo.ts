import { Dimensions, Point, Rectangle } from "comicvm-geometry-2d";
import { Canvas } from "src/dom/Canvas";
import { Div } from "src/dom/Div";
import { InputType } from "src/dom/Input";
import { InputWithLabel } from "src/dom/InputWithLabel";
import { Font } from "src/dom/util/Font";
import { PaintStyle } from "src/dom/util/PaintStyle";
import { TextAlign } from "src/dom/util/TextAlign";

export function createCanvasResizeDemo(): Div {

    const canvasDimensions: Dimensions = new Dimensions(300, 200);

    const canvasConfig = {
        width: canvasDimensions.width,
        height: canvasDimensions.height,
        scale: 1.0,
        paintStyleConfig: {font: new Font(30, "Arial")}
    };

    const canvasResizable = Canvas.create(canvasConfig)
    const canvasFixed = Canvas.create(canvasConfig)

    const widthInput = InputWithLabel.createArrowKeyInput({
        type: InputType.TEXT,
        text: "Canvas width",
        value: canvasResizable.width,
        onKeyUp: repaint
    });
    const heightInput = InputWithLabel.createArrowKeyInput({
        type: InputType.TEXT,
        text: "Canvas height",
        value: canvasResizable.height,
        onKeyUp: repaint
    });

    widthInput.onInit = () => widthInput.focus();

    function paintOnCanvas(canvas: Canvas, text: string) {
        canvas.circle(new Point(150, 100), 80, PaintStyle.stroke("magenta"));
        canvas.rect(Rectangle.fromDimensions(canvasDimensions).cutMarginOf(1), PaintStyle.stroke("orange", 1));
        canvas.text(
            text,
            new Point(150, 110),
            PaintStyle.create({fillStyle: "navy", textAlign: TextAlign.Center})
        );
    }

    function repaint() {
        canvasResizable.setDimensions(parseInt(widthInput.value), parseInt(heightInput.value));
        canvasResizable.transformTo(canvasFixed.shape.translateToOrigin());
        paintOnCanvas(canvasResizable, `${canvasResizable.width}px * ${canvasResizable.height}px`);
    };

    //widthInput.onChange = repaint;
    //heightInput.onChange = repaint;

    paintOnCanvas(canvasResizable, "300px * 200px");
    paintOnCanvas(canvasFixed, "300px * 200px");

    function createClickHandler(canvas) {
        return (e: MouseEvent) => {
            const pos = canvas.getCanvasPositionFromMousePosition(e.clientX, e.clientY);
            canvas.circle(pos, 6, PaintStyle.fill("lime"));
        }
    }

    canvasResizable.onClick = createClickHandler(canvasResizable);
    canvasFixed.onClick = createClickHandler(canvasFixed);

    return Div.create({styleClass: "demo-section"})
        .append("<h2>Canvas Size and Scale</h2>")
        .append(canvasFixed)
        .append("The lower canvas' scale keeps adjusting to fit the content of the upper canvas.")
        .append(canvasResizable)
        .append(widthInput)
        .append(heightInput)
        .append(Div.create({styleClass: "code-sample"})
            .append(`
<pre>
// 1. Create two identical canvas elements 

const canvasDimensions: Dimensions = new Dimensions(300, 200);

const canvasConfig = {
    width: canvasDimensions.width,
    height: canvasDimensions.height,
    scale: 1.0,
    paintStyleConfig: { font: new Font(30, "Arial") }
};

const canvasResizable = Canvas.create(canvasConfig)
const canvasFixed = Canvas.create(canvasConfig)

paintOnCanvas(canvasResizable, "300px * 200px");
paintOnCanvas(canvasFixed, "300px * 200px");

/**
 * Paints a magenta circle, an orange rectangle and some blue text.
 */
function paintOnCanvas(canvas: Canvas, text: string) {
    canvas.circle(new Point(150, 100), 80, PaintStyle.stroke("magenta"));
    canvas.rect(Rectangle.fromDimensions(canvasDimensions).cutMarginOf(1), PaintStyle.stroke("orange", 1));
    canvas.text(
        text,
        new Point(150, 110),
        PaintStyle.create({ fillStyle: "navy", textAlign: TextAlign.Center })
    );
}


// 2. Allow users to resize the second canvas using two input fields (widthInput, heightInput).

const widthInput = InputWithLabel.create({ type: InputType.NUMBER, text: "Canvas width", value: canvasResizable.width });
const heightInput = InputWithLabel.create({ type: InputType.NUMBER, text: "Canvas height", value: canvasResizable.height });

widthInput.onChange = repaint;
heightInput.onChange = repaint;

/**
 * Resizes the resizable canvas to the values in the widthInput and heightInput fields.
 */
function repaint(e) {
    canvasResizable.setDimensions(parseInt(widthInput.value), parseInt(heightInput.value));
    canvasResizable.transformTo(canvasFixed.shape.translateToOrigin());
    paintOnCanvas(canvasResizable, \`\${canvasResizable.width}px * \${canvasResizable.height}px\`);
};


// 3. Demonstrate coordinate transformation from mouse/screen coordinates to canvas coordinates for any canvas size.

/**
 * Paints a green dot at the position where the mouse was clicked.
 */
function createClickHandler(canvas) {
    return (e: MouseEvent) => {
        const pos = canvas.getCanvasPositionFromMousePosition(e.clientX, e.clientY);
        canvas.circle(pos, 6, PaintStyle.fill("lime"));
    }
}

canvasResizable.onClick = createClickHandler(canvasResizable);
canvasFixed.onClick = createClickHandler(canvasFixed);

</pre>
`
            ).append("<a target='_blank' href='https://github.com/retojs/comicvm-dom/blob/master/src/demos/canvas-demo.ts'>view source</a>")
        )
        .append("see <a target='_blank' href='https://github.com/retojs/comicvm-dom/blob/master/src/dom/Canvas.ts'>Canvas.ts</a> on GitHub");
}

