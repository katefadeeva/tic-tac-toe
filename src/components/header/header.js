import React, {Component} from 'react';

import './header.css';

export default class Header extends Component {

  render() {
    const { countX, countO, draw, countComputer, countPlayer, drawComputer, changeMode } = this.props;
    return (
          <header className='header'>
            <h1>The game "TIC-TAC-toe"</h1>
            <div className='scores p1'>
              <p className='player1'>
                <span className='p1'>Player</span>
                <span className='p2'>Player 1</span>
                (х)
                <span className='score p1'>{countPlayer}</span>
                <span className='score p2'>{countX}</span>
              </p>
              <p className='draw'>
                -
                <span className='score p1'>{drawComputer}</span>
                <span className='score p2'>{draw}</span>
              </p>
              <p className='player2'>
                <span className='p1'>Computer</span>
                <span className='p2'>Player 2</span>
                (o)
                <span className='score p1'>{countComputer}</span>
                <span className='score p2'>{countO}</span>
              </p>
              <div className='swap' tabIndex='0' onClick={changeMode}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                  <g fill="#212529">
                    <path className="p1"
                          d="M49.947,90.991c0.693,0,1.41,0.02,2.104,0c13.547-0.201,26.439-1.723,28.775-3.945 c0.537-4.928,1.195-7.311-20.65-17.644c-3.107-1.742-1.465-8.492-1.465-8.492c6.578-4.969,11.096-16.463,11.096-25.676 c0-15.921-7.18-23.453-17.756-24.234h-2.104c-10.557,0.781-17.734,8.312-17.734,24.234c0,9.213,4.496,20.707,11.078,25.676 c0,0,1.641,6.75-1.449,8.492C19.979,79.735,20.635,82.118,21.176,87.046C23.51,89.269,36.402,90.79,49.947,90.991z"></path>
                    <path className="p2"
                          d="M66.219,85h1.562c9.92-0.14,19.38-1.2,21.08-2.779c0.422-3.44,0.9-5.101-15.142-12.341 c-2.279-1.22-1.059-5.939-1.059-5.939c4.822-3.48,8.123-11.521,8.123-17.98c0-11.14-5.263-16.419-13.001-16.959h-1.562 c-7.738,0.54-13,5.799-13,16.959c0,6.46,3.301,14.5,8.121,17.98c0,0,1.221,4.719-1.059,5.939c-16.041,7.24-15.562,8.9-15.14,12.341 C46.84,83.8,56.301,84.86,66.219,85z M30.217,69h1.564c9.918-0.14,19.378-1.2,21.078-2.779c0.422-3.44,0.9-5.1-15.14-12.34 c-2.279-1.22-1.059-5.939-1.059-5.939c4.82-3.48,8.121-11.521,8.121-17.98c0-11.14-5.262-16.42-13-16.96h-1.564 c-7.738,0.54-13,5.8-13,16.96c0,6.459,3.301,14.5,8.121,17.98c0,0,1.221,4.72-1.059,5.939c-16.041,7.24-15.562,8.9-15.14,12.34 C10.839,67.8,20.299,68.86,30.217,69z"></path>
                  </g>
                </svg>
                <div className="p1"><p>1P</p></div>
                <div className="p2"><p>2P</p></div>
              </div>
            </div>
          </header>
        )
  }
}