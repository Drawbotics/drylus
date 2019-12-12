import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import sv from '@drawbotics/drylus-style-vars';
import Enum from '@drawbotics/enums';

import Flex, { FlexItem, FlexDirections } from '../layout/Flex';
import Margin from '../layout/Margin';
import Title from './Title';
import Text from './Text';
import Paragraph from './Paragraph';
import { Size, Tier } from '../enums';
import { useResponsiveProps } from '../utils/hooks';
import {
  Empty,
  Processing,
  NotFound,
  NotAllowed,
  Failed,
} from '../utils/illustrations';
import { CustomPropTypes } from '../utils';


const styles = {
  root: css`
  `,
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


export const EmptyStateVariations = new Enum(
  'DEFAULT',
  'PROCESSING',
  'NOT_FOUND',
  'NOT_ALLOWED',
  'FAILED',
);


function _getImageForVariation(variation) {
  switch (variation) {
    case EmptyStateVariations.PROCESSING:
      return <Processing />;
    case EmptyStateVariations.NOT_FOUND:
        return <NotFound />;
    case EmptyStateVariations.NOT_ALLOWED:
      return <NotAllowed />;
    case EmptyStateVariations.FAILED:
      return <Failed />;
    default:
      return <Empty />;
  }
}


const EmptyState = ({
  responsive,
  ...rest,
}) => {
  const {
    description,
    title,
    actions: _actions,
    style,
    variation,
    children,
  } = useResponsiveProps(rest, responsive);

  const actions = children != null ? React.Children.map(children, x => x) : _actions;

  return (
    <div style={style} className={styles.root}>
      <Flex direction={FlexDirections.VERTICAL}>
        <FlexItem>
          <div className={styles.image}>
            {_getImageForVariation(variation)}
          </div>
        </FlexItem>
        <FlexItem>
          <Title size={3}>{title}</Title>
        </FlexItem>
        {do {
          if (description) {
            <FlexItem>
              <div className={styles.description}>
                <Paragraph>
                  <Text tier={Tier.SECONDARY}>{description}</Text>
                </Paragraph>
              </div>
            </FlexItem>
          }
        }}
        {do {
          if (actions != null) {
            <FlexItem>
              <Margin size={{ top: Size.DEFAULT }}>
                <Flex>
                  {actions.map((action, i) => (
                    <FlexItem key={i}>
                      <Margin size={{ left: i === 0 ? null : Size.SMALL }}>
                        {action}
                      </Margin>
                    </FlexItem>
                  ))}
                </Flex>
              </Margin>
            </FlexItem>
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
    EmptyStateVariations.DEFAULT,
    EmptyStateVariations.PROCESSING,
    EmptyStateVariations.NOT_FOUND,
    EmptyStateVariations.NOT_ALLOWED,
    EmptyStateVariations.FAILED,
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
  variation: EmptyStateVariations.DEFAULT,
};


export default EmptyState;
