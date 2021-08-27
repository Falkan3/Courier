# Courier

![GitHub package.json version](https://img.shields.io/github/package-json/v/Falkan3/Courier?style=for-the-badge)
![npm (scoped)](https://img.shields.io/npm/v/@trafficwatchdog/courier?style=for-the-badge)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@trafficwatchdog/courier?style=for-the-badge)
![GitHub](https://img.shields.io/github/license/Falkan3/Courier?style=for-the-badge)

***This plugin is still a work in progress***

# Description
Courier is a flexible, easy to use and configurable chat foundation. It can be used as:
- A chat-bot, which talks with users using a predefined message scenario tree.
- A fully fledged front facing chat scaffolding.
- A popup with your custom content.

# Features
- **Fully responsive**. Looks great on all screen sizes.
- **Flexible**. Only import components that are needed to keep the size to a minimum.
- **Built in widget**. Uses a widget so as not to annoy users with unprompted popups.
- **Extendable**. Expand upon the core features by adding your own.

# Commands
- `npm run clean` - Remove `dist/` directory
- `npm test` - Run tests with linting and coverage results.
- `npm test:only` - Run tests without linting or coverage.
- `npm test:watch` - Re-run tests on file changes.
- `npm test:prod` - Run tests with minified code.
- `npm run lint` - Run ESlint with airbnb-config.
- `npm run lint:fix` - Run ESlint with airbnb-config and apply fixes.
- `npm run stylelint` - Run Stylelint.
- `npm run stylelint:fix` - Run Stylelint and apply fixes.
- `npm run cover` - Coverage report.
- `npm run build` - Build `src` files into `dist` folder.
- `npm run prepublish` - Hook for npm. Do all the checks before publishing your module.

# Installation
Install from the command line:
```shell
npm install @falkan3/courier
```

Install via package.json:
```json
"@falkan3/courier": "^1.0.7"
```

# Usage
## Complete version
To use the complete version, include the `courier.min.js` file and initialize the plugin:

```html
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

# Settings
These are the available settings:

Collection of internally used HTML ids.
```json
ids: {
  dummyRoot: 'courierDummyRoot',
}
```

Collection of internally used HTML classes.
```json
classes: {
  root: 'courier',
  widget: 'courier__widget',
  chat: 'courier__chat',
  popup: 'courier__popup',
}
```

Collection of modifier classes to be applied to the specified elements
```json
modifierClasses: {
  root: []
}
```
For example:
```json
{
  root: ['your-modifier-class']
}
```

Collection of text used in components.
```json
texts: {
  widgetGreeting: 'Hello!',
  // chat
  chatTitle: 'Chat with us!',
  messagePlaceholder: 'Type something...',
  sendMessage: 'Send message',
  // popup
  popupContent: '',
}
>```

Collection of variables which will replace placeholders in text.
```json
textVars: {}
```

Collection of variables representing the identity of the service owner.
```json
identity: {
  name: 'Company',
  website: {
    name: 'company.com',
    url: 'https://company.com',
  },
  logo: {
    src: 'https://uilogos.co/img/logomark/circle.png',
    alt: 'Company logo',
  }
}

Collection of variables representing the identity of the plugin's maker.
```json
poweredBy: {
    show: true,
    text: 'Powered by',
    img: {
      src: 'https://panel.trafficwatchdog.pl/svg/logo.svg',
      alt: 'TrafficWatchdog'
    },
    url: 'https://trafficwatchdog.pl/'
}

Collection of images and vector graphics.
```json
images: {
  widget: '...',
  closeBtn: '...',
  options: '...',
  sendMsg: '...',
}

Collection of messages and topics to be held by the chat bot.
```json
messages: {},
```

Settings that are responsible for the state of elements.
```json
state: {
  hideBtnActiveAtStart: false,
  showMessageBox: false,
  messageBoxEnabled: true,
  customSendMessage: false
}
```

Collection of cookie variables. All durations are in hours.
```json
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
A list of available events, emitted and listened to:
- `mount.before`
- `mount.after`
- `update`
- `destroy`
- `destroy.after`
- `root.keydown` - Keydown event delegation callback
- `app.mount.before`
- `app.mount.after`
- `app.mounted` - App has been mounted and App.render() has been called
- `app.rendered` - App render callback
- `app.click` - Click event delegation callback
- `widget.mount.before`
- `widget.mount.after`
- `widget.clicked`
- `widget.closed`
- `widget.opened`
- `widget.hidden`
- `chat.mount.before`
- `chat.mount.after`
- `chat.close`
- `chat.closed`
- `chat.opened`
- `chat.sendMessage`
- `chat.typing` - upcoming
- `chat.stoppedTyping` - upcoming
- `popup.mount.before`
- `popup.mount.after`
- `popup.close`
- `popup.closed`
- `popup.opened`

# Compilation
This plugin is modular and features the following modules:
- Chat
- Popup

Only either one of them can be active in the complete version of the Javascript file. The modular file exports all modules, which allows importing only the modules that are required.

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
