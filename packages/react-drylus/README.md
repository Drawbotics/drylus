# React Drylus

The "root" package for all of the Drawbotics styles (excluding [icons]('../icons') and [variables]('../drylus-style-vars')).

The components are written in React and are styled using [emotion](https://github.com/emotion-js/emotion).

## React Version Support
- Developed and tested against **React 18**
- Peer dependency: `react >= 16.8.0 < 20`
- React 16/17 may still work but are no longer tested

### Migrating from React 16/17 to React 18

If you are upgrading your application to React 18 alongside this package, note the following breaking changes:

- **`ReactDOM.render()` is deprecated.** Use `createRoot` instead:
  ```jsx
  // Before
  import ReactDOM from 'react-dom';
  ReactDOM.render(<App />, document.getElementById('root'));

  // After
  import { createRoot } from 'react-dom/client';
  createRoot(document.getElementById('root')).render(<App />);
  ```

- **`WrapperRef` now renders a `<span style="display: contents">` wrapper.** Components that use `Tooltip`, `Popover`, or other overlay components internally use `WrapperRef` which previously used `ReactDOM.findDOMNode` (removed in React 18 StrictMode). It now wraps children in a transparent `<span>`. This should not affect layout but may affect CSS selectors that rely on direct parent-child relationships.

- **`framer-motion` upgraded from v6 to v12.** If you import `AnimationGroup` or `AnimatedItem`, the `exitBeforeEnter` prop on `AnimatePresence` has been replaced by `mode="wait"`. This is handled internally — no consumer changes needed unless you use framer-motion directly.

- **`react-map-gl` upgraded from v7 to v8.** The `Map` component now imports from `react-map-gl/mapbox` internally. No consumer API changes.

## Development
```
npm run watch
```
And to build for production
```
npm run build
```

The components' code is simply transpiled, no bundles are generated here.

### Some comments
The library exposes the components at the root, to be used as follows:
```jsx
import { ThemeProvider, Button, Icon } from '@drawbotics/react-drylus';
```


**NOTE**: Because of the way `ThemeProvider` styles the elements to be self-contained (mainly affects children nodes, and not the `html` element), it has to be imported _before_ other components (as shown above) otherwise the component-specific styles will not override the base styles from `ThemeProvider`.

---

The library also includes an `Icon` component which can be used as follows:
```jsx
<Icon name="name" />
```

The actual style definitions for the icons are in the `icons` package, which generates a JS index file exporting the CSS string to be passed to the `emotion` string literal. Since we don't use webpack to bundle the components, but still want to include fonts for the icons, we use the CDN link to import them. The link is determined by the `NODE_ENV` variable (automatically set in the npm commands).
