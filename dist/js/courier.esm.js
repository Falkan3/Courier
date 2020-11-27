/*!
 * Courier.js v0.0.1
 * (c) 2020-2020 Adam Kocić (Falkan3)
 * Released under the MIT License.
 */

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

var defaults = {
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
    dummyRoot: 'courierDummyRoot'
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
    popup: 'courier__popup'
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
  texts: {
    widgetGreeting: 'Hello!',
    // chat
    chatTitle: 'Chat with us!',
    messagePlaceholder: 'Type something...',
    sendMessage: 'Send message',
    // popup
    popupContent: ''
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
    name: 'Company',
    website: {
      name: 'company.com',
      url: 'https://company.com'
    },
    logo: {
      src: 'https://uilogos.co/img/logomark/circle.png',
      alt: 'Company logo'
    }
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
    widget: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999"><circle cx="255.999" cy="255.999" r="255.999" fill="#4d4949"/><path fill="#ffcda8" d="M456.234 415.504c-20.522 25.736-45.902 47.428-74.762 63.686a254.136 254.136 0 01-60.155 24.398h-10.7a132.54 132.54 0 01-61.252-14.994l-111.731-58.263-24.607-13.531-26.822-14.754 135.314-6.269c15.287 0 11.494-37.491 11.494-52.767l73.153-126.871 90.885 90.885c12.413 12.413 22.12 27.052 28.714 42.977s10.083 33.134 10.083 50.698l20.386 14.805z"/><g fill="#eab796"><path d="M381.472 479.19a254.136 254.136 0 01-60.155 24.398h-10.7a132.54 132.54 0 01-61.252-14.994l-111.731-58.263-24.607-13.531 156.682 11.818s30.312 50.573 111.741 50.573l.022-.001zM86.727 165.064H71.429a36.59 36.59 0 00-2.258-.084 31.227 31.227 0 00-22.158 9.188c-12.238 12.237-12.238 32.077 0 44.315l17.246 17.258a31.151 31.151 0 00-18.459 8.947c-12.238 12.238-12.238 32.09 0 44.328l9.055 9.055a30.944 30.944 0 008.768 6.173c.208-.147.425-.274.636-.414v.689c-.211-.094-.427-.176-.636-.275a29.508 29.508 0 00-4.335 3.591c-12.238 12.249-12.238 32.09 0 44.328l9.055 9.056a32.514 32.514 0 003.087 2.69v-24.034h15.298l-.001-174.811z"/></g><path fill="#ffde51" d="M278.5 0H99.102C83.815 0 71.423 12.382 71.423 27.669v373.289c0 15.276 12.392 27.658 27.679 27.658h170.611c-14.838-18.38 9.885-42.559 16.593-64.136l5.183-62.621 3.605-43.499 11.076 11.086V27.669C306.169 12.382 293.787 0 278.5 0z"/><path fill="#eab796" d="M347.529 294.199l-27.44-27.44v-36.697l-13.919-13.92v53.299l33.058 33.058c3.698 3.697 10.02 1.079 10.02-4.15a5.874 5.874 0 00-1.719-4.15z"/><path fill="#4d4949" d="M90.819 162.619v-38.605c0-25.026 16.507-34.346 38.073-34.346 21.299 0 37.806 9.318 37.806 34.346v38.605c0 25.027-16.507 34.346-37.806 34.346-21.566 0-38.073-9.318-38.073-34.346zm53.249-38.606c0-9.851-5.858-14.377-15.176-14.377s-14.91 4.525-14.91 14.377v38.605c0 9.851 5.591 14.378 14.91 14.378s15.176-4.526 15.176-14.378v-38.605zM249.5 90.999c0 1.598-.265 3.195-1.064 4.793l-95.848 193.293c-1.598 3.727-5.858 5.858-10.383 5.858-7.455 0-12.514-6.124-12.514-11.714 0-1.598.533-3.195 1.066-4.526L226.604 84.61c1.864-3.727 5.591-5.59 9.585-5.59 6.123-.001 13.311 4.791 13.311 11.979zm-38.605 159.747v-38.605c0-25.027 16.507-34.346 38.073-34.346 21.299 0 37.806 9.318 37.806 34.346v38.605c0 25.294-16.508 34.346-37.806 34.346-21.565-.001-38.073-9.053-38.073-34.346zm53.249-38.605c0-9.851-5.857-14.378-15.175-14.378-9.319 0-14.91 4.525-14.91 14.378v38.605c0 9.851 5.59 14.378 14.91 14.378 9.318 0 15.175-4.525 15.175-14.378v-38.605z"/><path fill="#fff" d="M241.886 216.36v3.009h-13.537v-1.633a34.545 34.545 0 00-14.307 8.627 34.791 34.791 0 00-4.568 5.628v3.659h-2.076a34.657 34.657 0 00-3.515 15.237c0 8.875 3.387 17.751 10.16 24.525l39.944 39.943c10.484 10.484 13.559 26.482 7.17 39.861a68.276 68.276 0 00-3.627 9.271h-30.649v.001h30.646c-6.705 21.57-2.654 45.749 12.181 64.128h5.878c16.812 0 30.456-13.566 30.582-30.348V269.443l-11.08-11.077-20.777-20.779v11.875h-13.537v-13.537h11.875l-9.561-9.561a34.492 34.492 0 00-21.202-10.004"/><path fill="#eac420" d="M286.306 364.481c-6.708 21.577-31.43 45.756-16.593 64.136h-18.808c-14.838-18.39-18.892-42.559-12.183-64.136a68.358 68.358 0 013.626-9.268c6.395-13.375 3.312-29.372-7.168-39.863l-39.946-39.936a34.6 34.6 0 01-10.156-24.524c0-8.892 3.385-17.753 10.156-24.524 13.552-13.552 35.516-13.552 49.047 0l32.005 32.005 11.076 11.065 4.127 32.423-5.183 62.622z"/><g fill="#333030"><path d="M276.285 258.371l-12.142-12.142v4.514c0 9.853-5.851 14.378-15.172 14.378s-14.911-4.524-14.911-14.378v-31.462a34.722 34.722 0 00-23.165-1.923v33.384c0 25.297 16.509 34.346 38.076 34.346 16.206 0 29.644-5.245 35.14-18.902l-7.826-7.815z"/><path d="M284.111 266.187c-5.496 13.657-18.934 18.902-35.14 18.902-21.567 0-38.076-9.049-38.076-34.346v-33.384a34.722 34.722 0 0123.165 1.923v31.462c0 9.853 5.59 14.378 14.911 14.378 9.32 0 15.172-4.524 15.172-14.378v-4.514l12.142 12.142 7.826 7.815z"/></g><path fill="#ffcda8" d="M295.096 258.368l-32.005-32.006c-13.535-13.546-35.5-13.546-49.047 0-6.773 6.774-10.161 15.637-10.161 24.524 0 8.875 3.387 17.75 10.161 24.524l39.944 39.944c10.484 10.484 13.559 26.481 7.17 39.86a68.407 68.407 0 00-3.627 9.271c-6.713 21.57-2.654 45.745 12.178 64.132l13.459 14.703c15.288 0 40.751-19.205 40.751-34.482L306.17 269.442l-11.074-11.074z"/><path fill="#f2e5e5" d="M255.284 236.83c-8.17-8.17-21.416-8.17-29.586 0-8.17 8.17-8.17 21.416 0 29.586 8.17 8.17 15.225 1.978 23.395-6.192 8.169-8.169 14.361-15.224 6.191-23.394z"/></svg>',
    closeBtn: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 365.717 365"><g fill="#f44336"><path d="M356.34 296.348L69.727 9.734c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.816c-12.5 12.504-12.5 32.77 0 45.25L295.988 356.68c12.504 12.5 32.77 12.5 45.25 0l15.082-15.082c12.524-12.48 12.524-32.75.02-45.25zm0 0"/><path d="M295.988 9.734L9.375 296.348c-12.5 12.5-12.5 32.77 0 45.25l15.082 15.082c12.504 12.5 32.77 12.5 45.25 0L356.34 70.086c12.504-12.5 12.504-32.766 0-45.246L341.258 9.758c-12.5-12.524-32.766-12.524-45.27-.024zm0 0"/></g></svg>',
    options: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g fill="#000"><path d="M256 110.825c-43.241 0-78.42 35.179-78.42 78.42s35.179 78.42 78.42 78.42 78.42-35.179 78.42-78.42-35.179-78.42-78.42-78.42zm0 117.955c-21.802 0-39.534-17.739-39.534-39.534 0-21.802 17.732-39.534 39.534-39.534 21.796 0 39.534 17.732 39.534 39.534S277.796 228.78 256 228.78z"/><path d="M256 229.428c-10.739 0-19.443 8.704-19.443 19.443v230.724c0 10.739 8.704 19.443 19.443 19.443s19.443-8.704 19.443-19.443V248.871c0-10.739-8.704-19.443-19.443-19.443zM256 12.962c-10.739 0-19.443 8.704-19.443 19.443v97.863c0 10.739 8.704 19.443 19.443 19.443s19.443-8.704 19.443-19.443V32.405c0-10.739-8.704-19.443-19.443-19.443zM433.58 244.334c-43.235 0-78.42 35.179-78.42 78.42s35.185 78.42 78.42 78.42c43.241 0 78.42-35.179 78.42-78.42s-35.185-78.42-78.42-78.42zm0 117.961c-21.809 0-39.541-17.739-39.541-39.541s17.739-39.534 39.541-39.534 39.534 17.739 39.534 39.534c0 21.809-17.739 39.541-39.534 39.541z"/><path d="M433.58 362.289c-10.739 0-19.443 8.704-19.443 19.443v97.863c0 10.739 8.704 19.443 19.443 19.443 10.745 0 19.443-8.704 19.443-19.443v-97.863c0-10.739-8.704-19.443-19.443-19.443zM433.58 12.962c-10.739 0-19.443 8.704-19.443 19.443v230.724c0 10.739 8.704 19.443 19.443 19.443 10.745 0 19.443-8.704 19.443-19.443V32.405c0-10.739-8.704-19.443-19.443-19.443zM78.42 244.334c-43.241 0-78.42 35.179-78.42 78.42s35.179 78.42 78.42 78.42 78.42-35.179 78.42-78.42c.001-43.241-35.178-78.42-78.42-78.42zm0 117.961c-21.802 0-39.534-17.739-39.534-39.541S56.618 283.22 78.42 283.22s39.534 17.739 39.534 39.534c0 21.809-17.732 39.541-39.534 39.541z"/><path d="M78.42 362.289c-10.739 0-19.443 8.704-19.443 19.443v97.863c0 10.739 8.704 19.443 19.443 19.443s19.443-8.704 19.443-19.443v-97.863c0-10.739-8.704-19.443-19.443-19.443zM78.42 12.962c-10.739 0-19.443 8.704-19.443 19.443v230.724c0 10.739 8.704 19.443 19.443 19.443s19.443-8.704 19.443-19.443V32.405c0-10.739-8.704-19.443-19.443-19.443z"/></g></svg>',
    sendMsg: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 24 24"><path fill="#2196f3" d="M14.077 16.79a.75.75 0 00-.448-.489l-3.857-1.5a.748.748 0 00-1.022.699v6.75a.751.751 0 001.354.444l3.857-5.25a.748.748 0 00.116-.654z"/><path fill="#64b5f6" d="M23.685.139a.75.75 0 00-.782-.054l-22.5 11.75a.752.752 0 00.104 1.375l19.75 6.75a.753.753 0 00.985-.599l2.75-18.5a.751.751 0 00-.307-.722z"/></svg>'
  },

  /**
   * Collection of messages and topics to be held by the chat bot.
   *
   * @type {Object}
   */
  messages: {},

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
  }
};

/**
 * Outputs warning message to the browser console.
 *
 * @param  {String} msg
 */
/**
 * Outputs warning message to the browser console.
 *
 * @param  {String} msg
 */

function warn(msg) {
  console.log("%c[Courier warn]: ".concat(msg), 'color: #e4ac20');
}

/**
 * Indicates whether the specified value is a string.
 *
 * @param  {*}   value
 * @return {Boolean}
 */

function isString(value) {
  return typeof value === 'string';
}
/**
 * Indicates whether the specified value is an object.
 *
 * @param  {*} value
 * @return {Boolean}
 *
 * @see https://github.com/jashkenas/underscore
 */

function isObject(value) {
  var type = _typeof(value);

  return type === 'function' || type === 'object' && !!value;
}
/**
 * Indicates whether the specified value is a function.
 *
 * @param  {*} value
 * @return {Boolean}
 */

function isFunction(value) {
  return typeof value === 'function';
}
/**
 * Indicates whether the specified value is an array.
 *
 * @param  {*} value
 * @return {Boolean}
 */

function isArray(value) {
  return value.constructor === Array;
}

/**
 * Creates and initializes specified collection of extensions.
 * Each extension receives access to instance of courier and rest of components.
 *
 * @param {Object} courier
 * @param {Object} extensions
 * @param events
 * @returns {Object}
 */

function mount(courier, extensions, events) {
  var components = {};
  Object.keys(extensions).forEach(function (name) {
    if (isFunction(extensions[name])) {
      components[name] = extensions[name](courier, components, events);
    } else {
      warn('Extension must be a function');
    }
  }); // for (const name in extensions) {
  //     if (isFunction(extensions[name])) {
  //         components[name] = extensions[name](courier, components, events);
  //     } else {
  //         warn('Extension must be a function');
  //     }
  // }

  Object.keys(components).forEach(function (name) {
    if (Object.prototype.hasOwnProperty.call(components, name) && isFunction(components[name].mount)) {
      components[name].mount();
    }
  }); // for (const name in components) {
  //     if (components.hasOwnProperty(name) && isFunction(components[name].mount)) {
  //         components[name].mount();
  //     }
  // }

  return components;
}

/**
 * ForEach implementation for Objects.
 *
 * @param  {Object} obj         input object
 * @param  {Object} callback    callback function to be called for each item
 * @param  {Object} thisArg     reference to input object
 */

function objectForEach(obj, callback) {
  var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
  Object.keys(obj).forEach(function (key) {
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

function textTemplate(text, template) {
  var output = text;
  objectForEach(template, function (value, key) {
    var regex = new RegExp("{{".concat(key, "}}"));
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

function mergeOptions(defaults, settings) {
  var options = _extends({}, defaults, settings); // `Object.assign` does not deeply merge objects, so we
  // have to do it manually for every nested object
  // in options. Although it does not look smart,
  // it's smaller and faster than some fancy
  // merging deep-merge algorithm script.


  if (Object.hasOwnProperty.call(settings, 'ids')) {
    options.ids = _extends({}, defaults.ids, settings.ids);
  }

  if (Object.hasOwnProperty.call(settings, 'classes')) {
    options.classes = _extends({}, defaults.classes, settings.classes);
  }

  if (Object.hasOwnProperty.call(settings, 'breakpoints')) {
    options.breakpoints = _extends({}, defaults.breakpoints, settings.breakpoints);
  }

  if (Object.hasOwnProperty.call(settings, 'texts')) {
    options.texts = _extends({}, defaults.texts, settings.texts);
  }

  if (Object.hasOwnProperty.call(settings, 'textVars')) {
    options.textVars = _extends({}, defaults.textVars, settings.textVars);
  }

  if (Object.hasOwnProperty.call(settings, 'identity')) {
    options.identity = _extends({}, defaults.identity, settings.identity);
  }

  if (Object.hasOwnProperty.call(settings, 'poweredBy')) {
    options.poweredBy = _extends({}, defaults.poweredBy, settings.poweredBy);
  }

  if (Object.hasOwnProperty.call(settings, 'images')) {
    options.images = _extends({}, defaults.images, settings.images);
  }

  if (Object.hasOwnProperty.call(settings, 'messages')) {
    options.messages = _extends({}, defaults.messages, settings.messages);
  }

  if (Object.hasOwnProperty.call(settings, 'cookies')) {
    options.cookies = _extends({}, defaults.cookies, settings.cookies);
  }

  objectForEach(options.texts, function (value, key) {
    options.texts[key] = textTemplate(value, options.textVars);
  });
  return options;
}

var EventsBus = /*#__PURE__*/function () {
  /**
   * Construct a EventBus instance.
   *
   * @param {Object} events
   */
  function EventsBus() {
    var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, EventsBus);

    this.events = events;
    this.hop = events.hasOwnProperty;
  }
  /**
   * Adds listener to the specified event.
   *
   * @param {String|Array} event
   * @param {Function} handler
   * @returns {{remove: remove}}
   */


  _createClass(EventsBus, [{
    key: "on",
    value: function on(event, handler) {
      var _this = this;

      if (isArray(event)) {
        for (var i = 0; i < event.length; i++) {
          this.on(event[i], handler);
        }
      } // Create the event's object if not yet created


      if (!this.hop.call(this.events, event)) {
        this.events[event] = [];
      } // Add the handler to queue


      var index = this.events[event].push(handler) - 1; // Provide handle back for removal of event

      return {
        remove: function remove() {
          delete _this.events[event][index];
        }
      };
    }
    /**
     * Runs registered handlers for specified event.
     *
     * @param {String|Array} event
     * @param {Object=} context
     */

  }, {
    key: "emit",
    value: function emit(event, context) {
      if (isArray(event)) {
        for (var i = 0; i < event.length; i++) {
          this.emit(event[i], context);
        }
      } // If the event doesn't exist, or there's no handlers in queue, just leave


      if (!this.hop.call(this.events, event)) {
        return;
      } // Cycle through events queue, fire!


      this.events[event].forEach(function (item) {
        item(context || {});
      });
    }
  }]);

  return EventsBus;
}();

var Courier = /*#__PURE__*/function () {
  /**
   * Construct courier.
   *
   * @param  {Element|ShadowRoot} element
   * @param  {Object} options
   */
  function Courier(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Courier);

    this._transformers = [];
    this._eventsBus = new EventsBus();
    this.disabled = false;
    this.settings = mergeOptions(defaults, options); // if (isUndefined(element)) {
    //     // shadow root enabled
    //     if (!!(document.head.createShadowRoot || document.head.attachShadow)) {
    //         const dummyRoot = document.createElement('div');
    //         dummyRoot.setAttribute('id', this.settings.ids.dummyRoot);
    //         element = dummyRoot.attachShadow({mode: 'closed'});
    //         document.body.appendChild(dummyRoot);
    //     } else {
    //         element = document.body;
    //     }
    // }

    this.rootElement = element || document.body;
  }
  /**
   * Initializes courier.
   *
   * @param {Object} components Collection of components to initialize.
   * @return {Courier}
   */


  _createClass(Courier, [{
    key: "mount",
    value: function mount$1() {
      var components = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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

  }, {
    key: "mutate",
    value: function mutate() {
      var transformers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

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

  }, {
    key: "update",
    value: function update() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.settings = mergeOptions(this.settings, settings);

      this._eventsBus.emit('update');

      return this;
    }
    /**
     * Destroy instance and revert all changes done by this._components.
     *
     * @return {Courier}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this._eventsBus.emit('destroy');

      return this;
    }
    /**
     * Sets courier into an idle status.
     *
     * @return {Courier}
     */

  }, {
    key: "disable",
    value: function disable() {
      this.disabled = true;
      return this;
    }
    /**
     * Sets courier into an active status.
     *
     * @return {Courier}
     */

  }, {
    key: "enable",
    value: function enable() {
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

  }, {
    key: "on",
    value: function on(event, handler) {
      this._eventsBus.on(event, handler);

      return this;
    }
    /**
     * Gets value of the core options.
     *
     * @return {Object}
     */

  }, {
    key: "settings",
    get: function get() {
      return this._settings;
    }
    /**
     * Sets value of the core options.
     *
     * @param  {Object} object
     */
    ,
    set: function set(object) {
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

  }, {
    key: "disabled",
    get: function get() {
      return this._disabled;
    }
    /**
     * Sets value of the idle status.
     */
    ,
    set: function set(status) {
      this._disabled = !!status;
    }
  }]);

  return Courier;
}();

/*! Reef v7.4.0 | (c) 2020 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/reef */
//
// Variables
//
// Attributes that might be changed dynamically
var dynamicAttributes = ['checked', 'selected', 'value']; // Hold internal helper functions

var _ = {}; // If true, debug mode is enabled

var debug = false; // Create global support variable

var support; //
// Methods
//

/**
 * Check feature support
 */

var checkSupport = function checkSupport() {
  if (!window.DOMParser) return false;
  var parser = new DOMParser();

  try {
    parser.parseFromString('x', 'text/html');
  } catch (err) {
    return false;
  }

  return true;
};

var matches = function matches(elem, selector) {
  return Element.prototype.matches && elem.matches(selector) || Element.prototype.msMatchesSelector && elem.msMatchesSelector(selector) || Element.prototype.webkitMatchesSelector && elem.webkitMatchesSelector(selector);
};
/**
 * More accurately check the type of a JavaScript object
 * @param  {Object} obj The object
 * @return {String}     The object type
 */


var trueTypeOf = function trueTypeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

_.trueTypeOf = trueTypeOf;
/**
 * Throw an error message
 * @param  {String} msg The error message
 */

var err = function err(msg) {
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

var clone = function clone(obj, allowHTML) {
  // Get the object type
  var type = trueTypeOf(obj); // If an object, loop through and recursively encode

  if (type === 'object') {
    var cloned = {};

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = clone(obj[key], allowHTML);
      }
    }

    return cloned;
  } // If an array, create a new array and recursively encode


  if (type === 'array') {
    return obj.map(function (item) {
      return clone(item, allowHTML);
    });
  } // If the data is a string, encode it


  if (type === 'string' && !allowHTML) {
    var temp = document.createElement('div');
    temp.textContent = obj;
    return temp.innerHTML;
  } // Otherwise, return object as is


  return obj;
};
/**
 * Debounce rendering for better performance
 * @param  {Constructor} instance The current instantiation
 */


var debounceRender = function debounceRender(instance) {
  // If there's a pending render, cancel it
  if (instance.debounce) {
    window.cancelAnimationFrame(instance.debounce);
  } // Setup the new render to run at the next animation frame


  instance.debounce = window.requestAnimationFrame(function () {
    instance.render();
  });
};
/**
 * Create settings and getters for data Proxy
 * @param  {Constructor} instance The current instantiation
 * @return {Object}               The setter and getter methods for the Proxy
 */


var dataHandler = function dataHandler(instance) {
  return {
    get: function get(obj, prop) {
      if (['object', 'array'].indexOf(trueTypeOf(obj[prop])) > -1) {
        return new Proxy(obj[prop], dataHandler(instance));
      }

      return obj[prop];
    },
    set: function set(obj, prop, value) {
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


var find = function find(arr, callback) {
  var matches = arr.filter(callback);
  if (matches.length < 1) return null;
  return matches[0];
};
/**
 * Create a proxy from a data object
 * @param  {Object}     options  The options object
 * @param  {Contructor} instance The current Reef instantiation
 * @return {Proxy}               The Proxy
 */


var makeProxy = function makeProxy(options, instance) {
  if (options.setters) return !options.store ? options.data : null;
  return options.data && !options.store ? new Proxy(options.data, dataHandler(instance)) : null;
};
/**
 * Create the Reef object
 * @param {String|Node} elem    The element to make into a component
 * @param {Object}      options The component options
 */


var Reef = function Reef(elem, options) {
  // Make sure an element is provided
  if (!elem && (!options || !options.lagoon)) return err('You did not provide an element to make into a component.'); // Make sure a template is provided

  if (!options || !options.template && !options.lagoon) return err('You did not provide a template for this component.'); // Set the component properties

  var _this = this;

  var _data = makeProxy(options, _this);

  var _store = options.store;
  var _router = options.router;
  var _setters = options.setters;
  var _getters = options.getters;
  _this.debounce = null; // Create properties for stuff

  Object.defineProperties(_this, {
    elem: {
      value: elem
    },
    template: {
      value: options.template
    },
    allowHTML: {
      value: options.allowHTML
    },
    lagoon: {
      value: options.lagoon
    },
    store: {
      value: _store
    },
    attached: {
      value: []
    },
    router: {
      value: _router
    }
  }); // Define setter and getter for data

  Object.defineProperty(_this, 'data', {
    get: function get() {
      return _setters ? clone(_data, true) : _data;
    },
    set: function set(data) {
      if (_store || _setters) return true;
      _data = new Proxy(data, dataHandler(_this));
      debounceRender(_this);
      return true;
    }
  });

  if (_setters && !_store) {
    Object.defineProperty(_this, 'do', {
      value: function value(id) {
        if (!_setters[id]) return err('There is no setter with this name.');
        var args = Array.prototype.slice.call(arguments);
        args[0] = _data;

        _setters[id].apply(_this, args);

        debounceRender(_this);
      }
    });
  }

  if (_getters && !_store) {
    Object.defineProperty(_this, 'get', {
      value: function value(id) {
        if (!_getters[id]) return err('There is no getter with this name.');
        return _getters[id](_data);
      }
    });
  } // Attach to router


  if (_router && 'addComponent' in _router) {
    _router.addComponent(_this);
  } // Attach to store


  if (_store && 'attach' in _store) {
    _store.attach(_this);
  } // Attach linked components


  if (options.attachTo) {
    var _attachTo = trueTypeOf(options.attachTo) === 'array' ? options.attachTo : [options.attachTo];

    _attachTo.forEach(function (coral) {
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


var getStyleMap = function getStyleMap(styles) {
  return styles.split(';').reduce(function (arr, style) {
    var col = style.indexOf(':');

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


var removeStyles = function removeStyles(elem, styles) {
  styles.forEach(function (style) {
    elem.style[style] = '';
  });
};
/**
 * Add or updates styles on an element
 * @param  {Node}  elem   The element
 * @param  {Array} styles The styles to add or update
 */


var changeStyles = function changeStyles(elem, styles) {
  styles.forEach(function (style) {
    elem.style[style.name] = style.value;
  });
};
/**
 * Diff existing styles from new ones
 * @param  {Node}   elem   The element
 * @param  {String} styles The styles the element should have
 */


var diffStyles = function diffStyles(elem, styles) {
  // Get style map
  var styleMap = getStyleMap(styles); // Get styles to remove

  var remove = Array.prototype.filter.call(elem.style, function (style) {
    var findStyle = find(styleMap, function (newStyle) {
      return newStyle.name === style && newStyle.value === elem.style[style];
    });
    return findStyle === null;
  }); // Add and remove styles

  removeStyles(elem, remove);
  changeStyles(elem, styleMap);
};
/**
 * Add attributes to an element
 * @param {Node}  elem The element
 * @param {Array} atts The attributes to add
 */


var addAttributes = function addAttributes(elem, atts) {
  atts.forEach(function (attribute) {
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


var removeAttributes = function removeAttributes(elem, atts) {
  atts.forEach(function (attribute) {
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


var getAttribute = function getAttribute(name, value) {
  return {
    att: name,
    value: value
  };
};
/**
 * Get the dynamic attributes for a node
 * @param  {Node}    node       The node
 * @param  {Array}   atts       The static attributes
 * @param  {Boolean} isTemplate If true, these are for the template
 */


var getDynamicAttributes = function getDynamicAttributes(node, atts, isTemplate) {
  dynamicAttributes.forEach(function (prop) {
    if (!node[prop] && node[prop] !== 0 || isTemplate && node.tagName.toLowerCase() === 'option' && prop === 'selected' || isTemplate && node.tagName.toLowerCase() === 'select' && prop === 'value') return;
    atts.push(getAttribute(prop, node[prop]));
  });
};
/**
 * Get base attributes for a node
 * @param  {Node} node The node
 * @return {Array}     The node's attributes
 */


var getBaseAttributes = function getBaseAttributes(node, isTemplate) {
  return Array.prototype.reduce.call(node.attributes, function (arr, attribute) {
    if ((dynamicAttributes.indexOf(attribute.name) < 0 || isTemplate && attribute.name === 'selected') && (attribute.name.length > 7 ? attribute.name.slice(0, 7) !== 'default' : true)) {
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


var getAttributes = function getAttributes(node, isTemplate) {
  if (node.nodeType !== 1) return [];
  var atts = getBaseAttributes(node, isTemplate);
  getDynamicAttributes(node, atts, isTemplate);
  return atts;
};
/**
 * Diff the attributes on an existing element versus the template
 * @param  {Object} template The new template
 * @param  {Object} elem     The existing DOM node
 */


var diffAtts = function diffAtts(template, elem) {
  var templateAtts = getAttributes(template, true);
  var elemAtts = getAttributes(elem); // Get attributes to remove

  var remove = elemAtts.filter(function (att) {
    if (dynamicAttributes.indexOf(att.att) > -1) return false;
    var getAtt = find(templateAtts, function (newAtt) {
      return att.att === newAtt.att;
    });
    return getAtt === null;
  }); // Get attributes to change

  var change = templateAtts.filter(function (att) {
    var getAtt = find(elemAtts, function (elemAtt) {
      return att.att === elemAtt.att;
    });
    return getAtt === null || getAtt.value !== att.value;
  }); // Add/remove any required attributes

  addAttributes(elem, change);
  removeAttributes(elem, remove);
};
/**
 * Get the type for a node
 * @param  {Node}   node The node
 * @return {String}      The type
 */


var getNodeType = function getNodeType(node) {
  return node.nodeType === 3 ? 'text' : node.nodeType === 8 ? 'comment' : node.tagName.toLowerCase();
};
/**
 * Get the content from a node
 * @param  {Node}   node The node
 * @return {String}      The type
 */


var getNodeContent = function getNodeContent(node) {
  return node.childNodes && node.childNodes.length > 0 ? null : node.textContent;
};
/**
 * Add default attributes to a newly created node
 * @param  {Node}   node The node
 */


var addDefaultAtts = function addDefaultAtts(node) {
  // Only run on elements
  if (node.nodeType !== 1) return; // Check for default attributes
  // Add/remove as needed

  Array.prototype.forEach.call(node.attributes, function (attribute) {
    if (attribute.name.length < 8 || attribute.name.slice(0, 7) !== 'default') return;
    addAttributes(node, [getAttribute(attribute.name.slice(7).toLowerCase(), attribute.value)]);
    removeAttributes(node, [getAttribute(attribute.name, attribute.value)]);
  }); // If there are child nodes, recursively check them

  if (node.childNodes) {
    Array.prototype.forEach.call(node.childNodes, function (childNode) {
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


var diff = function diff(template, elem, polyps) {
  // Get arrays of child nodes
  var domMap = Array.prototype.slice.call(elem.childNodes);
  var templateMap = Array.prototype.slice.call(template.childNodes); // If extra elements in DOM, remove them

  var count = domMap.length - templateMap.length;

  if (count > 0) {
    for (; count > 0; count--) {
      domMap[domMap.length - count].parentNode.removeChild(domMap[domMap.length - count]);
    }
  } // Diff each item in the templateMap


  templateMap.forEach(function (node, index) {
    // If element doesn't exist, create it
    if (!domMap[index]) {
      addDefaultAtts(node);
      elem.appendChild(node.cloneNode(true));
      return;
    } // If element is not the same type, replace it with new element


    if (getNodeType(node) !== getNodeType(domMap[index])) {
      domMap[index].parentNode.replaceChild(node.cloneNode(true), domMap[index]);
      return;
    } // If attributes are different, update them


    diffAtts(node, domMap[index]); // If element is an attached component, skip it

    var isPolyp = polyps.filter(function (polyp) {
      return node.nodeType !== 3 && matches(node, polyp);
    });
    if (isPolyp.length > 0) return; // If content is different, update it

    var templateContent = getNodeContent(node);

    if (templateContent && templateContent !== getNodeContent(domMap[index])) {
      domMap[index].textContent = templateContent;
    } // If target element should be empty, wipe it


    if (domMap[index].childNodes.length > 0 && node.childNodes.length < 1) {
      domMap[index].innerHTML = '';
      return;
    } // If element is empty and shouldn't be, build it up
    // This uses a document fragment to minimize reflows


    if (domMap[index].childNodes.length < 1 && node.childNodes.length > 0) {
      var fragment = document.createDocumentFragment();
      diff(node, fragment, polyps);
      domMap[index].appendChild(fragment);
      return;
    } // If there are existing child elements that need to be modified, diff them


    if (node.childNodes.length > 0) {
      diff(node, domMap[index], polyps);
    }
  });
};
/**
 * If there are linked Reefs, render them, too
 * @param  {Array} polyps Attached Reef components
 */


var renderPolyps = function renderPolyps(polyps, reef) {
  if (!polyps) return;
  polyps.forEach(function (coral) {
    if (coral.attached.indexOf(reef) > -1) return err("".concat(reef.elem, " has attached nodes that it is also attached to, creating an infinite loop."));
    if ('render' in coral) coral.render();
  });
};
/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */


var stringToHTML = function stringToHTML(str) {
  // If DOMParser is supported, use it
  if (support) {
    // Create document
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html'); // If there are items in the head, move them to the body

    if ('head' in doc && 'childNodes' in doc.head && doc.head.childNodes.length > 0) {
      Array.prototype.slice.call(doc.head.childNodes).reverse().forEach(function (node) {
        doc.body.insertBefore(node, doc.body.firstChild);
      });
    }

    return doc.body;
  } // Otherwise, fallback to old-school method


  var dom = document.createElement('div');
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
  var event;
  if (!elem || !name) return err('You did not provide an element or event name.');
  event = new CustomEvent(name, {
    bubbles: true,
    detail: detail
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
  } // Make sure there's a template


  if (!this.template) return err('No template was provided.'); // If elem is an element, use it.
  // If it's a selector, get it.

  var elem = trueTypeOf(this.elem) === 'string' ? document.querySelector(this.elem) : this.elem;
  if (!elem) return err('The DOM element to render your template into was not found.'); // Get the data (if there is any)

  var data = clone((this.store ? this.store.data : this.data) || {}, this.allowHTML); // Get the template

  var template = trueTypeOf(this.template) === 'function' ? this.template(data, this.router ? this.router.current : null) : this.template;
  if (['string', 'number'].indexOf(trueTypeOf(template)) < 0) return; // Diff and update the DOM

  var polyps = this.attached.map(function (polyp) {
    return polyp.elem;
  });
  diff(stringToHTML(template), elem, polyps); // Dispatch a render event

  Reef.emit(elem, 'render', data); // If there are linked Reefs, render them, too

  renderPolyps(this.attached, this); // Return the elem for use elsewhere

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
  var polyps = trueTypeOf(coral) === 'array' ? coral : [coral];
  var instance = this;
  polyps.forEach(function (polyp) {
    var index = instance.attached.indexOf(polyp);
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
}; // Expose the clone method externally


Reef.clone = clone; // Attach internal helpers

Reef._ = _; //
// Set support
//

support = checkSupport();

var EventsBinder = /*#__PURE__*/function () {
  /**
   * Construct a EventsBinder instance.
   *
   * @param {Object} listeners
   */
  function EventsBinder() {
    var listeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, EventsBinder);

    this.listeners = listeners;
  }
  /**
   * Adds event listeners to element.
   *
   * @param  {String|Array} events
   * @param  {Element|Node|Window|Document} el
   * @param  {Function} fn
   * @param  {Boolean|Object} capture
   */


  _createClass(EventsBinder, [{
    key: "on",
    value: function on(events, el, fn) {
      var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (isString(events)) {
        events = [events];
      }

      for (var i = 0; i < events.length; i++) {
        this.listeners[events[i]] = fn;
        el.addEventListener(events[i], this.listeners[events[i]], capture);
      }
    }
    /**
     * Removes event listeners from element.
     *
     * @param  {String|Array} events
     * @param  {Element|Node|Window|Document} el
     * @param  {Boolean|Object} capture
     */

  }, {
    key: "off",
    value: function off(events, el) {
      var capture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (isString(events)) {
        events = [events];
      }

      for (var i = 0; i < events.length; i++) {
        el.removeEventListener(events[i], this.listeners[events[i]], capture);
      }
    }
    /**
     * Destroy collected listeners.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      delete this.listeners;
    }
  }]);

  return EventsBinder;
}();

// eslint-disable-next-line import/no-unresolved
function App (Courier, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var App = {
    refs: {},
    mount: function mount() {
      Events.emit('app.mount.before');
      this.initialize();
      this.bind();
      Events.emit('app.mount.after');
    },

    /**
     * Adds click events.
     */
    bind: function bind() {
      var _this = this;

      Binder.on('click', Components.App.refs.app.elem, function (event) {
        return _this.onClick(event);
      });
      Binder.on('keydown', Components.App.refs.app.elem, function (event) {
        return _this.onKeydown(event);
      });
      Binder.on('render', Components.App.refs.app.elem, function (event) {
        return _this.onRendered(event);
      });
    },

    /**
     * Removes click events.
     */
    unbind: function unbind() {
      Binder.off('click', Components.App.refs.app.elem);
      Binder.off('keydown', Components.App.refs.app.elem);
      Binder.off('render', Components.App.refs.app.elem);
    },

    /**
     * Handles click events.
     *
     * @param  {Object} event
     */
    onClick: function onClick(event) {
      Events.emit('app.click', event);
    },

    /**
     * Handles keydown events.
     *
     * @param  {Object} event
     */
    onKeydown: function onKeydown(event) {
      Events.emit('app.keydown', event);
    },

    /**
     * Handles render events.
     *
     * @param  {Object} event
     */
    onRendered: function onRendered(event) {
      Events.emit('app.rendered', event);
    },

    /**
     * Initialize the app wrapper.
     */
    initialize: function initialize() {
      var componentHtmlArr = [];

      if (Object.prototype.hasOwnProperty.call(Components, 'Chat')) {
        componentHtmlArr.push("<div id=\"courierChat\" class=\"".concat(Courier.settings.classes.chat, "\"></div>"));
      }

      if (Object.prototype.hasOwnProperty.call(Components, 'Popup')) {
        componentHtmlArr.push("<div id=\"courierPopup\" class=\"".concat(Courier.settings.classes.popup, "\"></div>"));
      }

      App.refs.app = new Reef(Courier.rootElement, {
        data: {},
        template: function template(props) {
          return "\n                <div id=\"courierRoot\" class=\"".concat(Courier.settings.classes.root, "\">\n                    ").concat(componentHtmlArr.join(''), "\n                    <div id=\"courierWidget\" class=\"").concat(Courier.settings.classes.widget, "\"></div>\n                </div>");
        }
      });
    },

    /**
     * Render components
     */
    render: function render() {
      App.refs.app.render();
    }
  };
  /**
   * Destroy elements:
   * - on destroy to remove rendered elements
   * - on app.mount.before to rerender elements and apply changes
   */

  Events.on('mount.after', function () {
    App.render();
    Events.emit('app.mounted');
  });
  /**
   * Remove bindings from click:
   * - on destroying to remove added events
   * - on updating to remove events before remounting
   */

  Events.on(['destroy', 'update'], function () {
    App.unbind();
  });
  /**
   * Remount component
   * - on updating to reflect potential changes in settings
   */

  Events.on('update', function () {
    App.mount();
  });
  /**
   * Destroy binder:
   * - on destroying to remove listeners
   */

  Events.on(['destroy'], function () {
    Binder.destroy();
  });
  /**
   * Destroy elements:
   * - on destroy to remove rendered elements
   * - on app.mount.before to rerender elements and apply changes
   */

  Events.on(['destroy', 'app.mount.before'], function () {
    App.refs = {};
  });
  return App;
}

/**
 * Check if the element exists and contains the target element.
 *
 * @param  {Element} el         The DOM element check if it contains the target
 * @param  {Element} target     The target element to check.
 */

function elemContains(el, target) {
  return el && el.contains(target);
}
/**
 * Applies classes from settings to an element
 *
 * @param  {Element|Node} el  The DOM element to check if it's scrolled to the bottom.
 */

function isScrolledToTheBottom(el) {
  return el && el.scrollHeight - el.offsetHeight <= el.scrollTop;
}

/**
 * Set cookie
 * Source: http://www.quirksmode.org/js/cookies.html
 *
 * @param name
 * @param value
 * @param hours
 */
function setCookie(name, value, hours) {
  var expires = '';

  if (hours) {
    var date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    expires = "; expires=".concat(date.toUTCString());
  }

  document.cookie = "".concat(name, "=").concat(value || '').concat(expires, "; path=/");
}
/**
 * Get cookie
 * Source: http://www.quirksmode.org/js/cookies.html
 *
 * @param name
 */

function getCookie(name) {
  var nameEQ = "".concat(name, "=");
  var ca = document.cookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
}

/**
 * Save widget hidden state to cookie
 *
 * @param {Boolean} hidden          If the widget should be hidden
 * @param {Number} duration         Cookie duration in hours
 * @param {string} nameSuffix       Cookie name suffix
 */

function setHidden(hidden, duration) {
  var nameSuffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  setCookie("courier_widget_hidden".concat(nameSuffix), hidden, duration);
}
/**
 * Check if the widget should be hidden
 *
 * @param {string} nameSuffix  Cookie name suffix
 *
 * @returns Object|null
 */

function isHidden() {
  var nameSuffix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return getCookie("courier_widget_hidden".concat(nameSuffix)) === 'true'; // compare to string because the boolean has been stringified when saved in cookie
}

function Widget (Courier, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var Widget = {
    refs: {},
    mount: function mount() {
      Events.emit('widget.mount.before');
      this.initialize();

      if (Courier.settings.cookies.hideWidget.active) {
        if (isHidden(Courier.settings.cookies.hideWidget.nameSuffix)) {
          this.hide(false);
        }
      }

      Events.emit('widget.mount.after');
    },

    /**
     * Handles click events.
     *
     * @param  {Object} event
     */
    onClick: function onClick(event) {
      var courierWidgetButton = Components.App.refs.app.elem.querySelector('#courierWidgetButton');

      if (event.target.matches('#courierWidgetButton') || elemContains(courierWidgetButton, event.target)) {
        Events.emit('widget.clicked');
      }

      var courierWidgetHideButton = Components.App.refs.app.elem.querySelector('#courierWidgetHideButton');

      if (event.target.matches('#courierWidgetHideButton') || elemContains(courierWidgetHideButton, event.target)) {
        this.hide();
      }
    },
    close: function close() {
      this.refs.widget.data.active = false;
      Events.emit('widget.close');
    },
    open: function open() {
      this.refs.widget.data.active = true;
      Events.emit('widget.open');
    },
    hide: function hide() {
      var save = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.refs.widget.data.active = false;

      if (save) {
        setHidden(true, Courier.settings.cookies.hideWidget.duration, Courier.settings.cookies.hideWidget.nameSuffix);
      }

      Events.emit('widget.hide');
    },

    /**
     * Initialize the widget.
     */
    initialize: function initialize() {
      Widget.refs.widget = new Reef('#courierWidget', {
        data: {
          active: true,
          text: Courier.settings.texts.widgetGreeting,
          hideBtnActive: false
        },
        template: function template(props) {
          if (!props.active) {
            return '';
          }

          var hideBtn = props.hideBtnActive ? "\n                        <button id=\"courierWidgetHideButton\" class=\"".concat(Courier.settings.classes.widget, "-hide-btn\" type=\"button\" aria-label=\"Hide widget\">\n                            ").concat(Courier.settings.images.closeBtn, "\n                        </button>\n                        ") : '';
          return "\n                    <div class=\"".concat(Courier.settings.classes.widget, "-wrapper ").concat(Courier.settings.classes.root, "__appear-bottom ").concat(Courier.settings.classes.root, "__anim-timing--half\">\n                        <button id=\"courierWidgetButton\" class=\"").concat(Courier.settings.classes.widget, "-bubble\" type=\"button\" aria-label=\"Open widget\">\n                            <div class=\"").concat(Courier.settings.classes.widget, "-img\" aria-hidden=\"true\">\n                                ").concat(Courier.settings.images.widget, "\n                            </div>\n                            <p>").concat(props.text, "</p>\n                        </button>\n                        ").concat(hideBtn, "\n                    </div>\n                    ");
        },
        attachTo: Components.App.refs.app
      });
    },

    /**
     * Render window outer elements.
     */
    render: function render() {
      Widget.refs.widget.render();
    }
  };
  /**
   * Bind event listeners after App has been mounted and rendered for the first time
   */

  Events.on('app.mounted', function () {
    /**
     * Close the widget when the chat or popup opens
     */
    Events.on(['chat.opened', 'popup.opened'], function () {
      Widget.close();
    });
    /**
     * Open the widget when the chat or popup closes
     */

    Events.on(['chat.closed', 'popup.closed'], function () {
      Widget.refs.widget.data.hideBtnActive = true;
      Widget.open();
    });
  });
  /**
   * Bind event listeners after App has been rendered
   */

  Events.on('app.click', function (event) {
    Widget.onClick(event);
  });
  /**
   * Remove bindings from click:
   * - on destroying to remove added events
   * - on updating to remove events before remounting
   */

  Events.on(['destroy', 'update'], function () {
    Widget.unbind();
  });
  /**
   * Remount component
   * - on updating to reflect potential changes in settings
   */

  Events.on('update', function () {
    Widget.mount();
  });
  /**
   * Destroy binder:
   * - on destroying to remove listeners
   */

  Events.on(['destroy'], function () {
    Binder.destroy();
  });
  /**
   * Destroy elements:
   * - on destroy to remove rendered elements
   * - on widget.mount.before to rerender elements and apply changes
   */

  Events.on(['destroy', 'widget.mount.before'], function () {
    objectForEach(Widget.refs, function (item) {
      if (item.el.parentNode) {
        item.el.parentNode.removeChild(item.el);
      }
    });
    /*
     for (let i = 0; i < App.refs.length; i++) {
     App.refs[i].el.parentNode.removeChild(App.refs[i].el);
     }
     */

    Widget.refs = {};
  });
  return Widget;
}

/**
 * Find a predefined reply from the scenario property in settings.
 *
 * @param  {Object} scenario    Message scenario.
 * @param  {string} msg         The message.
 * @param  {string} path        The topic's path.
 */

function replyFromScenario(scenario, msg, path) {
  if (path && scenario[path]) {
    return scenario[path];
  }

  return null;
}
/**
 * Save all chat messages and last path that was selected
 *
 * @param {Number} messagePath      Array containing the path taken
 * @param {Number} duration         Cookie duration in hours
 * @param {string} nameSuffix       Cookie name suffix
 */

function saveMessagePath(messagePath, duration) {
  var nameSuffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  setCookie("courier_message_path".concat(nameSuffix), JSON.stringify(messagePath), duration);
}
/**
 * Load saved message path that was selected
 *
 * @returns Object|null
 */

function loadMessagePath() {
  var nameSuffix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var cookie = getCookie("courier_message_path".concat(nameSuffix));
  return cookie ? JSON.parse(cookie) : cookie;
}

function Chat (Courier, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();
  var Chat = {
    refs: {},
    scrollToBottom: false,
    messagePath: [],
    mount: function mount() {
      Events.emit('chat.mount.before');
      this.initialize();
      this.startMessage();

      if (Courier.settings.cookies.saveConversation.active) {
        this.restoreMessages();
      }

      Events.emit('chat.mount.after');
    },

    /**
     * Adds click events.
     */
    bind: function bind() {
      var _this = this;

      Binder.on('submit', Components.App.refs.app.elem, function (event) {
        return _this.onSubmit(event);
      });
    },

    /**
     * Removes click events.
     */
    unbind: function unbind() {
      Binder.off('submit', Components.App.refs.app.elem);
    },

    /**
     * Handles click events.
     *
     * @param  {Object} event
     */
    onClick: function onClick(event) {
      // const overlay = Components.App.refs.app.elem.querySelector('#courierChatOverlay');
      var closeBtn = Components.App.refs.app.elem.querySelector('#courierChatCloseBtn');

      if (event.target.matches('#courierPopupCloseBtn') || elemContains(closeBtn, event.target) || event.target.matches('#courierChatOverlay')) {
        this.close();
      }

      if (event.target.matches('[data-courier-topic-id]')) {
        this.triggerTopic(event.target.dataset.courierMessageId, event.target.dataset.courierTopicId);
      }

      return event;
    },

    /**
     * Handles keydown events.
     *
     * @param  {Object} event
     */
    onKeydown: function onKeydown(event) {
      if (event.key === 'Escape') {
        this.close();
      }
    },
    onAppRendered: function onAppRendered(event) {
      // Only run for elements with the #courierChat ID
      if (event.target.matches('#courierChat')) {
        if (this.scrollToBottom) {
          this.scrollLastMessageIntoView();
          this.scrollToBottom = false;
        }
      }
    },

    /**
     * Handles submit events.
     *
     * @param  {Object} event
     */
    onSubmit: function onSubmit(event) {
      var form = Components.App.refs.app.elem.querySelector('#courierChatInteractionsForm');

      if (event.target.matches('#courierChatInteractionsForm') || elemContains(form, event.target)) {
        event.preventDefault();
        var message = form.message.value.trim();

        if (message.length) {
          this.sendMessage({
            text: message,
            outgoing: true
          });
        }

        form.message.value = '';
      }

      return event;
    },
    close: function close() {
      this.refs.chat.data.active = false;
      Events.emit('chat.closed');
    },
    open: function open() {
      this.refs.chat.data.active = true;
      this.scrollToBottom = true; // scroll to bottom when the chat opens

      Events.emit('chat.opened');
    },
    startMessage: function startMessage() {
      var _this2 = this;

      var startMessage = Courier.settings.messages.start;
      if (!startMessage) return; // send the start message after initialization

      if (isArray(startMessage)) {
        startMessage.forEach(function (message) {
          _this2.sendMessage(message);
        });
      } else {
        this.sendMessage(startMessage);
      }
    },
    sendMessage: function sendMessage(message) {
      // user can only send messages when it's their turn
      if (message.outgoing && !this.refs.chat.data.state.userTurn) return; // replace variables in the message using text template

      if (message.text) {
        message.text = textTemplate(message.text, Courier.settings.textVars);
      } // push message to component data


      this.refs.chat.data.messages.push(message); // set whether after render the chat work area should be scrolled to the bottom

      this.scrollToBottom = this.chatIsScrolledToTheBottom();
    },
    triggerTopic: function triggerTopic(messageId, topicId) {
      var topics = this.refs.chat.data.messages[messageId].topics;
      var topic = topics[topicId]; // check if any topic at this level was not already selected

      if (topics.filter(function (t) {
        return t.active;
      }).length === 0) {
        // disable all topics for the message the topic has been triggered from
        topics.forEach(function (item) {
          item.disabled = true;
        });
        topic.active = true; // send topic text as a message from the user

        this.sendMessage({
          text: topic.text,
          outgoing: true
        }); // emit the topic's trigger, if it's set

        if (topic.trigger) {
          this.topicTrigger(topic.trigger);
        }

        this.triggerPath(topic); // push message path

        if (Courier.settings.cookies.saveConversation.active) {
          this.pushMessagePath(messageId, topicId);
        }
      }
    },
    triggerPath: function triggerPath(topic) {
      var _this3 = this;

      // find a reply based on selected path
      var reply = replyFromScenario(Courier.settings.messages, topic.text, topic.path);

      if (reply) {
        if (isArray(reply)) {
          reply.forEach(function (item) {
            _this3.sendMessage(item);
          });
        } else {
          this.sendMessage(reply);
        }
      }
    },
    topicTrigger: function topicTrigger(trigger) {
      Events.emit(trigger);
    },
    chatIsScrolledToTheBottom: function chatIsScrolledToTheBottom() {
      return isScrolledToTheBottom(Components.App.refs.app.elem.querySelector('#courierChatWorkArea'));
    },
    scrollLastMessageIntoView: function scrollLastMessageIntoView() {
      var messages = Components.App.refs.app.elem.querySelectorAll('[data-courier-message-id]');

      if (messages.length) {
        messages[messages.length - 1].scrollIntoView();
      }
    },
    pushMessagePath: function pushMessagePath(messageId, topicId) {
      this.messagePath.push({
        messageId: messageId,
        topicId: topicId
      });
      saveMessagePath(this.messagePath, Courier.settings.cookies.saveConversation.duration, Courier.settings.cookies.saveConversation.nameSuffix);
    },
    restoreMessages: function restoreMessages() {
      var _this4 = this;

      var messagePath = loadMessagePath();

      if (messagePath && isArray(messagePath)) {
        messagePath.forEach(function (item) {
          _this4.triggerTopic(item.messageId, item.topicId);
        });
      }
    },

    /**
     * Initialize the chat.
     */
    initialize: function initialize() {
      Chat.refs.chat = new Reef('#courierChat', {
        data: {
          active: false,
          messageBox: false,
          online: true,
          identity: {
            name: Courier.settings.identity.name,
            website: Courier.settings.identity.website,
            img: {
              src: Courier.settings.identity.logo.src,
              alt: Courier.settings.identity.logo.alt
            }
          },
          text: {
            chatTitle: Courier.settings.texts.chatTitle,
            sendMessage: Courier.settings.texts.sendMessage,
            messagePlaceholder: Courier.settings.texts.messagePlaceholder
          },
          poweredBy: {
            show: Courier.settings.poweredBy.show,
            text: Courier.settings.poweredBy.text,
            img: {
              src: Courier.settings.poweredBy.img.src,
              alt: Courier.settings.poweredBy.img.alt
            },
            url: Courier.settings.poweredBy.url
          },
          messages: [],
          state: {
            userTurn: true
          }
        },
        template: function template(props) {
          if (!props.active) {
            return '';
          }

          var messages = props.messages.map(function (item, index) {
            // generate message html
            var html = item.text ? "\n                            <p class=\"".concat(Courier.settings.classes.chat, "-message ").concat(item.outgoing ? "".concat(Courier.settings.classes.chat, "-message--self") : '', " courier__appear courier__anim-timing--third\" data-courier-message-id=\"").concat(index, "\">").concat(item.text, "</p>") : '';

            if (item.topics) {
              var topicsHtml; // generate topics html

              topicsHtml = item.topics.map(function (topic, topicIndex) {
                return "\n                                <button class=\"".concat(Courier.settings.classes.chat, "-topic ").concat(topic.active ? "".concat(Courier.settings.classes.chat, "-topic--active") : '', "\" data-courier-message-id=\"").concat(index, "\" data-courier-topic-id=\"").concat(topicIndex, "\" ").concat(topic.disabled ? 'disabled' : '', ">").concat(topic.text, "</button>");
              }).join(''); // wrap topics

              topicsHtml = "\n                                <div class=\"m-b\">\n                                    <div class=\"".concat(Courier.settings.classes.chat, "-topics\">\n                                        ").concat(topicsHtml, "\n                                    </div>\n                                </div>"); // merge message and topics html

              html += topicsHtml;
            }

            return html;
          }).join('');
          var messageBox = props.messageBox ? "\n                        <form id=\"courierChatInteractionsForm\" class=\"".concat(Courier.settings.classes.chat, "-interactions\" autocomplete=\"off\">\n                            <input class=\"").concat(Courier.settings.classes.chat, "-message-box\" type=\"text\" name=\"message\" placeholder=\"").concat(props.text.messagePlaceholder, "\" autofocus />\n                            <button class=\"").concat(Courier.settings.classes.chat, "-send-msg-btn\" type=\"submit\" aria-label=\"").concat(props.text.sendMessage, "\">\n                                ").concat(Courier.settings.images.sendMsg, "\n                            </button>\n                        </form>") : '';
          var poweredBy = props.poweredBy.show ? "\n                        <div class=\"".concat(Courier.settings.classes.chat, "-powered-by\">\n                            <a href=\"").concat(props.poweredBy.url, "\" target=\"_blank\" rel=\"nofollow noopener noreferrer\">\n                                <p class=\"m-r--hf\">").concat(props.poweredBy.text, "</p>\n                                <img src=\"").concat(props.poweredBy.img.src, "\" alt=\"").concat(props.poweredBy.img.alt, "\" />\n                            </a>\n                        </div>") : '';
          return "\n                    <div id=\"courierChatOverlay\" class=\"".concat(Courier.settings.classes.chat, "-overlay ").concat(Courier.settings.classes.root, "__fade-in ").concat(Courier.settings.classes.root, "__anim-timing--half\">\n                        <div class=\"").concat(Courier.settings.classes.chat, "-wall ").concat(Courier.settings.classes.root, "__slide-in-bottom ").concat(Courier.settings.classes.root, "__anim-timing--half\">\n                            <div class=\"").concat(Courier.settings.classes.chat, "-header\">\n                                <div class=\"").concat(Courier.settings.classes.chat, "-menu\">\n                                    <div>\n                                        <button id=\"courierChatOptionsBtn\" class=\"").concat(Courier.settings.classes.chat, "-options-btn\" type=\"button\" aria-label=\"Options\" disabled>\n                                            ").concat(Courier.settings.images.options, "\n                                        </button>\n                                    </div>\n                                    <div>\n                                        <p class=\"tx-bold tx-bigger\">").concat(props.text.chatTitle, "</p>\n                                    </div>\n                                    <div>\n                                        <button id=\"courierChatCloseBtn\" class=\"").concat(Courier.settings.classes.chat, "-close-btn\" type=\"button\" aria-label=\"Close\">\n                                            ").concat(Courier.settings.images.closeBtn, "\n                                        </button>\n                                    </div>\n                                </div>\n                                <div class=\"").concat(Courier.settings.classes.chat, "-identity\">\n                                    <div class=\"p-all--hf\">\n                                        <div class=\"").concat(Courier.settings.classes.chat, "-avatar ").concat(props.online ? "".concat(Courier.settings.classes.chat, "--online") : '', "\">\n                                            <img src=\"").concat(props.identity.img.src, "\" alt=\"").concat(props.identity.img.alt, "\" />\n                                        </div>\n                                    </div>\n                                    <div class=\"").concat(Courier.settings.classes.chat, "-name\">\n                                        <p>").concat(props.identity.name, "</p>\n                                        <p><a href=\"").concat(props.identity.website.url, "\" target=\"_blank\" rel=\"nofollow noopener noreferrer\">").concat(props.identity.website.name, "</a></p>\n                                    </div>\n                                </div>\n                            </div>\n                            <div id=\"courierChatWorkArea\" class=\"").concat(Courier.settings.classes.chat, "-work-area\">\n                                ").concat(messages, "\n                            </div>\n                            ").concat(messageBox, "\n                            ").concat(poweredBy, "\n                        </div>\n                    </div>");
        },
        attachTo: Components.App.refs.app,
        allowHTML: true
      });
    },

    /**
     * Render window outer elements.
     */
    render: function render() {
      Chat.refs.chat.render();
    }
  };
  /**
   * Bind event listeners after App has been mounted and rendered for the first time
   */

  Events.on('app.mounted', function () {
    Chat.bind();
    Events.on('chat.close', function () {
      Chat.close();
    });
    Events.on('widget.clicked', function () {
      Chat.open();
    });
  });
  /**
   * Bind event listeners after App has been rendered
   */

  Events.on('app.rendered', function (event) {
    Chat.onAppRendered(event);
  });
  /**
   * Bind event listeners after App has been rendered
   */

  Events.on('app.click', function (event) {
    Chat.onClick(event);
  });
  /**
   * Bind event listeners after App has been rendered
   */

  Events.on('app.keydown', function (event) {
    Chat.onKeydown(event);
  });
  /**
   * Remove bindings from click:
   * - on destroying to remove added events
   * - on updating to remove events before remounting
   */

  Events.on(['destroy', 'update'], function () {
    Chat.unbind();
  });
  /**
   * Remount component
   * - on updating to reflect potential changes in settings
   */

  Events.on('update', function () {
    Chat.mount();
  });
  /**
   * Destroy binder:
   * - on destroying to remove listeners
   */

  Events.on(['destroy'], function () {
    Binder.destroy();
  });
  /**
   * Destroy elements:
   * - on destroy to remove rendered elements
   * - on chat.mount.before to rerender elements and apply changes
   */

  Events.on(['destroy', 'chat.mount.before'], function () {
    objectForEach(Chat.refs, function (item) {
      if (item.el.parentNode) {
        item.el.parentNode.removeChild(item.el);
      }
    });
    /*
     for (let i = 0; i < App.refs.length; i++) {
     App.refs[i].el.parentNode.removeChild(App.refs[i].el);
     }
     */

    Chat.refs = {};
  });
  return Chat;
}

var COMPONENTS = {
  // Required
  App: App,
  Widget: Widget,
  // Optional
  Chat: Chat // Popup,

};

var Courier$1 = /*#__PURE__*/function (_Core) {
  _inherits(Courier, _Core);

  var _super = _createSuper(Courier);

  function Courier() {
    _classCallCheck(this, Courier);

    return _super.apply(this, arguments);
  }

  _createClass(Courier, [{
    key: "mount",
    value: function mount() {
      var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _get(_getPrototypeOf(Courier.prototype), "mount", this).call(this, _extends({}, COMPONENTS, extensions));
    }
  }]);

  return Courier;
}(Courier);

export default Courier$1;
