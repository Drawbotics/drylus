import React, { useState, useEffect } from 'react';
import { css, keyframes } from 'emotion';
import sv from '@drawbotics/drylus-style-vars';
import {
  Drawer,
  DrawerSides,
  Icon,
  Text,
  Size,
  ListTile,
  FlexDirections,
  Flex,
  FlexItem,
  Padding,
  FlexAlign,
  Title,
} from '@drawbotics/react-drylus';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

import Logo from './Logo';
import Search from './Search';
import LinksNavigation from './LinksNavigation';
import codingGuidelines from '../pages/coding-guidelines';
import componentKit from '../pages/component-kit';


const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;


const styles = {
  sidebar: css`
    height: calc(${sv.marginExtraLarge} + ${sv.marginExtraSmall});
    padding: ${sv.paddingExtraSmall};
    padding-left: ${sv.paddingSmall};
    padding-top: ${sv.paddingSmall};
  `,
  logo: css`
    height: 100%;
    display: inline-block;
    margin-right: ${sv.marginSmall};
  `,
  content: css`
    background: ${sv.neutralDarkest};
    min-height: 100vh;
  `,
  close: css`
    position: fixed;
    top: ${sv.marginSmall};
    right: ${sv.marginSmall};
    color: ${sv.colorPrimaryInverse};
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    animation: ${fadeIn} ${sv.defaultTransitionTime} ${sv.defaultTransitionTime} ease-in forwards;
  `,
  header: css`
    padding: ${sv.paddingSmall};
    display: flex;
    align-items: center;
  `,
  navigation: css`
    padding: 0px ${sv.paddingSmall};
    color: ${sv.colorPrimaryInverse};
  `,
  navItem: css`
    padding: ${sv.paddingSmall} 0px;
  `,
};


function _generateLinks(pathname, onClick) {
  if (pathname.includes('component-kit')) {
    return (
      <LinksNavigation
        onClickLink={onClick}
        title="Component kit"
        routes={componentKit}
        base='component-kit' />
    );
  }
  else if (pathname.includes('coding-guidelines')) {
    return (
      <LinksNavigation
        onClickLink={onClick}
        title="Coding guidelines"
        routes={codingGuidelines}
        base='coding-guidelines' />
    );
  }
  else {
    return '';
  }
}


function _getTitleFromPathname(pathname) {
  if (pathname.includes('component-kit')) {
    return 'Component Kit';
  }
  else if (pathname.includes('coding-guidelines')) {
    return 'Coding Guidelines'
  }
  else {
    return '';
  }
}


const MobileSidebar = () => {
  const { pathname } = useLocation();
  const [ sidebarOpen, toggleSidebar ] = useState(false);
  const [ linksVisible, toggleLinks ] = useState(pathname !== '/');
  const [ searchOpen, toggleSearch ] = useState(false);

  const hideAll = () => {
    toggleSidebar(false);
    toggleSearch(false);
  };

  useEffect(() => {
    setTimeout(() => toggleLinks(pathname !== '/'), 500); 
  }, [pathname]);

  const links = _generateLinks(pathname, () => toggleSidebar(false));
  const title = _getTitleFromPathname(pathname);

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo} onClick={() => toggleSidebar(true)}>
        <Logo key={sidebarOpen} color={sv.neutralDarkest} />
      </div>
      <Drawer
        width="auto"
        onClickOverlay={() => toggleSidebar(false)}
        visible={sidebarOpen}
        side={DrawerSides.LEFT}
        asOverlay
        raw
        responsive={{
          M: {
            width: 'auto',
          },
        }}>
        <div className={styles.close} style={{ display: sidebarOpen ? null : 'none' }}>
          <Icon name="x" />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <Link onClick={hideAll} to="/">
              <div className={styles.logo} style={{ height: sv.defaultMargin }}>
                <Logo />
              </div>
            </Link>
            {do {
              if (linksVisible) {
                <Flex>
                  <FlexItem>
                    <Title
                      size={3}
                      style={{ color: sv.colorPrimaryInverse }}>
                      {title}
                    </Title>
                  </FlexItem>
                  <FlexItem>
                    <Padding
                      style={{ display: 'flex' }}
                      size={{ left: Size.LARGE }}>
                      <Icon
                        style={{ color: sv.colorPrimaryInverse }}
                        onClick={() => toggleLinks(false)}
                        name="arrow-left" />
                    </Padding>
                  </FlexItem>
                </Flex>
              }
            }}
          </div>
          {do {
            if (linksVisible) {
              links
            }
            else {
              <div className={styles.navigation}>
                <Flex direction={FlexDirections.VERTICAL} align={FlexAlign.START}>
                  <FlexItem>
                    <Padding size={{ top: Size.DEFAULT }}>
                      <ListTile
                        onClick={() => toggleSearch(true)}
                        leading={<Icon name="search" />}
                        title={<Text inversed size={Size.LARGE}>Search</Text>} />
                    </Padding>
                  </FlexItem>
                  <FlexItem>
                    <Padding size={{ top: Size.LARGE }}>
                      <Link to="/component-kit">
                        <ListTile
                          leading={<Icon name="package" />}
                          title={<Text inversed size={Size.LARGE}>Component kit</Text>} />
                      </Link>
                    </Padding>
                  </FlexItem>
                  <FlexItem>
                    <Padding size={{ top: Size.LARGE }}>
                      <Link to="/design-guidelines">
                        <ListTile
                          leading={<Icon name="layout" />}
                          title={<Text inversed size={Size.LARGE}>Design guidelines</Text>} />
                      </Link>
                    </Padding>
                  </FlexItem>
                  <FlexItem>
                    <Padding size={{ top: Size.LARGE }}>
                      <Link to="/coding-guidelines">
                        <ListTile
                          leading={<Icon name="command" />}
                          title={<Text inversed size={Size.LARGE}>Coding guidelines</Text>} />
                      </Link>
                    </Padding>
                  </FlexItem>
                </Flex>
              </div>
            }
          }}
        </div>
      </Drawer>
      <Search
        open={searchOpen}
        onClickClose={hideAll} />
    </div>
  );
};


export default MobileSidebar;