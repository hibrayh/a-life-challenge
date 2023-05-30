import React from 'react'
import './Topography.css'
import { useState, useEffect, useRef } from 'react'
import { FaTimes, FaArrowsAlt } from 'react-icons/fa'
import axios from 'axios'
import { ChromePicker } from 'react-color'

import {
    GetTopographyRequest,
    CreateTopographyRequest,
    DeleteTopographyRequest,
    TopographyTable,
    TopographyRow,
    TopographyInfo,
} from './../../generated_comm_files/backend_api_pb'
import { BackendClient } from '../../generated_comm_files/backend_api_grpc_web_pb'

var backendService = new BackendClient('http://localhost:44039')

let topographyInfo = []

function TopographyPage(props) {
    const [topography, setTopography] = useState('flat')
    const [forceUpdateMain, setForceUpdateMain] = useState(false)
    const [dragging, setDragging] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 160 })

    //color picker variables
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [color, setColor] = useState('#524f4f')

    // State variables for the custom topography form
    const [currentForm, setCurrentForm] = useState('topography')
    const [topographyName, setTopographyName] = useState('')
    const [resourceShape, setResourceShape] = useState('circle')
    const [elevation, setElevation] = useState(0.5)
    const [resourceDensity, setResourceDensity] = useState(0.5)
    const [resourceReplenishment, setResourceReplenishment] = useState(0.5)

    // list will be initialized to be equal to topogrpahyInfo
    // if a user clicks on a topography, it will only update topographyInfo
    // if a user clicks on the exit button(not the submit button), then topography
    //  info will be set equal to list[], which would be the same topography
    //  information that was there before the user opened up the form.
    let list = []

    let dummyListOfTopographyTypes = [
        { type: 'flat', color: '#239b0b' },
        { type: 'mild', color: '#f3eded' },
        { type: 'moderate', color: '#2a3bd6' },
        { type: 'extreme', color: '#524f4f' },
    ]

    useEffect(() => {
        async function fetchData() {
            var request = new GetTopographyRequest()

            await backendService.getTopography(
                request,
                {},
                function (err, response) {
                    let topoRows = response.getRowList()
                    topographyInfo = []

                    for (let i = 0; i < topoRows.length; i += 1) {
                        for (
                            let j = 0;
                            j < topoRows[i].getItemList().length;
                            j += 1
                        ) {
                            topographyInfo.push(topoRows[i].getItemList()[j])
                        }
                    }
                }
            )
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
        if (currentForm == 'topography') {
            return (
                <>
                    <Grid
                        showGridBorder={props.showGridBorder}
                        selectTopography={topography}
                        topographyInfo={topographyInfo}
                        forceUpdateMain={forceUpdateMain}
                        listOfTopographies={dummyListOfTopographyTypes}
                    />
                    <div
                        id="topographyContainer"
                        style={{ left: position.x, top: position.y }}>
                        <div
                            id="dragBox"
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            onDrag={handleDrag}
                            style={{ userSelect: true }}>
                            <FaArrowsAlt size={22} />
                        </div>

                        <div className="formSwitchContainer">
                            <div
                                onClick={() => {
                                    setCurrentForm('topography')
                                }}
                                className="formSwitchOption buttonHover"
                                style={{
                                    backgroundColor: 'rgb(61, 61, 61)',
                                    color: 'white',
                                }}>
                                Topography
                            </div>
                            <div
                                onClick={() => {
                                    setCurrentForm('customTopography')
                                }}
                                className="formSwitchOption buttonHover">
                                Custom Topography
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                topographyInfo = list
                                setForceUpdateMain(!forceUpdateMain)
                                props.closeTopographyPage()
                            }}
                            className="formExitButton buttonHover2">
                            <FaTimes size={25} />
                        </button>

                        {
                            // This Form makes up all of the topography options
                        }
                        <TopographyForm
                            setTopography={setCurrentTopography}
                            submitTopography={submitTopography}
                            topographyList={dummyListOfTopographyTypes}
                        />
                    </div>
                </>
            )
        }

        if (currentForm == 'customTopography') {
            return (
                <>
                    <Grid
                        showGridBorder={props.showGridBorder}
                        selectTopography={topography}
                        topographyInfo={topographyInfo}
                        forceUpdateMain={forceUpdateMain}
                        listOfTopographies={dummyListOfTopographyTypes}
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
                            <div
                                onClick={() => {
                                    setCurrentForm('topography')
                                }}
                                className="formSwitchOption buttonHover">
                                Topography
                            </div>
                            <div
                                onClick={() => {
                                    setCurrentForm('customTopography')
                                }}
                                className="formSwitchOption buttonHover"
                                style={{
                                    backgroundColor: 'rgb(61, 61, 61)',
                                    color: 'white',
                                }}>
                                Custom Topography
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                topographyInfo = list
                                setForceUpdateMain(!forceUpdateMain)
                                props.closeTopographyPage()
                            }}
                            className="formExitButton buttonHover2">
                            <FaTimes size={25} />
                        </button>

                        <form id="customTopographyForm">
                            <div className="bottomMargin leftAlign">
                                <h1 id="resourceTitle">
                                    Topography Attributes:
                                </h1>
                            </div>

                            <div className="bottomMargin leftAlign">
                                <span className="topographyDataTitle">
                                    Name
                                </span>
                                <input
                                    onChange={(event) =>
                                        setTopographyName(event.target.value)
                                    }
                                    className="topographyDropDownOption"
                                    type="text"
                                    value={topographyName}></input>
                            </div>

                            <DataSlider
                                name="Elevation"
                                setAttribute={setElevation}
                                attribute={elevation}
                                min={0}
                                max={1}
                                step={0.01}
                            />

                            <div className="bottomMargin leftAlign">
                                <h1 id="resourceTitle">Resource Attributes:</h1>
                            </div>

                            <DataSlider
                                name="Denisty"
                                setAttribute={setResourceDensity}
                                attribute={resourceDensity}
                                min={0}
                                max={1}
                                step={0.01}
                            />
                            <DataSlider
                                name="Replenishment"
                                setAttribute={setResourceReplenishment}
                                attribute={resourceReplenishment}
                                min={0}
                                max={1}
                                step={0.01}
                            />

                            <div className="bottomMargin leftAlign">
                                <label className="topographyDataTitle">
                                    Color
                                </label>

                                <button
                                    onClick={(event) => {
                                        setShowColorPicker(!showColorPicker)
                                        event.preventDefault()
                                    }}
                                    className="topographyDropDownOption">
                                    Pick Color
                                </button>
                                {showColorPicker ? (
                                    <ChromePicker
                                        color={color}
                                        onChange={(event) =>
                                            setColor(event.hex)
                                        }
                                        className="colorPicker"
                                    />
                                ) : null}
                                <br></br>
                            </div>

                            <div className="bottomMargin leftAlign">
                                <label className="topographyDataTitle">
                                    Shape
                                </label>
                                <select
                                    onChange={(event) =>
                                        setResourceShape(event.target.value)
                                    }
                                    className="topographyDropDownOption"
                                    value={resourceShape}>
                                    <option value="circle">Circle</option>
                                    <option value="square">Square</option>
                                    <option value="triangle">Triangle</option>
                                </select>
                                <br></br>
                            </div>
                        </form>

                        <div
                            onClick={(event) => {
                                createTopography(event)
                            }}
                            className="buttonHover buttonBackgroundColor customTopographySubmitButton">
                            Create Topography
                        </div>
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
                listOfTopographies={dummyListOfTopographyTypes}
            />
        )
    }

    function setCurrentTopography(topography) {
        setTopography(topography)
    }

    function createTopography(e) {
        // create new topography using given data
        // [topographyName, resourceShape, elevation, resourceDensity, resourceReplenishment, color(hex value)]
    }
    function submitTopography(e) {
        // Send all of the topographies to backend
        // topographyInfo contains all correct nodes
        var newTopographyTable = new TopographyTable()
        var rows = []
        var currentIndex = 0

        for (var i = 0; i < 25; i++) {
            var currentRow = []
            for (var j = 0; j < 50; j++) {
                currentRow.push(topographyInfo[currentIndex])
                currentIndex += 1
            }

            var currentRowObject = new TopographyRow()
            currentRowObject.setItemList(currentRow)
            rows.push(currentRowObject)
        }

        newTopographyTable.setRowList(rows)

        backendService.setTopography(
            newTopographyTable,
            {},
            function (err, response) {
                if (response.getTopographyset()) {
                    console.log('Topography submitted successfully')
                } else {
                    console.error(
                        'Something went wrong submitting the topography'
                    )
                }
            }
        )

        props.closeTopographyPage()
    }
}

function TopographyOption(props) {
    return (
        <div className="bottomMargin leftAlign">
            <label className="dataTitle">{props.name}</label>
            <input
                type="radio"
                value={props.name}
                onClick={(event) => props.setTopography(props.name)}
                name="topographyRadio"></input>
            <br></br>
        </div>
    )
}

function TopographyForm(props) {
    return (
        <form id="topographyForm">
            <div className="bottomMargin leftAlign">
                <h1 id="topographyDescription">
                    Select the desired topography, then click on the boxes to
                    assign the region.
                </h1>
            </div>

            {
                //dynamically populate the list of topographies with topography list
            }
            {props.topographyList.map((topography) => (
                <TopographyOption
                    name={topography.type}
                    setTopography={props.setTopography}
                />
            ))}

            <div
                onClick={(event) => {
                    props.submitTopography(event)
                }}
                className="buttonHover buttonBackgroundColor topographySubmitButton">
                Submit Changes
            </div>
        </form>
    )
}

function Grid(props) {
    const [forceUpdate, setForceUpdate] = useState(false)

    let jsx = []

    for (let i = 0; i < 1250; i++) {
        jsx.push(
            <Node
                key={topographyInfo[i].getId()}
                id={topographyInfo[i].getId()}
                toggleSelected={toggleSelected}
                topography={topographyInfo[i].getType()}
                selectTopography={props.selectTopography}
                showGridBorder={props.showGridBorder}
                row={topographyInfo[i].getRow()}
                col={topographyInfo[i].getColumn()}
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
            if (node.getRow() === row && node.getColumn() === col) {
                return true
            }
        })

        //props.updateList(row, col, props.selectTopography)

        //if the topography is selected, update the coord, else flip it
        if (topographyInfo[index].getType() != 'unselected') {
            // This is what I had to do to actually change the visuals, unfortunately it wouldn't
            // automatically update after making the backend call
            // topographyInfo[index].getType() = 'unselected'

            var request = new DeleteTopographyRequest()
            request.setRow(row)
            request.setColumn(col)

            await backendService.deleteTopography(
                request,
                {},
                function (err, response) {
                    console.log(response)
                    if (response.getTopographydeleted()) {
                        console.log('Successfully deleted topography')
                    } else {
                        console.log(
                            'Something went wrong deleting the topography'
                        )
                    }
                }
            )
        } else {
            // This is what I had to do to actually change the visuals, unfortunately it wouldn't
            // automatically update after making the backend call
            // topographyInfo[index].type = props.selectTopography

            var request = new CreateTopographyRequest()
            request.setType(props.selectTopography)
            request.setRow(row)
            request.setColumn(col)

            await backendService.createTopography(
                request,
                {},
                function (err, response) {
                    if (response.getTopographyadded()) {
                        console.log('Successfully added topography')
                    } else {
                        console.log(
                            'Something went wrong adding the topography'
                        )
                    }
                }
            )
        }

        // this is the only way I was able to get the actual nodes to change color on the
        // screen right when they are clicked. Without this, it will only update once you
        // click another button or change topographies.
        setForceUpdate(!forceUpdate)
    }
}

let gridBorder = ''

function Node(props) {
    // if we should be showing the grid border, show it, if not then don't
    if (props.showGridBorder) {
        gridBorder = ' gridBorder'
    } else {
        gridBorder = ''
    }

    // if the node is unselected, make it a default node
    // if (props.topography == 'unselected') {
    //     currentClass = 'defaultNode'
    // }
    // if it's not default, set it's style equal to the current topography of the node
    // (which is updated automatically by the handleClick() )
    // else {
    //     currentClass = props.topography
    // }

    // new way to render the topography colors
    let topographyOption = null

    if (props.topography == 'unselected') {
        topographyOption = { color: '#ACACAC' }
    } else {
        topographyOption = props.listOfTopographies.find(
            (option) => option.type == props.topography
        )
    }

    const handleClick = () => {
        if (props.showGridBorder) {
            props.toggleSelected(props.row, props.col)
        }
    }

    return (
        <div
            className="defaultNode"
            onClick={handleClick}
            style={{ backgroundColor: topographyOption.color }}
            row={props.row}
            col={props.col}></div>
    )
}

function DataSlider({ name, setAttribute, attribute, min, max, step }) {
    return (
        <div className="bottomMargin leftAlign">
            <span className="topographyDataTitle">{name}</span>
            <input
                onChange={(event) => setAttribute(event.target.value)}
                className="topographyDataSlider"
                type="range"
                min={min}
                max={max}
                step={step}
                value={attribute}></input>
            <input
                onChange={(event) => setAttribute(event.target.value)}
                className="topographyDataText"
                type="number"
                min={min}
                max={max}
                step={step}
                value={attribute}></input>
            <br></br>
        </div>
    )
}

export { TopographyPage, Grid }
