/*! Reef v7.4.0 | (c) 2020 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/reef */
//
// Variables
//

// Attributes that might be changed dynamically
const dynamicAttributes = ['checked', 'selected', 'value'];

// Hold internal helper functions
const _ = {};

// If true, debug mode is enabled
let debug = false;

// Create global support variable
let support;


//
// Methods
//

/**
 * Check feature support
 */
const checkSupport = function () {
    if (!window.DOMParser) return false;
    const parser = new DOMParser();
    try {
        parser.parseFromString('x', 'text/html');
    } catch (err) {
        return false;
    }
    return true;
};

const matches = function (elem, selector) {
    return (Element.prototype.matches && elem.matches(selector)) || (Element.prototype.msMatchesSelector && elem.msMatchesSelector(selector)) || (Element.prototype.webkitMatchesSelector && elem.webkitMatchesSelector(selector));
};

/**
 * More accurately check the type of a JavaScript object
 * @param  {Object} obj The object
 * @return {String}     The object type
 */
const trueTypeOf = function (obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};
_.trueTypeOf = trueTypeOf;

/**
 * Throw an error message
 * @param  {String} msg The error message
 */
const err = function (msg) {
    if (debug) {
        throw new Error(msg);
    }
};
_.err = err;

/**
 * Create an immutable copy of an object and recursively encode all of its data
 * @param  {*}       obj       The object to clone
 * @param  {Boolean} allowHTML If true, allow HTML in data strings
 * @return {*}                 The immutable, encoded object
 */
var clone = function (obj, allowHTML) {
    // Get the object type
    const type = trueTypeOf(obj);

    // If an object, loop through and recursively encode
    if (type === 'object') {
        const cloned = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                cloned[key] = clone(obj[key], allowHTML);
            }
        }
        return cloned;
    }

    // If an array, create a new array and recursively encode
    if (type === 'array') {
        return obj.map(item => clone(item, allowHTML));
    }

    // If the data is a string, encode it
    if (type === 'string' && !allowHTML) {
        const temp = document.createElement('div');
        temp.textContent = obj;
        return temp.innerHTML;
    }

    // Otherwise, return object as is
    return obj;
};

/**
 * Debounce rendering for better performance
 * @param  {Constructor} instance The current instantiation
 */
const debounceRender = function (instance) {
    // If there's a pending render, cancel it
    if (instance.debounce) {
        window.cancelAnimationFrame(instance.debounce);
    }

    // Setup the new render to run at the next animation frame
    instance.debounce = window.requestAnimationFrame(() => {
        instance.render();
    });
};

/**
 * Create settings and getters for data Proxy
 * @param  {Constructor} instance The current instantiation
 * @return {Object}               The setter and getter methods for the Proxy
 */
var dataHandler = function (instance) {
    return {
        get(obj, prop) {
            if (['object', 'array'].indexOf(trueTypeOf(obj[prop])) > -1) {
                return new Proxy(obj[prop], dataHandler(instance));
            }
            return obj[prop];
        },
        set(obj, prop, value) {
            if (obj[prop] === value) return true;
            obj[prop] = value;
            debounceRender(instance);
            return true;
        }
    };
};

/**
 * Find the first matching item in an array
 * @param  {Array}    arr      The array to search in
 * @param  {Function} callback The callback to run to find a match
 * @return {*}                 The matching item
 */
const find = function (arr, callback) {
    const matches = arr.filter(callback);
    if (matches.length < 1) return null;
    return matches[0];
};

/**
 * Create a proxy from a data object
 * @param  {Object}     options  The options object
 * @param  {Contructor} instance The current Reef instantiation
 * @return {Proxy}               The Proxy
 */
const makeProxy = function (options, instance) {
    if (options.setters) return !options.store ? options.data : null;
    return options.data && !options.store ? new Proxy(options.data, dataHandler(instance)) : null;
};

/**
 * Create the Reef object
 * @param {String|Node} elem    The element to make into a component
 * @param {Object}      options The component options
 */
const Reef = function (elem, options) {
    // Make sure an element is provided
    if (!elem && (!options || !options.lagoon)) return err('You did not provide an element to make into a component.');

    // Make sure a template is provided
    if (!options || (!options.template && !options.lagoon)) return err('You did not provide a template for this component.');

    // Set the component properties
    const _this = this;
    let _data = makeProxy(options, _this);
    const _store = options.store;
    const _router = options.router;
    const _setters = options.setters;
    const _getters = options.getters;
    _this.debounce = null;

    // Create properties for stuff
    Object.defineProperties(_this, {
        elem: { value: elem },
        template: { value: options.template },
        allowHTML: { value: options.allowHTML },
        lagoon: { value: options.lagoon },
        store: { value: _store },
        attached: { value: [] },
        router: { value: _router }
    });

    // Define setter and getter for data
    Object.defineProperty(_this, 'data', {
        get() {
            return _setters ? clone(_data, true) : _data;
        },
        set(data) {
            if (_store || _setters) return true;
            _data = new Proxy(data, dataHandler(_this));
            debounceRender(_this);
            return true;
        }
    });

    if (_setters && !_store) {
        Object.defineProperty(_this, 'do', {
            value(id) {
                if (!_setters[id]) return err('There is no setter with this name.');
                const args = Array.prototype.slice.call(arguments);
                args[0] = _data;
                _setters[id].apply(_this, args);
                debounceRender(_this);
            }
        });
    }

    if (_getters && !_store) {
        Object.defineProperty(_this, 'get', {
            value(id) {
                if (!_getters[id]) return err('There is no getter with this name.');
                return _getters[id](_data);
            }
        });
    }

    // Attach to router
    if (_router && 'addComponent' in _router) {
        _router.addComponent(_this);
    }

    // Attach to store
    if (_store && 'attach' in _store) {
        _store.attach(_this);
    }

    // Attach linked components
    if (options.attachTo) {
        const _attachTo = trueTypeOf(options.attachTo) === 'array' ? options.attachTo : [options.attachTo];
        _attachTo.forEach((coral) => {
            if ('attach' in coral) {
                coral.attach(_this);
            }
        });
    }
};

/**
 * Store constructor
 * @param {Object} options The data store options
 */
Reef.Store = function (options) {
    options.lagoon = true;
    return new Reef(null, options);
};

/**
 * Create an array map of style names and values
 * @param  {String} styles The styles
 * @return {Array}         The styles
 */
const getStyleMap = function (styles) {
    return styles.split(';').reduce((arr, style) => {
        const col = style.indexOf(':');
        if (col) {
            arr.push({
                name: style.slice(0, col).trim(),
                value: style.slice(col + 1).trim()
            });
        }
        return arr;
    }, []);
};

/**
 * Remove styles from an element
 * @param  {Node}  elem   The element
 * @param  {Array} styles The styles to remove
 */
const removeStyles = function (elem, styles) {
    styles.forEach((style) => {
        elem.style[style] = '';
    });
};

/**
 * Add or updates styles on an element
 * @param  {Node}  elem   The element
 * @param  {Array} styles The styles to add or update
 */
const changeStyles = function (elem, styles) {
    styles.forEach((style) => {
        elem.style[style.name] = style.value;
    });
};

/**
 * Diff existing styles from new ones
 * @param  {Node}   elem   The element
 * @param  {String} styles The styles the element should have
 */
const diffStyles = function (elem, styles) {
    // Get style map
    const styleMap = getStyleMap(styles);

    // Get styles to remove
    const remove = Array.prototype.filter.call(elem.style, (style) => {
        const findStyle = find(styleMap, newStyle => newStyle.name === style && newStyle.value === elem.style[style]);
        return findStyle === null;
    });

    // Add and remove styles
    removeStyles(elem, remove);
    changeStyles(elem, styleMap);
};

/**
 * Add attributes to an element
 * @param {Node}  elem The element
 * @param {Array} atts The attributes to add
 */
const addAttributes = function (elem, atts) {
    atts.forEach((attribute) => {
        // If the attribute is a class, use className
        // Else if it's style, diff and update styles
        // Otherwise, set the attribute
        if (attribute.att === 'class') {
            elem.className = attribute.value;
        } else if (attribute.att === 'style') {
            diffStyles(elem, attribute.value);
        } else {
            if (attribute.att in elem) {
                try {
                    elem[attribute.att] = attribute.value;
                    if (!elem[attribute.att] && elem[attribute.att] !== 0) {
                        elem[attribute.att] = true;
                    }
                } catch (e) {}
            }
            try {
                elem.setAttribute(attribute.att, attribute.value);
            } catch (e) {}
        }
    });
};

/**
 * Remove attributes from an element
 * @param {Node}  elem The element
 * @param {Array} atts The attributes to remove
 */
const removeAttributes = function (elem, atts) {
    atts.forEach((attribute) => {
        // If the attribute is a class, use className
        // Else if it's style, remove all styles
        // Otherwise, use removeAttribute()
        if (attribute.att === 'class') {
            elem.className = '';
        } else if (attribute.att === 'style') {
            removeStyles(elem, Array.prototype.slice.call(elem.style));
        } else {
            if (attribute.att in elem) {
                try {
                    elem[attribute.att] = '';
                } catch (e) {}
            }
            try {
                elem.removeAttribute(attribute.att);
            } catch (e) {}
        }
    });
};

/**
 * Create an object with the attribute name and value
 * @param  {String} name  The attribute name
 * @param  {*}      value The attribute value
 * @return {Object}       The object of attribute details
 */
const getAttribute = function (name, value) {
    return {
        att: name,
        value
    };
};

/**
 * Get the dynamic attributes for a node
 * @param  {Node}    node       The node
 * @param  {Array}   atts       The static attributes
 * @param  {Boolean} isTemplate If true, these are for the template
 */
const getDynamicAttributes = function (node, atts, isTemplate) {
    dynamicAttributes.forEach((prop) => {
        if ((!node[prop] && node[prop] !== 0) || (isTemplate && node.tagName.toLowerCase() === 'option' && prop === 'selected') || (isTemplate && node.tagName.toLowerCase() === 'select' && prop === 'value')) return;
        atts.push(getAttribute(prop, node[prop]));
    });
};

/**
 * Get base attributes for a node
 * @param  {Node} node The node
 * @return {Array}     The node's attributes
 */
const getBaseAttributes = function (node, isTemplate) {
    return Array.prototype.reduce.call(node.attributes, (arr, attribute) => {
        if ((dynamicAttributes.indexOf(attribute.name) < 0 || (isTemplate && attribute.name === 'selected')) && (attribute.name.length > 7 ? attribute.name.slice(0, 7) !== 'default' : true)) {
            arr.push(getAttribute(attribute.name, attribute.value));
        }
        return arr;
    }, []);
};

/**
 * Create an array of the attributes on an element
 * @param  {Node}    node       The node to get attributes from
 * @return {Array}              The attributes on an element as an array of key/value pairs
 */
const getAttributes = function (node, isTemplate) {
    if (node.nodeType !== 1) return [];
    const atts = getBaseAttributes(node, isTemplate);
    getDynamicAttributes(node, atts, isTemplate);
    return atts;
};

/**
 * Diff the attributes on an existing element versus the template
 * @param  {Object} template The new template
 * @param  {Object} elem     The existing DOM node
 */
const diffAtts = function (template, elem) {
    const templateAtts = getAttributes(template, true);
    const elemAtts = getAttributes(elem);

    // Get attributes to remove
    const remove = elemAtts.filter((att) => {
        if (dynamicAttributes.indexOf(att.att) > -1) return false;
        const getAtt = find(templateAtts, newAtt => att.att === newAtt.att);
        return getAtt === null;
    });

    // Get attributes to change
    const change = templateAtts.filter((att) => {
        const getAtt = find(elemAtts, elemAtt => att.att === elemAtt.att);
        return getAtt === null || getAtt.value !== att.value;
    });

    // Add/remove any required attributes
    addAttributes(elem, change);
    removeAttributes(elem, remove);
};

/**
 * Get the type for a node
 * @param  {Node}   node The node
 * @return {String}      The type
 */
const getNodeType = function (node) {
    return node.nodeType === 3 ? 'text' : (node.nodeType === 8 ? 'comment' : node.tagName.toLowerCase());
};

/**
 * Get the content from a node
 * @param  {Node}   node The node
 * @return {String}      The type
 */
const getNodeContent = function (node) {
    return node.childNodes && node.childNodes.length > 0 ? null : node.textContent;
};

/**
 * Add default attributes to a newly created node
 * @param  {Node}   node The node
 */
var addDefaultAtts = function (node) {
    // Only run on elements
    if (node.nodeType !== 1) return;

    // Check for default attributes
    // Add/remove as needed
    Array.prototype.forEach.call(node.attributes, (attribute) => {
        if (attribute.name.length < 8 || attribute.name.slice(0, 7) !== 'default') return;
        addAttributes(node, [getAttribute(attribute.name.slice(7).toLowerCase(), attribute.value)]);
        removeAttributes(node, [getAttribute(attribute.name, attribute.value)]);
    });

    // If there are child nodes, recursively check them
    if (node.childNodes) {
        Array.prototype.forEach.call(node.childNodes, (childNode) => {
            addDefaultAtts(childNode);
        });
    }
};

/**
 * Diff the existing DOM node versus the template
 * @param  {Array} template The template HTML
 * @param  {Node}  elem     The current DOM HTML
 * @param  {Array} polyps   Attached components for this element
 */
var diff = function (template, elem, polyps) {
    // Get arrays of child nodes
    const domMap = Array.prototype.slice.call(elem.childNodes);
    const templateMap = Array.prototype.slice.call(template.childNodes);

    // If extra elements in DOM, remove them
    let count = domMap.length - templateMap.length;
    if (count > 0) {
        for (; count > 0; count--) {
            domMap[domMap.length - count].parentNode.removeChild(domMap[domMap.length - count]);
        }
    }

    // Diff each item in the templateMap
    templateMap.forEach((node, index) => {
        // If element doesn't exist, create it
        if (!domMap[index]) {
            addDefaultAtts(node);
            elem.appendChild(node.cloneNode(true));
            return;
        }

        // If element is not the same type, replace it with new element
        if (getNodeType(node) !== getNodeType(domMap[index])) {
            domMap[index].parentNode.replaceChild(node.cloneNode(true), domMap[index]);
            return;
        }

        // If attributes are different, update them
        diffAtts(node, domMap[index]);

        // If element is an attached component, skip it
        const isPolyp = polyps.filter(polyp => node.nodeType !== 3 && matches(node, polyp));
        if (isPolyp.length > 0) return;

        // If content is different, update it
        const templateContent = getNodeContent(node);
        if (templateContent && templateContent !== getNodeContent(domMap[index])) {
            domMap[index].textContent = templateContent;
        }

        // If target element should be empty, wipe it
        if (domMap[index].childNodes.length > 0 && node.childNodes.length < 1) {
            domMap[index].innerHTML = '';
            return;
        }

        // If element is empty and shouldn't be, build it up
        // This uses a document fragment to minimize reflows
        if (domMap[index].childNodes.length < 1 && node.childNodes.length > 0) {
            const fragment = document.createDocumentFragment();
            diff(node, fragment, polyps);
            domMap[index].appendChild(fragment);
            return;
        }

        // If there are existing child elements that need to be modified, diff them
        if (node.childNodes.length > 0) {
            diff(node, domMap[index], polyps);
        }
    });
};

/**
 * If there are linked Reefs, render them, too
 * @param  {Array} polyps Attached Reef components
 */
const renderPolyps = function (polyps, reef) {
    if (!polyps) return;
    polyps.forEach((coral) => {
        if (coral.attached.indexOf(reef) > -1) return err(`${reef.elem} has attached nodes that it is also attached to, creating an infinite loop.`);
        if ('render' in coral) coral.render();
    });
};

/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
const stringToHTML = function (str) {
    // If DOMParser is supported, use it
    if (support) {
        // Create document
        const parser = new DOMParser();
        const doc = parser.parseFromString(str, 'text/html');

        // If there are items in the head, move them to the body
        if ('head' in doc && 'childNodes' in doc.head && doc.head.childNodes.length > 0) {
            Array.prototype.slice.call(doc.head.childNodes).reverse().forEach((node) => {
                doc.body.insertBefore(node, doc.body.firstChild);
            });
        }

        return doc.body;
    }

    // Otherwise, fallback to old-school method
    const dom = document.createElement('div');
    dom.innerHTML = str;
    return dom;
};

/**
 * Emit a custom event
 * @param  {Node}   elem   The element to emit the custom event on
 * @param  {String} name   The name of the custom event
 * @param  {*}      detail Details to attach to the event
 */
Reef.emit = function (elem, name, detail) {
    let event;
    if (!elem || !name) return err('You did not provide an element or event name.');
    event = new CustomEvent(name, {
        bubbles: true,
        detail
    });
    elem.dispatchEvent(event);
};

/**
 * Render a template into the DOM
 * @return {Node}  The elemenft
 */
Reef.prototype.render = function () {
    // If this is used only for data, render attached and bail
    if (this.lagoon) {
        renderPolyps(this.attached, this);
        return;
    }

    // Make sure there's a template
    if (!this.template) return err('No template was provided.');

    // If elem is an element, use it.
    // If it's a selector, get it.
    const elem = trueTypeOf(this.elem) === 'string' ? document.querySelector(this.elem) : this.elem;
    if (!elem) return err('The DOM element to render your template into was not found.');

    // Get the data (if there is any)
    const data = clone((this.store ? this.store.data : this.data) || {}, this.allowHTML);

    // Get the template
    const template = (trueTypeOf(this.template) === 'function' ? this.template(data, this.router ? this.router.current : null) : this.template);
    if (['string', 'number'].indexOf(trueTypeOf(template)) < 0) return;

    // Diff and update the DOM
    const polyps = this.attached.map(polyp => polyp.elem);
    diff(stringToHTML(template), elem, polyps);

    // Dispatch a render event
    Reef.emit(elem, 'render', data);

    // If there are linked Reefs, render them, too
    renderPolyps(this.attached, this);

    // Return the elem for use elsewhere
    return elem;
};

/**
 * Attach a component to this one
 * @param  {Function|Array} coral The component(s) to attach
 */
Reef.prototype.attach = function (coral) {
    if (trueTypeOf(coral) === 'array') {
        this.attached.concat(coral);
    } else {
        this.attached.push(coral);
    }
};

/**
 * Detach a linked component to this one
 * @param  {Function|Array} coral The linked component(s) to detach
 */
Reef.prototype.detach = function (coral) {
    const polyps = trueTypeOf(coral) === 'array' ? coral : [coral];
    const instance = this;
    polyps.forEach((polyp) => {
        const index = instance.attached.indexOf(polyp);
        if (index < 0) return;
        instance.attached.splice(index, 1);
    });
};

/**
 * Turn debug mode on or off
 * @param  {Boolean} on If true, turn debug mode on
 */
Reef.debug = function (on) {
    debug = !!on;
};

// Expose the clone method externally
Reef.clone = clone;

// Attach internal helpers
Reef._ = _;


//
// Set support
//

support = checkSupport();

export default Reef;
