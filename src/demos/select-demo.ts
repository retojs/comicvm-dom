import { Div } from "src/dom/Div";
import { Label } from "src/dom/Label";
import { Select } from "src/dom/Select";

export function createSelectDemo(): Div {
    const select = Select.create({
        options: ["Apple", "Orange", "Melon"]
    })
    const label = Label.create({
        text: "Choose one"
    });
    select.onChange = (e: Event) => label.text = `You chose ${select.value}.`

    return Div.create({ styleClass: "demo-section" })
        .append("<h2>Select</h2>")
        .append(select)
        .append(label)
        .append(Div.create({ styleClass: "code-sample" })
            .append(`
<pre>
const select = Select.create({
    options: ["Apple", "Orange", "Melon"]
})

const label = Label.create({
    text: "Choose one"
});

select.onChange = (e: Event) => label.text = \`You chose \$\{select.value\}.\`
</pre>
`
            ).append("<a target='_blank' href='https://github.com/retojs/comicvm-dom/blob/master/src/demos/canvas-demo.ts'>view source</a>")
        )
        .append("see <a target='_blank' href='https://github.com/retojs/comicvm-dom/blob/master/src/dom/Select.ts'>Select.ts</a> on GitHub");
}