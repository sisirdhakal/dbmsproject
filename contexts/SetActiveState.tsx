import React, { useState } from 'react'
import SetActiveContext from './SetActiveContext'

export default function SetActiveState(props) {

    const value = {
        value: "addTask"
    }

    const [activeComp, setactiveComp] = useState(value)

    const setActiveComp = (data) => {
        setactiveComp({
            value: data
        })
    }

    return (
        <SetActiveContext.Provider value={{ activeComp, setActiveComp }}>
            {props.children}
        </SetActiveContext.Provider>
    )
}
