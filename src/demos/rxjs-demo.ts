import { Div, Label } from "../dom";

export function createRxJsDemo(): Div {

    return Div.create({styleClass: "demo-section"})
        .append("<h2>RxJs</h2>")
        .append(Label.create({
            text: "ComicVM Dom Elements provide RxJS Observables on their events."
        }))
        .append(Div.create({styleClass: "code-sample"})
            .append(`
<pre>
export abstract class DomElement<T extends HTMLElement> {

    get onKeyDown$(): Observable<KeyboardEvent> {
        return fromEvent<KeyboardEvent>(this.htmlElement, 'keydown');
    }

    get onKeyUp$(): Observable<KeyboardEvent> {
        return fromEvent<KeyboardEvent>(this.htmlElement, 'keyup');
    }
</pre>
You can pipe into these event streams to implement reactions.<br>
Like for example the ArrowKeyInput element (<a href="github.com/TODO">view source</a>)
<pre>
export class ArrowKeyInput extends DomElement&lt;HTMLSpanElement&gt; {

    let isKeyDown = false;
       </pre>     
KeyUp events will change the isKeyDown flag to false.
    <pre>
    const keyUp$ = this.input.onKeyUp$.pipe(
        filter((e) => isArrowKeyPressed(e)),
        tap(() => isKeyDown = false),
    );
  </pre>  
Holding down any arrow key fires a debounced sequence of events in regular intervals (ARROW_KEY_CONFIG.repeatInterval)
    <pre>
    const keyDown$ = this.input.onKeyDown$.pipe(
        filter((e) => isArrowKeyPressed(e)),
        tap((e: KeyboardEvent) => e.preventDefault()),

    // If you keep a key pressed, many keyboard events are emitted,
    // but we are only interested in the first one.

        filter(() => !isKeyDown),
        tap(() => isKeyDown = true),

    // After a short delay start emitting events in regular intervals...

        debounceTime(300),
        switchMap(e => {
                if (isKeyDown) {
                    return interval(ARROW_KEY_CONFIG.repeatInterval).pipe(
                        
                        // until the key is not pressed anymore
                        takeUntil(this.input.onKeyUp$),
                        
                        // emit the initial event object each time  
                        map(i => e),
                    )
                } else {
                    return of(undefined);
                }
            }
        ),
    );
</pre>    
Forward each event to the ArrowKeyInput's onChange event handler.
<pre>
    const onInputChanged = e => {
        if (e) {
            this.value = this.getIncrementedValue(e);
            onChange(this.value);
        }
    }

    keyUp$.subscribe(onInputChanged);
    keyDown$.subscribe(onInputChanged);
    </pre>
    `)
            .append("<a target='_blank' href='https://github.com/retojs/comicvm-dom/blob/master/src/demos/RxJs-demo.ts'>view source</a>"))
        .append("see <a target='_blank' href='https://github.com/retojs/comicvm-dom/blob/master/../dom/RxJs.ts'>RxJs.ts</a> on GitHub");
}


