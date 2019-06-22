import React, { useState } from 'react';
import { css } from 'emotion';
import sv, { fade } from '@drawbotics/style-vars';
import {
  Icon,
  Margin,
  Sizes,
  Flex,
  FlexItem,
  FlexDirections,
  FlexJustify,
} from '@drawbotics/react-drylus';

import Search from './Search';
// import pages from '../pages';


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


const Logo = () => {
  return (
    <svg x = "0px" y = "0px" width = "100%" height = "100%" viewBox = "0 0 65.375 61.236" >
      <g>
        <g>
          <g>
            <defs>
              <polygon id="SVGID_1_" points="0,49.853 65.375,61.236 28.219,42.138"/>
            </defs>
            <use xlinkHref="#SVGID_1_" overflow="visible" fill="#FFFFFF"/>
            <clipPath id="SVGID_2_">
              <use xlinkHref="#SVGID_1_" overflow="visible"/>
            </clipPath>
            <rect y="42.138" clipPath="url(#SVGID_2_)" fill="#FFFFFF" width="65.375" height="19.098"/>
          </g>
        </g>
      </g>
      <g>
        <g>
          <g>
            <defs>
              <polygon id="SVGID_3_" points="30.284,40.589 65.375,61.236 42.329,0"/>
            </defs>
            <use xlinkHref="#SVGID_3_" overflow="visible" fill="#FFFFFF"/>
            <clipPath id="SVGID_4_">
              <use xlinkHref="#SVGID_3_" overflow="visible"/>
            </clipPath>
            <rect x="30.284" y="0" clipPath="url(#SVGID_4_)" fill="#FFFFFF" width="35.091" height="61.236"/>
          </g>
        </g>
      </g>
      <g>
        <g>
          <g>
            <defs>
              <polygon id="SVGID_5_" points="0,49.853 27.276,39.835 42.329,0"/>
            </defs>
            <use xlinkHref="#SVGID_5_" overflow="visible" fill="#FFFFFF"/>
            <clipPath id="SVGID_6_">
              <use xlinkHref="#SVGID_5_" overflow="visible"/>
            </clipPath>
            <rect y="0" clipPath="url(#SVGID_6_)" fill="#FFFFFF" width="42.329" height="49.854"/>
          </g>
        </g>
      </g>
    </svg>
  );
};


const Sidebar = () => {
  const [ searchOpen, toggleSearch ] = useState(false);
  // console.log(pages)
  return (
    <div className={styles.sidebar}>
      <Flex direction={FlexDirections.VERTICAL} justify={FlexJustify.START}>
        <FlexItem>
          <Margin size={{ bottom: Sizes.SMALL }}>
            <div className={styles.logo}>
              <Logo />
            </div>
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
            <div className={styles.button}>
              <Icon name="menu" />
            </div>
          </Margin>
        </FlexItem>
      </Flex>
      <Search open={searchOpen} onClickClose={() => toggleSearch(false)} />
    </div>
  );
};


export default Sidebar;
