import React, { Component } from 'react';
// import Popup from 'react-popup';
import './App.css';
import Blocks from './Components/Blocks/blocks';
import Dice from './Components/Dice/dice';
import Team from './Components/Team/team';

class App extends Component {

  constructor(props) {    
    super(props); 
    this.state = {
      teamsMap : {
            0: {color: 'red', val: 1},
            1: {color:'blue', val: 1},
            2: {color:'green', val: 1}
      },
      currentTeam: 0
    };
    this.onDieSelect    = this.onDieSelect.bind(this);
    this.setCurrentTeam = this.setCurrentTeam.bind(this);
    this.setTeamsMap    = this.setTeamsMap.bind(this);
  }

  render() {    
    return (
      <div className="App">
          <Blocks teams={this.state.teamsMap}></Blocks>
          <Team currentTeam={this.state.currentTeam} teamsMap={this.state.teamsMap}></Team>
          <Dice onSelect={this.onDieSelect}></Dice>
      </div>
    );
  }

  onDieSelect(diceValue) {    
    var teamsMap = this.state.teamsMap;
    teamsMap[this.state.currentTeam].val += diceValue;
    this.setTeamsMap(teamsMap);
    if(diceValue !== 6) {
      this.setCurrentTeam((this.state.currentTeam+1) % 3);
    }    
  }

  setTeamsMap(teamsMap) {
    this.setState({
      teamsMap: teamsMap
    });
  }

  setCurrentTeam(teamId) {
    this.setState({
      currentTeam: teamId
    });
  }
  
}

export default App;
