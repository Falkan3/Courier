/* eslint-disable import/no-unresolved */
import Reef from '@libs/reefjs/reef.es';
import Glide, { Controls, Images, Swipe } from '@libs/glidejs/glide.modular.esm';

export default function (Courier, Components, Events) {
    const ChatCarousel = {
        refs: {
            carousels: []
        },
        template: 'carousel',

        /**
         * Construct a ChatCarousel instance.
         */
        mount() {},

        initialize() {},

        initGlide(rootElem) {
            // Mount glide carousels
            new Glide(rootElem.querySelector('.glide'), {
                type: 'carousel',
                startAt: 0,
                perView: 1,
                peek: {
                    before: 0,
                    after: 150
                }
            }).mount({ Controls, Swipe, Images });
        },

        generateHtml(props, elem) {
            const message = Components.Chat.refs.chat.data.messages[elem.dataset.courierMessageId];

            let html = '';
            let carouselItemsHtml = '';
            let carouselBullets = '';
            message.carousel.items.forEach((carouselItem, carouselItemIndex) => {
                carouselItemsHtml += `
                    <li class="${Courier.settings.classes.chat}-carousel__item glide__slide">
                        <div class="${Courier.settings.classes.chat}-carousel__item-content">
                            <img class="${Courier.settings.classes.chat}-carousel__item-img" src="${carouselItem.img.src}" alt="${carouselItem.img.alt}" />
                            <div class="${Courier.settings.classes.chat}-carousel__item-body">
                                <p class="tx-bigger tx-wb">${carouselItem.title}</p>
                                <p class="${Courier.settings.classes.chat}-carousel__item-price tx-wb">${carouselItem.price}</p>
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
        if (event.target.matches('#courierChat')) {
            // if (ChatCarousel.refs.carousels) {
            //     ChatCarousel.refs.carousels.forEach((carousel) => {
            //         Components.Chat.refs.chat.detach(carousel);
            //     });
            // }
            // ChatCarousel.refs.carousels = [];

            const carousels = Components.App.refs.app.elem.querySelectorAll(`[data-template="${ChatCarousel.template}"]`);
            carousels.forEach((carousel) => {
                for (let i = 0, { length } = ChatCarousel.refs.carousels.length; i < length; i++) {
                    if (carousel === ChatCarousel.refs.carousels[i]) return;
                }
                ChatCarousel.refs.carousels.push(new Reef(`[data-template="${ChatCarousel.template}"][data-courier-message-id="${carousel.dataset.courierMessageId}"]`, {
                    data: {},
                    template: (props, elem) => ChatCarousel.generateHtml(props, elem),
                    attachTo: Components.Chat.refs.chat
                }));
            });
        }

        if (event.target.matches(`[data-template="${ChatCarousel.template}"]`)) {
            ChatCarousel.initGlide(event.target);
        }
    });

    return ChatCarousel;
}
