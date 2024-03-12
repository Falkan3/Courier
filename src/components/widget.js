/* eslint-disable import/no-unresolved */
import EventsBinder from '@core/event/events-binder';
import Reef from '@libs/reefjs/reef.es';
import { elemContains } from '@utils/dom';
import {
    isMinimalized as widgetIsMinimalized, setMinimalized as widgetSetMinimalized,
    isHidden as widgetIsHidden, setHidden as widgetSetHidden
} from '@utils/widget';
import { parseSpecialTags } from '@utils/object.js';

export const WidgetStyles = Object.freeze({
    SIMPLE: 'simple',
    ADVANCED: 'advanced'
});

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
                if (!Widget.canBeMinimalized() || this.refs.widget.data.state.minimalized) {
                    this.hide();
                } else {
                    this.minimalize();
                }
            }
        },

        close() {
            this.refs.widget.data.state.active = false;
            Events.emit('widget.closed');
        },

        open() {
            this.refs.widget.data.state.active = true;
            Events.emit('widget.opened');
        },

        minimalize(save = true) {
            this.refs.widget.data.state.minimalized = true;
            if (save) {
                widgetSetMinimalized(
                    true,
                    Courier.settings.cookies.minimalizeWidget.duration,
                    Courier.settings.cookies.minimalizeWidget.nameSuffix
                );
            }
            Events.emit('widget.minimalized');
        },

        canBeMinimalized() {
            return this.refs.widget.data.state.style === WidgetStyles.ADVANCED;
        },

        hide(save = true) {
            this.refs.widget.data.state.active = false;
            this.refs.widget.data.state.hidden = true;
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
                widgetImg: Courier.settings.images.widget,
                texts: {
                    widgetGreetingTitle: Courier.settings.textsParsed.widgetGreetingTitle,
                    widgetGreeting: Courier.settings.textsParsed.widgetGreeting,
                    name: Courier.settings.textsParsed.widgetName,
                    openWidget: Courier.settings.textsParsed.openWidget,
                    hideWidget: Courier.settings.textsParsed.hideWidget
                },
                state: {
                    active: Courier.settings.state.widgetActiveAtStart,
                    minimalized: false,
                    hidden: !Courier.settings.state.widgetActiveAtStart,
                    style: Courier.settings.state.widgetStyle,
                    hideBtnActive: Courier.settings.state.hideBtnActiveAtStart,
                    online: Courier.settings.state.online
                }
            };

            if (update) {
                data.state.active = this.refs.widget.data.state.active;
                data.state.minimalized = this.refs.widget.data.state.minimalized;
                data.state.hidden = this.refs.widget.data.state.hidden;
                data.state.online = this.refs.widget.data.state.online;
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
                    if (!props.state.active) {
                        return '';
                    }

                    const hideBtn = props.state.hideBtnActive
                        ? `
                        <button id="courierWidgetHideButton" class="${Courier.settings.classes.widget}-hide-btn" type="button" aria-label="${props.texts.hideWidget}">
                            ${Courier.settings.images.closeBtn}
                        </button>`
                        : '';

                    return `
                    <div class="${Courier.settings.classes.widget}-wrapper ${Courier.settings.classes.widget}-wrapper--${props.state.style} ${Courier.settings.classes.root}__appear-bottom ${Courier.settings.classes.root}__anim-timing--half">
                        ${this.getHtml(props.state.style, props)}
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

        getHtml(style, props) {
            let html = '';

            switch (style) {
            case WidgetStyles.SIMPLE: {
                const widgetImg = props.widgetImg
                    ? `
                        <span class="${Courier.settings.classes.widget}-img" aria-hidden="true">
                            ${Courier.settings.images.widget}
                        </span>`
                    : '';

                const widgetText = props.texts.widgetGreeting
                    ? `<p class="${Courier.settings.classes.widget}-greeting">${props.texts.widgetGreeting}</p>`
                    : '';

                html = `
                    <button id="courierWidgetButton" class="${Courier.settings.classes.widget}-bubble" type="button" aria-label="${props.texts.openWidget}">
                        <span class="${Courier.settings.classes.widget}-greeting-wrapper">
                            ${widgetImg}
                            ${widgetText}
                        </span>
                    </button>
                    `;
                break;
            }
            case WidgetStyles.ADVANCED: {
                const widgetImg = props.widgetImg
                    ? `
                        <span class="${Courier.settings.classes.widget}-img" aria-hidden="true">
                            ${Courier.settings.images.widget}
                        </span>`
                    : '';

                const name = props.texts.name
                    ? `<p class="${Courier.settings.classes.widget}-name">${props.texts.name}</p>`
                    : '';

                // Return the minimalized version

                if (props.state.minimalized) {
                    return `
                    <button id="courierWidgetButton" class="${Courier.settings.classes.widget}-bubble ${Courier.settings.classes.widget}--minimalized ${props.state.online ? `${Courier.settings.classes.widget}--online` : ''}" type="button" aria-label="${props.texts.openWidget}">
                        <span class="${Courier.settings.classes.widget}-greeting-wrapper">
                            ${widgetImg}
                        </span>

                        ${name}
                    </button>
                    `;
                }

                // If not minimalized - continue

                const widgetTitle = props.texts.widgetGreetingTitle
                    ? `<p class="${Courier.settings.classes.widget}-greeting-title">${props.texts.widgetGreetingTitle}</p>`
                    : '';

                const widgetText = props.texts.widgetGreeting
                    ? `<p class="${Courier.settings.classes.widget}-greeting-msg">${props.texts.widgetGreeting}</p>`
                    : '';

                html = `
                    <button id="courierWidgetButton" class="${Courier.settings.classes.widget}-bubble ${props.state.online ? `${Courier.settings.classes.widget}--online` : ''}" type="button" aria-label="${props.texts.openWidget}">
                        <span class="${Courier.settings.classes.widget}-greeting-wrapper">
                            ${widgetImg}
                            ${widgetTitle}
                        </span>

                        ${widgetText}
                        ${name}
                    </button>
                    `;
                break;
            }
            default:
                break;
            }

            return parseSpecialTags(html, Courier.settings, props);
        }
    };

    Events.on('mount.after', () => {
        Widget.initialize();
        if (Widget.canBeMinimalized() && Courier.settings.cookies.minimalizeWidget.active) {
            if (widgetIsMinimalized(Courier.settings.cookies.minimalizeWidget.nameSuffix)) {
                Widget.minimalize(false);
            }
        }
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
         * Close the widget when the chat or popup opens, and set state to minimalized
         */
        Events.on(['chat.opened', 'popup.opened'], () => {
            Widget.close();
            Widget.minimalize();
        });

        /**
         * Open the widget when the chat or popup closes
         */
        Events.on(['chat.closed', 'popup.closed'], () => {
            if (Widget.refs.widget.data.state.hidden) {
                return;
            }

            if (Courier.settings.cookies.hideWidget.active
                && widgetIsHidden(Courier.settings.cookies.hideWidget.nameSuffix)) {
                return;
            }

            Widget.refs.widget.data.state.hideBtnActive = true;
            Widget.open();
        });

        /**
         * Add close trigger
         */

        Events.on('widget.close', () => {
            Widget.close();
        });

        /**
         * Add minimalize trigger
         */
        Events.on('widget.minimalize', (save) => {
            if (!Widget.canBeMinimalized()) {
                return;
            }
            Widget.minimalize(save);
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
