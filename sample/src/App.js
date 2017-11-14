import React, { Component } from 'react';
import Popup from 'react-popup';
import './App.css';
import Blocks from './Components/Blocks/blocks';
import Dice from './Components/Dice/dice';
import Team from './Components/Team/team';

class App extends Component {

  constructor(props) {    
    super(props); 
    this.state = {
      teamsMap : {
            0: {color: 'red', val: 1, name: 'Raghu'},
            1: {color:'blue', val: 1, name: 'Vamsi'},
            2: {color:'green', val: 1, name: 'Raj'}
      },
      teamCount: 3,
      disableDie: false,
      currentTeam: 0,

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
          <Dice onSelect={this.onDieSelect} disableDie={this.state.disableDie}></Dice>
      </div>
    );
  }

  onDieSelect(diceValue) {        
    var teamsMap = this.state.teamsMap;
    var finalValue = teamsMap[this.state.currentTeam].val + diceValue;
    
    this.setDisableDie(true);
    var blockMoveInterval =  setInterval(function() {
      if(teamsMap[this.state.currentTeam].val === finalValue) {
        clearInterval(blockMoveInterval);
        this.setDisableDie(false);
        if(diceValue !== 6) {
          this.setCurrentTeam((this.state.currentTeam+1) % this.state.teamCount);
        }
        return;
      }
      teamsMap[this.state.currentTeam].val += 1;
      this.setTeamsMap(teamsMap);

    }.bind(this), 250)
    
  }

  setDisableDie(disableDie) {
    this.setState({
      disableDie: disableDie
    })
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
