import { useState, useEffect } from 'react'
import './App.css'
import Animation from './Animation'
import SimulationNavBar from './SimulationNavBar/SimulationNavBar.js'
import { FaTimes } from 'react-icons/fa'

import {AdvanceSimulationRequest, GetTextToggleRequest, GetUpdateFlagRequest, GetEnvironmentInfoRequest, GetSimulationProgressionSpeedRequest, GetTimeOfSimulationRequest, GetLightVisibilityRequest} from './generated_comm_files/backend_api_pb'
import {BackendClient} from './generated_comm_files/backend_api_grpc_web_pb'

var backendService = new BackendClient('http://localhost:44039')

let showCreatureText = 0
let simulationTicksPerSecond = 0

function Simulation() {
    const [isSimulationRunning, setIsSimulationRunning] = useState(true)
    //const [simulationTicksPerSecond, setSimulationTicksPerSecond] = useState(0)
    const [creatureList, setCreatureList] = useState([])
    const [resourceList, setResourceList] = useState([])
    const [lightVisibility, setLightVisibility] = useState(1)
    const [update, setUpdate] = useState(false)

    const progressSimulationTimeByOneTick = async () => {
        var request = new AdvanceSimulationRequest()
        request.setStepstoadvance(1)

        await backendService.advanceSimulation(request, {}, function(error, response) {
            if (response.getSimulationadvanced()) {
                console.log("Simulation advanced successfully")
            }
            else {
                console.error("Something went wrong advancing the simulation")
            }
        })        
        
        await getSimulationInfo()
        await getLightVisibility()
    }

    const progressSimulationTimeByNTicks = async () => {
        var request = new AdvanceSimulationRequest()
        request.setStepstoadvance(simulationTicksPerSecond)

        await backendService.advanceSimulation(request, {}, function(error, response) {
            if (response.getSimulationadvanced()) {
                console.log("Simulation advanced successfully")
            }
            else {
                console.error("Something went wrong advancing the simulation")
            }
        })

        await getSimulationInfo()
        await getLightVisibility()
    }

    const getTextToggle = async () => {
        var request = new GetTextToggleRequest()
        await backendService.getTextToggle(request, {}, function(error, response) {
            showCreatureText = response.getTexttoggle();
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

    const getUpdateFlag = async () => {
        let flag = 0

        var request = new GetUpdateFlagRequest()
        await backendService.getUpdateFlag(request, {}, function(error, response) {
            flag = response.getUpdateflag()
        })

        if (flag) {
            await getSimulationInfo()
        }
    }

    const updateFlag = async () => {
        await getUpdateFlag()
    }

    const getSimulationInfo = async () => {
        var request = new GetEnvironmentInfoRequest()

        await backendService.getEnvironmentInfo(request, {}, function(error, response) {
            setCreatureList(response.getCreatures())
            setResourceList(response.getResources())
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
        var request = new GetSimulationProgressionSpeedRequest()

        await backendService.getSimulationProgressionSpeed(request, {}, function(error, response) {
            setSimulationTicksPerSecond(response.getSimulationspeed())
        })
    }

    const getTimeOfSimulation = async () => {
        var request = new GetTimeOfSimulationRequest()

        await backendService.getTimeOfSimulation(request, {}, function(error, response) {
            console.log(`Time of simulation: ${response.getTimeofsimulation()}`)
        })
    }

    const getLightVisibility = async () => {
        var request = new GetLightVisibilityRequest()

        await backendService.getLightVisibility(request, {}, function(error, response) {
            setLightVisibility(response.getLightvisibility())
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
