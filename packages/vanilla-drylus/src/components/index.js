import dropdown from './dropdown';

import { addDocumentReady } from '../utils';


addDocumentReady();


export default {
  dropdown,
  all() {
    dropdown();
  },
}
