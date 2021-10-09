/* eslint-disable import/no-unresolved */
import Reef from '@libs/reefjs/reef.es';
import Glide, { Controls, Images, Swipe } from '@libs/glidejs/glide.modular.esm';

export default function (Courier, Components, Events) {
    const ChatCarousel = {
        refs: {
            carousel: null,
        },
        template: 'carousel',

        /**
         * Construct a ChatCarousel instance.
         */
        mount() {
            Events.on('mount.after', () => {
                this.initialize();
            });
        },

        initialize() {
            this.refs.carousel = new Reef(`[data-template="${this.template}"]`, {
                data: {},
                template: (props, elem) => this.generateHtml(props, elem),
                attachTo: Components.Chat.refs.chat
            });
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

    /**
     * Bind event listeners after App has been rendered
     */
    Events.on('app.rendered', (event) => {
        if (event.target.dataset.template
            && event.target.dataset.template === ChatCarousel.template) {
            // Mount glide carousels
            new Glide('.glide', {
                type: 'carousel',
                startAt: 0,
                perView: 1,
                peek: {
                    before: 0,
                    after: 150
                }
            }).mount({ Controls, Swipe, Images });
        }
    });

    return ChatCarousel;
}
