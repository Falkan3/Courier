/* eslint-disable import/no-unresolved */
import Reef from '@libs/reefjs/reef.es';
import Glide, { Controls, Images, Swipe } from '@libs/glidejs/glide.modular.esm';
import { addAffix, formatPercentage, roundNumber } from '@utils/string';

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
        mount() {
        },

        initialize() {
        },

        initGlide(rootElem) {
            // Mount glide carousels
            const glide = new Glide(rootElem.querySelector('.glide'), {
                type: 'carousel',
                startAt: 0,
                perView: 1,
                peek: {
                    before: 0,
                    after: Courier.settings.state.carouselPeek
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
            const carouselArrows = `
            <div class="glide__arrows" data-glide-el="controls">
                <button class="slider__arrow slider__arrow--prev glide__arrow glide__arrow--prev" data-glide-dir="<">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                        <path d="M0 12l10.975 11 2.848-2.828-6.176-6.176H24v-3.992H7.646l6.176-6.176L10.975 1 0 12z"></path>
                    </svg>
                </button>

                <button class="slider__arrow slider__arrow--next glide__arrow glide__arrow--next" data-glide-dir=">">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                        <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"></path>
                    </svg>
                </button>
            </div>`;
            let carouselBullets = '';
            message.carousel.items.forEach((carouselItem, carouselItemIndex) => {
                let priceCurrentHtml = '';
                let priceOldHtml = '';
                if (carouselItem.price.discount && carouselItem.price.value) {
                    priceCurrentHtml = `
                    <div class="${Courier.settings.classes.chat}-carousel__item-price-wrapper">
                        <p class="${Courier.settings.classes.chat}-carousel__item-price-tag tx-wb">${addAffix(roundNumber(carouselItem.price.value * (1 - carouselItem.price.discount)), carouselItem.price.affix[0], carouselItem.price.affix[1])}</p>
                    </div>`;
                    priceOldHtml = `
                    <div class="${Courier.settings.classes.chat}-carousel__item-price-wrapper">
                        <p class="${Courier.settings.classes.chat}-carousel__item-price-old tx-wb">${addAffix(carouselItem.price.value, carouselItem.price.affix[0], carouselItem.price.affix[1])}</p>
                    </div>`;
                } else if (carouselItem.price.value) {
                    priceCurrentHtml = `
                    <div class="${Courier.settings.classes.chat}-carousel__item-price-wrapper">
                        <p class="${Courier.settings.classes.chat}-carousel__item-price-tag tx-wb">${addAffix(carouselItem.price.value, carouselItem.price.affix[0], carouselItem.price.affix[1])}</p>
                    </div>`;
                }

                const priceHtml = priceOldHtml || priceCurrentHtml ? `
                <div class="m-t--auto p-t--hf">
                    <div class="${Courier.settings.classes.chat}-carousel__item-price">
                        ${priceCurrentHtml}
                        ${priceOldHtml}
                    </div>
                </div>` : '';

                const discountBadgeHtml = carouselItem.price.discount ? `
                <div class="${Courier.settings.classes.chat}-carousel__item-discount">
                    <p><span class="tx-smaller">${props.texts.individualDiscount}</span> <span class="${Courier.settings.classes.chat}-carousel__item-discount-value tx-bigger">-${formatPercentage(carouselItem.price.discount, false)}<span class="tx-smaller">%</span></span></p>
                </div>` : '';

                // const discountBadgeHtml = carouselItem.price.discount ? `
                // <div class="${Courier.settings.classes.chat}-carousel__item-discount">
                // eslint-disable-next-line max-len
                //     <p class="${Courier.settings.classes.chat}-carousel__item-discount-badge">-${formatPercentage(carouselItem.price.discount)}</p>
                // </div>` : '';

                // const discountBadgeHtml = carouselItem.price.discount ? `
                // <div class="${Courier.settings.classes.chat}-carousel__item-discount-individual">
                // eslint-disable-next-line max-len
                // <p class="${Courier.settings.classes.chat}-carousel__item-discount-individual-value">-${formatPercentage(carouselItem.price.discount, false)}<span class="tx-smaller">%</span></p>
                // eslint-disable-next-line max-len
                //     <p class="${Courier.settings.classes.chat}-carousel__item-discount-individual-text">${props.texts.individualDiscount}</p>
                // </div>` : '';

                carouselItemsHtml += `
                    <li class="${Courier.settings.classes.chat}-carousel__item glide__slide">
                        <div class="${Courier.settings.classes.chat}-carousel__item-content">
                            ${discountBadgeHtml}
                            <div class="${Courier.settings.classes.chat}-carousel__item-img">
                                 <div class="${Courier.settings.classes.chat}-carousel__item-img-wrapper">
                                    <a href="${carouselItem.link}" rel="noreferrer"><img class="${Courier.settings.classes.chat}-carousel__item-img-content" src="${carouselItem.img.src}" alt="${carouselItem.img.alt}" /></a>
                                </div>
                            </div>
                            <div class="${Courier.settings.classes.chat}-carousel__item-body">
                                <p class="${Courier.settings.classes.popup}-carousel__item-name tx-bold tx-wb">${carouselItem.title}</p>
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

                    ${carouselArrows}

                    <div class="glide__bullets" data-glide-el="controls[nav]">
                        ${carouselBullets}
                    </div>
                </div>`;

            return html;
        },

        /**
         * Render Chat Carousels.
         */
        render() {
            if (ChatCarousel.refs.carousels) {
                ChatCarousel.refs.carousels.forEach((carousel) => {
                    carousel.render();
                });
            }
        },
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
                // ChatCarousel.destroyGlides();
                ChatCarousel.refs.carousels.forEach((carousel, index) => {
                    // Components.Chat.refs.chat.detach(carousel); // deprecated in v11
                    delete ChatCarousel.refs.carousels[index];
                });
            }
            ChatCarousel.refs.carousels = [];

            // find all templates
            const carousels = Components.App.refs.app.elem.querySelectorAll(`[data-template="${ChatCarousel.template}"]`);
            carousels.forEach((carousel) => {
                for (let i = 0; i < ChatCarousel.refs.carousels.length; i++) {
                    // skip if the carousel has been initialized as a reef instance already
                    if (carousel.matches(ChatCarousel.refs.carousels[i].elem)) return;
                    // if (carousel.isEqualNode(ChatCarousel.refs.carousels[i].elem)) return;
                }
                // initialize new reef instances
                ChatCarousel.refs.carousels.push(new Reef(`[data-template="${ChatCarousel.template}"][data-courier-message-id="${carousel.dataset.courierMessageId}"]`, {
                    data: {
                        texts: {
                            individualDiscount: Courier.settings.textsParsed.individualDiscount,
                        },
                    },
                    template: (props, elem) => ChatCarousel.generateHtml(props, elem),
                    attachTo: Components.Chat.refs.chat
                }));
            });
        }

        if (event.target.matches(`[data-template="${ChatCarousel.template}"]`)
            && Components.Chat.refs.chat.data.state.active) {
            ChatCarousel.initGlide(event.target);

            if (ChatCarousel.scrollToBottom) {
                Components.Chat.refs.workArea.scrollTop += event.target.clientHeight;
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
