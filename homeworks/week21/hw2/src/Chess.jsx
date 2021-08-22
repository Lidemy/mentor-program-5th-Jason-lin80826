import React from 'react';
import styled from 'styled-components'

const Square = styled.button`
  background: #E69500;
  border: 1px solid black;
  position: relative;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 5%;
  height: 47.17px
`

const ChessElement = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 50%;
  transform: scale(0.75);
  top: -50%;
  left:-50%;
  z-index: 1;

  ${(props) =>
    props.chessColor === "black" &&
    `
   background: black;
  `}

  ${(props) =>
    props.chessColor === "white" &&
    `
   background: white;
  `}
`;

export default function Chess(props){
  const { y, x, addChess, squares, color, } = props
  const chessColor = squares[y][x]

  return (
    <>
      <Square onClick={()=>{addChess(y, x, color)}}>
         <ChessElement chessColor ={chessColor}/>
      </Square>
    </>
  )
}