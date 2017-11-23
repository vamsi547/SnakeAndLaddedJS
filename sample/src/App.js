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
      specialBlocks: {
        4: {type: 'ladder', target: 14}, 9: {type: 'ladder', target: 31}, 13: {type: 'ladder', target: 84}, 21: {type: 'ladder', target: 42}, 36: {type: 'ladder', target: 44}, 51: {type: 'ladder', target: 67}, 71: {type: 'ladder', target: 91}, 80: {type: 'ladder', target: 100}, 98: {type: 'snake', target: 78}, 95: {type: 'snake', target: 75}, 93: {type: 'snake', target: 73}, 87: {type: 'snake', target: 24}, 64: {type: 'snake', target: 60}, 56: {type: 'snake', target: 53}, 47: {type: 'snake', target: 26}, 49: {type: 'snake', target: 11}, 16: {type: 'snake', target: 5}
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
          <Blocks teams={this.state.teamsMap} specialBlocks={this.state.specialBlocks}></Blocks>
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
