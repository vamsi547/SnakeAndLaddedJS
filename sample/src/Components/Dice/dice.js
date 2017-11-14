import React, { Component } from 'react';

class Dice extends Component {
        constructor(props) {
                super(props);
                this.state = {
                        dice: 1,
                        interval: null,
                        rolling: false,
                        disableDie: props.disableDie
                }
                this.onHit = this.onHit.bind(this);
                this.changeDice = this.changeDice.bind(this);
                this.stopDice = this.stopDice.bind(this);
        }

        render() {
                return (
                        <div className="dice-container">
                                <div className="block"><span className="content">{this.state.dice}</span></div>
                                <div className="roll-container"><button className={ "roll-button " + (this.state.rolling || this.state.disableDie? 'disabled-roll-button' : '') } onClick={this.onHit}> Roll </button></div>
                        </div>
                )
        }

        componentWillReceiveProps(props) {
                if(props.disableDie !== this.state.disableDie) {
                        this.setState({
                                disableDie: props.disableDie
                        });
                }
        }


        onHit() {                
                var interval  = setInterval(this.changeDice, 40);
                this.setState({
                        interval: interval
                });
                setTimeout(this.stopDice, 3000);
        }

        changeDice() {
                this.setState({
                        dice: Math.floor(Math.random() * 6) + 1,
                        rolling: true
                });
        }

        stopDice() {
                clearInterval(this.state.interval);        
                this.setState({
                        rolling: false,
                        interval: null
                });
                this.props.onSelect(this.state.dice);
                
        }

}

export default Dice;