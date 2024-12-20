# Courier

<p align="center"><img src="https://github.com/Falkan3/Courier/blob/master/logo.svg?raw=true" alt="Loom logo" width="300" height="62" /></p>
    
<p align="center">
<a href="https://github.com/Falkan3/Courier/packages/952108"><img src="https://img.shields.io/github/package-json/v/Falkan3/Courier?style=for-the-badge&color=orange&label=VERSION" alt="GitHub package.json version"></a>
<a href="https://github.com/Falkan3/Courier/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Falkan3/Courier?style=for-the-badge" alt="License"></a>
</p>

<p align="center"><em><strong>This plugin is still a work in progress</strong></em></p>

# Description
Courier is a flexible, easy to use and configurable chat foundation. It can be used as:
- A chat-bot, which talks with users using a predefined message scenario tree.
- A fully fledged front facing chat scaffolding.
- A popup with your custom content.

# Screenshots
![courier_chat_collage](https://user-images.githubusercontent.com/15730072/149378446-d7f0208d-b985-4aae-a852-9bb9b55bf9f4.jpg)
![courier_popup_collage](https://user-images.githubusercontent.com/15730072/149379033-554b652b-8a31-4320-8f7a-f7db0569994d.jpg)


# Features
- **Fully responsive**. Looks great on all screen sizes.
- **Flexible**. Only import components that are needed to keep the size to a minimum.
- **Built in widget**. Uses a widget so as not to annoy users with unprompted popups.
- **Extendable**. Expand upon the core features by adding your own.

# Commands
### Build
- `npm run build` - Build `src` files into `dist` folder. This includes both JS and CSS.
- `npm run build:js` - Build only JS files.
- `npm run build:css` - Build only CSS files.
### Development
- `npm run clean` - Remove `dist` directory.
- `npm test` - Run tests with linting and coverage results.
- `npm run lint` - Run ESlint with airbnb-config.
- `npm run lint:fix` - Run ESlint with airbnb-config and apply fixes.
- `npm run stylelint` - Run Stylelint.
- `npm run stylelint:fix` - Run Stylelint and apply fixes.
- `npm i -g npm-check-updates` `ncu -u && npm i` - Update all npm packages to their latest versions.

# Installation
Install from the command line:
```shell
npm install @falkan3/courier
```

Install via package.json:
```json
"@falkan3/courier": "^1.7.0"
```

# Usage
## Complete version
To use the complete version, include the `courier.min.js` file and initialize the plugin:

```html
<link rel="stylesheet" href="/css/courier.core.css">
<script src="/js/courier.min.js"></script>

<script>
    new Courier('#courierRoot').mount()
</script>
```

## Modular version
To use the modular version, import the core and the components you need and initialize the plugin:

```js
import Courier, { Chat } from "@falkan3/courier/dist/js/courier.modular.esm";

new Courier('#courierRoot').mount({ Chat })
```

You can use specific module css if you're only using one of them.

Chat:
```html
<link rel="stylesheet" href="/css/modules/courier.chat.css">
```

Popup:
```html
<link rel="stylesheet" href="/css/modules/courier.popup.css">
```

# Settings
These are the available settings:

Collection of internally used HTML ids.
```js
ids: {
  dummyRootContainer: 'courierDummyRootContainer',
  dummyRoot: 'courierDummyRoot',
}
```

Collection of internally used HTML classes.
```js
classes: {
  root: 'courier',
  widget: 'courier__widget',
  chat: 'courier__chat',
  popup: 'courier__popup'
}
```

Collection of modifier classes to be applied to the specified elements
```js
modifierClasses: {
  root: []
}
```

For example:
```js
{
  root: ['your-modifier-class']
}
```

Create a shadow DOM to separate website CSS from package CSS.
Requires custom CSS injection to style shadow root nested elements.
```js
useShadowRoot: false
```

Own shadow DOM root element (prevents Flash Of Unstyled Content)
```js
const dummyRootContainer = document.createElement('div');
dummyRootContainer.setAttribute('id', 'dummyRootContainer');
const shadowRoot = dummyRootContainer.attachShadow({ mode: 'open' });

// root element for component HTML
const dummyRoot = document.createElement('div');
dummyRoot.setAttribute('id', 'dummyRoot');

// append the nodes
shadowRoot.appendChild(dummyRoot);
document.body.appendChild(dummyRootContainer);

// load all CSS before injecting into shadow root
const links              = [
    { name: 'main CSS', href: '../dist/css/modules/courier.chat.css' },
    { name: 'theme CSS', href: '../dist/css/courier.theme.css' }
];
const styleSheetPromises = [];
const linkEls            = [];
links.forEach((obj) => {
    styleSheetPromises.push(new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.setAttribute('rel', obj.rel ?? 'stylesheet');
        link.setAttribute('href', obj.href);
        // resolve the promise when the stylesheet is loaded
        link.addEventListener('load', resolve);
        linkEls.push(link);
    }));
});
// load inline CSS templates
const templates = [];
templates.push(document.getElementById('courierCustomStyle'));

// Append link elements and templates content
linkEls.forEach((linkEl) => {
    shadowRoot.appendChild(linkEl);
});
templates.forEach((template) => {
    shadowRoot.appendChild(template.content);
});

// initialize Courier
const courier = new Courier(dummyRoot, {...});

// Mount Courier after all CSS has been loaded to prevent Flash Of Unstyled Content
Promise.all(styleSheetPromises).then((values) => {
    console.log('All CSS loaded.');
    courier.mount();
});
```
When `useShadowRoot` is set to `true`, a dummy root will be created inside a shadow DOM, or the passed root element will be used, if it is a shadow DOM type element.

Built-it shadow DOM CSS injection example:
```js
<template id="courierCustomStyle">
    <style>
        .courier .courier__chat-avatar > img {
            object-fit: contain;
        }
    
        .courier .courier__widget-img {
            background-color: #2f75f7;
            color: #fff;
        }
    
        .courier__widget-bubble:hover .courier__widget-img,
        .courier__widget-bubble:focus-visible .courier__widget-img {
            background-color: #4f8fff;
        }
    </style>
</template>

courier._eventsBus.on('mount.shadowRootAppended', () => {
    // make sure shadow DOM is supported
    if (courier.shadowRoot) {
        // append main module CSS
        const mainCss = document.createElement('link');
        mainCss.setAttribute('rel', 'stylesheet');
        mainCss.setAttribute('href', '../dist/css/modules/courier.chat.css');
        mainCss.onload = () => console.log('Main CSS loaded');
        courier.shadowRoot.appendChild(mainCss);
    
        // append theme CSS
        const themeCss = document.createElement('link');
        themeCss.setAttribute('rel', 'stylesheet');
        themeCss.setAttribute('href', '../dist/css/courier.theme.css');
        themeCss.onload = () => console.log('Theme CSS loaded');
        courier.shadowRoot.appendChild(themeCss);
    
        // append inline style using a template
        const template = document.getElementById('courierCustomStyle');
        courier.shadowRoot.appendChild(template.content);
    }
});

courier.mount();
```

Collection of text used in components.
```js
texts: {
  // widget
  widgetGreeting: 'Hello {{name}}!',
  openWidget: 'Open widget', 
  hideWidget: 'Hide widget',
  unreadMessages: 'Unread messages',
  // widget - advanced
  widgetGreetingTitle: 'AI helper',
  widgetName: '',
  // chat
  close: 'Close',
  options: 'Options',
  chatTitle: 'Chat with us!',
  messagePlaceholder: 'Type something...',
  typing: 'User is typing...',
  sendMessage: 'Send message',
  goToProduct: 'Go to product',
  // popup
  popupContent: '', // HTML rendered inside popup
  // carousel
  clipboardButton: 'Copy',
  clipboardTooltip: 'Click to copy',
  clipboardCopy: 'Copied to clipboard',
  clickToApplyDiscount: 'Click to apply discount code',
}
```

Collection of variables which will replace placeholders (for example `{{name}}`) in text.
```js
textVars: {
  name: 'Adam'
}
```

Special variables available inside carousel items (used only for discount badge):

- `discountCode` - The discount code for the given item
- `discountValue` - The calculated value of the discount as a percentage string, for example "35%"

Collection of variables representing the identity of the service owner.
```js
identity: {
  show: true,
  name: 'Company',
  website: {
    name: 'company.com',
    url: 'https://company.com',
  },
  logo: {
    src: '...',
    alt: 'Logo',
    svg: '...'
  }
}
```

Collection of variables representing the identity of the plugin's supplier.
```js
poweredBy: {
    show: true,
    text: 'Powered by',
    img: {
      src: 'https://panel.trafficwatchdog.pl/svg/logo.svg',
      alt: 'TrafficWatchdog'
    },
    url: 'https://trafficwatchdog.pl/'
}
```

Collection of images and vector graphics.
```js
images: {
  widget: '...',
  closeBtn: '...',
  options: '...',
  sendMsg: '...'
}
```

Collection of messages and topics to be held by the chat bot. Example usage can be found in demo files.
```js
messages: {
  start: [
      {
          text: 'Hi! Check out these awesome products!',
          topics: [
              {
                  text: 'Awesome!', // Message text that will be sent
                  path: 'interested', // Path to direct to
                  fullWidth: (bool), // The topic will be full width
                  breakLine: (bool) // Line will be broken after this topic
              },
          ]
      },
  ],
  interested: {...}
},
```

Collection used to supply data to optional module instances. Example usage can be found in demo files.
```js
moduleData: {},
```

Settings that are responsible for the state of elements.
```js
state: {
  widgetActiveAtStart: true, // Show the widget immediately after mounting
  showHideBtn: false, // Enable the hide widget button
  hideBtnActiveAtStart: false, // Show the hide widget button from the get-go
  widgetMinimalizedAtStart: false, // Show the minimalized widget version from the get-go
  showWidgetUnreadMessages: true, // Show unread messages counter when receiving chat messages when the widget is not active
  online: true, // Change the avatar dot color to indicate the online state
  unreadMessages: true, // The counter of messages received while the chat is minimalized
  showOptionsButton: false, // Show the options button in chat header
  showMessageBox: false, // Show the "type message" box
  messageBoxEnabled: true, // Enable the "type message" box
  customSendMessage: false, // Use custom send message function
  showTimestamp: true, // Show message timestamps
  carouselPeek: 50, // The peeking width of the next carousel slide, in pixels
  showDiscountPercentage: true, // Show the discount percentage above carousel item old price
  clipboardCopyMsgDuration: 2500, // The duration of the copy message shown after clicking a coupon code button
  maxMessageLength: 300, // Max length of a message typed into the message box
  widgetStyle: 'simple' (default) | 'advanced' // Used to switch widget appearance
}
```

Collection of cookie variables. All durations are in hours.
```js
cookies: {
  saveConversation: {
    nameSuffix: '',
    active: true,
    duration: 24
  },
  minimalizeWidget: {
    nameSuffix: '',
    active: true,
    duration: 24
  },
  hideWidget: {
    nameSuffix: '',
    active: true,
    duration: 24
  },
  unreadMessages: {
    nameSuffix: '',
    active: true,
    duration: 24
  }
}
```

## Updating settings during runtime

To update settings, call the `update` function.
```js
courierInstance.update({
    texts: {
        widgetGreeting: 'Hello there!'
    },
});
```

# Component data
You can get and set component data like so:
```js
courierInstance._components.Chat.templateData.state.online = true;
``` 
The data is reactive and any changes will cause the component to rerender.
Changing template data is recommended only for state properties not loaded through settings, which can be updated using the `update` method.

# Widget
```js
state: {
    active: Courier.settings.state.widgetActiveAtStart,
    minimalized: false,
    hidden: !Courier.settings.state.widgetActiveAtStart,
    style: Courier.settings.state.widgetStyle,
    hideBtnActive: Courier.settings.state.hideBtnActiveAtStart,
    online: Courier.settings.state.online
}
```

## Chat
```js
state: {
    active: false,
    online: Courier.settings.state.online,
    userTurn: true,
    showOptionsButton: Courier.settings.state.showOptionsButton,
    showMessageBox: Courier.settings.state.showMessageBox,
    messageBoxEnabled: Courier.settings.state.messageBoxEnabled,
    showTimestamp: Courier.settings.state.showTimestamp,
    typing: false,
    maxMessageLength: Courier.settings.state.maxMessageLength
}
```

## Popup
```js
state: {
    active: false,
}
```

# Events
To emit events, use:
```js 
courierInstance._eventsBus.emit('eventName', context);
```  
To bind to events, use:
```js 
courierInstance._eventsBus.on('eventName', (context) => {

});
```  
A list of available events, emitted and listened to:
- `mount.before` - Called before components have been mounted.
- `mount.after` - Called after all components have been mounted. Also used as a callback to render components.
- `update` - Called after the update function has been called, modifying the settings.
- `destroy`
- `destroy.after`
- `root.keydown` - Keydown event delegation callback.
- `app.mount.before` - Called before the app is initialized, that is the template HTML and event bindings.
- `app.mount.after` - Called after the app HTML template is parsed and events are bound.
- `app.mounted` - App has been mounted and App.render() has been called.
- `app.rendered` - General render callback.
- `app.rendered.app` - App component render callback.
- `app.rendered.widget` - Widget component render callback.
- `app.rendered.chat` - Chat component render callback.
- `app.rendered.popup` - Popup render callback.
- `app.click` - Click event delegation callback.
- `widget.mounted` - Widget has been mounted.
- `widget.clicked`
- `widget.close` - Close the widget.
- `widget.closed`
- `widget.opened`
- `widget.hide` - Hide the widget, pass an argument to save hidden state to cookie (true by default).
- `widget.hidden` - Called after the hide widget logic.
- `chat.mounted` - Chat has been mounted.
- `chat.close` - Close the chat.
- `chat.closed`
- `chat.opened`
- `chat.sendMessage` - Called after sending a chat message, before adding to the message stack. Can be used in a custom chat solution.
- `chat.messageReceived` - Called after a message has been received and added to the message stack.
- `chat.messageSent` - Called after a message has been sent and added to the message stack
- `chat.typing` - upcoming
- `chat.stoppedTyping` - upcoming
- `chat.clear` - Clear all chat messages and reinitialize the message scenario.
- `popup.mounted` - Popup has been mounted.
- `popup.close` - Close the popup.
- `popup.closed`
- `popup.opened`

# Compilation
This plugin is modular and features the following modules:
- Chat
- Popup

Only either one of them can be active in the complete version of the Javascript file. The modular file exports all modules, which allows importing only the modules that are required.

## New method
All module bundles are now generated as separate files, in their corresponding folders in the dist directory.

### JS
UMD versions:
- `dist/js/chat/courier.min.js`
- `dist/js/popup/courier.min.js`

ESM versions:
- `dist/js/esm/chat/courier.esm.js`
- `dist/js/esm/popup/courier.esm.js`

### CSS
- `css/modules/courier.chat.min.css`
- `css/modules/courier.popup.min.css`

## Old method
To change which module is to be compiled in the complete version:
- Change the imported modules in the `entry/entry-complete.js` file.
- Change the imported modules in the `src/assets/scss/courier.core.scss` file.
- Run the build command (`npm run build`).

```js
/* Required components */
import App from '../src/components/app';
import Widget from '../src/components/widget';
/* Optional components */
import Chat from '../src/components/chat';
// import Popup from '../src/components/popup';
/* Modules */
/* Chat */
import ChatTriggersModule from '../src/components/modules/chat-triggers';
import ChatCarouselModule from '../src/components/modules/chat-carousel';
/* Popup */
// import PopupCarouselModule from '../src/components/modules/popup-carousel';

const COMPONENTS = {
  /* Required */
  App,
  Widget,
  /* Optional */
  Chat,
  // Popup,
};

export default class Courier extends Core {
  mount(extensions = {}) {
    return super.mount(Object.assign({}, COMPONENTS, extensions));
  }
}
```

# Use it as a real time chat
In order to use Courier as a live chat, you need a websocket server and a way to store chats and messages, for example a database.
A set of events are emitted in key functions, which can be listened to, for example `chat.opened` or `chat.sendMessage`.
You can use them to implement websocket broadcasts. When a message is sent, you can push it to the message stack using the `Chat.pushMessage` function.

# License

MIT © Adam Kocić (Falkan3)
