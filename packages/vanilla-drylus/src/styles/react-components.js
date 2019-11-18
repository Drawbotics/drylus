import { injectGlobal } from 'emotion';

import '@drawbotics/react-drylus';
import { staticStyles } from '@drawbotics/react-drylus/lib/base/ThemeProvider';


injectGlobal(staticStyles);