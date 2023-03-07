import './DummyConnection.css'
import React from 'react'
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
                            duration: 1000 / this.props.simulationSpeed
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
                            duration: 1000 / this.props.simulationSpeed
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
                                    duration: 1000/(10*this.props.simulationSpeed)  
                                },
                                {
                                    translateY: '-=0.6vh',
                                    easing: 'linear',
                                    duration: 1000/(10*this.props.simulationSpeed)
                                },
                                {
                                    translateY: '+=0.1vh',
                                    easing: 'linear',
                                    duration: 1000/(10*this.props.simulationSpeed) 
                                },
                                {
                                    translateY: '+=0.5vh',
                                    easing: 'linear',
                                    duration: 1000/(10*this.props.simulationSpeed) 
                                },
                                {
                                    translateY: '+=2vh',
                                    easing: 'linear',
                                    duration: 1000/(10*this.props.simulationSpeed) 
                                },
                                {
                                    translateY: '-=2vh',
                                    easing: 'linear',
                                    duration: 1000/(10*this.props.simulationSpeed) 
                                },
                                {
                                    translateY: '-=0.6vh',
                                    easing: 'linear',
                                    duration: 1000/(10*this.props.simulationSpeed) 
                                },
                                {
                                    translateY: '+=0.1vh',
                                    easing: 'linear',
                                    duration: 1000/(10*this.props.simulationSpeed) 
                                },
                                {
                                    translateY: '+=0.5vh',
                                    easing: 'linear',
                                    duration: 1000/(10*this.props.simulationSpeed) 
                                },
                                {
                                    translateY: '+=2vh',
                                    easing: 'linear',
                                    duration: 1000/(10*this.props.simulationSpeed) 
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
                                { opacity: '0.2',
                                  duration: 1000/(3*this.props.simulationSpeed)  
                                },
                                { opacity: '0.2', 
                                  duration: 1000/(3*this.props.simulationSpeed)  
                                },
                                { opacity: '1',
                                  duration: 1000/(3*this.props.simulationSpeed)  
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
                                    duration: 1000 / (3*this.props.simulationSpeed)
                                },
                                {
                                    scale: [1, 1.5],
                                    easing: 'easeInOutElastic(4, 2)',
                                    duration: 1000 / (3*this.props.simulationSpeed)
                                },
                                {
                                    scale: [1.5, 1],
                                    easing: 'linear',
                                    duration: 1000 / (3*this.props.simulationSpeed)
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
                                    duration: 1000 / (2*this.props.simulationSpeed)
                                },
                                {
                                    translateX: '-=0.5vw',
                                    easing: 'linear',
                                    duration: 1000 / (2*this.props.simulationSpeed)
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

    runAnimations(){
        //This function is where the element management and animation magic happen
        //That way the actual render() function is a bit clearer
        //While it manages the elements, it only actually returns the animation jsx

        let jsx = []

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
        console.log(this.props.simulationSpeed)

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
        

        for (let i = 0; i < this.props.resourcesToAnimate.length; i++) {
            let resource = this.props.resourcesToAnimate[i]
            console.log(resource)
            jsx.push(
                <div key={'resource' + { i }}>
                    {this.CreateResource(resource)}
                </div>
            )
        }

        return (
            <div id="animation-wrapper">
                {jsx}
            </div>
        )

    }

    displayText(){

    }

    render() {

        //returns the jsx will all its animations, and the elements in the element array for those animations to reference
        let jsx = this.runAnimations()

        //we only want to actually display the jsx if the time is slow enough to be stable
        //we always want to return the elementsArray

        if(this.props.simulationSpeed < 4){
            // run the animations
            return (
                <div id="animation-wrapper">
                    {jsx}
                    {elementsArray.map((element) => (
                        <div key={'map' + keyId++}>{element.elem}</div>
                    ))}
                </div>
            )
        }

        return (
            // just show the elements
            <div id="animation-wrapper">
                {elementsArray.map((element) => (
                    <div key={'map' + keyId++}>{element.elem}</div>
                ))}
            </div>
        )
    }

}

export default Animation
