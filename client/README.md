# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

```
client
├─ .env
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.svg
│  └─ icons.svg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ providers
│  │  │  └─ AppProviders.jsx
│  │  └─ queryClient.js
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ hero.png
│  │  ├─ icons
│  │  ├─ images
│  │  ├─ react.svg
│  │  └─ vite.svg
│  ├─ features
│  │  ├─ auth
│  │  │  ├─ AuthPage.jsx
│  │  │  ├─ components
│  │  │  │  └─ forms
│  │  │  │     ├─ CheckOtpForm.jsx
│  │  │  │     ├─ CheckOtpForm.module.css
│  │  │  │     ├─ SendOtpForm.jsx
│  │  │  │     └─ SendOtpForm.module.css
│  │  │  ├─ hooks
│  │  │  ├─ index.js
│  │  │  ├─ pages
│  │  │  └─ services
│  │  │     └─ auth.service.js
│  │  ├─ cart
│  │  ├─ checkout
│  │  ├─ orders
│  │  ├─ products
│  │  └─ profile
│  ├─ index.css
│  ├─ main.jsx
│  ├─ router
│  │  └─ Router.jsx
│  └─ shared
│     ├─ components
│     │  ├─ common
│     │  ├─ Loader.jsx
│     │  ├─ Loader.module.css
│     │  └─ ui
│     ├─ config
│     │  ├─ api.js
│     │  └─ reactQuery.js
│     ├─ hooks
│     ├─ layouts
│     │  └─ MainLayout.jsx
│     ├─ services
│     └─ utils
│        └─ cookie.js
└─ vite.config.js

```