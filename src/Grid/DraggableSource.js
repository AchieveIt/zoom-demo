import React, { useState } from 'react';
import Draggable from 'react-draggable';

const DraggableSource = ({
  targetRef,
  dispatch,
  onDrag,
  onStop,
  children,
  ...rest
}) => {
  // item is not visibile if it is inserted.. as the acutual grid item should be displayed then
  const [inserted, setInserted] = useState(false);
  return (
    <div style={{ visibility: inserted ? 'hidden' : 'visible' }}>
      <Draggable {...rest} position={{ x: 0, y: 0 }}>
        {children}
      </Draggable>
    </div>
  );
};

export default DraggableSource;
