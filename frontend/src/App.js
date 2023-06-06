import { useState, useEffect } from 'react'
import './App.css'
import Simulation from './Simulation.js'
import SimulationNavBar from './SimulationNavBar/SimulationNavBar.js'
import { FaTimes } from 'react-icons/fa'
import ReactAnime from 'react-animejs'
import {
    StartSimulationRequest,
    ResizeSimulationRequest,
    LoadSimulationRequest,
} from './generated_comm_files/backend_api_pb'
import { BackendClient } from './generated_comm_files/backend_api_grpc_web_pb'

const { Anime } = ReactAnime

var backendService = new BackendClient('http://localhost:44039')

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
// here is where we can add/remove model creatures
let modelCreaturePositions = [30, 30, 40, 50, 70, 80, 80, 20, 10, 85, 60, 70] //index 0 = model creature0 left, index 1 = model creature0 top, repeat
let modelCreatureMovement = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let modelCreatureIds = [
    'modelCreature0',
    'modelCreature1',
    'modelCreature2',
    'modelCreature3',
    'modelCreature4',
    'modelCreature5',
]
let modelCreatureColor = ['red', 'red', 'red', 'blue', 'blue', 'green']
let modelCreatureShape = [100, 100, 100, 0, 0, 100] //100 = round, 0 = square, not going to worry about triangles
const size = '9vh'
const maxMovement = 30
const maxRange = 90
const minRange = 5

function App() {
    const [showMenu, setShowMenu] = useState(true)
    const [showSimulation, setShowSimulation] = useState(false)
    const [showLoad, setShowLoad] = useState(false)
    const [hasSimulationStarted, setHasSimulationStarted] = useState(false)
    const [update, setUpdate] = useState(true)

    const startSimulation = async () => {
        var request = new StartSimulationRequest()
        request.setSimulationwidth(window.innerWidth)
        request.setSimulationheight(window.innerHeight)
        request.setColumncount(50)
        request.setRowcount(25)

        await backendService.startSimulation(
            request,
            {},
            function (err, response) {
                if (response.getSimstarted()) {
                    console.log('Simulation started')
                } else {
                    console.error('There was an issue starting the simulation')
                }
            }
        )

        setHasSimulationStarted(true)
    }

    useEffect(() => {
        const handleResize = debounce(async () => {
            if (hasSimulationStarted) {
                var request = new ResizeSimulationRequest()
                request.setNewxdimension(window.innerWidth)
                request.setNewydimension(window.innerHeight)

                await backendService.resizeSimulation(
                    request,
                    {},
                    function (err, response) {
                        if (response.getSimresized()) {
                            console.log('Simulation resized')
                        } else {
                            console.error(
                                'There was an error resizing the simulation'
                            )
                        }
                    }
                )
            }
        })

        const interval = setInterval(() => {
            //only do this is the menu is being shown
            if (showMenu) {
                //get random movement values
                for (let i = 0; i < modelCreaturePositions.length; i++) {
                    modelCreaturePositions[i] += modelCreatureMovement[i]

                    if (Math.floor(Math.random() * (2 + 1)) === 1) {
                        modelCreatureMovement[i] =
                            -1 * Math.floor(Math.random() * (maxMovement + 1))
                        //keep it above the min range
                        if (
                            modelCreatureMovement[i] +
                                modelCreaturePositions[i] <
                            minRange
                        ) {
                            modelCreatureMovement[i] =
                                -1 * modelCreaturePositions[i]
                        }
                    } else {
                        modelCreatureMovement[i] = Math.floor(
                            Math.random() * (maxMovement + 1)
                        )
                        //keep it below max range
                        if (
                            modelCreatureMovement[i] +
                                modelCreaturePositions[i] >
                            maxRange
                        ) {
                            modelCreatureMovement[i] =
                                -1 * modelCreatureMovement[i] //this is to stop them from getting stuck in the bottom right corner
                        }
                    }
                }
                setUpdate(!update)
            }
        }, 2000)

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            clearInterval(interval)
        }
    }, [hasSimulationStarted])

    function toggleMenuAndSimulation() {
        setShowMenu(!showMenu)
        setShowSimulation(!showSimulation)
    }

    const ModelCreatures = () => {
        let modelAnimationJsx = []
        let modelJsx = []

        function modelMovement(modelId, left, top) {
            return (
                <Anime
                    initial={[
                        {
                            targets: '#' + modelId,
                            left: `${
                                modelCreaturePositions[left] +
                                modelCreatureMovement[left]
                            }vw`,
                            top: `${
                                modelCreaturePositions[top] +
                                modelCreatureMovement[top]
                            }vh`,
                            easing: 'linear',
                            duration: 2000,
                        },
                    ]}></Anime>
            )
        }

        let idIndex = 0

        for (let i = 0; i < modelCreatureMovement.length; i += 2) {
            //create the elements
            modelJsx.push(
                <div
                    id={modelCreatureIds[idIndex]}
                    style={{
                        position: 'absolute',
                        left: `${modelCreaturePositions[i]}vw`,
                        top: `${modelCreaturePositions[i + 1]}vh`,
                        background: modelCreatureColor[idIndex],
                        borderRadius: modelCreatureShape[idIndex],
                        height: size,
                        width: size,
                        zIndex: -100,
                    }}
                />
            )

            //animate the movement
            modelAnimationJsx.push(
                modelMovement(modelCreatureIds[idIndex], i, i + 1)
            )
            idIndex++
        }

        return (
            <>
                {modelJsx}
                {modelAnimationJsx}
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
                            onClick={async () => {
                                await handlefileExplorer()
                            }}>
                            Load
                        </button>
                    </div>
                    <ModelCreatures />
                </div>
            </>
        )

        async function handlefileExplorer(event) {
            
    
    
            const fileInput = document.createElement('input')
            fileInput.type = 'file'
            
            fileInput.addEventListener('change', async (event) => {
                const selectedFile = event.target.files[0]
        
                const fileReader = new FileReader()
                fileReader.onload = (e) => {
                    const fileContents = e.target.result
                    console.log('File Contents:', fileContents)

                    //handleSubmit(fileContents)
                }
                fileReader.readAsText(selectedFile) 
            })
        
            // Trigger click event to open file explorer
            fileInput.click();
    
           

           
        }

        async function handleSubmit(fileContents){

            var request = new LoadSimulationRequest()
            //request.setFilepath(loadName)   -------- loadName doesn't exist anymore
    
            await backendService.loadSimulation(
                request,
                {},
                function (error, response) {
                    if (response.getSimloaded()) {
                        console.log('Simulation loaded successfully')
                    } else {
                        console.error(
                            'Something went wrong loading the simulation'
                        )
                    }
                }
            )

            setShowMenu(false)
            setShowSimulation(true)
            setHasSimulationStarted(true)
        }

       
    }

    // "Page" that will show the simulation
    const SimulationPage = () => {
        return (
            <div>
                <Simulation />
                <SimulationNavBar
                    toggleMenuAndSimulation={toggleMenuAndSimulation}
                />
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
            {showSimulation ? <SimulationPage /> : null}
        </>
    )
}

export default App
