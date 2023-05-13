import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Animation from './Animation'
import SimulationNavBar from './SimulationNavBar/SimulationNavBar.js'
import { FaTimes } from 'react-icons/fa'

/*const debounce = (functionPointer) => {
    let timer
    return () => {
        clearTimeout(timer)
        timer = setTimeout((_) => {
            timer = null
            functionPointer()
        }, 250)
    }
}*/

let showCreatureText = 0
let simulationTicksPerSecond = 0

function Simulation() {
    const [showMenu, setShowMenu] = useState(true)
    const [showSimulation, setShowSimulation] = useState(false)
    const [hasSimulationStarted, setHasSimulationStarted] = useState(false)
    const [isSimulationRunning, setIsSimulationRunning] = useState(true)
    //const [simulationTicksPerSecond, setSimulationTicksPerSecond] = useState(0)
    const [simulationSpeedBeforePause, setSimulationSpeedBeforePause] =
        useState(0)
    const [creatureList, setCreatureList] = useState([])
    const [showLoad, setShowLoad] = useState(false)
    const [resourceList, setResourceList] = useState([])
    const [timeOfDay, setTimeOfDay] = useState('')
    const [lightVisibility, setLightVisibility] = useState(1)

    const [topographyInfo, setTopographyInfo] = useState([])
    const [update, setUpdate] = useState(false)

    const progressSimulationTimeByOneTick = async () => {
        // Make a call to the backend to progress the simulation by 1 tick
        await axios({
            method: 'GET',
            url: 'http://localhost:5000/advance-simulation',
        })

        await getSimulationInfo()
        await getLightVisibility()
    }

    const progressSimulationTimeByNTicks = async () => {
        // Make a call to the backend to progress the simulation by the set tick speed
        await axios({
            method: 'POST',
            url: 'http://localhost:5000/advance-simulation-by-n-ticks',
            data: {
                ticks: simulationTicksPerSecond,
            },
        })

        await getSimulationInfo()
        await getLightVisibility()
    }

    const getTextToggle = async () => {
        let res = 0
        await axios({
            method: 'GET',
            url: 'http://localhost:5000/get-text-toggle',
        }).then((response) => {
            res = response.data
        })
        if (res != showCreatureText) {
            console.log('toggled')
            setUpdate(!update)
        }
        showCreatureText = res
    }

    const textToggle = async () => {
        await getTextToggle()
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
        await getTickSpeed()
        await getTextToggle()
        setUpdate(!update)
    }

    const getInfo = async () => {
        await getSimulationInfo()
    }

    const tickSpeed = async () => {
        await getTickSpeed()
    }

    const getTickSpeed = async () => {
        await axios({
            method: 'GET',
            url: 'http://localhost:5000/get-tick-speed',
        }).then((response) => {
            const res = response.data
            simulationTicksPerSecond = res
        })
        console.log('tick speed ', simulationTicksPerSecond)
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
            setLightVisibility(res)
        })
    }

    useEffect(() => {
        const interval = setInterval(
            () => {
                if (
                    simulationTicksPerSecond > 0 &&
                    simulationTicksPerSecond <= 4 &&
                    isSimulationRunning
                ) {
                    progressSimulationTimeByOneTick()
                } else if (
                    simulationTicksPerSecond > 0 &&
                    isSimulationRunning
                ) {
                    progressSimulationTimeByNTicks()
                } else if (simulationTicksPerSecond == 0) {
                    // still have to check if the tick speed has changed, if new creature/species have been added, or text toggle
                    //this only runs if the tick speed is 0, meaning no calculations are going on in the back end
                    //thus, while it happens every second, it will not cause lag to the actual running of the simulation
                    getInfo()
                }
            },
            simulationTicksPerSecond > 0 && simulationTicksPerSecond <= 4
                ? 1000 / simulationTicksPerSecond
                : 1000
        )

        return () => {
            clearInterval(interval)
        }
    }, [isSimulationRunning, simulationTicksPerSecond])

    const GiantDayAndNightContainer = () => {
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
        <div>
            <Animation
                creaturesToAnimate={creatureList}
                resourcesToAnimate={resourceList}
                simulationSpeed={simulationTicksPerSecond}
                toggleText={showCreatureText}
            />
            <GiantDayAndNightContainer />
        </div>
    )
}

export default Simulation
