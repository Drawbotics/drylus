import sv from '@drawbotics/drylus-style-vars';
import {
  Avatar,
  Color,
  Flex,
  FlexItem,
  FlexSpacer,
  Icon,
  ListTile,
  Padding,
  Separator,
  Size,
  Text,
} from '@drawbotics/react-drylus';
import Logo from '~/components/Logo';
import { css } from 'emotion';
import React from 'react';

const styles = {
  navbar: css`
    width: 100%;
    background: ${sv.neutralDarkest};
  `,
  logo: css`
    width: ${sv.defaultMargin};
  `,
};

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Padding size={{ horizontal: Size.DEFAULT, vertical: Size.SMALL }}>
        <Flex>
          <FlexItem flex>
            <div className={styles.logo}>
              <Logo />
            </div>
          </FlexItem>
          <FlexItem>
            <ListTile
              leading={
                <Icon name="home" style={{ color: sv.colorPrimaryInverse, marginTop: -3 }} />
              }
              title={<Text inversed>Home</Text>}
            />
          </FlexItem>
          <FlexSpacer size={Size.DEFAULT} />
          <FlexItem>
            <Separator vertical style={{ height: 30 }} />
          </FlexItem>
          <FlexSpacer size={Size.DEFAULT} />
          <FlexItem>
            <ListTile
              title={
                <Text inversed style={{ display: 'block', textAlign: 'right' }}>
                  Amber
                </Text>
              }
              subtitle="Sales manager"
              trailing={<Avatar text="A" color={Color.ORANGE} />}
            />
          </FlexItem>
        </Flex>
      </Padding>
    </div>
  );
};
