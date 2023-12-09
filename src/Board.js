import React, { useState } from 'react';
import './Board.css';
import { useDrop } from "react-dnd";
import { useDrag } from "react-dnd";
import smallPieceYellow from './assets/small_yellow.png';
import medPieceYellow from './assets/meduim_yellow.png';
import largePieceYellow from './assets/large_yellow.png';
import medPieceRed from './assets/meduim_red.png';
import largePieceRed from './assets/large_red.png';
import smallPieceRed from './assets/small_red.png';
import medPiece from './assets/meduim.png';
import largePiece from './assets/large.png';
import smallPiece from './assets/small.png';
import defaultPiece from './assets/default.png';

const Board = () => {


  //MAIN GAME BRAIN HERE
  //p1 = 0 even, p2 = 1 odd
  const [playerTurnDOM, setplayerTurnDOM] = useState(0); 
  const [won , setWon] = useState(0);
  let playerTurn = 0;
  const [board, setBoard] = useState([
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ]);
  const [boardImg, setBoardImg] = useState([
    defaultPiece,defaultPiece,defaultPiece,defaultPiece,defaultPiece,defaultPiece,defaultPiece,defaultPiece,defaultPiece,defaultPiece,
  ]);
  // const [selected,setSelected] = useState(0);
  const imgMap = [[defaultPiece,smallPieceYellow,medPieceYellow,largePieceYellow],[defaultPiece,smallPieceRed,medPieceRed,largePieceRed]];
  

  const [gamePieces , setGamePieces] = useState([
    //s,m,l
    [2,2,2], //p1
    [2,2,2], //p2

  ]);
  const updateGameState = (x,y,add,remainder,index,myid) => {
    //checking of Piece selected even exsist
    //console.log(`x: ${x}, y: ${y}, add: ${add}, remainder: ${remainder}, index: ${index}, myid: ${myid}, turn:${playerTurn}`);

    //from myid to index(x,y)
    
    var selected = myid%10;
    if(myid >= 10){//for this if selected is size as it only can be 10 11 or 12 but change for other possible in else as its from 0 to 8 after myid--
      
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
          //console.log(add*Math.pow(10,selected));
          board[x][y] = board[x][y] + add*Math.pow(10,selected); //adding x,y cell with new legal move
          setBoard(board); //setting the board
          //console.log(`bef turn:${playerTurn}`);
          playerTurn++;
          setplayerTurnDOM(playerTurn); //updating turn
          
          //console.log(`af turn:${playerTurn}`);
         
          gamePieces[remainder][selected]--; //subtracting the used piece

          // else{
          //   board[Math.floor((myid) / 3)][(myid+3) % 3] = board[Math.floor((myid) / 3)][(myid+3) % 3] - add*Math.pow(10,selected);
          // }
          
  
          setGamePieces(gamePieces); //updating gamePieces
          showPieceOnCell(selected,index,myid,selected,add);
          //console.log(board);
        }
      }
    }else{
      myid--;
      var upperPiece = 0;
      //console.log(board[Math.floor((myid) / 3)][(myid+3) % 3]);
      if(board[Math.floor((myid) / 3)][(myid+3) % 3]===0){
        upperPiece = 0;
      }
      else if(board[Math.floor((myid) / 3)][(myid+3) % 3]<9){
        upperPiece =board[Math.floor((myid) / 3)][(myid+3) % 3]%10;
        selected = 0;
      }else if(board[Math.floor((myid) / 3)][(myid+3) % 3]<90){
        upperPiece =Math.floor(board[Math.floor((myid) / 3)][(myid+3) % 3]/10);
        upperPiece =upperPiece%10;
        selected = 1;
      }else if(board[Math.floor((myid) / 3)][(myid+3) % 3]<999){
        upperPiece =Math.floor(board[Math.floor((myid) / 3)][(myid+3) % 3]/100);
        upperPiece =upperPiece%10;
        selected = 2;
      }
      console.log(`upperpiece ${upperPiece} , selected ${selected}`);
      
      if(upperPiece > 0 && upperPiece%2 === remainder){
        add = upperPiece;
        console.log("legal move")
        //Game logic here~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // 111 means l,m,s of odd player
        //calculating the selected'th digit out of board sub square
        var boardDigit = board[x][y];
        for(var i=0;i<selected;i++){
          boardDigit = Math.floor(boardDigit/10);
        }  
        // checking if valid move and moving
        console.log(boardDigit);
        if(boardDigit%10 === 0 && boardDigit<10){          
          //console.log(add*Math.pow(10,selected));
          board[x][y] = board[x][y] + add*Math.pow(10,selected); //adding x,y cell with new legal move
          setBoard(board); //setting the board
          //console.log(`bef turn:${playerTurn}`);
          playerTurn++;
          setplayerTurnDOM(playerTurn); //updating turn
          
          //console.log(`af turn:${playerTurn}`);
         
          //gamePieces[remainder][selected]--; //subtracting the used piece

          // else{
          console.log(`from ${board[Math.floor((myid) / 3)][(myid+3) % 3]} the value subtracted is ${add*Math.pow(10,selected)}`);
          board[Math.floor((myid) / 3)][(myid+3) % 3] = board[Math.floor((myid) / 3)][(myid+3) % 3] - add*Math.pow(10,selected);
          // }
          
  
          setGamePieces(gamePieces); //updating gamePieces
          showPieceOnCell(selected,index,myid,selected,add);
          //console.log(board);
        }
      
      }
    }
    console.log(hasWon());
    setWon(hasWon());
       
  };




  


  function getTopPiece(x,y){
    var upperPiece=0;
    //var selected = 0;
    if(board[x][y]===0){
      upperPiece = 0;
      //selected = 0;
    }
    else if(board[x][y]<9){
    upperPiece =board[x][y]%10;
    //selected=10;
    }else if(board[x][y]<90){
      upperPiece =Math.floor(board[x][y]/10);
      upperPiece =upperPiece%10;
      //selected=20;
    }else if(board[x][y]<999){
      upperPiece =Math.floor(board[x][y]/100);
      upperPiece =upperPiece%10;   
      //selected =30; 
    }
    return upperPiece;
  }


  function hasWon(){
    if(getTopPiece(0,0)===getTopPiece(0,1) && getTopPiece(0,1) ===getTopPiece(0,2)){
      return getTopPiece(0,0);
    }else if(getTopPiece(1,0)===getTopPiece(1,1) && getTopPiece(1,1)===getTopPiece(1,2)){
      return getTopPiece(1,0);
    }else if(getTopPiece(2,0)===getTopPiece(2,1) && getTopPiece(2,1)===getTopPiece(2,2)){
      return getTopPiece(2,0);
    }else if(getTopPiece(0,0)===getTopPiece(1,0) && getTopPiece(1,0)===getTopPiece(2,0)){
      return getTopPiece(0,0);
    }else if(getTopPiece(0,1)===getTopPiece(1,1) && getTopPiece(1,1)===getTopPiece(2,1)){
      return getTopPiece(0,1);
    }else if(getTopPiece(0,2)===getTopPiece(1,2) && getTopPiece(1,2)===getTopPiece(2,2)){
      return getTopPiece(0,2);
    }else if(getTopPiece(0,0)===getTopPiece(1,1) && getTopPiece(1,1)===getTopPiece(2,2)){
      return getTopPiece(0,0);
    }else if(getTopPiece(0,2)===getTopPiece(1,1) && getTopPiece(1,1)===getTopPiece(2,0)){
      return getTopPiece(0,2);
    }else { return 0;}
  
  }

  function showPieceOnCell(pieceSize,index,myid,selected,add){
    // for(var x=0;x<3;x++){
    //   for(var y=0;y<3;y++){
    //     var code = getTopPiece();
    //     var upperPiece = code%10;
    //     var selected = (Math.floor(code/10))-1;
    //     const imgMap = [smallPiece,medPiece,largePiece];
    //     boardImg[x*3+y+1] = imgMap[pieceSize];
    //     console.log(imgMap[pieceSize]);
    //     setBoardImg(boardImg);
    //   }
    // }

    //updating the recieving cell
    index++;
    
    boardImg[index] = imgMap[add-1][pieceSize+1];
    //console.log(imgMap[pieceSize]);
    setBoardImg(boardImg);

    //updating the sender's cell
    if(myid < 10){
    var pieceBelow = Math.floor((board[Math.floor((myid) / 3)][(myid+3) % 3])/(Math.pow(10,selected-1)))%10;
    console.log(`board value ${board[Math.floor((myid) / 3)][(myid+3) % 3]} piece below ${pieceBelow} and myid ${myid+1}`);
    if(pieceBelow===0){
      selected =0;
      boardImg[myid+1] = imgMap[0][selected];
    }
    else{
      boardImg[myid+1] = imgMap[(pieceBelow-1)][selected];
    }
    
    
    //console.log(imgMap[pieceSize]);
    setBoardImg(boardImg);
    }
  }



  function test(index){
    var add=1;
    var remainder = playerTurn % 2;
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
    updateGameState(x,y,add,remainder);
  }



  //MAIN GAME BRAIN ENDS HERE



















  const [{ isDragging01 }, drag01] = useDrag(() => ({
    type: "image",
    item:{myid:10},   
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [{ isDragging02 }, drag02] = useDrag(() => ({
    type: "image",
    item:{myid:11},   
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [{ isDragging03 }, drag03] = useDrag(() => ({
    type: "image",
    item:{myid:12},   
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isDragging1 }, drag1] = useDrag(() => ({
    type: "image",
  item:{myid:1},
    
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isDragging2 }, drag2] = useDrag(() => ({
    type: "image",
    item:{myid:2},
    
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isDragging3 }, drag3] = useDrag(() => ({
    type: "image",
    item:{myid:3},
    
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isDragging4 }, drag4] = useDrag(() => ({
    type: "image",
    item:{myid:4},
    
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isDragging5 }, drag5] = useDrag(() => ({
    type: "image",
    item:{myid:5},
    
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isDragging6 }, drag6] = useDrag(() => ({
    type: "image",
    item:{myid:6},
    
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isDragging7 }, drag7] = useDrag(() => ({
    type: "image",
    item:{myid:7},
    
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isDragging8 }, drag8] = useDrag(() => ({
    type: "image",
    item:{myid:8},
    
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isDragging9 }, drag9] = useDrag(() => ({
    type: "image",
    item:{myid:9},
    
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));



  const [{ isOver1 }, drop1] = useDrop(() => ({
    accept: "image",
    drop: (item) => addItemToBoard(1,item.myid,playerTurn),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const [{ isOver2 }, drop2] = useDrop(() => ({
    accept: "image",
    drop: (item) => addItemToBoard(2,item.myid,playerTurn),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const [{ isOver3 }, drop3] = useDrop(() => ({
    accept: "image",
    drop: (item) => addItemToBoard(3,item.myid,playerTurn),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const [{ isOver4 }, drop4] = useDrop(() => ({
    accept: "image",
    drop: (item) => addItemToBoard(4,item.myid,playerTurn),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const [{ isOver5 }, drop5] = useDrop(() => ({
    accept: "image",
    drop: (item) => addItemToBoard(5,item.myid,playerTurn),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const [{ isOver6 }, drop6] = useDrop(() => ({
    accept: "image",
    drop: (item) => addItemToBoard(6,item.myid,playerTurn),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const [{ isOver7 }, drop7] = useDrop(() => ({
    accept: "image",
    drop: (item) => addItemToBoard(7,item.myid,playerTurn),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const [{ isOver8 }, drop8] = useDrop(() => ({
    accept: "image",
    drop: (item) => addItemToBoard(8,item.myid,playerTurn),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const [{ isOver9 }, drop9] = useDrop(() => ({
    accept: "image",
    drop: (item) => addItemToBoard(9,item.myid,playerTurn),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  function addItemToBoard(index,myid,playerTurn){
    index--;
    var add=1;
    var remainder = playerTurn % 2;
    //console.log(`playerTurn ${playerTurn}`);
    if(remainder === 0){
      add = 2;
    }
    const x = Math.floor((index) / 3);       
    const y = (index+3) % 3;
    updateGameState(x,y,add,remainder,index,myid);
    console.log("from " +myid+ " dropped to "+index);
  }
  if(won===0){
    console.log(gamePieces[(playerTurn+1)%2]);

  return (<>
  <div className="bg">
      <h1>Player {(playerTurnDOM%2)===0?"Red":"Yellow"}'s turn</h1>
    </div> 
  <div className="board-container">
    <div className="board">
    <div ref={drop1} className="board-cell" ><img className="cell-img" ref={drag1} src={boardImg[1]} /></div>
    <div ref={drop2} className="board-cell" ><img className="cell-img" ref={drag2} src={boardImg[2]} /></div>
    <div ref={drop3} className="board-cell" ><img className="cell-img" ref={drag3} src={boardImg[3]} /></div>
    <div ref={drop4} className="board-cell" ><img className="cell-img" ref={drag4} src={boardImg[4]} /></div>
    <div ref={drop5} className="board-cell" ><img className="cell-img" ref={drag5} src={boardImg[5]} /></div>
    <div ref={drop6} className="board-cell" ><img className="cell-img" ref={drag6} src={boardImg[6]} /></div>
    <div ref={drop7} className="board-cell" ><img className="cell-img" ref={drag7} src={boardImg[7]} /></div>
    <div ref={drop8} className="board-cell" ><img className="cell-img" ref={drag8} src={boardImg[8]} /></div>
    <div ref={drop9} className="board-cell" ><img className="cell-img" ref={drag9} src={boardImg[9]} /></div>
    </div>   
  </div>
  <div className='span-div'> 
<div className='image-container'>
<img ref={drag01} src={imgMap[(playerTurnDOM+1)%2][1]} width="100px"/>
<div><span>{gamePieces[(playerTurnDOM)%2][0]}</span></div>
</div>
<div className='image-container'>
<img ref={drag02} src={imgMap[(playerTurnDOM+1)%2][2]} width="100px" />
<div><span>{gamePieces[(playerTurnDOM)%2][1]}</span></div>
</div>
<div className='image-container'>
<img ref={drag03} src={imgMap[(playerTurnDOM+1)%2][3]} width="100px" />
<div><span>{gamePieces[(playerTurnDOM)%2][2]}</span></div>
</div>
</div>
    </>
  );}

  else{
    return(
      <>
<div className="bg">
      <h1>Player {(won%2)===0?"Red":"Yellow"} won kal ana</h1>
    </div>
      </>
    )
  }
};




export default Board;











































// import React from 'react';
// import './Board.css';
// import { useDrag, useDrop } from 'react-dnd';

// // const Cell = ({ value, onDrop }) => {
// //   const [{ isOver }, drop] = useDrop({
    
// //     drop: onDrop,
// //     collect: (monitor) => ({
// //       isOver: !!monitor.isOver(),
// //     }),
// //   });

// //   return (
// //     <div ref={drop} className={`cell ${isOver ? 'hovered' : ''}`}>
// //       {value}
// //     </div>
// //   );
// // };

// // const Box = () => {
// //   const [, drag] = useDrag({
// //     type: ItemTypes.BOX,
// //   });

// //   return <div ref={drag} className="box" />;
// // };

// const Board = () => {
//   const handleDrop = (index) => {
//     // Handle the drop event here
//     console.log(`Dropped into cell ${index}`);
//   };

//   return (
//     <div className="board">
//       {[0, 1, 2].map((row) => (<>
//         <div key={row} className="row">
//           {[0, 1, 2].map((col) => (
//             <div
//             key={col}
//             className="cell"
//             onDrop={() => handleDrop(row * 3 + col)}
//             onDragOver={(e) => e.preventDefault()}
//           />
//           ))}
//         </div><br/></>
//       ))}
//     </div>
//   );
// };

// export default Board;


// import React from 'react';
// import './Board.css';
// //import { useDrop } from 'react-dnd';
// import { ItemTypes } from './ItemTypes'; // Create this file to define drag item types

// const DraggableBox = ({index}) => {
//   const [item, drop] = useDrop({
//     accept: ItemTypes.BOX,
//     drop: () => handleDrop(index),
//   });

//   return <div ref={drop} className="draggable-box" />;
// };

// const handleDrop = (index) => {
//   // Handle the drop event here
//   console.log(`Dropped into cell ${index}`);
// };


// <div className="board">
//           {[0, 1, 2].map((row) => (
//             <div key={row} className="board-row">
//               {[0, 1, 2].map((col) => (
//                 <div key={col} className="board-cell">
//                     <>
//                   <DraggableBox row={row} col={col}/>
//                   <p>hello</p>
//                   <br/><br/>
//                 </>
//                 </div>
                
//               ))}
//             </div>
//           ))}
//         </div>



// const Board = () => {


//     return (<>
//     <div>
//         <p>hello</p>
//     </div>
//       <div className="board-container">
//         <div className="board">
//           {[...Array(9)].map((_, index) => (
//             <div key={index} className="board-cell">
//               {/* <p>hello</p> */}
//               {/* <DraggableBox index={index}/> */}
//             </div>
//           ))}
//         </div>
//       </div>

//       </>
//     );
//   };
  
  
  

// export default Board;
