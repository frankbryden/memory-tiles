import './Menu.css';
import React from 'react';
import NewPlayerEntry from './NewPlayerEntry';
import Player from '../GUI/Player';
//import 'foundation-sites/dist/css/foundation.min.css';
//import { Button } from 'react-foundation';

class Menu extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            players: [],
            theme: ""
        };
        this.addPlayer = this.addPlayer.bind(this);
        this.playerUpdate = this.playerUpdate.bind(this);
        this.playerReady = this.playerReady.bind(this);
        this.themeChange = this.themeChange.bind(this);
    }

    playerUpdate(id, name){
        let players = this.state.players;
        players[id].name = name;
        this.setState({
            players: players
        });
    }

    playerReady(id, ready){
        let players = this.state.players;
        players[id].ready = ready;
        this.setState({
            players: players
        });
    }

    themeChange(e){
        this.setState({
            theme: e.target.value
        });
    }

    addPlayer(){
        let players = this.state.players;
        players.push(new Player(""));
        this.setState({players: players});
    }

    render(){
        return (
            <div id="menu">
                <h1>Welcome to Memory!</h1>
                <h2>Players</h2>
                {this.state.players.map((p, i) => <NewPlayerEntry id={i} key={i} name={p.name} playerReady={this.playerReady} playerUpdate={this.playerUpdate} />)}
                <button onClick={this.addPlayer}>Add Player</button>
                <h2>Theme</h2>
                <input value={this.state.theme} onChange={this.themeChange} type="text" />
                <button onClick={() => this.props.startGame(this.state.players, this.state.theme)} disabled={!((this.state.players.filter(p => p.ready == false).length === 0) && this.state.players.length > 0 && this.state.theme.length > 0)}>Start Game</button>
            </div>
        )
    }
}

export default Menu;