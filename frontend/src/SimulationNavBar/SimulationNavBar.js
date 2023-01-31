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
import { FaSave } from 'react-icons/fa'
import {NewCreatureForm} from './CreatureForms/NewCreatureForm.js'
import {NewCreatureOrSpeciesForm} from './CreatureForms/NewCreatureForm.js'
import NewSpeciesForm from './CreatureForms/NewSpeciesForm.js'
import StatsPage from './StatsPage/StatsPage.js'
import TopographyPage from './Topography/Topography.js'


function SimulationNavBar() {
    const [showCreatureOrSpeciesForm, setShowCreatureOrSpeciesForm] =
        useState(false)
    const [showNewCreatureForm, setShowNewCreatureForm] = useState(false)
    const [showNewSpeciesForm, setShowNewSpeciesForm] = useState(false)
    const [showStatsPage, setShowStatsPage] = useState(false)
    const [showTopographyPage, setShowTopographyPage] = useState(false)

    return (
        <div>
           

            <StatsPage 
                show={showStatsPage}
                closeStatsPage={closeStatsPage}
            />

            <TopographyPage 
                show={showTopographyPage}
                closeTopographyPage={closeTopographyPage}
            />
            


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

                <TopographyButton 
                    toggleTopographyPage={toggleTopographyPage}
                />

                <StatsButton 
                    toggleStatsPage={toggleStatsPage}
                />

                <SaveButton />

            </div>
        </div>
    )


    // functions for all creature/species related forms 
    function toggleCreatureOrSpeciesForm(){
        setShowCreatureOrSpeciesForm(!showCreatureOrSpeciesForm)
    }

    function toggleNewCreatureForm() {
        setShowNewCreatureForm(!showNewCreatureForm)
    }

    function closeNewCreatureForm() {
        setShowNewCreatureForm(false)
    }


    function toggleNewSpeciesForm(){
        setShowNewSpeciesForm(!showNewSpeciesForm)
    }

    function closeNewSpeciesForm(){
        setShowNewSpeciesForm(false)
    }


    // functions for stats page
    function closeStatsPage(){
        setShowStatsPage(false)
    }

    function toggleStatsPage(){
        setShowStatsPage(!showStatsPage)
    }

    
    // functions for topography page
    function closeTopographyPage(){
        setShowTopographyPage(false)
    }

    function toggleTopographyPage(){
        setShowTopographyPage(!showTopographyPage)
    }

}


function StatsButton(props){

    return(
        <button onClick={handleClick} id="statsButton" className="navButton" title="Stats Page"><FaFileAlt /></button>
    )

    function handleClick(){
        props.toggleStatsPage()
    }
}

function SaveButton(props){

    return(
        <button id="saveButton" className="navButton" title="Save"><FaSave /></button>
    )
}

function TopographyButton(props) {
    return (
        <button
            onClick={props.toggleTopographyPage}
            id="topographyButton"
            className="navButton"
            title="Topography">
            <FaTree />
        </button>
    )
}

function AddNewCreatureOrSpeciesButton(props) {
    return (
        <button
            onClick={() => {
                props.toggleCreatureOrSpeciesForm();
                props.closeNewCreatureForm();
                props.closeNewSpeciesForm();
            }}
            id="addNewCreatureOrSpeciesButton"
            className="navButton"
            title="Create New Creature/Species">
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
        <button onClick={handleClick} id="speedUpButton" className="navButton" title="Speed Up">
            <FaFastForward />
        </button>
    )

    function handleClick() {}
}

function SlowDownButton(props) {
    return (
        <button onClick={handleClick} id="slowDownButton" className="navButton" title="Slow Down">
            <FaFastBackward />
        </button>
    )

    function handleClick() {}
}

export default SimulationNavBar
