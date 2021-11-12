import Core from '../src/index';
/* Components */
import App from '../src/components/app';
import Widget from '../src/components/widget';
import Chat from '../src/components/chat';
import Popup from '../src/components/popup';
/* Modules */
/* Chat */
import ChatTriggersModule from '../src/components/modules/chat-triggers';
import ChatCarouselModule from '../src/components/modules/chat-carousel';
import ChatTypingModule from '../src/components/modules/chat-typing';
/* Popup */
import PopupCarouselModule from '../src/components/modules/popup-carousel';

const COMPONENTS = {
    App,
    Widget,
};

export {
    Chat,
    Popup,
    /* Modules */
    /* Chat */
    ChatTriggersModule,
    ChatCarouselModule,
    ChatTypingModule,
    /* Popup */
    PopupCarouselModule,
};

export default class Courier extends Core {
    mount(extensions = {}) {
        return super.mount({ ...COMPONENTS, ...extensions });
    }
}
