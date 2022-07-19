import { useState, useEffect } from 'react';
import './App.css';
import Square from './components/Square';
import { Patterns } from './Patterns';

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O")
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 })

  useEffect(() => {
    checkWin()
    checkIfTie()
    if (player === "X") {
      setPlayer("O")
    } else {
      setPlayer("X")
    }
  }, [board]);

  useEffect(() => {
    if (result.state !== "none") {
      if (result.winner === "O") {
        if (result.state === "Won") {
          let { oScore } = scores
          oScore += 1
          setScores({ ...scores, oScore })
        }
      } else {
        if (result.state === "Won") {
          let { xScore } = scores
          xScore += 1
          setScores({ ...scores, xScore })
        }
      }
      alert(`Game Finished! Winning Player: ${result.winner}`);
    }
  }, [result]);

  const chooseSquare = (square) => {
    setBoard(
      board.map((val, idx) => {
        if (idx === square && val === "") {
          return player
        }
        return val;
      })
    )
  }

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer === "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setResult({ winner: player, state: "Won" });
        restartGame()
      }
    });
  }


  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square === "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: "No One", state: "Tie" });
    }
  }

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
    setScores({xScore: 0, oScore: 0})
  }


  return (
    <div className='App'>
      <div className='score_board'>
        <div>
          <h1>Tik Tak Toe - React</h1>
          <h3>Player Scroes</h3>
          <p>X-Score - {scores.xScore}</p>
          <p>O-Score - {scores.oScore}</p>
          <button onClick={() => {restartGame()}}>Reset Game</button>
        </div>
      </div>
      <div className='board'>
        <div className='row'>
          <Square val={board[0]} chooseSquare={() => { chooseSquare(0) }} />
          <Square val={board[1]} chooseSquare={() => { chooseSquare(1) }} />
          <Square val={board[2]} chooseSquare={() => { chooseSquare(2) }} />
        </div>
        <div className='row'>
          <Square val={board[3]} chooseSquare={() => { chooseSquare(3) }} />
          <Square val={board[4]} chooseSquare={() => { chooseSquare(4) }} />
          <Square val={board[5]} chooseSquare={() => { chooseSquare(5) }} />
        </div>
        <div className='row'>
          <Square val={board[6]} chooseSquare={() => { chooseSquare(6) }} />
          <Square val={board[7]} chooseSquare={() => { chooseSquare(7) }} />
          <Square val={board[8]} chooseSquare={() => { chooseSquare(8) }} />
        </div>
      </div>
    </div>
  );
}

export default App;
