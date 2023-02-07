import React from 'react'
import './Topography.css'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

function TopographyPage(props) {
    if (props.show) {
        return (

            <>
            
                <div id="topographyContainer">
                    <h1>Topography</h1>
                    <button
                        onClick={props.closeTopographyPage}
                        className="formExitButton">
                        <FaTimes />
                    </button>

                    <form id="topographyForm">
                        <div className="attributeHolder">
                            <label className="dataTitle">Grassland</label>
                            <input type="checkbox"></input>
                            <br></br>
                        </div>

                        <div className="attributeHolder">
                            <label className="dataTitle">Rocky</label>
                            <input type="checkbox"></input>
                            <br></br>
                        </div>

                        <div className="attributeHolder">
                            <label className="dataTitle">Snowy</label>
                            <input type="checkbox"></input>
                            <br></br>
                        </div>

                        <div className="attributeHolder">
                            <label className="dataTitle">Wet</label>
                            <input type="checkbox"></input>
                            <br></br>
                        </div>
                    </form>
                </div>

                <Grid />

            </>
        )
    }
}


function Grid(){
    
    const [grid, setGrid] = useState([])
    let gridArray = []
    initializeGrid()

    return(
        <div>
            <div id="mainGrid">

                {gridArray.map(node => (
                    <Node row={node[0]} col={node[1]} />
                ))}

            </div>
        </div>
    )

    function addNodeToGrid(row, col){
        setGrid([
            ...grid,
            [row, col]
        ])
    }

    function initializeGrid(props){
        
        for(let i  = 0; i < 50; i++){
            for(let j = 0; j < 25; j++)
                gridArray.push([i, j])
        }

    }

}

let test = "node"

function Node(props){
    const [selected, setSelected] = useState(false)
    function handleClick(){
        
        if(!selected){
            test = "selected"
        }
        else{
            test = "node"
        }
        
        setSelected(!selected)
    }

    return(
        <div className={test} onClick={handleClick} onDragOver={handleClick} onDragEnter={handleClick} row={props.row} col={props.col}></div>
    )


}

export {TopographyPage, Grid}
