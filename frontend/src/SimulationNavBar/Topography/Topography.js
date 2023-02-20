import React from 'react'
import './Topography.css'
import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import axios from 'axios'

function TopographyPage(props) {
    const [checkedValue, setCheckedValue] = useState()
    const [grassland, setGrass] = useState(true)
    const [rocky, setRocky] = useState(false)
    const [snowy, setSnowy] = useState(false)
    const [wet, setWet] = useState(false)
    const [topography, setTopography] = useState(unselected)


    if (props.show) {
        return (
            <>
                <Grid showGridBorder={props.showGridBorder} selectTopography={topography}/>
                <div id="topographyContainer">
                    <h1>Topography</h1>
                    <button
                        onClick={props.closeTopographyPage}
                        className="formExitButton">
                        <FaTimes />
                    </button>

                    {
                        //swapped to radio buttons, that way a user knows that the most recent topography selected is the one being placed down
                        //once a radio button is pressed, the topography is updated (using setTopography) to the selected one.
                    }
                    <form id="topographyForm">
                        <div className="attributeHolder">
                            <label className="dataTitle">Grass</label>
                            <input
                                onChange={(event) =>
                                    setTopography("Grass")
                                }
                                type="radio"
                                value="Grass"
                                name="topographyRadio"></input>
                            <br></br>
                        </div>

                        <div className="attributeHolder">
                            <label className="dataTitle">Rocky</label>
                            <input
                                onChange={(event) =>
                                    setTopography("Rocky")
                                }
                                type="radio"
                                value="Rocky"
                                name="topographyRadio"></input>
                            <br></br>
                        </div>

                        <div className="attributeHolder">
                            <label className="dataTitle">Snowy</label>
                            <input
                                onChange={(event) =>
                                    setTopography("Snowy")
                                }
                                type="radio"
                                value="Snowy"
                                name="topographyRadio"></input>
                            <br></br>
                        </div>

                        <div className="attributeHolder">
                            <label className="dataTitle">Wet</label>
                            <input
                                onChange={(event) => setTopography("Wet")}
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
        return <Grid showGridBorder={props.showGridBorder} />
    }
}

// class Coordinate {

//     constructor(x,y){
//         this.x
//     }

// }

// class Box {

// }

let gridArray = []
let coordArray = []
const unselected = 0

/* My idea is for it to send the array with the topography info once the 
page (when the grid is showing) is closed The following code is an attempted skeleton 
which would need a select-topography handler on the backend. I'm not sure if there is
one in place already

async function handleCloseTopography(event) {

    await axios({
        method: 'POST',
        url: 'http://localhost:5000/select-topography',
        data: {
            gridCoords: coordArray
        },
    })

}
*/


function initialize() {
    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 25; j++) {
            //There are more columns than rows, so i and j have been swapped
            gridArray.push({ selected: false, row: j, col: i})
            coordArray.push({row: j, col: i, topography: unselected})
        }
    }
    console.log('constructor')
}

const useConstructor = (callBack = () => {}) => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false)
    if (hasBeenCalled) return
    callBack()
    setHasBeenCalled(true)
}

function Grid(props) {
    const [grid, setGrid] = useState(gridArray)
    const [coordGrid, setCoordGrid] = useState(coordArray)

    console.log(coordGrid)
    useConstructor(() => {
        initialize()
        setGrid(gridArray)
        setCoordGrid(coordArray)
    })

    let jsx = []
    console.log(props.selectTopography)

    for (let i = 0; i < 1250; i++) {
        jsx.push(
            <Node
                id={grid[i]}
                toggleSelected={toggleSelected}
                selected={grid[i].selected}
                showGridBorder={props.showGridBorder}
                row={grid[i].row}
                col={grid[i].col}
            />
        )
    }

    return (
        <div>
            <div id="mainGrid">{jsx}</div>
        </div>
    )

    function toggleSelected(row, col, selected) {
        let temp = JSON.parse(JSON.stringify(grid))
        let tempCoord = JSON.parse(JSON.stringify(coordGrid))
        let index = grid.findIndex(function (node) {
            if (node.row === row && node.col === col) {
                return true
            }
        })

        //temp[index].selected = !temp[index].selected
        //if the topography is selected, update the coord, else flip it
        if(temp[index].selected){
            tempCoord[index].topography = unselected
        }else{
            tempCoord[index].topography = props.selectTopography
        }

        temp[index].selected = !temp[index].selected

        setGrid(temp)
        setCoordGrid(tempCoord)
        //console.log(coordGrid[index])
    }
}

let currentClass = 'node'
let gridBorder = ''

function Node(props) {
    if (props.showGridBorder) {
        gridBorder = ' gridBorder'
    } else {
        gridBorder = ''
    }

    if (props.selected) {
        currentClass = 'selectedNode'
    } else {
        currentClass = 'node'
    }

    function handleClick() {
        if (props.showGridBorder) {
            props.toggleSelected(props.row, props.col, props.selected)
        }
    }

    return (
        <div
            className={currentClass + gridBorder}
            onClick={handleClick}
            onDragOver={handleClick}
            onDragEnter={handleClick}
            row={props.row}
            col={props.col}></div>
    )
}

export { TopographyPage, Grid }
