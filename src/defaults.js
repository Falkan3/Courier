export default {
    /**
     * Collection of options applied at specified media breakpoints.
     */
    breakpoints: {},

    /**
     * Collection of internally used HTML ids.
     *
     * @type {Object}
     */
    ids: {
        dummyRootContainer: 'courierDummyRootContainer',
        dummyRoot: 'courierDummyRoot'
    },

    /**
     * Collection of internally used HTML classes.
     *
     * @type {Object}
     */
    classes: {
        root: 'courier',
        widget: 'courier__widget',
        chat: 'courier__chat',
        popup: 'courier__popup'
    },

    /**
     * Collection of modifier classes to be applied to the specified elements
     * For example:
     * {root: ['your-modifier-class']}
     *
     * @type {Object}
     */
    modifierClasses: {
        root: []
    },

    /**
     * Create a shadow DOM to separate website CSS from package CSS.
     * Requires custom CSS injection to style shadow root nested elements.
     *
     * @type {boolean}
     */
    useShadowRoot: false,

    /**
     * Collection of text used in components.
     *
     * @type {Object}
     */
    texts: {
        widgetGreeting: 'Hello!',
        widgetGreetingTitle: 'AI helper',
        widgetName: '',
        openWidget: 'Open widget',
        hideWidget: 'Hide widget',
        unreadMessages: 'Unread messages',
        // chat
        close: 'Close',
        options: 'Options',
        chatTitle: 'Chat with us!',
        messagePlaceholder: 'Type something...',
        typing: 'User is typing...',
        sendMessage: 'Send message',
        goToProduct: 'Go to product',
        order: 'Order',
        orderProcessing: 'Processing',
        orderPacked: 'Packed',
        orderInTransit: 'In transit',
        orderDelivered: 'Delivered',
        orderTrackingNumber: 'Tracking',
        totalPrice: 'Total',
        shippingDetails: 'Shipping details',
        tracking: 'Tracking',
        drawerInfo: {
            heading: 'AI chat bot legal note',
            content: `
                <p>Please note that any offers or promotions provided by this chatbot are subject to change and may not be available in all stores. It is recommended to verify the specific terms and conditions of any offer with a store associate. Offers provided by this chatbot are not legally binding.</p>
            `
        },
        drawerTabContent: {},
        privacy: {
            text: 'GDPR and privacy',
            url: null
        },
        // popup
        popupContent: '',
        // carousel
        clipboardButton: 'Copy',
        clipboardTooltip: 'Click to copy',
        clipboardCopy: 'Copied to clipboard',
        clickToApplyDiscount: 'Click to apply discount code'
    },

    /**
     * Collection of variables which will replace placeholders in text.
     *
     * @type {Object}
     */
    textVars: {},

    /**
     * Collection of variables representing the identity of the service owner.
     *
     * @type {Object}
     */
    identity: {
        show: true,
        name: 'Company',
        website: {
            name: 'company.com',
            url: null // 'https://company.com'
        },
        logo: {
            src: null,
            alt: 'Logo',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 66.146 66.146"><path fill="#0085fe" fill-rule="evenodd" d="M66.146 33.073a33.073 33.073 0 0 1-33.073 33.073A33.073 33.073 0 0 1 0 33.073 33.073 33.073 0 0 1 33.073 0a33.073 33.073 0 0 1 33.073 33.073Z"/><path fill="#fff" d="M12.84 46.514c1.472-.024 2.951.048 4.418-.038.747-.395.85-1.356 1.256-2.04.387-.957.931-2.127 2.158-2.07 3.97.012 7.94-.027 11.91.019 1.431.2 1.672 1.772 2.249 2.833.247.661.64 1.473 1.495 1.296 1.343-.025 2.695.049 4.033-.038.393-.5-.285-1.124-.423-1.667l-12.83-27.97c-.631-.952-1.434.115-1.604.822l-13 28.345a.333.333 0 0 0 .339.508zm9.314-9.99c1.333-2.838 2.615-5.7 3.98-8.52.67-.814 1.033.63 1.3 1.119 1.155 2.55 2.365 5.077 3.484 7.642.244 1.065-1.087.843-1.75.859-2.181-.013-4.364.025-6.544-.02-.557-.034-.722-.653-.47-1.08zM45.437 17.43v28.533c.049.768.935.503 1.453.55 1.1-.023 2.21.05 3.306-.038.523-.32.254-1.019.321-1.534v-27.51c-.048-.767-.934-.503-1.452-.55-1.101.023-2.21-.05-3.306.038-.212.07-.332.3-.322.512z"/></svg>'
        },
        logoMini: {
            src: null,
            alt: 'Logo',
            svg: null
        }
    },

    /**
     * Collection of variables representing the identity of the plugin's maker.
     *
     * @type {Object}
     */
    poweredBy: {
        show: true,
        text: 'Powered by TrafficWatchdog',
        img: {
            src: null, // https://panel.trafficwatchdog.pl/svg/logo.svg',
            alt: 'TrafficWatchdog'
        },
        url: 'https://trafficwatchdog.pl/'
    },

    /**
     * Collection of images and vector graphics.
     *
     * @type {Object}
     */
    images: {
        widget: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M9.8203 0C4.4257 0 0 4.4277 0 9.8223l1.7e-7 31.511c3e-8 5.3946 4.4258 9.8203 9.8203 9.8203h22.207l-.17969-10.353-21.848.020371v-30.822h44l.000001 30.822h-12.02l-9.9531 10.332-.027344 12.846 11.93-12.846h10.25c5.3946 0 9.8203-4.4258 9.8203-9.8203v-31.511c0-5.3946-4.4258-9.8223-9.8203-9.8223z"/></svg>',
        closeBtn: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.32258" d="M22.83871 1.16129 1.16129 22.83871m.0000155-21.67742L22.83871 22.83871"/></svg>',
        options: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><circle cx="12" cy="2.0000005" r="2"/><circle cx="12" cy="22" r="2"/><circle cx="12" cy="12" r="2"/></g></svg>',
        sendMsg: '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 12 12"><path stroke="#212121" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 11V1m0 0 4 4M6 1 2 5"/></svg>',
        info: '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" class="icon" viewBox="0 0 1024 1024"><path fill="#2196F3" d="M64 512a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"/><path fill="#FFF" d="M469.333 469.333h85.334V704h-85.334zM458.667 352a53.333 53.333 0 1 0 106.666 0 53.333 53.333 0 1 0-106.666 0Z"/></svg>'
    },

    /**
     * Collection of messages and topics to be held by the chat bot.
     *
     * @type {Object}
     */
    messages: {},

    /**
     * Collection used to supply data to optional module instances.
     *
     * @type {Object}
     */
    moduleData: {},

    /**
     * Settings that are responsible for the state of elements.
     *
     * @type {Object}
     */
    state: {
        widgetActiveAtStart: true,
        showHideBtn: true,
        hideBtnActiveAtStart: false,
        widgetMinimalizedAtStart: false,
        showWidgetUnreadMessages: true,
        online: true,
        showOptionsButton: false,
        showMessageBox: false,
        messageBoxEnabled: true,
        customSendMessage: false,
        showTimestamp: true,
        carouselPeek: 50,
        showDiscountPercentage: true,
        clipboardCopyMsgDuration: 2500,
        maxMessageLength: 300,
        widgetStyle: 'simple' // simple, advanced
    },

    /**
     * Collection of cookie variables.
     * All durations are in hours.
     *
     * @type {Object}
     */
    cookies: {
        saveConversation: {
            nameSuffix: '',
            active: true,
            duration: 24
        },
        minimalizeWidget: {
            nameSuffix: '',
            active: true,
            duration: 24
        },
        hideWidget: {
            nameSuffix: '',
            active: true,
            duration: 24
        },
        unreadMessages: {
            nameSuffix: '',
            active: true,
            duration: 24
        }
    }
};
