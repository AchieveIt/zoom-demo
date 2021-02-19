import React, { useRef, useState, useReducer } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import GridElement from './GridElement';
import layoutReducer from './layoutReducer';
import initialItems from './items';

const Grid = (props) => {
  const ref = useRef();
  const [showAddCursor, setShowAddCursor] = useState(false);
  const [layout, dispatch] = useReducer(layoutReducer, initialItems);

  console.log('grid zoom', props.zoom);
  return (
    <div
      className={showAddCursor ? 'adding' : undefined}
      style={{ cursor: showAddCursor ? 'crosshair' : undefined }}
    >
      <div ref={ref}>
        <GridLayout
          className="layout"
          layout={layout}
          onLayoutChange={(layout) => dispatch({ type: 'newLayout', layout })}
          cols={6}
          rowHeight={30}
          width={1440}
          transformScale={props.zoom}
        >
          {layout.map((item) => (
            <GridElement
              key={'' + item.i}
              style={{ border: '1px solid red' }}
              {...item}
            >
              {item.content}
              <div
                className="indicator"
                onClick={() => {
                  if (showAddCursor) {
                    setShowAddCursor(false);

                    const newLayout = layout.concat();
                    newLayout.push({
                      i: newLayout.length.toString(),
                      x: item.x,
                      y: item.y + 1,
                      w: 1,
                      h: 1,
                      content: 'N',
                    });

                    dispatch({ type: 'newLayout', layout: newLayout });
                  }
                }}
              />
            </GridElement>
          ))}
        </GridLayout>
      </div>
    </div>
  );
};

export default Grid;
