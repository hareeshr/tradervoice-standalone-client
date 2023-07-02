import React, { useContext } from 'react'
import { SeriesContext } from './../../../context/SeriesContext';
import './SummaryPopup.css';
import Summary from './Summary';
import Scrollbars from 'react-custom-scrollbars-2';

type SummaryPopupProps = {
    toggleSummary: () => void
}

const SummaryPopup = ({ toggleSummary }: SummaryPopupProps) => {
    
  const { textTimeSeries } = useContext(SeriesContext);

  return (
    <div className="summaryPopup">
        <button className="close" onClick={toggleSummary}>
          <i className="icon tv-icon-close"/>
        </button>
        
        <Scrollbars autoHeightMax="230px" autoHeightMin="230px"
            renderThumbVertical={({ style, ...props }) => (
                <div
                {...props}
                style={{
                    ...style,
                    backgroundColor: 'rgb(255 255 255 / 50%)',
                    borderRadius: '5px',
                }}
                />
            )}>
                <div className="summaryContainer">
                    {textTimeSeries.map((tts) => (
                    <Summary
                        key={tts.text}
                        text={tts.text}
                        color={tts.color}
                        component="li"
                        sx={{ mb: 2 }}
                    />
                    ))}
                </div>
        </Scrollbars>
    </div>
  )
}

export default SummaryPopup