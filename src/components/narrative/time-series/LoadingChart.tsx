import React from 'react'
import './LoadingChart.css'

const LoadingChart = () => {
  return (
    <div className="loadingChart">
        <i className="icon tv-icon-symbol"/>
        <h2>
            We're crunching the numbers!
        </h2>
        <h3>
            Please be patient as this may take a few seconds.
        </h3>
    </div>
  )
}

export default LoadingChart