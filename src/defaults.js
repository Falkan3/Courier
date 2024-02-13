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
            src: 'https://uilogos.co/img/logomark/circle.png',
            alt: 'Company logo',
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
        widget: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 511.999 511.999"><circle cx="255.999" cy="255.999" r="255.999" fill="#4d4949"/><path fill="#ffcda8" d="M456.234 415.504c-20.522 25.736-45.902 47.428-74.762 63.686a254.136 254.136 0 01-60.155 24.398h-10.7a132.54 132.54 0 01-61.252-14.994l-111.731-58.263-24.607-13.531-26.822-14.754 135.314-6.269c15.287 0 11.494-37.491 11.494-52.767l73.153-126.871 90.885 90.885c12.413 12.413 22.12 27.052 28.714 42.977s10.083 33.134 10.083 50.698l20.386 14.805z"/><g fill="#eab796"><path d="M381.472 479.19a254.136 254.136 0 01-60.155 24.398h-10.7a132.54 132.54 0 01-61.252-14.994l-111.731-58.263-24.607-13.531 156.682 11.818s30.312 50.573 111.741 50.573l.022-.001zM86.727 165.064H71.429a36.59 36.59 0 00-2.258-.084 31.227 31.227 0 00-22.158 9.188c-12.238 12.237-12.238 32.077 0 44.315l17.246 17.258a31.151 31.151 0 00-18.459 8.947c-12.238 12.238-12.238 32.09 0 44.328l9.055 9.055a30.944 30.944 0 008.768 6.173c.208-.147.425-.274.636-.414v.689c-.211-.094-.427-.176-.636-.275a29.508 29.508 0 00-4.335 3.591c-12.238 12.249-12.238 32.09 0 44.328l9.055 9.056a32.514 32.514 0 003.087 2.69v-24.034h15.298l-.001-174.811z"/></g><path fill="#ffde51" d="M278.5 0H99.102C83.815 0 71.423 12.382 71.423 27.669v373.289c0 15.276 12.392 27.658 27.679 27.658h170.611c-14.838-18.38 9.885-42.559 16.593-64.136l5.183-62.621 3.605-43.499 11.076 11.086V27.669C306.169 12.382 293.787 0 278.5 0z"/><path fill="#eab796" d="M347.529 294.199l-27.44-27.44v-36.697l-13.919-13.92v53.299l33.058 33.058c3.698 3.697 10.02 1.079 10.02-4.15a5.874 5.874 0 00-1.719-4.15z"/><path fill="#4d4949" d="M90.819 162.619v-38.605c0-25.026 16.507-34.346 38.073-34.346 21.299 0 37.806 9.318 37.806 34.346v38.605c0 25.027-16.507 34.346-37.806 34.346-21.566 0-38.073-9.318-38.073-34.346zm53.249-38.606c0-9.851-5.858-14.377-15.176-14.377s-14.91 4.525-14.91 14.377v38.605c0 9.851 5.591 14.378 14.91 14.378s15.176-4.526 15.176-14.378v-38.605zM249.5 90.999c0 1.598-.265 3.195-1.064 4.793l-95.848 193.293c-1.598 3.727-5.858 5.858-10.383 5.858-7.455 0-12.514-6.124-12.514-11.714 0-1.598.533-3.195 1.066-4.526L226.604 84.61c1.864-3.727 5.591-5.59 9.585-5.59 6.123-.001 13.311 4.791 13.311 11.979zm-38.605 159.747v-38.605c0-25.027 16.507-34.346 38.073-34.346 21.299 0 37.806 9.318 37.806 34.346v38.605c0 25.294-16.508 34.346-37.806 34.346-21.565-.001-38.073-9.053-38.073-34.346zm53.249-38.605c0-9.851-5.857-14.378-15.175-14.378-9.319 0-14.91 4.525-14.91 14.378v38.605c0 9.851 5.59 14.378 14.91 14.378 9.318 0 15.175-4.525 15.175-14.378v-38.605z"/><path fill="#fff" d="M241.886 216.36v3.009h-13.537v-1.633a34.545 34.545 0 00-14.307 8.627 34.791 34.791 0 00-4.568 5.628v3.659h-2.076a34.657 34.657 0 00-3.515 15.237c0 8.875 3.387 17.751 10.16 24.525l39.944 39.943c10.484 10.484 13.559 26.482 7.17 39.861a68.276 68.276 0 00-3.627 9.271h-30.649v.001h30.646c-6.705 21.57-2.654 45.749 12.181 64.128h5.878c16.812 0 30.456-13.566 30.582-30.348V269.443l-11.08-11.077-20.777-20.779v11.875h-13.537v-13.537h11.875l-9.561-9.561a34.492 34.492 0 00-21.202-10.004"/><path fill="#eac420" d="M286.306 364.481c-6.708 21.577-31.43 45.756-16.593 64.136h-18.808c-14.838-18.39-18.892-42.559-12.183-64.136a68.358 68.358 0 013.626-9.268c6.395-13.375 3.312-29.372-7.168-39.863l-39.946-39.936a34.6 34.6 0 01-10.156-24.524c0-8.892 3.385-17.753 10.156-24.524 13.552-13.552 35.516-13.552 49.047 0l32.005 32.005 11.076 11.065 4.127 32.423-5.183 62.622z"/><g fill="#333030"><path d="M276.285 258.371l-12.142-12.142v4.514c0 9.853-5.851 14.378-15.172 14.378s-14.911-4.524-14.911-14.378v-31.462a34.722 34.722 0 00-23.165-1.923v33.384c0 25.297 16.509 34.346 38.076 34.346 16.206 0 29.644-5.245 35.14-18.902l-7.826-7.815z"/><path d="M284.111 266.187c-5.496 13.657-18.934 18.902-35.14 18.902-21.567 0-38.076-9.049-38.076-34.346v-33.384a34.722 34.722 0 0123.165 1.923v31.462c0 9.853 5.59 14.378 14.911 14.378 9.32 0 15.172-4.524 15.172-14.378v-4.514l12.142 12.142 7.826 7.815z"/></g><path fill="#ffcda8" d="M295.096 258.368l-32.005-32.006c-13.535-13.546-35.5-13.546-49.047 0-6.773 6.774-10.161 15.637-10.161 24.524 0 8.875 3.387 17.75 10.161 24.524l39.944 39.944c10.484 10.484 13.559 26.481 7.17 39.86a68.407 68.407 0 00-3.627 9.271c-6.713 21.57-2.654 45.745 12.178 64.132l13.459 14.703c15.288 0 40.751-19.205 40.751-34.482L306.17 269.442l-11.074-11.074z"/><path fill="#f2e5e5" d="M255.284 236.83c-8.17-8.17-21.416-8.17-29.586 0-8.17 8.17-8.17 21.416 0 29.586 8.17 8.17 15.225 1.978 23.395-6.192 8.169-8.169 14.361-15.224 6.191-23.394z"/></svg>',
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
        online: true,
        showMessageBox: false,
        messageBoxEnabled: true,
        customSendMessage: false,
        showTimestamp: true,
        carouselPeek: 50,
        showDiscountPercentage: true,
        clipboardCopyMsgDuration: 2500
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
        hideWidget: {
            nameSuffix: '',
            active: true,
            duration: 24
        }
    },
};
