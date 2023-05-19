import React from 'react'
import './StatsPage.css'
import { useState, useEffect } from 'react'
import { FaTimes, FaArrowLeft } from 'react-icons/fa'

import {
    GetSpeciesListRequest,
    GetSpeciesInfoRequest,
    GetCreatureInfoRequest,
} from './../../generated_comm_files/backend_api_pb'
import { BackendClient } from '../../generated_comm_files/backend_api_grpc_web_pb'

var backendService = new BackendClient('http://localhost:44039')

function StatsPage(props) {
    const [list, setList] = useState([])

    const [showSpeciesList, setShowSpeciesList] = useState(true)
    const [showSpeciesGenomeInfo, setShowSpeciesGenomeInfo] = useState(false)
    const [selectedSpecies, setSelectedSpecies] = useState('')

    useEffect(() => {
        const getSpeciesList = async () => {
            var request = new GetSpeciesListRequest()

            await backendService.getSpeciesList(
                request,
                {},
                function (error, response) {
                    setList(response.getSpeciesList())
                    setSelectedSpecies(response.getSpeciesList()[0])
                }
            )
        }
        getSpeciesList()
    }, [props.show])

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
                        key={species}
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
    const [speciesGenomeInfo, setSpeciesGenomeInfo] = useState({})
    const [creatureNames, setCreatureNames] = useState([])

    useEffect(() => {
        const getSpeciesInfo = async () => {
            var request = new GetSpeciesInfoRequest()
            request.setSpeciesofinterest(props.speciesName)

            await backendService.getSpeciesInfo(
                request,
                {},
                function (err, response) {
                    console.log(response)
                    setSpeciesGenomeInfo(response.getGenometemplate())
                    setCreatureNames(response.getCreaturesList())
                }
            )
        }

        if (props.speciesName) {
            //don't try and call the backend for the species info if there is no info
            getSpeciesInfo()
        }
    }, [props.speciesName])

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
                <ListCreatureGenomeInfo
                    creatureName={selectedCreatureName}
                    speciesName={props.speciesName}
                />
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
                        <li className="genomeStat">
                            visibility: {speciesGenomeInfo.getVisibility()}
                        </li>
                        <li className="genomeStat">
                            max health: {speciesGenomeInfo.getMaxhealth()}
                        </li>
                        <li className="genomeStat">
                            can see: {speciesGenomeInfo.getCansee()}
                        </li>
                        <li className="genomeStat">
                            can smell: {speciesGenomeInfo.getCansmell()}
                        </li>
                        <li className="genomeStat">
                            can hear: {speciesGenomeInfo.getCansee()}
                        </li>
                        <li className="genomeStat">
                            sight ability: {speciesGenomeInfo.getSightability()}
                        </li>
                        <li className="genomeStat">
                            smell ability: {speciesGenomeInfo.getSmellability()}
                        </li>
                        <li className="genomeStat">
                            hearing ability:{' '}
                            {speciesGenomeInfo.getHearingability()}
                        </li>
                        <li className="genomeStat">
                            sight range: {speciesGenomeInfo.getSightrange()}
                        </li>
                        <li className="genomeStat">
                            smell range: {speciesGenomeInfo.getSmellrange()}
                        </li>
                        <li className="genomeStat">
                            hearing range: {speciesGenomeInfo.getHearingrange()}
                        </li>
                        <li className="genomeStat">
                            reaction time: {speciesGenomeInfo.getReactiontime()}
                        </li>
                        <li className="genomeStat">
                            impulsivity: {speciesGenomeInfo.getImpulsivity()}
                        </li>
                        <li className="genomeStat">
                            self preservation:{' '}
                            {speciesGenomeInfo.getSelfpreservation()}
                        </li>
                        <li className="genomeStat">
                            mobility: {speciesGenomeInfo.getMobility()}
                        </li>
                        <li className="genomeStat">
                            reproduction type:{' '}
                            {speciesGenomeInfo.getReproductiontype()}
                        </li>
                        <li className="genomeStat">
                            reproduction cooldown:{' '}
                            {speciesGenomeInfo.getReproductioncooldown()}
                        </li>
                        <li className="genomeStat">
                            offspring amount:{' '}
                            {speciesGenomeInfo.getOffspringamount()}
                        </li>
                        <li className="genomeStat">
                            motivation: {speciesGenomeInfo.getMotivation()}
                        </li>
                        <li className="genomeStat">
                            max energy: {speciesGenomeInfo.getMaxenergy()}
                        </li>
                        <li className="genomeStat">
                            metabolism: {speciesGenomeInfo.getMetabolism()}
                        </li>
                        <li className="genomeStat">
                            individualism:{' '}
                            {speciesGenomeInfo.getIndividualism()}
                        </li>
                        <li className="genomeStat">
                            territorial: {speciesGenomeInfo.getTerritorial()}
                        </li>
                        <li className="genomeStat">
                            fight or flight:{' '}
                            {speciesGenomeInfo.getFightorflight()}
                        </li>
                        <li className="genomeStat">
                            hostility: {speciesGenomeInfo.getHostility()}
                        </li>
                        <li className="genomeStat">
                            scent: {speciesGenomeInfo.getScent()}
                        </li>
                        <li className="genomeStat">
                            stealth: {speciesGenomeInfo.getStealth()}
                        </li>
                        <li className="genomeStat">
                            life expectancy:{' '}
                            {speciesGenomeInfo.getLifeexpectancy()}
                        </li>
                        <li className="genomeStat">
                            maturity: {speciesGenomeInfo.getMaturity()}
                        </li>
                        <li className="genomeStat">
                            offensive ability:{' '}
                            {speciesGenomeInfo.getOffensiveability()}
                        </li>
                        <li className="genomeStat">
                            defensive ability:{' '}
                            {speciesGenomeInfo.getDefensiveability()}
                        </li>
                        <li className="genomeStat">
                            effect from host:{' '}
                            {speciesGenomeInfo.getEffectfromhost()}
                        </li>
                        <li className="genomeStat">
                            effect from parasite:{' '}
                            {speciesGenomeInfo.getEffectfromparasite()}
                        </li>
                        <li className="genomeStat">
                            protecting: {speciesGenomeInfo.getProtecting()}
                        </li>
                        <li className="genomeStat">
                            nurturing: {speciesGenomeInfo.getNurturing()}
                        </li>
                        <li className="genomeStat">
                            effect from being nurtured:{' '}
                            {speciesGenomeInfo.getEffectfrombeingnurtured()}
                        </li>
                        <li className="genomeStat">
                            short term memory accuracy:{' '}
                            {speciesGenomeInfo.getShorttermmemoryaccuracy()}
                        </li>
                        <li className="genomeStat">
                            short term memory capacity:{' '}
                            {speciesGenomeInfo.getShorttermmemorycapacity()}
                        </li>
                        <li className="genomeStat">
                            shape: {speciesGenomeInfo.getShape()}
                        </li>
                        <li className="genomeStat">
                            color: {speciesGenomeInfo.getColor()}
                        </li>
                    </ul>
                </div>

                {/*This will print out a list of all the creatures that are apart of the species */}
                <h1 className="mainTitleFont">List of Creatures:</h1>
                {creatureNames.map((creature) => (
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
    const [creatureGenomeInfo, setCreatureGenomeInfo] = useState({})

    useEffect(() => {
        const getCreatureInfo = async () => {
            var request = new GetCreatureInfoRequest()
            request.setCreatureofinterest(props.creatureName)
            request.setSpecies(props.speciesName)

            await backendService.getCreatureInfo(
                request,
                {},
                function (err, response) {
                    setCreatureGenomeInfo(response.getGenome())
                }
            )
        }
        getCreatureInfo()
    }, [props.creatureName])

    console.log(creatureGenomeInfo)

    return (
        <>
            <ul>
                <li className="genomeStat">
                    visibility: {creatureGenomeInfo.getVisibility()}
                </li>
                <li className="genomeStat">
                    max health: {creatureGenomeInfo.getMaxhealth()}
                </li>
                <li className="genomeStat">
                    can see: {creatureGenomeInfo.getCansee()}
                </li>
                <li className="genomeStat">
                    can smell: {creatureGenomeInfo.getCansmell()}
                </li>
                <li className="genomeStat">
                    can hear: {creatureGenomeInfo.getCansee()}
                </li>
                <li className="genomeStat">
                    sight ability: {creatureGenomeInfo.getSightability()}
                </li>
                <li className="genomeStat">
                    smell ability: {creatureGenomeInfo.getSmellability()}
                </li>
                <li className="genomeStat">
                    hearing ability: {creatureGenomeInfo.getHearingability()}
                </li>
                <li className="genomeStat">
                    sight range: {creatureGenomeInfo.getSightrange()}
                </li>
                <li className="genomeStat">
                    smell range: {creatureGenomeInfo.getSmellrange()}
                </li>
                <li className="genomeStat">
                    hearing range: {creatureGenomeInfo.getHearingrange()}
                </li>
                <li className="genomeStat">
                    reaction time: {creatureGenomeInfo.getReactiontime()}
                </li>
                <li className="genomeStat">
                    impulsivity: {creatureGenomeInfo.getImpulsivity()}
                </li>
                <li className="genomeStat">
                    self preservation:{' '}
                    {creatureGenomeInfo.getSelfpreservation()}
                </li>
                <li className="genomeStat">
                    mobility: {creatureGenomeInfo.getMobility()}
                </li>
                <li className="genomeStat">
                    reproduction type:{' '}
                    {creatureGenomeInfo.getReproductiontype()}
                </li>
                <li className="genomeStat">
                    reproduction cooldown:{' '}
                    {creatureGenomeInfo.getReproductioncooldown()}
                </li>
                <li className="genomeStat">
                    offspring amount: {creatureGenomeInfo.getOffspringamount()}
                </li>
                <li className="genomeStat">
                    motivation: {creatureGenomeInfo.getMotivation()}
                </li>
                <li className="genomeStat">
                    max energy: {creatureGenomeInfo.getMaxenergy()}
                </li>
                <li className="genomeStat">
                    metabolism: {creatureGenomeInfo.getMetabolism()}
                </li>
                <li className="genomeStat">
                    individualism: {creatureGenomeInfo.getIndividualism()}
                </li>
                <li className="genomeStat">
                    territorial: {creatureGenomeInfo.getTerritorial()}
                </li>
                <li className="genomeStat">
                    fight or flight: {creatureGenomeInfo.getFightorflight()}
                </li>
                <li className="genomeStat">
                    hostility: {creatureGenomeInfo.getHostility()}
                </li>
                <li className="genomeStat">
                    scent: {creatureGenomeInfo.getScent()}
                </li>
                <li className="genomeStat">
                    stealth: {creatureGenomeInfo.getStealth()}
                </li>
                <li className="genomeStat">
                    life expectancy: {creatureGenomeInfo.getLifeexpectancy()}
                </li>
                <li className="genomeStat">
                    maturity: {creatureGenomeInfo.getMaturity()}
                </li>
                <li className="genomeStat">
                    offensive ability:{' '}
                    {creatureGenomeInfo.getOffensiveability()}
                </li>
                <li className="genomeStat">
                    defensive ability:{' '}
                    {creatureGenomeInfo.getDefensiveability()}
                </li>
                <li className="genomeStat">
                    effect from host: {creatureGenomeInfo.getEffectfromhost()}
                </li>
                <li className="genomeStat">
                    effect from parasite:{' '}
                    {creatureGenomeInfo.getEffectfromparasite()}
                </li>
                <li className="genomeStat">
                    protecting: {creatureGenomeInfo.getProtecting()}
                </li>
                <li className="genomeStat">
                    nurturing: {creatureGenomeInfo.getNurturing()}
                </li>
                <li className="genomeStat">
                    effect from being nurtured:{' '}
                    {creatureGenomeInfo.getEffectfrombeingnurtured()}
                </li>
                <li className="genomeStat">
                    short term memory accuracy:{' '}
                    {creatureGenomeInfo.getShorttermmemoryaccuracy()}
                </li>
                <li className="genomeStat">
                    short term memory capacity:{' '}
                    {creatureGenomeInfo.getShorttermmemorycapacity()}
                </li>
                <li className="genomeStat">
                    shape: {creatureGenomeInfo.getShape()}
                </li>
                <li className="genomeStat">
                    color: {creatureGenomeInfo.getColor()}
                </li>
            </ul>
        </>
    )
}

export default StatsPage
