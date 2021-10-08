/* eslint-disable import/no-unresolved */
import { isUndefined } from '@utils/types';

export default class ChatMessage {
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
            type: 'text',
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
        this.type = settings.type;
        this.timestamp = settings.timestamp;
        if (settings.carousel) {
            this.carousel = settings.carousel;
        }
        this.computeProperties();
    }

    computeProperties() {
        this.typeClassSuffix = this.getTypeClassSuffix();
    }

    getTypeClassSuffix() {
        if (isUndefined(this.type)) return '';
        switch (this.type) {
        case 'system':
            return '--system';
        case 'carousel':
            return '--carousel';
        case 'text':
            return '--text';
        default:
            return '';
        }
    }
}
