import React, {Component} from 'react';

export default class GameField extends Component {

  render() {
    const { squares, clickHandler } = this.props;
    return (
        <div className="tic-tac-toe">
          <p className='result'>The game is on!</p>
          <div id='0' className="ttt-grid" onClick={clickHandler}>{squares[0]}</div>
          <div id='1' className="ttt-grid" onClick={clickHandler}>{squares[1]}</div>
          <div id='2' className="ttt-grid" onClick={clickHandler}>{squares[2]}</div>
          <div id='3' className="ttt-grid" onClick={clickHandler}>{squares[3]}</div>
          <div id='4' className="ttt-grid" onClick={clickHandler}>{squares[4]}</div>
          <div id='5' className="ttt-grid" onClick={clickHandler}>{squares[5]}</div>
          <div id='6' className="ttt-grid" onClick={clickHandler}>{squares[6]}</div>
          <div id='7' className="ttt-grid" onClick={clickHandler}>{squares[7]}</div>
          <div id='8' className="ttt-grid" onClick={clickHandler}>{squares[8]}</div>
        </div>
    )
  }
}