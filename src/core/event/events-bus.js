/* eslint-disable import/no-unresolved */
import { isArray } from '@utils/types';

export default class EventsBus {
    /**
     * Construct a EventBus instance.
     *
     * @param {Object} events
     */
    constructor(events = {}) {
        this.events = events;
        this.hop = events.hasOwnProperty;
    }

    /**
     * Adds listener to the specified event.
     *
     * @param {String|Array} event
     * @param {Function} handler
     * @returns {{remove: remove}}
     */
    on(event, handler) {
        if (isArray(event)) {
            for (let i = 0; i < event.length; i++) {
                this.on(event[i], handler);
            }
        }

        // Create the event's object if not yet created
        if (!this.hop.call(this.events, event)) {
            this.events[event] = [];
        }

        // Add the handler to queue
        const index = this.events[event].push(handler) - 1;

        // Provide handle back for removal of event
        return {
            remove: () => {
                delete this.events[event][index];
            }
        };
    }

    /**
     * Runs registered handlers for specified event.
     *
     * @param {String|Array} event
     * @param {Object=} context
     */
    emit(event, context) {
        if (isArray(event)) {
            for (let i = 0; i < event.length; i++) {
                this.emit(event[i], context);
            }
        }

        // If the event doesn't exist, or there's no handlers in queue, just leave
        if (!this.hop.call(this.events, event)) {
            return;
        }

        // Cycle through events queue, fire!
        this.events[event].forEach((item) => {
            item(context || {});
        });
    }

    destroy() {
        this.events = {};
    }
}
