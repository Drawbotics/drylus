# React Drylus

The "root" package for all of the Drawbotics styles (excluding [icons]('../icons') and [variables]('../style-vars')).

The components are written in React and are styled using [emotion](https://github.com/emotion-js/emotion).


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
However it also exposes them at the "category" level, thus:
```jsx
import { ThemeProvider } from '@drawbotics/react-drylus/base';
import { Button, Icon } from '@drawbotics/react-drylus/components';
```
This can come useful when we import a lot of components from `react-drylus` and we want to organise imports.

**NOTE**: Because of the way `ThemeProvider` styles the elements to be self-contained (mainly affects children nodes, and not the `html` element), it has to be imported _before_ other components (as shown above) otherwise the component-specific styles will not override the base styles from `ThemeProvider`.

---

The library also includes an `Icon` component which can be used as follows:
```jsx
<Icon name="name" />
```

The actual style definitions for the icons are in the `icons` package, which generates a JS index file exporting the CSS string to be passed to the `emotion` string literal. Since we don't use webpack to bundle the components, but still want to include fonts for the icons, we use the CDN link to import them. The link is determined by the `NODE_ENV` variable (automatically set in the npm commands).
