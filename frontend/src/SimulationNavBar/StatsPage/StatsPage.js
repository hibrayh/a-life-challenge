import React from 'react'
import './StatsPage.css'
import { useState, useEffect } from 'react'
import { FaTimes, FaArrowLeft } from 'react-icons/fa'
import axios from 'axios'

function StatsPage(props) {
    const [list, setList] = useState([])

    const [showSpeciesList, setShowSpeciesList] = useState(true)
    const [showSpeciesGenomeInfo, setShowSpeciesGenomeInfo] = useState(false)
    const [selectedSpecies, setSelectedSpecies] = useState('')

    useEffect(() => {
        function getSpeciesList() {
            axios({
                method: 'GET',
                url: 'http://localhost:5000/get-list-of-species',
            }).then((response) => {
                const res = response.data
                setList(res.speciesNames)
            })
        }

        getSpeciesList()
    }, [])

    if (props.show) {
        return (
            <div id="statsPageContainer">
                <button
                    onClick={props.closeStatsPage}
                    className="formExitButton buttonHover2">
                    <FaTimes size={25} />
                </button>

                <div id="statsPageInfoContainer">
                    <ListAllSpeciesNames
                        toggleView={toggleSpeciesToGenomeList}
                        setCurrentSpecies={setCurrentSpecies}
                        show={showSpeciesList}
                        listOfSpecies={list}
                    />

                    <ListSpeciesGenomeInformation
                        toggleView={toggleSpeciesToGenomeList}
                        show={showSpeciesGenomeInfo}
                        speciesName={selectedSpecies}
                    />
                </div>
            </div>
        )
    }

    function toggleSpeciesToGenomeList() {
        setShowSpeciesList(!showSpeciesList)
        setShowSpeciesGenomeInfo(!showSpeciesGenomeInfo)
    }

    function setCurrentSpecies(species) {
        setSelectedSpecies(species)
    }
}

function ListAllSpeciesNames(props) {
    if (props.show) {
        return (
            <>
                <h1 className="mainTitleFont">List Of Species</h1>
                {props.listOfSpecies.map((species) => (
                    <div
                        onClick={() => (
                            props.toggleView(), props.setCurrentSpecies(species)
                        )}
                        className="mainName buttonHover2">
                        <h2>{species}</h2>
                    </div>
                ))}
            </>
        )
    }
}

function ListSpeciesGenomeInformation(props) {
    const [showCreatureData, setShowCreatureData] = useState(false)
    const [selectedCreatureName, setSelectedCreatureName] = useState('')

    //props.speciesName is the name of the current selected Species
    //Use it to get actual species genome info
    const dummySpeciesGenomeInfo = {
        population: 1,
        canSee: 'yes',
        canHear: 'yes',
    }

    //Can use props.speciesName to also get list of actual Creatures from species
    const dummyCreaturesOfSpeciesList = [
        'creatureName1',
        'creatureName2',
        'creatureName3',
    ]

    if (showCreatureData) {
        //creature name is stored in selectedCreatureName

        return (
            <>
                <button
                    className="backButton buttonHover2"
                    onClick={() => {
                        setShowCreatureData(false)
                    }}>
                    <FaArrowLeft size={25} />
                </button>
                <h1 className="fillerTitle">{selectedCreatureName}'s Genome</h1>
                <ListCreatureGenomeInfo creatureName={selectedCreatureName} />
            </>
        )
    } else if (props.show) {
        return (
            <>
                <button
                    className="backButton buttonHover2"
                    onClick={props.toggleView}>
                    <FaArrowLeft size={25} />
                </button>
                {/*This will print out all of the Species genome information */}
                <div>
                    <h1 className="mainTitleFont fillerTitle">
                        {props.speciesName}'s Genome:
                    </h1>
                    <ul>
                        {Object.keys(dummySpeciesGenomeInfo).map(
                            (attribute, index) => (
                                <li className="genomeStat">
                                    {attribute}:{' '}
                                    {
                                        Object.values(dummySpeciesGenomeInfo)[
                                            index
                                        ]
                                    }
                                </li>
                            )
                        )}
                    </ul>
                </div>

                {/*This will print out a list of all the creatures that are apart of the species */}
                <h1 className="mainTitleFont">List of Creatures:</h1>
                {dummyCreaturesOfSpeciesList.map((creature) => (
                    <div
                        onClick={() => {
                            setSelectedCreatureName(creature)
                            setShowCreatureData(true)
                        }}
                        className="mainName buttonHover2">
                        <h2>{creature}</h2>
                    </div>
                ))}
            </>
        )
    }
}

function ListCreatureGenomeInfo(props) {
    //use props.creatureName to get actual creature data
    const dummyCreatureStats = { population: 1, canSee: 'yes', canHear: 'yes' }

    return (
        <>
            <ul>
                {Object.keys(dummyCreatureStats).map((attribute, index) => (
                    <li className="genomeStat">
                        {attribute}: {Object.values(dummyCreatureStats)[index]}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default StatsPage
