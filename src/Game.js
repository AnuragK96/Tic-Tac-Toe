import React from 'react';
import Board from './Board';
import BoyImg from "./static/images/boyimg.png"
import GirlImg from "./static/images/girlimg.png"
import logo from "./static/images/logo.png"
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winnerRow: lines[i] };
    }
  }

  return { winner: null, winnerRow: null };
};

const getLocation = (move) => {
  const locationMap = {
    0: 'row: 1, col: 1',
    1: 'row: 1, col: 2',
    2: 'row: 1, col: 3',
    3: 'row: 2, col: 1',
    4: 'row: 2, col: 2',
    5: 'row: 2, col: 3',
    6: 'row: 3, col: 1',
    7: 'row: 3, col: 2',
    8: 'row: 3, col: 3',
  };

  return locationMap[move];
};

const initialState = {
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  currentStepNumber: 0,
  xIsNext: true,
  value: "0px",
  padvalue:"30px",
  theboy:BoyImg,
  thegirl:GirlImg
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.currentStepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    this.setState({value:"-28px"})
    this.setState({padvalue:"60px"})

    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares,
          currentLocation: getLocation(i),
          stepNumber: history.length,
        },
      ]),
      xIsNext: !this.state.xIsNext,
      currentStepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      currentStepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  sortMoves() {
    this.setState({
      history: this.state.history.reverse(),
    });
  }
swapchars(){
  if(this.state.theboy === BoyImg){
    this.setState({theboy:GirlImg})
  }
  if(this.state.theboy === GirlImg){
    this.setState({theboy:BoyImg})
  }
  if(this.state.thegirl === BoyImg){
    this.setState({thegirl:GirlImg})
  }
  if(this.state.thegirl === GirlImg){
    this.setState({thegirl:BoyImg})
  }
}
  reset() {
    this.setState(initialState);
  }

  render() {
    const { history } = this.state;
    const current = history[this.state.currentStepNumber];
    const { winner, winnerRow } = calculateWinner(current.squares);

    // const moves = history.map((step, move) => {
    //   const currentLocation = step.currentLocation ? `(${step.currentLocation})` : '';
    //   const desc =  'Go to game start';
    //   const classButton = move === this.state.currentStepNumber ? 'button--green' : '';

    //   return (
    //     <p key={move}>
    //       <button className={`${classButton} button`} onClick={() => this.jumpTo(move)}>
    //         {`${desc} ${currentLocation}`}
    //       </button>
    //     </p>
    //   );
    // });

    let status;
    if (winner) {
      status = `Winner ${winner}`;
    } else if (history.length === 10) {
      status = 'Draw. No one won.';
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div>
      <img src = {logo} alt = "logo" style = {{paddingRight:this.state.padvalue}} className = "logo-style"/>
      <div className="game">
        <div className = "X-img">
          <p className = "symbol-adj">X</p>
          <img src = {this.state.theboy} alt = "boy-img"/>
        </div>
        <div className="game-board">
        {/* <button onClick = {()=>this.swapchars()}>Swap Characters</button> */}
          <div >{status}</div>
          <button className="button button--new-game" onClick={() => this.reset()}>
            New game
          </button><br />
          <Board
            squares={current.squares}
            winnerSquares={winnerRow}
            onClick={i => this.handleClick(i)}
          />
          <div className="game-info" >
          <button className={`button--green button`} onClick = {()=>this.swapchars()}>
            Swap Characters
          </button>
          </div>
         
        </div>
        <div className = "O-img">
          <p className = "symbol-adj">O</p>
          <img src = {this.state.thegirl} alt = "girl-img"/>
        </div>

        {/* <button className="button" onClick={() => this.sortMoves()}>
            Sort moves
          </button> */}
      </div>
      </div>
    );
  }
}

export default Game;
