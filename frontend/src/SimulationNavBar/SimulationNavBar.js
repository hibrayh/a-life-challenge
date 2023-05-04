import React from 'react'
import { useState } from 'react'
import axios from 'axios'
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
    FaRegSun,
} from 'react-icons/fa'
import { NewCreatureForm } from './CreatureForms/NewCreatureForm.js'
import { NewCreatureOrSpeciesForm } from './CreatureForms/NewCreatureForm.js'
import NewSpeciesForm from './CreatureForms/NewSpeciesForm.js'
import StatsPage from './StatsPage/StatsPage.js'
import { TopographyPage } from './Topography/Topography.js'
import SavePage from './SavePage/SavePage.js'
import SpeciesRelationshipPage from './SpeciesRelationshipPage/SpeciesRelationshipPage.js'
import SettingsPage from './SettingsPage/SettingsPage.js'

let simulationSpeedBeforePause = 0
let simulationTicksPerSecond = 0
let toggleText = false


function SimulationNavBar({
    playOrPauseSimulationCallback,
    //speedUpSimulationCallback,
    //slowDownSimulationCallback,
    updateSimulationCallback,
    startSimulationCallback,
    ticksPerSecond,
    //hasSimulationStarted,
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
    const [showSettingsPage, setShowSettingsPage] = useState(false)

    const [hasSimulationStarted, setHasSimulationStarted] = useState(false)
    const [isSimulationRunning, setIsSimulationRunning] = useState(false)
    const [ticksUpdated, setTicksUpdated] = useState(false)
    //const [simulationTicksPerSecond, setSimulationTicksPerSecond] = useState(0)
    //const [simulationSpeedBeforePause, setSimulationSpeedBeforePause] =
    //useState(0)

    const startSimulation = async () => {
        // Make a call to the backend to notify it to initialize the simulation
        await axios({
            method: 'POST',
            url: 'http://localhost:5000/start-simulation',
            data: {
                simulationWidth: window.innerWidth,
                simulationHeight: window.innerHeight,
                columnCount: 50,
                rowCount: 25,
            },
        })
        //await getSimulationInfo()
        setHasSimulationStarted(true)
    }

    const updateSimulationTickSpeed = async () => {
        // Make a call to the backend to progress the simulation by the set tick speed
        await axios({
            method: 'POST',
            url: 'http://localhost:5000/update-tick-speed',
            data: {
                ticks: simulationTicksPerSecond,
            },
        })
    }

    const updateTextToggle = async () => {
        // Make a call to the backend to progress the simulation by the set tick speed
        await axios({
            method: 'POST',
            url: 'http://localhost:5000/update-text-toggle',
            data: {
                toggle: toggleText,
            },
        })
    }

    const playPauseSimulation = async () => {
        if (isSimulationRunning) {
            simulationSpeedBeforePause = simulationTicksPerSecond
            simulationTicksPerSecond = 0
            setIsSimulationRunning(false)
            console.log(
                'pausing ',
                simulationTicksPerSecond,
                simulationSpeedBeforePause
            )
        } else {
            if (!hasSimulationStarted) {
                await startSimulation()
            }
            simulationTicksPerSecond = simulationSpeedBeforePause
            console.log(
                'unpausing ',
                simulationTicksPerSecond,
                simulationSpeedBeforePause
            )
            setIsSimulationRunning(true)
        }
        await updateSimulationTickSpeed()
    }

    const incrementTicksPerSecond = () => {
        simulationTicksPerSecond += 1
        console.log("inc got called", simulationTicksPerSecond)
        setTicksUpdated(!ticksUpdated)
        // Use simulationTicksPerSecond + 1 as the variable will not be updated until after this function exits
        setIsSimulationRunning(simulationTicksPerSecond + 1 > 0)
    }

    const decrementTicksPerSecond = () => {
        if (simulationTicksPerSecond > 0) {
            simulationTicksPerSecond -= 1
        } else {
            simulationTicksPerSecond = 0
        }
        setTicksUpdated(!ticksUpdated)
        setIsSimulationRunning(simulationTicksPerSecond > 0)
    }

    const showTextToggle = async () => {
        toggleText = !toggleText
        await updateTextToggle()
    }

    return (
        <>
            <SettingsPage
                show={showSettingsPage}
                toggleSettingsPage={toggleSettingsPage}
                toggleTextCall={showTextToggle}
            />

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

                <CurrentSpeed ticks={simulationTicksPerSecond} />

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
                    toggleShowGridBorder={toggleShowGridBorder}
                />

                <StatsButton toggleStatsPage={toggleStatsPage} />

                <SpeciesRelationshipButton
                    toggleSpeciesRelationshipPage={
                        toggleSpeciesRelationshipPage
                    }
                />

                <SettingsButton toggleSettingsPage={toggleSettingsPage} />
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

    function toggleSettingsPage() {
        console.log('toggled')
        setShowSettingsPage(!showSettingsPage)
    }

    function SettingsButton(props) {
        return (
            <button
                onClick={handleClick}
                id="settingsButton"
                className="navButton buttonHover"
                title="Settings">
                <FaRegSun />
            </button>
        )

        function handleClick() {
            props.toggleSettingsPage()
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

            playPauseSimulation()
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

    function SpeedUpButton() {
        return (
            <button
                onClick={handleClick}
                id="speedUpButton"
                className="navButton buttonHover"
                title="Speed Up">
                <FaFastForward />
            </button>
        )

        async function handleClick() {
            incrementTicksPerSecond()
            await updateSimulationTickSpeed()
        }
    }

    function SlowDownButton() {
        return (
            <button
                onClick={handleClick}
                id="slowDownButton"
                className="navButton buttonHover"
                title="Slow Down">
                <FaFastBackward />
            </button>
        )

        async function handleClick() {
            decrementTicksPerSecond()
            await updateSimulationTickSpeed(1) //make up delay by premptively sending in the correct val
        }
    }
}
export default SimulationNavBar
