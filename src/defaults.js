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
        dummyRoot: 'courierDummyRoot',
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
        popup: 'courier__popup',
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
        // popup
        popupContent: '',
        // carousel
        clipboardButton: 'Copy',
        clipboardTooltip: 'Click to copy',
        clipboardCopy: 'Copied to clipboard',
        clickToApplyDiscount: 'Click to apply discount code',
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
            url: 'https://company.com',
        },
        logo: {
            src: null,
            alt: 'Logo',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 66.146 66.146"><path fill="#0085fe" fill-rule="evenodd" d="M66.146 33.073a33.073 33.073 0 0 1-33.073 33.073A33.073 33.073 0 0 1 0 33.073 33.073 33.073 0 0 1 33.073 0a33.073 33.073 0 0 1 33.073 33.073Z"/><path fill="#fff" d="M12.84 46.514c1.472-.024 2.951.048 4.418-.038.747-.395.85-1.356 1.256-2.04.387-.957.931-2.127 2.158-2.07 3.97.012 7.94-.027 11.91.019 1.431.2 1.672 1.772 2.249 2.833.247.661.64 1.473 1.495 1.296 1.343-.025 2.695.049 4.033-.038.393-.5-.285-1.124-.423-1.667l-12.83-27.97c-.631-.952-1.434.115-1.604.822l-13 28.345a.333.333 0 0 0 .339.508zm9.314-9.99c1.333-2.838 2.615-5.7 3.98-8.52.67-.814 1.033.63 1.3 1.119 1.155 2.55 2.365 5.077 3.484 7.642.244 1.065-1.087.843-1.75.859-2.181-.013-4.364.025-6.544-.02-.557-.034-.722-.653-.47-1.08zM45.437 17.43v28.533c.049.768.935.503 1.453.55 1.1-.023 2.21.05 3.306-.038.523-.32.254-1.019.321-1.534v-27.51c-.048-.767-.934-.503-1.452-.55-1.101.023-2.21-.05-3.306.038-.212.07-.332.3-.322.512z"/></svg>'
        },
    },

    /**
     * Collection of variables representing the identity of the plugin's maker.
     *
     * @type {Object}
     */
    poweredBy: {
        show: true,
        text: 'Powered by',
        img: {
            src: 'https://panel.trafficwatchdog.pl/svg/logo.svg',
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
        widget: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="200" height="200" fill="#fff" stroke="#fff" viewBox="0 0 512.004 512.004"><path d="M256.004 21.335c-141.163 0-256 95.701-256 213.333 0 41.643 14.165 79.381 43.285 115.157.789 16.811-.192 67.584-37.035 104.427-6.976 6.997-8.277 17.856-3.093 26.261 3.968 6.443 10.923 10.155 18.176 10.155 2.219 0 4.48-.341 6.677-1.067 6.4-2.112 13.824-4.331 21.952-6.763 34.304-10.24 84.331-25.173 123.669-53.099C199.747 440.79 218.158 448 256.003 448c141.163 0 256-95.701 256-213.333S397.167 21.335 256.004 21.335z"/></svg>',
        closeBtn: '<svg xmlns="http://www.w3.org/2000/svg" width="365" height="365" viewBox="0 0 365.717 365"><g fill="#f44336"><path d="M356.34 296.348L69.727 9.734c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.816c-12.5 12.504-12.5 32.77 0 45.25L295.988 356.68c12.504 12.5 32.77 12.5 45.25 0l15.082-15.082c12.524-12.48 12.524-32.75.02-45.25zm0 0"/><path d="M295.988 9.734L9.375 296.348c-12.5 12.5-12.5 32.77 0 45.25l15.082 15.082c12.504 12.5 32.77 12.5 45.25 0L356.34 70.086c12.504-12.5 12.504-32.766 0-45.246L341.258 9.758c-12.5-12.524-32.766-12.524-45.27-.024zm0 0"/></g></svg>',
        options: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><g fill="#000"><path d="M256 110.825c-43.241 0-78.42 35.179-78.42 78.42s35.179 78.42 78.42 78.42 78.42-35.179 78.42-78.42-35.179-78.42-78.42-78.42zm0 117.955c-21.802 0-39.534-17.739-39.534-39.534 0-21.802 17.732-39.534 39.534-39.534 21.796 0 39.534 17.732 39.534 39.534S277.796 228.78 256 228.78z"/><path d="M256 229.428c-10.739 0-19.443 8.704-19.443 19.443v230.724c0 10.739 8.704 19.443 19.443 19.443s19.443-8.704 19.443-19.443V248.871c0-10.739-8.704-19.443-19.443-19.443zM256 12.962c-10.739 0-19.443 8.704-19.443 19.443v97.863c0 10.739 8.704 19.443 19.443 19.443s19.443-8.704 19.443-19.443V32.405c0-10.739-8.704-19.443-19.443-19.443zM433.58 244.334c-43.235 0-78.42 35.179-78.42 78.42s35.185 78.42 78.42 78.42c43.241 0 78.42-35.179 78.42-78.42s-35.185-78.42-78.42-78.42zm0 117.961c-21.809 0-39.541-17.739-39.541-39.541s17.739-39.534 39.541-39.534 39.534 17.739 39.534 39.534c0 21.809-17.739 39.541-39.534 39.541z"/><path d="M433.58 362.289c-10.739 0-19.443 8.704-19.443 19.443v97.863c0 10.739 8.704 19.443 19.443 19.443 10.745 0 19.443-8.704 19.443-19.443v-97.863c0-10.739-8.704-19.443-19.443-19.443zM433.58 12.962c-10.739 0-19.443 8.704-19.443 19.443v230.724c0 10.739 8.704 19.443 19.443 19.443 10.745 0 19.443-8.704 19.443-19.443V32.405c0-10.739-8.704-19.443-19.443-19.443zM78.42 244.334c-43.241 0-78.42 35.179-78.42 78.42s35.179 78.42 78.42 78.42 78.42-35.179 78.42-78.42c.001-43.241-35.178-78.42-78.42-78.42zm0 117.961c-21.802 0-39.534-17.739-39.534-39.541S56.618 283.22 78.42 283.22s39.534 17.739 39.534 39.534c0 21.809-17.732 39.541-39.534 39.541z"/><path d="M78.42 362.289c-10.739 0-19.443 8.704-19.443 19.443v97.863c0 10.739 8.704 19.443 19.443 19.443s19.443-8.704 19.443-19.443v-97.863c0-10.739-8.704-19.443-19.443-19.443zM78.42 12.962c-10.739 0-19.443 8.704-19.443 19.443v230.724c0 10.739 8.704 19.443 19.443 19.443s19.443-8.704 19.443-19.443V32.405c0-10.739-8.704-19.443-19.443-19.443z"/></g></svg>',
        sendMsg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 17V7m0 0-4 4m4-4 4 4"/></svg>',
        info: '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" class="icon" viewBox="0 0 1024 1024"><path fill="#2196F3" d="M64 512a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"/><path fill="#FFF" d="M469.333 469.333h85.334V704h-85.334zM458.667 352a53.333 53.333 0 1 0 106.666 0 53.333 53.333 0 1 0-106.666 0Z"/></svg>',
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
    },
};
