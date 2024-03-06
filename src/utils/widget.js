import { getCookie, setCookie } from './cookies';

/**
 * Save widget hidden state to cookie
 *
 * @param {Boolean} minimalized          If the widget should be minimalized
 * @param {Number} duration         Cookie duration in hours
 * @param {string} nameSuffix       Cookie name suffix
 */
export function setMinimalized(minimalized, duration, nameSuffix = '') {
    setCookie(`courier_widget_minimalized${nameSuffix}`, minimalized, duration);
}

/**
 * Check if the widget should be hidden
 *
 * @param {string} nameSuffix  Cookie name suffix
 *
 * @returns Object|null
 */
export function isMinimalized(nameSuffix = '') {
    return getCookie(`courier_widget_minimalized${nameSuffix}`) === 'true'; // compare to string because the boolean has been stringified when saved in cookie
}

/**
 * Save widget hidden state to cookie
 *
 * @param {Boolean} hidden          If the widget should be hidden
 * @param {Number} duration         Cookie duration in hours
 * @param {string} nameSuffix       Cookie name suffix
 */
export function setHidden(hidden, duration, nameSuffix = '') {
    setCookie(`courier_widget_hidden${nameSuffix}`, hidden, duration);
}

/**
 * Check if the widget should be hidden
 *
 * @param {string} nameSuffix  Cookie name suffix
 *
 * @returns Object|null
 */
export function isHidden(nameSuffix = '') {
    return getCookie(`courier_widget_hidden${nameSuffix}`) === 'true'; // compare to string because the boolean has been stringified when saved in cookie
}

export default isHidden;
