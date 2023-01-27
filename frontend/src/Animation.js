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

    AnimateBirth(creature) {
        // Takes the creature ID, their location x and y, color, and shape, to create an element with specific animation
        let roundness = '0%'
        if (creature.shape === 'circle') {
            roundness = '50%'
        }
        return (
            <>
                <div
                    id={creature.creatureId}
                    style={{
                        position: 'absolute',
                        left: `${creature.locationX}px`,
                        top: `${creature.locationY}px`,
                        background: creature.color,
                        borderRadius: roundness,
                        height: grown,
                        width: grown,
                    }}
                />
                <Anime
                    initial={[
                        {
                            targets: '#' + creature.creatureId,
                            scale: [0, 1],
                            rotate: 180,
                            easing: 'linear',
                        },
                    ]}></Anime>
            </>
        )
    }

    AnimateStarved(creature) {
        // Takes the creature ID and performs the "creature starved" animation
        return (
            <>
                <Anime
                    initial={[
                        {
                            targets: '#' + creature.creatureId,
                            opacity: '0',
                            duration: 3000,
                            easing: 'easeInOutElastic(8, 1)',
                        },
                    ]}></Anime>

            </>
        )
    }

    AnimateKilled(creature) {
        // Takes the creature ID and performs the "creature killed" animation
        return (
            <>
                <Anime
                    initial={[
                        {
                            targets: '#' + creature.creatureId,
                            keyframes: [
                                {translateX: '+=5', easing: 'easeInOutElastic(9, .5)', duration: 750},
                                {opacity: '0'},
                              ],
                            easing: 'linear',
                        },
                    ]}></Anime>

            </>
        )
    }

    AnimateOldAge(creature) {
        // Takes the creature ID and performs the "creature starved" animation
        return (
            <>
                <Anime
                    initial={[
                        {
                            targets: '#' + creature.creatureId,
                            keyframes: [
                                {opacity: '0.5', duration: 750},
                                {opacity: '0', delay: 2000},
                              ],
                            easing: 'linear',
                        },
                    ]}></Anime>

            </>
        )
    }


    AnimateMovement(creature) {
        // Takes the creature ID and moves to to the specified X and Y location
        return (
            <>
                <Anime
                    initial={[
                        {
                            targets: '#' + creature.creatureId,
                            left: `${creature.locationX}px`,
                            top: `${creature.locationY}px`,
                            easing: 'linear',
                        },
                    ]}></Anime>
            </>
        )
    }

    AnimateResourceSpawn(resource) {
        // Takes the resource ID, its location x and y, and color to create an element with specific animation
        return (
            <>
                <div
                    id={resource.resourceId}
                    style={{
                        position: 'absolute',
                        left: `${resource.locationX}px`,
                        top: `${resource.locationY}px`,
                        width: '0px',
                        height: '0px',

                        borderStyle: 'solid',
                        borderTopWidth: '0px',
                        borderLeftWidth: '7.5px',
                        borderBottomWidth: '13.0px',
                        borderRightWidth: '7.5px',

                        borderTopColor: 'transparent', 
                        borderRightColor: 'transparent',
                        borderBottomColor: resource.color,
                        borderLeftColor: 'transparent',
                    }}
                />
                <Anime
                    initial={[
                        {
                            targets: '#' + resource.resourceId,
                            scale: [0, 1],
                            rotate: 360,
                            easing: 'linear',
                        },
                    ]}></Anime>
            </>
        )
    }

    AnimateResourceConsumption(resource) {
        // Takes the resource ID and performs the "resourcce consumed" animation
        return (
            <>
                <Anime
                    initial={[
                        {
                            targets: '#' + resource.resourceId,
                            scale: [1, 0],
                            rotate: 360,
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
                        {this.AnimateBirth(creature)}
                    </div>
                 
                </>
            )
        }
    }
}

export default Animation
