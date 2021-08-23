/* eslint-disable import/no-unresolved */
import { getStartMessage, replyFromScenario, saveMessagePath } from '@utils/chat';
import { isArray } from '@utils/types';
import ChatMessage from '@components/classes/chat-message';

export default function (Courier, Components, Events) {
    const ChatTriggers = {
        startMessage() {
            const startMessage = getStartMessage(Courier.settings.messages);
            if (!startMessage) return;
            // send the start message after initialization
            if (isArray(startMessage)) {
                startMessage.forEach((message) => {
                    Components.Chat.pushMessage(new ChatMessage(message));
                });
            } else {
                Components.Chat.pushMessage(new ChatMessage(startMessage));
            }
        },

        triggerTopic(messageId, topicId, options = {}) {
            const settings = Object.assign({ topicTriggersEnabled: true }, options);
            const { topics } = Components.Chat.refs.chat.data.messages[messageId];
            const topic = topics[topicId];
            // check if any topic at this level was not already selected
            if (topics.filter(t => t.active).length === 0) {
                // disable all topics for the message the topic has been triggered from
                topics.forEach((item) => {
                    item.disabled = true;
                });
                topic.active = true;
                // send topic text as a message from the user
                Components.Chat.pushMessage({
                    text: topic.text,
                    outgoing: true,
                });
                // emit the topic's trigger, if it's set, and topic triggers option is enabled
                if (topic.trigger && settings.topicTriggersEnabled) {
                    this.topicTrigger(topic.trigger);
                }
                this.triggerPath(topic);
                // push message path
                this.pushMessagePath(messageId, topicId);
            }
        },

        triggerPath(topic) {
            // find a reply based on selected path
            const reply = replyFromScenario(Courier.settings.messages, topic.text, topic.path);
            if (reply) {
                if (isArray(reply)) {
                    reply.forEach((message) => {
                        Components.Chat.pushMessage(new ChatMessage(message));
                    });
                } else {
                    Components.Chat.pushMessage(new ChatMessage(reply));
                }
            }
        },

        topicTrigger(trigger) {
            Events.emit(trigger);
        },

        pushMessagePath(messageId, topicId) {
            Components.Chat.messagePath.push({
                messageId,
                topicId,
            });
            if (Courier.settings.cookies.saveConversation.active) {
                saveMessagePath(
                    Components.Chat.messagePath,
                    Courier.settings.cookies.saveConversation.duration,
                    Courier.settings.cookies.saveConversation.nameSuffix,
                );
            }
        },
    };

    return ChatTriggers;
}