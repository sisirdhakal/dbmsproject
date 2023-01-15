import React, { useState } from 'react'
import ToggleContext from './ToggleContext'

export default function ToggleState(props) {

    const value = {
        "value": false,
        mobDisplay: false
    }

    const [toggleState, settoggleState] = useState(value)

    const setToggleState = ({ data, mobData }) => {

        settoggleState({
            "value": data,
            "mobDisplay": mobData
        })

    }

    return (
        <ToggleContext.Provider value={{ toggleState, setToggleState }}>
            {props.children}
        </ToggleContext.Provider>
    )
}
