/* eslint-disable import/no-unresolved */
import EventsBinder from '@core/event/events-binder';
import { component as Reef, signal } from '@libs/reefjs/reef.es';
import { elemContains } from '@utils/dom';
import {
    getUnreadMessagesCount,
    isHidden as widgetIsHidden,
    isMinimalized as widgetIsMinimalized,
    setHidden as widgetSetHidden,
    setMinimalized as widgetSetMinimalized,
    setUnreadMessagesCount
} from '@utils/widget';
import { parseSpecialTags } from '@utils/object.js';

export const WidgetStyles = Object.freeze({
    SIMPLE: 'simple',
    ADVANCED: 'advanced'
});

export default function Construct(Courier, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    const Binder = new EventsBinder();

    const Widget = {
        refs: {},
        templateData: null,

        mount() {
            this.templateData = this.getTemplateData();
            Events.emit('widget.mounted');
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
                if (!Widget.canBeMinimalized() || this.templateData.state.minimalized) {
                    this.hide();
                } else {
                    this.minimalize();
                }
            }
        },

        close() {
            this.templateData.state.active = false;
            Events.emit('widget.closed');
        },

        open() {
            this.templateData.state.active = true;
            Events.emit('widget.opened');
        },

        minimalize(save = true) {
            this.templateData.state.minimalized = true;
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
            return this.templateData.state.style === WidgetStyles.ADVANCED;
        },

        hide(save = true) {
            this.templateData.state.active = false;
            this.templateData.state.hidden = true;
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
                    hideWidget: Courier.settings.textsParsed.hideWidget,
                    unreadMessages: Courier.settings.textsParsed.unreadMessages
                },
                state: {
                    active: Courier.settings.state.widgetActiveAtStart,
                    minimalized: Courier.settings.state.widgetMinimalizedAtStart,
                    hidden: !Courier.settings.state.widgetActiveAtStart,
                    style: Courier.settings.state.widgetStyle,
                    showHideBtn: Courier.settings.state.showHideBtn,
                    hideBtnActive: Courier.settings.state.hideBtnActiveAtStart,
                    online: Courier.settings.state.online,
                    showWidgetUnreadMessages: Courier.settings.state.showWidgetUnreadMessages,
                    unreadMessages: 0
                }
            };

            if (update) {
                data.state.active = this.templateData.state.active;
                data.state.minimalized = this.templateData.state.minimalized;
                data.state.hidden = this.templateData.state.hidden;
                data.state.online = this.templateData.state.online;
                data.state.unreadMessages = this.templateData.state.unreadMessages;
            }

            return signal(data, 'widget');
        },

        /**
         * Initialize the widget.
         */
        initialize() {
            const elem = Components.App.refs.app.elem.querySelector('#courierWidget');

            Widget.refs.widget = Reef(elem, () => {
                if (!this.templateData.state.active) {
                    return '';
                }

                return `
                    <div class="${Courier.settings.classes.widget}-wrapper ${Courier.settings.classes.widget}-wrapper--${this.templateData.state.style} ${this.templateData.state.minimalized ? `${Courier.settings.classes.widget}--minimalized` : ''} ${Courier.settings.classes.root}__appear-bottom ${Courier.settings.classes.root}__anim-timing--half">
                        ${this.getHtml(this.templateData.state.style, this.templateData)}
                    </div>`;
            }, { signals: ['widget'] });
        },

        /**
         * Render window outer elements.
         */
        render() {
            Widget.refs.widget.render();
        },

        getHtml(style) {
            let html = '';

            const hideBtn = this.templateData.state.showHideBtn
            && this.templateData.state.hideBtnActive
                ? `
                    <button id="courierWidgetHideButton" class="${Courier.settings.classes.widget}-hide-btn" type="button" aria-label="${this.templateData.texts.hideWidget}">
                        <span class="${Courier.settings.classes.widget}-hide-btn-content">
                            ${Courier.settings.images.closeBtn}
                        </span>
                    </button>`
                : '';

            const notification = this.templateData.state.showWidgetUnreadMessages
            && this.templateData.state.unreadMessages !== 0
                ? `
                        <div id="courierNotification" class="${Courier.settings.classes.widget}-notification" aria-label="${this.templateData.texts.unreadMessages}">
                            ${this.templateData.state.unreadMessages}
                        </div>`
                : '';

            switch (style) {
            case WidgetStyles.SIMPLE: {
                const widgetImg = this.templateData.widgetImg
                    ? `
                        <span class="${Courier.settings.classes.widget}-img" aria-hidden="true">
                            ${Courier.settings.images.widget}
                        </span>`
                    : '';

                const widgetText = this.templateData.texts.widgetGreeting
                    ? `<p class="${Courier.settings.classes.widget}-greeting">${this.templateData.texts.widgetGreeting}</p>`
                    : '';

                html = `
                    <button id="courierWidgetButton" class="${Courier.settings.classes.widget}-bubble" type="button" aria-label="${this.templateData.texts.openWidget}">
                        <span class="${Courier.settings.classes.widget}-greeting-wrapper">
                            ${widgetImg}
                            ${widgetText}
                            ${notification}
                        </span>
                    </button>

                    ${hideBtn}
                    `;
                break;
            }
            case WidgetStyles.ADVANCED: {
                const widgetImg = this.templateData.widgetImg
                    ? `
                        <span class="${Courier.settings.classes.widget}-img" aria-hidden="true">
                            ${Courier.settings.images.widget}
                        </span>`
                    : '';

                const name = this.templateData.texts.name
                    ? `<p class="${Courier.settings.classes.widget}-name">${this.templateData.texts.name}</p>`
                    : '';

                // Return the minimalized version

                if (this.templateData.state.minimalized) {
                    return `
                    <button id="courierWidgetButton" class="${Courier.settings.classes.widget}-bubble ${this.templateData.state.online ? `${Courier.settings.classes.widget}--online` : ''}" type="button" aria-label="${this.templateData.texts.openWidget}">
                        <span class="${Courier.settings.classes.widget}-greeting-wrapper">
                            ${widgetImg}
                            ${notification}
                        </span>
                    </button>

                    ${hideBtn}
                    `;
                }

                // If not minimalized - continue

                const widgetText = this.templateData.texts.widgetGreeting
                    ? `<p class="${Courier.settings.classes.widget}-greeting-msg">${this.templateData.texts.widgetGreeting}</p>`
                    : '';

                html = `
                    <button id="courierWidgetButton" class="${Courier.settings.classes.widget}-bubble ${this.templateData.state.online ? `${Courier.settings.classes.widget}--online` : ''}" type="button" aria-label="${this.templateData.texts.openWidget}">
                        <span class="${Courier.settings.classes.widget}-greeting-wrapper">
                            ${widgetImg}
                            ${notification}
                        </span>
                    </button>

                    <div class="${Courier.settings.classes.widget}-greeting-msg-wrapper">
                         ${widgetText}
                         ${name}
                         ${hideBtn}
                    </div>
                    `;
                break;
            }
            default:
                break;
            }

            return parseSpecialTags(html, Courier.settings, this.templateData);
        }
    };

    Events.on('app.rendered.app', () => {
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
        if (Courier.settings.cookies.unreadMessages.active) {
            Widget.templateData.state.unreadMessages = getUnreadMessagesCount(
                Courier.settings.cookies.unreadMessages.nameSuffix
            );
        }
        // Widget.render();
    });

    Events.on('app.rendered', (event) => {
        if (Widget.refs.widget && event.target.isEqualNode(Widget.refs.widget.elem)) {
            Events.emit('app.rendered.widget', event);
        }
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

        if (Widget.templateData.state.showWidgetUnreadMessages) {
            /**
             * Clear unread messages when the chat opens
             */
            Events.on('chat.opened', () => {
                Widget.templateData.state.unreadMessages = 0;
                setUnreadMessagesCount(
                    Widget.templateData.state.unreadMessages,
                    Courier.settings.cookies.unreadMessages.nameSuffix
                );
            });
        }

        /**
         * Open the widget when the chat or popup closes
         */
        Events.on(['chat.closed', 'popup.closed'], () => {
            if (Widget.templateData.state.hidden) {
                return;
            }

            if (Courier.settings.cookies.hideWidget.active
                && widgetIsHidden(Courier.settings.cookies.hideWidget.nameSuffix)) {
                return;
            }

            Widget.templateData.state.hideBtnActive = true;
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

        Events.emit('widget.mounted');

        if (Widget.templateData.state.showWidgetUnreadMessages) {
            Events.on('chat.messageReceived', () => {
                if (Widget.templateData.state.active) {
                    Widget.templateData.state.unreadMessages += 1;
                    setUnreadMessagesCount(
                        Widget.templateData.state.unreadMessages,
                        Courier.settings.cookies.unreadMessages.nameSuffix
                    );
                }
            });
        }
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
        Widget.templateData = Widget.getTemplateData(true);
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
