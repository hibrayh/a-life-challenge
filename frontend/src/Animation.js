import './DummyConnection.css'
import React from 'react'
import axios from 'axios'
import ReactAnime from 'react-animejs'
import { useState, useEffect } from 'react'
const { Anime } = ReactAnime

//const used to define the creature element size
const grown = '25px'
let elementsArray = []
let movementLogArray = []
let movementKey = 0

class Animation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isSimStarted: false,
            elements: elementsArray,
            creaturesToAnimate: [],
        }
        this.AnimateBirth = this.AnimateBirth.bind(this)
        this.AnimateMovement = this.AnimateMovement.bind(this)
        this.getCreatureInfo = this.getCreatureInfo.bind(this)
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
                {//this.CreateCreature(creature)
                }
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
                {//this.CreateCreature(creature)
                }
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

    render() {
        // Example of looping through all creatures and animating
        //if a creature moved, remove the element and create one at the correct spot
        for(let i = 0; i < movementLogArray.length; i++){
            //go through and remove the elements that have moved (gets them via the creature id)
            elementsArray = elementsArray.filter((element) => element.key === movementLogArray[i].key)
        }
        
        // now re-add them from the movementlog at the correct location
        elementsArray = elementsArray.concat(movementLogArray)

        let jsx = []
        movementLogArray = [] //reset the movement log

        for (let i = 0; i < this.props.creaturesToAnimate.length; i++) {
            let creature = this.props.creaturesToAnimate[i]
            movementKey += 1
            if (creature.lastAction === 'BIRTHED') {
                elementsArray.push({key: creature.creatureId, elem: <div key={"creature" + i}>{this.CreateCreature(creature)}</div>})
                jsx.push(<div key={i}>{this.AnimateBirth(creature)}</div>)
            } else if (creature.lastAction === 'DEATH') {
                jsx.push(<div key={i}>{this.AnimateKilled(creature)}</div>)
            } else if (creature.lastAction === 'REPRODUCE') {
                jsx.push(<div key={i}>{this.AnimateReproduce(creature)}</div>)
            } else if (creature.lastAction === 'HIDE_FROM_CREATURE') {
                jsx.push(<div key={i}>{this.AnimateHide(creature)}</div>)
            } else {
                movementLogArray.push({key: creature.creatureId, elem: <div key={"creature" + movementKey}>{this.CreateCreature(creature)}</div>})
                jsx.push(<div key={i}>{this.AnimateMovement(creature)}</div>)

            }
        }

        for (let i = 0; i < this.props.resourcesToAnimate.length; i++) {
            let resource = this.props.resourcesToAnimate[i]
            jsx.push(
                <div key={'res' + { i }}>
                    {this.AnimateResourceSpawn(
                        resource.resourceId,
                        resource.locationX,
                        resource.locationY,
                        resource.color
                    )}
                </div>
            )
        }

        return <div id="animation-wrapper">{jsx}{elementsArray.map((element) => <div key={element.key + "jsx" + movementKey++}>{element.elem}</div>)}</div>
    }
}

export default Animation
