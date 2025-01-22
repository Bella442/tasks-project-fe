# Sciant React Template App Development Style Guide

This style guide outlines the development practices we follow in our React Template App. It serves as a reference for all team members to understand our coding standards and methodologies.

## Table of Contents

1. [Ordering of Imports in React Files](#1-ordering-of-imports-in-react-files)
2. [Page Folder Structure](#2-page-folder-structure)
3. [Public and Private Page Folders](#3-public-and-private-page-folders)
4. [Constants Folder](#4-constants-folder)
5. [Shared Types Folder](#5-shared-types-folder)
6. [API Folder](#6-api-folder)
7. [Assets Folder](#7-assets-folder)
8. [Lint Configurations](#8-lint-configurations)
9. [Using Prettier and ESLint Extensions for VS Code](#9-using-prettier-and-eslint-extensions-for-vs-code)
10. [Using RTK for Making Requests](#10-using-rtk-for-making-requests)
11. [Making Forms with React-Hook-Forms and Yup](#11-making-forms-with-react-hook-forms-and-yup)
12. [Theme Implementation with useTheme of Material UI](#12-theme-implementation-with-usetheme-of-material-ui)
13. [Using Redux Toolkit for State Management](#13-using-redux-toolkit-for-state-management)
14. [Mock Server with MSW](#14-mock-server-with-msw)
15. [Using React Helmet for Third-party Integration](#15-using-react-helmet-for-third-party-integration)
16. [Using Styled Components for Styling](#16-using-styled-components-for-styling)
17. [Updating of this document](#17-updating-of-this-document)

## 1. Ordering of Imports in React Files

We separate imports into different groups to maintain a clear structure. Between every group, we insert one empty line.

### Import Groups:

1. **React-related libraries** - react, react-router, etc.
2. **Third-party libraries** - Material UI, Lodash, Charts.js, etc.
3. **Internal files from other main route folders** - '@components', '@hooks', '@pages', etc.
4. **Internal utility functions**
5. **Relative paths within the same parent folder**
6. **Style files**

### Example:

```tsx
// React-related libraries
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

// Third-party libraries
import { Button } from "@material-ui/core";
import _ from "lodash";

// Internal files from other main route folders
import { Header } from "@components/Header";
import { useAuth } from "@hooks/useAuth";
import { HomePage } from "@pages/HomePage";

// Internal utility functions
import { formatDate } from "@utils/formatDate";

// Relative paths within the same parent folder
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

// Style files
import "./App.css";
```

## 2. Page Folder Structure

Each page folder contains the following files to maintain a consistent structure and separation of concerns:

- index.tsx: Main component file
- home.api.ts: API calls related to the page
- home.apiValidations.ts: Validation schemas for API calls - NOT READY YET
- home.constants.ts: Constants used in the page
- home.endpoints.ts: API endpoints
- home.types.ts: Type definitions
- test.tsx: Unit tests using React Testing Library
- mockup: Folder containing mock data - NOT READY YET

### Example:

```tsx
/src/pages/Home/
├── home.api.ts
├── home.apiValidations.ts
├── home.constants.ts
├── home.endpoints.ts
├── home.types.ts
├── index.tsx
├── test.tsx
└── mockup/
```

## 3. Public and Private Page Folders

We separate pages into public and private folders. Public is for pages like login and registration, while private is for pages accessible after login.

### Example:

```tsx
/src/pages/
├── public/
│   ├── Login/
│   └── Registration/
└── private/
    ├── Home/
    └── Profile/
```

## 4. Constants Folder

We maintain a constants folder in the root directory for any constants used across the application.

### Example:

```tsx
/src/constants/
├── constants.ts
└── common.ts
```

## 5. Shared Types Folder

We maintain a sharedTypes folder in the root directory for type definitions used across the application.

### Example:

```tsx
/src/sharedTypes/
├── api.ts
└── common.ts
```

## 6. API Folder

We maintain an api folder in the root directory for shared API requests.

### Example:

```tsx
/src/api/
├── shared/api.ts
└── api.ts
```

## 7. Assets Folder

We maintain an assets folder in the root directory for any images used in the application.

### Example:

```tsx
/src/assets/
├── images/logo.png
└── icons/vite.svg
```

## 8. Lint Configurations

We enforce coding standards and styles using ESLint and Prettier.

### Example:

```tsx
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  rules: {
    // Team rules that you can find in .eslint.cjs
  },
};
```

## 9. Using Prettier and ESLint Extensions for VS Code

We recommend using Prettier and ESLint extensions in VS Code to maintain consistent code formatting.

### Installation:

Install ESLint and Prettier extensions from the VS Code marketplace.
Add the following settings to your VS Code configuration:

```tsx
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
}

```

## 10. Using RTK for Making Requests

We use Redux Toolkit (RTK) for managing API requests and state. This helps in maintaining a consistent state management pattern across the application.

### Example:

```tsx
export const universityApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUniversityDataByCountry: builder.query<Array<UniversityData>, string>({
      query: (name) =>
        `${import.meta.env.VITE_UNIVERSITIES_API}/search?country=${name}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetUniversityDataByCountryQuery } = universityApi;
```

## 11. Making Forms with React-Hook-Forms and Yup

We use React Hook Form and Yup for form management and validation due to their simplicity and powerful features.

### Example:

```tsx
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

import Button from "@components/Button/Button";
import FormInputField from "@components/Input/FormInputField";
import Form from "@components/StyledComponents/StyledForm";

import {
  MIN_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH_MESSAGE,
  REQUIRED_MESSAGE,
  WRONG_EMAIL_FORMAT_MESSAGE,
} from "@constants/constants";

interface LoginFormProps {
  handleLogin: () => void;
}

// TODO - change yup schema with zod
const schema = object().shape({
  email: string().email(WRONG_EMAIL_FORMAT_MESSAGE).required(REQUIRED_MESSAGE),
  password: string()
    .required(REQUIRED_MESSAGE)
    .min(MIN_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH_MESSAGE),
});

const LoginForm = (props: LoginFormProps) => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form
      noValidate //Prevents default Chrome email validation
      onSubmit={handleSubmit((data) => {
        console.info(data);
        props.handleLogin();
      })}
    >
      <FormInputField
        autoCompleteAttribute="email"
        control={control}
        data-testid="LoginPage-email"
        name="email"
        placeholder="E-mail"
        type="email"
      />
      <FormInputField
        autoCompleteAttribute="current-password"
        control={control}
        name="password"
        placeholder="Password"
        type="password"
      />
      <Button text="Submit" type="submit" />
    </Form>
  );
};

export default LoginForm;
```

## 12. Theme Implementation with useTheme of Material UI

We implement theming using Material UI's useTheme to ensure a consistent design across the application.

### Example:

```tsx
import { useTheme } from "@material-ui/core/styles";

const ThemedComponent = () => {
  const theme = useTheme();

  return <div style={{ color: theme.palette.primary.main }}>Themed Text</div>;
};
```

## 13. Using Redux Toolkit for State Management

We use Redux Toolkit (RTK) for state management to simplify and standardize state handling.

### Example:

```tsx
// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../pages/Home/homeSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});
```

## 14. Mock Server with MSW

We use MSW (Mock Service Worker) to create a mock server for API requests, facilitating easier testing and development.

### Example:

```tsx
// src/mocks/handlers.ts
import { rest } from "msw";

export const handlers = [
  rest.get("/api/home", (req, res, ctx) => {
    return res(ctx.json({ message: "Hello from MSW" }));
  }),
];

// src/mocks/browser.ts
import { setupWorker } from "msw";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
```

## 15. Using React Helmet for Third-party Integration

We use React Helmet to manage third-party integrations like Google Analytics.

### Example:

```tsx
import { Helmet } from "react-helmet";

const AnalyticsIntegration = () => {
  return (
    <Helmet>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
      ></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_TRACKING_ID');
        `}
      </script>
    </Helmet>
  );
};
```

## 16. Using Styled Components for Styling

We use styled-components for styling instead of CSS or SASS. We also incorporate theming in styled-components.

### Example:

```tsx
import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
`;

const ThemedButton = () => <Button>Click Me</Button>;
```

**Last update date**: 14.06.2024

## Updating of this document

For any additional updates or changes to the style guide, please ensure that they are included in this document.
