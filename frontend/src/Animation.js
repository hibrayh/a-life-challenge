import './DummyConnection.css'
import React from 'react'
import axios from 'axios'
import ReactAnime from 'react-animejs'
const {Anime} = ReactAnime

const grown = 25;

// Dummy backend connection component. For reference purposes
class Animation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            creatureId: '',
            species: '',
            movement: 0,
            birth: 0,
            locationX: 0,
            locationY: 0,
            shape: '',
            color: '',
        }
        this.AnimateBirth = this.AnimateBirth.bind(this);
        this.getCreatureInfo = this.getCreatureInfo.bind(this)
    }

    AnimateBirth(creatureId, locationX, locationY, color, shape){
        let roundness = "0%";
        if(shape === "circle"){
            roundness = "50%";
        }
        return(
            <>
                <div id='GAH' style={{ position: "absolute", left: `${locationX}px`, top: `${locationY}px`, background: color, borderRadius: roundness }}/>
                <Anime
                    initial={[
                        {
                        targets: '#GAH',
                        height: [0, grown],
                        width: [0, grown],
                        easing: "linear",
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
                movement: res.movement,
                birth: res.birth,
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
                    Play
                </button>
            )
        } if (this.state.birth === 1) {
            return (
                <>
                    <div>
                        {this.AnimateBirth(this.state.creatureId, this.state.locationX, this.state.locationY, this.state.color, this.state.shape)}
                    </div>
                    
                </>
            )
        }
        
    }
    
}

export default Animation
