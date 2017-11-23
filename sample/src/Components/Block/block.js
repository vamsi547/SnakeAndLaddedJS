import React, { Component } from 'react';

class Block extends Component {
        render() {
                const number = this.props.val;
                const colors = this.props.colors || [];
                // const options = this.props.options;
                const teamDisplay = [];                

                colors.forEach(function(team, index) {
                        var style = {width: 100/colors.length + '%', background: team.color, left: (100/colors.length) * index + '%'};
                        teamDisplay.push(<div className="teamBlock" style={style}></div>);
                });
                const contentColor = colors.length? 'white': 'black';
                return (
                        <div className="block">
                                { teamDisplay }
                                {/* <label className="content" style={{color: contentColor}}> {number} </label> */}
                                {this.constructLabel(contentColor, number)}
                        </div>
                )
        }   
        
        constructor(props) {
                super(props);
                this.constructLabel.bind(this);
        }

        constructLabel(color, val) {
                var label = [];
                label.push(<label className="content" style={{color: color}}> {val} </label>);
                if(this.props.options && this.props.options.type === 'ladder') {
                        label.push(<span className='ladder'> { this.props.options.target } </span>);
                } else if(this.props.options && this.props.options.type === 'snake') {
                        label.push(<span className='snake'> { this.props.options.target } </span>);
                } else {
                        // If any other case in future
                }
                return label;
        }
}

export default Block; 