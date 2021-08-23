/* eslint-disable import/no-unresolved */
import { warn } from '@utils/log';
import { mergeOptions } from '@utils/object';
import { isArray, isObject } from '@utils/types';
import EventsBus from '@core/event/events-bus';
import { mount } from '@core/index.js';
import defaults from './defaults';

export default class Courier {
    /**
     * Construct courier.
     *
     * @param  {Element|ShadowRoot} element
     * @param  {Object} options
     */
    constructor(element, options = {}) {
        this._transformers = [];
        this._eventsBus = new EventsBus();

        this.disabled = false;
        this.settings = mergeOptions(defaults, options);
        // let root = element || document.body;
        // shadow root enabled
        // if ((document.head.createShadowRoot || document.head.attachShadow)) {
        //     const dummyRoot = document.createElement('div');
        //     dummyRoot.setAttribute('id', this.settings.ids.dummyRoot);
        //     root = dummyRoot.attachShadow({ mode: 'open' });
        //     document.body.appendChild(dummyRoot);
        // }
        this.rootElement = element || document.body;
    }

    /**
     * Initializes courier.
     *
     * @param {Object} components Collection of components to initialize.
     * @return {Courier}
     */
    mount(components = {}) {
        this._eventsBus.emit('mount.before');

        if (isObject(components)) {
            this._components = mount(this, components, this._eventsBus);
        } else {
            warn('You need to provide an object on `mount()`');
        }

        this._eventsBus.emit('mount.after');

        return this;
    }


    /**
     * Collects an instance `translate` transformers.
     *
     * @param  {Array} transformers Collection of transformers.
     * @return {Courier}
     */
    mutate(transformers = []) {
        if (isArray(transformers)) {
            this._transformers = transformers;
        } else {
            warn('You need to provide an array when calling `mutate()`');
        }

        return this;
    }

    /**
     * Updates courier with specified settings.
     *
     * @param {Object} settings
     * @return {Courier}
     */
    update(settings = {}) {
        this.settings = mergeOptions(this.settings, settings);

        this._eventsBus.emit('update');

        return this;
    }

    /**
     * Destroy instance and revert all changes done by this._components.
     *
     * @return {Courier}
     */
    destroy() {
        this._eventsBus.emit('destroy');
        this._eventsBus.emit('destroy:after');
        // destroy events bus
        this._eventsBus.destroy();
        // remove root element
        this.rootElement.querySelector(`.${this.settings.classes.root}`).remove();

        return this;
    }

    /**
     * Sets courier into an idle status.
     *
     * @return {Courier}
     */
    disable() {
        this.disabled = true;

        return this;
    }

    /**
     * Sets courier into an active status.
     *
     * @return {Courier}
     */
    enable() {
        this.disabled = false;

        return this;
    }

    /**
     * Adds custom event listener with handler.
     *
     * @param  {String|Array} event
     * @param  {Function} handler
     * @return {Courier}
     */
    on(event, handler) {
        this._eventsBus.on(event, handler);

        return this;
    }

    /**
     * Gets value of the core options.
     *
     * @return {Object}
     */
    get settings() {
        return this._settings;
    }

    /**
     * Sets value of the core options.
     *
     * @param  {Object} object
     */
    set settings(object) {
        if (isObject(object)) {
            this._settings = object;
        } else {
            warn('Options must be an `object` instance.');
        }
    }

    /**
     * Gets value of the idle status.
     *
     * @return {Boolean}
     */
    get disabled() {
        return this._disabled;
    }

    /**
     * Sets value of the idle status.
     */
    set disabled(status) {
        this._disabled = !!status;
    }
}
