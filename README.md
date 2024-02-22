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
- `npm run build` - Build `src` files into `dist` folder.
- `npm run build:js` - Build `src` files into `dist` folder.
- `npm run build:css` - Build `src` files into `dist` folder.
### Development
- `npm run clean` - Remove `dist/` directory
- `npm test` - Run tests with linting and coverage results.
- `npm run lint` - Run ESlint with airbnb-config.
- `npm run lint:fix` - Run ESlint with airbnb-config and apply fixes.
- `npm run stylelint` - Run Stylelint.
- `npm run stylelint:fix` - Run Stylelint and apply fixes.

# Installation
Install from the command line:
```shell
npm install @falkan3/courier
```

Install via package.json:
```json
"@falkan3/courier": "^1.3.3"
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
  dummyRoot: 'courierDummyRoot'
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

Collection of text used in components.
```js
texts: {
  widgetGreeting: 'Hello {{name}}!',
  // chat
  close: 'Close',
  options: 'Options',
  chatTitle: 'Chat with us!',
  messagePlaceholder: 'Type something...',
  typing: 'User is typing...',
  sendMessage: 'Send message',
  goToProduct: 'Go to product',
  // popup
  popupContent: ''
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

Collection of used to supply data to optional module instances. Example usage can be found in demo files.
```js
moduleData: {},
```

Settings that are responsible for the state of elements.
```js
state: {
  widgetActiveAtStart: true, // Show the widget immediately after mounting
  hideBtnActiveAtStart: false, // Show the hide widget button from the get-go
  showMessageBox: false, // Show the "type message" box
  messageBoxEnabled: true, // Enable the "type message" box
  customSendMessage: false, // Use custom send message function
  showTimestamp: true, // Show message timestamps
  carouselPeek: 50, // The peeking width of the next carousel slide, in pixels
  showDiscountPercentage: true, // Show the discount percentage above carousel item old price
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
  hideWidget: {
    nameSuffix: '',
    active: true,
    duration: 24
  }
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
- `mount.before` - Called before components have been mounted
- `mount.after` - Called after all components have been mounted. Also used as a callback to render components
- `update` - Called after the update function has been called, modifying the settings
- `destroy`
- `destroy.after`
- `root.keydown` - Keydown event delegation callback
- `app.mount.before` - Called before the app is initialized, that is the template HTML and event bindings
- `app.mount.after` - Called after the app HTML template is parsed and events are bound
- `app.mounted` - App has been mounted and App.render() has been called
- `app.rendered` - App render callback
- `app.click` - Click event delegation callback
- `widget.mount`
- `widget.mounted` - Widget has been mounted and Widget.render() has been called
- `widget.clicked`
- `widget.close` - Close the widget
- `widget.closed`
- `widget.opened`
- `widget.hide` - Hide the widget and save hidden state to cookie
- `widget.hidden` - Called after the hide widget logic
- `chat.mount`
- `chat.mounted` - Chat has been mounted and Chat.render() has been called
- `chat.close` - Close the chat
- `chat.closed`
- `chat.opened`
- `chat.sendMessage`
- `chat.typing` - upcoming
- `chat.stoppedTyping` - upcoming
- `chat.clear` - Clear all chat messages and reinitialize the message scenario
- `popup.mount`
- `popup.mounted` - Popup has been mounted and Popup.render() has been called
- `popup.close`
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
