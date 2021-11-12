import Core from '../src/index';

/* Required components */
import App from '../src/components/app';
import Widget from '../src/components/widget';
/* Optional components */
// import Chat from '../src/components/chat';
import Popup from '../src/components/popup';
/* Modules */
/* Chat */
// import ChatTriggersModule from '../src/components/modules/chat-triggers';
// import ChatCarouselModule from '../src/components/modules/chat-carousel';
/* Popup */
import PopupCarouselModule from '../src/components/modules/popup-carousel';

const COMPONENTS = {
    /* Required */
    App,
    Widget,
    /* Optional */
    // Chat,
    Popup,
    /* Modules */
    /* Chat */
    // ChatTriggersModule,
    // ChatCarouselModule,
    /* Popup */
    PopupCarouselModule,
};

export default class Courier extends Core {
    mount(extensions = {}) {
        return super.mount({ ...COMPONENTS, ...extensions });
    }
}
