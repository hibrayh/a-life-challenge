import React from 'react'
import './SpeciesRelationshipPage.css'
import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import axios from 'axios'

function SpeciesRelationshipPage(props) {
    // I think it would be smart to have the value "" prepended to the list of species so that when you
    // open the form origonally, there will be blank values.
    const speciesRelationships = [
        '',
        'hunts',
        'hunted by',
        'competes with',
        'works with',
        'protects',
        'defended by',
        'leeches',
        'leeched by',
        'nurtures',
        'nurtured by',
    ]

    const [speciesList, setSpeciesList] = useState([])
    const [species1, setSpecies1] = useState('')
    const [species2, setSpecies2] = useState('')
    const [relationship, setRelationship] = useState('')

    // if we ever leave/open the form, set all values back to default
    useEffect(() => {
        const init = async () => {
            setSpecies1('')
            setSpecies2('')
            setRelationship('')

            await axios({
                method: 'GET',
                url: 'http://localhost:5000/get-list-of-species',
            }).then((response) => {
                const res = response.data
                setSpeciesList([''].concat(res.speciesNames))
            })
        }
        init()
    }, [props.show])

    // This will disable the submit button unless all values are valid
    let submitButtonDisabled
    if (
        species1 === '' ||
        species2 === '' ||
        relationship === '' ||
        species1 === species2
    ) {
        submitButtonDisabled = true
    } else {
        submitButtonDisabled = false
    }

    if (props.show) {
        return (
            <>
                <div
                    id="speciesRelationshipContainer"
                    className="mainBackgroundColor">
                    <button
                        onClick={handleCancel}
                        className="formExitButton buttonHover2">
                        <FaTimes size={25} />{' '}
                    </button>
                    <h1 className="mainTitleFont">
                        Species Relationship Manager
                    </h1>

                    <form id="speciesRelationshipForm">
                        <div id="species1" className="relationshipFormOption">
                            <h4 className="subTitleFont">Species1</h4>

                            <select
                                onChange={(event) =>
                                    setSpecies1(event.target.value)
                                }>
                                {speciesList.map((species) => (
                                    <option>{species}</option>
                                ))}
                            </select>
                        </div>

                        <div
                            id="relationship"
                            className="relationshipFormOptions">
                            <h4 className="subTitleFont">Relationship</h4>
                            <select
                                onChange={(event) =>
                                    setRelationship(event.target.value)
                                }>
                                {speciesRelationships.map((relationship) => (
                                    <option>{relationship}</option>
                                ))}
                            </select>
                        </div>

                        <div id="species2" className="relationshipFormOption">
                            <h4 className="subTitleFont">Species2</h4>

                            <select
                                onChange={(event) =>
                                    setSpecies2(event.target.value)
                                }>
                                {speciesList.map((species) => (
                                    <option>{species}</option>
                                ))}
                            </select>
                        </div>

                        <div id="speciesRelationshipButtonContainer">
                            <button
                                disabled={submitButtonDisabled}
                                onClick={handleSubmit}
                                className="relationshipFormButton buttonHover buttonBackgroundColor">
                                Submit Relationship
                            </button>
                            <button
                                onClick={handleCancel}
                                className="relationshipFormButton buttonHover buttonBackgroundColor">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </>
        )

        async function handleSubmit(event) {
            event.preventDefault()
            // if we got here, this means that all of the values entered are valid.
            // The variables for the values are "species1, species2, relationship"

            //console.log(species1)
            //console.log(relationship)
            //console.log(species2)

            // Make call to backend to add new species relationship
            await axios({
                method: 'POST',
                url: 'http://localhost:5000/define-new-species-relationship',
                data: {
                    species1: species1,
                    species2: species2,
                    relationship: relationship,
                },
            })

            props.toggleSpeciesRelationshipPage()
        }

        function handleCancel(event) {
            props.toggleSpeciesRelationshipPage()
        }
    }
}

export default SpeciesRelationshipPage
