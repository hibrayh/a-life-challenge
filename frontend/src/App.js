import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Animation from './Animation'
import SimulationNavBar from './SimulationNavBar/SimulationNavBar.js'
import { FaTimes } from 'react-icons/fa'

function App() {
    const [showMenu, setShowMenu] = useState(true)
    const [showSimulation, setShowSimulation] = useState(false)
    const [hasSimulationStarted, setHasSimulationStarted] = useState(false)
    const [isSimulationRunning, setIsSimulationRunning] = useState(false)
    const [simulationTicksPerSecond, setSimulationTicksPerSecond] = useState(0)
    const [simulationSpeedBeforePause, setSimulationSpeedBeforePause] =
        useState(0)
    const [creatureList, setCreatureList] = useState([])
    const [showLoad, setShowLoad] = useState(false)
    const [resourceList, setResourceList] = useState([])

    const startSimulation = async () => {
        // Make a call to the backend to notify it to initialize the simulation
        await axios({
            method: 'POST',
            url: 'http://localhost:5000/start-simulation',
            data: {
                simulationWidth: window.innerWidth,
                simulationHeight: window.innerHeight,
            },
        })
        setHasSimulationStarted(true)
    }

    const playPauseSimulation = async () => {
        if (isSimulationRunning) {
            setSimulationSpeedBeforePause(simulationTicksPerSecond)
            setSimulationTicksPerSecond(0)
            setIsSimulationRunning(false)
        } else {
            if (hasSimulationStarted) {
                setSimulationTicksPerSecond(simulationSpeedBeforePause)
            } else {
                await startSimulation()
            }

            setIsSimulationRunning(true)
        }
    }

    const progressSimulationTimeByOneTick = async () => {
        // Make a call to the backend to progress the simulation by 1 tick
        await axios({
            method: 'GET',
            url: 'http://localhost:5000/advance-simulation',
        })

        await getSimulationInfo()
    }

    const incrementTicksPerSecond = () => {
        setSimulationTicksPerSecond(simulationTicksPerSecond + 1)

        // Use simulationTicksPerSecond + 1 as the variable will not be updated until after this function exits
        setIsSimulationRunning(simulationTicksPerSecond + 1 > 0)
    }

    const decrementTicksPerSecond = () => {
        setSimulationTicksPerSecond(
            simulationTicksPerSecond > 0 ? simulationTicksPerSecond - 1 : 0
        )

        setIsSimulationRunning(simulationTicksPerSecond > 0)
    }

    const getSimulationInfo = async () => {
        await axios({
            method: 'GET',
            url: 'http://localhost:5000/get-simulation-info',
        }).then((response) => {
            const res = response.data
            setCreatureList(res.creatureRegistry)
            setResourceList(res.resourceRegistry)
        })
    }

    useEffect(() => {
        const interval = setInterval(
            () => {
                if (simulationTicksPerSecond > 0 && isSimulationRunning) {
                    progressSimulationTimeByOneTick()
                }
            },
            simulationTicksPerSecond > 0
                ? 1000 / simulationTicksPerSecond
                : 1000
        )

        return () => clearInterval(interval)
    }, [isSimulationRunning, simulationTicksPerSecond])

    const Menu = () => {
        return (
            <>
                <header className="menu">
                    <h1>A-Life Challenge</h1>
                </header>
                <div class="menu">
                    <div>
                        <button
                            id="menuButtonStart"
                            onClick={() => {
                                setShowMenu(false)
                                setShowSimulation(true)
                            }}>
                            Start
                        </button>
                    </div>

                    <div>
                        <button
                            id="menuButtonLoad"
                            onClick={() => {
                                setShowLoad(true)
                            }}>
                            Load Simulation
                        </button>
                    </div>

                    <div>
                        <button id="menuButtonQuit">Quit</button>
                    </div>
                </div>
            </>
        )
    }

    // "Page" that will show the simulation
    const Simulation = () => {
        return (
            <>
                <header className="menu">
                    <h1>Simulation Page</h1>
                </header>
                <Animation
                    creaturesToAnimate={creatureList}
                    resourcesToAnimate={resourceList}
                />
                <SimulationNavBar
                    playOrPauseSimulationCallback={playPauseSimulation}
                    speedUpSimulationCallback={incrementTicksPerSecond}
                    slowDownSimulationCallback={decrementTicksPerSecond}
                    updateSimulationCallback={getSimulationInfo}
                    startSimulationCallback={startSimulation}
                    ticksPerSecond={simulationTicksPerSecond}
                    hasSimulationStarted={hasSimulationStarted}
                />
            </>
        )
    }

    const LoadPage = () => {
        return (
            <div id="loadContainer">
                <button
                    onClick={() => {
                        setShowLoad(false)
                    }}
                    className="formExitButton">
                    <FaTimes />
                </button>
                <h1 className="loadTitle">Load Simulation</h1>

                <div id="simulationsContainer">
                    <div className="simulationItem">
                        <h2 className="simulationItemTitle">
                            Simulation 1{' '}
                            <span className="removeLater">
                                This should be some basic info about the saved
                                simulation
                            </span>
                        </h2>
                    </div>

                    <div className="simulationItem">
                        <h2 className="simulationItemTitle">Simulation 2</h2>
                    </div>

                    <div className="simulationItem">
                        <h2 className="simulationItemTitle">Simulation 3</h2>
                    </div>

                    <div className="simulationItem">
                        <h2 className="simulationItemTitle">Simulation 4</h2>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {
                //Apparently this is how you comment in react, need to have the {}
                /* This is a multi-line comment, also needs the {} 
        if showMenu = true, display the menu. If showSimulation = true, show the simulation.
        */
            }
            {showMenu ? <Menu /> : null}
            {showSimulation ? <Simulation /> : null}
            {showLoad ? <LoadPage show={showLoad} /> : null}
        </>
    )
}

export default App
