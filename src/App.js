
import './App.css';
import React, { Component } from 'react';
import {circles} from './components/circleData';
import Circle from './components/Circle';
import GameOver from './components/GameOver';

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state={
    score:0,
    current:0,
    gameOver:false,
  };
  timer = undefined;
  pace = 1500;

  handleClick=()=>{
    this.setState({
      count:this.state.score + 10,
    })
  }
  //get random circle with random number and do while loop
  nextCircle =()=>{
    let nextActive;
    do{
      nextActive=getRndInteger(1,4) //randomly selecting another circle
    }while(nextActive=== this.state.current)
    this.setState({current:nextActive})

    this.pace *= 0.95;
    this.timer=setTimeout(this.nextCircle, this.pace)
    console.log("active circle is ", this.state.current);
  }
  startHandler = () =>{
    this.nextCircle()
  };

  stopHandler = () =>{
    clearTimeout(this.timer);
    this.setState({gameOver:true});
  };
  render() {
    return (
      <div className="App">
        {this.state.gameOver && <GameOver score={this.state.score}/>}
        <h1>CatMouse Game</h1>
        <p>Your score</p>
        <div className="circles">
        {circles.map(c =>(
          <Circle 
          key={c.id} 
          color={c.color} 
          id={c.id}   
          onClick={this.handleClick}
          active={this.state.current===c.id}/>
        ))}
        </div>
        <button className="startBtn" onClick={this.startHandler}>Start</button>
        <button onClick={this.stopHandler}>Stop</button>
    </div>
    );
  }
}

export default App;
