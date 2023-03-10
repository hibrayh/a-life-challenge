import React from 'react'
import './Topography.css'
import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import axios from 'axios'

function TopographyPage(props) {
    const [topography, setTopography] = useState(unselected)

    if (props.show) {
        return (
            <>
                <Grid
                    showGridBorder={props.showGridBorder}
                    selectTopography={topography}
                />
                <div id="topographyContainer">
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
                            <label className="dataTitle">Grass</label>
                            <input
                                onChange={(event) => setTopography('Grass')}
                                type="radio"
                                value="Grass"
                                name="topographyRadio"></input>
                            <br></br>
                        </div>

                        <div className="attributeHolder">
                            <label className="dataTitle">Rocky</label>
                            <input
                                onChange={(event) => setTopography('Rocky')}
                                type="radio"
                                value="Rocky"
                                name="topographyRadio"></input>
                            <br></br>
                        </div>

                        <div className="attributeHolder">
                            <label className="dataTitle">Snowy</label>
                            <input
                                onChange={(event) => setTopography('Snowy')}
                                type="radio"
                                value="Snowy"
                                name="topographyRadio"></input>
                            <br></br>
                        </div>

                        <div className="attributeHolder">
                            <label className="dataTitle">Wet</label>
                            <input
                                onChange={(event) => setTopography('Wet')}
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
    if (gridArray.length === 0) {
        //don't just append more onto the already created array!
        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 25; j++) {
                //There are more columns than rows, so i and j have been swapped
                gridArray.push({ topography: 0, row: j, col: i })
                coordArray.push({ row: j, col: i, topography: unselected })
            }
        }
    }
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

    useConstructor(() => {
        initialize()
        setGrid(gridArray)
        setCoordGrid(coordArray)
    })

    let jsx = []

    for (let i = 0; i < 1250; i++) {
        jsx.push(
            <Node
                id={grid[i]}
                toggleSelected={toggleSelected}
                topography={grid[i].topography}
                selectTopography={props.selectTopography}
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

    async function toggleSelected(row, col) {
        let temp = JSON.parse(JSON.stringify(grid))
        let tempCoord = JSON.parse(JSON.stringify(coordGrid))
        let index = grid.findIndex(function (node) {
            if (node.row === row && node.col === col) {
                return true
            }
        })

        //temp[index].selected = !temp[index].selected
        //if the topography is selected, update the coord, else flip it
        if (temp[index].topography) {
            tempCoord[index].topography = unselected
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
            tempCoord[index].topography = props.selectTopography
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
        
        console.log(temp[index].topography, "previous")
        console.log(props.selectTopography, "new")
        temp[index].topography = props.selectTopography

        setGrid(temp)
        setCoordGrid(tempCoord)
       
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


    // if the node is unselected, make it a default node
    if(!props.topography){
        currentClass="defaultNode"
    }
    // if it's not default, set it's style equal to the current topography of the node
    // (which is updated automatically by the handleClick() )
    else{
        currentClass = props.topography
    }


    function handleClick() {
        if (props.showGridBorder) {
            props.toggleSelected(props.row, props.col)
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
