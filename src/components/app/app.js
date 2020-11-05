import React, { Component }from 'react';
import GameField from "../game-field";
import './app.css';
import Header from "../header";

export default class App extends Component {
  state = {
    countX : 0,
    countO : 0,
    draw: 0,
    countComputer: 0,
    countPlayer: 0,
    drawComputer: 0,
    squares: Array(9).fill(null),
    step: 0,
    mode: false
  }

  winnerLine = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
  ];

  isWinner = () => {
    const { squares, step, countX, countO, draw, countPlayer, countComputer, drawComputer, mode } = this.state;
    let s = (step % 2 === 0) ? 'X' : 'O';

    for (let i = 0; i < this.winnerLine.length; i++) {
      let line = this.winnerLine[i];
      if( squares[line[0]] === s
          && squares[line[1]] === s
          && squares[line[2]] === s ) {
        document.querySelector('.tic-tac-toe').style.pointerEvents = 'none';
        document.getElementById(line[0]).style.backgroundColor = '#83e2c3';
        document.getElementById(line[1]).style.backgroundColor = '#83e2c3';
        document.getElementById(line[2]).style.backgroundColor = '#83e2c3';

        if (s === 'X') {
          if (mode) {
            document.querySelector('.result').innerHTML = 'Player 1 Won!!!';
            this.setState({
              countX: countX + 1
            })
          } else {
            document.querySelector('.result').innerHTML = 'Player Won!!!';
            this.setState({
              countPlayer: countPlayer + 1
            })
          }

        } else if (s === 'O') {
          if (mode) {
            document.querySelector('.result').innerHTML = 'Player 2 Won!!!';
            this.setState({
              countO: countO + 1
            })
          } else {
            document.querySelector('.result').innerHTML = 'Computer Won! Try playing again!';
            this.setState({
              countComputer: countComputer + 1
            })
          }
        }
        setTimeout(() => {
          document.querySelector('.tic-tac-toe').style.pointerEvents = 'auto';
          document.getElementById(line[0]).style.backgroundColor = '';
          document.getElementById(line[1]).style.backgroundColor = '';
          document.getElementById(line[2]).style.backgroundColor = '';
          document.querySelector('.result').innerHTML = 'The game is on!';
          this.setState({
            squares: Array(9).fill(null),
            step: 0
          })
        }, 2000)
      } else if (squares.every(item =>  item !== null)) {
        document.querySelector('.tic-tac-toe').style.pointerEvents = 'none';
        document.querySelector('.result').innerHTML = 'Draw! Try playing again!';
        if (mode) {
          this.setState({
            draw: draw + 1
          })
        } else {
          this.setState({
            drawComputer: drawComputer + 1
          })
        }

        setTimeout(() => {
          document.querySelector('.tic-tac-toe').style.pointerEvents = 'auto';
          document.querySelector('.result').innerHTML = 'The game is on!';
          this.setState({
            squares: Array(9).fill(null),
            step: 0
          })
        }, 2000)
      }
    }
  }


  playerStep = (data) => {
    const {squares, step} = this.state;
    let currentSquares = squares;

    if (currentSquares[data] === null) {
      currentSquares[data] = (step % 2 === 0) ? 'X' : 'O';
      this.setState({
        squares: currentSquares,
        step: step + 1});
    } else {
      document.querySelector('.result').innerHTML = 'The field is already occupied!';
    }
  }

  computerStep = () => {
    const {squares, step} = this.state;
    let currentSquares = squares;
    if (currentSquares[4] === null) {
      currentSquares[4] = 'O';
    } else {
      let x = 'X';
      let o = 'O';

      let arr = [];

      for (let i = 0; i < this.winnerLine.length; i++) {
        let line = this.winnerLine[i];
        if (currentSquares[line[0]] === x && currentSquares[line[1]] === x && currentSquares[line[2]] === null) {
          arr.push(line[2]);
        } else if (currentSquares[line[0]] === x && currentSquares[line[2]] === x && currentSquares[line[1]] === null) {
          arr.push(line[1]);
        } else if (currentSquares[line[1]] === x && currentSquares[line[2]] === x && currentSquares[line[0]] === null) {
          arr.push(line[0]);
        } else if (currentSquares[line[0]] === o && currentSquares[line[1]] === o && currentSquares[line[2]] === null) {
          arr.push(line[2]);
        } else if (currentSquares[line[0]] === o && currentSquares[line[2]] === o && currentSquares[line[1]] === null) {
          arr.push(line[1]);
        } else if (currentSquares[line[1]] === o && currentSquares[line[2]] === o && currentSquares[line[0]] === null) {
          arr.push(line[0]);
        }
      }

      if (arr.length === 0) {
        let array = [];
        currentSquares.filter((item, index) => {
          if (item === null) {
            array.push(index)
          }
          return item === null;
        });
        let current = array[Math.floor(Math.random() * array.length)];
        if (currentSquares[current] === null) {
          currentSquares[current] = 'O';
        } else {
          this.isWinner();
        }
        array = [];
      } else {
        let current = arr[Math.floor(Math.random() * arr.length)];
        if (currentSquares[current] === null) {
          currentSquares[current] = 'O';
        } else {
          this.isWinner();
        }
      }
      arr = [];
    }

    this.setState({
      squares: currentSquares,
      step: step + 2
    });

  }

  clickHandler = (event) => {
    const { mode } = this.state;
    let data = event.target.getAttribute('id');
    if (mode) {
      this.playerStep(data);

    } else {
      this.playerStep(data);
      this.computerStep();
    }
    this.isWinner();
  }



  changeMode = () => {
    const { mode } = this.state;
    if (mode) {
      document.querySelector('.scores').className = 'scores p1';
    } else {
      document.querySelector('.scores').className = 'scores p2';
    }
    this.setState({
      mode: !mode,
      squares: Array(9).fill(null),
      step: 0
    })
  }

  render() {
    const {countX, countO, draw, squares, step, countComputer, countPlayer, drawComputer } = this.state;
    return (
        <React.Fragment>
          <Header
              countX={countX}
              countO={countO}
              draw={draw}
              countComputer={countComputer}
              countPlayer={countPlayer}
              drawComputer={drawComputer}
              changeMode={this.changeMode}
          />
          <GameField
              isWinner={this.isWinner}
              clickHandler={this.clickHandler}
              squares={squares}
              step={step}
          />
        </React.Fragment>
    )
  }
}
