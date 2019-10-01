import React from 'react';
import {
  Flex,
  FlexItem,
  FlexJustify,
  Title,
} from '@drawbotics/react-drylus';
import { css } from 'emotion';
import sv from '@drawbotics/drylus-style-vars';
import { Link } from 'react-router-dom';

import background1 from '~/assets/background-1.svg';
import background2 from '~/assets/background-2.svg';
import background3 from '~/assets/background-3.svg';
import codingGuidelines from '~/assets/coding-guidelines.svg';
import componentKit from '~/assets/component-kit.svg';
import designGuidelines from '~/assets/design-guidelines.svg';


const styles = {
  intro: css`
    height: 100%;
    width: 100%;
    padding: 0px ${sv.paddingExtraLarge};
  `,
  imageWrapper: css`
    position: relative;
    width: 300px;
    height: 330px;
    opacity: 0.8;
    transition: ${sv.defaultTransition};

    > img {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
    }
  `,
  item: css`
    text-align: center;
    filter: grayscale(80%);
    transition: ${sv.defaultTransition};

    &:hover {
      filter: grayscale(0%);

      [data-element="images"] {
        opacity: 1;
      }
    }
  `,
};


const Item = ({
  url,
  background,
  foreground,
  title,
}) => {
  return (
    <Link to={url}>
      <div className={styles.item}>
        <div className={styles.imageWrapper} data-element="images">
          <img src={background} />
          <img src={foreground} />
        </div>
        <Title size={3}>{title}</Title>
      </div>
    </Link>
  );
};


const Intro = () => {
  return (
    <Flex className={styles.intro} justify={FlexJustify.SPACE_AROUND}>
      <FlexItem>
        <Item
          title="Design guidelines"
          url="/design-guidelines"
          background={background1}
          foreground={designGuidelines} />
      </FlexItem>
      <FlexItem>
        <Item
          title="Coding guidelines"
          url="/coding-guidelines"
          background={background2}
          foreground={codingGuidelines} />
      </FlexItem>
      <FlexItem>
        <Item
          title="Component kit"
          url="/component-kit"
          background={background3}
          foreground={componentKit} />
      </FlexItem>
    </Flex>
  );
};


export default Intro;