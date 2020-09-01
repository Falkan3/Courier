import { isUndefined } from '../utils/types';
import { objectForEach } from '../utils/object';
import EventsBinder from '../core/event/events-binder';


export default function (Courier, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    const Binder = new EventsBinder();

    const Chat = {
        refs: {},

        mount() {
            Events.emit('chat.mount.before');
            this.render();
            this.bind();
            Events.emit('chat.mount.after');
        },

        /**
         * Adds click events.
         */
        bind() {
            Binder.on('click', document, event => this.click(event));
        },

        /**
         * Removes click events.
         */
        unbind() {
            Binder.off('click', document);
        },

        /**
         * Handles click events.
         *
         * @param  {Object} event
         */
        click(event) {
            if ((!isUndefined(this.refs.container)
                && event.target === this.refs.container.el)
                || (!isUndefined(this.refs.btnClose)
                    && event.target === this.refs.btnClose.el)) this.close();
        },

        close() {
            Events.emit('chat.close');
        },

        open() {
            Events.emit('chat.open');
        },

        /**
         * Initialize the chat.
         */
        initialize() {

        },

        /**
         * Render window outer elements.
         */
        render() {
            this.refs.container = { el: this.renderContainer() };
            this.refs.btnClose = { el: this.renderBtnClose(), parentKey: 'container' };

            objectForEach(Chat.refs, (item) => {
                if (isUndefined(item.parentKey)) {
                    item.parent = Courier.rootElement;
                } else if (!isUndefined(Chat.refs[item.parentKey])) {
                    item.parent = Chat.refs[item.parentKey].el;
                } else {
                    item.parent = Courier.rootElement;
                }
                item.el = item.parent.appendChild(item.el);
            });
        },

        /**
         * Render the container element.
         */
        renderContainer() {
            const el = document.createElement('div');
            el.classList.add(Courier.settings.classes.container);
            return el;
        },

        /**
         * Render the button close element.
         */
        renderBtnClose() {
            const el = document.createElement('button');
            el.classList.add(Courier.settings.classes.btnClose);
            return el;
        },
    };

    /**
     * Remove bindings from click:
     * - on destroying to remove added events
     * - on updating to remove events before remounting
     */
    Events.on(['destroy', 'update'], () => {
        Chat.unbind();
    });

    /**
     * Remount component
     * - on updating to reflect potential changes in settings
     */
    Events.on('update', () => {
        Chat.mount();
    });

    /**
     * Destroy binder:
     * - on destroying to remove listeners
     */
    Events.on(['destroy'], () => {
        Binder.destroy();
    });

    /**
     * Destroy elements:
     * - on destroy to remove rendered elements
     * - on chat.mount.before to rerender elements and apply changes
     */
    Events.on(['destroy', 'chat.mount.before'], () => {
        objectForEach(Chat.refs, (item) => {
            if (item.el.parentNode) {
                item.el.parentNode.removeChild(item.el);
            }
        });
        /*
        for (let i = 0; i < App.refs.length; i++) {
            App.refs[i].el.parentNode.removeChild(App.refs[i].el);
        }
        */
        Chat.refs = [];
    });

    return Chat;
}
