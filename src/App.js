import './App.css';
import BoardButton from './Components/BoardButton';
import React, { useState } from 'react';
import ControlButton from './Components/ControlButtons';
import Board from './Board'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {

  const [turn, setTurn] = useState(0); //p1 = 0 even, p2 = 1 odd
  const [board, setBoard] = useState([
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ]);
  const [selected,setSelected] = useState(0);

  const [gamePieces , setGamePieces] = useState([
    //s,m,l
    [2,2,2], //p1
    [2,2,2], //p2

  ]);
  const updateGameState = (x,y,add,remainder) => {
    //checking of Piece selected even exsist
    if(gamePieces[remainder][selected] > 0 ){
      //Game logic here~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      // 111 means l,m,s of odd player
      //calculating the selected'th digit out of board sub square
      var boardDigit = board[x][y];
      for(var i=0;i<selected;i++){
        boardDigit = Math.floor(boardDigit/10);
      }  
      // checking if valid move and moving
      if(boardDigit%10 === 0 && boardDigit<10){
        //console.log(Math.pow(add,selected));
        board[x][y] = board[x][y] + add*Math.pow(10,selected); //adding x,y cell with new legal move
        setBoard(board);
        console.log(turn); //setting the board
        setTurn(turn+1);
        console.log(turn); //updating turn
        gamePieces[remainder][selected]--; //subtracting the used piece
        setGamePieces(gamePieces); //updating gamePieces
      }
    }   
  };
  const updateSelection = (index) => {
    //console.log(index);
    setSelected(index);
  }


  return (<div className="app-container">
    <div className="turn">
      <h1>Player {(turn%2)}'s turn</h1>
    </div>
    <div className="board">
      {[...Array(9)].map((_, index) => (
        <div key={index} className="gridBlock">
          <BoardButton board={board} index={index} turn={turn} onClick={updateGameState}/>
        </div>
      ))}
    </div>
    <br />
    <br />
    <div className="controls">
        <ControlButton title={"large"} onClick={updateSelection} index={2}/>
        <ControlButton title={"meduim"} onClick={updateSelection} index={1}/>
        <ControlButton title={"small"} onClick={updateSelection} index={0}/>
    </div>

    <br/><br/><br/><p>Hello</p><br/><br/>
     <DndProvider backend={HTML5Backend}>
      <div className="App">
      <Board/>
      </div>
    </DndProvider>
    
    

    </div>
  );
}

export default App;
