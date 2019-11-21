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
import { Sizes, Tiers } from '../base';
import { useResponsiveProps } from '../utils/hooks';
import {
  Empty,
  Processing,
  NotFound,
  NotAllowed,
  Failed,
} from '../utils/illustrations';


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
    actions,
    style,
    variation,  
  } = useResponsiveProps(rest, responsive);

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
                  <Text tier={Tiers.SECONDARY}>{description}</Text>
                </Paragraph>
              </div>
            </FlexItem>
          }
        }}
        {do {
          if (actions) {
            <FlexItem>
              <Margin size={{ top: Sizes.DEFAULT }}>
                <Flex>
                  {actions.map((action, i) => (
                    <FlexItem key={i}>
                      <Margin size={{ left: i === 0 ? null : Sizes.SMALL }}>
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

  /** Array of components, usually Buttons */
  actions: PropTypes.arrayOf(PropTypes.node),

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
