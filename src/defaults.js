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
        widget: '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 26.458 26.458"><path fill="#2a90ee" fill-rule="evenodd" d="M23.892 16.431c0 5.584-4.774 8.986-10.663 8.986S2.567 22.015 2.567 16.431c0-5.584 4.773-10.415 10.662-10.415 5.889 0 10.663 4.831 10.663 10.415z"/><g><path fill="#3b585e" d="M13.228 10.225c-1.743 0-4.224.13-5.54.78C5.651 12.01 5.14 13.91 5.14 15.77c.001 1.86.512 3.76 2.547 4.766 1.317.65 3.798.777 5.541.777 1.743 0 4.227-.127 5.543-.777 2.036-1.006 2.546-2.906 2.547-4.766 0-1.86-.511-3.76-2.547-4.765-1.316-.65-3.8-.78-5.543-.78z" /><path fill="#062c4e" d="M14.89 17.19a1.661 1.661 0 0 1-3.322 0c0-.918.744-.281 1.661-.281.918 0 1.662-.637 1.662.28z"/><circle cx="8.865" cy="13.942" r="1" fill="#8fcfde"/><circle cx="17.593" cy="13.942" r="1" fill="#8fcfde"/></g><path fill="#0b467e" fill-rule="evenodd" d="M25.039 13.072H23.43v5.971h1.608s1.42-.56 1.42-1.257V14.33c0-.696-1.42-1.257-1.42-1.257zm-23.619 0h1.607v5.971H1.42S0 18.483 0 17.786V14.33c0-.696 1.42-1.257 1.42-1.257Z"/><path fill="#727178" d="M13.23 3.252c-4.819.244-9.386 1.318-10.203 9.82H1.42C1.717 4.334 7.87 1.668 13.23 1.67m0 0c5.358-.002 11.511 2.664 11.809 11.402H23.43c-.816-8.502-5.384-9.576-10.202-9.82"/><path fill="none" stroke="#80aaba" stroke-linecap="round" stroke-width="1" d="m1.898 17.447 7.14 2.229h1.843"/></svg>',
        closeBtn: '<svg xmlns="http://www.w3.org/2000/svg" width="365" height="365" viewBox="0 0 365.717 365"><g fill="#f44336"><path d="M356.34 296.348L69.727 9.734c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.816c-12.5 12.504-12.5 32.77 0 45.25L295.988 356.68c12.504 12.5 32.77 12.5 45.25 0l15.082-15.082c12.524-12.48 12.524-32.75.02-45.25zm0 0"/><path d="M295.988 9.734L9.375 296.348c-12.5 12.5-12.5 32.77 0 45.25l15.082 15.082c12.504 12.5 32.77 12.5 45.25 0L356.34 70.086c12.504-12.5 12.504-32.766 0-45.246L341.258 9.758c-12.5-12.524-32.766-12.524-45.27-.024zm0 0"/></g></svg>',
        options: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><g fill="#000"><path d="M256 110.825c-43.241 0-78.42 35.179-78.42 78.42s35.179 78.42 78.42 78.42 78.42-35.179 78.42-78.42-35.179-78.42-78.42-78.42zm0 117.955c-21.802 0-39.534-17.739-39.534-39.534 0-21.802 17.732-39.534 39.534-39.534 21.796 0 39.534 17.732 39.534 39.534S277.796 228.78 256 228.78z"/><path d="M256 229.428c-10.739 0-19.443 8.704-19.443 19.443v230.724c0 10.739 8.704 19.443 19.443 19.443s19.443-8.704 19.443-19.443V248.871c0-10.739-8.704-19.443-19.443-19.443zM256 12.962c-10.739 0-19.443 8.704-19.443 19.443v97.863c0 10.739 8.704 19.443 19.443 19.443s19.443-8.704 19.443-19.443V32.405c0-10.739-8.704-19.443-19.443-19.443zM433.58 244.334c-43.235 0-78.42 35.179-78.42 78.42s35.185 78.42 78.42 78.42c43.241 0 78.42-35.179 78.42-78.42s-35.185-78.42-78.42-78.42zm0 117.961c-21.809 0-39.541-17.739-39.541-39.541s17.739-39.534 39.541-39.534 39.534 17.739 39.534 39.534c0 21.809-17.739 39.541-39.534 39.541z"/><path d="M433.58 362.289c-10.739 0-19.443 8.704-19.443 19.443v97.863c0 10.739 8.704 19.443 19.443 19.443 10.745 0 19.443-8.704 19.443-19.443v-97.863c0-10.739-8.704-19.443-19.443-19.443zM433.58 12.962c-10.739 0-19.443 8.704-19.443 19.443v230.724c0 10.739 8.704 19.443 19.443 19.443 10.745 0 19.443-8.704 19.443-19.443V32.405c0-10.739-8.704-19.443-19.443-19.443zM78.42 244.334c-43.241 0-78.42 35.179-78.42 78.42s35.179 78.42 78.42 78.42 78.42-35.179 78.42-78.42c.001-43.241-35.178-78.42-78.42-78.42zm0 117.961c-21.802 0-39.534-17.739-39.534-39.541S56.618 283.22 78.42 283.22s39.534 17.739 39.534 39.534c0 21.809-17.732 39.541-39.534 39.541z"/><path d="M78.42 362.289c-10.739 0-19.443 8.704-19.443 19.443v97.863c0 10.739 8.704 19.443 19.443 19.443s19.443-8.704 19.443-19.443v-97.863c0-10.739-8.704-19.443-19.443-19.443zM78.42 12.962c-10.739 0-19.443 8.704-19.443 19.443v230.724c0 10.739 8.704 19.443 19.443 19.443s19.443-8.704 19.443-19.443V32.405c0-10.739-8.704-19.443-19.443-19.443z"/></g></svg>',
        sendMsg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#2196f3" d="M14.077 16.79a.75.75 0 00-.448-.489l-3.857-1.5a.748.748 0 00-1.022.699v6.75a.751.751 0 001.354.444l3.857-5.25a.748.748 0 00.116-.654z"/><path fill="#64b5f6" d="M23.685.139a.75.75 0 00-.782-.054l-22.5 11.75a.752.752 0 00.104 1.375l19.75 6.75a.753.753 0 00.985-.599l2.75-18.5a.751.751 0 00-.307-.722z"/></svg>',
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
