import sv from '@drawbotics/drylus-style-vars';
import {
  Flex,
  FlexDirection,
  FlexItem,
  FlexJustify,
  TextLink,
  Title,
} from '@drawbotics/react-drylus';
import background1 from '~/assets/background-1.svg';
import background2 from '~/assets/background-2.svg';
import background3 from '~/assets/background-3.svg';
import codingGuidelines from '~/assets/coding-guidelines.svg';
import componentKit from '~/assets/component-kit.svg';
import designGuidelines from '~/assets/design-guidelines.svg';
import { css } from 'emotion';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const styles = {
  intro: css`
    position: relative;
    height: 100%;
    width: 100%;
    padding: 0px ${sv.paddingExtraLarge};
    background-image: radial-gradient(${sv.neutralLight} 10%, ${sv.white} 10%);
    background-position: 0 0;
    background-size: 20px 20px;

    @media ${sv.screenM} {
      height: auto;
      padding: ${sv.paddingExtraLarge} ${sv.defaultPadding};
    }
  `,
  imageWrapper: css`
    position: relative;
    width: 300px;
    height: 330px;
    opacity: 0.8;
    transition: ${sv.transitionShort};
    margin: auto;

    > img {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      transition: ${sv.transitionShort};
    }

    [data-element='background'] {
      transform: translateX(-5px);
    }

    [data-element='foreground'] {
      transform: translateX(5px) scale(0.95);
    }

    @media ${sv.screenL} {
      width: 150px;
      height: 160px;
    }
  `,
  item: css`
    text-align: center;
    filter: grayscale(80%);
    transition: ${sv.transitionShort};

    &:hover {
      filter: grayscale(0%);

      [data-element='images'] {
        opacity: 1;

        img {
          transform: none;
        }
      }
    }

    @media ${sv.screenM} {
      filter: grayscale(0%);

      [data-element='images'] {
        opacity: 1;

        img {
          transform: none;
        }
      }
    }
  `,
  link: css`
    position: relative;
    bottom: ${sv.marginSmall};
    right: ${sv.marginSmall};
    text-align: right;

    @media ${sv.screenM} {
      left: 0;
      right: 0;
      width: 100%;
      text-align: center;
      transform: translateY(-100%);
    }
  `,
};

const Item = ({ url, background, foreground, title }) => {
  return (
    <Link to={url}>
      <div className={styles.item}>
        <div className={styles.imageWrapper} data-element="images">
          <img src={background} data-element="background" />
          <img src={foreground} data-element="foreground" />
        </div>
        <Title size={3} responsive={{ L: { size: 4 } }}>
          {title}
        </Title>
      </div>
    </Link>
  );
};

const Intro = () => {
  return (
    <Fragment>
      <Flex
        className={styles.intro}
        justify={FlexJustify.SPACE_AROUND}
        responsive={{
          M: {
            direction: FlexDirection.VERTICAL,
          },
        }}>
        <FlexItem>
          <Item
            title="Component kit"
            url="/component-kit"
            background={background3}
            foreground={componentKit}
          />
        </FlexItem>
        <FlexItem>
          <Item
            title="Design guidelines"
            url="/design-guidelines"
            background={background1}
            foreground={designGuidelines}
          />
        </FlexItem>
        <FlexItem>
          <Item
            title="Coding guidelines"
            url="/coding-guidelines"
            background={background2}
            foreground={codingGuidelines}
          />
        </FlexItem>
      </Flex>
      <div className={styles.link}>
        <a href="https://www.drawbotics.com/" target="_blank" rel="noopener noreferrer">
          <TextLink>Made by Drawbotics</TextLink>
        </a>
      </div>
    </Fragment>
  );
};

export default Intro;
