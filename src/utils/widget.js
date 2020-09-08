import { getCookie, setCookie } from './cookies';

/**
 * Save widget hidden state to cookie
 *
 * @param {Boolean} hidden      If the widget should be hidden
 * @param {Number} duration     Cookie duration in hours
 */
export function setHidden(hidden, duration) {
    setCookie('courierWidgetHidden', hidden, duration);
}

/**
 * Check if the widget should be hidden
 *
 * @returns Object|null
 */
export function isHidden() {
    return getCookie('courierWidgetHidden') === 'true'; // compare to string because the boolean has been stringified when saved in cookie
}

export default isHidden;
