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

export default applyClasses;
