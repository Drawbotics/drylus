import React, { useState } from 'react';
import { css } from 'emotion';
import {
  Modal,
  Input,
  Icon,
  Categories,
  Button,
  Spinner,
  Sizes,
} from '@drawbotics/react-drylus';


const styles = {
  results: css`
    min-height: 300px;
  `,
};


const Search = ({ open, onClickClose }) => {
  const [ searchTerm, setTerm ] = useState('');
  const [ searching, setSearching ] = useState(false);
  return (
    <Modal
      title="Search components"
      visible={open}
      onClickClose={onClickClose}>
      <Input
        onChange={(v) => setTerm(v)}
        value={searchTerm}
        placeholder="Component name..."
        suffix={
          <Button
            onClick={() => setSearching(true)}
            category={Categories.BRAND}
            trailing={searching ? <Spinner size={Sizes.SMALL} inversed /> : <Icon name="search" />} />
        } />
      <div className={styles.results}>

      </div>
    </Modal>
  );
};


export default Search;
