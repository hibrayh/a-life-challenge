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

function SimulationNavBar() {
    return (
        <div id="simulationNavBar">
            <PausePlayButton />
            <CurrentTime />
            <CurrentSpeed />
            <SlowDownButton />
            <SpeedUpButton />
            <AddNewCreatureOrSpeciesButton />
            <TopographyButton />
        </div>
    )
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
            onClick={handleClick}
            id="addNewCreatureOrSpeciesButton"
            className="navButton">
            <FaPlus />
        </button>
    )

    function handleClick() {}
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
