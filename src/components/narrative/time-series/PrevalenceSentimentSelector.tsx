import React, { useContext } from 'react';
import {ToggleButton, ToggleButtonGroup} from '@mui/material';
import { SeriesContext } from './../../../context/SeriesContext';
import './PrevalenceSentimentSelector.css'

const PrevalenceSentimentSelector = () => {

  const { isSentimentSelected, handleSentimentSelection } = useContext(SeriesContext);

  return (
    <div className="modeToggle">
      <button className={`${isSentimentSelected ? '' : 'active-button'}`} onClick={() => handleSentimentSelection(false)}>
        Prevalence
      </button>
      <button className={`${isSentimentSelected ? 'active-button' : ''}`} onClick={() => handleSentimentSelection(true)}>
        Sentiment
      </button>
    </div>
  )
}

export default PrevalenceSentimentSelector;
