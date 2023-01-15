import React, { useState } from 'react'
import Usercontext from './Usercontext'

export default function Userstate(props) {

  const value = {
    "value": "login"
  }

  const [state, setstate] = useState(value)

  const setState = (data) => {
    setstate({
      "value": data
    })
  }

  return (
    <Usercontext.Provider value={{ state, setState }}>
      {props.children}
    </Usercontext.Provider>
  )
}
