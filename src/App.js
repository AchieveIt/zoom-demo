import './App.css';
import React from 'react';
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer,
} from 'react';
import Modal from 'react-modal';
import GridLayout from './Grid/grid';
import styled from 'styled-components/macro';
import DraggableSource from './Grid/DraggableSource';
import layoutReducer from './Grid/layoutReducer';
import initialItems from './Grid/items';
import 'react-resizable/css/styles.css';

const SourceDummyBlock = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid blue;
  display: grid;
  place-items: center;
  margin: 0 20px;
  border-radius: 10px;
`;

Modal.setAppElement('#modal');

const breakpoints = {
  landscape: { 1700: { margins: 80 } },
  portrait: { 1300: { margins: 80 } },
};

export default function App() {
  const [zoom, setZoom] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomContainerHeight, setZoomContainerHeight] = useState(0);
  const [windowwidth, setwindowwidth] = useState(window.innerWidth);
  const [orientation, setorientation] = useState('landscape');
  const [isFitToWindow, setIsFitToWindow] = useState(true);
  const [showAddCursor, setShowAddCursor] = useState(false);

  const [layout, dispatch] = useReducer(layoutReducer, initialItems);

  const ref = useRef(null);

  const width = useMemo(() => (orientation === 'landscape' ? 1620 : 1220), [
    orientation,
  ]);

  const zoomHandler = (e) => {
    // override browser zoom & delegate deltaY to zoom level
    if (e.ctrlKey) {
      e.preventDefault();

      setIsFitToWindow(false);

      setZoom((x) =>
        Math.max(x - parseFloat((e.deltaY * 0.01).toFixed(2)), 0.25)
      );
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', zoomHandler, {
      // Chrome sets wheel listeners on window, document, & body as passive by default
      // which throws an error in the console if you call `e.preventDefault()`
      passive: false,
    });
    return () =>
      window.removeEventListener('wheel', zoomHandler, {
        passive: false,
      });
  }, []);

  const documentClickHandler = (event) => {
    if (ref.current.contains(event.target)) {
      if (!event.target.classList.contains('indicator')) {
        setShowAddCursor(false);
      }
    } else {
      setShowAddCursor(false);
    }
  };

  document.onclick = documentClickHandler;

  const zoomFitToWindow = useCallback(
    (baseWidth) => {
      setwindowwidth(baseWidth);

      const map = breakpoints[orientation];
      const key = Object.keys(map).find((x) => x >= baseWidth);
      let widthRatio = 1;

      if (map[key]?.margins) {
        widthRatio = (baseWidth - map[key].margins) / width;
      }

      setZoom(widthRatio);
    },
    [orientation, width]
  );

  const resizeHandler = useCallback(
    (e) => {
      if (!isFitToWindow) return;

      zoomFitToWindow(e.target.innerWidth);
    },
    [zoomFitToWindow, isFitToWindow]
  );

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [resizeHandler]);

  useEffect(() => {
    if (ref.current) {
      setZoomContainerHeight(ref.current.getBoundingClientRect().height);
    }
  }, []);

  useEffect(() => {
    // auto fit zoom on page load
    zoomFitToWindow(window.innerWidth);
  }, [zoomFitToWindow]);

  const zoomIn = () => {
    setIsFitToWindow(false);
    setZoom((x) => parseFloat((x + 0.25).toFixed(2)));
  };
  const zoomOut = () => {
    setIsFitToWindow(false);
    setZoom((x) => Math.max(parseFloat((x - 0.25).toFixed(2)), 0.25));
  };

  const handleChange = (e) => {
    let val = e.target.value;
    val /= 100;
    setZoom(Math.max(parseFloat(val.toFixed(2)), 0));
  };
  console.log('layout', layout);
  return (
    <div className="App">
      {/* Ensure header scales full width while zoomed; Probably a cleaner way to do this */}
      <div
        className="header"
        style={{ width: zoom < 1 ? windowwidth : windowwidth * zoom }}
      >
        <div>Zoom</div>
        <div className="btnContainer">
          <div className="zoomToggle">
            <button onClick={zoomOut}>-</button>
            <input
              value={parseFloat((zoom * 100).toFixed(2))}
              onChange={handleChange}
            />
            <button onClick={zoomIn}>+</button>
          </div>
          <button
            className={`${isFitToWindow ? 'btn active' : 'btn'}`}
            onClick={() => {
              setIsFitToWindow(true);
              zoomFitToWindow(windowwidth);
            }}
          >
            Fit to window
          </button>
          <button
            className={`${orientation === 'portrait' ? 'btn active' : 'btn'}`}
            onClick={() => setorientation('portrait')}
          >
            Set Portrait
          </button>
          <button
            className={`${orientation === 'landscape' ? 'btn active' : 'btn'}`}
            onClick={() => setorientation('landscape')}
          >
            Set Landscape
          </button>
        </div>
      </div>
      <div
        style={{
          position: 'relative',
          top: 100,
          display: 'flex',
          alignItems: 'center',
          marginLeft: 60,
        }}
      >
        <DraggableSource targetRef={ref} dispatch={dispatch} key="1">
          <SourceDummyBlock>Drag me</SourceDummyBlock>
        </DraggableSource>
        <DraggableSource targetRef={ref} dispatch={dispatch} key="2">
          <SourceDummyBlock>Drag me</SourceDummyBlock>
        </DraggableSource>
        <button
          style={{
            width: 200,
            height: 60,
            border: '1px solid black',
            borderRadius: 10,
          }}
          onClick={() => setShowAddCursor(true)}
        >
          Click me to add
        </button>
      </div>
      <div
        className="container"
        style={{
          margin: '100px auto 0',
          width: width * zoom,
          // scale height to remove whitespace
          height: zoomContainerHeight * zoom,
        }}
      >
        <div
          ref={ref}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: '0 0 0',
            width,
            touchAction: 'pan-x pan-y',
          }}
        >
          <GridLayout
            zoom={zoom}
            onClick={() => setIsModalOpen(true)}
            width={orientation === 'landscape' ? 1620 : 1220}
            layout={layout}
            dispatch={dispatch}
            showAddCursor={showAddCursor}
            setShowAddCursor={setShowAddCursor}
          />
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={{ content: { width: 500, margin: '100px auto' } }}
        >
          <h1>Best modal ever</h1>
          <button
            style={{
              border: '1px solid blue',
              display: 'block',
              cursor: 'pointer',
            }}
            onClick={() => setIsModalOpen(false)}
          >
            Close me
          </button>
        </Modal>
      </div>
    </div>
  );
}

// Panning: touch-action: pan-x pan-y https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action
