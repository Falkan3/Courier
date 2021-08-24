# courier

![GitHub package.json version](https://img.shields.io/github/package-json/v/Falkan3/Courier?style=for-the-badge)
![npm (scoped)](https://img.shields.io/npm/v/@trafficwatchdog/courier?style=for-the-badge)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@trafficwatchdog/courier?style=for-the-badge)
![GitHub](https://img.shields.io/github/license/Falkan3/Courier?style=for-the-badge)

**This plugin is still a work in progress**

Description: TBD

# Features
TBD

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
```
npm install @falkan3/courier
```

Install via package.json:
```
"@falkan3/courier": "^1.0.5"
```

# Settings
These are the available settings:

> Collection of internally used HTML ids.
> ```
> ids: {
>   dummyRoot: 'courierDummyRoot',
> }
> ```

> Collection of internally used HTML classes.
> ```
> classes: {
>   root: 'courier',
>   widget: 'courier__widget',
>   chat: 'courier__chat',
>   popup: 'courier__popup',
> }
> ```

> Collection of modifier classes to be applied to the specified elements
> For example:
> ```
> {root: ['your-modifier-class']}
> ```
> ```
> modifierClasses: {
>   root: []
> }
> ```

> Collection of text used in components.
>```
> texts: {
>   widgetGreeting: 'Hello!',
>	// chat
>	chatTitle: 'Chat with us!',
>	messagePlaceholder: 'Type something...',
>	sendMessage: 'Send message',
>	// popup
>	popupContent: '',
> }
>```

> Collection of variables which will replace placeholders in text.
> ```
> textVars: {}
> ```

> Collection of variables representing the identity of the service owner.
> ```
> identity: {
>   name: 'Company',
>   website: {
>	   name: 'company.com',
>	   url: 'https://company.com',
>   },
>   logo: {
>	   src: 'https://uilogos.co/img/logomark/circle.png',
>	   alt: 'Company logo',
>   }
> }

> Collection of variables representing the identity of the plugin's maker.
> ```
> poweredBy: {
>	 show: true,
>	 text: 'Powered by',
>	 img: {
>	     src: 'https://panel.trafficwatchdog.pl/svg/logo.svg',
>	     alt: 'TrafficWatchdog'
>	 },
>	 url: 'https://trafficwatchdog.pl/'
> }

> Collection of images and vector graphics.
> ```
> images: {
>   widget: '...',
>   closeBtn: '...',
>   options: '...',
>   sendMsg: '...',
> }

> Collection of messages and topics to be held by the chat bot.
> ```
> messages: {},
> ```

> Settings that are responsible for the state of elements.
> ```
> state: {
>   hideBtnActiveAtStart: false,
>   showMessageBox: false,
>   messageBoxEnabled: true,
>   customSendMessage: false
> }
> ```

> Collection of cookie variables. All durations are in hours.
> ```
> cookies: {
>   saveConversation: {
>	    nameSuffix: '',
>	    active: true,
>	    duration: 24
>   },
>   hideWidget: {
>	    nameSuffix: '',
>	    active: true,
>	    duration: 24
>   }
> }
> ```

# Compilation
This plugin is modular and features the following modules:
- Chat
- Popup

Only either one of them can be active in the complete version of the Javascript file. The modular file exports all modules, which allows importing only the modules that are required.

To change which module is to be compiled in the complete version:
- Change the imported modules in the `entry/entry-complete.js` file.
- Change the imported modules in the `src/assets/scss/courier.core.scss` file.
- Run the build command (`npm run build`).

# License

MIT © Adam Kocić (Falkan3)
