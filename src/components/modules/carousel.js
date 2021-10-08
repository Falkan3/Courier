/* eslint-disable import/no-unresolved */

export default function (Courier, Components, Events) {
    const Carousel = {
        /**
         * Construct a Carousel instance.
         */
        mount() {

        },

        generateHtml() {
            return `
            <div class="${Courier.settings.classes.chat}">

            </div>`;
        }
    };

    return Carousel;
}
