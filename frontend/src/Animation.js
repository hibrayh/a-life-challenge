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
            creaturesToAnimate: [],
            creatures: [],
            food: [],
        }
        this.AnimateBirth = this.AnimateBirth.bind(this)
        this.AnimateMovement = this.AnimateMovement.bind(this)
        this.getCreatureInfo = this.getCreatureInfo.bind(this)
        this.startSimulation = this.startSimulation.bind(this)
        this.getFoodInfo = this.getFoodInfo.bind(this)
        this.AnimateResourceSpawn = this.AnimateResourceSpawn.bind(this)
    }

    CreateCreature(creature) {
        //creates the elements for creatures
        let roundness = '0%'
        if (creature.shape === 'circle') {
            roundness = '50%'
        }

        if (creature.shape === 'triangle') {
            return (
                <div
                    id={creature.creatureId}
                    style={{
                        position: 'absolute',
                        left: `${creature.locationX}px`,
                        top: `${creature.locationY}px`,
                        width: '0px',
                        height: '0px',

                        borderStyle: 'solid',
                        borderTopWidth: '0px',
                        borderLeftWidth: '7.5px',
                        borderBottomWidth: '13.0px',
                        borderRightWidth: '7.5px',

                        borderTopColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderBottomColor: creature.color,
                        borderLeftColor: 'transparent',
                    }}></div>
            )
        } else {
            //return the circle or square
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
                </>
            )
        }
    }

    AnimateBirth(creature) {
        // Takes the creature to create an element with specific animation
        return (
            <>
                {this.CreateCreature(creature)}
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

    AnimateKilled(creature) {
        // Takes the creature ID and performs the "creature starved" animation
        return (
            <>
                {this.CreateCreature(creature)}
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

    AnimateReproduce(creature) {
        // Takes the creature ID and performs the "creature killed" animation
        return (
            <>
                {this.CreateCreature(creature)}
                <Anime
                    initial={[
                        {
                            targets: '#' + creature.creatureId,
                            translateY: '+=5',
                            easing: 'easeInOutElastic(9, .5)',
                            duration: 750,
                        },
                    ]}></Anime>
            </>
        )
    }

    AnimateHide(creature) {
        // Takes the creature ID and performs the "creature starved" animation
        return (
            <>
                {this.CreateCreature(creature)}
                <Anime
                    initial={[
                        {
                            targets: '#' + creature.creatureId,
                            keyframes: [
                                { opacity: '0.5', duration: 750 },
                                { opacity: '1', delay: 2000 },
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
                {this.CreateCreature(creature)}
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

    AnimateResourceSpawn(food) {
        let roundness = ''
        if (food.shape === 'square') {
            roundness = '0%'
        } else if (food.shape === 'circle'){
            roundness = '50%'
        }else if (food.shape === 'oval'){
            roundness = '75% / 50%'
            }
            
        return (
            <>
                <div
                    id={food.foodName}
                    style={{
                        position: 'absolute',
                        left: `${food.locationX}px`,
                        top: `${food.locationY}px`,
                        background: food.color,
                        borderRadius: roundness,
                        width: grown,
                        height: grown,

                        borderStyle: 'solid',
                        borderTopWidth: '0px',
                        borderLeftWidth: '7.5px',
                        borderBottomWidth: '13.0px',
                        borderRightWidth: '7.5px',

                        borderTopColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderBottomColor: food.color,
                        borderLeftColor: 'transparent',
                    }}
                />
                <Anime
                    initial={[
                        {
                            targets: '#' + food.foodName,
                            scale: [0, 1],
                            rotate: 360,
                            easing: 'linear',
                        },
                    ]}></Anime>
            </>
        )
    }

    AnimateResourceConsumption(food) {
        // Takes the resource ID and performs the "resource consumed" animation
        return (
            <>
                <Anime
                    initial={[
                        {
                            targets: '#' + food.foodName,
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

    getFoodInfo() {
        // Use axios to retrieve info from the backend
        axios({
            method: 'GET',
            url: 'http://localhost:5000/get-food-info',
        }).then((response) => {
            const res = response.data
            console.log(res)
            // change the state variable to trigger a re-render
            this.setState({
                foodName: res.foodName,
                energyReplenishment: res.energyReplenishment,
                rarity: res.rarity,
                shape: res.shape,
                color: res.color,
                locationX: res.locationX,
                locationY: res.locationY,
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
            url: 'http://localhost:5000/get-food-info',
        }).then((response) => {
            const res = response.data
            this.setState({
                isSimStarted: true,
                food: res.foodRegistry,
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
            // Example of looping through all creatures and animating
            let creatureJsx = []
            for (let i = 0; i < this.state.creatures.length; i++) {
                let creature = this.state.creatures[i]
                console.log(creature)
                if (creature.lastAction === 'BIRTHED') {
                    creatureJsx.push(<div key={i}>{this.AnimateBirth(creature)}</div>)
                } else if (creature.lastAction === 'DEATH') {
                    creatureJsx.push(<div key={i}>{this.AnimateKilled(creature)}</div>)
                } else if (creature.lastAction === 'REPRODUCE') {
                    creatureJsx.push(
                        <div key={i}>{this.AnimateMovement(creature)}</div>
                    )
                } else {
                    creatureJsx.push(
                        <div key={i}>{this.AnimateMovement(creature)}</div>
                    )
                }
            }
            let foodJsx = []
            for (let i = 0; i < this.state.food.length; i++) {
                let food = this.state.food[i]
                console.log(food)
                foodJsx.push(
                    <div key={i}>
                        {this.AnimateResourceSpawn(food)}
                        </div>
                        );
            }
            return (
                <div id="animation-wrapper">
                    {creatureJsx}
                    {foodJsx}
                </div>
            )
        }
        return <div id="animation-wrapper">{jsx}</div>
    }
}

export default Animation
