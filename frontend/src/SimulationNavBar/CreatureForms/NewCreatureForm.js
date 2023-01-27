import './NewCreatureForm.css'
import React from 'react'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'



function NewCreatureForm(props){

    const [visibility, setVisibility] = useState(.5)
    const [maxHealth, setMaxHealth] = useState(.5)
    const [canSee, setCanSee] = useState(false)
    const [canSmell, setCanSmell] = useState(false)
    const [canHear, setCanHear] = useState(false)
    const [sightAbility, setSightAbility] = useState(.5)
    const [smellAbility, setSmellAbility] = useState(.5)
    const [hearingAbility, setHearingAbility] = useState(.5)
    const [sightRange, setSightRange] = useState(.5)
    const [smellRange, setSmellRange] = useState(.5)
    const [hearingRange, setHearingRange] = useState(.5)
    const [reactionTime, setReactionTime] = useState(.5)
    const [intelligence, setIntelligence] = useState(.5)
    const [selfPreservation, setSelfPreservation] = useState(.5)
    const [mobility, setMobility] = useState(.5)
    const [reproductionType, setReproductionType] = useState("")
    const [offSpringAmount, setOffSpringAmount] = useState(.5)
    const [motivation, setMotivation] = useState(.5)
    const [maxEnergy, setMaxEnergy] = useState(.5)
    const [individualism, setIndividualism] = useState(.5)
    const [territorial, setTerritorial] = useState(.5)
    const [fightOrFlight, setFightOrFlight] = useState(.5)
    const [hositlity, setHositlity] = useState(.5)
    const [scent, setScent] = useState(.5)
    const [stealth, setStealth] = useState(.5)
    const [lifeExpectancy, setLifeExpectancy] = useState(.5)
    const [offensiveAbility, setOffensiveAbility] = useState(.5)
    const [defensiveAbility, setDefensiveAbility] = useState(.5)
    const [shape, setShape] = useState("")
    const [color, setColor] = useState("")
    const [speciesName, setSpeciesName] = useState("")

    if(props.show){
        return(
            <div className="newCreatureOrSpeciesForm">
                <button onClick={props.toggleNewCreatureForm} className="formExitButton"><FaTimes /></button>
                <h3 className="createCreatureOrSpeciesTitle">Create New Creature</h3>

                <form className="newCreatureOrSpeciesData">

                    <div className="attributeHolder">

                        <label className="dataTitle">Species Name</label>
                        <select onChange={(event) => setSpeciesName(event.target.value)} className="dropDownOption" name="reproduction">
                            <option value="OoogaBooga">OoogaBooga</option>
                            <option value="BoogaOoga">BoogaOoga</option>
                        </select><br></br>
                    </div>


                    <div className="attributeHolder">

                        <span className="dataTitle">Visibility</span>
                        <input onChange={(event) => setVisibility(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={visibility}></input>
                        <input onChange={(event) => setVisibility(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={visibility}></input><br></br>
                    
                    </div>


                    <div className="attributeHolder">
                        <span className="dataTitle">Max-Health</span>
                        <input onChange={(event) => setMaxHealth(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={maxHealth}></input>
                        <input onChange={(event) => setMaxHealth(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={maxHealth}></input><br></br>
                        
                    </div>

                    <div className="attributeHolder">
                        
                        <span className="dataTitle">Can See?</span>
                        <input onChange={(event) => setCanSee(event.target.value)} className="dataCheckbox" type="checkbox"></input><br></br>
                    </div>


                    <div className="attributeHolder">
                        <span className="dataTitle">Can Smell?</span>
                        <input onChange={(event) => setCanSmell(event.target.value)} className="dataCheckbox" type="checkbox"></input><br></br>
                        
                    </div>


                    <div className="attributeHolder">
                        <span className="dataTitle">Can Hear?</span>
                        <input onChange={(event) => setCanHear(event.target.value)} className="dataCheckbox" type="checkbox"></input><br></br>
                        
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Sight Ability</span>
                        <input onChange={(event) => setSightAbility(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={sightAbility}></input>
                        <input onChange={(event) => setSightAbility(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={sightAbility}></input><br></br>
                        
                    </div>

                    <div className="attributeHolder">
                        
                        <span className="dataTitle">Smell Ability</span>
                        <input onChange={(event) => setSmellAbility(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={smellAbility}></input>
                        <input onChange={(event) => setSmellAbility(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={smellAbility}></input><br></br>
                    </div>




                    <div className="attributeHolder">
                        <span className="dataTitle">Hearing Ability</span>
                        <input onChange={(event) => setHearingAbility(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={hearingAbility}></input>
                        <input onChange={(event) => setHearingAbility(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={hearingAbility}></input><br></br>
                        
                    </div>

                    <div className="attributeHolder">
                        
                        <span className="dataTitle">Sight Range</span>
                        <input onChange={(event) => setSightRange(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={sightRange}></input>
                        <input onChange={(event) => setSightRange(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={sightRange}></input><br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Smell Range</span>
                        <input onChange={(event) => setSmellRange(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={smellRange}></input>
                        <input onChange={(event) => setSmellRange(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={smellRange}></input><br></br>
                        
                    </div>

                    <div className="attributeHolder">
                        
                        <span className="dataTitle">Hearing Range</span>
                        <input onChange={(event) => setHearingRange(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={hearingRange}></input>
                        <input onChange={(event) => setHearingRange(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={hearingRange}></input><br></br>
                    </div>

                    <div className="attributeHolder">
                        
                        <span className="dataTitle">Reaction Time</span>
                        <input onChange={(event) => setReactionTime(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={reactionTime}></input>
                        <input onChange={(event) => setReactionTime(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={reactionTime}></input><br></br>
                    </div>

                    <div className="attributeHolder">
                        
                        <span className="dataTitle">Intelligence</span>
                        <input onChange={(event) => setIntelligence(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={intelligence}></input>
                        <input onChange={(event) => setIntelligence(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={intelligence}></input><br></br>
                    </div>

                    <div className="attributeHolder">
                        
                        <span className="dataTitle">Self Preservation</span>
                        <input onChange={(event) => setSelfPreservation(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={selfPreservation}></input>
                        <input onChange={(event) => setSelfPreservation(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={selfPreservation}></input><br></br>
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Mobility</span>
                        <input onChange={(event) => setMobility(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={mobility}></input>
                        <input onChange={(event) => setMobility(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={mobility}></input><br></br>
                        
                    </div>

                    <div className="attributeHolder">
                        <label className="dataTitle">Reproduction Type</label>
                        <select onChange={(event) => setReproductionType(event.target.value)} className="dropDownOption" name="reproduction">
                            <option value="sexual">Sexual</option>
                            <option value="Asexual">Asexual</option>
                            
                        </select><br></br>
                        
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Number Of Offspring</span>
                        <input onChange={(event) => setOffSpringAmount(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={offSpringAmount}></input>
                        <input onChange={(event) => setOffSpringAmount(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={offSpringAmount}></input><br></br>
                        
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Motivation</span>
                        <input onChange={(event) => setMotivation(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={motivation}></input>
                        <input onChange={(event) => setMotivation(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={motivation}></input><br></br>
                        
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Max-Energy</span>
                        <input onChange={(event) => setMaxEnergy(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={maxEnergy}></input>
                        <input onChange={(event) => setMaxEnergy(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={maxEnergy}></input><br></br>
                        
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Individualism</span>
                        <input onChange={(event) => setIndividualism(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={individualism}></input>
                        <input onChange={(event) => setIndividualism(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={individualism}></input><br></br>
                        
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Territorial</span>
                        <input onChange={(event) => setTerritorial(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={territorial}></input>
                        <input onChange={(event) => setTerritorial(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={territorial}></input><br></br>
                        
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Fight-Or-Flight</span>
                        <input onChange={(event) => setFightOrFlight(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={fightOrFlight}></input>
                        <input onChange={(event) => setFightOrFlight(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={fightOrFlight}></input><br></br>
                        
                    </div>

                    <div className="attributeHolder">

                        <span className="dataTitle">Hostility</span>
                        <input onChange={(event) => setHositlity(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={hositlity}></input>
                        <input onChange={(event) => setHositlity(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={hositlity}></input><br></br>
                        
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Scent</span>
                        <input onChange={(event) => setScent(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={scent}></input>
                        <input onChange={(event) => setScent(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={scent}></input><br></br>
                        
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Stealth</span>
                        <input onChange={(event) => setStealth(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={stealth}></input>
                        <input onChange={(event) => setStealth(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={stealth}></input><br></br>
                        
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Life Expectancy</span>
                        <input onChange={(event) => setLifeExpectancy(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={lifeExpectancy}></input>
                        <input onChange={(event) => setLifeExpectancy(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={lifeExpectancy}></input><br></br>
                        
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Offensive Ability</span>
                        <input onChange={(event) => setOffensiveAbility(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={offensiveAbility}></input>
                        <input onChange={(event) => setOffensiveAbility(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={offensiveAbility}></input><br></br>
                        
                    </div>

                    <div className="attributeHolder">
                        <span className="dataTitle">Defensive Ability</span>
                        <input onChange={(event) => setDefensiveAbility(event.target.value)} className="dataSlider" type="range" min="0" max="1" step=".01" value={defensiveAbility}></input>
                        <input onChange={(event) => setDefensiveAbility(event.target.value)} className="dataText" type="number" min="0" max="1" step=".01" value={defensiveAbility}></input><br></br>
                        
                    </div>

                    <div className="attributeHolder">
                        <label className="dataTitle">Color</label>
                        <select onChange={(event) => setColor(event.target.value)} className="dropDownOption" name="reproduction">
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                        </select><br></br>
                        
                    </div>


                    <div className="attributeHolder">
                        <label className="dataTitle">Shape</label>
                        <select onChange={(event) => setShape(event.target.value)} className="dropDownOption" name="reproduction">
                            <option value="circle">Circle</option>
                            <option value="triangle">Triangle</option>
                            <option value="square">Square</option>
                        </select><br></br>
                        
                    </div>
                    
                    <div id="buttonContainer">

                        <button className="formButton" id="submitButton" onClick={handleSubmit}>Create</button>
                        <button className="formButton" id="cancelButton" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        )


        // When the user clicks the "Create" button, this function will run
        // Has access to all variables entered in form
        function handleSubmit(event){
            event.preventDefault()
            
        }

        function handleCancel(event){
            event.preventDefault()
            props.toggleNewCreatureForm()
        }

    }


}


function NewCreatureOrSpeciesForm(props){


    if(props.show){
        return(
            <div id="newCreatureOrSpeciesForm">
                <h1 id="creatureOrSpeciesFormTitle">I would you like to...</h1>
                <button onClick={props.toggleCreatureOrSpeciesForm} className="formExitButton"><FaTimes /></button>
                <button onClick={() => {
                    props.toggleNewCreatureForm();
                    props.toggleCreatureOrSpeciesForm();
                }} 
                className="creatureSpeciesFormButton" id="createNewCreatureButton">Create New Creature</button>
                <button onClick={() => {
                    props.toggleNewSpeciesForm();
                    props.toggleCreatureOrSpeciesForm();
                }}
                className="creatureSpeciesFormButton" id="createNewSpeciesButton">Create New Species</button>
            </div>
        )
    }

}


export {NewCreatureForm, NewCreatureOrSpeciesForm}