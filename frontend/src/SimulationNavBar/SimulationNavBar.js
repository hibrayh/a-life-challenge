import React from 'react'
import { useState } from 'react'
import './SimulationNavBar.css'
import { FaPlay } from 'react-icons/fa'
import { FaPause } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa'
import { FaMinus } from 'react-icons/fa'
import { FaFastForward } from 'react-icons/fa'
import { FaFastBackward } from 'react-icons/fa'
import { FaTree } from 'react-icons/fa'
import { FaFileAlt } from 'react-icons/fa'
import { FaTimes } from 'react-icons/fa'

function SimulationNavBar() {
    const [showCreatureOrSpeciesForm, setShowCreatureOrSpeciesForm] = useState(false)
    const [showNewCreatureForm, setShowNewCreatureForm] = useState(false)


    return (
        <div>
            <NewCreatureOrSpeciesForm 
                toggleNewCreatureForm={toggleNewCreatureForm} 
                toggleCreatureOrSpeciesForm={toggleCreatureOrSpeciesForm} 
                show={showCreatureOrSpeciesForm}
            />
            <NewCreatureForm 
                show={showNewCreatureForm} 
                toggleNewCreatureForm={toggleNewCreatureForm} 
            />

            <div id="simulationNavBar">

                <PausePlayButton />

                <CurrentTime />

                <CurrentSpeed />

                <SlowDownButton />

                <SpeedUpButton />

                <AddNewCreatureOrSpeciesButton 
                    toggleCreatureOrSpeciesForm={toggleCreatureOrSpeciesForm} 
                    closeNewCreatureForm={closeNewCreatureForm} 
                />

                <TopographyButton />

            </div>
        </div>
    )

    function toggleCreatureOrSpeciesForm(){
        setShowCreatureOrSpeciesForm(!showCreatureOrSpeciesForm)
    }

    function toggleNewCreatureForm(){
        setShowNewCreatureForm(!showNewCreatureForm)
    }

    function closeNewCreatureForm(){
        setShowNewCreatureForm(false)
    }
}

function NewCreatureForm(props){


    if(props.show){
        return(
            <div id="newCreatureForm">

            </div>
        )
    }
}


function NewCreatureOrSpeciesForm(props){


    if(props.show){
        return(
            <div id="newCreatureOrSpeciesForm">
                <h1 id="creatureOrSpeciesFormTitle">I would you like to...</h1>
                <button onClick={props.toggleCreatureOrSpeciesForm} className="formExitButton"><FaTimes /></button>
                <button onClick={() => {
                    props.toggleNewCreatureForm();
                    props.toggleCreatureOrSpeciesForm();
                    }} 
                className="creatureSpeciesFormButton" id="createNewCreatureButton">Create New Creature</button>
                <button className="creatureSpeciesFormButton" id="createNewSpeciesButton">Create New Species</button>
            </div>
        )
    }

}

function TopographyButton(props) {
    return (
        <button
            onClick={handleClick}
            id="topographyButton"
            className="navButton">
            <FaTree />
        </button>
    )

    function handleClick() {}
}

function AddNewCreatureOrSpeciesButton(props) {
    return (
        <button
            onClick={() => {
                props.toggleCreatureOrSpeciesForm();
                props.closeNewCreatureForm();
            }}
            id="addNewCreatureOrSpeciesButton"
            className="navButton">
            <FaPlus />
        </button>
    )

}

function PausePlayButton(props) {
    const [showPlayButton, setShowPlayButton] = useState(true)

    function handleClick() {
        setShowPlayButton(!showPlayButton)
    }

    if (showPlayButton) {
        return (
            <button
                onClick={handleClick}
                id="pausePlayButton"
                className="navButton">
                <FaPlay />
            </button>
        )
    } else {
        return (
            <button
                onClick={handleClick}
                id="pausePlayButton"
                className="navButton">
                <FaPause />
            </button>
        )
    }
}

function CurrentTime(props) {
    return <span id="currentTime">2022-11-28 01:02 pm</span>
}

function CurrentSpeed(props) {
    return <span id="currentSpeed">5.3 min/sec</span>
}

function SpeedUpButton(props) {
    return (
        <button onClick={handleClick} id="speedUpButton" className="navButton">
            <FaFastForward />
        </button>
    )

    function handleClick() {}
}

function SlowDownButton(props) {
    return (
        <button onClick={handleClick} id="slowDownButton" className="navButton">
            <FaFastBackward />
        </button>
    )

    function handleClick() {}
}

export default SimulationNavBar
