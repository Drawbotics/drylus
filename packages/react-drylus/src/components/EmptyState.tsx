import sv from '@drawbotics/drylus-style-vars';
import { css, cx } from 'emotion';
import React from 'react';

import { Size, Tier } from '../enums';
import { Flex, FlexDirection, FlexItem, Margin } from '../layout';
import { Responsive, Style } from '../types';
import { Empty, Failed, NotAllowed, NotFound, Processing, run, useResponsiveProps } from '../utils';
import { Paragraph } from './Paragraph';
import { Text } from './Text';
import { Title } from './Title';

const styles = {
  root: css``,
  image: css`
    width: 250px;

    @media ${sv.screenL} {
      max-width: 170px;
      width: 90%;
      margin: auto;
    }
  `,
  description: css`
    max-width: 500px;
    text-align: center;
  `,
};

export enum EmptyStateVariation {
  DEFAULT = 'DEFAULT',
  PROCESSING = 'PROCESSING',
  NOT_FOUND = 'NOT_FOUND',
  NOT_ALLOWED = 'NOT_ALLOWED',
  FAILED = 'FAILED',
}

function _getImageForVariation(variation: EmptyStateVariation) {
  switch (variation) {
    case EmptyStateVariation.PROCESSING:
      return <Processing />;
    case EmptyStateVariation.NOT_FOUND:
      return <NotFound />;
    case EmptyStateVariation.NOT_ALLOWED:
      return <NotAllowed />;
    case EmptyStateVariation.FAILED:
      return <Failed />;
    default:
      return <Empty />;
  }
}

export interface EmptyStateProps {
  /** Main title to explain the situation */
  title?: string;

  /** Text shown to explain the situation */
  description?: string;

  /** Shown below the illustrations, usually Buttons */
  children?: React.ReactNode;

  /** @default EmptyStateVariation.DEFAULT */
  variation?: EmptyStateVariation;

  /** Alternative to the `variation` prop, you can use this to pass your own image path (best results with SVG) */
  image?: string;

  /** Used for style overrides */
  style?: Style;

  /** Used for style overrides */
  className?: string;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const EmptyState = ({ responsive, ...rest }: EmptyStateProps) => {
  const {
    description,
    title,
    style,
    variation = EmptyStateVariation.DEFAULT,
    children,
    className,
    image,
  } = useResponsiveProps<EmptyStateProps>(rest, responsive);

  const actions = children != null ? React.Children.map(children, (x) => x) : null;

  return (
    <div style={style} className={cx(styles.root, className)}>
      <Flex direction={FlexDirection.VERTICAL}>
        <FlexItem>
          <div className={styles.image}>
            {image != null ? (
              <img style={{ height: '100%', width: '100%' }} src={image} />
            ) : (
              _getImageForVariation(variation)
            )}
          </div>
        </FlexItem>
        <FlexItem>
          <Title style={{ textAlign: 'center' }} size={3}>
            {title}
          </Title>
        </FlexItem>
        {run(() => {
          if (description) {
            return (
              <FlexItem>
                <div className={styles.description}>
                  <Paragraph>
                    <Text tier={Tier.SECONDARY}>{description}</Text>
                  </Paragraph>
                </div>
              </FlexItem>
            );
          }
        })}
        {run(() => {
          if (actions != null) {
            return (
              <FlexItem>
                <Margin size={{ top: Size.DEFAULT }}>
                  <Flex>
                    {actions.map((action, i) => (
                      <FlexItem key={i}>
                        <Margin size={{ left: i === 0 ? undefined : Size.SMALL }}>{action}</Margin>
                      </FlexItem>
                    ))}
                  </Flex>
                </Margin>
              </FlexItem>
            );
          }
        })}
      </Flex>
    </div>
  );
};
