import whyDidYouRender from '@welldone-software/why-did-you-render';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

whyDidYouRender(React);

ReactDOM.render(<App />, document.querySelector('#styleguide'));
