import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React, { Fragment } from 'react';

import { Style } from '../types';
import { checkComponentProps, run } from '../utils';
import { Separator } from './Separator';

const styles = {
  root: css`
    background: ${sv.white};
    box-shadow: ${sv.elevation3};
    border-radius: ${sv.borderRadiusSmall};
    /* padding: ${sv.defaultPadding}; */

    /* @media ${sv.screenL} {
      padding: ${sv.paddingSmall};
    } */
  `,
  // doubleTopPadding: css`
  //   padding-top: calc(${sv.defaultPadding} * 2);

  //   @media ${sv.screenL} {
  //     padding-top: ${sv.paddingLarge};
  //   }
  // `,
  // doubleBottomPadding: css`
  //   padding-bottom: calc(${sv.defaultPadding} * 2);

  //   @media ${sv.screenL} {
  //     padding-bottom: ${sv.paddingLarge};
  //   }
  // `,
  bodyAndFooter: css`
    > [data-element='body'] {
      padding-bottom: 0;
    }
  `,
  bodyAndHeader: css`
    > [data-element='body'] {
      padding-top: 0;
    }
  `,
  noSpacingBottom: css`
    padding: 0;
    padding-bottom: 3px;
  `,
  header: css`
    padding: ${sv.paddingSmall} ${sv.defaultPadding};
    /* padding-bottom: ${sv.defaultPadding};
    margin-bottom: ${sv.defaultMargin}; */

    @media ${sv.screenL} {
      /* padding-bottom: ${sv.paddingSmall}; */
      /* margin-bottom: ${sv.marginSmall}; */
      padding: ${sv.paddingSmall};
    }
  `,
  body: css`
    /* margin-top: calc(${sv.defaultMargin} * -1);
    margin-bottom: calc(${sv.defaultMargin} * -1);

    @media ${sv.screenL} {
      margin-top: calc(${sv.marginSmall} * -1);
      margin-bottom: calc(${sv.marginSmall} * -1);
    } */
    padding: ${sv.defaultPadding};
    /* padding-bottom: ${sv.defaultPadding};
    margin-bottom: ${sv.defaultMargin}; */

    @media ${sv.screenL} {
      /* padding-bottom: ${sv.paddingSmall}; */
      /* margin-bottom: ${sv.marginSmall}; */
      padding: ${sv.paddingSmall};
    }
  `,
  footer: css`
    /* margin-top: ${sv.defaultMargin};
    padding-top: ${sv.defaultPadding};

    @media ${sv.screenL} {
      margin-top: ${sv.marginSmall};
      padding-top: ${sv.marginSmall};
    } */
    padding: ${sv.paddingSmall} ${sv.defaultPadding};
    /* padding-bottom: ${sv.defaultPadding};
    margin-bottom: ${sv.defaultMargin}; */

    @media ${sv.screenL} {
      /* padding-bottom: ${sv.paddingSmall}; */
      /* margin-bottom: ${sv.marginSmall}; */
      padding: ${sv.paddingSmall};
    }
  `,
  noBodySpacing: css`
    padding: 0;
    padding-top: 3px;
    padding-bottom: 3px;
    /* margin-top: 0;
    margin-bottom: 0;
    margin: calc(${sv.defaultMargin} * -1); */

    @media ${sv.screenL} {
      /* margin: calc(${sv.marginSmall} * -1); */
      padding-top: 0;
      padding-bottom: 0;
    }
  `,
  noFooterSpacing: css`
    padding: 0;
    padding-bottom: 3px;

    @media ${sv.screenL} {
      padding-bottom: 0;
    }
  `,
  noHeaderSpacing: css`
    padding: 0;
    padding-top: 3px;

    @media ${sv.screenL} {
      padding-top: 0;
    }
  `,
  section: css`
    margin-bottom: ${sv.marginLarge};

    @media ${sv.screenL} {
      margin-bottom: ${sv.defaultMargin};
    }

    &:last-of-type {
      margin-bottom: 0 !important;
    }
  `,
  sectionTitle: css`
    color: ${sv.colorSecondary};
    text-transform: uppercase;
    font-weight: 500;
    font-size: 0.9rem;
    margin-bottom: ${sv.marginSmall};

    @media ${sv.screenL} {
      margin-bottom: ${sv.marginExtraSmall};
    }
  `,
};

export interface PanelHeaderProps {
  /** Content of the header */
  children: React.ReactNode;

  /** If true there is no space between the content and the border of the panel */
  noPadding?: boolean;
}

export const PanelHeader = ({ children, noPadding }: PanelHeaderProps) => {
  return (
    <Fragment>
      <div
        className={cx(styles.header, {
          [styles.noHeaderSpacing]: noPadding === true,
        })}>
        {children}
      </div>
      <Separator />
    </Fragment>
  );
};

export interface PanelBodyProps {
  /** Content of the body */
  children: React.ReactNode;

  /** If true there is no (minimal) space between the content and the border of the panel */
  noPadding?: boolean;

  /** Used for style overrides */
  style?: Style;
}

export const PanelBody = ({ children, noPadding, style }: PanelBodyProps) => {
  return (
    <div
      data-element="body"
      style={style}
      className={cx(styles.body, { [styles.noBodySpacing]: noPadding === true })}>
      {children}
    </div>
  );
};

export interface PanelSectionProps {
  /** Content of the section */
  children: React.ReactNode;

  /** Displays a title on the top left of the section */
  title?: string;

  /** Used for style overrides */
  style?: Style;
}

export const PanelSection = ({ children, title, style }: PanelSectionProps) => {
  return (
    <div style={style} className={styles.section}>
      {run(() => {
        if (title) {
          return <div className={styles.sectionTitle}>{title}</div>;
        }
      })}
      {children}
    </div>
  );
};

export interface PanelFooterProps {
  /** Content of the footer */
  children: React.ReactNode;

  /** If true there is no space between the content and the border of the panel */
  noPadding?: boolean;

  /** Used for style overrides */
  style?: Style;
}

export const PanelFooter = ({ children, noPadding, style }: PanelFooterProps) => {
  return (
    <Fragment>
      <Separator />
      <div
        style={style}
        className={cx(styles.footer, {
          [styles.noFooterSpacing]: noPadding === true,
        })}>
        {children}
      </div>
    </Fragment>
  );
};

export interface PanelProps {
  /** Component: PanelHeader, will render as the header of the panel */
  header?: React.ReactElement<typeof PanelHeader>;

  /** Component: PanelBody, will render as the body of the panel. Takes PanelSection as children */
  body: React.ReactElement<typeof PanelBody>;

  /** Component: PanelFooter, will render as the footer of the panel */
  footer?: React.ReactElement<typeof PanelFooter>;

  /** Used for style overrides */
  style?: Style;
}

export const Panel = ({ header, body, footer, style }: PanelProps) => {
  checkComponentProps(
    { header, body, footer },
    {
      header: PanelHeader,
      body: PanelBody,
      footer: PanelFooter,
    },
  );
  return (
    <div
      className={cx(styles.root, {
        [styles.bodyAndFooter]:
          body != null && footer != null && (body?.props as any).noPadding != null,
        [styles.bodyAndHeader]:
          body != null && header != null && (body?.props as any).noPadding != null,
      })}
      style={style}>
      {header}
      {body}
      {footer}
    </div>
  );
};
