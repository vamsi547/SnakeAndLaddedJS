import React, { Component } from 'react';

import './App.css';
import Blocks from './Components/Blocks/blocks';
import Dice from './Components/Dice/dice';

class App extends Component {

  constructor(props) {
    super(props);    
    this.state = {
      teamsMap : {
            0: {color: 'red', val: 1},
            1: {color:'blue', val: 5},
            2: {color:'green', val: 1}
      }      
    };
    this.onHit = this.onHit.bind(this);
  }

  render() {    
    return (
      <div className="App">     
          <Blocks teams={this.state.teamsMap}></Blocks>
          <Dice></Dice>
      </div>
    );
  }

  onHit() {
    this.setState({
      teamsMap :{
        0: {color: 'red', val: 7},
        1: {color:'blue', val: 11},
        2: {color:'green', val: 1}
      }
    });
  }
}

export default App;
