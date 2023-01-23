import { useState } from 'react'
import './App.css'
import DummyConnection from './DummyConnection'
import Animation from './Animation'
import SimulationNavBar from './SimulationNavBar/SimulationNavBar.js'


function App() {
    const [showMenu, setShowMenu] = useState(true)
    const [showSimulation, setShowSimulation] = useState(false)

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
                <Animation />
                <SimulationNavBar />
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
