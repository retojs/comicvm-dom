import { Div } from "src/dom/Div";
import { Button } from "src/dom/Button";

export function createButtonDemo(): Div {

    const button = Button.create({
        label: "Click Me",
        onClick: e => alert("Thanks for clicking!"),
    });

    return Div.create({ styleClass: "demo-section" })
        .append("<h2>Button</h2>")
        .append(button)
        .append(Div.create({ styleClass: "code-sample" })
            .append(`
<pre>
const button = Button.create({
    label: "Click Me",
    onClick: e => alert("Thanks for clicking!"),
})

Div.create({ 
    container: "button-demo" 
})
    .append(button)
</pre>
`
            ).append("<a target='_blank' href='https://github.com/retojs/comicvm-dom/blob/master/src/demos/button-demo.ts'>view source</a>")
        )
        .append("see <a target='_blank' href='https://github.com/retojs/comicvm-dom/blob/master/src/dom/Button.ts'>Button.ts</a> on GitHub");
}