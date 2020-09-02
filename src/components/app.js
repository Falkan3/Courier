import Reef from '../libs/reefjs/reef.es';
import EventsBinder from '../core/event/events-binder';


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
            Binder.on('click', Components.App.refs.app.elem, event => this.click(event));
        },

        /**
         * Removes click events.
         */
        unbind() {
            Binder.off('click', Components.App.refs.app.elem);
        },

        /**
         * Handles click events.
         *
         * @param  {Object} event
         */
        click(event) {
            Events.emit('app.click', event);
        },

        /**
         * Initialize the app wrapper.
         */
        initialize() {
            App.refs.app = new Reef(Courier.rootElement, {
                data: {},
                template: props => `
                <div id="courierRoot" class="${Courier.settings.classes.root}">
                    <div id="courierChat" class="${Courier.settings.classes.chat}"></div>
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
     * Destroy elements:
     * - on destroy to remove rendered elements
     * - on app.mount.before to rerender elements and apply changes
     */
    Events.on('mount.after', () => {
        App.render();
        Events.emit('app.rendered');
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

    return App;
}
