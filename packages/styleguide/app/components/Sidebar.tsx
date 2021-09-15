import sv, { fade } from '@drawbotics/drylus-style-vars';
import {
  Avatar,
  Color,
  Dropdown,
  DropdownOption,
  Flex,
  FlexDirection,
  FlexItem,
  FlexJustify,
  Icon,
  Margin,
  Position,
  Size,
  Tooltip,
} from '@drawbotics/react-drylus';
import { css } from 'emotion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from './Logo';
// @ts-ignore
import Search from './Search';

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

interface SidebarProps {
  color: Color;
  onChangeColor: (color: Color) => void;
}

const Sidebar = ({ color, onChangeColor }: SidebarProps) => {
  const [searchOpen, toggleSearch] = useState(false);

  return (
    <div className={styles.sidebar}>
      <Flex
        style={{ height: '100%' }}
        direction={FlexDirection.VERTICAL}
        justify={FlexJustify.START}>
        <FlexItem>
          <Margin size={{ bottom: Size.SMALL }}>
            <Link to="/">
              <div className={styles.logo}>
                <Logo />
              </div>
            </Link>
          </Margin>
        </FlexItem>
        <FlexItem>
          <Margin size={{ bottom: Size.SMALL }}>
            <div className={styles.button} onClick={() => toggleSearch(true)}>
              <Icon name="search" />
            </div>
          </Margin>
        </FlexItem>
        <FlexItem>
          <Margin size={{ bottom: Size.SMALL }}>
            <Tooltip
              content="Component kit"
              style={{ marginLeft: sv.marginSmall }}
              side={Position.RIGHT}>
              <Link to="/component-kit">
                <div className={styles.button}>
                  <Icon name="package" />
                </div>
              </Link>
            </Tooltip>
          </Margin>
        </FlexItem>
        <FlexItem>
          <Margin size={{ bottom: Size.SMALL }}>
            <Tooltip
              content="Design guidelines"
              style={{ marginLeft: sv.marginSmall }}
              side={Position.RIGHT}>
              <Link to="/design-guidelines">
                <div className={styles.button}>
                  <Icon name="layout" />
                </div>
              </Link>
            </Tooltip>
          </Margin>
        </FlexItem>
        <FlexItem flex>
          <Margin size={{ bottom: Size.SMALL }}>
            <Tooltip
              content="Coding guidelines"
              style={{ marginLeft: sv.marginSmall }}
              side={Position.RIGHT}>
              <Link to="/coding-guidelines">
                <div className={styles.button}>
                  <Icon name="command" />
                </div>
              </Link>
            </Tooltip>
          </Margin>
        </FlexItem>
        <FlexItem>
          <Dropdown
            style={{ right: 'initial', left: 0 }}
            side={Position.TOP}
            trigger={<Avatar color={color} />}>
            {Object.keys(Color).map((color) => (
              <DropdownOption
                onClick={() => onChangeColor(color as Color)}
                key={color}
                text={color}
              />
            ))}
          </Dropdown>
        </FlexItem>
      </Flex>
      <Search open={searchOpen} onClickClose={() => toggleSearch(false)} />
    </div>
  );
};

export default Sidebar;
