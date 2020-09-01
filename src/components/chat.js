import { objectForEach } from '../utils/object';
import EventsBinder from '../core/event/events-binder';
import Reef from '../libs/reefjs/reef.es';


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
            Binder.on('click', Components.App.refs.app.elem, event => this.click(event));
            Binder.on('submit', Components.App.refs.app.elem, event => this.submit(event));
        },

        /**
         * Removes click events.
         */
        unbind() {
            Binder.off('click', Components.App.refs.app.elem);
        },

        /**
         * Handles click events.
         *
         * @param  {Object} event
         */
        click(event) {
            return event;
        },


        /**
         * Handles submit events.
         *
         * @param  {Object} event
         */
        submit(event) {
            if (event.target.matches('#courierChatInteractionsForm')
                || document.querySelector('#courierChatInteractionsForm')
                    .contains(event.target)) {
                return event;
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
                        sendMessage: 'Send message',
                    },
                },
                template: (props) => {
                    if (!props.active) {
                        return '';
                    }

                    return `
                    <div class="${Courier.settings.classes.chat}-wall">
                        <div class="${Courier.settings.classes.chat}-work-area"></div>
                        <form id="courierChatInteractionsForm" class="${Courier.settings.classes.chat}-interactions">
                            <input type="text" class="${Courier.settings.classes.chat}-message-box" />
                            <button class="${Courier.settings.classes.chat}-send-msg-btn" type="button" aria-label="${props.sendMessage}">
                                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512"><path d="m14.077 16.79c-.065-.224-.231-.404-.448-.489l-3.857-1.5c-.231-.09-.491-.061-.695.08-.205.14-.327.371-.327.619v6.75c0 .324.208.611.516.713.077.025.156.037.234.037.234 0 .46-.11.604-.306l3.857-5.25c.139-.188.181-.429.116-.654z" fill="#2196f3"/><path d="m23.685.139c-.23-.163-.532-.185-.782-.054l-22.5 11.75c-.266.139-.423.423-.401.722.023.3.222.556.505.653l19.75 6.75c.079.026.161.04.243.04.136 0 .271-.037.39-.109.19-.116.319-.311.352-.53l2.75-18.5c.041-.28-.077-.558-.307-.722z" fill="#64b5f6"/></svg>
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
