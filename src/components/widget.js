import { objectForEach } from '../utils/object';
import EventsBinder from '../core/event/events-binder';
import Reef from '../libs/reefjs/reef.es';


export default function (Courier, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    const Binder = new EventsBinder();

    const Widget = {
        refs: {},

        mount() {
            Events.emit('widget.mount.before');
            this.initialize();
            Events.emit('widget.mount.after');
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
            if (event.target.matches('#courierWidgetButton') || document.querySelector('#courierWidgetButton').contains(event.target)) {
                Components.Chat.open();
            }

            return event;
        },

        close() {
            this.refs.widget.data.active = false;
            Events.emit('widget.close');
        },

        open() {
            this.refs.widget.data.active = true;
            Events.emit('widget.open');
        },

        /**
         * Initialize the widget.
         */
        initialize() {
            Widget.refs.widget = new Reef('#courierWidget', {
                data: {
                    active: true,
                    text: 'Hello!',
                },
                template: (props) => {
                    if (!props.active) {
                        return '';
                    }

                    return `
                    <button id="courierWidgetButton" class="${Courier.settings.classes.widget}-bubble ${Courier.settings.classes.root}__appear-bottom" type="button" aria-label="Open widget">
                        <div class="${Courier.settings.classes.widget}-img" aria-hidden="true">
                            <img src="https://image.flaticon.com/icons/svg/209/209999.svg" alt="Chat bubbles" />
                        </div>
                        <p>${props.text}</p>
                    </button>`;
                },
                attachTo: Components.App.refs.app,
            });
        },

        /**
         * Render window outer elements.
         */
        render() {
            Widget.refs.widget.render();
        },
    };

    /**
     * Bind event listeners after App has been rendered
     */
    Events.on('app.rendered', () => {
        Widget.bind();
    });

    /**
     * Close the widget when the chat opens
     */
    Events.on('chat.open', () => {
        Widget.close();
    });

    /**
     * Open the widget when the chat closes
     */
    Events.on('chat.close', () => {
        Widget.open();
    });

    /**
     * Remove bindings from click:
     * - on destroying to remove added events
     * - on updating to remove events before remounting
     */
    Events.on(['destroy', 'update'], () => {
        Widget.unbind();
    });

    /**
     * Remount component
     * - on updating to reflect potential changes in settings
     */
    Events.on('update', () => {
        Widget.mount();
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
     * - on widget.mount.before to rerender elements and apply changes
     */
    Events.on(['destroy', 'widget.mount.before'], () => {
        objectForEach(Widget.refs, (item) => {
            if (item.el.parentNode) {
                item.el.parentNode.removeChild(item.el);
            }
        });
        /*
        for (let i = 0; i < App.refs.length; i++) {
            App.refs[i].el.parentNode.removeChild(App.refs[i].el);
        }
        */
        Widget.refs = {};
    });

    return Widget;
}
