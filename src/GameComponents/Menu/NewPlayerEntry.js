import React from 'react';
//import 'foundation-sites/dist/css/foundation.min.css';
//import { Button, Label } from 'react-foundation';
import './Menu.css';

class NewPlayerEntry extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editing: true,
            name: props.name
        };
        this.inputChange = this.inputChange.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
    }

    inputChange(e){
        console.log(e.target.value);
        this.props.playerUpdate(this.props.id, e.target.value);
        this.setState({name: e.target.value});
    }

    toggleEditing(){
        this.props.playerReady(this.props.id, this.state.editing);
        this.setState({editing: !this.state.editing});
    }

    render(){
        return (
            <div>
                
                <div>
                    <input disabled={!this.state.editing} className="nameHolder" value={this.props.name} onChange={this.inputChange} type="text"></input>
                    <button className="toggleEditBtn" onClick={this.toggleEditing}>{this.state.editing ? "Save" : "Edit"}</button>
                </div>
                
            </div>
            
        )
    }
}

export default NewPlayerEntry;