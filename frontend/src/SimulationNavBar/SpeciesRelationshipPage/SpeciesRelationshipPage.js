import React from 'react'
import './SpeciesRelationshipPage.css'
import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

import {
    GetSpeciesListRequest,
    DefineNewSpeciesRelationshipRequest,
} from './../../generated_comm_files/backend_api_pb'
import { BackendClient } from '../../generated_comm_files/backend_api_grpc_web_pb'

var backendService = new BackendClient('http://localhost:44039')

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

            var request = new GetSpeciesListRequest()

            await backendService.getSpeciesList(
                request,
                {},
                function (error, response) {
                    setSpeciesList([''].concat(response.getSpeciesList()))
                }
            )
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

            var request = new DefineNewSpeciesRelationshipRequest()
            request.setSourcespecies(species1)
            request.setDestinationspecies(species2)
            request.setRelationship(relationship)

            await backendService.defineNewSpeciesRelationship(
                request,
                {},
                function (err, response) {
                    if (response.getSetnewrelationship()) {
                        console.log('Successfully defined new relationship')
                    } else {
                        console.error('Issue defining new relationship')
                    }
                }
            )

            props.toggleSpeciesRelationshipPage()
        }

        function handleCancel(event) {
            props.toggleSpeciesRelationshipPage()
        }
    }
}

export default SpeciesRelationshipPage
