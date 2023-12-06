import './ControlButton.css';

import React, { useState } from 'react';

const ControlButton = ({title,onClick,index}) => {
    const handleButtonClick = () => {
        onClick(index);
    }

  return (
    <button className="red-button" onClick={handleButtonClick}>
      {title}
    </button>
  );
};

export default ControlButton;
