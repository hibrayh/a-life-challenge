import logo from './logo.svg'
import './App.css'

function App() {
    return (
        <div>
            <header class="menu">
                <h1>A-Life Challenge</h1>
            </header>
            <div class="menu">
                <div>
                    <button id="menuButtonStart">Start</button>
                </div>

                <div>
                    <button id="menuButtonQuit">Quit</button>
                </div>
            </div>
        </div>
    )
}

//const menuButtonStart = document.getElementById("menuButtonStart")
//const menuButtonQuit = document.getElementById("menuButtonQuit")

//menuButtonStart.addEventListener("click", function () {
//  menuButtonStart.style.backgroundColor = "purple"
//})

//menuButtonQuit.addEventListener("click", function () {
//  menuButtonQuit.style.backgroundColor = "blue"
//})

export default App
