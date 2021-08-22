import React from "react";
import styled from "styled-components";
import Chess from "./Chess";

const Title = styled.span`
  margin-left: 500px;
  font-size: 36px;
  text-align: center;
`;

const BoardRow = styled.div`
  clear: both;
  content: "";
  display: flex;
  width: 50%;
  margin: 0 auto;
`;

function App() {
  const { useState, useEffect } = React;
  const SIZE = 19;
  const [squares, setSquares] = useState(
    Array(SIZE).fill(Array(SIZE).fill(null))
  );
  const [history, setHistory] = useState([]);
  const [color, setColor] = useState("black");
  const [currentY, setCurrentY] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  function able(y, x) {
    if (y >= 0 && y <= 18 && x >= 0 && x <= 18) {
      return true;
    } else {
      return false;
    }
  }

  const addChess = (y, x, currentColor) => {
    if (squares[y][x] !== null || y === 0 || x === 0) return;
    const newBoard = JSON.parse(JSON.stringify(squares));
    setCurrentY(y);
    setCurrentX(x);
    newBoard[y][x] = color;
    setSquares(newBoard);
    currentColor === "black" ? setColor("white") : setColor("black");
    history.push(squares);
    setHistory(history);
  };

  const judge = (currentY, currentX, squares, offsetY, offsetX) => {
    let count = 0;
    let chessColor = squares[currentY][currentX];
    if (chessColor === null) return;
    while (currentX >= 0 && currentX <= 18 && currentY >= 0 && currentY <= 18) {
      if (
        able(currentY + offsetY, currentX + offsetX) &&
        chessColor === squares[currentY + offsetY][currentX + offsetX]
      ) {
        count++;
        if (offsetX !== 0) {
          offsetX > 0 ? currentX++ : currentX--;
        }
        if (offsetY !== 0) {
          offsetY > 0 ? currentY++ : currentY--;
        }
      } else {
        break;
      }
    }
    return count;
  };
  const handleHistory = (index) => {
    setSquares(history[index]);
    index % 2 === 0 ? setColor("black") : setColor("white");
  };

  useEffect(() => {
    if (
      judge(currentY, currentX, squares, 0, 1) + judge(currentY, currentX, squares, 0, -1) >= 4 ||
      judge(currentY, currentX, squares, 1, 0) + judge(currentY, currentX, squares, -1, 0) >= 4 ||
      judge(currentY, currentX, squares, -1, 1) + judge(currentY, currentX, squares, 1, -1) >= 4 ||
      judge(currentY, currentX, squares, -1, -1) + judge(currentY, currentX, squares, 1, 1) >= 4
    ) {
      alert(
        `${squares[currentY][currentX] === "black" ? "黑子" : "白子"}獲勝!!`
      );
      setSquares(Array(SIZE).fill(Array(SIZE).fill(null)));
      setHistory([]);
      setColor("black");
    }
  }, [currentX, currentY, squares]);

  return (
    <div className="App">
      <Title>輪到{`${color === "black" ? "黑子" : "白子"}`}</Title>
      {squares.map((square, y) => {
        return (
          <BoardRow y={y} key={y}>
            {square.map((square, x) => {
              return (
                <Chess
                  key={x}
                  y={y}
                  x={x}
                  addChess={addChess}
                  squares={squares}
                  color={color}
                />
              );
            })}
          </BoardRow>
        );
      })}
      {history.map((records, index) => {
        return (
          <button
            onClick={() => {
              handleHistory(index);
              setHistory(history.slice(0, index));
            }}
            key={index}
          >
            {`回到第${index}步`}
          </button>
        );
      })}
    </div>
  );
}

export default App;
