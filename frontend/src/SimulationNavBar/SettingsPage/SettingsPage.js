import './SettingsPage.css'
import { FaTimes } from 'react-icons/fa'


function SettingsPage(props) {
   

    if (props.show) {
        return (
            <div id="settingsPageContainer" className="mainBackgroundColor">
                <button
                    onClick={props.toggleSettingsPage}
                    className="formExitButton buttonHover2">
                    <FaTimes size={25} />
                </button>

                <h1 className="mainTitleFont">Settings</h1>

                <div id="settingsContentContainer">
                    <div
                        id="settingsDescriptionsContainer"
                        className="flexCenter">
                        <h1 className="flexCenter subTitleFont mainBackgroundColor inline">
                            Toggle Creature Descriptions
                        </h1>

                        <label class="switch">
                            <input
                                type="checkbox"
                                onClick={props.toggleTextCall}></input>
                            <span class="slider round"></span>
                        </label>
                    </div>

                    <button onClick={handleSaveClick} className="subTitleFont buttonBackgroundColor buttonHover settingsPageButton">Save Simulation</button>

                   

                    <button onClick={props.toggleMenuAndSimulation} className="subTitleFont buttonBackgroundColor buttonHover settingsPageButton">
                        Exit To Main Menu
                    </button>

                </div>
            </div>
        )
    }

    function handleSaveClick() {
        // this is where we need to make the backend call to get the simulation data
        // jsonData = resultOfBackendCall
        const jsonData = {key: 'value'}

        // this filename is just a filler, the user can change it if they desire
        const fileName = 'mySimulation.json'
        saveJsonFile(jsonData, fileName)
    }

    function saveJsonFile(jsonData, fileName) {

        const jsonBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' })
        const url = URL.createObjectURL(jsonBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }


    function handleToggleClick() {
        props.toggleTextCall()
    }


}

export default SettingsPage
