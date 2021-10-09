import Core from '../src/index';

/* Required components */
import App from '../src/components/app';
import Widget from '../src/components/widget';
/* Optional components */
import Chat from '../src/components/chat';
// import Popup from '../src/components/popup';
/* Modules */
import ChatTriggersModule from '../src/components/modules/chat-triggers';
import ChatCarouselModule from '../src/components/modules/chat-carousel';

const COMPONENTS = {
    /* Required */
    App,
    Widget,
    /* Optional */
    Chat,
    // Popup,
    /* Modules */
    ChatTriggersModule,
    ChatCarouselModule,
};

export default class Courier extends Core {
    mount(extensions = {}) {
        return super.mount({ ...COMPONENTS, ...extensions });
    }
}
