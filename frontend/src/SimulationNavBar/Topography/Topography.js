import React from 'react'
import './Topography.css'
import { useState, useEffect } from 'react'
import { FaTimes, FaArrowsAlt } from 'react-icons/fa'
import axios from 'axios'

let topographyInfo = []

function TopographyPage(props) {
    const [topography, setTopography] = useState('flat')
    const [forceUpdateMain, setForceUpdateMain] = useState(false)
    const [dragging, setDragging] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 160 })


    // State variables for the custom topography form
    const [currentForm, setCurrentForm] = useState("topography")
    const [topographyName, setTopographyName] = useState("")
    const [resourceShape, setResourceShape] = useState("circle")
    const [elevation, setElevation] = useState(.5)
    const [resourceDensity, setResourceDensity] = useState(.5)
    const [resourceReplenishment, setResourceReplenishment] = useState(.5)
    const [color, setColor] = useState("red")


    // list will be initialized to be equal to topogrpahyInfo
    // if a user clicks on a topography, it will only update topographyInfo
    // if a user clicks on the exit button(not the submit button), then topography 
    //  info will be set equal to list[], which would be the same topography 
    //  information that was there before the user opened up the form.
    let list = []


    useEffect(() => {

        async function fetchData(){
            await axios({
                method: 'GET',
                url: 'http://localhost:5000/get-topography-info',
            }).then((response) => {
                topographyInfo = response.data.topographyRegistry
                list = response.data.topographyRegistry
                console.log("list", list)
            })
        }

        fetchData()
            
    }, [props.show])

    //do not attempt to load the grid or anything else until the topography data is gotten
    if (topographyInfo.length === 0) {
        return <></>
    }

    const handleDragStart = (e) => {
        setDragging(true)
    }

    const handleDragEnd = (e) => {
        setDragging(false)
        setPosition({
            x: e.clientX,
            y: e.clientY,
        })
    }

    const handleDrag = (e) => {
        if (dragging) {
            setPosition({
                x: e.clientX,
                y: e.clientY,
            })
        }
    }

    

    if (props.show) {

        if(currentForm == "topography"){
            return (
                <>
                    <Grid
                        showGridBorder={props.showGridBorder}
                        selectTopography={topography}
                        topographyInfo={topographyInfo}
                        forceUpdateMain={forceUpdateMain}
                    />
                    <div
                        id="topographyContainer"
                        style={{ left: position.x, top: position.y }}>
                        <div
                            id="dragBox"
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            onDrag={handleDrag}>
                            <FaArrowsAlt size={22} />
                        </div>
    
                        
                        <div className="formSwitchContainer">
                            <div onClick={() => {setCurrentForm("topography")}} className="formSwitchOption buttonHover" style={{backgroundColor: "rgb(61, 61, 61)", color: "white"}}>Topography</div>
                            <div onClick={() => {setCurrentForm("customTopography")}}className="formSwitchOption buttonHover">Custom Topography</div>
                        </div>
                        <button
                            onClick={() => {
                                topographyInfo = list
                                setForceUpdateMain(!forceUpdateMain)
                                props.closeTopographyPage()
                            }
                            }
                            className="formExitButton buttonHover2">
                            <FaTimes size={25} />
                        </button>
    
                        {
                            //swapped to radio buttons, that way a user knows that the most recent topography selected is the one being placed down
                            //once a radio button is pressed, the topography is updated (using setTopography) to the selected one.
                        }
                        <form id="topographyForm">

                            <div className="bottomMargin leftAlign">
                                <h1 id="topographyDescription">Select the desired topography, then click on the boxes to assign the region.</h1>
                            </div>
                            <div className="bottomMargin leftAlign">
                                <label className="dataTitle">Flat</label>
                                <input
                                    onChange={(event) => setTopography('flat')}
                                    type="radio"
                                    value="Grass"
                                    name="topographyRadio"
                                    defaultChecked={true}></input>
                                <br></br>
                            </div>
    
                            <div className="bottomMargin leftAlign">
                                <label className="dataTitle">Mild</label>
                                <input
                                    onChange={(event) => setTopography('mild')}
                                    type="radio"
                                    value="Rocky"
                                    name="topographyRadio"></input>
                                <br></br>
                            </div>
    
                            <div className="bottomMargin leftAlign">
                                <label className="dataTitle">Moderate</label>
                                <input
                                    onChange={(event) => setTopography('moderate')}
                                    type="radio"
                                    value="Snowy"
                                    name="topographyRadio"></input>
                                <br></br>
                            </div>
    
                            <div className="bottomMargin leftAlign">
                                <label className="dataTitle">Extreme</label>
                                <input
                                    onChange={(event) => setTopography('extreme')}
                                    type="radio"
                                    value="Wet"
                                    name="topographyRadio"></input>
                                <br></br>
                            </div>
    
    
                            <div onClick={(event) =>{submitTopography(event)}} className="buttonHover buttonBackgroundColor topographySubmitButton">Submit Changes</div>
    
                        </form>
                    </div>
                </>
            )

        }

        if(currentForm == "customTopography"){
            
            return(
               
                <>

                <Grid
                    showGridBorder={props.showGridBorder}
                    selectTopography={topography}
                    topographyInfo={topographyInfo}
                    forceUpdateMain={forceUpdateMain}
                />
                <div
                    id="topographyContainer"
                    style={{ left: position.x, top: position.y }}>
                    <div
                        id="dragBox"
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onDrag={handleDrag}>
                        <FaArrowsAlt size={22} />
                    </div>
                    
                    <div className="formSwitchContainer">
                        <div onClick={() => {setCurrentForm("topography")}} className="formSwitchOption buttonHover">Topography</div>
                        <div onClick={() => {setCurrentForm("customTopography")}}className="formSwitchOption buttonHover" style={{backgroundColor: "rgb(61, 61, 61)", color: "white"}}>Custom Topography</div>
                    </div>
                    
                    
                    <button
                        onClick={() => {
                            topographyInfo = list
                            setForceUpdateMain(!forceUpdateMain)
                            props.closeTopographyPage()
                        }
                        }
                        className="formExitButton buttonHover2">
                        <FaTimes size={25} />
                    </button>
                    

                    <form id="customTopographyForm">


                        <div className="bottomMargin leftAlign">
                            <h1 id="resourceTitle">Topography Attributes:</h1>
                        </div>

                        <div className="bottomMargin leftAlign">

                            <span className="topographyDataTitle">Name</span>
                            <input
                                onChange={(event) =>
                                    setTopographyName(event.target.value)
                                }
                                className="topographyDropDownOption"
                                type="text"
                                value={topographyName}>
                                
                            </input>


                        </div>




                        <div className="bottomMargin leftAlign">

                            <span className="topographyDataTitle">Elevation</span>
                            <input
                                onChange={(event) =>
                                    setElevation(event.target.value)
                                }
                                className="topographyDataSlider"
                                type="range"
                                min="0"
                                max="1"
                                step=".01"
                                value={elevation}></input>
                            <input
                                onChange={(event) =>
                                    setElevation(event.target.value)
                                }
                                className="topographyDataText"
                                type="number"
                                min="0"
                                max="1"
                                step=".01"
                                value={elevation}></input>
                            <br></br>

                        </div>

                        
                        <div className="bottomMargin leftAlign">
                            <h1 id="resourceTitle">Resource Attributes:</h1>
                        </div>

                        <div className="bottomMargin leftAlign">

                            <span className="topographyDataTitle">Denisty</span>
                            <input
                                onChange={(event) =>
                                    setResourceDensity(event.target.value)
                                }
                                className="topographyDataSlider"
                                type="range"
                                min="0"
                                max="1"
                                step=".01"
                                value={resourceDensity}></input>
                            <input
                                onChange={(event) =>
                                    setResourceDensity(event.target.value)
                                }
                                className="topographyDataText"
                                type="number"
                                min="0"
                                max="1"
                                step=".01"
                                value={resourceDensity}></input>
                            <br></br>

                        </div>
                        



                        <div className="bottomMargin leftAlign">

                            <span className="topographyDataTitle">Replenishment</span>
                            <input
                                onChange={(event) =>
                                    setResourceReplenishment(event.target.value)
                                }
                                className="topographyDataSlider"
                                type="range"
                                min="0"
                                max="1"
                                step=".01"
                                value={resourceReplenishment}></input>
                            <input
                                onChange={(event) =>
                                    setResourceReplenishment(event.target.value)
                                }
                                className="topographyDataText"
                                type="number"
                                min="0"
                                max="1"
                                step=".01"
                                value={resourceReplenishment}></input>
                            <br></br>

                        </div>


                        <div className="bottomMargin leftAlign">

                            <label className="topographyDataTitle">Color</label>
                            <select
                                onChange={(event) => setColor(event.target.value)}
                                className="topographyDropDownOption"
                               
                                value={color}>
                                <option value="red">Red</option>
                                <option value="blue">Blue</option>
                                <option value="green">Green</option>
                            </select>
                            <br></br>
                        </div>


                        <div className="bottomMargin leftAlign">

                            <label className="topographyDataTitle">Shape</label>
                            <select
                                onChange={(event) => setResourceShape(event.target.value)}
                                className="topographyDropDownOption"
                            
                                value={resourceShape}>
                                <option value="circle">Circle</option>
                                <option value="square">Square</option>
                                <option value="triangle">Triangle</option>
                            </select>
                            <br></br>
                        </div>


                    </form>
                    
                    <div onClick={(event) =>{createTopography(event)}} className="buttonHover buttonBackgroundColor customTopographySubmitButton">Create Topography</div>
                    
                </div>
                </>
            )
            

        }
        
    } else {
        return (
            <Grid
                showGridBorder={props.showGridBorder}
                topographyInfo={topographyInfo}
                forceUpdateMain={forceUpdateMain}
            />
        )
    }

    function createTopography(e){
        // create new topography using given data
        // [topographyName, resourceShape, elevation, resourceDensity, resourceReplenishment, color]

    }
    function submitTopography(e){
       
        // Send all of the topographies to backend
        // topographyInfo contains all correct nodes 


       
        console.log("list", list)
        console.log("topographyInfo", topographyInfo)
        props.closeTopographyPage()
    }
}

function Grid(props) {
    const [forceUpdate, setForceUpdate] = useState(false)

    let jsx = []

    console.log(topographyInfo)

    for (let i = 0; i < 1250; i++) {
        jsx.push(
            <Node
                id={topographyInfo[i]}
                toggleSelected={toggleSelected}
                topography={topographyInfo[i].type}
                selectTopography={props.selectTopography}
                showGridBorder={props.showGridBorder}
                row={topographyInfo[i].row}
                col={topographyInfo[i].column}
            />
        )
    }

    return (
        <div>
            <div id="mainGrid">{jsx}</div>
        </div>
    )

    async function toggleSelected(row, col) {
        // find the index of the node that was clicked
        let index = topographyInfo.findIndex(function (node) {
            if (node.row === row && node.column === col) {
                return true
            }
        })

        //props.updateList(row, col, props.selectTopography)

        //if the topography is selected, update the coord, else flip it
        if (topographyInfo[index].type != 'unselected') {
            // This is what I had to do to actually change the visuals, unfortunately it wouldn't
            // automatically update after making the backend call
            topographyInfo[index].type = 'unselected'

            // // Delete topography in backend at (col, row) position
            // await axios({
            //     method: 'POST',
            //     url: 'http://localhost:5000/remove-topography',
            //     data: {
            //         column: col,
            //         row: row,
            //     },
            // })
        } else {
            // This is what I had to do to actually change the visuals, unfortunately it wouldn't
            // automatically update after making the backend call
            topographyInfo[index].type = props.selectTopography

            // // Add new topography in backend at (col, row) position
            // await axios({
            //     method: 'POST',
            //     url: 'http://localhost:5000/create-new-topography',
            //     data: {
            //         topographyType: props.selectTopography,
            //         column: col,
            //         row: row,
            //     },
            // })
        }

        // this is the only way I was able to get the actual nodes to change color on the
        // screen right when they are clicked. Without this, it will only update once you
        // click another button or change topographies.
        setForceUpdate(!forceUpdate)
    }
}

let currentClass = 'defaultNode'
let gridBorder = ''

function Node(props) {
    // if we should be showing the grid border, show it, if not then don't
    if (props.showGridBorder) {
        gridBorder = ' gridBorder'
    } else {
        gridBorder = ''
    }

    // if the node is unselected, make it a default node
    if (props.topography == 'unselected') {
        currentClass = 'defaultNode'
    }
    // if it's not default, set it's style equal to the current topography of the node
    // (which is updated automatically by the handleClick() )
    else {
        currentClass = props.topography
    }

    const handleClick = () => {
        if (props.showGridBorder) {
            props.toggleSelected(props.row, props.col)
        }
    }

    return (
        <div
            className={currentClass + gridBorder}
            onClick={handleClick}
            //onDragOver={handleClick}
            //onDragEnter={handleClick}
            row={props.row}
            col={props.col}></div>
    )
}

export { TopographyPage, Grid }
