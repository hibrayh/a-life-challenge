import React from 'react'
import { useState } from 'react'
import './SimulationNavBar.css'
import {
    FaPlay,
    FaPause,
    FaPlus,
    FaMinus,
    FaFastForward,
    FaFastBackward,
    FaTree,
    FaFileAlt,
    FaSave,
    FaConnectdevelop,
} from 'react-icons/fa'
import { NewCreatureForm } from './CreatureForms/NewCreatureForm.js'
import { NewCreatureOrSpeciesForm } from './CreatureForms/NewCreatureForm.js'
import NewSpeciesForm from './CreatureForms/NewSpeciesForm.js'
import StatsPage from './StatsPage/StatsPage.js'
import { TopographyPage } from './Topography/Topography.js'
import SavePage from './SavePage/SavePage.js'
import SpeciesRelationshipPage from './SpeciesRelationshipPage/SpeciesRelationshipPage.js'

function SimulationNavBar({
    playOrPauseSimulationCallback,
    speedUpSimulationCallback,
    slowDownSimulationCallback,
    updateSimulationCallback,
    startSimulationCallback,
    ticksPerSecond,
    hasSimulationStarted,
    topographyInfo,
    toggleTextSimulationCallback,
}) {
    const [showCreatureOrSpeciesForm, setShowCreatureOrSpeciesForm] =
        useState(false)
    const [showNewCreatureForm, setShowNewCreatureForm] = useState(false)
    const [showNewSpeciesForm, setShowNewSpeciesForm] = useState(false)
    const [showStatsPage, setShowStatsPage] = useState(false)
    const [showTopographyPage, setShowTopographyPage] = useState(false)
    const [showGridBorder, setShowGridBorder] = useState(false)
    const [showSavePage, setShowSavePage] = useState(false)
    const [showSpeciesRelationshipPage, setShowSpeciesRelationshipPage] =
        useState(false)

    return (
        <>
            <SpeciesRelationshipPage
                show={showSpeciesRelationshipPage}
                toggleSpeciesRelationshipPage={toggleSpeciesRelationshipPage}
            />
            <SavePage show={showSavePage} toggleSavePage={toggleSavePage} />

            <StatsPage show={showStatsPage} closeStatsPage={closeStatsPage} />

            <TopographyPage
                show={showTopographyPage}
                closeTopographyPage={closeTopographyPage}
                showGridBorder={showGridBorder}
                topographyInfo={topographyInfo}
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
                updateSimulationCallback={updateSimulationCallback}
            />

            <NewSpeciesForm
                show={showNewSpeciesForm}
                toggleNewSpeciesForm={toggleNewSpeciesForm}
                updateSimulationCallback={updateSimulationCallback}
                hasSimulationStarted={hasSimulationStarted}
                startSimulationCallback={startSimulationCallback}
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

                <TopographyButton
                    toggleTopographyPage={toggleTopographyPage}
                    toggleShowGridBorder={toggleShowGridBorder}
                />

                <StatsButton toggleStatsPage={toggleStatsPage} />

                <SpeciesRelationshipButton
                    toggleSpeciesRelationshipPage={
                        toggleSpeciesRelationshipPage
                    }
                />

                <ToggleTextButton toggleTextCall={toggleTextSimulationCallback} />

                <SaveButton toggleSavePage={toggleSavePage} />
            </div>
        </>
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
        setShowGridBorder(false)
    }

    function toggleTopographyPage() {
        setShowTopographyPage(!showTopographyPage)
    }

    function toggleShowGridBorder() {
        setShowGridBorder(!showGridBorder)
    }

    function toggleSavePage() {
        setShowSavePage(!showSavePage)
    }

    function toggleSpeciesRelationshipPage() {
        setShowSpeciesRelationshipPage(!showSpeciesRelationshipPage)
    }
}

function SpeciesRelationshipButton(props) {
    return (
        <button
            onClick={handleClick}
            id="speciesRelationshipButton"
            className="navButton buttonHover biggerIcon"
            title="Species Relationships">
            <FaConnectdevelop size={33} />
        </button>
    )

    function handleClick() {
        props.toggleSpeciesRelationshipPage()
    }
}

function StatsButton(props) {
    return (
        <button
            onClick={handleClick}
            id="statsButton"
            className="navButton buttonHover"
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
        <button
            onClick={props.toggleSavePage}
            id="saveButton"
            className="navButton buttonHover"
            title="Save">
            <FaSave />
        </button>
    )
}

function TopographyButton(props) {
    return (
        <button
            onClick={() => {
                props.toggleTopographyPage()
                props.toggleShowGridBorder()
            }}
            id="topographyButton"
            className="navButton buttonHover"
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
            className="navButton buttonHover"
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
                className="navButton buttonHover">
                <FaPlay />
            </button>
        )
    } else {
        return (
            <button
                onClick={handleClick}
                id="pausePlayButton"
                className="navButton buttonHover">
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
            className="navButton buttonHover"
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
            className="navButton buttonHover"
            title="Slow Down">
            <FaFastBackward />
        </button>
    )

    function handleClick() {
        slowDownCall()
    }
}

function ToggleTextButton({ toggleTextCall }) {
    return (
        <button
            onClick={handleClick}
            id="toggleTextButton"
            className="navButton buttonHover"
            title="Toggle Text">
            T
        </button>
    )

    function handleClick() {
        toggleTextCall()
    }
}

export default SimulationNavBar
