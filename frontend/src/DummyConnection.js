import './DummyConnection.css';
import React from 'react';
import axios from "axios";

// Dummy backend connection component. For reference purposes
class DummyConnection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            creatureId: "",
            species: "", 
            location: "", 
            shape: "", 
            color: ""
        };

        this.getCreatureInfo = this.getCreatureInfo.bind(this);
    }

    getCreatureInfo() {
        // Use axios to retrieve info from the backend
        axios({
            method: "GET",
            url: "http://localhost:5000/get-info"
        })
        .then((response) => {
            const res = response.data;
            // change the state variable to trigger a re-render
            this.setState({
                creatureId: res.creatureId,
                species: res.species,
                location: res.location,
                shape: res.shape,
                color: res.color
            });
        });
    }

    render() {
        if (this.state.creatureId === "") {
            return (
                <button className="getButton" onClick={this.getCreatureInfo}>Get Creature Info</button>
            )
        }
        else {
            return (
                <div className="getButton">
                    Creature id: {this.state.creatureId},<br/>
                    Species: {this.state.species},<br/>
                    Location: {this.state.location},<br/>
                    Shape: {this.state.shape},<br/>
                    Color: {this.state.color}
                </div>
            )
        }
    }
}

export default DummyConnection;