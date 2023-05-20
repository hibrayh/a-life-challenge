import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Simulation from './Simulation.js'
import SimulationNavBar from './SimulationNavBar/SimulationNavBar.js'
import { FaTimes } from 'react-icons/fa'
import ReactAnime from 'react-animejs'

const { Anime } = ReactAnime

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

let modelCreaturePositions = [30, 30, 40, 50]
let modelCreatureMovement = [0, 0, 0, 0]
const size = '8vh'
const max = 30

function App() {
    const [showMenu, setShowMenu] = useState(true)
    const [showSimulation, setShowSimulation] = useState(false)
    const [hasSimulationStarted, setHasSimulationStarted] = useState(false)
    const [isSimulationRunning, setIsSimulationRunning] = useState(false)
    const [simulationTicksPerSecond, setSimulationTicksPerSecond] = useState(0)
    const [update, setUpdate] = useState(true)

    const [showLoad, setShowLoad] = useState(false)

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
        
        const interval = setInterval(() => {

            //only do this is the menu is being shown
            if(showMenu){

                modelCreaturePositions[0] += modelCreatureMovement[0]
                modelCreaturePositions[1] += modelCreatureMovement[1]
                //get random movement values
                for(let i = 0; i < modelCreaturePositions.length; i++){
                    if(Math.floor(Math.random() * (2 + 1)) === 1){
                        modelCreatureMovement[i] = -1*Math.floor(Math.random() * (max + 1))
                        //keep it above 0
                        if (modelCreatureMovement[i] + modelCreaturePositions[i] < 0){
                            modelCreatureMovement[i] = -1*modelCreaturePositions[i]
                        }
                    }
                    else{
                        modelCreatureMovement[i] = Math.floor(Math.random() * (max + 1))
                        //keep it below 100
                        if (modelCreatureMovement[i] + modelCreaturePositions[i] > 100){
                            modelCreatureMovement[i] = 100 - modelCreaturePositions[i]
                        }
                    }
                }
                console.log(modelCreaturePositions[0], modelCreatureMovement[0])
                setUpdate(!update)
            }
          }, 2000);

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            clearInterval(interval)

        }
    }, )

    function toggleMenuAndSimulation() {
        setShowMenu(!showMenu)
        setShowSimulation(!showSimulation)
    }

    const ModelCreatures = () => {
        return (
            <>
                <div
                    id="modelCreature0"
                    style={{
                        position: 'absolute',
                        left: `${modelCreaturePositions[0]}vw`,
                        top: `${modelCreaturePositions[1]}vh`,
                        background: "red",
                        borderRadius: 100,
                        height: size,
                        width: size,
                    }}
                />

                <div
                    id="modelCreature1"
                    style={{
                        position: 'absolute',
                        left: `${modelCreaturePositions[2]}vw`,
                        top: `${modelCreaturePositions[3]}vh`,
                        background: "red",
                        borderRadius: 100,
                        height: size,
                        width: size,
                    }}
                />
                <Anime
                    initial={[
                        {
                            targets: '#modelCreature0',
                            left: `${modelCreaturePositions[0] + modelCreatureMovement[0]}vw`,
                            top: `${modelCreaturePositions[1] + modelCreatureMovement[1]}vh`,
                            easing: 'linear',
                            duration: 2000,
                        },
                ]}></Anime>

            </>
            
        )
    }

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
                            Load
                        </button>
                    </div>
                    <ModelCreatures />
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
