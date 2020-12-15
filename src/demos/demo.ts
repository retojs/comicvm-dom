import "../style/index.scss";

import { Div } from "../dom";
import { createButtonDemo } from "./button-demo";
import { createCanvasDemo } from "./canvas-demo";
import { createInputDemo } from "./input-demo";
import { createSelectDemo } from "./select-demo";
import { createCanvasResizeDemo } from "./canvas-resize-demo";
import { createRxJsDemo } from "./rxjs-demo";

export function runDemo() {

    const demo = Div.create({container: "demo"})
        .append(`
ComicVM DOM is a library of javascript classes representing HTML Document Objects you can use to quickly sketch a web user interface.
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
You can also append HTML <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals">template literals</a> to any DomElement directly. (They will be assigned to the element's <em>innerHTML</em> property.)
<div class="code-sample">
<pre>
Div.create({container: "demo"})
        .append(\`
            &lt;ul&gt;
              &lt;li&gt;You can &lt;strong&gt;create&lt;/strong&gt; a DomElement
                &lt;ul&gt;
                &lt;li&gt;by calling its constructor.
                &lt;/li&gt;
                &lt;li&gt; by calling the static create() function and passing an element configuration.
                &lt;/li&gt;
                &lt;/ul&gt;
              &lt;/li&gt;&lt;li&gt;You can &lt;strong&gt;append&lt;/strong&gt; a DomElement
                &lt;ul&gt;
                &lt;li&gt;by passing a container (an element ID or a DomElement or HTMLElement instance).
                &lt;/li&gt;
                &lt;li&gt;by calling append() on a parent DomElement.
                &lt;/li&gt;
                &lt;/ul&gt;
              &lt;/li&gt; 
            &lt;/ul&gt;
        \`)
</pre>
</div>
<br>
<H1>Elements</H1>`)

    demo.append(createInputDemo());
    demo.append(createSelectDemo());
    demo.append(createButtonDemo());
    demo.append(createCanvasDemo());
    demo.append(createCanvasResizeDemo());
    demo.append(createRxJsDemo());

    demo.append("Other DomElements are <a target='_blank' href='https://github.com/retojs/comicvm-dom/blob/master/../dom/Div.ts'>Div.ts</a>")
        .append(",  <a target='_blank' href='https://github.com/retojs/comicvm-dom/blob/master/../dom/Img.ts'>Img.ts</a>")
        .append(" and <a target='_blank' href='https://github.com/retojs/comicvm-dom/blob/master/../dom/TextArea.ts'>TextArea.ts</a>");
}
