/*
 * Spinner derived from https://tobiasahlin.com/spinkit/.
 */

import React from 'react'

import './spinner.css'

function Spinner() {

    return (
        <div className="spinner">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
        </div>
    )
}

export default Spinner