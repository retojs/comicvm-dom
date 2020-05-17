import { DomElement } from "./DomElement";

const INIT_DELAY = 200;

const elements2Initialize: HTMLElement[] = [];

let initTimeoutID;


export function requestInit(htmlElement: HTMLElement): HTMLElement {

    if (initTimeoutID) {
        clearTimeout(initTimeoutID);
    }
    elements2Initialize.push(htmlElement);

    initTimeoutID = setTimeout(() => {
        (elements2Initialize || []).forEach((e: HTMLElement) => {
            e.dispatchEvent(new Event('init'))
        })
    },
        INIT_DELAY);

    return htmlElement;
}