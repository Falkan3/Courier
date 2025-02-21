/* eslint-disable import/no-unresolved */
import { component as Reef, signal } from '@libs/reefjs/reef.es';
import { addAffix, formatNumber } from '@utils/string';
import { isNumber } from '@utils/types.js';
import { getDateTime } from '@utils/time.js';

export default function (Courier, Components, Events) {
    const ChatOrderDetails = {
        refs: {
            orderDetails: []
        },
        template: 'orderDetails',
        templateData: signal({
            texts: {
                order: Courier.settings.textsParsed.order,
                orderProcessing: Courier.settings.textsParsed.orderProcessing,
                orderPacked: Courier.settings.textsParsed.orderPacked,
                orderInTransit: Courier.settings.textsParsed.orderInTransit,
                orderDelivered: Courier.settings.textsParsed.orderDelivered,
                orderTrackingNumber: Courier.settings.textsParsed.orderTrackingNumber,
                totalPrice: Courier.settings.textsParsed.totalPrice,
                shippingDetails: Courier.settings.textsParsed.shippingDetails,
            }
        }, 'chat-order-details'),
        scrollToBottom: false,

        /**
         * Construct a ChatOrderDetails instance.
         */
        mount() {
        },

        initialize() {
        },

        generateHtml(elem) {
            const message = Components.Chat.templateData.messages[elem.dataset.courierMessageId];

            let html = '';

            let orderStatusHtml = '';
            if (isNumber(message.orderDetails.orderStatus)) {
                orderStatusHtml += `
                    <div class="${Courier.settings.classes.chat}-order-details-chart">
                        <div class="${Courier.settings.classes.chat}-order-details-chart-item ${message.orderDetails.orderStatus === 0 ? `${Courier.settings.classes.chat}-order-details-chart-item--active` : ''} ${message.orderDetails.orderStatus > 0 ? `${Courier.settings.classes.chat}-order-details-chart-item--complete` : ''}">
                            <p class="${Courier.settings.classes.chat}-order-details-chart-item-title">${this.templateData.texts.orderProcessing}</p>
                        </div>
                        <div class="${Courier.settings.classes.chat}-order-details-chart-item ${message.orderDetails.orderStatus === 1 ? `${Courier.settings.classes.chat}-order-details-chart-item--active` : ''} ${message.orderDetails.orderStatus > 1 ? `${Courier.settings.classes.chat}-order-details-chart-item--complete` : ''}">
                            <p class="${Courier.settings.classes.chat}-order-details-chart-item-title">${this.templateData.texts.orderPacked}</p>
                        </div>
                        <div class="${Courier.settings.classes.chat}-order-details-chart-item ${message.orderDetails.orderStatus === 2 ? `${Courier.settings.classes.chat}-order-details-chart-item--active` : ''} ${message.orderDetails.orderStatus > 2 ? `${Courier.settings.classes.chat}-order-details-chart-item--complete` : ''}">
                            <p class="${Courier.settings.classes.chat}-order-details-chart-item-title">${this.templateData.texts.orderInTransit}</p>
                        </div>
                        <div class="${Courier.settings.classes.chat}-order-details-chart-item ${message.orderDetails.orderStatus >= 3 ? `${Courier.settings.classes.chat}-order-details-chart-item--complete` : ''}">
                            <p class="${Courier.settings.classes.chat}-order-details-chart-item-title">${this.templateData.texts.orderDelivered} ${message.orderDetails.deliveredAt ? getDateTime(message.orderDetails.deliveredAt) : ''}</p>
                        </div>
                    </div>`;
            } else {
                orderStatusHtml += `
                    <p class="${Courier.settings.classes.chat}-order-details-order-status">${message.orderDetails.orderStatus}</p>`;
            }

            const totalPrice = addAffix(
                formatNumber(message.orderDetails.total.value, { decimalPlaces: 2 }),
                message.orderDetails.total.affix[0],
                message.orderDetails.total.affix[1]
            );

            let productsHtml = '';
            message.orderDetails.products.forEach((product) => {
                const price = addAffix(
                    formatNumber(product.price.value, { decimalPlaces: 2 }),
                    product.price.affix[0],
                    product.price.affix[1]
                );

                productsHtml += `
                    <div class="${Courier.settings.classes.chat}-order-details-products-item">
                        <div class="${Courier.settings.classes.chat}-order-details-products-item-img-wrapper">
                            <img class="${Courier.settings.classes.chat}-order-details-products-item-img" src="${product.img.src}" width="64" height="64" alt="${product.img.alt ?? ''}" />
                        </div>
                        <p class="${Courier.settings.classes.chat}-order-details-products-item-title" title="${product.title}">${product.title}</p>
                        <p class="${Courier.settings.classes.chat}-order-details-products-item-quantity">${product.quantity} x ${price}</p>
                    </div>`;
            });

            const street = [message.orderDetails.address.street, message.orderDetails.address.streetNo].join(' ');
            const streetApt = [street, message.orderDetails.address.aptNo ?? ''].join('/');

            html += `
                <div class="${Courier.settings.classes.chat}-order-details">
                    <p class="${Courier.settings.classes.chat}-order-details-title">${this.templateData.texts.order} #${message.orderDetails.orderNumber}</p>

                    ${orderStatusHtml}

                    <div class="${Courier.settings.classes.chat}-order-details-products">
                        ${productsHtml}
                    </div>

                    <div class="${Courier.settings.classes.chat}-order-details-total">
                        <p class="${Courier.settings.classes.chat}-order-details-total-text">
                            <span class="${Courier.settings.classes.chat}-order-details-total-text-label">${this.templateData.texts.totalPrice}</span>
                            <span class="${Courier.settings.classes.chat}-order-details-total-text-value">${totalPrice}</span>
                        </p>
                    </div>

                    <div class="${Courier.settings.classes.chat}-order-details-shipping-details">
                        <p class="${Courier.settings.classes.chat}-order-details-shipping-details-label">${this.templateData.texts.shippingDetails}</p>
                        <p class="${Courier.settings.classes.chat}-order-details-shipping-details-data">
                            <span class="${Courier.settings.classes.chat}-order-details-shipping-details-data-line">${[message.orderDetails.address.firstName, message.orderDetails.address.lastName].join(' ')}</span>
                            <span class="${Courier.settings.classes.chat}-order-details-shipping-details-data-line">${streetApt}</span>
                            <span class="${Courier.settings.classes.chat}-order-details-shipping-details-data-line">${[message.orderDetails.address.city, message.orderDetails.address.postCode].join(' ')}</span>
                        </p>
                         <p class="${Courier.settings.classes.chat}-order-details-shipping-details-data">
                            <span class="${Courier.settings.classes.chat}-order-details-shipping-details-data-line">${message.orderDetails.shipping.companyName}</span>
                            <span class="${Courier.settings.classes.chat}-order-details-shipping-details-data-line">${this.templateData.texts.orderTrackingNumber}: <a href="${message.orderDetails.shipping.trackingUrl}" rel="noreferrer noopener">${message.orderDetails.shipping.trackingNo}</a></span>
                        </p>
                    </div>
                </div>`;

            return html;
        },

        /**
         * Render Chat Carousels.
         */
        render() {
            if (ChatOrderDetails.refs.orderDetails) {
                ChatOrderDetails.refs.orderDetails.forEach((orderDetails) => {
                    orderDetails.render();
                });
            }
        },
    };

    /**
     * Initialize order details after App has been rendered
     */
    Events.on('app.rendered.chat', () => {
        if (Components.Chat.templateData.state.active) {
            // find all templates
            const messages = Components.App.refs.app.elem.querySelectorAll(`[data-template="${ChatOrderDetails.template}"]`);
            messages.forEach((message) => {
                for (let i = 0; i < ChatOrderDetails.refs.orderDetails.length; i++) {
                    // skip if the order details has been initialized as a reef instance already
                    if (message.isSameNode(ChatOrderDetails.refs.orderDetails[i].elem)) {
                        return;
                    }
                }
                // initialize new reef instances
                const elem = Components.App.refs.app.elem.querySelector(`[data-template="${ChatOrderDetails.template}"][data-courier-message-id="${message.dataset.courierMessageId}"]`);
                ChatOrderDetails.refs.orderDetails.push(
                    Reef(elem, () => ChatOrderDetails.generateHtml(elem))
                );
            });
        }
    });

    Events.on('app.rendered.chatMessage', (event) => {
        if (!event.target || !event.target.matches) {
            return;
        }

        if (event.target.matches(`[data-template="${ChatOrderDetails.template}"]`)
            && Components.Chat.templateData.state.active) {
            if (ChatOrderDetails.scrollToBottom) {
                Components.Chat.refs.workArea.scrollTop += event.target.clientHeight;
            }
        }
    });

    Events.on('chat.scrollToBottom', (state) => {
        ChatOrderDetails.scrollToBottom = state;
    });

    Events.on('app.click', (event) => {
        //
    });

    Events.on(['destroy:after'], () => {
        ChatOrderDetails.refs = {
            orderDetails: []
        };
    });

    return ChatOrderDetails;
}
