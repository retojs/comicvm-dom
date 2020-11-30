import { Div } from "../dom/Div";
import { Input, InputType } from "../dom/Input";
import { Label } from "../dom/Label";

export function createInputDemo(): Div {
    const input = Input.create({
        type: InputType.TEXT,
        name: "text",
        placeholder: "Write something..."
    })
    const label = Label.create();
    
    input.onKeyUp = (e: KeyboardEvent) => label.text = `You wrote ${input.value}.`
    
    input.onInit = () => input.focus();

    return Div.create({ styleClass: "demo-section" })
        .append("<h2>Input</h2>")
        .append(input)
        .append(label)
        .append(Div.create({ styleClass: "code-sample" })
            .append(`
<pre>
const input = Input.create({
    type: InputType.TEXT,
    name: "text",
    placeholder: "Write something..."
})
const label = Label.create();
input.onKeyUp = (e: KeyboardEvent) => label.text = \`You wrote \$\{input.value\}.\`
</pre>
`
            ).append("<a target='_blank' href='https://github.com/retojs/comicvm-dom/blob/master/src/demos/input-demo.ts'>view source</a>")
        )
        .append("see <a target='_blank' href='https://github.com/retojs/comicvm-dom/blob/master/../dom/Input.ts'>Input.ts</a>")
        .append(" and <a target='_blank' href='https://github.com/retojs/comicvm-dom/blob/master/../dom/Label.ts'>Label.ts</a> on GitHub")
}