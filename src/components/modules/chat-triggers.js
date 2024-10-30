/* eslint-disable import/no-unresolved */
import {
    getStartMessage, loadMessagePath, replyFromScenario, saveMessagePath
} from '@utils/chat';
import { isArray } from '@utils/types';
import { arrLastItem } from '@utils/object';
import EventsBinder from '@core/event/events-binder.js';
import { throttle } from '@libs/throttle-debounce/index.js';

export default function Construct(Courier, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    const Binder = new EventsBinder();

    const inputEvents = ['input', 'blur', 'change'];

    const ChatTriggers = {
        shouldBindEvents: true,
        settings: {
            throttle: {
                input: 10
            }
        },

        /**
         * Construct a ChatTriggers instance.
         */
        mount() {
        },

        /**
         * Adds events.
         */
        bind() {
            if (Components.Chat.refs.messageBox) {
                Binder.on(
                    inputEvents,
                    Components.Chat.refs.messageBox,
                    throttle(this.settings.throttle.input, (event) => {
                        this.onInput(event);
                    }),
                    { capture: true, passive: true }
                );
            }
        },

        /**
         * Removes events.
         */
        unbind() {
            if (Components.App.refs.messageBox) {
                Binder.off(inputEvents, Components.App.refs.messageBox, {
                    capture: true, passive: true
                });
            }
        },

        /**
         * Handles input events.
         *
         * @param  {Object} event
         */
        onInput(event) {
            const chatScrolledToBottom = Components.Chat.chatIsScrolledToTheBottom();

            event.target.setAttribute('rows', 1);
            const targetRows = Math.ceil(event.target.scrollHeight / event.target.offsetHeight);
            event.target.setAttribute('rows', targetRows);

            if (chatScrolledToBottom) {
                Components.Chat.scrollChatToBottom();
            }
        },

        startMessage() {
            const startMessage = getStartMessage(Courier.settings.messages);
            if (!startMessage) return;
            // send the start message after initialization
            if (isArray(startMessage)) {
                startMessage.forEach((message) => {
                    Components.Chat.pushMessage(message, { scrollToBottom: false, passive: true });
                });
            } else {
                Components.Chat.pushMessage(startMessage, { scrollToBottom: false, passive: true });
            }
        },

        triggerTopic(messageId, topicId, options = {}) {
            const settings = {
                topicTriggersEnabled: true,
                save: true,
                timestamp: new Date(),
                scrollToBottom: true,
                ...options
            };
            const { topics } = Components.Chat.templateData.messages[messageId];
            const topic = topics[topicId];
            // check if any topic at this level was not already selected
            if (topics.filter((t) => t.active).length === 0) {
                // disable all topics for the message the topic has been triggered from
                topics.forEach((item) => {
                    item.disabled = true;
                });
                topic.active = true;
                // send topic text as a message from the user
                Components.Chat.pushMessage({
                    text: topic.text,
                    outgoing: true,
                    timestamp: settings.timestamp,
                    scrollToBottom: settings.scrollToBottom,
                    passive: true
                });
                // emit the topic's trigger, if it's set, and topic triggers option is enabled
                if (settings.topicTriggersEnabled && topic.trigger) {
                    this.topicTrigger(topic.trigger, topic);
                }
                this.triggerPath(topic);
                // push message path
                this.pushMessagePath(messageId, topicId, settings.timestamp, settings.save);
            }
        },

        triggerPath(topic) {
            // disable all previous message topics
            const lastMessage = arrLastItem(Components.Chat.templateData.messages);
            if (lastMessage) {
                this.disableTopics(lastMessage);
            }
            // find a reply based on selected path
            const reply = replyFromScenario(Courier.settings.messages, topic.text, topic.path);
            if (reply) {
                if (isArray(reply)) {
                    reply.forEach((message) => {
                        Components.Chat.pushMessage(message);
                    });
                } else {
                    Components.Chat.pushMessage(reply);
                }
            }
        },

        disableTopics(message) {
            const { topics } = message;
            if (topics) {
                topics.forEach((item) => {
                    item.disabled = true;
                });
                return true;
            }
            return false;
        },

        topicTrigger(trigger, topic) {
            Events.emit(trigger, topic);
        },

        pushMessagePath(messageId, topicId, timestamp, save = true) {
            Components.Chat.messagePath.push({
                messageId,
                topicId,
                timestamp
            });
            if (save && Courier.settings.cookies.saveConversation.active) {
                saveMessagePath(
                    Components.Chat.messagePath,
                    Courier.settings.cookies.saveConversation.duration,
                    Courier.settings.cookies.saveConversation.nameSuffix
                );
            }
        },

        restoreMessages() {
            const messagePath = loadMessagePath(
                Courier.settings.cookies.saveConversation.nameSuffix
            );
            if (messagePath && isArray(messagePath)) {
                messagePath.forEach((item) => {
                    this.triggerTopic(item.messageId, item.topicId, {
                        // don't trigger topics or save conversation when restoring messages
                        topicTriggersEnabled: false,
                        save: false,
                        timestamp: item.timestamp,
                        scrollToBottom: true
                    });
                });
            }
        }
    };

    /**
     * Bind event listeners after App has been mounted and rendered for the first time
     */
    Events.on('app.rendered.chat', () => {
        if (!Components.Chat.refs.messageBox) {
            this.shouldBindEvents = true;
        }

        if (Components.Chat.templateData.state.active && this.shouldBindEvents) {
            ChatTriggers.bind();
            this.shouldBindEvents = false;
        }
    });

    /**
     * Remove bindings from input:
     * - on destroying to remove added events
     * - on updating to remove events before remounting
     */
    Events.on(['destroy', 'update'], () => {
        ChatTriggers.unbind();
    });

    Events.on('chat.initialized', () => {
        Events.emit('chat.resetMessages');
        ChatTriggers.startMessage();
        if (Courier.settings.cookies.saveConversation.active) {
            ChatTriggers.restoreMessages();
        }
    });

    Events.on('chat.refreshMessages', (oldMessagePath) => {
        // recreate message path
        ChatTriggers.startMessage();
        oldMessagePath.forEach((item) => {
            ChatTriggers.triggerTopic(item.messageId, item.topicId, {
                timestamp: item.timestamp,
                topicTriggersEnabled: false
            });
        });
    });

    Events.on('app.click', (event) => {
        if (event.target.matches('[data-courier-topic-id]')) {
            ChatTriggers.triggerTopic(
                event.target.dataset.courierMessageId,
                event.target.dataset.courierTopicId
            );
        }
    });

    /**
     * Destroy binder:
     * - on destroying to remove listeners
     */
    Events.on(['destroy'], () => {
        Binder.destroy();
    });

    return ChatTriggers;
}
