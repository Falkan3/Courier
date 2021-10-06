import Core from '../src/index';
/* Components */
import App from '../src/components/app';
import Widget from '../src/components/widget';
import Chat from '../src/components/chat';
import Popup from '../src/components/popup';
/* Modules */
import ChatTriggersModule from '../src/components/modules/chat-triggers';

const COMPONENTS = {
    App,
    Widget,
};

export {
    Chat,
    Popup,
    /* Modules */
    ChatTriggersModule
};

export default class Courier extends Core {
    mount(extensions = {}) {
        return super.mount(Object.assign({}, COMPONENTS, extensions));
    }
}
