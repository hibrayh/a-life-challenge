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
import { NewCreatureForm } from './CreatureForms/NewCreatureForm.js'
import { NewCreatureOrSpeciesForm } from './CreatureForms/NewCreatureForm.js'
import NewSpeciesForm from './CreatureForms/NewSpeciesForm.js'
import StatsPage from './StatsPage/StatsPage.js'
import TopographyPage from './Topography/Topography.js'

function SimulationNavBar({
    playOrPauseSimulationCallback,
    speedUpSimulationCallback,
    slowDownSimulationCallback,
    ticksPerSecond,
}) {
    const [showCreatureOrSpeciesForm, setShowCreatureOrSpeciesForm] =
        useState(false)
    const [showNewCreatureForm, setShowNewCreatureForm] = useState(false)
    const [showNewSpeciesForm, setShowNewSpeciesForm] = useState(false)
    const [showStatsPage, setShowStatsPage] = useState(false)
    const [showTopographyPage, setShowTopographyPage] = useState(false)

    return (
        <div>
            <StatsPage show={showStatsPage} closeStatsPage={closeStatsPage} />

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
                <PausePlayButton
                    pausePlayCallback={playOrPauseSimulationCallback}
                />

                <CurrentTime />

                <CurrentSpeed ticks={ticksPerSecond} />

                <SlowDownButton slowDownCall={slowDownSimulationCallback} />

                <SpeedUpButton speedUpCall={speedUpSimulationCallback} />

                <AddNewCreatureOrSpeciesButton
                    toggleCreatureOrSpeciesForm={toggleCreatureOrSpeciesForm}
                    closeNewCreatureForm={closeNewCreatureForm}
                    toggleNewSpeciesForm={toggleNewSpeciesForm}
                    closeNewSpeciesForm={closeNewSpeciesForm}
                />

                <TopographyButton toggleTopographyPage={toggleTopographyPage} />

                <StatsButton toggleStatsPage={toggleStatsPage} />

                <SaveButton />
            </div>
        </div>
    )

    // functions for all creature/species related forms
    function toggleCreatureOrSpeciesForm() {
        setShowCreatureOrSpeciesForm(!showCreatureOrSpeciesForm)
    }

    function toggleNewCreatureForm() {
        setShowNewCreatureForm(!showNewCreatureForm)
    }

    function closeNewCreatureForm() {
        setShowNewCreatureForm(false)
    }

    function toggleNewSpeciesForm() {
        setShowNewSpeciesForm(!showNewSpeciesForm)
    }

    function closeNewSpeciesForm() {
        setShowNewSpeciesForm(false)
    }

    // functions for stats page
    function closeStatsPage() {
        setShowStatsPage(false)
    }

    function toggleStatsPage() {
        setShowStatsPage(!showStatsPage)
    }

    // functions for topography page
    function closeTopographyPage() {
        setShowTopographyPage(false)
    }

    function toggleTopographyPage() {
        setShowTopographyPage(!showTopographyPage)
    }
}

function StatsButton(props) {
    return (
        <button
            onClick={handleClick}
            id="statsButton"
            className="navButton"
            title="Stats Page">
            <FaFileAlt />
        </button>
    )

    function handleClick() {
        props.toggleStatsPage()
    }
}

function SaveButton(props) {
    return (
        <button id="saveButton" className="navButton" title="Save">
            <FaSave />
        </button>
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
                props.toggleCreatureOrSpeciesForm()
                props.closeNewCreatureForm()
                props.closeNewSpeciesForm()
            }}
            id="addNewCreatureOrSpeciesButton"
            className="navButton"
            title="Create New Creature/Species">
            <FaPlus />
        </button>
    )
}

function PausePlayButton({ pausePlayCallback }) {
    const [showPlayButton, setShowPlayButton] = useState(true)

    function handleClick() {
        setShowPlayButton(!showPlayButton)

        pausePlayCallback()
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

function CurrentSpeed({ ticks }) {
    return <span id="currentSpeed">{ticks} ticks/sec</span>
}

function SpeedUpButton({ speedUpCall }) {
    return (
        <button
            onClick={handleClick}
            id="speedUpButton"
            className="navButton"
            title="Speed Up">
            <FaFastForward />
        </button>
    )

    function handleClick() {
        speedUpCall()
    }
}

function SlowDownButton({ slowDownCall }) {
    return (
        <button
            onClick={handleClick}
            id="slowDownButton"
            className="navButton"
            title="Slow Down">
            <FaFastBackward />
        </button>
    )

    function handleClick() {
        slowDownCall()
    }
}

export default SimulationNavBar
