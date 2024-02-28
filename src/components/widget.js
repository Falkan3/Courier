/* eslint-disable import/no-unresolved */
import EventsBinder from '@core/event/events-binder';
import Reef from '@libs/reefjs/reef.es';
import { elemContains } from '@utils/dom';
import { isHidden as widgetIsHidden, setHidden as widgetSetHidden } from '@utils/widget';

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
            Events.emit('widget.mount');
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
                Events.emit('widget.clicked');
            }
            const courierWidgetHideButton = Components.App.refs.app.elem.querySelector('#courierWidgetHideButton');
            if (event.target.matches('#courierWidgetHideButton')
                || (elemContains(courierWidgetHideButton, event.target))) {
                this.hide();
            }
        },

        close() {
            this.refs.widget.data.active = false;
            Events.emit('widget.closed');
        },

        open() {
            this.refs.widget.data.active = true;
            Events.emit('widget.opened');
        },

        hide(save = true) {
            this.refs.widget.data.active = false;
            this.refs.widget.data.hidden = true;
            if (save) {
                widgetSetHidden(
                    true,
                    Courier.settings.cookies.hideWidget.duration,
                    Courier.settings.cookies.hideWidget.nameSuffix
                );
            }
            Events.emit('widget.hidden');
        },

        getTemplateData(update = false) {
            const data = {
                active: Courier.settings.state.widgetActiveAtStart,
                hidden: !Courier.settings.state.widgetActiveAtStart,
                widgetImg: Courier.settings.images.widget,
                text: Courier.settings.textsParsed.widgetGreeting,
                hideBtnActive: Courier.settings.state.hideBtnActiveAtStart,
            };

            if (update) {
                data.active = this.refs.widget.data.active;
                data.hidden = this.refs.widget.data.hidden;
            }

            return data;
        },

        /**
         * Initialize the widget.
         */
        initialize() {
            Widget.refs.widget = new Reef('#courierWidget', {
                data: this.getTemplateData(),
                template: (props) => {
                    if (!props.active) {
                        return '';
                    }

                    const widgetImg = props.widgetImg
                        ? `
                        <div class="${Courier.settings.classes.widget}-img" aria-hidden="true">
                            ${Courier.settings.images.widget}
                        </div>`
                        : '';

                    const widgetText = props.text
                        ? `<p class="${Courier.settings.classes.widget}-txt">${props.text}</p>`
                        : '';

                    const hideBtn = props.hideBtnActive
                        ? `
                        <button id="courierWidgetHideButton" class="${Courier.settings.classes.widget}-hide-btn" type="button" aria-label="Hide widget">
                            ${Courier.settings.images.closeBtn}
                        </button>`
                        : '';

                    return `
                    <div class="${Courier.settings.classes.widget}-wrapper ${Courier.settings.classes.root}__appear-bottom ${Courier.settings.classes.root}__anim-timing--half">
                        <button id="courierWidgetButton" class="${Courier.settings.classes.widget}-bubble" type="button" aria-label="Open widget">
                            ${widgetImg}
                            ${widgetText}
                        </button>
                        ${hideBtn}
                    </div>
                    `;
                },
                attachTo: Components.App.refs.app
            });
        },

        /**
         * Render window outer elements.
         */
        render() {
            Widget.refs.widget.render();
        },
    };

    Events.on('mount.after', () => {
        Widget.initialize();
        if (Courier.settings.cookies.hideWidget.active) {
            if (widgetIsHidden(Courier.settings.cookies.hideWidget.nameSuffix)) {
                Widget.hide(false);
            }
        }
        Widget.render();
        Events.emit('widget.mounted');
    });

    /**
     * Bind event listeners after App has been mounted and rendered for the first time
     */
    Events.on('app.mounted', () => {
        /**
         * Close the widget when the chat or popup opens
         */
        Events.on(['chat.opened', 'popup.opened'], () => {
            Widget.close();
        });

        /**
         * Open the widget when the chat or popup closes
         */
        Events.on(['chat.closed', 'popup.closed'], () => {
            if (!widgetIsHidden(Courier.settings.cookies.hideWidget.nameSuffix)
                && !Widget.refs.widget.data.hidden) {
                Widget.refs.widget.data.hideBtnActive = true;
                Widget.open();
            }
        });

        /**
         * Add close trigger
         */

        Events.on('widget.close', () => {
            Widget.close();
        });

        /**
         * Add hide trigger
         */
        Events.on('widget.hide', (save) => {
            Widget.hide(save);
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

    });

    /**
     * Remount component
     * - on updating to reflect potential changes in settings
     */
    Events.on('update', () => {
        // Widget.mount();
        Widget.refs.widget.data = Widget.getTemplateData(true);
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
        /*
         objectForEach(Widget.refs, (item) => {
         if (item.el.parentNode) {
         item.el.parentNode.removeChild(item.el);
         }
         });
         */
        /*
         for (let i = 0; i < App.refs.length; i++) {
         App.refs[i].el.parentNode.removeChild(App.refs[i].el);
         }
         */
    });

    Events.on(['destroy:after'], () => {
        Widget.refs = {};
    });

    return Widget;
}
