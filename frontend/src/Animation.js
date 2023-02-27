import './DummyConnection.css'
import React from 'react'
import axios from 'axios'
import ReactAnime from 'react-animejs'

const { Anime } = ReactAnime

//const used to define the creature element size
const grown = '2vh'
let elementsArray = []
let changeLogArray = []
let removeLogArray = []
let keyId = 0

class Animation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isSimStarted: false,
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
                        borderLeftWidth: '1vh',
                        borderBottomWidth: '2vh',
                        borderRightWidth: '1vh',

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
                <Anime
                    initial={[
                        {
                            targets: '#' + creature.creatureId,
                            scale: [0, 1],
                            rotate: 360,
                            easing: 'linear',
                        },
                    ]}></Anime>
            </>
        )
    }

    AnimateKilled(creature) {
        // Takes the creature ID and performs the "creature dies" animation
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

    AnimateReproduce(creature) {
        // Takes the creature ID and performs the "creature reproduces" animation, two jumps
        return (
            <>
                <Anime
                    initial={[
                        {
                            targets: '#' + creature.creatureId,
                            keyframes: [
                                {
                                    translateY: '-=2vh',
                                    easing: 'linear',
                                },
                                {
                                    translateY: '-=0.6vh',
                                    easing: 'linear',
                                },
                                {
                                    translateY: '+=0.1vh',
                                    easing: 'linear',
                                },
                                {
                                    translateY: '+=0.5vh',
                                    easing: 'linear',
                                },
                                {
                                    translateY: '+=2vh',
                                    easing: 'linear',
                                },
                                {
                                    translateY: '-=2vh',
                                    easing: 'linear',
                                },
                                {
                                    translateY: '-=0.6vh',
                                    easing: 'linear',
                                },
                                {
                                    translateY: '+=0.1vh',
                                    easing: 'linear',
                                },
                                {
                                    translateY: '+=0.5vh',
                                    easing: 'linear',
                                },
                                {
                                    translateY: '+=2vh',
                                    easing: 'linear',
                                },
                            ],
                        },
                    ]}></Anime>
            </>
        )
    }

    AnimateHide(creature) {
        // Takes the creature ID and performs the "creature starved" animation
        return (
            <>
                <Anime
                    initial={[
                        {
                            targets: '#' + creature.creatureId,
                            keyframes: [
                                { opacity: '0.2' },
                                { opacity: '0.2' },
                                { opacity: '1' },
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

    AnimateMaturing(creature) {
        // animates a creature maturing, sizes up then back down again
        return (
            <>
                <Anime
                    initial={[
                        {
                            targets: '#' + creature.creatureId,
                            keyframes: [
                                {
                                    scale: [1, 1.1],
                                    easing: 'easeInOutElastic(2, 2)',
                                },
                                {
                                    scale: [1, 1.5],
                                    easing: 'easeInOutElastic(4, 2)',
                                },
                                {
                                    scale: [1.5, 1],
                                    easing: 'linear',
                                },
                            ],
                        },
                    ]}></Anime>
            </>
        )
    }

    AnimateAttack(creature) {
        // Animates a creature attackng
        return (
            <>
                <Anime
                    initial={[
                        {
                            targets: '#' + creature.creatureId,
                            keyframes: [
                                {
                                    translateX: '+=0.5vw',
                                    easing: 'easeInOutElastic(7, 1)',
                                },
                                {
                                    translateX: '-=0.5vw',
                                    easing: 'linear',
                                },
                            ],
                        },
                    ]}></Anime>
            </>
        )
    }

    AnimateDamage(creature) {
        // Animates a creature taking damage, shrinks and grows back
        return (
            <>
                <Anime
                    initial={[
                        {
                            targets: '#' + creature.creatureId,
                            keyframes: [
                                {
                                    scale: [1, 0.5],
                                    opacity: '0.5',
                                    easing: 'easeInOutElastic(4, 1.5)',
                                },
                                {
                                    scale: [0.5, 1],
                                    opacity: '1',
                                    easing: 'linear',
                                },
                            ],
                        },
                    ]}></Anime>
            </>
        )
    }

    CreateResource(resource) {
        //creates the elements for creatures
        let roundness = '0%'
        if (resource.shape === 'circle') {
            roundness = '50%'
        }

        if (resource.shape === 'triangle') {
            return (
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
                    }}></div>
            )
        } else {
            //return the circle or square
            return (
                <>
                    <div
                        id={resource.resourceId}
                        style={{
                            position: 'absolute',
                            left: `${resource.locationX}px`,
                            top: `${resource.locationY}px`,
                            background: resource.color,
                            borderRadius: roundness,
                            height: grown,
                            width: grown,
                        }}
                    />
                </>
            )
        }
    }

    AnimateResourceSpawn(resource) {
        // Takes the resource ID, its location x and y, and color to create an element with specific animation
        return (
            <>
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
        //remove any creatures that were killed
        removeLogArray.forEach((removing) => {
            elementsArray = elementsArray.filter(
                (element) => element.key !== removing.key
            )
        })

        //if a creature moved, remove the element and create one at the correct spot
        changeLogArray.forEach((log) => {
            //go through and remove the elements that have moved or died (gets them via the creature id)
            elementsArray = elementsArray.filter(
                (element) => element.key !== log.key
            )
        })

        // now re-add the items that moved from changelog at the correct location
        elementsArray = elementsArray.concat(changeLogArray)

        let jsx = []
        changeLogArray = [] //reset the movement log
        removeLogArray = []

        for (let i = 0; i < this.props.creaturesToAnimate.length; i++) {
            let creature = this.props.creaturesToAnimate[i]

            if (creature.lastAction === 'BIRTHED') {
                elementsArray.push({
                    key: creature.creatureId,
                    elem: (
                        <div key={'creature' + keyId++}>
                            {this.CreateCreature(creature)}
                        </div>
                    ),
                })
                jsx.push(<div key={keyId++}>{this.AnimateBirth(creature)}</div>)
            } else if (creature.lastAction === 'DEATH') {
                //remove the element After playing the animation
                removeLogArray.push({ key: creature.creatureId })
                jsx.push(
                    <div key={keyId++}>{this.AnimateKilled(creature)}</div>
                )
            } else if (creature.lastAction === 'REPRODUCE') {
                jsx.push(
                    <div key={keyId++}>{this.AnimateReproduce(creature)}</div>
                )
            } else if (creature.lastAction === 'HIDE_FROM_CREATURE') {
                jsx.push(<div key={keyId++}>{this.AnimateHide(creature)}</div>)
            } else if (creature.lastAction === 'HURT') {
                jsx.push(
                    <div key={keyId++}>{this.AnimateDamage(creature)}</div>
                )
            } else if (creature.lastAction === 'ATTACK_A_CREATURE') {
                jsx.push(
                    <div key={keyId++}>{this.AnimateAttack(creature)}</div>
                )
            } else if (creature.lastAction === 'MATURE') {
                jsx.push(
                    <div key={keyId++}>{this.AnimateMaturing(creature)}</div>
                )
            }

            //move the creatures
            changeLogArray.push({
                key: creature.creatureId,
                elem: (
                    <div key={'movement' + keyId++}>
                        {this.CreateCreature(creature)}
                    </div>
                ),
            })
            jsx.push(<div key={keyId++}>{this.AnimateMovement(creature)}</div>)
        }
        //this is the updated format for animating the resources, not going to actually add it until I can
        //check if it works

        /*for (let i = 0; i < this.props.resourcesToAnimate.length; i++) {
            let resource = this.props.resourcesToAnimate[i]
            elementsArray.push({
                key: creature.creatureId,
                elem: (
                    <div key={'creature' + keyId++}>
                        {this.CreateCreature(creature)}
                    </div>
                ),
            })
            jsx.push(<div key={'res' + { i }}>{this.AnimateResourceSpawn(resource)}</div>)
        }*/

        for (let i = 0; i < this.props.resourcesToAnimate.length; i++) {
            let resource = this.props.resourcesToAnimate[i]
            console.log(resource)
            jsx.push(
                <div key={'resource' + { i }}>
                    {this.CreateResource(resource)}
                </div>
            )
        }

        //returns the jsx will all its animations, and the elements in the element array for those animations to reference
        return (
            <div id="animation-wrapper">
                {jsx}
                {elementsArray.map((element) => (
                    <div key={'map' + keyId++}>{element.elem}</div>
                ))}
            </div>
        )
    }
}

export default Animation
