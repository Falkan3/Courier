import Core from '../src/index';

// Required components
import App from '../src/components/app';
import Chat from '../src/components/chat';

const COMPONENTS = {
    // Required
    App,
    Chat,
    // Optional
};

export default class Courier extends Core {
    mount(extensions = {}) {
        return super.mount(Object.assign({}, COMPONENTS, extensions));
    }
}
