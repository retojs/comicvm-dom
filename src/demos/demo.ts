import { Div } from "../dom/Div";
import { createButtonDemo } from "./button-demo";
import { createCanvasDemo } from "./canvas-demo";
import { createInputDemo } from "./input-demo";
import { createSelectDemo } from "./select-demo";
import { createCanvasResizeDemo } from "./canvas-resize-demo";

export function runDemo() {


  const demo = Div.create({ container: "demo" })
    .append(`
            <ul>
              <li>You can <strong>create</strong> a DomElement
                <ul>
                <li>by calling its constructor.
                </li>
                <li> by calling the static create() function and passing an element configuration.
                </li>
                </ul>
              </li><li>You can <strong>append</strong> a DomElement
                <ul>
                <li>by passing a container (an element ID or a DomElement or HTMLElement instance).
                </li>
                <li>by calling append() on a parent DomElement.
                </li>
                </ul>
              </li> 
            </ul>
          `);

  demo.append(createInputDemo());
  demo.append(createSelectDemo());
  demo.append(createButtonDemo());
  demo.append(createCanvasDemo());
  demo.append(createCanvasResizeDemo());

  demo.append("Other DomElements are <a target='_blank' href='https://github.com/retojs/comicvm-dom/blob/master/../dom/Div.ts'>Div.ts</a>")
    .append(",  <a target='_blank' href='https://github.com/retojs/comicvm-dom/blob/master/../dom/Img.ts'>Img.ts</a>")
    .append(" and <a target='_blank' href='https://github.com/retojs/comicvm-dom/blob/master/../dom/TextArea.ts'>TextArea.ts</a>");
}
