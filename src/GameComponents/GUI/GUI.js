import React from 'react';
import './GUI.css';

class GUI extends React.Component {
	constructor(props){
        super(props);
        let players = [];
        for (let i = 0; i < props.playerCount; i++){
            players.push(`Player ${i}`);
        }
		this.state = {
            players: players
        };

		this.flip = this.flip.bind(this);
	}

	flip(){
		this.setState(state => ({flipped: !state.flipped}));
		
	}

	render() {
		return (
			<div className="gui">
                {this.props.players.map((player, index) => {
                    
                    let className = "playerLbl";
                    
                    if (this.props.currentPlayer === index){
                        className += " currentPlayer";
                    }

                    return (<div key={player.name} className={className}>
                        <label className="playerName">{player.name}</label><div className="spacing"></div><label className="score">{player.score}</label></div>);
                })
                }
            </div>
		)
		/*
		if (this.state.flipped){
			return <img onClick={this.flip} width="150" height="150" src={this.props.imgUrl}></img>;
		} else {
			return <div onClick={this.flip} id="panel" background="green"></div>
		}*/
		
	}
}

export default GUI;