/* eslint-disable import/no-unresolved */
import { component as Reef, signal } from '@libs/reefjs/reef.es';
import Glide, {
    Controls, Images, Swipe, Anchors
} from '@libs/glidejs/glide.modular.esm';
import {
    addAffix, formatNumber, formatPercentage, roundNumber
} from '@utils/string';
import { textTemplate } from '@utils/object';
import { elemContains } from '@utils/dom';
import {
    clipboard as clipboardIcon, arrowLeft as arrowLeftIcon,
    arrowRight as arrowRightIcon, link as linkIcon
} from '@utils/images';
import { copyCouponCodeToClipboard } from '@utils/popup.js';

export default function Construct(Courier, Components, Events) {
    const PopupCarousel = {
        refs: {
            carousels: [],
            glides: []
        },
        template: 'carousel',
        templateData: signal({
            texts: {
                clipboardButton: Courier.settings.textsParsed.clipboardButton,
                clipboardTooltip: Courier.settings.textsParsed.clipboardTooltip,
                clipboardCopy: Courier.settings.textsParsed.clipboardCopy,
                clickToApplyDiscount: Courier.settings.textsParsed.clickToApplyDiscount,
            },
        }, 'popup-carousel'),
        activeSlide: {},

        /**
         * Construct a PopupCarousel instance.
         */
        mount() {
        },

        initialize() {
        },

        initGlide(rootElem) {
            // mount glide carousels
            const glide = new Glide(rootElem.querySelector('.glide'), {
                type: 'carousel',
                startAt: this.activeSlide[rootElem.dataset.courierMessageId] ?? 0,
                perView: 1,
                peek: {
                    before: 0,
                    after: Courier.settings.state.carouselPeek
                }
            });
            glide.mount({
                Controls, Swipe, Images, Anchors
            });
            // save last active item index for the current message
            glide.on('run', () => {
                this.activeSlide[rootElem.dataset.courierMessageId] = glide.index;
            });
            this.refs.glides.push(glide);
        },

        destroyGlides() {
            this.refs.glides.forEach((glide) => {
                glide.destroy();
            });
            this.refs.glides = [];
        },

        generateHtml(elem) {
            const moduleData = Courier.settings.moduleData[elem.dataset.moduleId];

            let html = '';
            let carouselItemsHtml = '';
            const carouselArrows = `
            <div class="glide__arrows" data-glide-el="controls">
                <button class="slider__arrow slider__arrow--prev glide__arrow glide__arrow--prev" data-glide-dir="<">${arrowLeftIcon}</button>
                <button class="slider__arrow slider__arrow--next glide__arrow glide__arrow--next" data-glide-dir=">">${arrowRightIcon}</button>
            </div>`;
            let carouselBullets = '';
            moduleData.carousel.items.forEach((carouselItem, carouselItemIndex) => {
                let priceCurrentHtml = '';
                let priceOldHtml = '';
                let discountPercentage = '';
                const price = addAffix(
                    formatNumber(carouselItem.price.value, { decimalPlaces: 2 }),
                    carouselItem.price.affix[0],
                    carouselItem.price.affix[1]
                );
                if (carouselItem.price.discount && carouselItem.price.value) {
                    const priceDiscounted = addAffix(
                        formatNumber(
                            roundNumber(
                                carouselItem.price.value * (1 - carouselItem.price.discount),
                                2
                            ),
                            { decimalPlaces: 2 }
                        ),
                        carouselItem.price.affix[0],
                        carouselItem.price.affix[1]
                    );
                    priceCurrentHtml = `
                    <div class="${Courier.settings.classes.popup}-carousel-item-price-wrapper">
                        <p class="${Courier.settings.classes.popup}-carousel-item-price-tag tx-wb">${priceDiscounted}</p>
                    </div>`;
                    if (Courier.settings.state.showDiscountPercentage) {
                        discountPercentage = `
                        <p class="${Courier.settings.classes.popup}-carousel-item-price-discount-percentage">-${formatPercentage(carouselItem.price.discount)}</p>
                        `;
                    }
                    priceOldHtml = `
                    <div class="${Courier.settings.classes.popup}-carousel-item-price-wrapper">
                        ${discountPercentage}
                        <p class="${Courier.settings.classes.popup}-carousel-item-price-old tx-wb">${price}</p>
                    </div>`;
                } else if (carouselItem.price.value) {
                    priceCurrentHtml = `
                    <div class="${Courier.settings.classes.popup}-carousel-item-price-wrapper">
                        <p class="${Courier.settings.classes.popup}-carousel-item-price-tag tx-wb">${price}</p>
                    </div>`;
                }

                const priceHtml = priceOldHtml || priceCurrentHtml ? `
                <div class="m-t--auto p-t--hf">
                    <div class="${Courier.settings.classes.popup}-carousel-item-price">
                        ${priceCurrentHtml}
                        ${priceOldHtml}
                    </div>
                </div>` : '';

                let discountBadgeHtml = carouselItem.footerText ? `
                <div class="${Courier.settings.classes.popup}-carousel-item-discount">
                    <p><span class="tx-smaller">${carouselItem.footerText}</span></p>
                </div>` : '';

                if (carouselItem.footerText) {
                    const discountBadgeValueHtml = `<span class="${Courier.settings.classes.popup}-carousel-item-discount-value tx-bigger">${formatPercentage(carouselItem.price.discount, false)}<span class="tx-smaller">%</span></span>`;

                    if (discountBadgeHtml) {
                        discountBadgeHtml = textTemplate(discountBadgeHtml, {
                            discountValue: discountBadgeValueHtml,
                            discountCode: carouselItem.discountCode
                        });
                    }
                }

                let discountCodeHtml = '';
                if (carouselItem.discountCode) {
                    if (carouselItem.discountLink) {
                        discountCodeHtml = `
                        <div class="${Courier.settings.classes.popup}-discount-code">
                            <a class="${Courier.settings.classes.popup}-discount-code-btn" href="${carouselItem.discountLink}" data-courier-tooltip="${this.templateData.texts.clickToApplyDiscount}" data-courier-discount-code="${carouselItem.discountCode}">
                                <span class="${Courier.settings.classes.popup}-discount-code-btn-container">
                                    <span class="${Courier.settings.classes.popup}-discount-code-value">${carouselItem.discountCode}</span>
                                    <span class="${Courier.settings.classes.popup}-discount-code-icon ${Courier.settings.classes.popup}-discount-code-icon--link">${linkIcon}</span>
                                </span>
                            </a>
                        </div>`;

                        discountCodeHtml = textTemplate(discountCodeHtml, {
                            discountLink: carouselItem.discountLink
                        });
                    } else {
                        discountCodeHtml = `
                        <div class="${Courier.settings.classes.popup}-discount-code ${Courier.settings.classes.popup}-carousel-item-discount-code">
                            <button class="${Courier.settings.classes.popup}-discount-code-btn" data-courier-tooltip="${this.templateData.texts.clipboardTooltip}" data-courier-discount-code="${carouselItem.discountCode}">
                                <span class="${Courier.settings.classes.popup}-discount-code-btn-container">
                                    <span class="${Courier.settings.classes.popup}-discount-code-value">${carouselItem.discountCode}</span>
                                    <span class="${Courier.settings.classes.popup}-discount-code-icon">${clipboardIcon}<span class="${Courier.settings.classes.popup}-discount-code-icon-text">${this.templateData.texts.clipboardButton}</span></span>
                                </span>
                            </button>
                        </div>`;
                    }
                }

                // const footerHtml = `
                // <div class="${Courier.settings.classes.popup}-carousel-item-footer">
                // eslint-disable-next-line max-len
                //      <p><a href="${carouselItem.link}" rel="noreferrer">${carouselItem.goToProduct ? carouselItem.goToProduct : Courier.settings.texts.goToProduct}</a></p>
                // </div>`;

                carouselItemsHtml += `
                    <li class="${Courier.settings.classes.popup}-carousel-item glide__slide">
                        <div class="${Courier.settings.classes.popup}-carousel-item-content">
                            <div class="${Courier.settings.classes.popup}-carousel-item-img">
                                 <div class="${Courier.settings.classes.popup}-carousel-item-img-wrapper">
                                    <a href="${carouselItem.link}" rel="noreferrer" aria-label="${carouselItem.goToProduct ? carouselItem.goToProduct : Courier.settings.texts.goToProduct}">
                                        <img class="${Courier.settings.classes.popup}-carousel-item-img-content" src="${carouselItem.img.src}" alt="${carouselItem.img.alt}" />
                                    </a>
                                </div>
                            </div>
                            <div class="${Courier.settings.classes.popup}-carousel-item-body">
                                <p class="${Courier.settings.classes.popup}-carousel-item-name tx-bold tx-wb">
                                    <a class="${Courier.settings.classes.popup}-carousel-item-name-link" href="${carouselItem.link}" rel="noreferrer" aria-label="${carouselItem.goToProduct ? carouselItem.goToProduct : Courier.settings.texts.goToProduct}">${carouselItem.title}</a>
                                </p>
                                ${priceHtml}
                            </div>
                            ${discountCodeHtml}
                            ${discountBadgeHtml}
                        </div>
                    </li>`;

                carouselBullets += `<button class="glide__bullet" data-glide-dir="=${carouselItemIndex}"></button>`;
            });

            html += `
                <div class="glide" reef-ignore key="msg_${elem.dataset.moduleId}_glide">
                    <div class="${Courier.settings.classes.popup}-carousel glide__track" data-glide-el="track">
                        <ul class="glide__slides" reef-ignore key="msg_${elem.dataset.moduleId}_glide_slides">
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
         * Render Popup Carousels.
         */
        render() {
            if (PopupCarousel.refs.carousels) {
                PopupCarousel.refs.carousels.forEach((carousel) => {
                    carousel.render();
                });
            }
        },
    };

    /**
     * Destroy existing instances before render
     * todo: Preserve instances on rerender
     */
    Events.on('app.beforeRender', (event) => {
        if (!event.target || !event.target.matches) {
            return;
        }

        if (event.target.matches('#courierPopup') && Components.Popup.templateData.state.active) {
            // remove existing reef instances
            if (PopupCarousel.refs.carousels) {
                PopupCarousel.destroyGlides();
                PopupCarousel.refs.carousels.forEach((carousel, index) => {
                    // Components.Popup.refs.popup.detach(carousel); // deprecated in v11
                    delete PopupCarousel.refs.carousels[index];
                });
            }
            PopupCarousel.refs.carousels = [];
        }
    });

    /**
     * Bind event listeners after App has been rendered
     */
    Events.on('app.rendered.popup', () => {
        if (Components.Popup.templateData.state.active) {
            // remove existing reef instances
            if (PopupCarousel.refs.carousels) {
                // PopupCarousel.destroyGlides();
                PopupCarousel.refs.carousels.forEach((carousel, index) => {
                    // Components.Popup.refs.popup.detach(carousel); // deprecated in v11
                    delete PopupCarousel.refs.carousels[index];
                });
            }
            PopupCarousel.refs.carousels = [];

            // find all templates
            const carousels = Components.App.refs.app.elem.querySelectorAll(`[data-template="${PopupCarousel.template}"]`);
            carousels.forEach((carousel) => {
                for (let i = 0; i < PopupCarousel.refs.carousels.length; i++) {
                    // skip if the carousel has been initialized as a reef instance already
                    if (carousel.isSameNode(PopupCarousel.refs.carousels[i].elem)) {
                        return;
                    }
                }
                // initialize new reef instances
                const elem = Components.App.refs.app.elem.querySelector(`[data-template="${PopupCarousel.template}"][data-module-id="${carousel.dataset.moduleId}"]`);
                PopupCarousel.refs.carousels.push(
                    Reef(elem, () => PopupCarousel.generateHtml(elem))
                );
            });
        }
    });

    /**
     * Initialize Glide for the current popup module
     * todo: Preserve instances on rerender
     */
    Events.on('app.rendered.popupModule', (event) => {
        if (!event.target || !event.target.matches) {
            return;
        }

        if (event.target.matches(`[data-template="${PopupCarousel.template}"]`)
            && Components.Popup.templateData.state.active) {
            PopupCarousel.initGlide(event.target);
        }
    });

    Events.on('app.click', (event) => {
        const carouselItem = event.target.closest(`.${Courier.settings.classes.popup}-carousel-item`);
        if (!carouselItem) {
            return;
        }
        const discountCodeBtn = carouselItem.querySelector(`button.${Courier.settings.classes.popup}-discount-code-btn`);
        if (event.target.isEqualNode(discountCodeBtn)
            || (elemContains(discountCodeBtn, event.target))) {
            const parentEl = carouselItem.querySelector(`.${Courier.settings.classes.popup}-discount-code`);
            copyCouponCodeToClipboard(
                Courier,
                parentEl,
                discountCodeBtn.dataset.courierDiscountCode
            );
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
