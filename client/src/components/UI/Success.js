import React from 'react'
import { label } from './../../constants/label.constants'

function Success({setSuccess}) {

  const handleClick = () => {
    setSuccess(false)
  }

  return (
    <div className="success">
        <h2>{label.successMessage}</h2>
        <button onClick={handleClick}>Close</button>
    </div>
  )
}

export default Success