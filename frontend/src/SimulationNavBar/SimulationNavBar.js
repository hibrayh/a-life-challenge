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
    FaRegSun,
} from 'react-icons/fa'
import { NewCreatureForm } from './CreatureForms/NewCreatureForm.js'
import { NewCreatureOrSpeciesForm } from './CreatureForms/NewCreatureForm.js'
import NewSpeciesForm from './CreatureForms/NewSpeciesForm.js'
import StatsPage from './StatsPage/StatsPage.js'
import { TopographyPage } from './Topography/Topography.js'

import SpeciesRelationshipPage from './SpeciesRelationshipPage/SpeciesRelationshipPage.js'
import SettingsPage from './SettingsPage/SettingsPage.js'

import {StartSimulationRequest, ChangeSimulationProgressionSpeedRequest, UpdateTextToggleRequest, EditUpdateFlagRequest} from './../generated_comm_files/backend_api_pb'
import {BackendClient} from './../generated_comm_files/backend_api_grpc_web_pb'

var backendService = new BackendClient('http://localhost:44039')

let simulationSpeedBeforePause = 0
let simulationTicksPerSecond = 0
let toggleText = false
let paused = false //to indicate if a form is open
let creatureOrSpeciesFormOpen = false
let newCreatureFormOpen = false
let newSpeciesFormOpen = false
let statsPageOpen = false
let topographyPageOpen = false
let speciesRelationshipPageOpen = false
let settingsPageOpen = false

function SimulationNavBar({
    playOrPauseSimulationCallback,
    startSimulationCallback,
    topographyInfo,
    toggleMenuAndSimulation,
}) {
    const [showCreatureOrSpeciesForm, setShowCreatureOrSpeciesForm] =
        useState(false)
    const [showNewCreatureForm, setShowNewCreatureForm] = useState(false)
    const [showNewSpeciesForm, setShowNewSpeciesForm] = useState(false)
    const [showStatsPage, setShowStatsPage] = useState(false)
    const [showTopographyPage, setShowTopographyPage] = useState(false)
    const [showGridBorder, setShowGridBorder] = useState(false)

    const [showSpeciesRelationshipPage, setShowSpeciesRelationshipPage] =
        useState(false)
    const [showSettingsPage, setShowSettingsPage] = useState(false)

    const [hasSimulationStarted, setHasSimulationStarted] = useState(false)
    const [ticksUpdated, setTicksUpdated] = useState(false) //necessary for visual changes
    //const [simulationTicksPerSecond, setSimulationTicksPerSecond] = useState(0)
    //const [simulationSpeedBeforePause, setSimulationSpeedBeforePause] =
    //useState(0)

    const startSimulation = async () => {
        var request = new StartSimulationRequest()
        request.setSimulationwidth(window.innerWidth)
        request.setSimulationheight(window.innerHeight)
        request.setColumncount(50)
        request.setRowcount(25)

        await backendService.startSimulation(request, {}, function(err, response) {
            if (response.getSimstarted()) {
                console.log("Simulation started")
            }
            else {
                console.error("There was an issue starting the simulation")
            }
        })

        setHasSimulationStarted(true)
    }

    const updateSimulationTickSpeed = async () => {
        if (!paused) {

            var request = new ChangeSimulationProgressionSpeedRequest()
            request.setNewsimulationspeed(simulationTicksPerSecond)
            
            await backendService.changeSimulationProgressionSpeed(request, {}, function(error, response) {
                if (response.getSimulationspeedchanged()) {
                    console.log("Changed simulation speed")
                }
                else {
                    console.error("Error changing simulation speed")
                }
            })
            setTicksUpdated(!ticksUpdated)
            console.log('tick speed updated to ', simulationTicksPerSecond)
        }
    }

    const updateTextToggle = async () => {
        var request = new UpdateTextToggleRequest()
        request.setNewtexttoggle(toggleText)

        await backendService.updateTextToggle(request, {}, function(error, response) {
            if (response.getTexttoggled()) {
                console.log("Toggled text mode")
            }
            else {
                console.error("Error toggling text mode")
            }
        })
    }

    const flagSimulationUpdate = async () => {
        var request = new EditUpdateFlagRequest()
        request.setNewupdateflag(true)

        backendService.editUpdateFlag(request, {}, function(error, response) {
            if (response.getUpdatedflag()) {
                console.log("Edited the update flag")
            }
            else {
                console.error("Error when editing the update flag")
            }
        })
    }

    const playPauseSimulation = async () => {
        if (!paused) {
            //don't allow the user to unpause if a form is opened

            if (simulationTicksPerSecond > 0) {
                //pause
                simulationSpeedBeforePause = simulationTicksPerSecond
                simulationTicksPerSecond = 0
            } else {
                //unpause
                if (simulationSpeedBeforePause !== 0) {
                    // it was already playing, go back to previous speed
                    simulationTicksPerSecond = simulationSpeedBeforePause
                } else {
                    //user just presses the play button, make the tick speed 1
                    simulationTicksPerSecond = 1
                }
            }
        }

        await updateSimulationTickSpeed()
    }

    // manages unpausing when ALL are closed
    const formsOpenUnpause = async () => {
        // all forms have to be closed for the simulation to unpause
        if (
            !creatureOrSpeciesFormOpen &&
            !newCreatureFormOpen &&
            !newSpeciesFormOpen &&
            !statsPageOpen &&
            !topographyPageOpen &&
            !speciesRelationshipPageOpen &&
            !settingsPageOpen
        ) {
            paused = false
            // go back to previous speed
            simulationTicksPerSecond = simulationSpeedBeforePause
        } else {
            //pause
            simulationSpeedBeforePause = simulationTicksPerSecond
            simulationTicksPerSecond = 0
        }

        await updateSimulationTickSpeed()
    }

    const incrementTicksPerSecond = () => {
        if (!paused) {
            simulationTicksPerSecond += 1
            // a change has been made, the previous saved speed is now invalid
            simulationSpeedBeforePause = 0
        }
    }

    const decrementTicksPerSecond = () => {
        if (!paused) {
            if (simulationTicksPerSecond > 0) {
                simulationTicksPerSecond -= 1
            } else {
                simulationTicksPerSecond = 0
            }
            simulationSpeedBeforePause = 0
        }
    }

    const showTextToggle = async () => {
        //update the local variable, and send the update to the backend
        toggleText = !toggleText
        await updateTextToggle()
    }

    return (
        <>
            <SettingsPage
                show={showSettingsPage}
                toggleSettingsPage={toggleSettingsPage}
                toggleTextCall={showTextToggle}
                toggleMenuAndSimulation={toggleMenuAndSimulation}
            />

            <SpeciesRelationshipPage
                show={showSpeciesRelationshipPage}
                toggleSpeciesRelationshipPage={toggleSpeciesRelationshipPage}
            />

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
            />

            <NewSpeciesForm
                show={showNewSpeciesForm}
                toggleNewSpeciesForm={toggleNewSpeciesForm}
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
        creatureOrSpeciesFormOpen = !creatureOrSpeciesFormOpen
        paused = true
        formsOpenUnpause()
    }

    function toggleNewCreatureForm() {
        setShowNewCreatureForm(!showNewCreatureForm)
        newCreatureFormOpen = !newCreatureFormOpen
        paused = true
        formsOpenUnpause()
    }

    function closeNewCreatureForm() {
        setShowNewCreatureForm(false)
        newCreatureFormOpen = false
        paused = true
        formsOpenUnpause()
    }

    function toggleNewSpeciesForm() {
        setShowNewSpeciesForm(!showNewSpeciesForm)
        newSpeciesFormOpen = !newSpeciesFormOpen
        paused = true

        formsOpenUnpause()
    }

    function closeNewSpeciesForm() {
        setShowNewSpeciesForm(false)
        newSpeciesFormOpen = false
        paused = true
        formsOpenUnpause()
    }

    // functions for stats page
    function closeStatsPage() {
        setShowStatsPage(false)
        statsPageOpen = false
        paused = true
        formsOpenUnpause()
    }

    function toggleStatsPage() {
        setShowStatsPage(!showStatsPage)
        statsPageOpen = !statsPageOpen
        paused = true
        formsOpenUnpause()
    }

    // functions for topography page
    function closeTopographyPage() {
        setShowTopographyPage(false)
        setShowGridBorder(false)
        topographyPageOpen = false
        paused = true
        formsOpenUnpause()
    }

    function toggleTopographyPage() {
        setShowTopographyPage(!showTopographyPage)
        topographyPageOpen = !topographyPageOpen
        paused = true
        formsOpenUnpause()
    }

    function toggleShowGridBorder() {
        setShowGridBorder(!showGridBorder)
        paused = true
        formsOpenUnpause()
    }

    function toggleSpeciesRelationshipPage() {
        setShowSpeciesRelationshipPage(!showSpeciesRelationshipPage)
        speciesRelationshipPageOpen = !speciesRelationshipPageOpen
        paused = true
        formsOpenUnpause()
    }

    function toggleSettingsPage() {
        setShowSettingsPage(!showSettingsPage)
        settingsPageOpen = !settingsPageOpen
        paused = true
        formsOpenUnpause()
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
                {
                    // size={33} would be ideal!
                }
                <FaConnectdevelop />
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

        if (simulationTicksPerSecond === 0) {
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
            await updateSimulationTickSpeed()
        }
    }
}
export default SimulationNavBar
