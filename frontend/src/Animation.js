import './DummyConnection.css'
import React from 'react'
import axios from 'axios'
import ReactAnime from 'react-animejs'
const {Anime, stagger} = ReactAnime


// Dummy backend connection component. For reference purposes
class Animation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            creatureId: '',
            species: '',
            location: '',
            shape: '',
            color: '',
        }
        this.Animate = this.AnimateMovement.bind(this);
        this.getCreatureInfo = this.getCreatureInfo.bind(this)
    }

    AnimateMovement(creatureId, locationX, locationY, color){
        return(
            <>
                <div id="GAH" style={{ height: 50, width: 50, background: color }}/>
                
                <Anime
                    initial={[
                        {
                        targets: "#GAH",
                        translateX: locationX,
                        translateY: locationY,
                        easing: "linear"
                        }
                    ]}
                    >
                    </Anime>
            </>
        )
    }

    getCreatureInfo() {
        // Use axios to retrieve info from the backend
        axios({
            method: 'GET',
            url: 'http://localhost:5000/get-info',
        }).then((response) => {
            const res = response.data
            // change the state variable to trigger a re-render
            this.setState({
                creatureId: res.creatureId,
                species: res.species,
                locationX: res.locationX,
                locationY: res.locationY,
                shape: res.shape,
                color: res.color,
            })
        })
    }

    render() {

        if (this.state.creatureId === '') {
            return (
                <button className="getButton" onClick={this.getCreatureInfo}>
                    Get Creature Info
                </button>
            )
        } else {
            return (
                <>
                {/*
                    <div className="getButton">
                        Creature id: {this.state.creatureId},<br />
                        Species: {this.state.species},<br />
                        LocationX: {this.state.locationX},<br />
                        Shape: {this.state.shape},<br />
                        Color: {this.state.color}
                    </div>
            */}
                    <div>
                        {this.AnimateMovement(this.state.creatureId, this.state.locationX, this.state.locationY, this.state.color)}
                    </div>
                    
                </>
            )
        }
        
    }
    
}

export default Animation
