import "./App.css";
import React, { Component } from "react";
import { circles } from "./circleData";
import Circle from "./components/Circle";
import GameOver from "./components/GameOver";
import startSound from "./assets/sounds/gameoverSound.mp3";
import endSound from "./assets/sounds/catmew.ogg";

let gameoverSound = new Audio(endSound);
let gamestartSound = new Audio(startSound);

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    score: 0,
    current: 0,
    pace: 1500,
    rounds: 0,
    gameStart: false,
    gameOver: false,
  };
  //round is how many highlights we get
  timer = undefined;
  //to check the right click
  clickHandler = (id) => {
    if (this.state.current !== id) {
      this.stopHandler();
      return;
    }

    this.setState({
      score: this.state.score + 10,
      rounds: 0, //clickhandler setstate clear rounds if user click circle
    });
  };

  //every new circle is
  //get random circle with random number and do while loop
  nextCircle = () => {
    if (this.state.rounds >= 5) {
      this.stopHandler();
      return;
    }
    let nextActive;
    do {
      nextActive = getRndInteger(1, 4); //randomly selecting another circle
    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.95,
      rounds: this.state.rounds + 1,
    });

    this.timer = setTimeout(this.nextCircle, this.state.pace);
    // console.log("active circle is ", this.state.current);
    // console.log("round number ", this.state.rounds);
  };

  startHandler = () => {
    gamestartSound.play();
    this.nextCircle();
    this.setState({
      gameStart: true,
    });
    gameoverSound.pause();
  };

  stopHandler = () => {
    gamestartSound.pause();
    gameoverSound.play();
    clearTimeout(this.timer);
    this.setState({
      current: 0,
      emptyRounds: 0,
      gameStart: false,
      gameOver: true,
    });
  };

  closeHandler = () => {
    this.setState({
      gameOver: false,
      score: 0,
      rounds: 0,
      pace: 1500,
      gameStart: false,
    });
    gameoverSound.pause();
  };

  render() {
    return (
      <div className="App">
        <h1>Feed the Cat</h1>
        <p>Your score: {this.state.score}</p>
        <div className="circles">
          {circles.map((c) => (
            <Circle
              key={c.id}
              color={c.color}
              id={c.id}
              click={() => this.clickHandler(c.id)} //binding data and sending data as props to clickhandler
              active={this.state.current === c.id}
              disabled={this.state.gameStart}
            />
          ))}
        </div>
        <button
          disabled={this.state.gameStart}
          className="startBtn"
          onClick={this.startHandler}
        >
          START
        </button>
        <button onClick={this.stopHandler}>STOP</button>
        {this.state.gameOver && (
          <GameOver score={this.state.score} close={this.closeHandler} />
        )}
      </div>
    );
  }
}

export default App;
