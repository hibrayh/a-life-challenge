import './DummyConnection.css'
import React from 'react'
import axios from 'axios'
import ReactAnime from 'react-animejs'
const { Anime } = ReactAnime

//const used to define the creature element size
const grown = '25px'

class Animation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isSimStarted: false,
        }
        this.AnimateBirth = this.AnimateBirth.bind(this)
        this.AnimateMovement = this.AnimateMovement.bind(this)
        this.getCreatureInfo = this.getCreatureInfo.bind(this)
        //this.startSimulation = this.startSimulation.bind(this)
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

    AnimateStarved(creatureId) {
        // Takes the creature ID and performs the "creature starved" animation
        return (
            <div id={{ creatureId } + '-killed-wrapper'}>
                <Anime
                    id={{ creatureId } + '-animation-panel'}
                    initial={[
                        {
                            targets: '#' + creatureId,
                            opacity: '0',
                            duration: 3000,
                            easing: 'easeInOutElastic(8, 1)',
                        },
                    ]}></Anime>
            </div>
        )
    }

    AnimateKilled(creatureId) {
        // Takes the creature ID and performs the "creature killed" animation
        return (
            <>
                <Anime
                    initial={[
                        {
                            targets: '#' + creatureId,
                            keyframes: [
                                {
                                    translateX: '+=5',
                                    easing: 'easeInOutElastic(9, .5)',
                                    duration: 750,
                                },
                                { opacity: '0' },
                            ],
                            easing: 'linear',
                        },
                    ]}></Anime>
            </>
        )
    }

    AnimateOldAge(creatureId) {
        // Takes the creature ID and performs the "creature starved" animation
        return (
            <>
                <Anime
                    initial={[
                        {
                            targets: '#' + creatureId,
                            keyframes: [
                                { opacity: '0.5', duration: 750 },
                                { opacity: '0', delay: 2000 },
                            ],
                            easing: 'linear',
                        },
                    ]}></Anime>
            </>
        )
    }

    AnimateMovement(creature) {
        // Takes the creature ID and moves to to the specified X and Y location
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
                        borderRadius: '50%',
                        height: grown,
                        width: grown,
                    }}
                />
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

    AnimateResourceSpawn(resourceId, locationX, locationY, color) {
        // Takes the resource ID, its location x and y, and color to create an element with specific animation
        return (
            <>
                <div
                    id={resourceId}
                    style={{
                        position: 'absolute',
                        left: `${locationX}px`,
                        top: `${locationY}px`,
                        width: '0px',
                        height: '0px',

                        borderStyle: 'solid',
                        borderTopWidth: '0px',
                        borderLeftWidth: '7.5px',
                        borderBottomWidth: '13.0px',
                        borderRightWidth: '7.5px',

                        borderTopColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderBottomColor: color,
                        borderLeftColor: 'transparent',
                    }}
                />
                <Anime
                    initial={[
                        {
                            targets: '#' + resourceId,
                            scale: [0, 1],
                            rotate: 360,
                            easing: 'linear',
                        },
                    ]}></Anime>
            </>
        )
    }

    AnimateResourceConsumption(resourceId) {
        // Takes the resource ID and performs the "resourcce consumed" animation
        return (
            <>
                <Anime
                    initial={[
                        {
                            targets: '#' + resourceId,
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

    /*
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
            url: 'http://localhost:5000/mass-create-more-creatures',
            data: {
                speciesName: 'Shlorpians',
                numberOfNewCreatures: '2',
            },
        })

        await axios({
            method: 'GET',
            url: 'http://localhost:5000/advance-simulation',
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

        await axios({
            method: 'GET',
            url: 'http://localhost:5000/get-environment-info',
        }).then((response) => {
            const res = response.data
            this.setState({
                isSimStarted: true,
                foodObjects: res.foodRegistry,
            })
        })
    }
    */

    render() {
        // Example of looping through all creatures and animating
        let jsx = []
        for (let i = 0; i < this.props.creaturesToAnimate.length; i++) {
            let creature = this.props.creaturesToAnimate[i]
            console.log(creature)
            if (creature.lastAction === 'BIRTHED') {
                jsx.push(<div key={i}>{this.AnimateBirth(creature)}</div>)
            } else if (creature.lastAction === 'DEATH') {
                jsx.push(<div key={i}>{this.AnimateKilled(creature)}</div>)
            } else if (creature.lastAction === 'REPRODUCE') {
                jsx.push(<div key={i}>{this.AnimateMovement(creature)}</div>)
            } else {
                jsx.push(<div key={i}>{this.AnimateMovement(creature)}</div>)
            }
        }
        return <div id="animation-wrapper">{jsx}</div>
    }
}

export default Animation
