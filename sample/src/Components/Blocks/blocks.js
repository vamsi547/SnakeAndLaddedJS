import React, { Component } from 'react';
import Block from '../Block/block';

class Blocks extends Component {
        getRowBlocks(startIndex, reverse) {
                var blockMatrix = []; 
                var specialBlocks = this.props.specialBlocks;
                startIndex = 10*(startIndex-1) + 1;
                if(reverse) {
                        for(var index = startIndex + 9; index >= startIndex; index--) {
                                blockMatrix.push(<Block val={index} colors={this.getCurrentTeams(index)} options={specialBlocks[index]}></Block>);
                        }
                } else {
                        for(index = startIndex; index <= startIndex + 9; index++) {
                                blockMatrix.push(<Block val={index} colors={this.getCurrentTeams(index)} options={specialBlocks[index]}></Block>);
                        }
                }
                return blockMatrix;
        }

        getBlockOptions(val) {
                return this.props.specialBlocks[val];
        }

        getCurrentTeams(val) {
                var teams = [];
                var teamsMap = this.props.teams;
                Object.keys(teamsMap).forEach(function(teamId) {
                        if(teamsMap[teamId].val === val) {
                                teams.push({
                                        id: teamId,
                                        color: teamsMap[teamId].color
                                });
                        }
                });
                return teams;
        }

        render() {                
                const blockMatrix = [];
                
                for(var rowCount = 10; rowCount >= 1; rowCount--) {
                        blockMatrix.push(<div>{this.getRowBlocks(rowCount, !(rowCount % 2))}</div>)
                }
                return (
                        <div className="game-container">
                                {blockMatrix}
                        </div>
                )
        }
}

export default Blocks;