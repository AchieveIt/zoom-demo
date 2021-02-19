import React, { useRef, useState, useReducer } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import GridElement from './GridElement';
import layoutReducer from './layoutReducer';
import initialItems from './items';
import Chart from './Chart';

const Grid = (props) => {
  const ref = useRef();
  const [showAddCursor, setShowAddCursor] = useState(false);
  const [layout, dispatch] = useReducer(layoutReducer, initialItems);

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
          width={props.width}
          transformScale={props.zoom}
        >
          {layout.map((item) => (
            <GridElement
              key={'' + item.i}
              style={{ border: '1px solid red' }}
              {...item}
            >
              {item.content}
              {parseFloat(item.i) === 1 && (
                <button
                  style={{
                    border: '1px solid blue',
                    display: 'block',
                    cursor: 'pointer',
                  }}
                  onClick={props.onClick}
                >
                  open modal
                </button>
              )}
              {item.content === 'EE' && <Chart />}
              {item.content === 'AA' && <Chart type="column" height={170} />}
              {item.content === 'DD' && <Chart type="spline" height={310} />}
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