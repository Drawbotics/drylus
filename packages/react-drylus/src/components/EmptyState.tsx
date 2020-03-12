import sv from '@drawbotics/drylus-style-vars';
import { css } from 'emotion';
import React from 'react';
import { Responsive, Style } from 'src/types';

import { Size, Tier } from '../enums';
import { Flex, FlexDirection, FlexItem, Margin } from '../layout';
import {
  Deprecated,
  Empty,
  Failed,
  NotAllowed,
  NotFound,
  Processing,
  run,
  useResponsiveProps,
} from '../utils';
import { Paragraph } from './Paragraph';
import { Text } from './Text';
import { Title } from './Title';

const styles = {
  root: css``,
  image: css`
    width: 300px;

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

interface EmptyStateProps {
  /** Main title to explain the situation */
  title?: string;

  /** Text shown to explain the situation */
  description?: string;

  /** @deprecated use 'children' instead */
  actions?: Array<React.ReactNode>;

  /** Shown below the illustrations, usually Buttons */
  children?: React.ReactNode;

  /** @default EmptyStateVariation.DEFAULT */
  variation?: EmptyStateVariation;

  /** Used for style overrides */
  style?: Style;

  /** Reponsive prop overrides */
  responsive?: Responsive<this>;
}

export const EmptyState = ({ responsive, ...rest }: EmptyStateProps) => {
  const {
    description,
    title,
    actions: _actions,
    style,
    variation = EmptyStateVariation.DEFAULT,
    children,
  } = useResponsiveProps<EmptyStateProps>(rest, responsive);

  const actions = children != null ? React.Children.map(children, (x) => x) : _actions;

  return (
    <div style={style} className={styles.root}>
      <Flex direction={FlexDirection.VERTICAL}>
        <FlexItem>
          <div className={styles.image}>{_getImageForVariation(variation)}</div>
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

EmptyState.propTypes = {
  actions: Deprecated,
};
