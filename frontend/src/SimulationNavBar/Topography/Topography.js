import React from 'react'
import './Topography.css'
import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

function TopographyPage(props) {
    
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

            </>
        )
    }

    else{
        return (
            <Grid showGridBorder={props.showGridBorder} />
        )
    }
}


// <Node showGridBorder={props.showGridBorder} row={0} col={0} />

// {gridArray.map(node => (
//     <Node showGridBorder={props.showGridBorder} row={node[0]} col={node[1]}/>
// ))}

let gridSystem


let gridArray = []

function initialize(){
    
    for(let i  = 0; i < 50; i++){
        for(let j = 0; j < 25; j++){
            gridArray.push({selected: false, row: i, col:j})
        }
    }


    

    console.log("constructor")
    
}

// class Coordinate {

//     constructor(x,y){
//         this.x
//     }

// }

// class Box {
    
// }


const useConstructor = (callBack = () => {}) => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
}










function Grid(props){
    const [grid, setGrid] = useState(gridArray)
    
    useConstructor(() => {
        initialize()
        setGrid(gridArray)

        console.log("constructor")
    });

    
    
    console.log("grid")
    //console.log(grid[0])
    let jsx = []
    
    for( let i = 0; i < 1250; i++){
        jsx.push(<Node id={grid[i]} toggleSelected={toggleSelected} selected={grid[i].selected} showGridBorder={props.showGridBorder} row={grid[i].row} col={grid[i].col} />)
    }
    //console.log(grid[0])

    // grid.map(node => (
        //     <Node showGridBorder={node[0]} row={node[1]} col={node[2]} />
        // ))
        
    console.log("in grid")

    return(
        <div>
            <div id="mainGrid">
            

                {jsx}
                

            </div>

            
        </div>
    )

    
    function toggleSelected(row, col, selected){
        let temp = JSON.parse(JSON.stringify(grid)) 
        let index = grid.findIndex(function (node) {
            if (node.row == row && node.col == col){
                return true
            }
        })

        console.log("before Temp", temp[index])
        temp[index].selected = !temp[index].selected
        console.log("after Temp", temp[index])
        //console.log(temp[index])
        console.log("before", grid[index])
        setGrid(temp)
        console.log("after", grid[index])
    }


    
}

let currentClass = "node"
let gridBorder = ""


function Node(props){
    
    const [selected, setSelected] = useState(false)

    
    
    if(props.showGridBorder){
        gridBorder = " gridBorder"
    }
    else{
        gridBorder = ""
    }
    
    if(props.selected){
        currentClass = "selectedNode"
        
    }
    else{
        currentClass = "node"
    }
    function handleClick(){
        props.toggleSelected(props.row, props.col, props.selected)
        setSelected(!selected)
        console.log("props.selected", props.selected)
        
        console.log("Node Clicked")
       
    }

    
    return(
        <div className={currentClass + gridBorder}  onClick={handleClick} onDragOver={handleClick} onDragEnter={handleClick} row={props.row} col={props.col}></div>
    )


}

export {TopographyPage, Grid}
