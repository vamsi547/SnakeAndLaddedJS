import React, { Component } from 'react';

class Block extends Component {
        render() {
                const number = this.props.val;
                const colors = this.props.colors || [];
                const teamDisplay = [];                

                colors.forEach(function(team, index) {
                        var style = {width: 100/colors.length + '%', background: team.color, left: (100/colors.length) * index + '%'};
                        teamDisplay.push(<div className="teamBlock" style={style}></div>);
                });
                return (
                        <div className="block">
                                { teamDisplay }
                                <label className="content"> {number} </label>
                        </div>
                )
        }        
}

export default Block;