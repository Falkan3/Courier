import Core from '../src/index';
/* Components */
import App from '../src/components/app';
import Widget from '../src/components/widget';
import Chat from '../src/components/chat';
import Popup from '../src/components/popup';
/* Classes */
// import ChatMessage from '../src/components/classes/chat-message';

const COMPONENTS = {
    App,
    Widget,
};

export {
    Chat,
    Popup,
    /* Classes */
    // ChatMessage
};

export default class Courier extends Core {
    mount(extensions = {}) {
        return super.mount(Object.assign({}, COMPONENTS, extensions));
    }
}
