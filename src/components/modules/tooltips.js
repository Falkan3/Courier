/* eslint-disable import/no-unresolved */
import EventsBinder from '@core/event/events-binder.js';
import { elemContains } from '@utils/dom.js';

export default function (Courier, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    const Binder = new EventsBinder();

    const Tooltips = {
        refs: {
            timers: [],
            tooltips: []
        },
        settings: {
            delay: 100
        },

        /**
         * Construct a Tooltips instance.
         */
        mount() {
            //
        },

        /**
         * Adds events.
         */
        bind() {
            Binder.on('mouseenter', Components.App.refs.app.elem, (event) => {
                this.onMouseEnterMouseLeave(event);
                this.onMouseEnter(event);
            }, true);
            Binder.on('mouseleave', Components.App.refs.app.elem, (event) => {
                this.onMouseEnterMouseLeave(event);
                this.onMouseLeave(event);
            }, true);
        },

        /**
         * Removes events.
         */
        unbind() {
            Binder.off('mouseenter', Components.App.refs.app.elem, true);
            Binder.off('mouseleave', Components.App.refs.app.elem, true);
        },

        /**
         * Handles click events.
         *
         * @param  {Object} event
         */
        onClick(event) {
            const closestTooltip = event.target.closest('[data-courier-tooltip]');
            if (event.target.matches('[data-courier-tooltip]')
                || (closestTooltip !== null)) {
                this.hideTooltip(closestTooltip);
            }
        },

        showTooltip(el) {
            const tooltip = document.createElement('div');
            tooltip.classList.add(`${Courier.settings.classes.root}__tooltip`);
            tooltip.setAttribute('role', 'tooltip');
            tooltip.setAttribute('inert', 'true');
            tooltip.textContent = el.dataset.courierTooltip;
            document.body.append(tooltip);

            const {
                x, y, width, height
            } = el.getBoundingClientRect();
            tooltip.style.left = `${Math.floor(x + width / 2)}px`;
            tooltip.style.top = `${Math.floor(y - height)}px`;

            this.refs.tooltips.push({
                parent: el,
                tooltip
            });
        },

        hideTooltip(el) {
            const tooltipIndex = this.findTooltipIndexByParent(el);
            if (tooltipIndex === -1) {
                return;
            }
            this.refs.tooltips[tooltipIndex].tooltip.remove();
            this.refs.tooltips.splice(tooltipIndex, 1);
        },

        findTimerIndexByParent(el) {
            return this.refs.timers.findIndex((obj) => obj.parent === el);
        },

        findTooltipIndexByParent(el) {
            return this.refs.tooltips.findIndex((obj) => obj.parent === el);
        },

        clearTimer(el) {
            const timerIndex = this.findTimerIndexByParent(el);
            if (timerIndex === -1) {
                return;
            }
            clearTimeout(this.refs.timers[timerIndex].timeout);
            this.refs.timers.splice(timerIndex, 1);
        },

        onMouseEnterMouseLeave(event) {
            if (event.target.matches('[data-courier-tooltip]')) {
                this.clearTimer(event.target);
            }
        },

        onMouseEnter(event) {
            if (event.target.matches('[data-courier-tooltip]')) {
                const timeout = setTimeout(() => {
                    this.showTooltip(event.target);
                }, this.settings.delay);
                this.refs.timers.push({
                    timeout,
                    parent: event.target
                });
            }
        },

        onMouseLeave(event) {
            if (event.target.matches('[data-courier-tooltip]')) {
                this.hideTooltip(event.target);
            }
        }
    };

    /**
     * Bind event listeners after App has been mounted and rendered for the first time
     */
    Events.on('app.mounted', () => {
        Tooltips.bind();
    });

    /**
     * Bind event listeners after App has been rendered
     */
    Events.on('app.click', (event) => {
        Tooltips.onClick(event);
    });

    /**
     * Remove bindings from click:
     * - on destroying to remove added events
     * - on updating to remove events before remounting
     */
    Events.on(['destroy', 'update'], () => {
        Tooltips.unbind();
    });

    /**
     * Destroy binder:
     * - on destroying to remove listeners
     */
    Events.on(['destroy'], () => {
        Binder.destroy();
    });

    return Tooltips;
}
