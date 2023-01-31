import React from 'react'
import './StatsPage.css'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

function StatsPage(props) {




    if(props.show){

        return(

            <div id="statsPageContainer">
                
                <h1>Stats Page</h1>
                <button onClick={props.closeStatsPage} className="formExitButton"><FaTimes /></button>


            </div>

        )

    }


}



export default StatsPage