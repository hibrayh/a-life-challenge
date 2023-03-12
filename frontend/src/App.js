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
    const [timeOfDay, setTimeOfDay] = useState('')
    const [lightVisibility, setLightVisibility] = useState(1)
<<<<<<< HEAD
    const [topographyInfo, setTopographyInfo] = useState([])
=======
>>>>>>> ee37c38301cfe36c0776c6130031877c86dadf3a

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
        await getSimulationInfo()
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

        // Get the updated time of the simulation
        //const simulationTime = await getTimeOfSimulation()
        await getLightVisibility()
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
            setTopographyInfo(res.topographyRegistry)
            console.log(res.topographyRegistry, "in getSimulationInfo()")
        })
    }

    const getTimeOfSimulation = async () => {
        await axios({
            method: 'GET',
            url: 'http://localhost:5000/time-of-simulation',
        }).then((response) => {
            const res = response.data
            console.log(`Time of simulation: ${res}`)
        })
    }

    const getLightVisibility = async () => {
        await axios({
            method: 'GET',
            url: 'http://localhost:5000/get-light-visibility',
        }).then((response) => {
            const res = response.data
            //console.log(`Light visibility: ${res}`)
            setLightVisibility(res)
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
                            onClick={async () => {
                                await startSimulation()
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

        console.log(topographyInfo)
        return (
            <>
                <Animation
                    creaturesToAnimate={creatureList}
                    resourcesToAnimate={resourceList}
                    simulationSpeed={simulationTicksPerSecond}
                />
                <SimulationNavBar
                    playOrPauseSimulationCallback={playPauseSimulation}
                    speedUpSimulationCallback={incrementTicksPerSecond}
                    slowDownSimulationCallback={decrementTicksPerSecond}
                    updateSimulationCallback={getSimulationInfo}
                    startSimulationCallback={startSimulation}
                    ticksPerSecond={simulationTicksPerSecond}
                    hasSimulationStarted={hasSimulationStarted}
                    topographyInfo={topographyInfo}
                />

                <GiantDayAndNightContainer />
            </>
        )
    }

    const LoadPage = () => {
        const [loadName, setLoadName] = useState('')
        return (
            <div id="loadContainer">
                <button
                    onClick={() => {
                        setShowLoad(false)
                    }}
                    className="formExitButton buttonHover2">
                    <FaTimes size={25} />
                </button>
                <h1 className="loadTitle">Load Simulation</h1>

                <form id="loadForm">
                    <label>Simulation Name:</label>
                    <input
                        type="text"
                        value={loadName}
                        onChange={(event) =>
                            setLoadName(event.target.value)
                        }></input>

                    <button
                        onClick={handleSubmit}
                        className="loadButton buttonHover2 buttonBackgroundColor">
                        Load
                    </button>
                </form>
            </div>
        )

        async function handleSubmit(event) {
            event.preventDefault()
            // Load simulation in the backend
            await axios({
                method: 'POST',
                url: 'http://localhost:5000/load-simulation',
                data: {
                    filename: loadName,
                },
            })

            setShowLoad(false)
            setShowMenu(false)
            setShowSimulation(true)
            setHasSimulationStarted(true)
        }
    }

    const GiantDayAndNightContainer = (props) => {
        console.log(lightVisibility)
        let style
        switch (lightVisibility) {
            case 1:
                style = 'light1-0'
                break
            case 0.8:
                style = 'light0-8'
                break

            case 0.5:
                style = 'light0-5'
                break

            case 0.3:
                style = 'light0-3'
                break

            case 0.2:
                style = 'light0-2'
                break
            default:
                style = 'light1-0'
        }

        return <div className={style} id="giantDayAndNightContainer"></div>
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
