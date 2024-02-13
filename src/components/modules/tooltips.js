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
            throttle: {
                mouse: 10,
                scroll: 1
            },
            followMouse: true,
            offset: {
                y: -10
            }
        },
        state: {
            scheduledAnimationFrame: false,
            scroll: {
                x: 0,
                y: 0
            },
            mouse: {
                x: 0,
                y: 0
            }
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
            Binder.on('mouseenter', Components.App.refs.app.elem, throttle(this.settings.throttle.mouse, (event) => {
                this.setMousePosition(event.clientX, event.clientY);
                this.onMouseEnterMouseLeave(event);
                this.onMouseEnter(event);
            }, { noLeading: false, noTrailing: false }), true);
            Binder.on('mouseleave', Components.App.refs.app.elem, throttle(this.settings.throttle.mouse, (event) => {
                this.onMouseEnterMouseLeave(event);
                this.onMouseLeave(event);
            }, { noLeading: false, noTrailing: false }), true);
            Binder.on('mousemove', document.body, (event) => {
                this.setMousePosition(event.clientX, event.clientY);
                this.onMouseMove(event);
            }, true);
            Binder.on('scroll', window, (event) => {
                this.setScrollPosition(window.scrollX, window.scrollY);
                this.state.scheduledAnimationFrame = true;
                window.requestAnimationFrame(() => {
                    this.state.scheduledAnimationFrame = false;
                    this.onScroll(event);
                });
            });
        },

        /**
         * Removes events.
         */
        unbind() {
            Binder.off('mouseenter', Components.App.refs.app.elem, true);
            Binder.off('mouseleave', Components.App.refs.app.elem, true);
            Binder.off('mousemove', document.body, true);
            Binder.off('scroll', window);
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

        showTooltip(el) {
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
            this.setTooltipPosition(obj);

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

        setTooltipPosition(tooltipObj) {
            const tooltipEl = tooltipObj.tooltip;
            if (this.settings.followMouse) {
                const tooltipWidth = tooltipEl.offsetWidth;
                // const tooltipHeight = tooltipEl.offsetHeight;
                const posX = `${this.state.scroll.x + this.state.mouse.x + tooltipWidth / 2}px`;
                const posY = `${this.state.scroll.y + this.state.mouse.y + this.settings.offset.y}px`;
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

            let posX = this.state.scroll.x + tooltipRect.x;
            let posY = this.state.scroll.y + tooltipRect.y;

            // Corrections if out of window
            if (tooltipRect.x < 0) {
                // Out on the left
                posX = 0;
                // posX += -tooltipRect.x;
            }
            if ((tooltipRect.x + tooltipRect.width / 2) > document.body.clientWidth) {
                // Out on the right
                posX = document.body.clientWidth - (tooltipRect.width / 2);
                // posX -= (tooltipRect.x + tooltipRect.width) - document.body.clientWidth;
            }
            if (tooltipRect.y < 0) {
                // Out on the top
                posY = (tooltipRect.height / 2) - this.settings.offset.y;
                // posY += -tooltipRect.y;
            }

            // Apply corrected position
            tooltipEl.style.top = `${posY + this.settings.offset.y}px`;
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

        setScrollPosition(mouseX, mouseY) {
            this.state.scroll.x = mouseX;
            this.state.scroll.y = mouseY;
        },

        setMousePosition(mouseX, mouseY) {
            this.state.mouse.x = mouseX;
            this.state.mouse.y = mouseY;
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

            this.showTooltip(el);

            // use this when using an appear delay
            // const timeout = setTimeout(() => {
            //     this.showTooltip(el);
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
                    this.setTooltipPosition(this.refs.tooltips[id]);
                }
            });
        },

        onMouseLeave(event) {
            if (event.target.matches('[data-courier-tooltip]')) {
                this.hideTooltip(event.target.dataset.tpId);
            }
        },

        onScroll() {
            this.refs.activeTooltips.forEach((id) => {
                this.setTooltipPosition(this.refs.tooltips[id]);
            });
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
