import React from 'react';
import './Card.css';
import ReactCardFlip from 'react-card-flip';
import back from '../../logo.svg';

let cardBack = "https://cdnb.artstation.com/p/assets/images/images/012/680/911/large/kathryn-raccuglia-character-card-back.jpg?1535999441";
class Card extends React.Component {
	constructor(props){
		super(props);
		this.state = {flipped: false}; //flipped true means the img is visible (ground truth)

		this.flip = this.flip.bind(this);
	}

	flip(){
		if (this.state.flipped == true){
			return;
		}
		let canFlip = this.props.flipCallback(this);
		if (canFlip){
			this.setState(state => ({flipped: true}));//!state.flipped}));
		}
		//this.setState(state => ({flipped: !state.flipped}));//}));
		
	}

	render() {

		return (
			<ReactCardFlip flipSpeedBackToFront={2} flipSpeedFrontToBack={2} isFlipped={this.state.flipped} flipDirection="vertical">
				
				{//<img alt="img" onClick={this.flip} width="150" height="150" src={cardBack}></img>
				}
				<img alt="img" onClick={this.flip} width="150" height="150" src={back}></img>


				<img alt="img" onClick={this.flip} width="150" height="150" src={this.props.imgUrl}></img>
				{//<div onClick={this.flip} id="panel" background="green"></div>
				}
			</ReactCardFlip>
		)
		/*
		if (this.state.flipped){
			return <img onClick={this.flip} width="150" height="150" src={this.props.imgUrl}></img>;
		} else {
			return <div onClick={this.flip} id="panel" background="green"></div>
		}*/
		
	}
}

export default Card;