/* eslint-disable import/no-unresolved */
import Reef from '@libs/reefjs/reef.es';
import Glide, {
    Anchors, Controls, Images, Swipe
} from '@libs/glidejs/glide.modular.esm';
import { addAffix, formatPercentage, roundNumber } from '@utils/string';
import { textTemplate } from '@utils/object';
import { elemContains, copyTextToClipboard } from '@utils/dom';
import { clipboard as clipboardIcon } from '@utils/images';

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
            glide.mount({
                Controls, Swipe, Images, Anchors
            });
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
            const carouselArrows = `
            <div class="glide__arrows" data-glide-el="controls">
                <button class="slider__arrow slider__arrow--prev glide__arrow glide__arrow--prev" data-glide-dir="<">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="m0 12 10.975 11 2.848-2.828-6.176-6.176H24v-3.992H7.646l6.176-6.176L10.975 1 0 12z"/></svg>
                </button>

                <button class="slider__arrow slider__arrow--next glide__arrow glide__arrow--next" data-glide-dir=">">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="m13.025 1-2.847 2.828 6.176 6.176H0v3.992h16.354l-6.176 6.176L13.025 23 24 12z"/></svg>
                </button>
            </div>`;
            let carouselBullets = '';
            moduleData.carousel.items.forEach((carouselItem, carouselItemIndex) => {
                let priceCurrentHtml = '';
                let priceOldHtml = '';
                if (carouselItem.price.discount && carouselItem.price.value) {
                    priceCurrentHtml = `
                    <div class="${Courier.settings.classes.popup}-carousel-item-price-wrapper">
                        <p class="${Courier.settings.classes.popup}-carousel-item-price-tag tx-wb">${addAffix(roundNumber(carouselItem.price.value * (1 - carouselItem.price.discount)), carouselItem.price.affix[0], carouselItem.price.affix[1])}</p>
                    </div>`;
                    priceOldHtml = `
                    <div class="${Courier.settings.classes.popup}-carousel-item-price-wrapper">
                        <p class="${Courier.settings.classes.popup}-carousel-item-price-old tx-wb">${addAffix(carouselItem.price.value, carouselItem.price.affix[0], carouselItem.price.affix[1])}</p>
                    </div>`;
                } else if (carouselItem.price.value) {
                    priceCurrentHtml = `
                    <div class="${Courier.settings.classes.popup}-carousel-item-price-wrapper">
                        <p class="${Courier.settings.classes.popup}-carousel-item-price-tag tx-wb">${addAffix(carouselItem.price.value, carouselItem.price.affix[0], carouselItem.price.affix[1])}</p>
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

                const discountCodeHtml = carouselItem.discountCode ? `
                <div class="${Courier.settings.classes.popup}-carousel-item-discount-code">
                    <button class="${Courier.settings.classes.popup}-carousel-item-discount-code-btn" title="${props.texts.clipboardtooltip}" data-courier-discount-code="${carouselItem.discountCode}">
                        <span class="${Courier.settings.classes.popup}-carousel-item-discount-code-btn-container">
                            <span class="${Courier.settings.classes.popup}-carousel-item-discount-code-value">${carouselItem.discountCode}</span>
                            <span class="${Courier.settings.classes.popup}-carousel-item-discount-code-icon">${clipboardIcon}</span>
                        </span>
                    </button>
                    <p class="${Courier.settings.classes.popup}-carousel-item-discount-code-copy-msg ${Courier.settings.classes.root}__fade-in">${props.texts.clipboardCopy}</p>
                </div>` : '';

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
                <div class="glide">
                    <div class="${Courier.settings.classes.popup}-carousel glide__track" data-glide-el="track">
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
                    if (carousel.matches(PopupCarousel.refs.carousels[i].elem)) return;
                    // if (carousel.isEqualNode(PopupCarousel.refs.carousels[i].elem)) return;
                }
                // initialize new reef instances
                PopupCarousel.refs.carousels.push(new Reef(`[data-template="${PopupCarousel.template}"][data-module-id="${carousel.dataset.moduleId}"]`, {
                    data: {
                        texts: {
                            clipboardtooltip: Courier.settings.textsParsed.clipboardtooltip,
                            clipboardCopy: Courier.settings.textsParsed.clipboardCopy,
                        },
                    },
                    template: (props, elem) => PopupCarousel.generateHtml(props, elem),
                    attachTo: Components.Popup.refs.popup
                }));
            });
        }

        if (event.target.matches(`[data-template="${PopupCarousel.template}"]`)
            && Components.Popup.refs.popup.data.state.active) {
            PopupCarousel.initGlide(event.target);
        }
    });

    Events.on('app.click', (event) => {
        const carouselItem = event.target.closest(`.${Courier.settings.classes.popup}-carousel-item`);
        if (!carouselItem) return;
        const discountCodeBtn = carouselItem.querySelector(`.${Courier.settings.classes.popup}-carousel-item-discount-code-btn`);
        if (event.target.isEqualNode(discountCodeBtn)
            || (elemContains(discountCodeBtn, event.target))) {
            copyTextToClipboard(discountCodeBtn.dataset.courierDiscountCode);
            const clipboardCopyMsg = carouselItem.querySelector(`.${Courier.settings.classes.popup}-carousel-item-discount-code-copy-msg`);
            clipboardCopyMsg.classList.add('active');
            setTimeout(() => {
                clipboardCopyMsg.classList.remove('active');
            }, 1500);
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
