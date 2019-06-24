import React, { useState, Fragment } from 'react';
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
  EmptyState,
  Margin,
} from '@drawbotics/react-drylus';
import sv from '@drawbotics/style-vars';
import { Link } from 'react-router-dom';

import { generateRouteObjects } from '../utils';
import pages from '../pages';


const routes = generateRouteObjects(pages);


const styles = {
  results: css`
    height: 300px;
    margin-top: ${sv.marginSmall};
    overflow: scroll;
  `,
  result: css`
    padding: ${sv.paddingSmall} ${sv.paddingExtraSmall};

    &:hover {
      cursor: pointer;
      background-color: ${sv.neutralLight};
    }
  `,
};


function _getIconForCategory(category) {
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
  const icon = _getIconForCategory(category);
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
  const [ inputValue, setValue ] = useState('');
  const [ searchTerm, setTerm ] = useState('');
  const [ searching, setSearching ] = useState(false);

  const handleOnChange = (v) => {
    let timeout;
    if (v === '') {
      setSearching(false);
      setValue(v);
      setTerm(v);
      clearTimeout(timeout);
    }
    else {
      clearTimeout(timeout);
      setValue(v);
      setSearching(true);
      timeout = setTimeout(async () => { setSearching(false); setTerm(v); }, 500);
    }
  };

  const handleOnClose = () => {
    onClickClose();
    setTimeout(() => { setValue(''); setTerm('') }, 500);
  };

  return (
    <Modal
      title="Search documentation"
      visible={open}
      onClickClose={handleOnClose}>
      <Input
        onChange={handleOnChange}
        value={inputValue}
        placeholder="Component name, page..."
        suffix={
          <Button
            onClick={() => setSearching(true)}
            category={Categories.BRAND}
            trailing={searching ? <Spinner size={Sizes.SMALL} inversed /> : <Icon name="search" />} />
        } />
      <div className={styles.results}>
        {do {
          if (searchTerm) {
            routes.filter((route) =>
              route.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
              route.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((route, i, array) => (
                <Fragment key={i}>
                  <Result
                    onClick={handleOnClose}
                    category={route.base}
                    title={route.name}
                    url={route.url} />
                  {do {
                    if (i < array.length - 1) {
                      <Separator />
                    }
                  }}
                </Fragment>
              ));
          }
          else {
            <Margin size={{ top: Sizes.DEFAULT }}>
              <EmptyState description="No results. Type to find documentation." />
            </Margin>
          }
        }}
      </div>
    </Modal>
  );
};


export default Search;
