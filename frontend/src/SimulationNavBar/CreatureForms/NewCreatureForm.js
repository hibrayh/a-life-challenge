import './NewCreatureForm.css'
import React from 'react'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

import {
    GetSpeciesListRequest,
    GetSpeciesInfoRequest,
    GenomeInfo,
    CreateNewCreatureRequest,
} from './../../generated_comm_files/backend_api_pb'
import { BackendClient } from './../../generated_comm_files/backend_api_grpc_web_pb'

var backendService = new BackendClient('http://localhost:44039')

function NewCreatureForm(props) {
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [visibility, setVisibility] = useState(0.5)
    const [maxHealth, setMaxHealth] = useState(0.5)
    const [canSee, setCanSee] = useState(false)
    const [canSmell, setCanSmell] = useState(false)
    const [canHear, setCanHear] = useState(false)
    const [sightAbility, setSightAbility] = useState(0.5)
    const [smellAbility, setSmellAbility] = useState(0.5)
    const [hearingAbility, setHearingAbility] = useState(0.5)
    const [sightRange, setSightRange] = useState(0.5)
    const [smellRange, setSmellRange] = useState(0.5)
    const [hearingRange, setHearingRange] = useState(0.5)
    const [reactionTime, setReactionTime] = useState(0.5)
    const [impulsivity, setImpulsivity] = useState(0.5)
    const [selfPreservation, setSelfPreservation] = useState(0.5)
    const [mobility, setMobility] = useState(0.5)
    const [reproductionType, setReproductionType] = useState('sexual') // Set default
    const [reproductionCoolDown, setReproductionCooldown] = useState(0.5)
    const [offSpringAmount, setOffSpringAmount] = useState(0.5)
    const [motivation, setMotivation] = useState(0.5)
    const [maxEnergy, setMaxEnergy] = useState(0.5)
    const [metabolism, setMetabolism] = useState(0.5)
    const [individualism, setIndividualism] = useState(0.5)
    const [territorial, setTerritorial] = useState(0.5)
    const [fightOrFlight, setFightOrFlight] = useState(0.5)
    const [hostility, setHostility] = useState(0.5)
    const [scent, setScent] = useState(0.5)
    const [stealth, setStealth] = useState(0.5)
    const [lifeExpectancy, setLifeExpectancy] = useState(0.5)
    const [maturity, setMaturity] = useState(0.5)
    const [offensiveAbility, setOffensiveAbility] = useState(0.5)
    const [defensiveAbility, setDefensiveAbility] = useState(0.5)
    const [effectFromHost, setEffectFromHost] = useState(0.5)
    const [effectFromParasite, setEffectFromParasite] = useState(0.5)
    const [protecting, setProtecting] = useState(0.5)
    const [nurturing, setNurturing] = useState(0.5)
    const [effectFromBeingNurtured, setEffectFromBeingNurtured] = useState(0.5)
    const [shortTermMemoryAccuracy, setShortTermMemoryAccuracy] = useState(0.5)
    const [shortTermMemoryCapacity, setShortTermMemoryCapacity] = useState(0.5)
    const [shape, setShape] = useState('circle') // Set default
    const [color, setColor] = useState('red') // Set default
    const [speciesName, setSpeciesName] = useState('')
    const [numberToSpawn, setNumberToSpawn] = useState(1)

    const [availableSpecies, setAvailableSpecies] = useState([])

    const getSpeciesList = async () => {
        var request = new GetSpeciesListRequest()

        await backendService.getSpeciesList(
            request,
            {},
            function (error, response) {
                setAvailableSpecies(response.getSpeciesList())
                setSpeciesName(response.getSpeciesList()[0])
            }
        )
    }

    const getSpeciesDefaults = async (speciesOfInterest) => {
        var request = new GetSpeciesInfoRequest()
        request.setSpeciesofinterest(speciesOfInterest)

        await backendService.getSpeciesInfo(
            request,
            {},
            function (error, response) {
                let genomeInfo = response.getGenometemplate()

                setVisibility(genomeInfo.getVisibility())
                setMaxHealth(genomeInfo.getMaxhealth())
                setCanSee(genomeInfo.getCansee())
                setCanSmell(genomeInfo.getCansmell())
                setCanHear(genomeInfo.getCanhear())
                setSightAbility(genomeInfo.getSightability())
                setSmellAbility(genomeInfo.getSmellability())
                setHearingAbility(genomeInfo.getHearingability())
                setSightRange(genomeInfo.getSightrange())
                setSmellRange(genomeInfo.getSmellrange())
                setHearingRange(genomeInfo.getHearingrange())
                setReactionTime(genomeInfo.getReactiontime())
                setImpulsivity(genomeInfo.getImpulsivity())
                setSelfPreservation(genomeInfo.getSelfpreservation())
                setMobility(genomeInfo.getMobility())
                setReproductionType(genomeInfo.getReproductiontype())
                setReproductionCooldown(genomeInfo.getReproductioncooldown())
                setOffSpringAmount(genomeInfo.getOffspringamount())
                setMotivation(genomeInfo.getMotivation())
                setMaxEnergy(genomeInfo.getMaxEnergy())
                setMetabolism(genomeInfo.getMetabolism())
                setIndividualism(genomeInfo.getIndividualism())
                setTerritorial(genomeInfo.getTerritorial())
                setFightOrFlight(genomeInfo.getFightorflight())
                setHostlity(genomeInfo.getHostility())
                setScent(genomeInfo.getScent())
                setStealth(genomeInfo.getStealth())
                setLifeExpectancy(genomeInfo.getLifeexpectancy())
                setMaturity(genomeInfo.getMaturity())
                setOffensiveAbility(genomeInfo.getOffensiveability())
                setDefensiveAbility(genomeInfo.getDefensiveability())
                setEffectFromHost(genomeInfo.getEffectfromhost())
                setEffectFromParasite(genomeInfo.getEffectfromparasite())
                setProtecting(genomeInfo.getProtecting())
                setNurturing(genomeInfo.getNurturing())
                setEffectFromBeingNurtured(
                    genomeInfo.getEffectfrombeingnurtured()
                )
                setShortTermMemoryAccuracy(
                    genomeInfo.getShorttermmemoryaccuracy()
                )
                setShortTermMemoryCapacity(
                    genomeInfo.getShorttermmemorycapacity()
                )
                setShape(genomeInfo.getShape())
                setColor(genomeInfo.getColor())
                setSpeciesName(response.getSpeciesname())
            }
        )
    }

    if (props.show) {
        let options = []
        if (availableSpecies.length < 1) {
            getSpeciesList()
        } else {
            for (let i = 0; i < availableSpecies.length; i++) {
                options.push(
                    <option
                        key={'speciesOption-' + availableSpecies[i]}
                        value={availableSpecies[i]}>
                        {availableSpecies[i]}
                    </option>
                )
            }
        }

        return (
            <div className="newCreatureOrSpeciesForm">
                <button
                    onClick={() => {
                        setShowColorPicker(false)
                        props.toggleNewCreatureForm()
                    }}
                    className="formExitButton buttonHover">
                    <FaTimes />
                </button>
                <h3 className="createCreatureOrSpeciesTitle">
                    Create New Creature
                </h3>

                <form className="newCreatureOrSpeciesData">
                    <div className="attributeHolder">
                        <label className="dataTitle">Species Name</label>
                        <select
                            onChange={(event) =>
                                getSpeciesDefaults(event.target.value)
                            }
                            className="dropDownOption"
                            name="reproduction">
                            {options}
                        </select>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <label className="dataTitle">Color</label>
                        <button
                            onClick={(event) => {
                                setShowColorPicker(!showColorPicker)
                                event.preventDefault()
                            }}
                            className="dropDownOption">
                            Pick Color
                        </button>
                        {showColorPicker ? (
                            <ChromePicker
                                color={color}
                                onChange={(event) => setColor(event.hex)}
                                className="colorPicker"
                            />
                        ) : null}
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <label className="dataTitle">Shape</label>
                        <select
                            onChange={(event) => setShape(event.target.value)}
                            className="dropDownOption"
                            name="reproduction"
                            value={shape}>
                            <option value="circle">Circle</option>
                            <option value="triangle">Triangle</option>
                            <option value="square">Square</option>
                        </select>
                        <br></br>
                    </div>

                    <DataSlider
                        name="Visibility"
                        setAttribute={setVisibility}
                        attribute={visibility}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Max-Health"
                        setAttribute={setMaxHealth}
                        attribute={maxHealth}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />

                    <DataCheckbox
                        name="Can See?"
                        setAttribute={setCanSee}
                        attribute={canSee}
                    />
                    <DataCheckbox
                        name="Can Smell?"
                        setAttribute={setCanSmell}
                        attribute={canSmell}
                    />
                    <DataCheckbox
                        name="Can Hear?"
                        setAttribute={setCanHear}
                        attribute={canHear}
                    />

                    <DataSlider
                        name="Sight Ability"
                        setAttribute={setSightAbility}
                        attribute={sightAbility}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Smell Ability"
                        setAttribute={setSmellAbility}
                        attribute={smellAbility}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Hearing Ability"
                        setAttribute={setHearingAbility}
                        attribute={hearingAbility}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Sight Range"
                        setAttribute={setSightRange}
                        attribute={sightRange}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Smell Range"
                        setAttribute={setSmellRange}
                        attribute={smellRange}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Hearing Range"
                        setAttribute={setHearingRange}
                        attribute={hearingRange}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Reaction Time"
                        setAttribute={setReactionTime}
                        attribute={reactionTime}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Impulsivity"
                        setAttribute={setImpulsivity}
                        attribute={impulsivity}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Self Preservation"
                        setAttribute={setSelfPreservation}
                        attribute={selfPreservation}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Mobility"
                        setAttribute={setMobility}
                        attribute={mobility}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />

                    <div className="attributeHolder">
                        <label className="dataTitle">Reproduction Type</label>
                        <select
                            onChange={(event) =>
                                setReproductionType(event.target.value)
                            }
                            className="dropDownOption"
                            name="reproduction"
                            value={reproductionType}>
                            <option value="sexual">Sexual</option>
                            <option value="Asexual">Asexual</option>
                        </select>
                        <br></br>
                    </div>

                    <DataSlider
                        name="Reproduction Cooldown"
                        setAttribute={setReproductionCooldown}
                        attribute={reproductionCoolDown}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Number Of Offspring"
                        setAttribute={setOffSpringAmount}
                        attribute={offSpringAmount}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Motivation"
                        setAttribute={setMotivation}
                        attribute={motivation}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Max-Energy"
                        setAttribute={setMaxEnergy}
                        attribute={maxEnergy}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Metabolism"
                        setAttribute={setMetabolism}
                        attribute={metabolism}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Individualism"
                        setAttribute={setIndividualism}
                        attribute={individualism}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Territorial"
                        setAttribute={setTerritorial}
                        attribute={territorial}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Fight-Or-Flight"
                        setAttribute={setFightOrFlight}
                        attribute={fightOrFlight}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Hostility"
                        setAttribute={setHostility}
                        attribute={hostility}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Scent"
                        setAttribute={setScent}
                        attribute={scent}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Stealth"
                        setAttribute={setStealth}
                        attribute={stealth}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Life Expectancy"
                        setAttribute={setLifeExpectancy}
                        attribute={lifeExpectancy}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Maturity"
                        setAttribute={setMaturity}
                        attribute={maturity}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Offensive Ability"
                        setAttribute={setOffensiveAbility}
                        attribute={offensiveAbility}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Defensive Ability"
                        setAttribute={setDefensiveAbility}
                        attribute={defensiveAbility}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Effect From Host"
                        setAttribute={setEffectFromHost}
                        attribute={effectFromHost}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Effect From Parasite"
                        setAttribute={setEffectFromParasite}
                        attribute={effectFromParasite}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Protecting"
                        setAttribute={setProtecting}
                        attribute={protecting}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Nurturing"
                        setAttribute={setNurturing}
                        attribute={nurturing}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={false}
                    />
                    <DataSlider
                        name="Effect From Being Nurtured"
                        setAttribute={setEffectFromBeingNurtured}
                        attribute={effectFromBeingNurtured}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={true}
                    />
                    <DataSlider
                        name="Short Term Memory Accuracy"
                        setAttribute={setShortTermMemoryAccuracy}
                        attribute={shortTermMemoryAccuracy}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={true}
                    />
                    <DataSlider
                        name="Short Term Memory Capacity"
                        setAttribute={setShortTermMemoryCapacity}
                        attribute={shortTermMemoryCapacity}
                        min={0}
                        max={1}
                        step={0.01}
                        isLongName={true}
                    />
                    <DataSlider
                        name="Number to Spawn In"
                        setAttribute={setNumberToSpawn}
                        attribute={numberToSpawn}
                        min={0}
                        max={20}
                        step={1}
                        isLongName={false}
                    />

                    <div id="buttonContainer">
                        <button
                            className="formButton"
                            id="submitButton"
                            onClick={handleSubmit}>
                            Create
                        </button>
                        <button
                            className="formButton"
                            id="cancelButton"
                            onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        )

        // When the user clicks the "Create" button, this function will run
        // Has access to all variables entered in form
        async function handleSubmit(event) {
            event.preventDefault()

            var genomeRequest = new GenomeInfo()
            genomeRequest.setVisibility(visibility)
            genomeRequest.setMaxhealth(maxHealth)
            genomeRequest.setCansee(canSee)
            genomeRequest.setCansmell(canSmell)
            genomeRequest.setCanhear(canHear)
            genomeRequest.setSightability(sightAbility)
            genomeRequest.setSmellability(smellAbility)
            genomeRequest.setHearingability(hearingAbility)
            genomeRequest.setSightrange(sightRange)
            genomeRequest.setSmellrange(smellRange)
            genomeRequest.setHearingrange(hearingRange)
            genomeRequest.setReactiontime(reactionTime)
            genomeRequest.setImpulsivity(impulsivity)
            genomeRequest.setSelfpreservation(selfPreservation)
            genomeRequest.setMobility(mobility)
            genomeRequest.setReproductioncooldown(reproductionCoolDown)
            genomeRequest.setOffspringamount(offSpringAmount)
            genomeRequest.setMotivation(motivation)
            genomeRequest.setMaxenergy(maxEnergy)
            genomeRequest.setMetabolism(metabolism)
            genomeRequest.setIndividualism(individualism)
            genomeRequest.setTerritorial(territorial)
            genomeRequest.setFightorflight(fightOrFlight)
            genomeRequest.setHostility(hostility)
            genomeRequest.setScent(scent)
            genomeRequest.setStealth(stealth)
            genomeRequest.setLifeexpectancy(lifeExpectancy)
            genomeRequest.setMaturity(maturity)
            genomeRequest.setOffensiveability(offensiveAbility)
            genomeRequest.setDefensiveability(defensiveAbility)
            genomeRequest.setEffectfromhost(effectFromHost)
            genomeRequest.setEffectfromparasite(effectFromParasite)
            genomeRequest.setProtecting(protecting)
            genomeRequest.setNurturing(nurturing)
            genomeRequest.setEffectfrombeingnurtured(effectFromBeingNurtured)
            genomeRequest.setShorttermmemoryaccuracy(shortTermMemoryAccuracy)
            genomeRequest.setShorttermmemorycapacity(shortTermMemoryCapacity)
            genomeRequest.setShape(shape)
            genomeRequest.setColor(color)

            var request = new CreateNewCreatureRequest()
            request.setSpeciesname(speciesName)
            request.setGenome(genomeRequest)

            await backendService.createNewCreature(
                request,
                {},
                function (err, response) {
                    if (response.getCreaturecreated()) {
                        console.log('Successfully created new creature')
                    } else {
                        console.error(
                            'Something went wrong defining the new creature'
                        )
                    }
                }
            )

            // Hide creatures form
            props.toggleNewCreatureForm()
        }

        function handleCancel(event) {
            event.preventDefault()
            props.toggleNewCreatureForm()
        }
    }
}

function DataSlider({
    name,
    setAttribute,
    attribute,
    min,
    max,
    step,
    isLongName,
}) {
    let longNameClass = ''
    if (isLongName) longNameClass = ' longName'

    return (
        <div className={'attributeHolder' + longNameClass}>
            <span className="dataTitle">{name}</span>
            <input
                onChange={(event) => setAttribute(event.target.value)}
                className={'dataSlider' + longNameClass}
                type="range"
                min={min}
                max={max}
                step={step}
                value={attribute}></input>
            <input
                onChange={(event) => setAttribute(event.target.value)}
                className={'dataText' + longNameClass}
                type="number"
                min={min}
                max={max}
                step={step}
                value={attribute}></input>
            <br></br>
        </div>
    )
}

function DataCheckbox({ name, setAttribute, attribute }) {
    return (
        <div className="attributeHolder">
            <span className="dataTitle">{name}</span>
            <input
                onChange={(event) => setAttribute(event.target.value)}
                className="dataCheckbox"
                type="checkbox"
                checked={attribute}></input>
            <br></br>
        </div>
    )
}

function NewCreatureOrSpeciesForm(props) {
    if (props.show) {
        return (
            <div id="newCreatureOrSpeciesForm">
                <h1 id="creatureOrSpeciesFormTitle" className="mainTitleFont">
                    I would you like to...
                </h1>
                <button
                    onClick={props.toggleCreatureOrSpeciesForm}
                    className="formExitButton buttonHover2">
                    <FaTimes size={25} />
                </button>
                <button
                    onClick={() => {
                        props.toggleNewCreatureForm()
                        props.toggleCreatureOrSpeciesForm()
                    }}
                    className="creatureSpeciesFormButton buttonHover"
                    id="createNewCreatureButton">
                    Create New Creature
                </button>
                <button
                    onClick={() => {
                        props.toggleNewSpeciesForm()
                        props.toggleCreatureOrSpeciesForm()
                    }}
                    className="creatureSpeciesFormButton buttonHover"
                    id="createNewSpeciesButton">
                    Create New Species
                </button>
            </div>
        )
    }
}

export { NewCreatureForm, NewCreatureOrSpeciesForm }
