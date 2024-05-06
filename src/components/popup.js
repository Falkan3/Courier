/* eslint-disable import/no-unresolved */
import EventsBinder from '@core/event/events-binder';
import { component as Reef, signal } from '@libs/reefjs/reef.es';
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
        templateData: null,

        mount() {
            this.templateData = this.getTemplateData();
            Events.emit('popup.mount');
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

            return event;
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
            this.templateData.state.active = false;
            Events.emit('popup.closed');
        },

        open() {
            this.templateData.state.active = true;
            Events.emit('popup.opened');
        },

        getTemplateData(update = false) {
            const data = {
                texts: {
                    close: Courier.settings.textsParsed.close,
                    popupContent: Courier.settings.textsParsed.popupContent,
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
                state: {
                    active: false,
                },
            };

            if (update) {
                data.state.active = this.templateData.state.active;
            }

            return signal(data, 'popup');
        },

        refreshContent() {
            this.templateData.texts.popupContent = Courier.settings.textsParsed.popupContent;
        },

        /**
         * Initialize the popup.
         */
        initialize() {
            const elem = Components.App.refs.app.elem.querySelector('#courierPopup');

            Popup.refs.popup = Reef(elem, () => {
                if (!this.templateData.state.active) {
                    return '';
                }

                const poweredBy = this.templateData.poweredBy.show
                    ? `
                        <div class="${Courier.settings.classes.popup}-powered-by">
                            <a href="${this.templateData.poweredBy.url}" target="_blank" rel="nofollow noreferrer">
                                <p class="m-r--hf">${this.templateData.poweredBy.text}</p>
                                <img src="${this.templateData.poweredBy.img.src}" alt="${this.templateData.poweredBy.img.alt}" />
                            </a>
                        </div>`
                    : '';

                return `
                    <div id="courierPopupOverlay" class="${Courier.settings.classes.popup}-overlay ${Courier.settings.classes.root}__fade-in ${Courier.settings.classes.root}__anim-timing--half">
                        <div id="courierPopupWrapper" class="${Courier.settings.classes.popup}-wrapper ${Courier.settings.classes.root}__appear-bottom ${Courier.settings.classes.root}__anim-timing--half">
                            <div class="${Courier.settings.classes.popup}-wrapper-inner">
                                <div class="${Courier.settings.classes.popup}-main">
                                    <button id="courierPopupCloseBtn" class="${Courier.settings.classes.popup}-close-btn" type="button" aria-label="${this.templateData.texts.close}">
                                        ${Courier.settings.images.closeBtn}
                                    </button>
                                    <div id="courierPopupWorkArea" class="${Courier.settings.classes.popup}-work-area">
                                        ${this.templateData.texts.popupContent}
                                    </div>
                                </div>
                                ${poweredBy}
                            </div>
                        </div>
                    </div>`;
            }, { signals: ['popup'] });
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

        Events.emit('popup.mounted');
    });

    Events.on('app.rendered.app', () => {
        Popup.initialize();
        // Popup.render();
    });

    Events.on('app.rendered', (event) => {
        if (Popup.refs.popup && event.target.isEqualNode(Popup.refs.popup.elem)) {
            Events.emit('app.rendered.popup', event);
        }
        if (event.target.matches('[data-module-id]')) {
            Events.emit('app.rendered.popupModule', event);
        }
    });

    Events.on('app.click', (event) => {
        Popup.onClick(event);
    });

    /**
     * Bind event listeners after App has been rendered
     */
    Events.on('root.keydown', (event) => {
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
        // Popup.mount();
        // Popup.refreshContent();
        Popup.templateData = Popup.getTemplateData(true);
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
    });

    Events.on(['destroy:after'], () => {
        Popup.refs = {};
    });

    return Popup;
}
