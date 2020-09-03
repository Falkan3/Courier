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
    },

    /**
     * Collection of modifier classes to be applied to the specified elements
     * For example:
     * {root: 'your-modifier-class'}
     *
     * @type {Object}
     */
    modifierClasses: {},

    /**
     * Collection of text used in components.
     *
     * @type {Object}
     */
    texts: {},

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
        name: 'Name',
        website: {
            name: 'TrafficWatchdog',
            url: 'https://trafficwatchdog.pl',
        },
        logo: {
            src: 'https://panel.trafficwatchdog.pl/svg/logo_cropped.svg',
            alt: 'TrafficWatchdog logo',
        },
    },

    /**
     * Collection of images and vector graphics.
     *
     * @type {Object}
     */
    images: {
        chatBubbles: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.8 512.8"><path d="M268.8 47.2H15.2C6.4 47.2 0 53.6 0 62.4v174.4c0 8 6.4 15.2 15.2 15.2h36v66.4l84-66.4h134.4c8 0 15.2-6.4 15.2-15.2V62.4c-1.6-8.8-8-15.2-16-15.2z"/><g fill="#fff"><circle cx="211.2" cy="148.8" r="21.6"/><circle cx="141.6" cy="148.8" r="21.6"/><circle cx="72" cy="148.8" r="21.6"/></g><path d="M496.8 195.2H243.2c-8 0-15.2 6.4-15.2 15.2V384c0 8 6.4 15.2 15.2 15.2h134.4l84 66.4v-66.4h36c8 0 15.2-6.4 15.2-15.2V209.6c-.8-8-7.2-14.4-16-14.4z" fill="#25b6d2"/><g fill="#fff"><circle cx="376.8" cy="296.8" r="21.6"/><circle cx="300.8" cy="296.8" r="21.6"/><circle cx="440" cy="296.8" r="21.6"/></g></svg>',
        closeBtn: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 365.717 365"><g fill="#f44336"><path d="M356.34 296.348L69.727 9.734c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.816c-12.5 12.504-12.5 32.77 0 45.25L295.988 356.68c12.504 12.5 32.77 12.5 45.25 0l15.082-15.082c12.524-12.48 12.524-32.75.02-45.25zm0 0"/><path d="M295.988 9.734L9.375 296.348c-12.5 12.5-12.5 32.77 0 45.25l15.082 15.082c12.504 12.5 32.77 12.5 45.25 0L356.34 70.086c12.504-12.5 12.504-32.766 0-45.246L341.258 9.758c-12.5-12.524-32.766-12.524-45.27-.024zm0 0"/></g></svg>',
        options: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g fill="#000"><path d="M256 110.825c-43.241 0-78.42 35.179-78.42 78.42s35.179 78.42 78.42 78.42 78.42-35.179 78.42-78.42-35.179-78.42-78.42-78.42zm0 117.955c-21.802 0-39.534-17.739-39.534-39.534 0-21.802 17.732-39.534 39.534-39.534 21.796 0 39.534 17.732 39.534 39.534S277.796 228.78 256 228.78z"/><path d="M256 229.428c-10.739 0-19.443 8.704-19.443 19.443v230.724c0 10.739 8.704 19.443 19.443 19.443s19.443-8.704 19.443-19.443V248.871c0-10.739-8.704-19.443-19.443-19.443zM256 12.962c-10.739 0-19.443 8.704-19.443 19.443v97.863c0 10.739 8.704 19.443 19.443 19.443s19.443-8.704 19.443-19.443V32.405c0-10.739-8.704-19.443-19.443-19.443zM433.58 244.334c-43.235 0-78.42 35.179-78.42 78.42s35.185 78.42 78.42 78.42c43.241 0 78.42-35.179 78.42-78.42s-35.185-78.42-78.42-78.42zm0 117.961c-21.809 0-39.541-17.739-39.541-39.541s17.739-39.534 39.541-39.534 39.534 17.739 39.534 39.534c0 21.809-17.739 39.541-39.534 39.541z"/><path d="M433.58 362.289c-10.739 0-19.443 8.704-19.443 19.443v97.863c0 10.739 8.704 19.443 19.443 19.443 10.745 0 19.443-8.704 19.443-19.443v-97.863c0-10.739-8.704-19.443-19.443-19.443zM433.58 12.962c-10.739 0-19.443 8.704-19.443 19.443v230.724c0 10.739 8.704 19.443 19.443 19.443 10.745 0 19.443-8.704 19.443-19.443V32.405c0-10.739-8.704-19.443-19.443-19.443zM78.42 244.334c-43.241 0-78.42 35.179-78.42 78.42s35.179 78.42 78.42 78.42 78.42-35.179 78.42-78.42c.001-43.241-35.178-78.42-78.42-78.42zm0 117.961c-21.802 0-39.534-17.739-39.534-39.541S56.618 283.22 78.42 283.22s39.534 17.739 39.534 39.534c0 21.809-17.732 39.541-39.534 39.541z"/><path d="M78.42 362.289c-10.739 0-19.443 8.704-19.443 19.443v97.863c0 10.739 8.704 19.443 19.443 19.443s19.443-8.704 19.443-19.443v-97.863c0-10.739-8.704-19.443-19.443-19.443zM78.42 12.962c-10.739 0-19.443 8.704-19.443 19.443v230.724c0 10.739 8.704 19.443 19.443 19.443s19.443-8.704 19.443-19.443V32.405c0-10.739-8.704-19.443-19.443-19.443z"/></g></svg>',
        sendMsg: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 24 24"><path fill="#2196f3" d="M14.077 16.79a.75.75 0 00-.448-.489l-3.857-1.5a.748.748 0 00-1.022.699v6.75a.751.751 0 001.354.444l3.857-5.25a.748.748 0 00.116-.654z"/><path fill="#64b5f6" d="M23.685.139a.75.75 0 00-.782-.054l-22.5 11.75a.752.752 0 00.104 1.375l19.75 6.75a.753.753 0 00.985-.599l2.75-18.5a.751.751 0 00-.307-.722z"/></svg>',
    },

    /**
     * Collection of messages and topics to be held by the chat bot.
     *
     * @type {Object}
     */
    messages: {
        start: {
            message: 'Test message 1 with topics',
            topics: [
                {
                    text: 'Coupons',
                    path: 'coupons',
                },
                {
                    text: 'Sales',
                },
                {
                    text: 'Newsletter',
                },
            ],
        },
        coupons: {
            message: 'Here is a list of all of our active coupons:',
            topics: [
                {
                    text: 'XXX',
                    path: 'couponsXXX',
                },
                {
                    text: 'YYY',
                    path: 'couponsYYY',
                },
                {
                    text: 'ZZZ',
                    path: 'couponsZZZ',
                },
            ],
        },
        couponsXXX: {
            message: 'You have selected coupon XXX'
        }
    },
};
