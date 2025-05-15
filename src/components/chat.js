/* eslint-disable import/no-unresolved */
import { clone, parseSpecialTags, textTemplate } from '@utils/object';
import EventsBinder from '@core/event/events-binder';
import ChatMessage, { ChatMessageTypes } from '@components/classes/chat-message';
import { component as Reef, signal } from '@libs/reefjs/reef.es';
import { elemContains, isScrolledToTheBottom } from '@utils/dom';
import { shortenTodaysDateTime } from '@utils/time';
import { arrowDown as arrowDownIcon, clipboard as clipboardIcon } from '@utils/images';
import { clearMessagePath, copyCouponCodeToClipboard } from '@utils/chat.js';
import { throttle } from '@libs/throttle-debounce/index.js';

export default function Construct(Courier, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    const Binder = new EventsBinder();

    const Chat = {
        refs: {},
        templateData: null,
        isScrolledToBottom: false,
        scrollToBottom: false,
        messagePath: [],
        lastReceivedMessageIndex: null,
        lastSentMessageIndex: null,
        messageBoxRows: 1,
        settings: {
            throttle: {
                scroll: 5,
                scrollChat: 100
            }
        },

        mount() {
            this.templateData = this.getTemplateData();
            // this.scrollChatToBottomThrottled = throttle(
            //     this.settings.throttle.scrollChat,
            //     () => {
            //         this.scrollChatToBottom();
            //     }
            // );
            Events.emit('chat.mounted');
        },

        onAppRendered() {
            this.refs.form = Components.App.refs.app.elem.querySelector('#courierChatInteractionsForm');
            this.refs.workArea = Components.App.refs.app.elem.querySelector('#courierChatWorkArea');
            if (this.templateData.state.showMessageBox) {
                this.refs.messageBox = Components.App.refs.app.elem.querySelector(`.${Courier.settings.classes.chat}-message-box`);
            }
            this.refs.optionsBtn = Components.App.refs.app.elem.querySelector('#courierChatOptionsBtn');
            this.refs.closeBtn = Components.App.refs.app.elem.querySelector('#courierChatCloseBtn');
            this.refs.scrollDownBtn = Components.App.refs.app.elem.querySelector('#courierScrollDownBtn');
            this.refs.messages = Components.App.refs.app.elem.querySelectorAll(`.${Courier.settings.classes.chat}-message`);

            Events.emit('chat.scrollToBottom', this.scrollToBottom);

            if (this.scrollToBottom) {
                this.scrollChatToBottom();
                // this.scrollToBottom = false;
            }
        },

        /**
         * Adds events.
         */
        bind() {
            Binder.on('submit', Components.App.refs.app.elem, (event) => this.onSubmit(event));
            Binder.on('keypress', Components.App.refs.app.elem, (event) => this.onKeypress(event));
            Binder.on('scroll', Components.App.refs.app.elem, throttle(this.settings.throttle.scroll, () => {
                const wasScrolledToBottom = this.isScrolledToBottom;
                this.isScrolledToBottom = this.chatIsScrolledToTheBottom();
                if (wasScrolledToBottom !== this.isScrolledToBottom) {
                    this.scrollToBottom = this.isScrolledToBottom;
                    Events.emit('chat.scrolledToBottom', this.isScrolledToBottom);

                    if (this.isScrolledToBottom) {
                        this.refs.scrollDownBtn.classList.remove('active');
                    } else {
                        this.refs.scrollDownBtn.classList.add('active');
                    }
                }
            }), { capture: true, passive: true });
        },

        /**
         * Removes events.
         */
        unbind() {
            Binder.off('submit', Components.App.refs.app.elem);
            Binder.off('keypress', Components.App.refs.app.elem);
            Binder.off('scroll', Components.App.refs.app.elem);
        },

        /**
         * Handles click events.
         *
         * @param  {Object} event
         */
        onClick(event) {
            if (!event.target || !event.target.matches) {
                return event;
            }

            // const overlay = Components.App.refs.app.elem.querySelector('#courierChatOverlay');
            // const closeBtn = Components.App.refs.app.elem.querySelector('#courierChatCloseBtn');
            // event.target.matches('#courierChatCloseBtn'
            if (event.target.isEqualNode(this.refs.optionsBtn)
                || (elemContains(this.refs.optionsBtn, event.target))) {
                this.toggleDrawer();
            }

            if (event.target.isEqualNode(this.refs.closeBtn)
                || (elemContains(this.refs.closeBtn, event.target))
                || (event.target.matches('#courierChatOverlay'))) {
                this.close();
            }

            if (event.target.isEqualNode(this.refs.scrollDownBtn)
                || (elemContains(this.refs.scrollDownBtn, event.target))) {
                this.scrollChatToBottom(true);
            }

            if (this.templateData.state.showDrawer) {
                if (event.target.closest('#courierChatDrawerCloseBtn')) {
                    this.toggleDrawer();
                }

                const drawerTab = event.target.closest('[data-tab]');
                if (drawerTab) {
                    this.activateDrawerTab(drawerTab.dataset.tab);
                }
            }

            const message = event.target.closest(`.${Courier.settings.classes.chat}-message`);
            if (!message) return event;

            const discountCodeBtn = event.target.closest(`button.${Courier.settings.classes.chat}-discount-code-btn`);
            if (discountCodeBtn) {
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

        /**
         * Handles submit events.
         *
         * @param  {Object} event
         */
        onSubmit(event) {
            if (!event.target.matches) {
                return;
            }

            if (event.target.matches('#courierChatInteractionsForm')
                || (elemContains(this.refs.form, event.target))) {
                event.preventDefault();
                this.messageBoxSend();
            }
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
                    this.messageBoxSend();
                }
            }
        },

        close() {
            this.templateData.state.active = false;
            Events.emit('chat.closed');
        },

        open() {
            this.templateData.state.active = true;
            this.scrollToBottom = true; // scroll to bottom when the chat opens
            Events.emit('chat.opened');
        },

        messageBoxSend() {
            const message = this.refs.messageBox.value.trim();
            this.sendMessage(message);
            this.refs.messageBox.value = '';
            this.refs.messageBox.dispatchEvent(new Event('change'));
        },

        sendMessage(message) {
            const timestamp = new Date();
            if (Courier.settings.state.customSendMessage) {
                Events.emit('chat.sendMessage', {
                    text: message,
                    timestamp
                });
                return;
            }
            if (message.length) {
                this.pushMessage(
                    { text: message, outgoing: true, timestamp }
                );
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
                passive: false,
                ...options
            };
            const chatMessage = new ChatMessage(message);
            // user can only send messages when it's their turn
            if (chatMessage.outgoing && !this.templateData.state.userTurn) return null;
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
            const index = this.templateData.messages.push(chatMessage);
            if (settings.passive === false) {
                if (chatMessage.outgoing === true) {
                    this.lastSentMessageIndex = index;
                    Events.emit('chat.messageSent', {
                        text: chatMessage.text,
                        type: chatMessage.type,
                        index
                    });
                } else {
                    this.lastReceivedMessageIndex = index;
                    Events.emit('chat.messageReceived', {
                        text: chatMessage.text,
                        topics: chatMessage.topics,
                        type: chatMessage.type,
                        index
                    });
                }
            }
            // set whether after render the chat work area should be scrolled to the bottom
            if (settings.scrollToBottom) {
                this.scrollToBottom = this.chatIsScrolledToTheBottom();
            }
            return chatMessage;
        },

        chatIsScrolledToTheBottom() {
            return isScrolledToTheBottom(this.refs.workArea);
        },

        scrollLastMessageIntoView() {
            if (this.refs.messages.length) {
                this.refs.messages[this.refs.messages.length - 1].scrollIntoView({
                    behavior: 'smooth',
                    block: 'end'
                });
            }
        },

        scrollChatToBottom(smooth = false) {
            if (!this.refs.workArea) {
                return;
            }
            this.refs.workArea.scrollTo({
                top: this.refs.workArea.scrollHeight,
                behavior: smooth ? 'smooth' : 'instant'
            });
        },

        resetMessages() {
            // reset sent messages and message path
            this.templateData.messages = [];
            this.messagePath = [];
        },

        refreshMessages() {
            const oldMessagePath = clone(this.messagePath, true);
            this.resetMessages();
            // recreate message path
            Events.emit('chat.refreshMessages', oldMessagePath);
        },

        clearMessages() {
            this.resetMessages();
            clearMessagePath(Courier.settings.cookies.saveConversation.nameSuffix);
            Events.emit('chat.refreshMessages', this.messagePath);
        },

        toggleDrawer() {
            // close drawer active tab if not null
            if (this.templateData.state.drawerActiveTab !== null) {
                this.templateData.state.drawerActiveTab = null;
                return;
            }
            // otherwise toggle the drawer
            this.templateData.state.showDrawer = !this.templateData.state.showDrawer;
        },

        activateDrawerTab(tabName) {
            // check if the tab with the given name exists
            if (!Object.prototype.hasOwnProperty.call(
                this.templateData.texts.drawerTabContent,
                tabName
            )) {
                return;
            }
            // set the active tab
            this.templateData.state.drawerActiveTab = tabName;
        },

        getDrawerTabContent(tabName) {
            if (tabName === null) {
                const tabs = Object.keys(
                    this.templateData.texts.drawerTabContent
                );
                const tabBtns = tabs.length !== 0
                    ? `
                        <div class="${Courier.settings.classes.chat}-drawer-tab-btns">
                            ${tabs.map((name) => `<button type="button" data-tab="${name}">${this.templateData.texts.drawerTabContent[name].heading}</button>`)}
                        </div>` : '';

                return {
                    heading: `<p class="tx-bigger tx-bold">${this.templateData.texts.drawerInfo.heading}</p>`,
                    content: `
                        <div class="${Courier.settings.classes.chat}-drawer-tab-content">
                            ${this.templateData.texts.drawerInfo.content}
                        </div>
                        ${tabBtns}
                    `
                };
            }

            return {
                heading: `<p class="tx-bigger tx-bold">${this.templateData.texts.drawerTabContent[tabName].heading}</p>`,
                content: `
                    <div class="${Courier.settings.classes.chat}-drawer-tab-content">
                        ${this.templateData.texts.drawerTabContent[tabName].content}
                    </div>
                `
            };
        },

        getTemplateData(update = false) {
            const data = {
                identity: {
                    show: Courier.settings.identity.show,
                    name: Courier.settings.identity.name,
                    website: Courier.settings.identity.website,
                    img: {
                        src: Courier.settings.identity.logo.src,
                        alt: Courier.settings.identity.logo.alt,
                        svg: Courier.settings.identity.logo.svg
                    },
                    imgMini: {
                        src: Courier.settings.identity.logoMini.src,
                        alt: Courier.settings.identity.logoMini.alt,
                        svg: Courier.settings.identity.logoMini.svg
                    }
                },
                texts: {
                    close: Courier.settings.textsParsed.close,
                    options: Courier.settings.textsParsed.options,
                    chatTitle: Courier.settings.textsParsed.chatTitle,
                    messagePlaceholder: Courier.settings.textsParsed.messagePlaceholder,
                    typing: Courier.settings.textsParsed.typing,
                    sendMessage: Courier.settings.textsParsed.sendMessage,
                    clipboardButton: Courier.settings.textsParsed.clipboardButton,
                    clipboardTooltip: Courier.settings.textsParsed.clipboardTooltip,
                    clipboardCopy: Courier.settings.textsParsed.clipboardCopy,
                    drawerInfo: Courier.settings.textsParsed.drawerInfo,
                    drawerTabContent: Courier.settings.textsParsed.drawerTabContent,
                    privacy: {
                        text: Courier.settings.textsParsed.privacy.text,
                        url: Courier.settings.textsParsed.privacy.url
                    }
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
                    showOptionsButton: Courier.settings.state.showOptionsButton,
                    showMessageBox: Courier.settings.state.showMessageBox,
                    messageBoxEnabled: Courier.settings.state.messageBoxEnabled,
                    showTimestamp: Courier.settings.state.showTimestamp,
                    typing: false,
                    maxMessageLength: Courier.settings.state.maxMessageLength,
                    messageBoxRows: this.messageBoxRows,
                    showDrawer: false,
                    drawerActiveTab: null
                }
            };

            if (update) {
                data.state.active = this.templateData.state.active;
                data.state.userTurn = this.templateData.state.userTurn;
                data.state.showMessageBox = this.templateData.state.showMessageBox;
                data.state.messageBoxEnabled = this.templateData.state.messageBoxEnabled;
                data.state.typing = this.templateData.state.typing;
                data.state.messageBoxRows = this.templateData.state.messageBoxRows;
                data.state.showDrawer = this.templateData.state.showDrawer;
                data.state.drawerActiveTab = this.templateData.state.drawerActiveTab;
            }

            return signal(data, 'chat');
        },

        /**
         * Initialize the chat.
         */
        initialize() {
            const elem = Components.App.refs.app.elem.querySelector('#courierChat');

            this.refs.chat = Reef(elem, () => {
                if (!this.templateData.state.active) {
                    return '';
                }

                const identityImg = this.templateData.identity.img.svg
                    ? `${this.templateData.identity.img.svg}`
                    : `<img src="${this.templateData.identity.img.src}" alt="${this.templateData.identity.img.alt}" />`;

                const identityWebsite = this.templateData.identity.website.url
                    ? `<p><a href="${this.templateData.identity.website.url}" target="_blank" rel="nofollow noreferrer">${this.templateData.identity.website.name}</a></p>`
                    : '';

                const identity = this.templateData.identity.show
                    ? `
                        <div class="p-h--hf">
                            <div class="${Courier.settings.classes.chat}-identity">
                                <div class="p-all--hf">
                                    <div class="${Courier.settings.classes.chat}-avatar ${this.templateData.state.online ? `${Courier.settings.classes.chat}--online` : ''}">
                                        ${identityImg}
                                    </div>
                                </div>
                                <div class="${Courier.settings.classes.chat}-name">
                                    <p class="tx-bigger tx-bold">${this.templateData.identity.name}</p>
                                    ${identityWebsite}
                                </div>
                            </div>
                        </div>`
                    : `
                        <div class="p-h--hf">
                            <p class="tx-bigger tx-bold">${this.templateData.texts.chatTitle}</p>
                        </div>`;

                let identityLogoMini = '';
                if (this.templateData.identity.imgMini.svg !== null
                    || this.templateData.identity.imgMini.src !== null) {
                    identityLogoMini = this.templateData.identity.imgMini.svg
                        ? `${this.templateData.identity.imgMini.svg}`
                        : `<img src="${this.templateData.identity.imgMini.src}" alt="${this.templateData.identity.imgMini.alt}" />`;
                } else {
                    identityLogoMini = identityImg;
                }

                const optionsBtn = this.templateData.state.showOptionsButton
                    ? `
                        <div class="p-h--hf m-l--auto">
                            <button id="courierChatOptionsBtn" class="${Courier.settings.classes.chat}-options-btn" type="button" aria-label="${this.templateData.texts.options}">
                                ${Courier.settings.images.options}
                            </button>
                        </div>`
                    : '';

                let messages = this.templateData.messages.map((message, index) => {
                    // generate message html
                    let html = '';

                    // add timestamp
                    html += this.templateData.state.showTimestamp && message.timestamp
                        ? `<p class="${Courier.settings.classes.chat}-timestamp ${message.outgoing ? `${Courier.settings.classes.chat}-timestamp--self` : ''} ${Courier.settings.classes.root}__appear ${Courier.settings.classes.root}__anim-timing--third"><time datetime="${message.timestamp}"><span aria-hidden="true">${shortenTodaysDateTime(message.timestamp)}</span></time></p>`
                        : '';

                    // render different html for some message types
                    if (message.type === 'carousel') {
                        html += `<div class="${Courier.settings.classes.chat}-message ${message.typeClassSuffix ? `${Courier.settings.classes.chat}-message${message.typeClassSuffix}` : ''}" data-template="carousel" data-courier-message-id="${index}" reef-ignore key="msg_${index}"></div>`;
                    } else if (message.type === 'coupon') {
                        html += `
                            <div class="${Courier.settings.classes.chat}-message ${message.typeClassSuffix ? `${Courier.settings.classes.chat}-message${message.typeClassSuffix}` : ''}" data-template="coupon" data-courier-message-id="${index}">
                                <div class="${Courier.settings.classes.chat}-discount-code">
                                    <button class="${Courier.settings.classes.chat}-discount-code-btn" data-courier-tooltip="${this.templateData.texts.clipboardTooltip}" data-courier-discount-code="${message.text}">
                                        <span class="${Courier.settings.classes.chat}-discount-code-btn-container">
                                            <span class="${Courier.settings.classes.chat}-discount-code-value">${message.text}</span>
                                            <span class="${Courier.settings.classes.chat}-discount-code-icon">${clipboardIcon}<span class="${Courier.settings.classes.chat}-discount-code-icon-text">${this.templateData.texts.clipboardButton}</span></span>
                                        </span>
                                    </button>
                                </div>
                            </div>`;
                    } else if (message.type === 'orderDetails') {
                        html += `<div class="${Courier.settings.classes.chat}-message ${message.typeClassSuffix ? `${Courier.settings.classes.chat}-message${message.typeClassSuffix}` : ''}" data-template="orderDetails" data-courier-message-id="${index}" reef-ignore key="msg_${index}"></div>`;
                    } else {
                        const messageImg = message.outgoing !== true
                        && message.type !== ChatMessageTypes.SYSTEM
                            ? `
                                <div class="${Courier.settings.classes.chat}-message-img">
                                    ${identityLogoMini}
                                </div>`
                            : '';

                        html += message.text
                            ? `
                                <div class="${Courier.settings.classes.chat}-message ${message.outgoing ? `${Courier.settings.classes.chat}-message--self` : ''} ${message.typeClassSuffix ? `${Courier.settings.classes.chat}-message${message.typeClassSuffix}` : ''} ${Courier.settings.classes.root}__appear ${Courier.settings.classes.root}__anim-timing--third" data-courier-message-id="${index}">
                                    ${messageImg}
                                    <div class="${Courier.settings.classes.chat}-message-content">${message.text}</div>
                                </div>`
                            : '';
                    }

                    if (message.topics) {
                        let topicsHtml;
                        // generate topics html
                        topicsHtml = message.topics.map((topic, topicIndex) => {
                            let topicHtml = `
                                <button class="${Courier.settings.classes.chat}-topic ${topic.active ? `${Courier.settings.classes.chat}-topic--active` : ''} ${topic.fullWidth ? `${Courier.settings.classes.chat}-topic--full-w` : ''}" data-courier-message-id="${index}" data-courier-topic-id="${topicIndex}" ${topic.disabled ? 'disabled' : ''}>${topic.text}</button>`;
                            if (topic.breakLine) {
                                topicHtml += `<div class="${Courier.settings.classes.root}__flex-break-row"></div>`;
                            }
                            return topicHtml;
                        })
                        .join('');

                        // wrap topics
                        topicsHtml = `
                            <div class="m-b">
                                <div class="${Courier.settings.classes.chat}-topics courier__appear courier__anim-timing--third">
                                    ${topicsHtml}
                                </div>
                            </div>`;

                        // merge message and topics html
                        html += topicsHtml;
                    }

                    return html;
                }).join('');

                if (this.templateData.state.typing) {
                    const html = `<p class="${Courier.settings.classes.chat}-message ${Courier.settings.classes.root}__appear ${Courier.settings.classes.root}__anim-timing--third"><span class="courier__chat-dots"><span class="courier__chat-dots-dot"></span><span class="courier__chat-dots-dot"></span><span class="courier__chat-dots-dot"></span></span></p>`;
                    messages += html;
                }

                const messageBox = this.templateData.state.showMessageBox
                    ? `
                        <form id="courierChatInteractionsForm" class="${Courier.settings.classes.chat}-interactions" autocomplete="off">
                            <div class="${Courier.settings.classes.chat}-message-box-container">
                                <div class="${Courier.settings.classes.chat}-message-box-wrapper">
                                    <textarea class="${Courier.settings.classes.chat}-message-box" name="message" ${!this.templateData.state.messageBoxEnabled ? 'disabled' : ''} placeholder="${this.templateData.texts.messagePlaceholder}" rows="${this.templateData.state.messageBoxRows}" maxlength="${this.templateData.state.maxMessageLength}" autofocus></textarea>
                                </div>
                                <button class="${Courier.settings.classes.chat}-send-msg-btn" type="submit" ${!this.templateData.state.messageBoxEnabled ? 'disabled' : ''} aria-label="${this.templateData.texts.sendMessage}">
                                    ${Courier.settings.images.sendMsg}
                                </button>
                            </div>
                        </form>`
                    : '';

                const drawerContent = this.getDrawerTabContent(
                    this.templateData.state.drawerActiveTab
                );

                const drawer = this.templateData.state.showDrawer
                    ? `
                        <div class="${Courier.settings.classes.chat}-drawer ${Courier.settings.classes.root}__slide-in-bottom ${Courier.settings.classes.root}__anim-timing--third">
                            <div class="${Courier.settings.classes.chat}-menu-row">
                                 <div class="p-h--hf">
                                    ${drawerContent.heading}
                                 </div>

                                <div class="p-h--hf m-l--auto">
                                    <button id="courierChatDrawerCloseBtn" class="${Courier.settings.classes.chat}-close-btn" type="button" aria-label="${this.templateData.texts.close}">
                                        ${Courier.settings.images.closeBtn}
                                    </button>
                                </div>
                            </div>

                            <div class="${Courier.settings.classes.chat}-drawer-content">
                                ${drawerContent.content}
                            </div>
                        </div>` : '';

                const poweredByContent = this.templateData.poweredBy.img.src !== null
                    ? `
                        <p class="m-r--hf">${this.templateData.poweredBy.text}</p>
                        <img src="${this.templateData.poweredBy.img.src}" alt="${this.templateData.poweredBy.img.alt}" />`
                    : `<p>${this.templateData.poweredBy.text}</p>`;

                const poweredBy = this.templateData.poweredBy.show
                    ? `
                        <div class="${Courier.settings.classes.chat}-powered-by">
                            <a href="${this.templateData.poweredBy.url}" target="_blank" rel="nofollow noreferrer">
                                ${poweredByContent}
                            </a>
                        </div>`
                    : '';

                const footer = `
                    <div class="${Courier.settings.classes.chat}-footer">
                        ${poweredBy}
                    </div>`;

                return parseSpecialTags(`
                    <div id="courierChatOverlay" class="${Courier.settings.classes.chat}-overlay ${Courier.settings.classes.root}__fade-in ${Courier.settings.classes.root}__anim-timing--half">
                        <div class="${Courier.settings.classes.chat}-wall ${Courier.settings.classes.root}__slide-in-bottom ${Courier.settings.classes.root}__anim-timing--half">
                            <div class="${Courier.settings.classes.chat}-header">
                                <div class="${Courier.settings.classes.chat}-menu">
                                    <div class="${Courier.settings.classes.chat}-menu-row">
                                        ${identity}
                                        ${optionsBtn}
                                        <div class="p-h--hf">
                                            <button id="courierChatCloseBtn" class="${Courier.settings.classes.chat}-close-btn" type="button" aria-label="${this.templateData.texts.close}">
                                                ${Courier.settings.images.closeBtn}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="${Courier.settings.classes.chat}-work-area-wrapper ${this.templateData.state.showDrawer ? 'dimmed' : ''}">
                                 <div id="courierChatWorkArea" class="${Courier.settings.classes.chat}-work-area">
                                    ${messages}
                                </div>

                                <div class="${Courier.settings.classes.chat}-work-area-interactions">
                                    <button id="courierScrollDownBtn" class="${Courier.settings.classes.chat}-scroll-down-btn ${Courier.settings.classes.root}__appear-bottom ${Courier.settings.classes.root}__anim-timing--half" type="button">${arrowDownIcon}</button>
                                </div>
                            </div>

                            ${messageBox}

                            ${footer}

                            ${drawer}
                        </div>
                    </div>`, Courier.settings, this.templateData);
            }, { signals: ['chat'] });

            Events.emit('chat.initialized');
        },

        /**
         * Render window outer elements.
         */
        render() {
            this.refs.chat.render();
        }
    };

    Events.on('chat.resetMessages', () => {
        Chat.resetMessages();
    });

    Events.on('chatTriggers.setMessageBoxRows', (targetRows) => {
        Chat.templateData.state.messageBoxRows = targetRows;
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

        Events.on('chat.clear', () => {
            Chat.clearMessages();
        });
    });

    /**
     * Bind event listeners after App has been rendered
     */
    Events.on('app.rendered.app', () => {
        Chat.initialize();
        // Chat.render();
    });

    Events.on('app.rendered', (event) => {
        // Only run for elements with the #courierChat ID
        if (Chat.refs.chat && event.target.isEqualNode(Chat.refs.chat.elem)) {
            Events.emit('app.rendered.chat', event);
        }
        if (event.target.matches && event.target.matches(`.${Courier.settings.classes.chat}-message`)) {
            Events.emit('app.rendered.chatMessage', event);
        }
    });

    Events.on('app.rendered.chat', (event) => {
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
        Chat.bind();
        Chat.templateData = Chat.getTemplateData(true);
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
