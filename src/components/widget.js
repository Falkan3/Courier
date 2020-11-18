import { objectForEach } from '../utils/object';
import EventsBinder from '../core/event/events-binder';
import Reef from '../libs/reefjs/reef.es';
import { elemContains } from '../utils/dom';
import { isHidden as widgetIsHidden, setHidden as widgetSetHidden } from '../utils/widget';


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
            if (Courier.settings.cookies.hideWidget.active) {
                if (widgetIsHidden(Courier.settings.cookies.hideWidget.nameSuffix)) {
                    this.hide(false);
                }
            }
            Events.emit('widget.mount.after');
        },

        /**
         * Handles click events.
         *
         * @param  {Object} event
         */
        onClick(event) {
            const courierWidgetButton = Components.App.refs.app.elem.querySelector('#courierWidgetButton');
            if (event.target.matches('#courierWidgetButton')
                || (elemContains(courierWidgetButton, event.target))) {
                Components.Chat.open();
            }
            const courierWidgetHideButton = Components.App.refs.app.elem.querySelector('#courierWidgetHideButton');
            if (event.target.matches('#courierWidgetHideButton')
                || (elemContains(courierWidgetHideButton, event.target))) {
                this.hide();
            }
        },

        close() {
            this.refs.widget.data.active = false;
            Events.emit('widget.close');
        },

        open() {
            this.refs.widget.data.active = true;
            Events.emit('widget.open');
        },

        hide(save = true) {
            this.refs.widget.data.active = false;
            if (save) {
                widgetSetHidden(true, Courier.settings.cookies.hideWidget.duration,
                    Courier.settings.cookies.hideWidget.nameSuffix);
            }
            Events.emit('widget.hide');
        },

        /**
         * Initialize the widget.
         */
        initialize() {
            Widget.refs.widget = new Reef('#courierWidget', {
                data: {
                    active: true,
                    text: Courier.settings.texts.widgetGreeting,
                    hideBtnActive: false,
                },
                template: (props) => {
                    if (!props.active) {
                        return '';
                    }

                    const hideBtn = props.hideBtnActive
                        ? `
                        <button id="courierWidgetHideButton" class="${Courier.settings.classes.widget}-hide-btn" type="button" aria-label="Hide widget">
                            ${Courier.settings.images.closeBtn}
                        </button>
                        `
                        : '';

                    return `
                    <div class="${Courier.settings.classes.widget}-wrapper ${Courier.settings.classes.root}__appear-bottom ${Courier.settings.classes.root}__anim-timing--half">
                        <button id="courierWidgetButton" class="${Courier.settings.classes.widget}-bubble" type="button" aria-label="Open widget">
                            <div class="${Courier.settings.classes.widget}-img" aria-hidden="true">
                                ${Courier.settings.images.widget}
                            </div>
                            <p>${props.text}</p>
                        </button>
                        ${hideBtn}
                    </div>
                    `;
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
     * Bind event listeners after App has been mounted and rendered for the first time
     */
    Events.on('app.mounted', () => {
        /**
         * Close the widget when the chat opens
         */
        Events.on('chat.opened', () => {
            Widget.close();
        });

        /**
         * Open the widget when the chat closes
         */
        Events.on('chat.closed', () => {
            Widget.refs.widget.data.hideBtnActive = true;
            Widget.open();
        });
    });

    /**
     * Bind event listeners after App has been rendered
     */
    Events.on('app.click', (event) => {
        Widget.onClick(event);
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
