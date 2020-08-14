import React from 'react';

class CardView extends React.Component {
	constructor(props){
		super(props);
		this.state = {cards: []}; //flipped true means the img is visible (ground truth)
        this.flip = this.flip.bind(this);
    }
    
    initCardsTable(){
		console.log(this.props.cards);
		let cardCount = this.props.cards.length;
		let divisors = [...Array(cardCount).keys()].filter(n => (cardCount%n) === 0).slice(1);
		let n = divisors.length;
		let width, height;
		if (n % 2 === 0){
			width = divisors[n/2];
			height = divisors[n/2 - 1];
		} else {
			width = divisors[(n - 1)/2];
			height = divisors[(n - 1)/2];
		}

		console.log(`Filling table of dimensions ${width}x${height}`);

		//Generate table
		let tableData = [];
		//tableData.push(<table></table>)
		let cardIndex = 0;
		for (let y = 0; y < height; y++){
			let row = []
			for (let x = 0; x < width; x++){
				row.push(<td key={x+y/10}>{this.props.cards[cardIndex]}</td>)
				cardIndex++;
			}
			tableData.push(<tr key={y}>{row}</tr>)
		}
		console.log(tableData);
		return tableData;//this.setState(state => ({tbl: tableData}));
	}
	
	componentDidMount(){
		this.initCardsTable();
	}

	flip(){
		this.setState(state => ({flipped: !state.flipped}));
	}

	render() {
		const tbl = this.initCardsTable();
		return (
			<div>
				<h4>Welcome to memory with {this.props.cards.length} cards on the theme of {this.props.theme}</h4>
				<table>
					<tbody>
						{//this.state.tbl
						}
						{tbl}
					</tbody>
					
				</table>
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

export default CardView;