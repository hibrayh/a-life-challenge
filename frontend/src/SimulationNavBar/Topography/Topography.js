import React from 'react'
import './Topography.css'
import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

function TopographyPage(props) {
    const [checkedValue, setCheckedValue] = useState()
    const [grassland, setGrass] = useState(true)
    const [rocky, setRocky] = useState(false)
    const [snowy, setSnowy] = useState(false)
    const [wet, setWet] = useState(false)

    if (props.show) {
        return (
            <>
                <Grid showGridBorder={props.showGridBorder} />
                <div id="topographyContainer">
                    <h1>Topography</h1>
                    <button
                        onClick={props.closeTopographyPage}
                        className="formExitButton">
                        <FaTimes />
                    </button>

                    <form id="topographyForm">
                        <div className="attributeHolder">
                            <label className="dataTitle">Grass</label>
                            <input
                                onChange={(event) =>
                                    setGrass(event.target.value)
                                }
                                type="checkbox"
                                value="Grass"></input>
                            <br></br>
                        </div>

                        <div className="attributeHolder">
                            <label className="dataTitle">Rocky</label>
                            <input
                                onChange={(event) =>
                                    setRocky(event.target.value)
                                }
                                type="checkbox"
                                value="Rocky"></input>
                            <br></br>
                        </div>

                        <div className="attributeHolder">
                            <label className="dataTitle">Snowy</label>
                            <input
                                onChange={(event) =>
                                    setSnowy(event.target.value)
                                }
                                type="checkbox"
                                value="Snowy"></input>
                            <br></br>
                        </div>

                        <div className="attributeHolder">
                            <label className="dataTitle">Wet</label>
                            <input
                                onChange={(event) => setWet(event.target.value)}
                                type="checkbox"
                                value="Wet"></input>
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

function initialize() {
    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 25; j++) {
            gridArray.push({ selected: false, row: i, col: j })
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

    useConstructor(() => {
        initialize()
        setGrid(gridArray)
    })

    let jsx = []

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
        let index = grid.findIndex(function (node) {
            if (node.row == row && node.col == col) {
                return true
            }
        })

        temp[index].selected = !temp[index].selected
        setGrid(temp)
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
