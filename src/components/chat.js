/* eslint-disable import/no-unresolved */
import { clone, textTemplate } from '@utils/object';
import EventsBinder from '@core/event/events-binder';
import ChatMessage from '@components/classes/chat-message';
import Reef from '@libs/reefjs/reef.es';
import { elemContains, isScrolledToTheBottom } from '@utils/dom';
import { shortenTodaysDateTime } from '@utils/time';
import { clipboard as clipboardIcon } from '@utils/images';
import { copyCouponCodeToClipboard } from '@utils/chat.js';

export default function (Courier, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    const Binder = new EventsBinder();

    const Chat = {
        refs: {},
        scrollToBottom: false,
        messagePath: [],

        mount() {
            Events.emit('chat.mount');
        },

        /**
         * Adds events.
         */
        bind() {
            Binder.on('submit', Components.App.refs.app.elem, (event) => this.onSubmit(event));
            Binder.on('keypress', Components.App.refs.app.elem, (event) => this.onKeypress(event));
        },

        /**
         * Removes events.
         */
        unbind() {
            Binder.off('submit', Components.App.refs.app.elem);
            Binder.off('keypress', Components.App.refs.app.elem);
        },

        /**
         * Handles click events.
         *
         * @param  {Object} event
         */
        onClick(event) {
            // const overlay = Components.App.refs.app.elem.querySelector('#courierChatOverlay');
            const closeBtn = Components.App.refs.app.elem.querySelector('#courierChatCloseBtn');
            if (event.target.matches('#courierChatCloseBtn')
                || (elemContains(closeBtn, event.target))
                || (event.target.matches('#courierChatOverlay'))) {
                this.close();
            }

            const message = event.target.closest(`.${Courier.settings.classes.chat}-message`);
            if (!message) return event;
            const discountCodeBtn = message.querySelector(`button.${Courier.settings.classes.chat}-discount-code-btn`);
            if (event.target.isEqualNode(discountCodeBtn)
                || (elemContains(discountCodeBtn, event.target))) {
                const parentEl = message.querySelector(`.${Courier.settings.classes.chat}-discount-code`);
                copyCouponCodeToClipboard(
                    Courier,
                    parentEl,
                    discountCodeBtn.dataset.courierDiscountCode
                );
            }

            return event;
        },

        /**
         * Handles keydown events.
         *
         * @param  {Object} event
         */
        onKeydown(event) {
            if (event.key === 'Escape') {
                this.close();
            }
        },

        onAppRendered(event) {
            // Only run for elements with the #courierChat ID
            if (event.target.matches('#courierChat')) {
                this.refs.form = Components.App.refs.app.elem.querySelector('#courierChatInteractionsForm');
                this.refs.workArea = Components.App.refs.app.elem.querySelector('#courierChatWorkArea');
                if (this.refs.chat.data.state.showMessageBox) {
                    this.refs.messageBox = Components.App.refs.app.elem.querySelector(`.${Courier.settings.classes.chat}-message-box`);
                }
                this.refs.messages = Components.App.refs.app.elem.querySelectorAll(`.${Courier.settings.classes.chat}-message`);

                Events.emit('chat.scrollToBottom', this.scrollToBottom);

                if (this.scrollToBottom) {
                    this.scrollLastMessageIntoView();
                    this.scrollToBottom = false;
                }
            }
        },

        /**
         * Handles submit events.
         *
         * @param  {Object} event
         */
        onSubmit(event) {
            if (event.target.matches('#courierChatInteractionsForm')
                || (elemContains(this.refs.form, event.target))) {
                event.preventDefault();
                const message = this.refs.messageBox.value.trim();
                this.sendMessage(message);
                this.refs.messageBox.value = '';
            }

            return event;
        },

        /**
         * Handles keypress events.
         *
         * @param  {Object} event
         */
        onKeypress(event) {
            if (event.target === this.refs.messageBox) {
                if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    const message = this.refs.messageBox.value.trim();
                    this.sendMessage(message);
                    this.refs.messageBox.value = '';
                }
            }
        },

        close() {
            this.refs.chat.data.state.active = false;
            Events.emit('chat.closed');
        },

        open() {
            this.refs.chat.data.state.active = true;
            this.scrollToBottom = true; // scroll to bottom when the chat opens
            Events.emit('chat.opened');
        },

        sendMessage(message) {
            if (Courier.settings.state.customSendMessage) {
                Events.emit('chat.sendMessage', message);
                return;
            }
            if (message.length) {
                this.pushMessage({ text: message, outgoing: true, timestamp: new Date() });
            }
        },

        /**
         * Push message to the log.
         *
         * @param  {Object} message
         * @param options
         */
        pushMessage(message, options = {}) {
            const settings = {
                scrollToBottom: true,
                ...options
            };
            const chatMessage = new ChatMessage(message);
            // user can only send messages when it's their turn
            if (chatMessage.outgoing && !this.refs.chat.data.state.userTurn) return null;
            // replace variables in the message using text template
            if (chatMessage.text) {
                chatMessage.text = textTemplate(chatMessage.text, Courier.settings.textVars);
            }
            if (chatMessage.topics) {
                chatMessage.topics.forEach((topic) => {
                    topic.text = textTemplate(topic.text, Courier.settings.textVars);
                });
            }
            // push message to component data
            this.refs.chat.data.messages.push(chatMessage);
            // set whether after render the chat work area should be scrolled to the bottom
            if (settings.scrollToBottom) {
                this.scrollToBottom = this.chatIsScrolledToTheBottom();
            }
            return chatMessage;
        },

        chatIsScrolledToTheBottom() {
            return isScrolledToTheBottom(Components.App.refs.app.elem.querySelector('#courierChatWorkArea'));
        },

        scrollLastMessageIntoView() {
            if (this.refs.messages.length) {
                this.refs.messages[this.refs.messages.length - 1].scrollIntoView();
            }
        },

        refreshMessages() {
            // reset sent messages and message path
            this.refs.chat.data.messages = [];
            const oldMessagePath = clone(this.messagePath, true);
            this.messagePath = [];
            // recreate message path
            Events.emit('chat.refreshMessages', oldMessagePath);
        },

        getTemplateData(update = false) {
            const data = {
                identity: {
                    name: Courier.settings.identity.name,
                    website: Courier.settings.identity.website,
                    img: {
                        src: Courier.settings.identity.logo.src,
                        alt: Courier.settings.identity.logo.alt
                    }
                },
                texts: {
                    chatTitle: Courier.settings.textsParsed.chatTitle,
                    messagePlaceholder: Courier.settings.textsParsed.messagePlaceholder,
                    typing: Courier.settings.textsParsed.typing,
                    sendMessage: Courier.settings.textsParsed.sendMessage,
                    clipboardTooltip: Courier.settings.textsParsed.clipboardTooltip,
                    clipboardCopy: Courier.settings.textsParsed.clipboardCopy
                },
                poweredBy: {
                    show: Courier.settings.poweredBy.show,
                    text: Courier.settings.poweredBy.text,
                    img: {
                        src: Courier.settings.poweredBy.img.src,
                        alt: Courier.settings.poweredBy.img.alt
                    },
                    url: Courier.settings.poweredBy.url
                },
                messages: [],
                state: {
                    active: false,
                    online: Courier.settings.state.online,
                    userTurn: true,
                    showMessageBox: Courier.settings.state.showMessageBox,
                    messageBoxEnabled: Courier.settings.state.messageBoxEnabled,
                    showTimestamp: Courier.settings.state.showTimestamp,
                    typing: false
                }
            };

            if (update) {
                data.state.active = this.refs.chat.data.state.active;
                data.state.userTurn = this.refs.chat.data.state.userTurn;
                data.state.typing = this.refs.chat.data.state.typing;
            }

            return data;
        },

        /**
         * Initialize the chat.
         */
        initialize() {
            Chat.refs.chat = new Reef('#courierChat', {
                data: this.getTemplateData(),
                template: (props) => {
                    if (!props.state.active) {
                        return '';
                    }

                    let messages = props.messages.map((message, index) => {
                        // generate message html
                        let html = '';

                        // add timestamp
                        html += props.state.showTimestamp && message.timestamp
                            ? `<p class="${Courier.settings.classes.chat}-timestamp ${message.outgoing ? `${Courier.settings.classes.chat}-timestamp--self` : ''} ${Courier.settings.classes.root}__appear ${Courier.settings.classes.root}__anim-timing--third"><time datetime="${message.timestamp}"><span aria-hidden="true">${shortenTodaysDateTime(message.timestamp)}</span></time></p>`
                            : '';

                        // render different html for some message types
                        if (message.type === 'carousel') {
                            html += `<div class="${Courier.settings.classes.chat}-message ${message.typeClassSuffix ? `${Courier.settings.classes.chat}-message${message.typeClassSuffix}` : ''}" data-template="carousel" data-courier-message-id="${index}"></div>`;
                        } else if (message.type === 'coupon') {
                            html += `
                            <div class="${Courier.settings.classes.chat}-message ${message.typeClassSuffix ? `${Courier.settings.classes.chat}-message${message.typeClassSuffix}` : ''}" data-template="coupon" data-courier-message-id="${index}">
                                <div class="${Courier.settings.classes.chat}-discount-code">
                                    <button class="${Courier.settings.classes.chat}-discount-code-btn" title="${props.texts.clipboardTooltip}" data-courier-discount-code="${message.text}">
                                        <span class="${Courier.settings.classes.chat}-discount-code-btn-container">
                                            <span class="${Courier.settings.classes.chat}-discount-code-value">${message.text}</span>
                                            <span class="${Courier.settings.classes.chat}-discount-code-icon">${clipboardIcon}</span>
                                        </span>
                                    </button>
                                </div>
                            </div>`;
                        } else {
                            html += message.text
                                ? `<p class="${Courier.settings.classes.chat}-message ${message.outgoing ? `${Courier.settings.classes.chat}-message--self` : ''} ${message.typeClassSuffix ? `${Courier.settings.classes.chat}-message${message.typeClassSuffix}` : ''} ${Courier.settings.classes.root}__appear ${Courier.settings.classes.root}__anim-timing--third" data-courier-message-id="${index}">${message.text}</p>`
                                : '';
                        }

                        if (message.topics) {
                            let topicsHtml;
                            // generate topics html
                            topicsHtml = message.topics.map((topic, topicIndex) => `
                                <button class="${Courier.settings.classes.chat}-topic ${topic.active ? `${Courier.settings.classes.chat}-topic--active` : ''}" data-courier-message-id="${index}" data-courier-topic-id="${topicIndex}" ${topic.disabled ? 'disabled' : ''}>${topic.text}</button>`)
                            .join('');

                            // wrap topics
                            topicsHtml = `
                                <div class="m-b">
                                    <div class="${Courier.settings.classes.chat}-topics">
                                        ${topicsHtml}
                                    </div>
                                </div>`;

                            // merge message and topics html
                            html += topicsHtml;
                        }

                        return html;
                    }).join('');

                    if (props.state.typing) {
                        const html = `<p class="${Courier.settings.classes.chat}-message ${Courier.settings.classes.root}__appear ${Courier.settings.classes.root}__anim-timing--third"><span class="courier__chat-dots"><span class="courier__chat-dots-dot"></span><span class="courier__chat-dots-dot"></span><span class="courier__chat-dots-dot"></span></span></p>`;
                        messages += html;
                    }

                    const messageBox = props.state.showMessageBox
                        ? `
                        <form id="courierChatInteractionsForm" class="${Courier.settings.classes.chat}-interactions" autocomplete="off">
                            <textarea class="${Courier.settings.classes.chat}-message-box" name="message" ${!props.state.messageBoxEnabled ? 'disabled' : ''} placeholder="${props.texts.messagePlaceholder}" rows="2" autofocus></textarea>
                            <button class="${Courier.settings.classes.chat}-send-msg-btn" type="submit" ${!props.state.messageBoxEnabled ? 'disabled' : ''} aria-label="${props.texts.sendMessage}">
                                ${Courier.settings.images.sendMsg}
                            </button>
                        </form>`
                        : '';

                    const poweredBy = props.poweredBy.show
                        ? `
                        <div class="${Courier.settings.classes.chat}-powered-by">
                            <a href="${props.poweredBy.url}" target="_blank" rel="nofollow noreferrer">
                                <p class="m-r--hf">${props.poweredBy.text}</p>
                                <img src="${props.poweredBy.img.src}" alt="${props.poweredBy.img.alt}" />
                            </a>
                        </div>`
                        : '';

                    return `
                    <div id="courierChatOverlay" class="${Courier.settings.classes.chat}-overlay ${Courier.settings.classes.root}__fade-in ${Courier.settings.classes.root}__anim-timing--half">
                        <div class="${Courier.settings.classes.chat}-wall ${Courier.settings.classes.root}__slide-in-bottom ${Courier.settings.classes.root}__anim-timing--half">
                            <div class="${Courier.settings.classes.chat}-header">
                                <div class="${Courier.settings.classes.chat}-menu">
                                    <div>
                                        <button id="courierChatOptionsBtn" class="${Courier.settings.classes.chat}-options-btn" type="button" aria-label="Options" disabled>
                                            ${Courier.settings.images.options}
                                        </button>
                                    </div>
                                    <div class="p-h">
                                        <p class="tx-bold tx-bigger">${props.texts.chatTitle}</p>
                                    </div>
                                    <div>
                                        <button id="courierChatCloseBtn" class="${Courier.settings.classes.chat}-close-btn" type="button" aria-label="Close">
                                            ${Courier.settings.images.closeBtn}
                                        </button>
                                    </div>
                                </div>
                                <div class="${Courier.settings.classes.chat}-identity">
                                    <div class="p-all--hf">
                                        <div class="${Courier.settings.classes.chat}-avatar ${props.state.online ? `${Courier.settings.classes.chat}--online` : ''}">
                                            <img src="${props.identity.img.src}" alt="${props.identity.img.alt}" />
                                        </div>
                                    </div>
                                    <div class="${Courier.settings.classes.chat}-name">
                                        <p>${props.identity.name}</p>
                                        <p><a href="${props.identity.website.url}" target="_blank" rel="nofollow noreferrer">${props.identity.website.name}</a></p>
                                    </div>
                                </div>
                            </div>
                            <div id="courierChatWorkArea" class="${Courier.settings.classes.chat}-work-area">
                                ${messages}
                            </div>
                            ${messageBox}
                            ${poweredBy}
                        </div>
                    </div>`;
                },
                attachTo: Components.App.refs.app
            });

            Events.emit('chat.initialized');
        },

        /**
         * Render window outer elements.
         */
        render() {
            Chat.refs.chat.render();
        }
    };

    Events.on('mount.after', () => {
        Chat.initialize();
        Chat.render();
        Events.emit('chat.mounted');
    });

    /**
     * Bind event listeners after App has been mounted and rendered for the first time
     */
    Events.on('app.mounted', () => {
        Chat.bind();

        Events.on('chat.close', () => {
            Chat.close();
        });

        Events.on('widget.clicked', () => {
            Chat.open();
        });
    });

    /**
     * Bind event listeners after App has been rendered
     */
    Events.on('app.rendered', (event) => {
        Chat.onAppRendered(event);
    });

    Events.on('app.click', (event) => {
        Chat.onClick(event);
    });

    Events.on('root.keydown', (event) => {
        Chat.onKeydown(event);
    });

    Events.on('root.keydown', (event) => {
        Chat.onKeydown(event);
    });

    /**
     * Remove bindings from click:
     * - on destroying to remove added events
     * - on updating to remove events before remounting
     */
    Events.on(['destroy', 'update'], () => {
        Chat.unbind();
    });

    /**
     * Remount component
     * - on updating to reflect potential changes in settings
     */
    Events.on('update', () => {
        // Chat.mount();
        Chat.refs.chat.data = Chat.getTemplateData(true);
        Chat.refreshMessages();
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
     * - on chat.mount.before to rerender elements and apply changes
     */
    Events.on(['destroy', 'chat.mount.before'], () => {
        /*
        objectForEach(Chat.refs, (item) => {
            if (item.el.parentNode) {
                item.el.parentNode.removeChild(item.el);
            }
        });
        for (let i = 0; i < App.refs.length; i++) {
            App.refs[i].el.parentNode.removeChild(App.refs[i].el);
        }
        */
    });

    Events.on(['destroy:after'], () => {
        Chat.refs = {};
    });

    return Chat;
}
