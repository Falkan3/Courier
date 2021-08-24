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
            type: undefined,
        };
        const settings = Object.assign({}, defaults, options);
        this.text = settings.text;
        this.topics = settings.topics;
        this.trigger = settings.trigger;
        this.outgoing = settings.outgoing;
        this.type = settings.type;
        this.typeClassSuffix = this.getTypeClassSuffix();
    }

    getTypeClassSuffix() {
        switch (this.type) {
        case 'system':
            return '--system';
        default:
            return '';
        }
    }
}
