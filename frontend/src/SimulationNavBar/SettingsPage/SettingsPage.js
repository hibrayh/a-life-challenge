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
                            <input type="checkbox" onClick={props.toggleTextCall}></input>
                            <span class="slider round"></span>
                        </label>
                    </div>

                    <button className="subTitleFont buttonBackgroundColor buttonHover settingsPageButton">
                        Save Simulation
                    </button>

                    <button className="subTitleFont buttonBackgroundColor buttonHover settingsPageButton">
                        Exit To Main Menu
                    </button>

                    <button className="subTitleFont buttonBackgroundColor buttonHover settingsPageButton">
                        Exit Application
                    </button>
                </div>
            </div>
        )
    }

    function handleToggleClick() {
        //toggleTextCall()
        props.toggleTextCall()
    }
}

export default SettingsPage
