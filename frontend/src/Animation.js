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
                id={'text' + creature.getId()}
                style={{
                    position: 'absolute',
                    left: `${creature.getXcoordinate() - textOffsetSide}px`,
                    top: `${creature.getYcoordinate() - textOffsetUp}px`,
                    fontSize: '1.5vh',
                }}>
                {creature.getId() + ': '}

                {creature.getLastaction()}
            </div>
        )
    }

    CreateCreature(creature) {
        //creates the elements for creatures
        let roundness = '0%'
        if (creature.getShape() === 'circle') {
            roundness = '50%'
        }

        if (creature.getShape() === 'triangle') {
            return (
                <div
                    id={creature.getId()}
                    style={{
                        position: 'absolute',
                        left: `${creature.getXcoordinate()}px`,
                        top: `${creature.getYcoordinate()}px`,
                        width: '0px',
                        height: '0px',

                        borderStyle: 'solid',
                        borderTopWidth: '0px',
                        borderLeftWidth: '1vh',
                        borderBottomWidth: '2vh',
                        borderRightWidth: '1vh',

                        borderTopColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderBottomColor: creature.getColor(),
                        borderLeftColor: 'transparent',
                    }}></div>
            )
        } else {
            //return the circle or square
            return (
                <>
                    <div
                        id={creature.getId()}
                        style={{
                            position: 'absolute',
                            left: `${creature.getXcoordinate()}px`,
                            top: `${creature.getYcoordinate()}px`,
                            background: creature.getColor(),
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
                            targets: '#' + creature.getId(),
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
                            targets: '#' + creature.getId(),
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
                            targets: '#' + creature.getId(),
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
                            targets: '#' + creature.getId(),
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
                            targets: '#' + creature.getId(),
                            left: `${creature.getXcoordinate()}px`,
                            top: `${creature.getYcoordinate()}px`,
                            easing: 'linear',
                            duration: 1000 / this.props.simulationSpeed,
                        },
                    ]}></Anime>
                <Anime
                    initial={[
                        {
                            targets: '#text' + creature.getId(),
                            left: `${
                                creature.getXcoordinate() - textOffsetSide
                            }px`,
                            top: `${
                                creature.getYcoordinate() - textOffsetUp
                            }px`,
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
                            targets: '#' + creature.getId(),
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
                            targets: '#' + creature.getId(),
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
                            targets: '#' + creature.getId(),
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
        if (resource.getShape() === 'circle') {
            roundness = '50%'
        }

        if (resource.getShape() === 'triangle') {
            return (
                <div id={resource.getId()}>
                    <div
                        style={{
                            position: 'absolute',
                            left: `${resource.getXcoordinate()}px`,
                            top: `${resource.getYcoordinate()}px`,
                            width: '0px',
                            height: '0px',

                            borderStyle: 'solid',
                            borderTopWidth: '0px',
                            borderLeftWidth: '7.5px',
                            borderBottomWidth: '13.0px',
                            borderRightWidth: '7.5px',

                            borderTopColor: 'transparent',
                            borderRightColor: 'transparent',
                            borderBottomColor: resource.getColor(),
                            borderLeftColor: 'transparent',
                        }}></div>
                    <div
                        style={{
                            position: 'absolute',
                            left: `${resource.getXcoordinate() + 2.5}px`,
                            top: `${resource.getYcoordinate() + 2.25}px`,
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
                        id={resource.getId()}
                        style={{
                            position: 'absolute',
                            left: `${resource.getXcoordinate()}px`,
                            top: `${resource.getYcoordinate()}px`,
                            background: 'gray',
                            borderRadius: roundness,
                            borderColor: resource.getColor(),
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
                            targets: '#' + resource.getId(),
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

            if (creature.getLastaction() === 'BIRTHED') {
                //make the elements for both the animation and the text
                elementsArray.push({
                    key: creature.getId(),
                    elem: (
                        <div key={'creature' + keyId++}>
                            {this.CreateCreature(creature)}
                        </div>
                    ),
                })
                textArray.push({
                    key: 'text' + creature.getId(),
                    elem: (
                        <div key={'text' + keyId++}>
                            {this.CreateText(creature)}
                        </div>
                    ),
                })
            }

            if (creature.getLastaction() !== 'DEAD') {
                //remove the element After playing the animation
                //move the creatures
                changeLogArray.push({
                    key: creature.getId(),
                    elem: (
                        <div key={'movement' + keyId++}>
                            {this.CreateCreature(creature)}
                        </div>
                    ),
                })

                textChangeLogArray.push({
                    key: 'text' + creature.getId(),
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

            if (creature.getLastaction() === 'BIRTHED') {
                jsx.push(<div key={keyId++}>{this.AnimateBirth(creature)}</div>)
            } else if (creature.getLastaction() === 'DEAD') {
                //remove the element After playing the animation
                jsx.push(
                    <div key={keyId++}>{this.AnimateKilled(creature)}</div>
                )
            } else if (creature.getLastaction() === 'REPRODUCE') {
                jsx.push(
                    <div key={keyId++}>{this.AnimateReproduce(creature)}</div>
                )
            } else if (creature.getLastaction() === 'HIDE_FROM_CREATURE') {
                jsx.push(<div key={keyId++}>{this.AnimateHide(creature)}</div>)
            } else if (creature.getLastaction() === 'HURT') {
                jsx.push(
                    <div key={keyId++}>{this.AnimateDamage(creature)}</div>
                )
            } else if (creature.getLastaction() === 'ATTACK_A_CREATURE') {
                jsx.push(
                    <div key={keyId++}>{this.AnimateAttack(creature)}</div>
                )
            } else if (creature.getLastaction() === 'MATURE') {
                jsx.push(
                    <div key={keyId++}>{this.AnimateMaturing(creature)}</div>
                )
            }

            if (creature.getLastaction() !== 'DEAD') {
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
            jsx.push(
                <div key={keyId++}>
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
                <div key={keyId++}>
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
