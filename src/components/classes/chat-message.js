export default class ChatMessage {
    constructor(options) {
        const defaults = {
            text: '',
            topics: undefined,
            trigger: undefined,
            outgoing: undefined,
        };
        const settings = Object.assign({}, defaults, options);
        this.text = settings.text;
        this.topics = settings.topics;
        this.trigger = settings.trigger;
        this.outgoing = settings.outgoing;
    }
}
