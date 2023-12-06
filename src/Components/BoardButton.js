// SquareButton.js
import './BoardButton.css';

import React, { useState } from 'react';
//import PropTypes from 'prop-types';

const BoardButton = ({board,index,turn,onClick}) => {
  const [clickCount, setClickCount] = useState(0);

  const handleButtonClick = () => {
    var add=1;
    var remainder = turn % 2;
    if(remainder === 0){
      add = 2;
    }
    //console.log(turn);
    //turn++;
    //console.log(turn);

    const x = Math.floor((index) / 3);       
    const y = (index+3) % 3;
    //console.log(x + " " + y)
    //board[x][y] = board[x][y] + add;
    //console.log("~"+remainder)
    onClick(x,y,add,remainder);
    setClickCount(board[x][y]);
    //console.log(board);
    //onClick(); // Call the provided onClick function

    
  };

  return (
    <button className="square-button" onClick={handleButtonClick}>
      {clickCount}
    </button>
  );
};

// BoardButton.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   label: PropTypes.string.isRequired,
// };

export default BoardButton;
