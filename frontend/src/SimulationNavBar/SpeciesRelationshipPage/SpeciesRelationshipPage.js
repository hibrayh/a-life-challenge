import React from 'react'
import './SpeciesRelationshipPage.css'
import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import axios from 'axios'

/*
    
    HUNTS = 'HUNTS'
    IS_HUNTED_BY = 'IS_HUNTED_BY'
    COMPETES_WITH = 'COMPETES_WITH'
    WORKS_WITH = 'WORKS_WITH'
    PROTECTS = 'PROTECTS'
    DEFENDED_BY = 'DEFENDED_BY'
    LEECHES = 'LEECHES'
    LEECHED_OFF_OF = 'LEECHED_OFF_OF'
    GATHERS_FOOD_FOR = 'GATHERS_FOOD_FOR'
    RECEIVES_FOOD_FROM = 'RECEIVES_FOOD_FROM'
 
 */
function SpeciesRelationshipPage(props){
    const dummySpeciesList = ["","test1sdfasdf", "test2", "test3"]
    

    const dummySpeciesRelationships = ["","hunts", "works with", "leeches"]

    

    const [species1, setSpecies1] = useState('')
    const [species2, setSpecies2] = useState('')
    const [relationship, setRelationship] = useState('')
    if(props.show){

        return(
            <>
            <div id="speciesRelationshipContainer" className='mainBackgroundColor'>

                <button onClick={props.toggleSpeciesRelationshipPage} className='formExitButton buttonHover2'><FaTimes size={25} /> </button>
                <h1 className='mainTitleFont'>Species Relationship Manager</h1>

                <form id="speciesRelationshipForm">

                    <div id="species1" className="relationshipFormOption">

                        <h4 className='subTitleFont'>Species1</h4>

                        <select onChange={(event) => setSpecies1(event.target.value)}>
                            {dummySpeciesList.map((species) => (
                                <option>{species}</option>
                            ))}
                        </select>

                    </div>
                    
                    <div id="relationship" className="relationshipFormOptions">

                        <h4 className='subTitleFont'>Relationship</h4>
                        <select onChange={(event) => setRelationship(event.target.value)}>
                            {dummySpeciesRelationships.map((relationship) => (
                                <option>{relationship}</option>
                            ))}
                        </select>

                    </div>
                    
                    <div id="species2" className="relationshipFormOption">

                        <h4 className='subTitleFont'>Species2</h4>

                        <select onChange={(event) => setSpecies2(event.target.value)}>
                            {dummySpeciesList.map((species) => (
                                <option>{species}</option>
                            ))}
                        </select>

                    </div>
                    
                    <div id="speciesRelationshipButtonContainer">
                        <button onClick={handleSubmit} className="relationshipFormButton buttonHover buttonBackgroundColor">Submit Relationship</button>
                        <button onClick={props.toggleSpeciesRelationshipPage} className="relationshipFormButton buttonHover buttonBackgroundColor">Cancel</button>
                    </div>
                    
                </form>


            </div>
            </>

        
        )

        function handleSubmit(event){
            event.preventDefault()
            // set new relationship
            
            console.log(species1)
            console.log(relationship, "relationship")


            
            //props.toggleSpeciesRelationshipPage()
        }
    }
}

export default SpeciesRelationshipPage