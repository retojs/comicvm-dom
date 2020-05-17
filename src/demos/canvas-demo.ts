import { Point } from "@comicvm-geometry-2d/Point";
import { Canvas } from "src/dom/Canvas";
import { Div } from "src/dom/Div";
import { Font } from "src/dom/util/Font";
import { PaintStyle } from "src/dom/util/PaintStyle";
import { TextAlign } from "src/dom/util/TextAlign";

export function createCanvasDemo(): Div {

    const canvas = Canvas.create({
        width: 300,
        height: 200,
        paintStyleConfig: { font: new Font(30, "Arial") },
    })

    canvas.circle(new Point(150, 100), 80, PaintStyle.stroke("magenta"));
    canvas.text(
        "Click on the canvas",
        new Point(150, 110),
        PaintStyle.create({ fillStyle: "navy", textAlign: TextAlign.Center })
    );
    canvas.onClick = (e: MouseEvent) => {
        const pos = canvas.getCanvasPositionFromMousePosition(e.clientX, e.clientY);
        canvas.circle(pos, 6, PaintStyle.fill("lime"));
    }

    return Div.create({ styleClass: "demo-section" })
        .append("<h2>Canvas</h2>")
        .append(canvas)
        .append(Div.create({ styleClass: "code-sample" })
            .append(`
<pre>
const canvas = Canvas.create({
    width: 300,
    height: 200,
    scale: 1.0,
    font: new Font(30, "Arial"),
})

canvas.circle(new Point(150, 100), 80, PaintStyle.stroke("magenta"));

canvas.text(
    "Click on the canvas",
    new Point(150, 110),
    PaintStyle.create({ fillStyle: "navy", textAlign: TextAlign.Center })
);

canvas.onClick = (e: MouseEvent) => {
    const pos = canvas.getCanvasPositionFromMousePosition(e.clientX, e.clientY);
    canvas.circle(pos, 6, PaintStyle.fill("lime"));
}
</pre>
`
            ).append("<a target='_blank' href='https://github.com/retojs/comicvm-dom/blob/master/src/demos/canvas-demo.ts'>view source</a>")
        )
        .append("see <a target='_blank' href='https://github.com/retojs/comicvm-dom/blob/master/src/dom/Canvas.ts'>Canvas.ts</a> on GitHub");
}