import React, { Component } from 'react';

class Team extends Component {

        constructor(props) {
                super(props);                
                this.getCurrentTeam = this.getCurrentTeam.bind(this);
                this.getTeamBlock   = this.getTeamBlock.bind(this);
        }

        getCurrentTeam() {
                return this.props.currentTeam;
        }

        getTeamBlock() {
                var teams = Object.keys(this.props.teamsMap);
                var teamBlocks = [];                
                teams.forEach(function(teamId) {
                        teamBlocks.push(<div style={{display: 'inline-block', 'margin-right': '5px'}}> <span> Team {teamId} </span><div className="team-block-type" style={{background: this.props.teamsMap[teamId].color}}></div></div>)
                }.bind(this));
                return teamBlocks;                
        }        

        render() {
                return (
                        <div className="team-container">
                                <div>
                                        {this.getTeamBlock()}                                        
                                </div>
                                <div className="team-display">
                                        Team { this.getCurrentTeam() }
                                </div>
                        </div>
                )
        }
}

export default Team;