import './App.css';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import GridLayout from './Grid/grid';

Modal.setAppElement('#modal');

const width = 1440;
export default function App() {
  const [zoom, setZoom] = useState(1);
  const [open, setopen] = useState(false);
  const [height, setHeight] = useState(0);

  const ref = useRef(null);

  const handler = (e) => {
    if (e.ctrlKey) {
      e.preventDefault();

      setZoom((x) =>
        Math.max(x - parseFloat((e.deltaY * 0.01).toFixed(2)), 0.25)
      );
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handler, {
      passive: false,
    });
    return () =>
      window.removeEventListener('wheel', handler, {
        passive: false,
      });
  }, []);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, []);

  const zoomIn = () => setZoom((x) => parseFloat((x + 0.25).toFixed(2)));
  const zoomOut = () =>
    setZoom((x) => Math.max(parseFloat((x - 0.25).toFixed(2)), 0.25));

  const handleChange = (e) => {
    let val = e.target.value;
    val /= 100;
    setZoom(Math.max(parseFloat(val.toFixed(2)), 0.25));
  };

  return (
    <div className="App">
      <div className="header">
        <div>Zoom</div>
        <div className="zoomToggle">
          <button onClick={zoomOut}>-</button>
          <input
            value={parseFloat((zoom * 100).toFixed(2))}
            onChange={handleChange}
          />
          <button onClick={zoomIn}>+</button>
        </div>
      </div>
      <div
        className="container"
        style={{ margin: 'auto', width: width * zoom, height: height * zoom }}
      >
        <div
          ref={ref}
          style={{
            transform: `scale(${zoom}, ${zoom})`,
            transformOrigin: '0 0 0',
            width,
            touchAction: 'pan-x pan-y',
          }}
        >
          <GridLayout zoom={zoom} onClick={() => setopen(true)} />
        </div>
        <Modal
          isOpen={open}
          onRequestClose={() => setopen(false)}
          style={{ content: { width: 500, margin: '100px auto' } }}
        >
          <h1>Best modal ever</h1>
          <button
            style={{
              border: '1px solid blue',
              display: 'block',
              cursor: 'pointer',
            }}
            onClick={() => setopen(false)}
          >
            Close me
          </button>
        </Modal>
      </div>
    </div>
  );
}

// Panning: touch-action: pan-x pan-y https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action
