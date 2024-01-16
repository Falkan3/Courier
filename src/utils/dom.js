import { isArray } from './types';

/**
 * Applies classes from settings to an element
 *
 * @param  {Object} el                  The DOM element to alter the classList of.
 * @param  {String|Array} classes       Name of the element.
 */
export function applyClasses(el, classes) {
    if (isArray(classes)) {
        classes.forEach((elClass) => {
            el.classList.add(elClass);
        });
    } else {
        el.classList.add(classes);
    }
}

/**
 * Check if the element exists and contains the target element.
 *
 * @param  {Element} el         The DOM element check if it contains the target
 * @param  {Element} target     The target element to check.
 */
export function elemContains(el, target) {
    return el && el.contains(target);
}

/**
 * Applies classes from settings to an element
 *
 * @param  {Element|Node} el  The DOM element to check if it's scrolled to the bottom.
 */
export function isScrolledToTheBottom(el) {
    return el && el.scrollHeight - el.offsetHeight <= el.scrollTop;
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    let success = true;
    try {
        success = document.execCommand('copy');
    } catch (err) {
        success = false;
    }

    document.body.removeChild(textArea);
    return success;
}

export function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        return fallbackCopyTextToClipboard(text);
    }
    return navigator.clipboard.writeText(text).then(() => true, () => false);
}
