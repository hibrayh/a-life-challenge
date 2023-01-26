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
import {NewCreatureForm} from './NewCreatureForm.js'
import {NewCreatureOrSpeciesForm} from './NewCreatureForm.js'
import NewSpeciesForm from './NewSpeciesForm.js'


function SimulationNavBar() {
    const [showCreatureOrSpeciesForm, setShowCreatureOrSpeciesForm] = useState(false)
    const [showNewCreatureForm, setShowNewCreatureForm] = useState(false)
    const [showNewSpeciesForm, setShowNewSpeciesForm] = useState(false)

    return (
        <div>
            <NewCreatureOrSpeciesForm 
                toggleNewCreatureForm={toggleNewCreatureForm} 
                toggleNewSpeciesForm={toggleNewSpeciesForm}
                toggleCreatureOrSpeciesForm={toggleCreatureOrSpeciesForm} 
                show={showCreatureOrSpeciesForm}
            />
            <NewCreatureForm 
                show={showNewCreatureForm} 
                toggleNewCreatureForm={toggleNewCreatureForm} 
            />

            <NewSpeciesForm 
                show={showNewSpeciesForm}
                toggleNewSpeciesForm={toggleNewSpeciesForm}
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
                    toggleNewSpeciesForm={toggleNewSpeciesForm}
                    closeNewSpeciesForm={closeNewSpeciesForm} 
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


    function toggleNewSpeciesForm(){
        setShowNewSpeciesForm(!showNewSpeciesForm)
    }

    function closeNewSpeciesForm(){
        setShowNewSpeciesForm(false)
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

        // if the play button has been pressed, start the simulation
        if(!showPlayButton){
            //props.startSimulation()
        }
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
