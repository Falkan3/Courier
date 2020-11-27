import Core from '../src/index';

// Required components
import App from '../src/components/app';
import Widget from '../src/components/widget';
// Optional components
import Chat from '../src/components/chat';
// import Popup from '../src/components/popup';

const COMPONENTS = {
    // Required
    App,
    Widget,
    // Optional
    Chat,
    // Popup,
};

export default class Courier extends Core {
    mount(extensions = {}) {
        return super.mount(Object.assign({}, COMPONENTS, extensions));
    }
}
