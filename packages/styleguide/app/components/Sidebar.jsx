import React, { useState } from 'react';
import { css } from 'emotion';
import sv, { fade } from '@drawbotics/drylus-style-vars';
import { Link } from 'react-router-dom';
import {
  Icon,
  Margin,
  Sizes,
  Flex,
  FlexItem,
  FlexDirections,
  FlexJustify,
  Tooltip,
  TooltipSides,
} from '@drawbotics/react-drylus';

import Search from './Search';
import Logo from './Logo';


const styles = {
  sidebar: css`
    height: 100%;
    padding: ${sv.paddingSmall};
    background: ${sv.neutralDarkest};
  `,
  logo: css`
    width: ${sv.defaultMargin};
  `,
  button: css`
    border-radius: 1000px;
    height: ${sv.marginLarge};
    width: ${sv.marginLarge};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${sv.white};

    &:hover {
      cursor: pointer;
      background: ${fade(sv.neutralLight, 30)};
    }
  `,
};


const Sidebar = () => {
  const [ searchOpen, toggleSearch ] = useState(false);
  
  return (
    <div className={styles.sidebar}>
      <Flex direction={FlexDirections.VERTICAL} justify={FlexJustify.START}>
        <FlexItem>
          <Margin size={{ bottom: Sizes.SMALL }}>
            <Link to="/">
              <div className={styles.logo}>
                <Logo />
              </div>
            </Link>
          </Margin>
        </FlexItem>
        <FlexItem>
          <Margin size={{ bottom: Sizes.SMALL }}>
            <div className={styles.button} onClick={() => toggleSearch(true)}>
              <Icon name="search" />
            </div>
          </Margin>
        </FlexItem>
        <FlexItem>
          <Margin size={{ bottom: Sizes.SMALL }}>
            <Tooltip
              message="Component kit"
              style={{ marginLeft: sv.marginSmall }}
              side={TooltipSides.RIGHT}>
              <Link to="/component-kit">
                <div className={styles.button}>
                  <Icon name="package" />
                </div>
              </Link>
            </Tooltip>
          </Margin>
        </FlexItem>
        <FlexItem>
          <Margin size={{ bottom: Sizes.SMALL }}>
            <Tooltip
              message="Design guidelines"
              style={{ marginLeft: sv.marginSmall }}
              side={TooltipSides.RIGHT}>
              <Link to="/design-guidelines">
                <div className={styles.button}>
                  <Icon name="layout" />
                </div>
              </Link>
            </Tooltip>
          </Margin>
        </FlexItem>
        <FlexItem>
          <Margin size={{ bottom: Sizes.SMALL }}>
            <Tooltip
              message="Coding guidelines"
              style={{ marginLeft: sv.marginSmall }}
              side={TooltipSides.RIGHT}>
              <Link to="/coding-guidelines">
                <div className={styles.button}>
                  <Icon name="command" />
                </div>
              </Link>
            </Tooltip>
          </Margin>
        </FlexItem>
      </Flex>
      <Search
        open={searchOpen}
        onClickClose={() => toggleSearch(false)} />
    </div>
  );
};


export default Sidebar;
