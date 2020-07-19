const INIT_DELAY = 200;

const elements2Initialize: HTMLElement[] = [];

let initTimeoutID;

/**
 * Adds the specified HTML element to the array elements2Initialize and
 * schedules a delayed trigger for an 'init' event on all elements in elements2Initialize.
 *
 * Every DomElement that gets appended to a container calls this method,
 * and for every new element the 'init' trigger is postponed to the initial delay again (INIT_DELAY).
 * Like this the 'init' event is only fired once after all elements have been added.
 *
 * @param htmlElement
 */
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