import React from 'react'
import './Topography.css'
import { useState, useEffect } from 'react'
import { FaTimes, FaArrowsAlt } from 'react-icons/fa'
import axios from 'axios'

let topographyInfo = []

function TopographyPage(props) {
    const [topography, setTopography] = useState('unselected')
    const [dragging, setDragging] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 160 })
    const [isLoading, setLoading] = useState(true)

    /*async function getSimulationInfo() {
        await axios({
            method: 'GET',
            url: 'http://localhost:5000/get-simulation-info',
        }).then((response) => {
            const res = response.data
            topographyInfo = res.topographyRegistry
        })
        console.log("ran")
    }*/

    useEffect(() => {
        axios
            .get('http://localhost:5000/get-simulation-info')
            .then((response) => {
                topographyInfo = response.data.topographyRegistry
            })
    }, [])

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
        return (
            <>
                <Grid
                    showGridBorder={props.showGridBorder}
                    selectTopography={topography}
                    topographyInfo={topographyInfo}
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

                    <h1 className="mainTitleFont">Topography</h1>
                    <button
                        onClick={props.closeTopographyPage}
                        className="formExitButton buttonHover2">
                        <FaTimes size={25} />
                    </button>

                    {
                        //swapped to radio buttons, that way a user knows that the most recent topography selected is the one being placed down
                        //once a radio button is pressed, the topography is updated (using setTopography) to the selected one.
                    }
                    <form id="topographyForm">
                        <div className="attributeHolder">
                            <label className="dataTitle">Flat</label>
                            <input
                                onChange={(event) => setTopography('flat')}
                                type="radio"
                                value="Grass"
                                name="topographyRadio"></input>
                            <br></br>
                        </div>

                        <div className="attributeHolder">
                            <label className="dataTitle">Mild</label>
                            <input
                                onChange={(event) => setTopography('mild')}
                                type="radio"
                                value="Rocky"
                                name="topographyRadio"></input>
                            <br></br>
                        </div>

                        <div className="attributeHolder">
                            <label className="dataTitle">Moderate</label>
                            <input
                                onChange={(event) => setTopography('moderate')}
                                type="radio"
                                value="Snowy"
                                name="topographyRadio"></input>
                            <br></br>
                        </div>

                        <div className="attributeHolder">
                            <label className="dataTitle">Extreme</label>
                            <input
                                onChange={(event) => setTopography('extreme')}
                                type="radio"
                                value="Wet"
                                name="topographyRadio"></input>
                            <br></br>
                        </div>
                    </form>
                </div>
            </>
        )
    } else {
        return (
            <Grid
                topographyInfo={topographyInfo}
                showGridBorder={props.showGridBorder}
            />
        )
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

    /*
    let i = 0
    for (let row = 0; row < 25; row++) {
        let currentRow = []
        for (let column = 0; column < 50; column++) {
            currentRow.push(
                <Node
                    id={props.topographyInfo[i]}
                    toggleSelected={toggleSelected}
                    topography={props.topographyInfo[i].type}
                    selectTopography={props.selectTopography}
                    showGridBorder={props.showGridBorder}
                    row={props.topographyInfo[i].row}
                    col={props.topographyInfo[i].column}
                />
            )
            i += 1
        }
        jsx.push(
            <div id={"row" + row} class="flex-container">
                {currentRow}
            </div>
        )
    }
    */

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

        console.log(row, col)

        //if the topography is selected, update the coord, else flip it
        if (topographyInfo[index].type != 'unselected') {
            // This is what I had to do to actually change the visuals, unfortunately it wouldn't
            // automatically update after making the backend call
            topographyInfo[index].type = 'unselected'

            // Delete topography in backend at (col, row) position
            await axios({
                method: 'POST',
                url: 'http://localhost:5000/remove-topography',
                data: {
                    column: col,
                    row: row,
                },
            })
        } else {
            // This is what I had to do to actually change the visuals, unfortunately it wouldn't
            // automatically update after making the backend call
            topographyInfo[index].type = props.selectTopography

            // Add new topography in backend at (col, row) position
            await axios({
                method: 'POST',
                url: 'http://localhost:5000/create-new-topography',
                data: {
                    topographyType: props.selectTopography,
                    column: col,
                    row: row,
                },
            })
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
