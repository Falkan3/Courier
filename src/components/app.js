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
            this.render();
            Events.emit('app.mount.after');
        },

        /**
         * Adds click events.
         */
        bind() {
            Binder.on('click', document, event => this.click(event));
        },

        /**
         * Removes click events.
         */
        unbind() {
            Binder.off('click', document);
        },

        /**
         * Handles click events.
         *
         * @param  {Object} event
         */
        click(event) {
            return event;
        },

        /**
         * Initialize the app wrapper.
         */
        initialize() {
            this.refs.app = new Reef(Courier.rootElement, {
                data: {
                    test: 'Test!',
                },
                template: props => `
                    <div id="test">
                        <p>${props.test}</p>
                    </div>`,
            });
        },

        /**
         * Render components
         */
        render() {
            this.refs.app.render();
        },
    };

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
        this.refs = [];
    });

    return App;
}
