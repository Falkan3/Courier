/* eslint-disable import/no-unresolved */
import { component as Reef, signal } from '@libs/reefjs/reef.es';
import EventsBinder from '@core/event/events-binder';

export default function Construct(Courier, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    const Binder = new EventsBinder();

    const App = {
        refs: {},
        templateData: signal({
            //
        }, 'app'),

        mount() {
            Events.emit('app.mount.before');
            this.initialize();
            this.bind();
            Events.emit('app.mount.after');
        },

        /**
         * Adds events.
         */
        bind() {
            Binder.on('click', Components.App.refs.app.elem, (event) => this.onClick(event));
            Binder.on('keydown', Courier.rootElement, (event) => this.onKeydown(event));
            Binder.on('error', Courier.rootElement, (event) => this.onError(event), true);
            Binder.on('reef:render', Components.App.refs.app.elem, (event) => this.onRendered(event));
            Binder.on('reef:before-render', Components.App.refs.app.elem, (event) => this.onBeforeRender(event));
        },

        /**
         * Removes events.
         */
        unbind() {
            Binder.off('click', Components.App.refs.app.elem);
            Binder.off('keydown', Courier.rootElement);
            Binder.off('reef:render', Components.App.refs.app.elem);
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
            Events.emit('root.keydown', event);
        },

        /**
         * Handles error events.
         *
         * @param  {Object} event
         */
        onError(event) {
            const elm = event.target;
            if (elm.tagName === 'IMG') {
                elm.src = Courier.settings.images.imgPlaceholder;
            }
        },

        /**
         * Handles render events.
         *
         * @param  {Object} event
         */
        onBeforeRender(event) {
            Events.emit('app.beforeRender', event);
        },

        /**
         * Handles render events.
         *
         * @param  {Object} event
         */
        onRendered(event) {
            Events.emit('app.rendered', event);
            if (event.target.isEqualNode(App.refs.app.elem)) {
                Events.emit('app.rendered.app', event);
            }
        },

        /**
         * Initialize the app wrapper.
         */
        initialize() {
            const rootClasses = [
                Courier.settings.classes.root,
                ...Courier.settings.modifierClasses.root
            ];

            App.refs.app = Reef(Courier.rootElement, () => {
                const componentHtmlArr = [];
                if (Object.prototype.hasOwnProperty.call(Components, 'Chat')) {
                    componentHtmlArr.push(`<div id="courierChat" class="${Courier.settings.classes.chat}"></div>`);
                }
                if (Object.prototype.hasOwnProperty.call(Components, 'Popup')) {
                    componentHtmlArr.push(`<div id="courierPopup" class="${Courier.settings.classes.popup}"></div>`);
                }

                return `
                <div id="courierRoot" class="${rootClasses.join(' ')}">
                    ${componentHtmlArr.join('')}
                    <div id="courierWidget" class="${Courier.settings.classes.widget}"></div>
                </div>`;
            }, { signals: ['app'] });
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
        App.bind();
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
        // App.refs = {};
    });

    Events.on(['destroy:after'], () => {
        App.refs = {};
    });

    // Rerender after app has been mounted
    // Events.on('app.mount.after', () => {
    //     App.render();
    // });

    return App;
}
