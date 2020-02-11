import sv from '@drawbotics/drylus-style-vars';
import Enum from '@drawbotics/enums';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import React from 'react';

import { Size, Tier } from '../enums';
import Flex, { FlexDirection, FlexItem } from '../layout/Flex';
import Margin from '../layout/Margin';
import { CustomPropTypes } from '../utils';
import { useResponsiveProps } from '../utils/hooks';
import { Empty, Failed, NotAllowed, NotFound, Processing } from '../utils/illustrations';
import Paragraph from './Paragraph';
import Text from './Text';
import Title from './Title';

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

export const EmptyStateVariation = new Enum(
  'DEFAULT',
  'PROCESSING',
  'NOT_FOUND',
  'NOT_ALLOWED',
  'FAILED',
);

function _getImageForVariation(variation) {
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

const EmptyState = ({ responsive, ...rest }) => {
  const { description, title, actions: _actions, style, variation, children } = useResponsiveProps(
    rest,
    responsive,
  );

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
        {do {
          if (description) {
            <FlexItem>
              <div className={styles.description}>
                <Paragraph>
                  <Text tier={Tier.SECONDARY}>{description}</Text>
                </Paragraph>
              </div>
            </FlexItem>;
          }
        }}
        {do {
          if (actions != null) {
            <FlexItem>
              <Margin size={{ top: Size.DEFAULT }}>
                <Flex>
                  {actions.map((action, i) => (
                    <FlexItem key={i}>
                      <Margin size={{ left: i === 0 ? null : Size.SMALL }}>{action}</Margin>
                    </FlexItem>
                  ))}
                </Flex>
              </Margin>
            </FlexItem>;
          }
        }}
      </Flex>
    </div>
  );
};

EmptyState.propTypes = {
  /** Main title to explain the situation */
  title: PropTypes.string,

  /** Text shown to explain the situation */
  description: PropTypes.string,

  /** DEPRECATED */
  actions: CustomPropTypes.mutuallyExclusive('children', {
    type: PropTypes.arrayOf(PropTypes.node),
    deprecated: true,
  }),

  /** Shown below the illustrations, usually Buttons */
  children: CustomPropTypes.mutuallyExclusive('actions', {
    type: PropTypes.node,
  }),

  /** Used for style overrides */
  style: PropTypes.object,

  variation: PropTypes.oneOf([
    EmptyStateVariation.DEFAULT,
    EmptyStateVariation.PROCESSING,
    EmptyStateVariation.NOT_FOUND,
    EmptyStateVariation.NOT_ALLOWED,
    EmptyStateVariation.FAILED,
  ]),

  /** Reponsive prop overrides */
  responsive: PropTypes.shape({
    XS: PropTypes.object,
    S: PropTypes.object,
    M: PropTypes.object,
    L: PropTypes.object,
    XL: PropTypes.object,
    HUGE: PropTypes.object,
  }),
};

EmptyState.defaultProps = {
  variation: EmptyStateVariation.DEFAULT,
};

export default EmptyState;
