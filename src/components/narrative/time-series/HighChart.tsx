import React, { useRef } from "react";
import { render } from "react-dom";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import Indicators from "highcharts/indicators/indicators-all.js";
import DragPanes from "highcharts/modules/drag-panes.js";
import AnnotationsAdvanced from "highcharts/modules/annotations-advanced.js";
import PriceIndicator from "highcharts/modules/price-indicator.js";
import FullScreen from "highcharts/modules/full-screen.js";
import StockTools from "highcharts/modules/stock-tools.js";
import "./chartStyle.css";
import { WeightTimeSeries, WeightPoint, PricePoint } from './../../../types'

// init the module
// Indicators(Highcharts);
DragPanes(Highcharts);
AnnotationsAdvanced(Highcharts);
// PriceIndicator(Highcharts);
FullScreen(Highcharts);
StockTools(Highcharts);

function getData(n:number) {
    var arr = [],
        i,
        x,
        a:number = 0,
        b:number = 0,
        c:number = 0,
        spike;
    for (
        i = 0, x = Date.UTC(new Date().getUTCFullYear(), 0, 1) - n * 36e5;
        i < n;
        i = i + 1, x = x + 36e5
    ) {
        if (i % 100 === 0) {
            a = 2 * Math.random();
        }
        if (i % 1000 === 0) {
            b = 2 * Math.random();
        }
        if (i % 10000 === 0) {
            c = 2 * Math.random();
        }
        if (i % 50000 === 0) {
            spike = 10;
        } else {
            spike = 0;
        }
        arr.push([
            x,
            2 * Math.sin(i / 100) + a + b + c + spike + Math.random()
        ]);
    }
    return arr;
}


function getDataSignificant(n:number) {
    var arr = [],
        i,
        x,
        a:number = 0,
        b:number = 0,
        c:number = 0,
        spike;
    for (
        i = 0, x = Date.UTC(new Date().getUTCFullYear(), 0, 1) - n * 36e5;
        i < n;
        i = i + 1, x = x + 36e5
    ) {
        if (i % 100 === 0) {
            a = 2 * Math.random();
        }
        if (i % 1000 === 0) {
            b = 2 * Math.random();
        }
        if (i % 10000 === 0) {
            c = 2 * Math.random();
        }
        if (i % 50000 === 0) {
            spike = 10;
        } else {
            spike = 0;
        }
        arr.push({
            x: x,
            y: 2 * Math.sin(i / 100) + a + b + c + spike + Math.random(),
            title: 'Example',
            url: 'http://example.com'
        });
    }
    return arr;
}


var n = 500,
    data = getData(n),
    data2 = getData(n),
    data3 = getDataSignificant(10);

const options = {
    title: {
      text: 'Prevalence'
    },
    subtitle: {
        text: 'Using the Boost module'
    },
    stockTools: {
        gui: {
            enabled: false
            //   buttons: [ 'lines','separator', 'flags' ]
            // ref: https://api.highcharts.com/highstock/stockTools.gui.buttons
      }
    },
    navigation: {
        annotationsOptions: {
          shapeOptions: {
            // stroke: 'white'
          }
        }
      },
    chart: {
        // backgroundColor: '#121212',
        style: {
            cursor: 'crosshair',
            // https://api.highcharts.com/class-reference/Highcharts.html#.CursorValue

            // color: '#ffffff'
        },
        panning: {
            enabled: true,
            type: 'x'
        }
    },
  yAxis: {
      crosshair: {
        snap: false
    },
      min : 0
    },
  xAxis: {
      type: 'datetime',
      crosshair: {
        snap: false
    }
  },
    plotOptions: {
        series: {
          states: {
            inactive: {
              opacity: 1
            }
          }
        }
      },
    credits: {
        enabled: false
    },
    tooltip: {
        crosshairs: false,
        useHTML: true,
        hideDelay: 1500,
        style: {
            pointerEvents: 'auto'
        },
    },
    series: [
        {
            type: 'scatter',
            stickyTracking: false,
            // enableMouseTracking: false,
            data: data3,
            tooltip:{
                pointFormat: '<a href="{point.url}">{point.title}</a>',
                enabled: true
            }
        },
        {
            type: 'line',
            data: data,
            lineWidth: 0.5,
            enableMouseTracking: false,
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: false
                    }
                }
            },
        }, 
        {
            type: 'area',
            data: data2,
            lineWidth: 0.5,
            enableMouseTracking: false,
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: false
                    }
                }
            }
        }
    ]
};


type HighChartProps = {
    timeSeries : WeightTimeSeries
  }
const HighChart = ({ timeSeries, ...props }:HighChartProps) =>{
    const chartRef = useRef<HighchartsReact.Props | null>(null);
    const enableDrawingMode = () => {
        const chart = chartRef.current?.chart;
        if (chart) {
          chart.xAxis[0].addPlotLine({
            id: 'infinityLine',
            value: 5, // The value at which the line should be drawn
            color: 'red',
            width: 2,
            dashStyle: 'dash',
            zIndex: 5,
            label: {
              text: 'Infinity Line',
              align: 'center',
              style: {
                color: 'gray'
              }
            },
            arrowEnd: 'arrow', // Adding the arrow to the line
            arrowStart: 'none' // No arrow at the starting point
          });
        }
      };
    console.log(data)
  return (
    <div className="tv-wrapper">
        <HighchartsReact
        highcharts={Highcharts}
        // constructorType={"stockChart"}
        options={options}
        ref={chartRef}
        />

    <button onClick={enableDrawingMode}>Enable Drawing Mode</button>

    
  <div className="highcharts-popup highcharts-popup-annotations">
    <span className="highcharts-close-popup">&times;</span>
    <div className="highcharts-popup-wrapper">
      <label htmlFor="stroke">Color</label>
      <input type="text" name="stroke" />
      <label htmlFor="stroke-width">Width</label>
      <input type="text" name="stroke-width" />
    </div>
    <button>Save</button>
  </div>
  <div className="tv-toolbar highcharts-stocktools-wrapper highcharts-bindings-container highcharts-bindings-wrapper">
    <div className="highcharts-menu-wrapper">
      <ul className="highcharts-stocktools-toolbar stocktools-toolbar">
        <li className="highcharts-label-annotation" title="Simple shapes">
        	<span className="highcharts-menu-item-btn"></span>
          <span className="highcharts-menu-item-title">Shapes</span>
        	<span className="highcharts-submenu-item-arrow highcharts-arrow-right"></span>
          <ul className="highcharts-submenu-wrapper">
            <li className="highcharts-label-annotation" title="Label">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Label</span>
            </li>
            <li className="highcharts-circle-annotation" title="Circle">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Circle</span>
            </li>
            <li className="highcharts-rectangle-annotation " title="Rectangle">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Rectangle</span>
            </li>
            <li className="highcharts-ellipse-annotation" title="Ellipse">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Ellipse</span>
            </li>
          </ul>
        </li>
        <li className="highcharts-segment" title="Lines">
        	<span className="highcharts-menu-item-btn"></span>
          <span className="highcharts-menu-item-title">Lines</span>
        	<span className="highcharts-submenu-item-arrow highcharts-arrow-right"></span>
          <ul className="highcharts-submenu-wrapper">
            <li className="highcharts-segment" title="Segment">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Segment</span>
            </li>
            <li className="highcharts-arrow-segment" title="Arrow segment">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Arrow segment</span>
            </li>
            <li className="highcharts-ray" title="Ray">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Ray</span>
            </li>
            <li className="highcharts-arrow-ray" title="Arrow ray">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Arrow ray</span>
            </li>
            <li className="highcharts-infinity-line" title="Line">
            	<span className="highcharts-menu-item-btn" ></span>
              <span className="highcharts-menu-item-title">Line</span>
            </li>
            <li className="highcharts-arrow-infinity-line" title="Arrow line">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Arrow</span>
            </li>
            <li className="highcharts-horizontal-line" title="Horizontal line">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Horizontal</span>
            </li>
            <li className="highcharts-vertical-line" title="Vertical line">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Vertical</span>
            </li>
          </ul>
        </li>
        <li className="highcharts-elliott3" title="Crooked lines">
        	<span className="highcharts-menu-item-btn"></span>
          <span className="highcharts-menu-item-title">Crooked lines</span>
        	<span className="highcharts-submenu-item-arrow highcharts-arrow-right"></span>
          <ul className="highcharts-submenu-wrapper">
            <li className="highcharts-elliott3" title="Elliott 3 line">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Elliot 3</span>
            </li>
            <li className="highcharts-elliott5" title="Elliott 5 line">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Elliot 5</span>
            </li>
            <li className="highcharts-crooked3" title="Crooked 3 line">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Crooked 3</span>
            </li>
            <li className="highcharts-crooked5" title="Crooked 5 line">
            	<span className="highcharts-menu-item-btn" ></span>
              <span className="highcharts-menu-item-title">Crooked 5</span>
            </li>
          </ul>
        </li>
        
        <li className="highcharts-flag-circlepin" title="Flags">
          <span className="highcharts-menu-item-btn"></span>
          <span className="highcharts-menu-item-title">Flags</span>
          <span className="highcharts-submenu-item-arrow highcharts-arrow-right"></span>
          <ul className="highcharts-submenu-wrapper">
            <li className="highcharts-flag-circlepin" title="Flag circle">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Circle</span>
            </li>
            <li className="highcharts-flag-diamondpin" title="Flag diamond">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Diamond</span>
            </li>
            <li className="highcharts-flag-squarepin" title="Flag square">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Square</span>
            </li>
            <li className="highcharts-flag-simplepin" title="Flag simple">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Simple</span>
            </li>
          </ul>
        </li>
        <li className="highcharts-full-screen right" title="Fullscreen">
          <span className="highcharts-menu-item-btn"></span>
        </li>
        <li className="highcharts-zoom-x right" title="Zoom change">
        	<span className="highcharts-menu-item-btn"></span>
        	<span className="highcharts-submenu-item-arrow highcharts-arrow-right"></span>
          <ul className="highcharts-submenu-wrapper">
            <li className="highcharts-zoom-x" title="Zoom X">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Zoom X</span>
            </li>
            <li className="highcharts-zoom-y" title="Zoom Y">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Zoom Y</span>
            </li>
            <li className="highcharts-zoom-xy" title="Zooom XY">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Zoom XY</span>
            </li>
          </ul>
        </li>
        <li className="highcharts-toggle-annotations right" title="Toggle annotations">
          <span className="highcharts-menu-item-btn"></span>
        </li>
      </ul>
    </div>
  </div>

  </div>
  )
}

export default HighChart