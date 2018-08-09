# Drawbotics Style Vars

Style variables used by Drawbotics across different projects.


## Installation

Install it as a any other `npm` package:

```bash
$ npm i @drawbotics/style-vars
```

## Usage

### For JavaScript (with CSS in JS for example):

```javascript
import styleVars from '@drawbotics/style-vars';
import { StyleSheet, css } from 'aphrodite-jss';

const styles = StyleSheet.create({
  myComponent: {
    padding: styleVars.defaultPadding * 0.5,
  },
});
```

### For LESS

```less
@import "~@drawbotics/style-vars/dist/vars.less";

:local(.myComponent) {
  padding: @default-padding * 0.5;
}
```

### For CSS

```css
@import "~@drawbotics/style-vars/dist/vars.css";

:local(.myComponent) {
  padding: calc(var(--default-padding) * 0.5);
}
```
