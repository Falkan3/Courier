/* eslint-disable import/no-unresolved */
import { getCookie, setCookie } from '@utils/cookies';
import { clone } from '@utils/object';

/**
 * Get the start message from the scenario property in settings.
 *
 * @param  {Object} scenario    Message scenario.
 * @return {Object|null}
 */
export function getStartMessage(scenario) {
    if (scenario.start) {
        return clone(scenario.start, true); // copy value, not reference
    }
    return null;
}

/**
 * Find a predefined reply from the scenario property in settings.
 *
 * @param  {Object} scenario    Message scenario.
 * @param  {string} msg         The message.
 * @param  {string} path        The topic's path.
 * @return {Object|Array|null}
 */
export function replyFromScenario(scenario, msg, path) {
    if (path && scenario[path]) {
        return clone(scenario[path], true); // copy value, not reference
    }
    return null;
}

/**
 * Save all chat messages and last path that was selected
 *
 * @param {Number} messagePath      Array containing the path taken
 * @param {Number} duration         Cookie duration in hours
 * @param {string} nameSuffix       Cookie name suffix
 */
export function saveMessagePath(messagePath, duration, nameSuffix = '') {
    setCookie(`courier_message_path${nameSuffix}`, JSON.stringify(messagePath), duration);
}

/**
 * Load saved message path that was selected
 *
 * @return Object|null
 */
export function loadMessagePath(nameSuffix = '') {
    const cookie = getCookie(`courier_message_path${nameSuffix}`);
    return cookie ? JSON.parse(cookie) : cookie;
}

export default replyFromScenario;
