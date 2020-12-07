/* eslint-disable import/no-unresolved */
import Reef from '@libs/reefjs/reef.es';
import EventsBinder from '@core/event/events-binder';

export default function (Courier, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    const Binder = new EventsBinder();

    const App = {
        refs: {},

        mount() {
            Events.emit('app.mount.before');
            this.initialize();
            this.bind();
            Events.emit('app.mount.after');
        },

        /**
         * Adds click events.
         */
        bind() {
            Binder.on('click', Components.App.refs.app.elem, event => this.onClick(event));
            Binder.on('keydown', Components.App.refs.app.elem, event => this.onKeydown(event));
            Binder.on('render', Components.App.refs.app.elem, event => this.onRendered(event));
        },

        /**
         * Removes click events.
         */
        unbind() {
            Binder.off('click', Components.App.refs.app.elem);
            Binder.off('keydown', Components.App.refs.app.elem);
            Binder.off('render', Components.App.refs.app.elem);
        },

        /**
         * Handles click events.
         *
         * @param  {Object} event
         */
        onClick(event) {
            Events.emit('app.click', event);
        },

        /**
         * Handles keydown events.
         *
         * @param  {Object} event
         */
        onKeydown(event) {
            Events.emit('app.keydown', event);
        },

        /**
         * Handles render events.
         *
         * @param  {Object} event
         */
        onRendered(event) {
            Events.emit('app.rendered', event);
        },

        /**
         * Initialize the app wrapper.
         */
        initialize() {
            const componentHtmlArr = [];
            if (Object.prototype.hasOwnProperty.call(Components, 'Chat')) {
                componentHtmlArr.push(`<div id="courierChat" class="${Courier.settings.classes.chat}"></div>`);
            }
            if (Object.prototype.hasOwnProperty.call(Components, 'Popup')) {
                componentHtmlArr.push(`<div id="courierPopup" class="${Courier.settings.classes.popup}"></div>`);
            }

            App.refs.app = new Reef(Courier.rootElement, {
                data: {},
                template: props => `
                <div id="courierRoot" class="${Courier.settings.classes.root}">
                    ${componentHtmlArr.join('')}
                    <div id="courierWidget" class="${Courier.settings.classes.widget}"></div>
                </div>`,
            });
        },

        /**
         * Render components
         */
        render() {
            App.refs.app.render();
        },
    };

    /**
     * Rerender App component
     * - on mount.after event after all components have been mounted
     */
    Events.on('mount.after', () => {
        App.render();
        Events.emit('app.mounted');
    });

    /**
     * Remove bindings from click:
     * - on destroying to remove added events
     * - on updating to remove events before remounting
     */
    Events.on(['destroy', 'update'], () => {
        App.unbind();
    });

    /**
     * Remount component
     * - on updating to reflect potential changes in settings
     */
    Events.on('update', () => {
        App.mount();
    });

    /**
     * Destroy binder:
     * - on destroying to remove listeners
     */
    Events.on(['destroy'], () => {
        Binder.destroy();
    });

    /**
     * Destroy elements:
     * - on destroy to remove rendered elements
     * - on app.mount.before to rerender elements and apply changes
     */
    Events.on(['destroy', 'app.mount.before'], () => {
        App.refs = {};
    });

    // Rerender after app has been mounted
    // Events.on('app.mount.after', () => {
    //     App.render();
    // });

    return App;
}
