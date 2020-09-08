import { getCookie, setCookie } from './cookies';

/**
 * Find a predefined reply from the scenario property in settings.
 *
 * @param  {Object} scenario    Message scenario.
 * @param  {string} msg         The message.
 * @param  {string} path        The topic's path.
 */
export function replyFromScenario(scenario, msg, path) {
    if (path && scenario[path]) {
        return scenario[path];
    }
    return null;
}

/**
 * Save all chat messages and last path that was selected
 *
 * @param {Number} messagePath      Array containing the path taken
 * @param {Number} duration         Cookie duration in hours
 */
export function saveMessagePath(messagePath, duration) {
    setCookie('courierMessagePath', JSON.stringify(messagePath), duration);
}

/**
 * Load saved message path that was selected
 *
 * @returns Object|null
 */
export function loadMessagePath() {
    const cookie = getCookie('courierMessagePath');
    return cookie ? JSON.parse(cookie) : cookie;
}

export default replyFromScenario;
