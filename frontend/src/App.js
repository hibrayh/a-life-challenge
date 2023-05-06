import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Simulation from './Simulation.js'
import SimulationNavBar from './SimulationNavBar/SimulationNavBar.js'
import { FaTimes } from 'react-icons/fa'

const debounce = (functionPointer) => {
    let timer
    return () => {
        clearTimeout(timer)
        timer = setTimeout((_) => {
            timer = null
            functionPointer()
        }, 250)
    }
}

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

    const [topographyInfo, setTopographyInfo] = useState([])
    const [showCreatureText, setShowCreatureText] = useState(true)

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

    useEffect(() => {
        const handleResize = debounce(async () => {
            await axios({
                method: 'POST',
                url: 'http://localhost:5000/resize-simulation',
                data: {
                    newWidth: window.innerWidth,
                    newHeight: window.innerHeight,
                },
            })
        })

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const Menu = () => {
        return (
            <>
                <header className="menu">
                    <h1>A-Life Challenge</h1>
                </header>
                <div className="menu">
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
    const SimulationPage = () => {
        return (
            <div>
                <Simulation />
                <SimulationNavBar />
            </div>
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

    return (
        <>
            {
                //Apparently this is how you comment in react, need to have the {}
                /* This is a multi-line comment, also needs the {} 
        if showMenu = true, display the menu. If showSimulation = true, show the simulation.
        */
            }
            {showMenu ? <Menu /> : null}
            {showSimulation ? <SimulationPage /> : null}
            {showLoad ? <LoadPage show={showLoad} /> : null}
        </>
    )
}

export default App
