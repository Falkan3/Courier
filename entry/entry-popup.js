import Core from '../src/index';

/* Required components */
import App from '../src/components/app';
import Widget from '../src/components/widget';
import Popup from '../src/components/popup';
/* Modules */
import PopupCarouselModule from '../src/components/modules/popup-carousel';
/* General */
import TooltipsModule from '../src/components/modules/tooltips';

const COMPONENTS = {
    App,
    Widget,
    Popup,
    /* Modules */
    PopupCarouselModule,
    /* General */
    TooltipsModule
};

export default class Courier extends Core {
    mount(extensions = {}) {
        return super.mount({ ...COMPONENTS, ...extensions });
    }
}
