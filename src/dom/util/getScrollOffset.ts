import { Offset } from "comicvm-geometry-2d";

export function getScrollOffset(): Offset {
    const left = window.pageXOffset || document.documentElement.scrollLeft;
    const top = window.pageYOffset || document.documentElement.scrollTop;
    return new Offset(left, top);
}
