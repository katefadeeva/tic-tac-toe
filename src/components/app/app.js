import React, { Component }from 'react';
import GameField from "../game-field";
import './app.css';
import Header from "../header";

export default class App extends Component {
  state = {
    countX : 0,
    countO : 0,
    draw: 0,
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
    const { squares, step, countX, countO, draw, mode } = this.state;
    let s = (step % 2 === 0) ? 'X' : 'O';
    if (squares.every((item) => {return item !== null})) {
      document.querySelector('.tic-tac-toe').style.pointerEvents = 'none';
      document.querySelector('.result').innerHTML = 'Draw! Try playing again!';
      this.setState({
        draw: draw + 1
      })
      setTimeout(() => {
        document.querySelector('.tic-tac-toe').style.pointerEvents = 'auto';
        document.querySelector('.result').innerHTML = 'The game is on!';
        this.setState({
          squares: Array(9).fill(null),
          step: 0
        })
      }, 2000)
    }
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
            document.querySelector('.result').innerHTML = 'Player Won!!!';
          } else {
            document.querySelector('.result').innerHTML = 'Player 1 Won!!!';
          }
          this.setState({
            countX: countX + 1
          })
        } else if (s === 'O') {
          if (mode) {
            document.querySelector('.result').innerHTML = 'Computer Won! Try playing again!';

          } else {
            document.querySelector('.result').innerHTML = 'Player 2 Won!!!';
          }
          this.setState({
            countO: countO + 1
          })
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
      }
    }
  }

  clickHandler = (event) => {
    const { squares, step, mode } = this.state;
    let currentSquares = squares;
    let data = event.target.getAttribute('id');
    if (mode) {
      if (currentSquares[data] === null) {
        currentSquares[data] = 'X';
        this.setState({
          squares: currentSquares,
          step: step + 1});
        this.computerStep();
      } else {
        document.querySelector('.result').innerHTML = 'The field is already occupied!';
      }
    } else {
      if (currentSquares[data] === null) {
        currentSquares[data] = (step % 2 === 0) ? 'X' : 'O';
        this.setState({
          squares: currentSquares,
          step: step + 1});
      } else {
        document.querySelector('.result').innerHTML = 'The field is already occupied!';
      }
    }
    this.isWinner();
  }

  computerStep = () => {
    const { squares, step } = this.state;
    let currentSquares = squares;
    if (currentSquares[4] === null) {
      currentSquares[4] = 'O';
      this.setState({
        squares: currentSquares,
        step: step + 1});
    } else if (currentSquares[0] === null) {
      currentSquares[0] = 'O';
      this.setState({
        squares: currentSquares,
        step: step + 1});
    } else {}
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
    const {countX, countO, draw, squares, step } = this.state;
    return (
        <React.Fragment>
          <Header
              countX={countX}
              countO={countO}
              draw={draw}
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
