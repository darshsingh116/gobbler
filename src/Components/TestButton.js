import './ControlButton.css';
import React, { useState } from 'react';

const TestButton = ({title}) => {

  return (
    <button className="red-button">
      {title}
    </button>
  );
};

export default TestButton;
