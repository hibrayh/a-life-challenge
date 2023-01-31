import React from 'react'
import './Topography.css'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

function TopographyPage(props){


    if(props.show){
        return(

            <div id="topographyContainer">

                <h1>Topography</h1>
                <button onClick={props.closeTopographyPage} className="formExitButton"><FaTimes /></button>


                <form id="topographyForm">

                    <div className="attributeHolder">
                        <label className="dataTitle">Grassland</label>
                        <input type="checkbox"></input><br></br>
                    </div>

                    <div className="attributeHolder">    
                        <label className="dataTitle">Rocky</label>
                        <input type="checkbox"></input><br></br>
                    </div>

                    <div className="attributeHolder">
                        <label className="dataTitle">Snowy</label>
                        <input type="checkbox"></input><br></br>
                    </div>

                    <div className="attributeHolder">
                        <label className="dataTitle">Wet</label>
                        <input type="checkbox"></input><br></br>
                    </div>




                </form>
            </div>

        )
    }
}

export default TopographyPage