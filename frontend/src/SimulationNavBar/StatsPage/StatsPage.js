import React from 'react'
import './StatsPage.css'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

function StatsPage(props) {
    if (props.show) {
        return (
            <div id="statsPageContainer">
                <h1>Stats</h1>
                <button
                    onClick={props.closeStatsPage}
                    className="formExitButton">
                    <FaTimes />
                </button>

                <div id="statsPageInfoContainer">
                    <StatsItem speciesName="Shloorpian" />
                    <StatsItem speciesName="Shloorpian" />
                    <StatsItem speciesName="Shloorpian" />
                    <StatsItem speciesName="Shloorpian" />
                    <StatsItem speciesName="Shloorpian" />
                    <StatsItem speciesName="Shloorpian" />
                    <StatsItem speciesName="Shloorpian" />
                    <StatsItem speciesName="Shloorpian" />
                    <StatsItem speciesName="Shloorpian" />
                    <StatsItem speciesName="Shloorpian" />
                    <StatsItem speciesName="Shloorpian" />
                    <StatsItem speciesName="Shloorpian" />
                    <StatsItem speciesName="Shloorpian" />
                    <StatsItem speciesName="Shloorpian" />
                </div>
            </div>
        )
    }
}

function StatsItem(props) {
    return (
        <div className="statsItem">
            <h2>Species: {props.speciesName}</h2>
        </div>
    )
}
export default StatsPage
