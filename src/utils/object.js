/**
 * Defines getter and setter property on the specified object.
 *
 * @param  {Object} obj         Object where property has to be defined.
 * @param  {String} prop        Name of the defined property.
 * @param  {Object} definition  Get and set definitions for the property.
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
    return Object.keys(obj).sort().reduce((r, k) => {
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
    Object.keys(obj).forEach((key) => {
        if (Object.hasOwnProperty.call(obj, key)) {
            callback.call(thisArg, obj[key], key, obj);
        }
    });
}

/**
 * Replace variables in text according to the given template.
 *
 * @param  {String} text
 * @param  {Object} template
 * @return {String}
 */
export function textTemplate(text, template) {
    let output = text;
    objectForEach(template, (value, key) => {
        const regex = new RegExp(`{{${key}}}`);
        output = output.replace(regex, value);
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
    const options = Object.assign({}, defaults, settings);

    // `Object.assign` does not deeply merge objects, so we
    // have to do it manually for every nested object
    // in options. Although it does not look smart,
    // it's smaller and faster than some fancy
    // merging deep-merge algorithm script.
    if (Object.hasOwnProperty.call(settings, 'ids')) {
        options.ids = Object.assign({}, defaults.ids, settings.ids);
    }

    if (Object.hasOwnProperty.call(settings, 'classes')) {
        options.classes = Object.assign({}, defaults.classes, settings.classes);
    }
    if (Object.hasOwnProperty.call(settings, 'breakpoints')) {
        options.breakpoints = Object.assign({}, defaults.breakpoints, settings.breakpoints);
    }
    if (Object.hasOwnProperty.call(settings, 'texts')) {
        options.texts = Object.assign({}, defaults.texts, settings.texts);
    }
    if (Object.hasOwnProperty.call(settings, 'textVars')) {
        options.textVars = Object.assign({}, defaults.textVars, settings.textVars);
    }

    objectForEach(options.texts, (value, key) => {
        options.texts[key] = textTemplate(value, options.textVars);
    });

    return options;
}
