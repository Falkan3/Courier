/* eslint-disable import/no-unresolved */
import { debounce, throttle } from '@libs/throttle-debounce/throttle-debounce.es';

export default function (Courier, Components, Events) {
    const ChatTyping = {
        mount() {
            Events.on('chat.sendMessage', () => {
                this.stoppedTypingAction();
            });
        },

        typingAction: throttle(300, false, () => {
            Components.Chat.refs.chat.data.state.typing = true;
            Components.Chat.scrollToBottom = Components.Chat.chatIsScrolledToTheBottom();
            Events.emit('chat.typing');
            Components.Chat.stoppedTypingAction();
        }),

        stoppedTypingAction: debounce(2000, false, () => {
            Components.Chat.refs.chat.data.state.typing = false;
            Events.emit('chat.stoppedTyping');
        }),
    };

    return ChatTyping;
}
