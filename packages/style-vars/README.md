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
import sv from '@drawbotics/style-vars';
import { css } from 'emotion';

const styles = {
  myComponent: css`
    padding: calc(${sv.defaultPadding} * 0.5);
  `,
};
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
