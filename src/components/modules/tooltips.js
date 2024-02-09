/* eslint-disable import/no-unresolved */
import EventsBinder from '@core/event/events-binder.js';
import throttle from '@libs/throttle-debounce/throttle.js';

export default function (Courier, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    const Binder = new EventsBinder();

    const Tooltips = {
        currId: 1,
        refs: {
            timers: {},
            tooltips: {},
            activeTooltips: []
        },
        settings: {
            // delay: 100,
            throttle: 10,
            followMouse: true
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
            Binder.on('mouseenter', Components.App.refs.app.elem, throttle(this.settings.throttle, (event) => {
                this.onMouseEnterMouseLeave(event);
                this.onMouseEnter(event);
            }, { noLeading: false, noTrailing: false }), true);
            Binder.on('mouseleave', Components.App.refs.app.elem, throttle(this.settings.throttle, (event) => {
                this.onMouseEnterMouseLeave(event);
                this.onMouseLeave(event);
            }, { noLeading: false, noTrailing: false }), true);
            Binder.on('mousemove', document.body, (event) => {
                this.onMouseMove(event);
            }, true);
        },

        /**
         * Removes events.
         */
        unbind() {
            Binder.off('mouseenter', Components.App.refs.app.elem, true);
            Binder.off('mouseleave', Components.App.refs.app.elem, true);
            Binder.off('mousemove', document.body, true);
        },

        /**
         * Handles click events.
         *
         * @param  {Object} event
         */
        onClick(event) {
            const closestTooltip = event.target.closest('[data-courier-tooltip]');
            if (closestTooltip) {
                this.hideTooltip(closestTooltip.dataset.tpId);
            }
        },

        setId(el) {
            if (el.dataset.tpId) {
                return el.dataset.tpId;
            }

            const id = this.currId;
            this.currId += 1;
            // set ref IDs
            el.dataset.tpId = id;
            return id;
        },

        showTooltip(el, options = {}) {
            const id = el.dataset.tpId;
            if (Object.prototype.hasOwnProperty.call(this.refs.tooltips, id)) {
                return this.refs.tooltips[id];
            }

            const attId = `tp-${id}`;
            // create tooltip element
            const tooltip = document.createElement('div');
            tooltip.classList.add(`${Courier.settings.classes.root}__tooltip`);
            tooltip.setAttribute('role', 'tooltip');
            tooltip.setAttribute('inert', 'true');
            tooltip.textContent = el.dataset.courierTooltip;
            // set ref IDs
            el.setAttribute('aria-describedby', attId);
            tooltip.id = attId;
            tooltip.dataset.tpId = id;
            // append the tooltip element
            document.body.append(tooltip);

            const obj = {
                // id,
                parent: el,
                tooltip
            };
            this.refs.tooltips[id] = obj;
            this.refs.activeTooltips.push(id);

            // move the tooltip with the mouse
            this.setTooltipPosition(obj, {
                mouseX: options.mouseX ?? null,
                mouseY: options.mouseY ?? null
            });

            return obj;
        },

        hideTooltip(id) {
            if (!Object.prototype.hasOwnProperty.call(this.refs.tooltips, id)) {
                return;
            }

            // clear active tooltip
            const activeTooltipIndex = this.findActiveTooltipIndexByParent(
                this.refs.tooltips[id].parent
            );
            if (activeTooltipIndex === -1) {
                return;
            }
            this.refs.activeTooltips.splice(activeTooltipIndex, 1);

            // clear appear timer
            this.clearTimer(id);

            const tooltipObj = this.refs.tooltips[id];

            // remove element attributes
            tooltipObj.parent.removeAttribute('aria-describedby');

            // remove tooltip
            tooltipObj.tooltip.remove();
            delete this.refs.tooltips[id];
            // this.refs.tooltips.splice(tooltipIndex, 1);
        },

        setTooltipPosition(tooltipObj, options = {}) {
            const tooltipEl = tooltipObj.tooltip;
            if (this.settings.followMouse) {
                // const tooltipWidth = tooltipEl.offsetWidth;
                // const tooltipHeight = tooltipEl.offsetHeight;
                const posX = `${options.mouseX}px`;
                const posY = `${options.mouseY - 10}px`;
                tooltipEl.style.top = posY;
                tooltipEl.style.left = posX;
                this.adjustTooltipBounds(tooltipObj);
            } else {
                // position the tooltip in the root element's center
                const {
                    x, y, width, height
                } = tooltipObj.parent.getBoundingClientRect();
                tooltipEl.style.left = `${Math.floor(x + width / 2)}px`;
                tooltipEl.style.top = `${Math.floor(y - height)}px`;
            }
        },

        adjustTooltipBounds(tooltipObj) {
            const tooltipEl = tooltipObj.tooltip;
            // Get calculated tooltip coordinates and size
            const tooltipRect = tooltipEl.getBoundingClientRect();

            let posX = tooltipRect.x;
            let posY = tooltipRect.y;

            // Corrections if out of window
            if (tooltipRect.x < 0) {
                // Out on the left
                posX = 0;
                // posX += -tooltipRect.x;
            }
            if ((tooltipRect.x + tooltipRect.width) > window.innerWidth) {
                // Out on the right
                posX = window.innerWidth - tooltipRect.width;
                // posX -= (tooltipRect.x + tooltipRect.width) - window.innerWidth;
            }
            if (tooltipRect.y < 0) {
                // Out on the top
                posY = 0;
                // posY += -tooltipRect.y;
            }

            // Apply corrected position
            tooltipEl.style.top = `${posY}px`;
            tooltipEl.style.left = `${posX}px`;
        },

        findActiveTooltipIndexByParent(el) {
            return this.refs.activeTooltips.findIndex((id) => id === el.dataset.tpId);
        },

        clearTimer(id) {
            if (!Object.prototype.hasOwnProperty.call(this.refs.timers, id)) {
                return;
            }

            clearTimeout(this.refs.timers[id].timeout);
            // this.refs.timers.splice(timerIndex, 1);
            delete this.refs.timers[id];
        },

        onMouseEnterMouseLeave(event) {
            const el = event.target.closest('[data-courier-tooltip]');
            if (!el) {
                return;
            }
            this.clearTimer(el.dataset.tpId);
        },

        onMouseEnter(event) {
            const el = event.target.closest('[data-courier-tooltip]');
            if (!el) {
                return;
            }

            this.setId(el);

            this.showTooltip(el, {
                mouseX: event.clientX,
                mouseY: event.clientY
            });

            // use this when using an appear delay
            // const timeout = setTimeout(() => {
            //     this.showTooltip(el, event.clientX, event.clientY);
            // }, this.settings.delay);
            // // set disappear timer
            // this.refs.timers[el.dataset.tpId] = {
            //     timeout,
            //     parent: el
            // };
        },

        onMouseMove(event) {
            if (!this.refs.activeTooltips.length) {
                return;
            }

            this.refs.activeTooltips.forEach((id) => {
                if (!this.refs.tooltips[id].parent.contains(event.target)) {
                    this.hideTooltip(id);
                    return;
                }

                if (this.settings.followMouse) {
                    this.setTooltipPosition(
                        this.refs.tooltips[id],
                        {
                            mouseX: event.clientX,
                            mouseY: event.clientY
                        }
                    );
                }
            });
        },

        onMouseLeave(event) {
            if (event.target.matches('[data-courier-tooltip]')) {
                this.hideTooltip(event.target.dataset.tpId);
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
