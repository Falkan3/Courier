/* eslint-disable import/no-unresolved */
import EventsBinder from '@core/event/events-binder.js';
import throttle from '@libs/throttle-debounce/throttle.js';

export default function Construct(Courier, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    const Binder = new EventsBinder();

    const enterEvents = ['mouseenter']; // touchstart
    const leaveEvents = ['touchend', 'touchcancel'];
    const moveEvents = ['mousemove', 'touchmove'];

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
            followMouse: false,
            holdMinTime: 500,
            offset: {
                y: 10
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
            },
            touch: {
                holdStartTimestamp: null,
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
            Binder.on(
                enterEvents,
                Components.App.refs.app.elem,
                throttle(this.settings.throttle.mouse, (event) => {
                    this.setCursorPosition(event);
                    // this.onMouseEnterMouseLeave(event);
                    this.onMouseEnter(event);
                }),
                { capture: true, passive: true }
            );
            // Binder.on(
            //     'touchstart',
            //     Components.App.refs.app.elem,
            //     (event) => {
            //         this.setCursorPosition(event);
            //         // this.onMouseEnterMouseLeave(event);
            //         this.onTouchStart(event);
            //     },
            //     { capture: true, passive: false }
            // );
            Binder.on(moveEvents, document.body, (event) => {
                this.setCursorPosition(event);
                this.onMouseMove(event);
            }, true);
            Binder.on(leaveEvents, Components.App.refs.app.elem, (event) => {
                // this.onMouseEnterMouseLeave(event);
                this.onTouchLeave(event);
            }, { capture: true, passive: false });
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
            Binder.off(enterEvents, Components.App.refs.app.elem, { capture: true, passive: true });
            // Binder.off('touchstart', Components.App.refs.app.elem, {
            //     capture: true,
            //     passive: false
            // });
            Binder.off(leaveEvents, Components.App.refs.app.elem, {
                capture: true,
                passive: false
            });
            Binder.off(moveEvents, document.body, true);
            Binder.off('scroll', window);
        },

        /**
         * Handles click events.
         *
         * @param  {Object} event
         */
        onClick(event) {
            this.setCursorPosition(event);
            this.onMouseEnter(event);

            // const closestTooltip = event.target.closest('[data-courier-tooltip]');
            // if (closestTooltip) {
            //     if (closestTooltip.tagName !== 'BUTTON') {
            //         // .preventDefault();
            //         return;
            //     }
            //     this.hideTooltip(closestTooltip.dataset.tpId);
            // }
        },

        setId(el) {
            if (el.dataset.tpId) {
                return el.dataset.tpId;
            }

            const id = this.currId;
            this.currId += 1;
            // Set ref IDs
            el.dataset.tpId = id;
            return id;
        },

        showTooltip(el) {
            const id = el.dataset.tpId;
            if (Object.prototype.hasOwnProperty.call(this.refs.tooltips, id)) {
                return this.refs.tooltips[id];
            }

            const attId = `tp-${id}`;
            // Create tooltip element
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

            // Clear active tooltip
            const activeTooltipIndex = this.findActiveTooltipIndexByParent(
                this.refs.tooltips[id].parent
            );
            if (activeTooltipIndex === -1) {
                return;
            }
            this.refs.activeTooltips.splice(activeTooltipIndex, 1);

            // Clear appear timer
            // this.clearTimer(id);

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
                const posY = `${this.state.scroll.y + this.state.mouse.y}px`;
                tooltipEl.style.top = posY;
                tooltipEl.style.left = posX;
                this.adjustTooltipBounds(tooltipObj);
            } else {
                // Position the tooltip in the root element's center
                const tooltipWidth = tooltipEl.offsetWidth;
                const tooltipHeight = tooltipEl.offsetHeight;
                const {
                    x, y, width, height
                } = tooltipObj.parent.getBoundingClientRect();
                tooltipEl.style.left = `${this.state.scroll.x + Math.floor(x + (width / 2) + (tooltipWidth / 2))}px`;
                tooltipEl.style.top = `${this.state.scroll.y + Math.floor(y + height + tooltipHeight)}px`;
                this.adjustTooltipBounds(tooltipObj);
            }
        },

        adjustTooltipBounds(tooltipObj) {
            const tooltipEl = tooltipObj.tooltip;
            // Get calculated tooltip coordinates and size
            const tooltipRect = tooltipEl.getBoundingClientRect();

            let posX = this.state.scroll.x + tooltipRect.x;
            let posY = this.state.scroll.y + tooltipRect.y;

            // Corrections if out of window
            if ((tooltipRect.x - tooltipRect.width / 2) < 0) {
                // Out on the left
                posX = this.state.scroll.x + tooltipRect.width / 2;
                // posX += -tooltipRect.x;
            }
            if ((tooltipRect.x + tooltipRect.width / 2) > document.body.clientWidth) {
                // Out on the right
                posX = this.state.scroll.x + document.body.clientWidth - (tooltipRect.width / 2);
                // posX -= (tooltipRect.x + tooltipRect.width) - document.body.clientWidth;
            }
            if ((tooltipRect.y - tooltipRect.height / 2) < 0) {
                // Out on the top
                posY = this.state.scroll.y + (tooltipRect.height / 2) - this.settings.offset.y;
                // posY += -tooltipRect.y;
            }
            if ((tooltipRect.y + tooltipRect.height / 2) > document.documentElement.clientHeight) {
                // Out on the bottom
                posY = this.state.scroll.y
                    + document.documentElement.clientHeight
                    - (tooltipRect.height / 2);
                // posY += -tooltipRect.y;
            }

            // Apply corrected position
            tooltipEl.style.top = `${posY + this.settings.offset.y}px`;
            tooltipEl.style.left = `${posX}px`;
        },

        findActiveTooltipIndexByParent(el) {
            return this.refs.activeTooltips.findIndex((id) => id === el.dataset.tpId);
        },

        // clearTimer(id) {
        //     if (!Object.prototype.hasOwnProperty.call(this.refs.timers, id)) {
        //         return;
        //     }
        //
        //     clearTimeout(this.refs.timers[id].timeout);
        //     // this.refs.timers.splice(timerIndex, 1);
        //     delete this.refs.timers[id];
        // },

        setScrollPosition(mouseX, mouseY) {
            this.state.scroll.x = mouseX;
            this.state.scroll.y = mouseY;
        },

        setCursorPosition(event) {
            if (event.touches) {
                this.setMousePosition(event.touches[0].clientX, event.touches[0].clientY);
            } else {
                this.setMousePosition(event.clientX, event.clientY);
            }
        },

        setMousePosition(x, y) {
            this.state.mouse.x = x;
            this.state.mouse.y = y;
        },

        // onMouseEnterMouseLeave(event) {
        //     const el = event.target.closest('[data-courier-tooltip]');
        //     if (!el) {
        //         return;
        //     }
        //     this.clearTimer(el.dataset.tpId);
        // },

        onMouseEnter(event) {
            const el = event.target.closest('[data-courier-tooltip]');
            if (!el) {
                return;
            }

            this.setId(el);
            this.showTooltip(el);

            // Use this when using an appear delay
            // const timeout = setTimeout(() => {
            //     this.showTooltip(el);
            // }, this.settings.delay);
            // // set disappear timer
            // this.refs.timers[el.dataset.tpId] = {
            //     timeout,
            //     parent: el
            // };
        },

        onTouchStart(event) {
            const el = event.target.closest('[data-courier-tooltip]');
            if (!el) {
                return;
            }

            this.state.touch.holdStartTimestamp = (new Date()).getTime();

            if (el.tagName === 'BUTTON') {
                return;
            }

            this.setId(el);
            this.showTooltip(el);
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

        onMouseLeave() {
            if (!this.refs.activeTooltips.length) {
                return;
            }

            const target = document.elementFromPoint(this.state.mouse.x, this.state.mouse.y);
            this.refs.activeTooltips.forEach((id) => {
                if (!this.refs.tooltips[id].parent.contains(target)) {
                    this.hideTooltip(id);
                }
            });
        },

        onTouchLeave() {
            const target = document.elementFromPoint(this.state.mouse.x, this.state.mouse.y);
            // const el = event.target.closest('[data-courier-tooltip]');

            // Apply tooltip show delay for buttons
            // if (el
            //     && (el.tagName !== 'BUTTON'
            //     || ((new Date()).getTime()
            //         - this.state.touch.holdStartTimestamp
            //         >= this.settings.holdMinTime))) {
            //     this.setId(el);
            //     this.showTooltip(el);
            // }

            // Reset touch hold timer
            // this.state.touch.holdStartTimestamp = null;

            // Hide active tooltips that weren't touched
            if (!this.refs.activeTooltips.length) {
                return;
            }

            this.refs.activeTooltips.forEach((id) => {
                if (!this.refs.tooltips[id].parent.contains(target)) {
                    this.hideTooltip(id);
                }
            });
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
     * Bind event listeners after root has been updated and binder cleared
     */
    Events.on('update', () => {
        Tooltips.bind();
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
