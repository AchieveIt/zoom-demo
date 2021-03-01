import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const Toggle = ({ isChecked = false, text, onChange }) => {
  const labelContainerRef = useRef(null);
  const [sliderLeftPosition, setSliderLeftPosition] = useState(0);

  useEffect(() => {
    if (!labelContainerRef.current) {
      return;
    }

    if (isChecked) {
      setSliderLeftPosition(1);
    } else {
      const { width } = labelContainerRef.current.getBoundingClientRect();

      setSliderLeftPosition(width / 2 - 1);
    }
  }, [isChecked]);
  console.log('ischecked', isChecked);
  return (
    <div className="toggle">
      <input type="checkbox" defaultChecked={isChecked} className="checkbox" />
      <div ref={labelContainerRef} className="labelContainer">
        <div
          className="label"
          onClick={() => {
            console.log('checked onclick on toggle', isChecked);
            onChange(true);
          }}
        >
          {text.checked}
        </div>
        <div
          className="label"
          onClick={() => {
            console.log('unchecked click in toggle', isChecked);
            onChange(false);
          }}
        >
          {text.unchecked}
        </div>
      </div>
      <div className="slider" style={{ left: sliderLeftPosition }} />
    </div>
  );
};

export default Toggle;
