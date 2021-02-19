import React, { useRef } from 'react';
import { pick } from 'lodash';

const GridElement = ({ temp, children, mouseEvent, ...rest }) => {
  const forwardProps = pick(rest, [
    'style',
    'className',
    'onMouseDown',
    'onMouseUp',
    'onTouchEnd',
    'onTouchStart',
  ]);

  const ref = useRef();

  return (
    <div ref={ref} {...forwardProps}>
      {children}
    </div>
  );
};

export default GridElement;
