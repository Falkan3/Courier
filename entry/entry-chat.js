import Core from '../src/index';

/* Required components */
import App from '../src/components/app';
import Widget from '../src/components/widget';
import Chat from '../src/components/chat';
/* Modules */
import ChatTriggersModule from '../src/components/modules/chat-triggers';
import ChatCarouselModule from '../src/components/modules/chat-carousel';

const COMPONENTS = {
    App,
    Widget,
    Chat,
    /* Modules */
    ChatTriggersModule,
    ChatCarouselModule,
};

export default class Courier extends Core {
    mount(extensions = {}) {
        return super.mount({ ...COMPONENTS, ...extensions });
    }
}
