
import './App.css';
import React, { Component } from 'react';
import {circles} from './components/circleData';
import Circle from './components/Circle';

class App extends Component {
  state={
    count:0,
  };
  handleClick=()=>{
    this.setState({
      count:this.state.count+10,
    })
  }
  render() {
    return (
      <div className="App">
      <h1>CatMouse Game</h1>
      <p>Your score</p>
      <div className="circles">
      {circles.map(c =>(
        <Circle key={c.id} color={c.color} id={c.id} onClick={this.handleClick}/>
      ))}
      </div>
        <button className="startBtn">Start</button>
        <button>Stop</button>
    </div>
    );
  }
}

export default App;
