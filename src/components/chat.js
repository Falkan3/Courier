import { objectForEach } from '../utils/object';
import EventsBinder from '../core/event/events-binder';
import Reef from '../libs/reefjs/reef.es';
import { elemContains } from '../utils/dom';


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
            this.initialize();
            Events.emit('chat.mount.after');
        },

        /**
         * Adds click events.
         */
        bind() {
            Binder.on('submit', Components.App.refs.app.elem, event => this.submit(event));
        },

        /**
         * Removes click events.
         */
        unbind() {
            Binder.off('submit', Components.App.refs.app.elem);
        },

        /**
         * Handles click events.
         *
         * @param  {Object} event
         */
        click(event) {
            const closeBtn = document.querySelector('#courierChatCloseBtn');
            if (event.target.matches('#courierChatCloseBtn')
                || (elemContains(closeBtn, event.target))) {
                this.close();
            }

            return event;
        },

        /**
         * Handles submit events.
         *
         * @param  {Object} event
         */
        submit(event) {
            const form = document.querySelector('#courierChatInteractionsForm');
            if (event.target.matches('#courierChatInteractionsForm')
                || (elemContains(form, event.target))) {
                event.preventDefault();
            }

            return event;
        },

        close() {
            this.refs.chat.data.active = false;
            Events.emit('chat.close');
        },

        open() {
            this.refs.chat.data.active = true;
            Events.emit('chat.open');
        },

        /**
         * Initialize the chat.
         */
        initialize() {
            Chat.refs.chat = new Reef('#courierChat', {
                data: {
                    active: false,
                    text: {
                        headerMessage: 'Chat with us!',
                        sendMessage: 'Send message',
                        messagePlaceholder: 'Type something...',
                    },
                },
                template: (props) => {
                    if (!props.active) {
                        return '';
                    }

                    return `
                    <div class="${Courier.settings.classes.chat}-wall ${Courier.settings.classes.root}__slide-in-bottom ${Courier.settings.classes.root}__anim-timing--half">
                        <div class="${Courier.settings.classes.chat}-header">
                            <div>
                                <button id="courierChatOptionsBtn" class="${Courier.settings.classes.chat}-options-btn" type="button">
                                    ${Courier.settings.images.options}
                                </button>
                            </div>
                            <div>
                                <p>${props.text.headerMessage}</p>
                            </div>
                            <div>
                                <button id="courierChatCloseBtn" class="${Courier.settings.classes.chat}-close-btn" type="button">
                                    ${Courier.settings.images.closeBtn}
                                </button>
                            </div>
                        </div>
                        <div class="${Courier.settings.classes.chat}-work-area"></div>
                        <form id="courierChatInteractionsForm" class="${Courier.settings.classes.chat}-interactions">
                            <input type="text" class="${Courier.settings.classes.chat}-message-box" placeholder="${props.text.messagePlaceholder}" autofocus />
                            <button class="${Courier.settings.classes.chat}-send-msg-btn" type="submit" aria-label="${props.text.sendMessage}">
                                ${Courier.settings.images.sendMsg}
                            </button>
                        </form>
                    </div>
                    `;
                },
                attachTo: Components.App.refs.app,
            });
        },

        /**
         * Render window outer elements.
         */
        render() {
            Chat.refs.chat.render();
        },
    };

    /**
     * Bind event listeners after App has been rendered
     */
    Events.on('app.rendered', () => {
        Chat.bind();
    });

    /**
     * Bind event listeners after App has been rendered
     */
    Events.on('app.click', (event) => {
        Chat.click(event);
    });

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
        Chat.refs = {};
    });

    return Chat;
}
