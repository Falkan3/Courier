/* eslint-disable import/no-unresolved */
import { getCookie, setCookie, eraseCookie } from '@utils/cookies';
import { clone } from '@utils/object';
import { copyTextToClipboard } from '@utils/dom.js';
import { debounce } from '@libs/throttle-debounce/index.js';

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

export function clearMessagePath(nameSuffix = '') {
    eraseCookie(`courier_message_path${nameSuffix}`);
}

export function copyCouponCodeToClipboard(component, parentEl, discountCode, options = {}) {
    const settings = {
        copyMsg: component.settings.textsParsed.clipboardCopy,
        msgDuration: component.settings.state.clipboardCopyMsgDuration,
        ...options
    };
    copyTextToClipboard(discountCode);

    // add copy message element
    let copyMessageEl = parentEl.querySelector(`.${component.settings.classes.chat}-discount-code-copy-msg`);
    if (copyMessageEl === null) {
        copyMessageEl = document.createElement('p');
        copyMessageEl.classList.add(`${component.settings.classes.chat}-discount-code-copy-msg`, `${component.settings.classes.root}__fade-in`, `${component.settings.classes.root}__anim-timing--third`, 'active');
        copyMessageEl.innerText = settings.copyMsg;
        parentEl.append(copyMessageEl);
    }

    // calculate optimal tooltip visibility duration based on message length
    const timeoutDuration = Math.max(
        settings.msgDuration,
        (Math.round(
            (settings.copyMsg.length / 20) * 100
        ) / 100) * 1000
    );

    debounce(timeoutDuration, () => {
        copyMessageEl.classList.add(`${component.settings.classes.root}__fade-out`);
        copyMessageEl.addEventListener('animationend', () => copyMessageEl.remove());
    })();
}

export default replyFromScenario;
