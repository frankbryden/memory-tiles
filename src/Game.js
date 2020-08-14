import React from 'react';
import CardView from './GameComponents/CardView/CardView.js';
import Card from     './GameComponents/Card/Card';
import GUI from './GameComponents/GUI/GUI';
import CardFetchingService from './CardFetch';
import Player from './GameComponents/GUI/Player.js';
import Menu from './GameComponents/Menu/Menu';

class Game extends React.Component {
	constructor(){
        super();
		this.state = {
			inMenu: true,
			loading: true,
			turn: 0,
			flippedCards: [], // currently flipped cards
			cards: []
		}; 
		this.theme = "";
		this.cardFetcher = new CardFetchingService();
		this.players = [];
		
		//Callback functions
		this.cardFlipped = this.cardFlipped.bind(this);
		this.startGame = this.startGame.bind(this);

	}
	
	componentDidMount(){
		
	}

	componentWillMount(){
		//this.initCards();
	}

	startGame(players, theme){
		console.log("starting game with theme " + theme);
		console.log(players);
		this.players = players;
		this.setState({
			inMenu: false,
			loading: true,
		});
		this.theme = theme;
		this.initCards();
	}
    
    async initCards(){
		
		/* Below is an array of unique cards.
		*  From that array, we need to assign a class to each image, and then duplicate 
		*  each image to obtain our final dataset for the game.
		*/
		let cardPool = await this.cardFetcher.getCards(this.theme);
		console.log(cardPool);
		const classMapped = cardPool.imgs.map(card => ({class: card, img: card}));
		let duplicated = classMapped;
		duplicated.forEach(c => duplicated.push(c));
		
		let cards = [];
		duplicated.forEach((card, index) => {
			cards.push(<Card flipCallback={this.cardFlipped} id={index} class={card.class} key={index} imgUrl={card.img} />);
		});
		this.shuffleCards(cards);
		this.setState(state => ({cards: cards, loading: false}));
		console.log("Done init cards");
	}
	
	shuffleCards(cards){
		let index = cards.length;
		while (--index > 0){
			//pick an index
			let otherIndex = Math.floor(Math.random()*(cards.length - 1));
			
			//store one of the values
			let temp = cards[otherIndex];

			//swap the values
			cards[otherIndex] = cards[index];
			cards[index] = temp;
		}
		console.log("shuffled cards");
		console.log(cards);
	}
	
	cardFlipped(card){
		if (this.state.animating){
			console.log("cannot flip card as we are animating");
			return false;
		} else {
			console.log(`someone just flipped card `);
			console.log(card);
			/*this.setState(state => {
				let cards = state.flippedCards;
				cards.push(card);
				console.log(cards);
				console.log("Here");
				return ({
					flippedCards: cards
				});
			});*/
			let cards = this.state.flippedCards;
			cards.push(card);
			this.setState({flippedCards: cards});
			this.checkTurnCompletion();
			return true;
		}
	}

	checkTurnCompletion(){
		//called every time a card is flipped. Responsible for initiating turn switching logic and card checking
		if (this.state.flippedCards.length === 2){
			//end of turn. Need to compare the two cards, and move to next turn.
			this.turnComplete();
		} else {
			console.log("current flipped cards count is " + this.state.flippedCards.length);
		}
	}

	nextTurn(){
		let turn = this.state.turn + 1;
		if (turn > this.players.length - 1){
			turn = 0;
		}
		this.setState({turn: turn});
	}

	turnComplete(){
		console.log("turnComplete()");
		let firstCard = this.state.flippedCards[0];
		let diffCards = this.state.flippedCards.filter(card => card.props.class !== firstCard.props.class);
		console.log(diffCards);
		console.log(this.state.flippedCards);
		if (diffCards.length === 0){
			//Correct!
			this.players[this.state.turn].score++;
			//leave cards as-is (flipped)
		} else {
			//flip cards back
			console.log("Flipback!");
			this.reflipCards();
		}
		

		//In the future, add the cards to be animated on a queue, and the animator will animate one elemenf off the queue at a time 
		this.setState(state => ({
			animatedFlippedCards: state.flippedCards,
			flippedCards: [],
			
		}));
	}

	async reflipCards(){
		console.log("About to wait");
		this.setState({ animating: true });
		await new Promise(r => setTimeout(r, 2000));
		this.setState({ animating: false });
		console.log("finished waiting");
		this.nextTurn();
		this.state.animatedFlippedCards.forEach(card => {
			console.log("Flipping card");
			console.log(card);
			card.setState(state => ({flipped: false}));
		});
	}

	render() {
		if (!this.state.inMenu){
			console.log(this.players);
		}
		return (
			<div>
				{this.state.inMenu ?
					<Menu startGame={this.startGame} /> :
					this.state.loading ?
					<h1>Loading...</h1> :
					<div>
						<CardView cards={this.state.cards} theme={this.theme} />
						<GUI players={this.players} currentPlayer={this.state.turn} />
					</div>
					
					
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

export default Game;