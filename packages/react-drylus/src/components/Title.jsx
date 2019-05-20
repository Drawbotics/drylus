import React from 'react';
import PropTypes from 'prop-types';
import sv from '@drawbotics/style-vars';
import { css, cx } from 'emotion';


const styles = {
  base: css`
    color: ${sv.colorPrimary};
    font-weight: 300;
  `,
  h1: css`
    font-size: 3.4rem;
  `,
  h2: css`
    font-size: 2.4rem;
  `,
  h3: css`
    font-size: 2rem;
  `,
  h4: css`
    font-size: 1.3rem;
    font-weight: 400;
  `,
  noMargin: css`
    margin-top: 0;
    margin-bottom: 0;
  `,
};


const Title = ({ children, size=1, noMargin }) => {
  if (size === 1) {
    return <h1 className={cx(styles.base, styles.h1, { [styles.noMargin]: noMargin })}>{children}</h1>;
  }
  else if (size === 2) {
    return <h2 className={cx(styles.base, styles.h2, { [styles.noMargin]: noMargin })}>{children}</h2>;
  }
  else if (size === 3) {
    return <h3 className={cx(styles.base, styles.h3, { [styles.noMargin]: noMargin })}>{children}</h3>;
  }
  else if (size === 4) {
    return <h3 className={cx(styles.base, styles.h4, { [styles.noMargin]: noMargin })}>{children}</h3>;
  }
  else {
    console.warn('Unsupported title size');
    return '';
  }
};


Title.propTypes = {
  /** Text displayed by the title */
  children: PropTypes.string,

  /** Each number is equivalent to the h[n] in html, smaller value equals larger title */
  size: PropTypes.oneOf([1, 2, 3, 4]),

  /** Use this if you dont want the component to set margin. By default it has some top and bottom margin since it is a textual component */
  noMargin: PropTypes.bool,
};


Title.defaultProps = {
  size: 1,
};


export default Title;
