import React, { Component } from 'react';
import Popup from 'react-popup';
import Modal from 'react-modal';
import './App.css';
import './popup.css';
import Blocks from './Components/Blocks/blocks';
import Dice from './Components/Dice/dice';
import Team from './Components/Team/team';

class App extends Component {

  constructor(props) {    
    super(props); 
    this.state = {
      teamsMap : {
            0: {color: 'red', val: 1, name: 'Player 1'},
            1: {color:'blue', val: 1, name: 'Player 2'},
            2: {color:'green', val: 1, name: 'Player 3'}
      },
      specialBlocks: {
        // 2: {type: 'ladder', target: 100}, 3: {type: 'ladder', target: 100}, 4: {type: 'ladder', target: 100}, 5: {type: 'ladder', target: 100}, 9: {type: 'ladder', target: 100}, 13: {type: 'ladder', target: 84}, 21: {type: 'ladder', target: 42}, 36: {type: 'ladder', target: 44}, 51: {type: 'ladder', target: 67}, 71: {type: 'ladder', target: 91}, 80: {type: 'ladder', target: 100}, 98: {type: 'snake', target: 78}, 95: {type: 'snake', target: 75}, 93: {type: 'snake', target: 73}, 87: {type: 'snake', target: 24}, 64: {type: 'snake', target: 60}, 56: {type: 'snake', target: 53}, 47: {type: 'snake', target: 26}, 49: {type: 'snake', target: 11}, 16: {type: 'snake', target: 5}
        4: {type: 'ladder', target: 14}, 9: {type: 'ladder', target: 31}, 13: {type: 'ladder', target: 84}, 21: {type: 'ladder', target: 42}, 36: {type: 'ladder', target: 44}, 51: {type: 'ladder', target: 67}, 71: {type: 'ladder', target: 91}, 80: {type: 'ladder', target: 100}, 98: {type: 'snake', target: 78}, 95: {type: 'snake', target: 75}, 93: {type: 'snake', target: 73}, 87: {type: 'snake', target: 24}, 64: {type: 'snake', target: 60}, 56: {type: 'snake', target: 53}, 47: {type: 'snake', target: 26}, 49: {type: 'snake', target: 11}, 16: {type: 'snake', target: 5}
      },
      teamCount: 3,
      disableDie: false,
      currentTeam: 0
    };
    this.onDieSelect       = this.onDieSelect.bind(this);
    this.setCurrentTeam    = this.setCurrentTeam.bind(this);
    this.setTeamsMap       = this.setTeamsMap.bind(this);
    this.onSnakeLadderMove = this.onSnakeLadderMove.bind(this);
    this.onFinish          = this.onFinish.bind(this);
    
  }

  render() {    
    return (
      <div className="App">
          <Popup/>
          <Blocks teams={this.state.teamsMap} specialBlocks={this.state.specialBlocks}></Blocks>
          <Team currentTeam={this.state.currentTeam} teamsMap={this.state.teamsMap}></Team>
          <Dice onSelect={this.onDieSelect} disableDie={this.state.disableDie}></Dice>
      </div>
    );
  }

  onSnakeLadderMove(type, target) {
    var teamsMap = this.state.teamsMap;    
    var bonusBlockInterval = setInterval(function() {
      if(teamsMap[this.state.currentTeam].val === target) {
        clearInterval(bonusBlockInterval);
        if(target === 100) {
          this.onFinish();  
          return;
        }
        if(type === 'ladder') {
          alert(' Play again !!!');
        } else {
          this.setCurrentTeam((this.state.currentTeam+1) % this.state.teamCount);
        }
        this.setDisableDie(false);
        return;
      }
      if(type === 'ladder') {
        teamsMap[this.state.currentTeam].val += 1;
      } else {        
        teamsMap[this.state.currentTeam].val -= 1;
      }
      this.setTeamsMap(teamsMap);
    }.bind(this), 100);
  }

  onFinish() {
    var teamsMap = this.state.teamsMap;    
    var player = teamsMap[this.state.currentTeam].name;
    delete teamsMap[this.state.currentTeam];
    if(Object.keys(teamsMap).length === 1) {
      alert(player + ' won !!! ... Game Over !!!');
      return;
    }
    alert(player + ' won !!! .. Continue playing others');          
    this.setState({
       'teamCount': this.state.teamCount - 1,
       'teamsMap' : teamsMap,
       'currentTeam': (this.state.currentTeam+1) % this.state.teamCount,
       'disableDie': false
    });
  }

  onDieSelect(diceValue) {        
    var teamsMap = this.state.teamsMap;
    var finalValue = teamsMap[this.state.currentTeam].val + diceValue;
    // Popup.alert('hii dice rolled');
    this.setDisableDie(true);

    var blockMoveInterval =  setInterval(function() {
      if(teamsMap[this.state.currentTeam].val === finalValue) {
        clearInterval(blockMoveInterval);        
        if(diceValue === 6 || !this.state.specialBlocks[finalValue]) {          
          this.setDisableDie(false);
        }
        if(diceValue !== 6) {
          if(this.state.specialBlocks[finalValue]) {
            var type = this.state.specialBlocks[finalValue].type;
            var target = this.state.specialBlocks[finalValue].target;
            alert(' Got a ' + (type === 'ladder' ? 'Bonus' : 'Loss')+ ' !!!');
            this.onSnakeLadderMove(type, target);
          } else {
            this.setCurrentTeam((this.state.currentTeam+1) % this.state.teamCount);
          }          
        } else {
          alert(' Play again !!!');
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
