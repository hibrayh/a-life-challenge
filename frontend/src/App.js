import logo from './logo.svg';
import './App.css';


const Intro = (props) => {
  return (
    <>
    <h1>Intro: {props.text}</h1>
    </>
  )
}
const StartButton = () => {
  return (
    <div>
      <button id="menuButtonStart">Start</button>
    </div>
  )
}

const MenuButtonQuit = () => {
  return (
    <button id="menuButtonQuit">Quit</button>
  )
}

function App() {
  return (
    <div>
      <header class="menu">
        <Intro text={"testing"} />
      </header>
      <div class="menu">
      <div id="testAnimation"></div> 
      <StartButton />
      <MenuButtonQuit />
    </div>
    </div>
  )
}

export default App;
