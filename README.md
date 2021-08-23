# courier

![GitHub package.json version](https://img.shields.io/github/package-json/v/Falkan3/Courier?style=for-the-badge)
![npm (scoped)](https://img.shields.io/npm/v/@trafficwatchdog/courier?style=for-the-badge)
![GitHub](https://img.shields.io/github/license/Falkan3/Courier?style=for-the-badge)
![David](https://img.shields.io/david/dev/Falkan3/Courier?style=for-the-badge)

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
TBD

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
