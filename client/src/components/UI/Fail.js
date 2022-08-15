import React from 'react'
import { label } from './../../constants/label.constants'

function Fail({setFail}) {

  const handleClick = () => {
    setFail(false)
  }

  return (
    <div className="fail">
        <h2>{label.failMessage}</h2>
        <button onClick={handleClick}>Close</button>
    </div>
  )
}

export default Fail