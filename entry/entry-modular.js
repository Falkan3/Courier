import Core from '../src/index';

import App from '../src/components/app';
import Widget from '../src/components/widget';
import Chat from '../src/components/chat';

const COMPONENTS = {
    App,
    Chat,
    Widget,
};

export {

};

export default class Courier extends Core {
    mount(extensions = {}) {
        return super.mount(Object.assign({}, COMPONENTS, extensions));
    }
}
