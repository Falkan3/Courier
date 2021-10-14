/* eslint-disable import/no-unresolved */
import Reef from '@libs/reefjs/reef.es';
import Glide, { Controls, Images, Swipe } from '@libs/glidejs/glide.modular.esm';

export default function (Courier, Components, Events) {
    const ChatCarousel = {
        refs: {
            carousels: [],
            glides: []
        },
        template: 'carousel',
        scrollToBottom: false,

        /**
         * Construct a ChatCarousel instance.
         */
        mount() {},

        initialize() {},

        initGlide(rootElem) {
            // Mount glide carousels
            const glide = new Glide(rootElem.querySelector('.glide'), {
                type: 'carousel',
                startAt: 0,
                perView: 1,
                peek: {
                    before: 0,
                    after: 150
                }
            });
            glide.mount({ Controls, Swipe, Images });
            this.refs.glides.push(glide);
        },

        destroyGlides() {
            this.refs.glides.forEach((glide) => {
                glide.destroy();
            });
            this.refs.glides = [];
        },

        generateHtml(props, elem) {
            const message = Components.Chat.refs.chat.data.messages[elem.dataset.courierMessageId];

            let html = '';
            let carouselItemsHtml = '';
            let carouselBullets = '';
            message.carousel.items.forEach((carouselItem, carouselItemIndex) => {
                const priceCurrentHtml = carouselItem.price ? `
                <div class="${Courier.settings.classes.chat}-carousel__item-price-wrapper">
                    <p class="${Courier.settings.classes.chat}-carousel__item-price-tag tx-wb">${carouselItem.price}</p>
                </div>` : '';
                const priceOldHtml = carouselItem.priceOld ? `
                <div class="${Courier.settings.classes.chat}-carousel__item-price-wrapper">
                    <p class="${Courier.settings.classes.chat}-carousel__item-price-old tx-wb">${carouselItem.priceOld}</p>
                </div>` : '';
                const priceHtml = priceOldHtml || priceCurrentHtml ? `
                <div class="${Courier.settings.classes.chat}-carousel__item-price">
                    ${priceCurrentHtml}
                    ${priceOldHtml}
                </div>` : '';

                carouselItemsHtml += `
                    <li class="${Courier.settings.classes.chat}-carousel__item glide__slide">
                        <div class="${Courier.settings.classes.chat}-carousel__item-content">
                            <img class="${Courier.settings.classes.chat}-carousel__item-img" src="${carouselItem.img.src}" alt="${carouselItem.img.alt}" />
                            <div class="${Courier.settings.classes.chat}-carousel__item-body">
                                <p class="tx-bigger tx-wb">${carouselItem.title}</p>
                                ${priceHtml}
                            </div>
                            <div class="${Courier.settings.classes.chat}-carousel__item-footer">
                                <p><a href="${carouselItem.link}" rel="noreferrer">${carouselItem.goToProduct ? carouselItem.goToProduct : Courier.settings.texts.goToProduct}</a></p>
                            </div>
                        </div>
                    </li>`;

                carouselBullets += `<button class="glide__bullet" data-glide-dir="=${carouselItemIndex}"></button>`;
            });

            html += `
                <div class="glide">
                    <div class="${Courier.settings.classes.chat}-carousel glide__track" data-glide-el="track">
                        <ul class="glide__slides">
                            ${carouselItemsHtml}
                        </ul>
                    </div>

                    <div class="glide__bullets" data-glide-el="controls[nav]">
                        ${carouselBullets}
                    </div>
                </div>`;

            return html;
        }
    };

    Events.on('mount.after', () => {
        ChatCarousel.initialize();
    });

    /**
     * Bind event listeners after App has been rendered
     */
    Events.on('app.rendered', (event) => {
        if (event.target.matches('#courierChat') && Components.Chat.refs.chat.data.state.active) {
            // remove existing reef instances
            if (ChatCarousel.refs.carousels) {
                ChatCarousel.refs.carousels.forEach((carousel, index) => {
                    Components.Chat.refs.chat.detach(carousel);
                    delete ChatCarousel.refs.carousels[index];
                });
            }
            ChatCarousel.refs.carousels = [];
            ChatCarousel.destroyGlides();

            // find all templates
            const carousels = Components.App.refs.app.elem.querySelectorAll(`[data-template="${ChatCarousel.template}"]`);
            carousels.forEach((carousel) => {
                for (let i = 0; i < ChatCarousel.refs.carousels.length; i++) {
                    // skip if the carousel has been initialized as a reef instance already
                    if (carousel.matches(ChatCarousel.refs.carousels[i].elem)) return;
                }
                // initialize new reef instances
                ChatCarousel.refs.carousels.push(new Reef(`[data-template="${ChatCarousel.template}"][data-courier-message-id="${carousel.dataset.courierMessageId}"]`, {
                    data: {},
                    template: (props, elem) => ChatCarousel.generateHtml(props, elem),
                    attachTo: Components.Chat.refs.chat
                }));
            });
        }

        if (event.target.matches(`[data-template="${ChatCarousel.template}"]`) && Components.Chat.refs.chat.data.state.active) {
            ChatCarousel.initGlide(event.target);

            if (ChatCarousel.scrollToBottom) {
                Components.App.refs.app.elem.querySelector('#courierChatWorkArea').scrollTop += event.target.clientHeight;
            }
        }
    });

    Events.on('chat.scrollToBottom', (state) => {
        ChatCarousel.scrollToBottom = state;
    });

    Events.on(['destroy:after'], () => {
        ChatCarousel.refs = {
            carousels: [],
            glides: []
        };
    });

    return ChatCarousel;
}
