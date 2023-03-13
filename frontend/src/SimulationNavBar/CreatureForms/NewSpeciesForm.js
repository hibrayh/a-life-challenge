import './NewCreatureForm.css'
import React from 'react'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import axios from 'axios'

function NewSpeciesForm(props) {
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
    const [hositlity, setHositlity] = useState(0.5)
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
                    onClick={props.toggleNewSpeciesForm}
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
                        <span className="dataTitle">Visibility</span>
                        <input
                            onChange={(event) =>
                                setVisibility(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={visibility}></input>
                        <input
                            onChange={(event) =>
                                setVisibility(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={visibility}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Max-Health</span>
                        <input
                            onChange={(event) =>
                                setMaxHealth(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={maxHealth}></input>
                        <input
                            onChange={(event) =>
                                setMaxHealth(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={maxHealth}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Can See?</span>
                        <input
                            onChange={(event) => setCanSee(event.target.value)}
                            className="dataCheckbox"
                            type="checkbox"></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Can Smell?</span>
                        <input
                            onChange={(event) =>
                                setCanSmell(event.target.value)
                            }
                            className="dataCheckbox"
                            type="checkbox"></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Can Hear?</span>
                        <input
                            onChange={(event) => setCanHear(event.target.value)}
                            className="dataCheckbox"
                            type="checkbox"></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Sight Ability</span>
                        <input
                            onChange={(event) =>
                                setSightAbility(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={sightAbility}></input>
                        <input
                            onChange={(event) =>
                                setSightAbility(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={sightAbility}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Smell Ability</span>
                        <input
                            onChange={(event) =>
                                setSmellAbility(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={smellAbility}></input>
                        <input
                            onChange={(event) =>
                                setSmellAbility(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={smellAbility}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Hearing Ability</span>
                        <input
                            onChange={(event) =>
                                setHearingAbility(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={hearingAbility}></input>
                        <input
                            onChange={(event) =>
                                setHearingAbility(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={hearingAbility}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Sight Range</span>
                        <input
                            onChange={(event) =>
                                setSightRange(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={sightRange}></input>
                        <input
                            onChange={(event) =>
                                setSightRange(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={sightRange}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Smell Range</span>
                        <input
                            onChange={(event) =>
                                setSmellRange(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={smellRange}></input>
                        <input
                            onChange={(event) =>
                                setSmellRange(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={smellRange}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Hearing Range</span>
                        <input
                            onChange={(event) =>
                                setHearingRange(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={hearingRange}></input>
                        <input
                            onChange={(event) =>
                                setHearingRange(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={hearingRange}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Reaction Time</span>
                        <input
                            onChange={(event) =>
                                setReactionTime(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={reactionTime}></input>
                        <input
                            onChange={(event) =>
                                setReactionTime(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={reactionTime}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Impulsivity</span>
                        <input
                            onChange={(event) =>
                                setImpulsivity(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={impulsivity}></input>
                        <input
                            onChange={(event) =>
                                setImpulsivity(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={impulsivity}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Self Preservation</span>
                        <input
                            onChange={(event) =>
                                setSelfPreservation(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={selfPreservation}></input>
                        <input
                            onChange={(event) =>
                                setSelfPreservation(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={selfPreservation}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Mobility</span>
                        <input
                            onChange={(event) =>
                                setMobility(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={mobility}></input>
                        <input
                            onChange={(event) =>
                                setMobility(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={mobility}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <label className="dataTitle">Reproduction Type</label>
                        <select
                            onChange={(event) =>
                                setReproductionType(event.target.value)
                            }
                            className="dropDownOption"
                            name="reproduction">
                            <option value="sexual">Sexual</option>
                            <option value="Asexual">Asexual</option>
                        </select>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Reproduction Cooldown</span>
                        <input
                            onChange={(event) =>
                                setReproductionCooldown(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={reproductionCoolDown}></input>
                        <input
                            onChange={(event) =>
                                setReproductionCooldown(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={reproductionCoolDown}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Number Of Offspring</span>
                        <input
                            onChange={(event) =>
                                setOffSpringAmount(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={offSpringAmount}></input>
                        <input
                            onChange={(event) =>
                                setOffSpringAmount(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={offSpringAmount}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Motivation</span>
                        <input
                            onChange={(event) =>
                                setMotivation(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={motivation}></input>
                        <input
                            onChange={(event) =>
                                setMotivation(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={motivation}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Max-Energy</span>
                        <input
                            onChange={(event) =>
                                setMaxEnergy(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={maxEnergy}></input>
                        <input
                            onChange={(event) =>
                                setMaxEnergy(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={maxEnergy}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Metabolism</span>
                        <input
                            onChange={(event) =>
                                setMetabolism(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={metabolism}></input>
                        <input
                            onChange={(event) =>
                                setMetabolism(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={metabolism}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Individualism</span>
                        <input
                            onChange={(event) =>
                                setIndividualism(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={individualism}></input>
                        <input
                            onChange={(event) =>
                                setIndividualism(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={individualism}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Territorial</span>
                        <input
                            onChange={(event) =>
                                setTerritorial(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={territorial}></input>
                        <input
                            onChange={(event) =>
                                setTerritorial(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={territorial}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Fight-Or-Flight</span>
                        <input
                            onChange={(event) =>
                                setFightOrFlight(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={fightOrFlight}></input>
                        <input
                            onChange={(event) =>
                                setFightOrFlight(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={fightOrFlight}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Hostility</span>
                        <input
                            onChange={(event) =>
                                setHositlity(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={hositlity}></input>
                        <input
                            onChange={(event) =>
                                setHositlity(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={hositlity}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Scent</span>
                        <input
                            onChange={(event) => setScent(event.target.value)}
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={scent}></input>
                        <input
                            onChange={(event) => setScent(event.target.value)}
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={scent}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Stealth</span>
                        <input
                            onChange={(event) => setStealth(event.target.value)}
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={stealth}></input>
                        <input
                            onChange={(event) => setStealth(event.target.value)}
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={stealth}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Life Expectancy</span>
                        <input
                            onChange={(event) =>
                                setLifeExpectancy(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={lifeExpectancy}></input>
                        <input
                            onChange={(event) =>
                                setLifeExpectancy(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={lifeExpectancy}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Maturity</span>
                        <input
                            onChange={(event) =>
                                setMaturity(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={maturity}></input>
                        <input
                            onChange={(event) =>
                                setMaturity(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={maturity}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Offensive Ability</span>
                        <input
                            onChange={(event) =>
                                setOffensiveAbility(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={offensiveAbility}></input>
                        <input
                            onChange={(event) =>
                                setOffensiveAbility(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={offensiveAbility}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Defensive Ability</span>
                        <input
                            onChange={(event) =>
                                setDefensiveAbility(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={defensiveAbility}></input>
                        <input
                            onChange={(event) =>
                                setDefensiveAbility(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={defensiveAbility}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Effect From Host</span>
                        <input
                            onChange={(event) =>
                                setEffectFromHost(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={effectFromHost}></input>
                        <input
                            onChange={(event) =>
                                setEffectFromHost(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={effectFromHost}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Effect From Parasite</span>
                        <input
                            onChange={(event) =>
                                setEffectFromParasite(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={effectFromParasite}></input>
                        <input
                            onChange={(event) =>
                                setEffectFromParasite(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={effectFromParasite}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Protecting</span>
                        <input
                            onChange={(event) =>
                                setProtecting(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={protecting}></input>
                        <input
                            onChange={(event) =>
                                setProtecting(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={protecting}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Nurturing</span>
                        <input
                            onChange={(event) =>
                                setNurturing(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={nurturing}></input>
                        <input
                            onChange={(event) =>
                                setNurturing(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={nurturing}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">
                            Effect From Being Nurtured
                        </span>
                        <input
                            onChange={(event) =>
                                setEffectFromBeingNurtured(event.target.value)
                            }
                            className="dataSlider longName"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={effectFromBeingNurtured}></input>
                        <input
                            onChange={(event) =>
                                setEffectFromBeingNurtured(event.target.value)
                            }
                            className="dataText longName"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={effectFromBeingNurtured}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">
                            Short Term Memory Accuracy
                        </span>
                        <input
                            onChange={(event) =>
                                setShortTermMemoryAccuracy(event.target.value)
                            }
                            className="dataSlider longName"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={shortTermMemoryAccuracy}></input>
                        <input
                            onChange={(event) =>
                                setShortTermMemoryAccuracy(event.target.value)
                            }
                            className="dataText longName"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={shortTermMemoryAccuracy}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">
                            Short Term Memory Capacity
                        </span>
                        <input
                            onChange={(event) =>
                                setShortTermMemoryCapacity(event.target.value)
                            }
                            className="dataSlider longName"
                            type="range"
                            min="0"
                            max="1"
                            step=".01"
                            value={shortTermMemoryCapacity}></input>
                        <input
                            onChange={(event) =>
                                setShortTermMemoryCapacity(event.target.value)
                            }
                            className="dataText longName"
                            type="number"
                            min="0"
                            max="1"
                            step=".01"
                            value={shortTermMemoryCapacity}></input>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <label className="dataTitle">Color</label>
                        <select
                            onChange={(event) => setColor(event.target.value)}
                            className="dropDownOption"
                            name="reproduction">
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                        </select>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <label className="dataTitle">Shape</label>
                        <select
                            onChange={(event) => setShape(event.target.value)}
                            className="dropDownOption"
                            name="reproduction">
                            <option value="circle">Circle</option>
                            <option value="triangle">Triangle</option>
                            <option value="square">Square</option>
                        </select>
                        <br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Number to Spawn In</span>
                        <input
                            onChange={(event) =>
                                setNumberToSpawn(event.target.value)
                            }
                            className="dataSlider"
                            type="range"
                            min="0"
                            max="20"
                            step="1"
                            value={numberToSpawn}></input>
                        <input
                            onChange={(event) =>
                                setNumberToSpawn(event.target.value)
                            }
                            className="dataText"
                            type="number"
                            min="0"
                            max="20"
                            step="1"
                            value={numberToSpawn}></input>
                        <br></br>
                    </div>

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
            if (!props.hasSimulationStarted) {
                await props.startSimulationCallback()
            }

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
                    hostility: hositlity,
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

            // Fetch new info from simulation
            await props.updateSimulationCallback()

            // Hide species form
            props.toggleNewSpeciesForm()
        }

        function handleCancel(event) {
            event.preventDefault()
            props.toggleNewSpeciesForm()
        }
    }
}

export default NewSpeciesForm
