import React, {useState} from 'react'
import './Bottombar.css'
import PrevalenceSentimentSelector from './PrevalenceSentimentSelector'
import SummaryPopup from './SummaryPopup';

const Bottombar = () => {

  const [summaryVisible, setSummaryVisible] = useState<boolean>(false);

  const toggleSummary = () => {
    setSummaryVisible(prevSummary => !prevSummary);
  };

  return (
    <div className="bottom-bar">
        <PrevalenceSentimentSelector />
      <div className="summaryToggle">
        <button onClick={toggleSummary} className={`${summaryVisible ? 'active-button' : ''}`}>
          {summaryVisible ? <span>Hide</span> : <span>Show</span>} Summary
          <i className="icon tv-icon-up"/>
        </button>
      </div>
      {
        summaryVisible && <SummaryPopup toggleSummary={toggleSummary} />
      }
    </div>
  )
}

export default Bottombar