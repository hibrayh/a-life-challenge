import './DummyConnection.css'
import React from 'react'
import axios from 'axios'
import ReactAnime from 'react-animejs'
const { Anime } = ReactAnime

//const used to define the creature element size
const grown = '25px'

// Dummy backend connection component. For reference purposes
class Animation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isSimStarted: false,
            creatureId: '',
            species: '',
            movement: 0,
            birth: 0,
            locationX: 0,
            locationY: 0,
            shape: '',
            color: '',
            creaturesToAnimate: [],
        }
        this.AnimateBirth = this.AnimateBirth.bind(this)
        this.AnimateMovement = this.AnimateMovement.bind(this)
        this.getCreatureInfo = this.getCreatureInfo.bind(this)
        this.startSimulation = this.startSimulation.bind(this)
    }

    AnimateBirth(creatureId, locationX, locationY, color, shape) {
        // Takes the creature ID, their location x and y, color, and shape, to create an element with specific animation
        let roundness = '0%'
        if (shape === 'circle') {
            roundness = '50%'
        }
        return (
            <>
                <div
                    id={creatureId}
                    style={{
                        position: 'absolute',
                        left: `${locationX}px`,
                        top: `${locationY}px`,
                        background: color,
                        borderRadius: roundness,
                        height: grown,
                        width: grown,
                    }}
                />
                <Anime
                    initial={[
                        {
                            targets: '#' + creatureId,
                            scale: [0, 1],
                            rotate: 180,
                            easing: 'linear',
                        },
                    ]}></Anime>
            </>
        )
    }

    AnimateMovement(creatureId, locationX, locationY) {
        // Takes the creature ID and moves to to the specified X and Y location
        return (
            <>
                <Anime
                    initial={[
                        {
                            targets: '#' + creatureId,
                            left: `${locationX}px`,
                            top: `${locationY}px`,
                            easing: 'linear',
                        },
                    ]}></Anime>
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

    async startSimulation() {
        // Start the simulation
        await axios({
            method: 'GET',
            url: 'http://localhost:5000/start-simulation',
        })

        await axios({
            method: 'POST',
            url: 'http://localhost:5000/create-new-species',
            data: {
                visibility: '0.5',
                maxHealth: '0.5',
                canSee: 'true',
                canSmell: 'true',
                canHear: 'true',
                sightAbility: '0.5',
                smellAbility: '0.5',
                hearingAbility: '0.5',
                sightRange: '0.5',
                smellRange: '0.5',
                hearingRange: '0.5',
                reactionTime: '0.5',
                intelligence: '0.5',
                selfPreservation: '0.5',
                mobility: '0.5',
                reproductionType: 'sexual',
                offspringAmount: '1',
                motivation: '0.5',
                maxEnergy: '0.5',
                individualism: '0.5',
                territorial: '0.5',
                fightOrFlight: '0.5',
                hostility: '0.5',
                scent: '0.5',
                stealth: '0.5',
                lifeExpectancy: '0.5',
                offensiveAbility: '0.5',
                defensiveAbility: '0.5',
                shape: 'circle',
                color: 'red',
                speciesName: 'Shlorpians',
            },
        })

        await axios({
            method: 'POST',
            url: 'http://localhost:5000/create-new-creature',
            data: {
                visibility: '0.5',
                maxHealth: '0.5',
                canSee: 'true',
                canSmell: 'true',
                canHear: 'true',
                sightAbility: '0.5',
                smellAbility: '0.5',
                hearingAbility: '0.5',
                sightRange: '0.5',
                smellRange: '0.5',
                hearingRange: '0.5',
                reactionTime: '0.5',
                intelligence: '0.5',
                selfPreservation: '0.5',
                mobility: '0.5',
                reproductionType: 'sexual',
                offspringAmount: '1',
                motivation: '0.5',
                maxEnergy: '0.5',
                individualism: '0.5',
                territorial: '0.5',
                fightOrFlight: '0.5',
                hostility: '0.5',
                scent: '0.5',
                stealth: '0.5',
                lifeExpectancy: '0.5',
                offensiveAbility: '0.5',
                defensiveAbility: '0.5',
                shape: 'circle',
                color: 'red',
                speciesName: 'Shlorpians',
            },
        })

        await axios({
            method: 'GET',
            url: 'http://localhost:5000/get-simulation-info',
        }).then((response) => {
            const res = response.data
            this.setState({
                isSimStarted: true,
                creatures: res.creatureRegistry,
            })
        })
    }

    render() {
        if (!this.state.isSimStarted) {
            return (
                <button className="getButton" onClick={this.startSimulation}>
                    Play
                </button>
            )
        } else {
            let creature = this.state.creatures[0]
            return (
                <>
                    <div>
                        {this.AnimateBirth(
                            creature.creatureId,
                            creature.locationX,
                            creature.locationY,
                            creature.color,
                            creature.shape
                        )}
                    </div>
                </>
            )
        }
    }
}

export default Animation
