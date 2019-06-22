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
  ListTile,
  Separator,
} from '@drawbotics/react-drylus';
import sv from '@drawbotics/style-vars';
import { Link } from 'react-router-dom';

// import { generateRoutes } from '../utils';


const styles = {
  results: css`
    min-height: 300px;
    margin-top: ${sv.marginSmall};
  `,
  result: css`
    padding: ${sv.paddingSmall} ${sv.paddingExtraSmall};

    &:hover {
      cursor: pointer;
      background-color: ${sv.neutralLight};
    }
  `,
};


// function groupRoutes() {
//   const listed = generateRoutes(routes);
//   return listed;
// }


function getIconForCategory(category) {
  switch (category) {
    case 'brand':
      return 'tag';
    case 'components':
      return 'package';
    case 'forms':
      return 'server';
    case 'layout':
      return 'layout';
    default:
      return 'sidebar';
  }
}


const Result = ({ category, title, url, onClick }) => {
  const icon = getIconForCategory(category);
  return (
    <Link to={url}>
      <div className={styles.result} onClick={onClick}>
        <ListTile
          title={title}
          subtitle={url}
          leading={<Icon name={icon} />} />
      </div>
    </Link>
  );
}


const Search = ({ open, onClickClose }) => {
  const [ searchTerm, setTerm ] = useState('');
  const [ searching, setSearching ] = useState(false);
  return (
    <Modal
      title="Search documentation"
      visible={open}
      onClickClose={onClickClose}>
      <Input
        onChange={(v) => setTerm(v)}
        value={searchTerm}
        placeholder="Component name, page..."
        suffix={
          <Button
            onClick={() => setSearching(true)}
            category={Categories.BRAND}
            trailing={searching ? <Spinner size={Sizes.SMALL} inversed /> : <Icon name="search" />} />
        } />
      <div className={styles.results}>
        <Result onClick={onClickClose} category="brand" title="Colors" url="/brand/colors" />
        <Separator />
        <Result onClick={onClickClose} category="components" title="Modal" url="/components/modal" />
      </div>
    </Modal>
  );
};


export default Search;
