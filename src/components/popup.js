/* eslint-disable import/no-unresolved */
import { objectForEach } from '@utils/object';
import EventsBinder from '@core/event/events-binder';
import Reef from '@libs/reefjs/reef.es';
import { elemContains } from '@utils/dom';

export default function (Courier, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    const Binder = new EventsBinder();

    const Popup = {
        refs: {},

        mount() {
            Events.emit('popup.mount.before');
            this.initialize();
            Events.emit('popup.mount.after');
        },

        /**
         * Handles click events.
         *
         * @param  {Object} event
         */
        onClick(event) {
            // const overlay = Components.App.refs.app.elem.querySelector('#courierPopupOverlay');
            const closeBtn = Components.App.refs.app.elem.querySelector('#courierPopupCloseBtn');
            if (event.target.matches('#courierPopupCloseBtn')
                || (elemContains(closeBtn, event.target))
                || (event.target.matches('#courierPopupOverlay'))
                || (event.target.matches('#courierPopupWrapper'))) {
                this.close();
            }
        },

        /**
         * Handles keydown events.
         *
         * @param  {Object} event
         */
        onKeydown(event) {
            if (event.key === 'Escape') {
                this.close();
            }
        },

        close() {
            this.refs.popup.data.active = false;
            Events.emit('popup.closed');
        },

        open() {
            this.refs.popup.data.active = true;
            Events.emit('popup.opened');
        },

        /**
         * Initialize the popup.
         */
        initialize() {
            Popup.refs.popup = new Reef('#courierPopup', {
                data: {
                    active: false,
                    text: {
                        popupContent: Courier.settings.texts.popupContent,
                    },
                    poweredBy: {
                        show: Courier.settings.poweredBy.show,
                        text: Courier.settings.poweredBy.text,
                        img: {
                            src: Courier.settings.poweredBy.img.src,
                            alt: Courier.settings.poweredBy.img.alt,
                        },
                        url: Courier.settings.poweredBy.url,
                    },
                    state: {},
                },
                template: (props) => {
                    if (!props.active) {
                        return '';
                    }

                    const poweredBy = props.poweredBy.show
                        ? `
                        <div class="${Courier.settings.classes.popup}-powered-by">
                            <a href="${props.poweredBy.url}" target="_blank" rel="nofollow noopener noreferrer">
                                <p class="m-r--hf">${props.poweredBy.text}</p>
                                <img src="${props.poweredBy.img.src}" alt="${props.poweredBy.img.alt}" />
                            </a>
                        </div>`
                        : '';

                    return `
                    <div id="courierPopupOverlay" class="${Courier.settings.classes.popup}-overlay ${Courier.settings.classes.root}__fade-in ${Courier.settings.classes.root}__anim-timing--half">
                        <div id="courierPopupWrapper" class="${Courier.settings.classes.popup}-wrapper ${Courier.settings.classes.root}__appear-bottom ${Courier.settings.classes.root}__anim-timing--half">
                            <div class="${Courier.settings.classes.popup}-wrapper-inner">
                                <div class="${Courier.settings.classes.popup}-main">
                                    <button id="courierPopupCloseBtn" class="${Courier.settings.classes.popup}-close-btn" type="button" aria-label="Close">
                                        ${Courier.settings.images.closeBtn}
                                    </button>
                                    <div id="courierPopupWorkArea" class="${Courier.settings.classes.popup}-work-area">
                                        ${props.text.popupContent}
                                    </div>
                                </div>
                                ${poweredBy}
                            </div>
                        </div>
                    </div>`;
                },
                attachTo: Components.App.refs.app,
                allowHTML: true,
            });
        },

        /**
         * Render window outer elements.
         */
        render() {
            Popup.refs.popup.render();
        },
    };

    /**
     * Bind event listeners after App has been mounted and rendered for the first time
     */
    Events.on('app.mounted', () => {
        Events.on('popup.close', () => {
            Popup.close();
        });

        Events.on('widget.clicked', () => {
            Popup.open();
        });
    });

    /**
     * Bind event listeners after App has been rendered
     */
    Events.on('app.click', (event) => {
        Popup.onClick(event);
    });

    /**
     * Bind event listeners after App has been rendered
     */
    Events.on('app.keydown', (event) => {
        Popup.onKeydown(event);
    });

    /**
     * Remove bindings from click:
     * - on destroying to remove added events
     * - on updating to remove events before remounting
     */
    Events.on(['destroy', 'update'], () => {

    });

    /**
     * Remount component
     * - on updating to reflect potential changes in settings
     */
    Events.on('update', () => {
        Popup.mount();
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
     * - on popup.mount.before to rerender elements and apply changes
     */
    Events.on(['destroy', 'popup.mount.before'], () => {
        /*
        objectForEach(Popup.refs, (item) => {
            if (item.el.parentNode) {
                item.el.parentNode.removeChild(item.el);
            }
        });
         */
        /*
         for (let i = 0; i < App.refs.length; i++) {
         App.refs[i].el.parentNode.removeChild(App.refs[i].el);
         }
         */
        Popup.refs = {};
    });

    return Popup;
}
