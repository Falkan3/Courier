/* eslint-disable import/no-unresolved */
import { getCookie, setCookie } from '@utils/cookies';
import { clone } from '@utils/object';
import { copyTextToClipboard } from '@utils/dom.js';

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

export function copyCouponCodeToClipboard(parentEl, discountCode, options = {}) {
    const settings = {
        copyMsg: 'Code copied to clipboard',
        msgDuration: 1000,
        ...options
    };
    copyTextToClipboard(discountCode);
    parentEl.classList.add('active');
    // calculate optimal tooltip visibility duration based on message length
    const timeoutDuration = Math.max(
        settings.msgDuration,
        (Math.round(
            (settings.copyMsg.length / 20) * 100
        ) / 100) * 1000
    );
    setTimeout(() => {
        parentEl.classList.remove('active');
    }, timeoutDuration);
}

export default replyFromScenario;
