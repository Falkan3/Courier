/* eslint-disable import/no-unresolved */
import { copyTextToClipboard } from '@utils/dom.js';
import { debounce } from '@libs/throttle-debounce/index.js';

export function copyCouponCodeToClipboard(component, parentEl, discountCode, options = {}) {
    const settings = {
        copyMsg: component.settings.textsParsed.clipboardCopy,
        msgDuration: component.settings.state.clipboardCopyMsgDuration,
        ...options
    };
    copyTextToClipboard(discountCode);

    // add copy message element
    let copyMessageEl = parentEl.querySelector(`.${component.settings.classes.popup}-discount-code-copy-msg`);
    if (copyMessageEl === null) {
        copyMessageEl = document.createElement('p');
        copyMessageEl.classList.add(`${component.settings.classes.popup}-discount-code-copy-msg`, `${component.settings.classes.root}__fade-in`, `${component.settings.classes.root}__anim-timing--third`, 'active');
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
