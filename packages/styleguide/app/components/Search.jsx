import sv from '@drawbotics/drylus-style-vars';
import {
  Button,
  Category,
  EmptyState,
  Icon,
  Input,
  ListTile,
  Margin,
  Modal,
  Separator,
  Size,
  Spinner,
} from '@drawbotics/react-drylus';
import { css } from 'emotion';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import codingGuidelines from '../pages/coding-guidelines';
import componentKit from '../pages/component-kit';
import { generateRouteObjects } from '../utils';

const componentRoutes = generateRouteObjects({ route: componentKit, base: 'component-kit' });
const codingRoutes = generateRouteObjects({ route: codingGuidelines, base: 'coding-guidelines' });

const routes = [...componentRoutes, ...codingRoutes];

const styles = {
  results: css`
    height: 300px;
    margin-top: ${sv.marginSmall};
    overflow: scroll;
  `,
  result: css`
    padding: ${sv.paddingSmall} ${sv.paddingExtraSmall};
    color: ${sv.colorPrimary};

    &:hover {
      cursor: pointer;
      background-color: ${sv.neutralLight};
    }
  `,
};

function _getIconForCategory(category) {
  switch (category) {
    case 'component-kit':
      return 'package';
    case 'coding-guidelines':
      return 'command';
    default:
      return 'sidebar';
  }
}

const Result = ({ category, title, url, onClick }) => {
  const icon = _getIconForCategory(category);
  return (
    <Link to={url}>
      <div className={styles.result} onClick={onClick}>
        <ListTile title={title} subtitle={url} leading={<Icon name={icon} />} />
      </div>
    </Link>
  );
};

const Search = ({ open, onClickClose }) => {
  const [inputValue, setValue] = useState('');
  const [searchTerm, setTerm] = useState('');
  const [searching, setSearching] = useState(false);

  const handleOnChange = (v) => {
    let timeout;
    if (v === '') {
      setSearching(false);
      setValue(v);
      setTerm(v);
      clearTimeout(timeout);
    } else {
      clearTimeout(timeout);
      setValue(v);
      setSearching(true);
      timeout = setTimeout(async () => {
        setSearching(false);
        setTerm(v);
      }, 500);
    }
  };

  const handleOnClose = () => {
    onClickClose();
    setTimeout(() => {
      setValue('');
      setTerm('');
    }, 500);
  };

  const results = searchTerm
    ? routes.filter((route) => {
        return (
          route.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
          route.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : [];

  return (
    <Modal title="Search documentation" visible={open} onClickClose={handleOnClose}>
      <Input
        autoFocus
        onChange={handleOnChange}
        value={inputValue}
        placeholder="Component name, page..."
        suffix={
          <Button
            onClick={() => setSearching(true)}
            category={Category.BRAND}
            trailing={searching ? <Spinner size={Size.SMALL} inversed /> : <Icon name="search" />}
          />
        }
      />
      <div className={styles.results}>
        {do {
          if (searchTerm && results.length > 0) {
            results.map((route, i, array) => (
              <Fragment key={i}>
                <Result
                  onClick={handleOnClose}
                  category={route.base}
                  title={route.name}
                  url={route.url}
                />
                {do {
                  if (i < array.length - 1) {
                    <Separator />;
                  }
                }}
              </Fragment>
            ));
          } else if (searchTerm) {
            <Margin size={{ top: Size.DEFAULT }}>
              <EmptyState description="No results match your search." />
            </Margin>;
          } else {
            <Margin size={{ top: Size.DEFAULT }}>
              <EmptyState description="No results. Type to find documentation." />
            </Margin>;
          }
        }}
      </div>
    </Modal>
  );
};

export default Search;
