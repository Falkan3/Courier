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

export default applyClasses;
