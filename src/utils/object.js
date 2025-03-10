/* eslint-disable import/no-unresolved */
import { isArray, isObject } from '@utils/types';
import { clipboard as clipboardIcon, cubes as cubesIcon } from '@utils/images';

/**
 * Return the last item of an array.
 *
 * @param arr
 * @returns {*}
 */
export function arrLastItem(arr) {
    const { length } = arr;
    return length > 0 ? arr[arr.length - 1] : null;
}

/**
 * Defines getter and setter property on the specified object.
 *
 * @param  {Object} obj         Object where property has to be defined.
 * @param  {String} prop        Name of the defined property.
 * @param  {Object} definition  Get and set definitions for the property.
 * @return {void}
 */
export function define(obj, prop, definition) {
    Object.defineProperty(obj, prop, definition);
}

/**
 * Sorts alphabetically object keys.
 *
 * @param  {Object} obj
 * @return {Object}
 */
export function sortKeys(obj) {
    return Object.keys(obj)
    .sort()
    .reduce((r, k) => {
        r[k] = obj[k];

        return (r[k], r);
    }, {});
}

/**
 * ForEach implementation for Objects.
 *
 * @param  {Object} obj         input object
 * @param  {Object} callback    callback function to be called for each item
 * @param  {Object} thisArg     reference to input object
 */
export function objectForEach(obj, callback, thisArg = window) {
    Object.keys(obj)
    .forEach((key) => {
        if (Object.hasOwnProperty.call(obj, key)) {
            callback.call(thisArg, obj[key], key, obj);
        }
    });
}

/**
 * Clone an array or an object.
 *
 * @param  {Object|Array} input
 * @param {Boolean} deep
 * @return {Object|Array}
 */
export function clone(input, deep = false) {
    if (input === null) return null;
    if (isArray(input)) {
        if (deep) {
            const msgArr = [];
            for (let i = 0, { length } = input; i < length; i++) {
                msgArr.push(clone(input[i], true));
            }
            return msgArr;
        }
        return input.slice();
    }
    if (isObject(input)) {
        // exception for Date objects
        if (Object.prototype.toString.call(input) === '[object Date]') {
            return new Date(input.getTime());
        }
        if (deep) {
            const clonedObj = {}; // Object.assign({}, input);
            objectForEach(input, (el, key) => {
                clonedObj[key] = clone(el, true);
            });
            return clonedObj;
        }
        return { ...input };
    }
    return input;
}

/**
 * Merge defaults with user options
 * @private
 * @param {Object} target Object to be extended
 * @param {Object} source
 * @returns {Object} Merged values of target and source
 */
export function mergeDeep(target, source) {
    let output = { ...target };
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((key) => {
            if (isObject(source[key])) {
                if (!(key in target)) Object.assign(output, { [key]: source[key] });
                else output[key] = mergeDeep(target[key], source[key]);
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    } else {
        output = source;
    }
    return output;
}

/**
 * Replace variables in text according to the given template.
 * todo: return an indicator that replace action occurred, and only update the input if it did
 * const replaced = output.search(regex) >= 0;
 *
 * @param  {String} text
 * @param  {Object} template
 * @return {String}
 */
export function textTemplate(text, template) {
    if (text === null) {
        return text;
    }
    let output = text;
    objectForEach(template, (value, key) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        output = output.replaceAll(regex, value);
    });
    return output;
}

export function objTextTemplate(input, template) {
    if (!isObject(input)) {
        return textTemplate(input, template);
    }
    objectForEach(input, (value, key) => {
        input[key] = objTextTemplate(value, template);
    });
    return input;
}

/**
 *
 * @param  {String} text
 * @param  {Object} settings
 * @param  {Object} props
 * @return {String}
 */
export function parseSpecialTags(text, settings, props) {
    // todo: add caching
    /* eslint-disable max-len */
    const rules = [
        [/%%info%%/g, `<span class="${settings.classes.root}__icon">${settings.images.info}</span>`],
        // [/%%tooltip%\((.*)\)(.*?)%%/g, `<span class="${settings.classes.root}__tooltip-wrapper" data-courier-tooltip="$1">$2</span>`],
        [/%%couponCode%(.*?)%%/g, `
        <span class="${settings.classes.chat}-discount-code ${settings.classes.chat}-discount-code--inline">
            <button class="${settings.classes.chat}-discount-code-btn" data-courier-tooltip="${props.texts.clipboardTooltip}" data-courier-discount-code="$1">
                <span class="${settings.classes.chat}-discount-code-btn-container">
                    <span class="${settings.classes.chat}-discount-code-value">$1</span>
                    <span class="${settings.classes.chat}-discount-code-icon">${clipboardIcon}<span class="${settings.classes.chat}-discount-code-icon-text">${props.texts.clipboardButton}</span></span>
                </span>
            </button>
        </span>`],
        [/%%productList%(.*?)%productList%%/g, `
        <span class="${settings.classes.chat}-products">
            <ul class="${settings.classes.chat}-products-list">
                $1
            </ul>
        </span>`],
        [/%%productListItem%([\s\S]*?)%%/g, `
        <li class="${settings.classes.chat}-products-list-item">
            <a class="${settings.classes.chat}-products-link" href="$var5" rel="nofollow noreferrer">
                <span class="${settings.classes.chat}-products-img-wrapper"><img class="${settings.classes.chat}-products-img" src="$var6" width="64" height="64" alt="" /></span>
                <span class="${settings.classes.chat}-products-content">
                    <span class="${settings.classes.chat}-products-title">$var1</span>
                    <span class="${settings.classes.chat}-products-description">$var2</span>
                    <span class="${settings.classes.chat}-products-price">
                           <span class="${settings.classes.chat}-products-price-current">$var3</span>
                           <span class="${settings.classes.chat}-products-price-old">$var4</span>
                    </span>
                </span>
             </a>
        </li>`, { nested: true, var6: `data:image/svg+xml;utf8,${cubesIcon}` }],
    ];
    /* eslint-enable max-len */
    let output = text;
    rules.forEach(([rule, template, options]) => {
        // additional variable parsing
        if (options && (options.nested ?? false) === true) {
            output = output.replace(rule, (match, capture) => {
                if (options && (options.nested ?? false) === true) {
                    let part = template;
                    const variables = capture.split(',');
                    for (let i = 0; i < variables.length; i++) {
                        // check if the variable has a fallback
                        let value = variables[i];
                        const fallbackKey = `var${i + 1}`;
                        if (value === '' && Object.prototype.hasOwnProperty.call(options, fallbackKey)) {
                            value = options[fallbackKey];
                            value = value.replaceAll('#', '%23'); // escape hashes
                            value = value.replaceAll('"', '&quot;'); // replace double quote marks
                        } else {
                            value = decodeURIComponent(value);
                        }
                        // replace template key with the decoded value
                        part = part.replace(`$var${i + 1}`, value);
                    }
                    return part;
                }
                return template;
            });

            return;
        }
        // replace tag with template
        output = output.replace(rule, template);
    });
    return output;
}

/**
 * Merges passed settings object with default options.
 *
 * @param  {Object} defaults
 * @param  {Object} settings
 * @return {Object}
 */
export function mergeOptions(defaults, settings) {
    const options = { ...defaults, ...settings };

    // `Object.assign` does not deeply merge objects, so we
    // have to do it manually for every nested object
    // in options. Although it does not look smart,
    // it's smaller and faster than some fancy
    // merging deep-merge algorithm script.
    if (Object.hasOwnProperty.call(settings, 'ids')) {
        options.ids = { ...defaults.ids, ...settings.ids };
    }
    if (Object.hasOwnProperty.call(settings, 'classes')) {
        options.classes = { ...defaults.classes, ...settings.classes };
    }
    if (Object.hasOwnProperty.call(settings, 'breakpoints')) {
        options.breakpoints = { ...defaults.breakpoints, ...settings.breakpoints };
    }
    if (Object.hasOwnProperty.call(settings, 'texts')) {
        options.texts = { ...defaults.texts, ...settings.texts };
    }
    if (Object.hasOwnProperty.call(settings, 'textVars')) {
        options.textVars = { ...defaults.textVars, ...settings.textVars };
    }
    if (Object.hasOwnProperty.call(settings, 'identity')) {
        options.identity = { ...defaults.identity, ...settings.identity };
    }
    if (Object.hasOwnProperty.call(settings, 'poweredBy')) {
        options.poweredBy = { ...defaults.poweredBy, ...settings.poweredBy };
    }
    if (Object.hasOwnProperty.call(settings, 'images')) {
        options.images = { ...defaults.images, ...settings.images };
    }
    if (Object.hasOwnProperty.call(settings, 'messages')) {
        options.messages = { ...defaults.messages, ...settings.messages };
    }
    if (Object.hasOwnProperty.call(settings, 'moduleData')) {
        options.moduleData = { ...defaults.moduleData, ...settings.moduleData };
    }
    if (Object.hasOwnProperty.call(settings, 'state')) {
        options.state = { ...defaults.state, ...settings.state };
    }
    if (Object.hasOwnProperty.call(settings, 'cookies')) {
        options.cookies = mergeDeep(defaults.cookies, settings.cookies);
        // { ...defaults.cookies, ...settings.cookies }
    }

    // this will replace text variable keys with values
    options.textsParsed = {};
    objectForEach(options.texts, (value, key) => {
        options.textsParsed[key] = objTextTemplate(value, options.textVars);
    });

    return options;
}

/**
 * Apply text variables to the given text string.
 *
 * @param  {Object} settings
 * @param  {string} text
 * @return {Object}
 */
export function textApplyVar(settings, text) {
    return textTemplate(text, settings.textVars);
}
