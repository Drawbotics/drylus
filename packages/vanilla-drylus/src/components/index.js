import dropdown from './dropdown';
import searchInput from './searchInput';

import { addDocumentReady } from '../utils';


addDocumentReady();


export default {
  dropdown,
  searchInput,
  all() {
    dropdown();
    searchInput();
  },
}
