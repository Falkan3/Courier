import Core from '../src/index';

import App from '../src/components/app';
import Chat from '../src/components/chat';

const COMPONENTS = {
    App,
    Chat,
};

export {

};

export default class Courier extends Core {
    mount(extensions = {}) {
        return super.mount(Object.assign({}, COMPONENTS, extensions));
    }
}
