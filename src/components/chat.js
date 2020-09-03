import { objectForEach } from '../utils/object';
import EventsBinder from '../core/event/events-binder';
import Reef from '../libs/reefjs/reef.es';
import { elemContains } from '../utils/dom';
import { isScrolledToTheBottom, replyFromScenario } from '../utils/chat';


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

        mount() {
            Events.emit('chat.mount.before');
            this.initialize();
            // push the start message after initialization
            this.refs.chat.data.messages.push(Courier.settings.messages.start);
            Events.emit('chat.mount.after');
        },

        /**
         * Adds click events.
         */
        bind() {
            Binder.on('submit', Components.App.refs.app.elem, event => this.onSubmit(event));
        },

        /**
         * Removes click events.
         */
        unbind() {
            Binder.off('submit', Components.App.refs.app.elem);
        },

        /**
         * Handles click events.
         *
         * @param  {Object} event
         */
        onClick(event) {
            const closeBtn = Components.App.refs.app.elem.querySelector('#courierChatCloseBtn');
            if (event.target.matches('#courierChatCloseBtn')
                || (elemContains(closeBtn, event.target))) {
                this.close();
            }

            if (event.target.matches('[data-courier-topic-id]')) {
                this.triggerTopic(
                    event.target.dataset.courierMessageId,
                    event.target.dataset.courierTopicId,
                );
            }

            return event;
        },

        onAppRendered(event) {
            // Only run for elements with the #courierChat ID
            if (event.target.matches('#courierChat')) {
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
            const form = Components.App.refs.app.elem.querySelector('#courierChatInteractionsForm');
            if (event.target.matches('#courierChatInteractionsForm')
                || (elemContains(form, event.target))) {
                event.preventDefault();
                const message = form.message.value.trim();
                if (message.length) {
                    this.sendMessage({
                        message,
                        outgoing: true
                    });
                }
                form.message.value = '';
            }

            return event;
        },

        close() {
            this.refs.chat.data.active = false;
            Events.emit('chat.close');
        },

        open() {
            this.refs.chat.data.active = true;
            Events.emit('chat.open');
        },

        sendMessage(message) {
            // user can only send messages when it's their turn
            if (message.outgoing && !this.refs.chat.data.state.userTurn) return;
            this.refs.chat.data.messages.push(message);
            this.scrollToBottom = this.chatIsScrolledToTheBottom();
        },

        triggerTopic(messageId, topicId) {
            const { topics } = this.refs.chat.data.messages[messageId];
            const topic = topics[topicId];
            // check if any topic at this level was not already selected
            if (topics.filter(t => t.active).length === 0) {
                topics.forEach((item) => {
                    item.disabled = true;
                });
                topic.active = true;
                this.sendMessage({
                    message: topic.text,
                    outgoing: true
                });
                const reply = replyFromScenario(Courier.settings.messages, topic.text, topic.path);
                if (reply) {
                    this.sendMessage(reply);
                }
            }
        },

        chatIsScrolledToTheBottom() {
            return isScrolledToTheBottom(Components.App.refs.app.elem.querySelector('#courierChatWorkArea'));
        },

        scrollLastMessageIntoView() {
            const messages = Components.App.refs.app.elem.querySelectorAll('[data-courier-message-id]');
            if (messages.length) {
                messages[messages.length - 1].scrollIntoView();
            }
        },

        /**
         * Initialize the chat.
         */
        initialize() {
            Chat.refs.chat = new Reef('#courierChat', {
                data: {
                    active: false,
                    messageBox: false,
                    online: true,
                    identity: {
                        name: Courier.settings.identity.name,
                        website: Courier.settings.identity.website,
                        img: {
                            src: Courier.settings.identity.logo.src,
                            alt: Courier.settings.identity.logo.alt,
                        },
                    },
                    text: {
                        headerMessage: 'Chat with us!',
                        sendMessage: 'Send message',
                        messagePlaceholder: 'Type something...',
                    },
                    messages: [],
                    state: {
                        userTurn: true,
                    },
                },
                template: (props) => {
                    if (!props.active) {
                        return '';
                    }

                    const messages = props.messages.map((item, index) => {
                        // generate message html
                        let html = `
                            <div class="${Courier.settings.classes.chat}-message ${item.outgoing ? `${Courier.settings.classes.chat}-message--self` : ''} courier__appear courier__anim-timing--third" data-courier-message-id="${index}">${item.message}</div>
                        `;

                        if (item.topics) {
                            let topicsHtml;
                            // generate topics html
                            topicsHtml = item.topics.map((topic, topicIndex) => `
                                <button class="${Courier.settings.classes.chat}-topic ${topic.active ? `${Courier.settings.classes.chat}-topic--active` : ''}" data-courier-message-id="${index}" data-courier-topic-id="${topicIndex}" ${topic.disabled ? 'disabled' : ''}>${topic.text}</button>
                            `).join('');

                            // wrap topics
                            topicsHtml = `
                                <div class="m-b">
                                    <div class="${Courier.settings.classes.chat}-topics">
                                        ${topicsHtml}
                                    </div>
                                </div>
                            `;

                            // merge message and topics html
                            html += topicsHtml;
                        }

                        return html;
                    }).join('');

                    const messageBox = props.messageBox
                        ? `
                        <form id="courierChatInteractionsForm" class="${Courier.settings.classes.chat}-interactions" autocomplete="off">
                            <input class="${Courier.settings.classes.chat}-message-box" type="text" name="message" placeholder="${props.text.messagePlaceholder}" autofocus />
                            <button class="${Courier.settings.classes.chat}-send-msg-btn" type="submit" aria-label="${props.text.sendMessage}">
                                ${Courier.settings.images.sendMsg}
                            </button>
                        </form>
                        `
                        : '';

                    return `
                    <div class="${Courier.settings.classes.chat}-wall ${Courier.settings.classes.root}__slide-in-bottom ${Courier.settings.classes.root}__anim-timing--half">
                        <div class="${Courier.settings.classes.chat}-header">
                            <div class="${Courier.settings.classes.chat}-menu">
                                <div>
                                    <button id="courierChatOptionsBtn" class="${Courier.settings.classes.chat}-options-btn" type="button" aria-label="Options" disabled>
                                        ${Courier.settings.images.options}
                                    </button>
                                </div>
                                <div>
                                    <p>${props.text.headerMessage}</p>
                                </div>
                                <div>
                                    <button id="courierChatCloseBtn" class="${Courier.settings.classes.chat}-close-btn" type="button" aria-label="Close">
                                        ${Courier.settings.images.closeBtn}
                                    </button>
                                </div>
                            </div>
                            <div class="${Courier.settings.classes.chat}-identity">
                                <div class="p-all--hf">
                                    <div class="${Courier.settings.classes.chat}-avatar ${props.online ? `${Courier.settings.classes.chat}--online` : ''}">
                                        <img src="${props.identity.img.src}" alt="${props.identity.img.alt}" />
                                    </div>
                                </div>
                                <div class="${Courier.settings.classes.chat}-name">
                                    <p>${props.identity.name}</p>
                                    <p><a href="${props.identity.website.url}" target="_blank" rel="nofollow noopener noreferrer">${props.identity.website.name}</a></p>
                                </div>
                            </div>
                        </div>
                        <div id="courierChatWorkArea" class="${Courier.settings.classes.chat}-work-area">
                            ${messages}
                        </div>
                        ${messageBox}
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
            Chat.refs.chat.render();
        },
    };

    /**
     * Bind event listeners after App has been mounted and rendered for the first time
     */
    Events.on('app.mounted', () => {
        Chat.bind();
    });

    /**
     * Bind event listeners after App has been rendered
     */
    Events.on('app.rendered', (event) => {
        Chat.onAppRendered(event);
    });

    /**
     * Bind event listeners after App has been rendered
     */
    Events.on('app.click', (event) => {
        Chat.onClick(event);
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
        Chat.mount();
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
        objectForEach(Chat.refs, (item) => {
            if (item.el.parentNode) {
                item.el.parentNode.removeChild(item.el);
            }
        });
        /*
         for (let i = 0; i < App.refs.length; i++) {
         App.refs[i].el.parentNode.removeChild(App.refs[i].el);
         }
         */
        Chat.refs = {};
    });

    return Chat;
}
