import React, { useState } from 'react';
import { css } from 'emotion';
import sv from '@drawbotics/drylus-style-vars';
import {
  Drawer,
  DrawerSides,
  Icon,
  Text,
  Sizes,
  ListTile,
  FlexDirections,
  Flex,
  FlexItem,
  Padding,
  FlexAlign,
} from '@drawbotics/react-drylus';
import { Link } from 'react-router-dom';

import Logo from './Logo';


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
  `,
  content: css`
    background: ${sv.neutralDarkest};
    min-height: 100vh;
  `,
  close: css`
    position: absolute;
    top: ${sv.marginSmall};
    right: ${sv.marginSmall};
    color: ${sv.colorPrimaryInverse};
    transition: opacity ${sv.defaultTransitionTime} ease-in-out;
    z-index: 99999999;
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


const MoebileSidebar = () => {
  const [ sidebarOpen, toggleSidebar ] = useState(false);

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo} onClick={() => toggleSidebar(true)}>
        <Logo color={sv.neutralDarkest} />
      </div>
      <div className={styles.close} style={{ opacity: sidebarOpen ? '1' : '0' }}>
        <Icon name="x" />
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
        <div className={styles.content}>
          <div className={styles.header}>
            <Link onClick={() => toggleSidebar(false)} to="/">
              <div className={styles.logo} style={{ height: sv.defaultMargin }}>
                <Logo />
              </div>
            </Link>
          </div>
          <div className={styles.navigation}>
            <Flex direction={FlexDirections.VERTICAL} align={FlexAlign.START}>
              <FlexItem>
                <Padding size={{ top: Sizes.DEFAULT }}>
                  <ListTile
                    leading={<Icon name="search" />}
                    title={<Text inversed size={Sizes.LARGE}>Search</Text>} />
                </Padding>
              </FlexItem>
              <FlexItem>
                <Padding size={{ top: Sizes.LARGE }}>
                  <Link
                    to="/component-kit"
                    onClick={() => toggleSidebar(false)}>
                    <ListTile
                      leading={<Icon name="package" />}
                      title={<Text inversed size={Sizes.LARGE}>Component kit</Text>} />
                  </Link>
                </Padding>
              </FlexItem>
              <FlexItem>
                <Padding size={{ top: Sizes.LARGE }}>
                  <Link
                    to="/coding-guidelines"
                    onClick={() => toggleSidebar(false)}>
                    <ListTile
                      leading={<Icon name="command" />}
                      title={<Text inversed size={Sizes.LARGE}>Coding guidelines</Text>} />
                  </Link>
                </Padding>
              </FlexItem>
              <FlexItem>
                <Padding size={{ top: Sizes.LARGE }}>
                  <Link
                    to="/design-guidelines"
                    onClick={() => toggleSidebar(false)}>
                    <ListTile
                      leading={<Icon name="layout" />}
                      title={<Text inversed size={Sizes.LARGE}>Design guidelines</Text>} />
                  </Link>
                </Padding>
              </FlexItem>
            </Flex>
          </div>
        </div>
      </Drawer>
    </div>
  );
};


export default MoebileSidebar;