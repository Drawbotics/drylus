import React from 'react';
import ReactDOM from 'react-dom';

import { Position } from '../enums';

interface WrapperRefProps {
  setChildrenRef: (node: any) => void;
}

export class WrapperRef extends React.Component<WrapperRefProps> {
  componentDidMount() {
    const { setChildrenRef } = this.props;
    // eslint-disable-next-line react/no-find-dom-node
    const node = ReactDOM.findDOMNode(this);
    setChildrenRef(node);
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export function getStyleForSide({
  side,
  rect,
  rectComponent,
}: {
  side?: Position;
  rect?: ClientRect;
  rectComponent?: ClientRect;
}) {
  if (rect == null || rectComponent == null) return null;
  const arrowHeight = 12;

  if (side === Position.TOP) {
    return {
      top: rect?.top - rectComponent?.height - arrowHeight,
      left: rect?.left + rect?.width / 2 - rectComponent?.width / 2,
    };
  } else if (side === Position.LEFT) {
    return {
      top: rect?.top + rect?.height / 2 - rectComponent?.height / 2,
      left: rect?.left - rectComponent?.width - arrowHeight,
    };
  } else if (side === Position.RIGHT) {
    return {
      top: rect?.top + rect?.height / 2 - rectComponent?.height / 2,
      left: rect?.left + rect?.width + arrowHeight,
    };
  } else if (side === Position.BOTTOM) {
    return {
      top: rect?.top + rect?.height + arrowHeight,
      left: rect?.left + rect?.width / 2 - rectComponent?.width / 2,
    };
  } else {
    console.warn(`${String(side)} side value provided not supported`);
    return null;
  }
}
