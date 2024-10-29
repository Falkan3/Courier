/* eslint-disable import/no-unresolved */
import { debounce, throttle } from '@libs/throttle-debounce/index.js';

export default function Construct(Courier, Components, Events) {
    const ChatTyping = {
        mount() {
        },

        typingAction: throttle(300, () => {
            Components.Chat.templateData.state.typing = true;
            Components.Chat.scrollToBottom = Components.Chat.chatIsScrolledToTheBottom();
            Events.emit('chat.typing');
            Components.Chat.stoppedTypingAction();
        }),

        stoppedTypingAction: debounce(2000, () => {
            Components.Chat.templateData.state.typing = false;
            Events.emit('chat.stoppedTyping');
        }),
    };

    Events.on('chat.sendMessage', () => {
        ChatTyping.stoppedTypingAction();
    });

    return ChatTyping;
}
