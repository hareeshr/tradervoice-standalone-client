import React, { useState } from 'react'
import './Widgetbar.css'
import Symbols from './Symbols'
import { TimeSeries } from '../../../types';
import Download from './Download';
import { Scrollbars } from 'react-custom-scrollbars-2';



type WidgetbarProps = {
    onTimeSeries: (timeSeries?: TimeSeries) => void;
  };

const Widgetbar = ({ onTimeSeries }: WidgetbarProps) => {
    const [showSymbols, setShowSymbols] = useState<boolean>(false);

    const toggleSymbolsVisibility = () => {
        setShowSymbols((prevShowSymbols) => !prevShowSymbols);
    };

    const isActive = (show:boolean) => {
        return show ? 'active-button' : '';
    }

  return (
    <div className='widgetSection'>
        
        {showSymbols && 
            <div className="symbolBox">
                <Scrollbars autoHeightMax={'calc(100vh - 90px)'}
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
                    <Symbols onTimeSeries={onTimeSeries} />
                </Scrollbars>
            </div>
        }
        
        <div className="widgetBar">
            <button className={`widgetButton symbolButton ${isActive(showSymbols)}`} onClick={toggleSymbolsVisibility}>
                <i className="icon tv-icon-symbol"/>
                <div>
                    Symbols
                </div>
            </button>
            <Download />
        </div>
    </div>
  )
}

export default Widgetbar