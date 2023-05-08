import './DummyConnection.css'
import React from 'react'
import ReactAnime from 'react-animejs'

const { Anime } = ReactAnime

//const used to define the creature element size
const grown = '2vh'
const textOffsetUp = 20
const textOffsetSide = 40
let elementsArray = []
let textArray = []
let changeLogArray = []
let textChangeLogArray = []
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
    }

    CreateText(creature) {
        return (
            <div
                id={'text' + creature.creatureId}
                style={{
                    position: 'absolute',
                    left: `${creature.locationX - textOffsetSide}px`,
                    top: `${creature.locationY - textOffsetUp}px`,
                    fontSize: '1.5vh',
                }}>
                {creature.creatureId + ': '}

                {creature.lastAction}
            </div>
        )
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
                            duration: 1000 / this.props.simulationSpeed,
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
                            easing: 'easeInOutElastic(8, 1)',
                            duration: 1000 / this.props.simulationSpeed,
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
                                    duration:
                                        1000 /
                                        (10 * this.props.simulationSpeed),
                                },
                                {
                                    translateY: '-=0.6vh',
                                    easing: 'linear',
                                    duration:
                                        1000 /
                                        (10 * this.props.simulationSpeed),
                                },
                                {
                                    translateY: '+=0.1vh',
                                    easing: 'linear',
                                    duration:
                                        1000 /
                                        (10 * this.props.simulationSpeed),
                                },
                                {
                                    translateY: '+=0.5vh',
                                    easing: 'linear',
                                    duration:
                                        1000 /
                                        (10 * this.props.simulationSpeed),
                                },
                                {
                                    translateY: '+=2vh',
                                    easing: 'linear',
                                    duration:
                                        1000 /
                                        (10 * this.props.simulationSpeed),
                                },
                                {
                                    translateY: '-=2vh',
                                    easing: 'linear',
                                    duration:
                                        1000 /
                                        (10 * this.props.simulationSpeed),
                                },
                                {
                                    translateY: '-=0.6vh',
                                    easing: 'linear',
                                    duration:
                                        1000 /
                                        (10 * this.props.simulationSpeed),
                                },
                                {
                                    translateY: '+=0.1vh',
                                    easing: 'linear',
                                    duration:
                                        1000 /
                                        (10 * this.props.simulationSpeed),
                                },
                                {
                                    translateY: '+=0.5vh',
                                    easing: 'linear',
                                    duration:
                                        1000 /
                                        (10 * this.props.simulationSpeed),
                                },
                                {
                                    translateY: '+=2vh',
                                    easing: 'linear',
                                    duration:
                                        1000 /
                                        (10 * this.props.simulationSpeed),
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
                                {
                                    opacity: '0.2',
                                    duration:
                                        1000 / (3 * this.props.simulationSpeed),
                                },
                                {
                                    opacity: '0.2',
                                    duration:
                                        1000 / (3 * this.props.simulationSpeed),
                                },
                                {
                                    opacity: '1',
                                    duration:
                                        1000 / (3 * this.props.simulationSpeed),
                                },
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
                            duration: 1000 / this.props.simulationSpeed,
                        },
                    ]}></Anime>
                <Anime
                    initial={[
                        {
                            targets: '#text' + creature.creatureId,
                            left: `${creature.locationX - textOffsetSide}px`,
                            top: `${creature.locationY - textOffsetUp}px`,
                            easing: 'linear',
                            duration: 1000 / this.props.simulationSpeed,
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
                                    duration:
                                        1000 / (3 * this.props.simulationSpeed),
                                },
                                {
                                    scale: [1, 1.5],
                                    easing: 'easeInOutElastic(4, 2)',
                                    duration:
                                        1000 / (3 * this.props.simulationSpeed),
                                },
                                {
                                    scale: [1.5, 1],
                                    easing: 'linear',
                                    duration:
                                        1000 / (3 * this.props.simulationSpeed),
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
                                    duration:
                                        1000 / (2 * this.props.simulationSpeed),
                                },
                                {
                                    translateX: '-=0.5vw',
                                    easing: 'linear',
                                    duration:
                                        1000 / (2 * this.props.simulationSpeed),
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
                <div id={resource.resourceId}>
                    <div
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
                    <div
                        style={{
                            position: 'absolute',
                            left: `${resource.locationX + 2.5}px`,
                            top: `${resource.locationY + 2.25}px`,
                            width: '0px',
                            height: '0px',

                            borderStyle: 'solid',
                            borderTopWidth: '0px',
                            borderLeftWidth: '4.5px',
                            borderBottomWidth: '10px',
                            borderRightWidth: '4.5px',

                            borderTopColor: 'transparent',
                            borderRightColor: 'transparent',
                            borderBottomColor: 'gray',
                            borderLeftColor: 'transparent',
                        }}></div>
                </div>
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
                            background: 'gray',
                            borderRadius: roundness,
                            borderColor: resource.color,
                            borderStyle: 'solid',
                            height: '1vh',
                            width: '1vh',
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

    elementManagement() {
        //adds, removes, and re-add elements at their new locations
        //this has to happen regardless of whether the animations are running, as we still
        //want the creatures to at least Show on screen

        // now re-add the items that moved from changelog at the correct location
        elementsArray = []
        textArray = []
        elementsArray = elementsArray.concat(changeLogArray)
        textArray = textArray.concat(textChangeLogArray)

        changeLogArray = [] //reset the movement log
        textChangeLogArray = []

        for (let i = 0; i < this.props.creaturesToAnimate.length; i++) {
            let creature = this.props.creaturesToAnimate[i]

            if (creature.lastAction === 'BIRTHED') {
                //make the elements for both the animation and the text
                elementsArray.push({
                    key: creature.creatureId,
                    elem: (
                        <div key={'creature' + keyId++}>
                            {this.CreateCreature(creature)}
                        </div>
                    ),
                })
                textArray.push({
                    key: 'text' + creature.creatureId,
                    elem: (
                        <div key={'text' + keyId++}>
                            {this.CreateText(creature)}
                        </div>
                    ),
                })
            }

            if (creature.lastAction !== 'DEAD') {
                //remove the element After playing the animation
                //move the creatures
                changeLogArray.push({
                    key: creature.creatureId,
                    elem: (
                        <div key={'movement' + keyId++}>
                            {this.CreateCreature(creature)}
                        </div>
                    ),
                })

                textChangeLogArray.push({
                    key: 'text' + creature.creatureId,
                    elem: (
                        <div key={'text' + keyId++}>
                            {this.CreateText(creature)}
                        </div>
                    ),
                })
            }
        }
    }

    runFullAnimations() {
        //This function is where the animation magic happens
        //That way the actual render() function is a bit clearer
        //returns the full animation jsx

        let jsx = []

        for (let i = 0; i < this.props.creaturesToAnimate.length; i++) {
            let creature = this.props.creaturesToAnimate[i]

            if (creature.lastAction === 'BIRTHED') {
                jsx.push(<div key={keyId++}>{this.AnimateBirth(creature)}</div>)
            } else if (creature.lastAction === 'DEAD') {
                //remove the element After playing the animation
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

            if (creature.lastAction !== 'DEAD') {
                //move the creatures only if they aren't dead
                jsx.push(
                    <div key={keyId++}>{this.AnimateMovement(creature)}</div>
                )
            }
        }

        return <div id="animation-wrapper">{jsx}</div>
    }

    runQuickAnimation() {
        let jsx = []

        for (let i = 0; i < this.props.creaturesToAnimate.length; i++) {
            let creature = this.props.creaturesToAnimate[i]

            //move the creatures
            jsx.push(<div key={keyId++}>{this.AnimateMovement(creature)}</div>)
        }

        for (let i = 0; i < this.props.resourcesToAnimate.length; i++) {
            let resource = this.props.resourcesToAnimate[i]
            console.log(resource)
            jsx.push(
                <div key={'resource' + { i }}>
                    {this.CreateResource(resource)}
                </div>
            )
        }

        return <div id="animation-wrapper">{jsx}</div>
    }

    render() {
        //returns the jsx will all its animations, and the elements in the element array for those animations to reference
        //we only want to actually display the full animation jsx if the time is slow enough to be stable
        let jsx = []
        let resourceJsx = []
        this.elementManagement() //manage the elements
        jsx = this.runFullAnimations()

        for (let i = 0; i < this.props.resourcesToAnimate.length; i++) {
            let resource = this.props.resourcesToAnimate[i]
            resourceJsx.push(
                <div key={'resource' + { i }}>
                    {this.CreateResource(resource)}
                </div>
            )
        }

        if (!this.props.toggleText) {
            return (
                <div id="animation-wrapper">
                    {resourceJsx}
                    {jsx}
                    {elementsArray.map((element) => (
                        <div key={'map' + keyId++}>{element.elem}</div>
                    ))}
                </div>
            )
        } else {
            // here we also include the text, this can easily be moved to a different
            // if statement, so it can be hooked up to a button

            return (
                <div id="animation-wrapper">
                    {resourceJsx}
                    {jsx}
                    {elementsArray.map((element) => (
                        <div key={'map' + keyId++}>{element.elem}</div>
                    ))}
                    {textArray.map((element) => (
                        <div key={'textmap' + keyId++}>{element.elem}</div>
                    ))}
                </div>
            )
        }
    }
}

export default Animation
