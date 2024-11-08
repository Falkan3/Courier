/* eslint-disable import/no-unresolved */
import { isUndefined } from '@utils/types';

export default class ChatMessage {
    ChatMessageTypes = Object.freeze({
        SYSTEM: 'system',
        TEXT: 'text',
        CAROUSEL: 'carousel',
        COUPON: 'coupon'
    });

    /**
     * Construct a ChatMessage instance.
     *
     * @param {Object} options
     */
    constructor(options = {}) {
        const defaults = {
            text: '',
            topics: undefined,
            trigger: undefined,
            outgoing: undefined,
            type: this.ChatMessageTypes.TEXT,
            timestamp: undefined,
        };
        const settings = { ...defaults, ...options };
        // todo: don't set undefined properties
        // remove empty properties
        // Object.keys(settings).forEach(
        //     key => settings[key] === undefined && delete settings[key]
        // );
        // only set defined properties
        // Object.keys(settings).forEach((value, key) => {
        //     if (typeof value !== 'undefined') {
        //         this[key] = value;
        //     }
        // });
        this.text = settings.text;
        this.topics = settings.topics;
        this.trigger = settings.trigger;
        this.outgoing = settings.outgoing;
        this.type = Object.values(this.ChatMessageTypes).includes(settings.type)
            ? settings.type
            : this.ChatMessageTypes.TEXT;
        this.timestamp = settings.timestamp;
        if (settings.carousel) {
            this.carousel = settings.carousel;
        }
        this.computeProperties();
    }

    computeProperties() {
        this.typeClassSuffix = this.getTypeClassSuffix();
        this.isTypeSystem = this.type === this.ChatMessageTypes.SYSTEM;
    }

    getTypeClassSuffix() {
        if (isUndefined(this.type)) return '';
        switch (this.type) {
        case this.ChatMessageTypes.SYSTEM:
            return '--system';
        case this.ChatMessageTypes.TEXT:
            return '--text';
        case this.ChatMessageTypes.CAROUSEL:
            return '--carousel';
        case this.ChatMessageTypes.COUPON:
            return '--coupon';
        default:
            return '';
        }
    }
}
