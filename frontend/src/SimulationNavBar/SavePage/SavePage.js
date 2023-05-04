import React from 'react'
import './SavePage.css'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import axios from 'axios'
import { useRef } from 'react'


function SavePage(props) {
    const [saveName, setSaveName] = useState('')
    const saveInputRef = useRef(null)
    const [filename, setFilename] = useState('test')

    function handleFilenameChange(event) {
        setFilename(event.target.value)
    }

    if (props.show) {
        return (
            <div id="savePageContainer">
                <button
                    onClick={handleCancel}
                    className="formExitButton buttonHover2">
                    <FaTimes size={25} />
                </button>
                <h1 id="saveTitle">Save Simulation</h1>

                <button onClick={handleSaveClick}>Save JSON File</button>

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

    async function handleAccept() {
        //save simulation to backend
        await axios({
            method: 'POST',
            url: 'http://localhost:5000//save-simulation',
            data: {
                filename: saveName,
            },
        })

        props.show = false
    }


    function handleSaveClick() {
        const jsonData = { key: 'value' };
        const fileName = 'myJsonFile.json';
        saveJsonFile(jsonData, fileName);
    };

    function saveJsonFile(jsonData, fileName) {
        const jsonBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
        const url = URL.createObjectURL(jsonBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
}

export default SavePage
