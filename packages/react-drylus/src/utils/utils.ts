import Dayjs from 'dayjs';
import React from 'react';
import ReactDOM from 'react-dom';

import { Position } from '../enums';

export interface WrapperRefProps {
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

export interface ExtendedNavigator extends Navigator {
  userLanguage?: string;
  browserLanguage?: string;
}

export function getCurrentLocale(): string {
  const navigator = window.navigator as ExtendedNavigator;
  if (navigator.languages != null && navigator.languages.length != null) {
    return navigator.languages[0];
  } else {
    return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en-GB';
  }
}

export function getTimeDifferenceFromToday(_date: Date) {
  const date = Dayjs(_date);
  const today = Dayjs(new Date());
  const minutesDifference = date.diff(today, 'minute');
  const hoursDifference = date.diff(today, 'hour');
  const daysDifference = date.diff(today, 'day');
  const isTomorrow = date.isAfter(today, 'day');
  const isYesterday = date.isBefore(today, 'day');
  const isToday = date.isSame(today, 'day');
  const isSameYear = date.year() == today.year();

  return {
    minutesDifference,
    hoursDifference,
    daysDifference,
    isToday,
    isTomorrow,
    isYesterday,
    isSameYear,
  };
}

export function isFunction(value: any): value is Function {
  return value != null && typeof value === 'function';
}
