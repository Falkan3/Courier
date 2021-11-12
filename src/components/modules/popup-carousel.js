/* eslint-disable import/no-unresolved */
import Reef from '@libs/reefjs/reef.es';
import Glide, { Controls, Images, Swipe } from '@libs/glidejs/glide.modular.esm';
import { addAffix, formatPercentage, roundNumber } from '@utils/string';

export default function (Courier, Components, Events) {
    const PopupCarousel = {
        refs: {
            carousels: [],
            glides: []
        },
        template: 'carousel',

        /**
         * Construct a PopupCarousel instance.
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
            const moduleData = Courier.settings.moduleData[elem.dataset.moduleId];

            let html = '';
            let carouselItemsHtml = '';
            let carouselBullets = '';
            moduleData.carousel.items.forEach((carouselItem, carouselItemIndex) => {
                let priceCurrentHtml = '';
                let priceOldHtml = '';
                if (carouselItem.price.discount && carouselItem.price.value) {
                    priceCurrentHtml = `
                    <div class="${Courier.settings.classes.popup}-carousel__item-price-wrapper">
                        <p class="${Courier.settings.classes.popup}-carousel__item-price-tag tx-wb">${addAffix(roundNumber(carouselItem.price.value * (1 - carouselItem.price.discount)), carouselItem.price.affix[0], carouselItem.price.affix[1])}</p>
                    </div>`;
                    priceOldHtml = `
                    <div class="${Courier.settings.classes.popup}-carousel__item-price-wrapper">
                        <p class="${Courier.settings.classes.popup}-carousel__item-price-old tx-wb">${addAffix(carouselItem.price.value, carouselItem.price.affix[0], carouselItem.price.affix[1])}</p>
                    </div>`;
                } else if (carouselItem.price.value) {
                    priceCurrentHtml = `
                    <div class="${Courier.settings.classes.popup}-carousel__item-price-wrapper">
                        <p class="${Courier.settings.classes.popup}-carousel__item-price-tag tx-wb">${addAffix(carouselItem.price.value, carouselItem.price.affix[0], carouselItem.price.affix[1])}</p>
                    </div>`;
                }

                const priceHtml = priceOldHtml || priceCurrentHtml ? `
                <div class="${Courier.settings.classes.popup}-carousel__item-price">
                    ${priceCurrentHtml}
                    ${priceOldHtml}
                </div>` : '';

                // const discountBadgeHtml = carouselItem.price.discount ? `
                // <div class="${Courier.settings.classes.popup}-carousel__item-discount">
                // eslint-disable-next-line max-len
                //     <p class="${Courier.settings.classes.popup}-carousel__item-discount-badge">-${formatPercentage(carouselItem.price.discount)}</p>
                // </div>` : '';

                const discountBadgeHtml = carouselItem.price.discount ? `
                <div class="${Courier.settings.classes.popup}-carousel__item-discount-individual">
                <p class="${Courier.settings.classes.popup}-carousel__item-discount-individual-value">-${formatPercentage(carouselItem.price.discount, false)}<span class="tx-smaller">%</span></p>
                    <p class="${Courier.settings.classes.popup}-carousel__item-discount-individual-text">${props.texts.individualDiscount}</p>
                </div>` : '';

                carouselItemsHtml += `
                    <li class="${Courier.settings.classes.popup}-carousel__item glide__slide">
                        <div class="${Courier.settings.classes.popup}-carousel__item-content">
                            <div class="${Courier.settings.classes.popup}-carousel__item-img">
                                 <div class="${Courier.settings.classes.popup}-carousel__item-img-wrapper">
                                    <img class="${Courier.settings.classes.popup}-carousel__item-img-content" src="${carouselItem.img.src}" alt="${carouselItem.img.alt}" />
                                    ${discountBadgeHtml}
                                </div>
                            </div>
                            <div class="${Courier.settings.classes.popup}-carousel__item-body">
                                <p class="tx-bigger tx-wb">${carouselItem.title}</p>
                                ${priceHtml}
                            </div>
                            <div class="${Courier.settings.classes.popup}-carousel__item-footer">
                                <p><a href="${carouselItem.link}" rel="noreferrer">${carouselItem.goToProduct ? carouselItem.goToProduct : Courier.settings.texts.goToProduct}</a></p>
                            </div>
                        </div>
                    </li>`;

                carouselBullets += `<button class="glide__bullet" data-glide-dir="=${carouselItemIndex}"></button>`;
            });

            html += `
                <div class="glide">
                    <div class="${Courier.settings.classes.popup}-carousel glide__track" data-glide-el="track">
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
        PopupCarousel.initialize();
    });

    /**
     * Bind event listeners after App has been rendered
     */
    Events.on('app.rendered', (event) => {
        if (event.target.matches('#courierPopup') && Components.Popup.refs.popup.data.state.active) {
            // remove existing reef instances
            if (PopupCarousel.refs.carousels) {
                PopupCarousel.refs.carousels.forEach((carousel, index) => {
                    Components.Popup.refs.popup.detach(carousel);
                    delete PopupCarousel.refs.carousels[index];
                });
            }
            PopupCarousel.refs.carousels = [];
            PopupCarousel.destroyGlides();

            // find all templates
            const carousels = Components.App.refs.app.elem.querySelectorAll(`[data-template="${PopupCarousel.template}"]`);
            carousels.forEach((carousel) => {
                for (let i = 0; i < PopupCarousel.refs.carousels.length; i++) {
                    // skip if the carousel has been initialized as a reef instance already
                    if (carousel.matches(PopupCarousel.refs.carousels[i].elem)) return;
                }
                // initialize new reef instances
                PopupCarousel.refs.carousels.push(new Reef(`[data-template="${PopupCarousel.template}"][data-module-id="${carousel.dataset.moduleId}"]`, {
                    data: {
                        texts: {
                            individualDiscount: Courier.settings.textsParsed.individualDiscount,
                        },
                    },
                    template: (props, elem) => PopupCarousel.generateHtml(props, elem),
                    attachTo: Components.Popup.refs.popup
                }));
            });
        }

        if (event.target.matches(`[data-template="${PopupCarousel.template}"]`) && Components.Popup.refs.popup.data.state.active) {
            PopupCarousel.initGlide(event.target);
        }
    });

    Events.on(['destroy:after'], () => {
        PopupCarousel.refs = {
            carousels: [],
            glides: []
        };
    });

    return PopupCarousel;
}
