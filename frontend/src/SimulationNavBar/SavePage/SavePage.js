import React from 'react'
import './SavePage.css'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

function SavePage(props) {
    const [saveName, setSaveName] = useState('')

    if (props.show) {
        return (
            <div id="savePageContainer">
                <button onClick={handleCancel} className="formExitButton">
                    <FaTimes />
                </button>
                <h1 id="saveTitle">Save Simulation</h1>

                <div id="saveForm">
                    <label className="saveLabel">Save Name:</label>
                    <input
                        onChange={(event) => handleChange(event)}
                        type="text"
                        value={saveName}></input>
                </div>

                <div id="saveButtonContainer">
                    <button
                        onClick={handleAccept}
                        className="saveFormButton"
                        id="saveAcceptButton">
                        Save
                    </button>
                    <button onClick={handleCancel} className="saveFormButton">
                        Cancel
                    </button>
                </div>
            </div>
        )
    }

    function handleChange(event) {
        setSaveName(event.target.value)
    }

    function handleCancel() {
        setSaveName('')
        props.toggleSavePage()
    }

    function handleAccept() {
        //save simulation to backend
    }
}

export default SavePage