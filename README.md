# React Template App

### Overview

This project is a React-based web application. It provides a template for starting new React projects with pre-configured settings,
including routing, state management, and styling.
It's interacting with an API, which configuration details can be found in `.env.example` file.

### Branches and technologies used

`basic` branch:

- React
- TypeScript
- Vite App
- SWC
- Prettier
- Husky
- Material UI
- Styled components
- Redux toolkit
- RTK Query
- React Router

`main` branch - Extends `basic` with additional technologies and functionalities as:

- oAuth - Google login
- React hook forms
- Yup
- Mock up server - MWS
- Vitest
- React Testing Library

### Project Architecture

All files (slices, API, types, etc.) should be in the folder of the particular page using them.

If used in more than one place it should be in the shared folders.

### Setup

1. Clone the repository
2. Run `yarn`/`yarn install` to instal dependencies.
3. Make a copy of `.env.example` file and name it `.env.development`, then add the following value:

   VITE_API_URL= - Application Backend API

   VITE_UNIVERSITIES_API=http://universities.hipolabs.com - Retrieving universities for template tables

   **Note**: Do not commit values to `.env.example` file.

   All environment variables should be prefixed with `VITE_`

For `main` branch there are additional environment variables:

VITE_ENABLE_GOOGLE_LOGIN= - feature flag ("true" or "false" value) for google oAuth
VITE_GOOGLE_OAUTH_CLIENT_ID=949235123306-90kar6sufvv3flu9fs0v04caihimk9k8.apps.googleusercontent.com
VITE_ENABLE_GTM= feature flag ("true" or "false" value) for google tag manager
VITE_GTM_ID=GTM-P9NVMSNQ

VITE_SECRET_MENU_ENABLED= feature flag ("true" or "false" value) controlling whether the secret menu is enabled or not.

**URL and key for tolgee translation**

VITE_APP_TOLGEE_API_URL=https://app.tolgee.io
VITE_APP_TOLGEE_API_KEY=tgpak_g44dom27grxwu3twny4tqzbzgeyhi5jvgvstq2bzgu2ti23ngm

**Note**: To log in with your email you should have access granted.

For access contact bellapavlova@sciant.com or you can generate your own clientId for google
following this guide <https://medium.com/@tony.infisical/guide-to-using-oauth-2-0-to-access-google-apis-dead94d6866d>.

VITE_COUNTRIES_API=https://countriesnow.space/api/v0.1 - Retrieving countries for template registration page drop-down

### Running the application

`yarn dev`

Runs the app in development mode.

You can now open <http://localhost:5173/> to view it in the browser.

`yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

`yarn test`

Runs UI tests

`yarn test --ui`

Runs tests with vitest UI

### Import Aliases

When adding new folder to the project, the alias should be configured in tsconfig.json and vite.config.ts files.

### Login page

Currently login credentials are not stored, which means you can login with any credentials or "Sign in with Google" button

### Secret menu

The secret menu contains a switch button that controls whether the API gets data from the mockup server or over real HTTP requests.
There is a feature flag to enable it under `VITE_SECRET_MENU_ENABLED` environment variable.

The key combination to access the secret menu is `Ctrl + m`.

### Project package.json updates

Project pages should be updated once in 2 weeks.
To track package versions install Version Lens extension for VS Code.

### Development Style Guide Documentation

Our Development Style Guide is located in the src/docs folder.

**Last update date**: 15.05.2024

**Note**: When updating, please change the date above
