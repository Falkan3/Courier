/* eslint-disable import/no-unresolved */
import { debounce, throttle } from '@libs/throttle-debounce/index.js';

export default function (Courier, Components, Events) {
    const ChatTyping = {
        mount() {
        },

        typingAction: throttle(300, () => {
            Components.Chat.refs.chat.data.state.typing = true;
            Components.Chat.scrollToBottom = Components.Chat.chatIsScrolledToTheBottom();
            Events.emit('chat.typing');
            Components.Chat.stoppedTypingAction();
        }),

        stoppedTypingAction: debounce(2000, () => {
            Components.Chat.refs.chat.data.state.typing = false;
            Events.emit('chat.stoppedTyping');
        }),
    };

    Events.on('chat.sendMessage', () => {
        ChatTyping.stoppedTypingAction();
    });

    return ChatTyping;
}
