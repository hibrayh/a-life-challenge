import './NewCreatureForm.css'
import React from 'react'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import axios from 'axios'
import { ChromePicker } from 'react-color'

function NewSpeciesForm(props) {
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

    if (props.show) {
        return (
            <div className="newCreatureOrSpeciesForm">
                <button
                    onClick={ () =>{
                        setShowColorPicker(false)
                        props.toggleNewSpeciesForm()
                    }}
                    className="formExitButton buttonHover">
                    <FaTimes />
                </button>
                <h3 className="createCreatureOrSpeciesTitle">
                    Create New Species
                </h3>

                <form className="newCreatureOrSpeciesData">
                    <div className="attributeHolder">
                        <span className="dataTitle">New Species Name</span>
                        <input
                            onChange={(event) =>
                                setSpeciesName(event.target.value)
                            }
                            className="dropDownOption"
                            type="text"
                            value={speciesName}></input>
                    </div>


                    <div className="attributeHolder">
                        <label className="dataTitle">Color</label>
                        <button onClick={ (event) => {
                                setShowColorPicker(!showColorPicker)
                                event.preventDefault()
                            }
                        } 
                        className="dropDownOption">Pick Color
                        </button>
                        {
                            showColorPicker ? <ChromePicker color={color} onChange={(event) => setColor(event.hex)} className="colorPicker" /> : null
                        }
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

                    <DataSlider name="Visibility" setAttribute={setVisibility} attribute={visibility} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Max-Health" setAttribute={setMaxHealth} attribute={maxHealth} min={0} max={1} step={.01} isLongName={false}/>
                
                    <DataCheckbox name="Can See?" setAttribute={setCanSee} attribute={canSee} />
                    <DataCheckbox name="Can Smell?" setAttribute={setCanSmell} attribute={canSmell} />
                    <DataCheckbox name="Can Hear?" setAttribute={setCanHear} attribute={canHear} />
                    
                    <DataSlider name="Sight Ability" setAttribute={setSightAbility} attribute={sightAbility} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Smell Ability" setAttribute={setSmellAbility} attribute={smellAbility} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Hearing Ability" setAttribute={setHearingAbility} attribute={hearingAbility} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Sight Range" setAttribute={setSightRange} attribute={sightRange} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Smell Range" setAttribute={setSmellRange} attribute={smellRange} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Hearing Range" setAttribute={setHearingRange} attribute={hearingRange} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Reaction Time" setAttribute={setReactionTime} attribute={reactionTime} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Impulsivity" setAttribute={setImpulsivity} attribute={impulsivity} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Self Preservation" setAttribute={setSelfPreservation} attribute={selfPreservation} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Mobility" setAttribute={setMobility} attribute={mobility} min={0} max={1} step={.01} isLongName={false}/>
                    


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

                    <DataSlider name="Reproduction Cooldown" setAttribute={setReproductionCooldown} attribute={reproductionCoolDown} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Number Of Offspring" setAttribute={setOffSpringAmount} attribute={offSpringAmount} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Motivation" setAttribute={setMotivation} attribute={motivation} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Max-Energy" setAttribute={setMaxEnergy} attribute={maxEnergy} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Metabolism" setAttribute={setMetabolism} attribute={metabolism} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Individualism" setAttribute={setIndividualism} attribute={individualism} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Territorial" setAttribute={setTerritorial} attribute={territorial} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Fight-Or-Flight" setAttribute={setFightOrFlight} attribute={fightOrFlight} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Hostility" setAttribute={setHostility} attribute={hostility} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Scent" setAttribute={setScent} attribute={scent} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Stealth" setAttribute={setStealth} attribute={stealth} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Life Expectancy" setAttribute={setLifeExpectancy} attribute={lifeExpectancy} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Maturity" setAttribute={setMaturity} attribute={maturity} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Offensive Ability" setAttribute={setOffensiveAbility} attribute={offensiveAbility} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Defensive Ability" setAttribute={setDefensiveAbility} attribute={defensiveAbility} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Effect From Host" setAttribute={setEffectFromHost} attribute={effectFromHost} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Effect From Parasite" setAttribute={setEffectFromParasite} attribute={effectFromParasite} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Protecting" setAttribute={setProtecting} attribute={protecting} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Nurturing" setAttribute={setNurturing} attribute={nurturing} min={0} max={1} step={.01} isLongName={false}/>
                    <DataSlider name="Effect From Being Nurtured" setAttribute={setEffectFromBeingNurtured} attribute={effectFromBeingNurtured} min={0} max={1} step={.01} isLongName={true}/>
                    <DataSlider name="Short Term Memory Accuracy" setAttribute={setShortTermMemoryAccuracy} attribute={shortTermMemoryAccuracy} min={0} max={1} step={.01} isLongName={true}/>
                    <DataSlider name="Short Term Memory Capacity" setAttribute={setShortTermMemoryCapacity} attribute={shortTermMemoryCapacity} min={0} max={1} step={.01} isLongName={true}/>
                    <DataSlider name="Number to Spawn In" setAttribute={setNumberToSpawn} attribute={numberToSpawn} min={0} max={20} step={1} isLongName={false}/>
                    


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

            // Check if simulation has started. If not, start it.
            /*
            if (!props.hasSimulationStarted) {
                await props.startSimulationCallback()
            }*/

            // Define new species
            await axios({
                method: 'POST',
                url: 'http://localhost:5000/create-new-species',
                data: {
                    visibility: visibility,
                    maxHealth: maxHealth,
                    canSee: canSee,
                    canSmell: canSmell,
                    canHear: canHear,
                    sightAbility: sightAbility,
                    smellAbility: smellAbility,
                    hearingAbility: hearingAbility,
                    sightRange: sightRange,
                    smellRange: smellRange,
                    hearingRange: hearingRange,
                    reactionTime: reactionTime,
                    impulsivity: impulsivity,
                    selfPreservation: selfPreservation,
                    mobility: mobility,
                    reproductionType: reproductionType,
                    reproductionCooldown: reproductionCoolDown,
                    offspringAmount: offSpringAmount,
                    motivation: motivation,
                    maxEnergy: maxEnergy,
                    metabolism: metabolism,
                    individualism: individualism,
                    territorial: territorial,
                    fightOrFlight: fightOrFlight,
                    hostility: hostility,
                    scent: scent,
                    stealth: stealth,
                    lifeExpectancy: lifeExpectancy,
                    maturity: maturity,
                    offensiveAbility: offensiveAbility,
                    defensiveAbility: defensiveAbility,
                    effectFromHost: effectFromHost,
                    effectFromParasite: effectFromParasite,
                    protecting: protecting,
                    nurturing: nurturing,
                    effectFromBeingNurtured: effectFromBeingNurtured,
                    shortTermMemoryAccuracy: shortTermMemoryAccuracy,
                    shortTermMemoryCapacity: shortTermMemoryCapacity,
                    shape: shape,
                    color: color,
                    speciesName: speciesName,
                },
            })

            // Spawn in initial creatures for this species
            await axios({
                method: 'POST',
                url: 'http://localhost:5000/mass-create-more-creatures',
                data: {
                    speciesName: speciesName,
                    numberOfNewCreatures: numberToSpawn,
                },
            })

            // Hide species form
            props.toggleNewSpeciesForm()
        }

        function handleCancel(event) {
            event.preventDefault()
            props.toggleNewSpeciesForm()
        }
    }
}


function DataSlider({name, setAttribute, attribute, min, max, step, isLongName}){
    let longNameClass = ""
    if(isLongName) longNameClass = " longName"
    
    
    return(
        <div className={"attributeHolder" + longNameClass}>
            <span className="dataTitle">{name}</span>
            <input
                onChange={(event) =>
                    setAttribute(event.target.value)
                }
                className={"dataSlider" + longNameClass}
                type="range"
                min={min}
                max={max}
                step={step}
                value={attribute}></input>
            <input
                onChange={(event) =>
                    setAttribute(event.target.value)
                }
                className={"dataText" + longNameClass}
                type="number"
                min={min}
                max={max}
                step={step}
                value={attribute}></input>
            <br></br>
        </div>
    )
    
}

function DataCheckbox({name, setAttribute, attribute}){

    return(
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

export default NewSpeciesForm
