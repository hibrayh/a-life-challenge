import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Animation from './Animation'
import SimulationNavBar from './SimulationNavBar/SimulationNavBar.js'

function App() {
    const [showMenu, setShowMenu] = useState(true)
    const [showSimulation, setShowSimulation] = useState(false)
    const [hasSimulationStarted, setHasSimulationStarted] = useState(false)
    const [isSimulationRunning, setIsSimulationRunning] = useState(false)
    const [simulationTicksPerSecond, setSimulationTicksPerSecond] = useState(0)
    const [simulationSpeedBeforePause, setSimulationSpeedBeforePause] = useState(0)
    const [creatureList, setCreatureList] = useState([])

    const startSimulation = async () => {
        // Make a call to the backend to notify it to initialize the simulation
        await axios({
            method: 'GET',
            url: 'http://localhost:5000/start-simulation',
        })
        setHasSimulationStarted(true)

        // DEBUG: Remove following calls as soon as creature and species UI forms are hooked up to backend
        await axios({
            method: 'POST',
            url: 'http://localhost:5000/create-new-species',
            data: {
                visibility: '0.5',
                maxHealth: '0.5',
                canSee: 'true',
                canSmell: 'true',
                canHear: 'true',
                sightAbility: '0.5',
                smellAbility: '0.5',
                hearingAbility: '0.5',
                sightRange: '0.5',
                smellRange: '0.5',
                hearingRange: '0.5',
                reactionTime: '0.5',
                intelligence: '0.5',
                selfPreservation: '0.5',
                mobility: '0.5',
                reproductionType: 'sexual',
                offspringAmount: '1',
                motivation: '0.5',
                maxEnergy: '0.5',
                individualism: '0.5',
                territorial: '0.5',
                fightOrFlight: '0.5',
                hostility: '0.5',
                scent: '0.5',
                stealth: '0.5',
                lifeExpectancy: '0.5',
                offensiveAbility: '0.5',
                defensiveAbility: '0.5',
                shape: 'circle',
                color: 'red',
                speciesName: 'Shlorpians',
            },
        })

        await axios({
            method: 'POST',
            url: 'http://localhost:5000/mass-create-more-creatures',
            data: {
                speciesName: 'Shlorpians',
                numberOfNewCreatures: '2',
            },
        })
    }

    const playPauseSimulation = async() => {
        if (isSimulationRunning) {
            setSimulationSpeedBeforePause(simulationTicksPerSecond)
            setSimulationTicksPerSecond(0)
            setIsSimulationRunning(false)
        }
        else {
            if (hasSimulationStarted) {
                setSimulationTicksPerSecond(simulationSpeedBeforePause)
            }
            else {
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
        setIsSimulationRunning((simulationTicksPerSecond + 1 > 0))
    }

    const decrementTicksPerSecond = () => {
        setSimulationTicksPerSecond((simulationTicksPerSecond > 0) ? (simulationTicksPerSecond - 1) : 0)

        setIsSimulationRunning((simulationTicksPerSecond > 0))
    }

    const getSimulationInfo = async() => {
        await axios({
            method: 'GET',
            url: 'http://localhost:5000/get-simulation-info',
        }).then((response) => {
            const res = response.data
            setCreatureList(res.creatureRegistry)
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (simulationTicksPerSecond > 0 && isSimulationRunning) {
                progressSimulationTimeByOneTick()
            }
        }, (simulationTicksPerSecond > 0) ? (1000 / simulationTicksPerSecond) : (1000))

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
                />
                <SimulationNavBar 
                    playOrPauseSimulationCallback={playPauseSimulation}
                    speedUpSimulationCallback={incrementTicksPerSecond}
                    slowDownSimulationCallback={decrementTicksPerSecond}
                    ticksPerSecond={simulationTicksPerSecond}
                />
            </>
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
        </>
    )
}

export default App
