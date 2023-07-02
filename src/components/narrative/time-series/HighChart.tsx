import React, { useRef, useContext, useState, useEffect } from "react";
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
import { SeriesContext } from './../../../context/SeriesContext';
import SearchEntries from "./SearchEntries";

// init the module
// Indicators(Highcharts);
DragPanes(Highcharts);
AnnotationsAdvanced(Highcharts);
// PriceIndicator(Highcharts);
FullScreen(Highcharts);
StockTools(Highcharts);

const options = {
    title: {
      text: 'Prevalence',
      style:{
        color: '#ffffff'
      }
    },
    // subtitle: {
    //     text: 'Using the Boost module',
    //     style:{
    //       color: '#ffffff'
    //     }
    // },
    stockTools: {
        gui: {
            enabled: false
            // ref: https://api.highcharts.com/highstock/stockTools.gui.buttons
      }
    },
    navigation: {
        annotationsOptions: {
          shapeOptions: {
            stroke: 'white'
          }
        },
        events: {
          mousedown: function(event:any) {
            // Custom logic when mousedown event is triggered
            console.log('Mouse button pressed at x: ' + event.xAxis[0].value + ', y: ' + event.yAxis[0].value);
          },
          selectButton: function(event:any) {
              // Select button
              event.button.classList.add('active');
              // Register this is current button to indicate we're adding
              // an annotation.
              (this as any).chart.activeButton = event.button;
          },
          deselectButton: function(event:any) {
              // Unselect the button
              event.button.classList.remove('active');
              // Remove info about active button:
              (this as any).chart.activeButton = null;
          }
        }
      },
    chart: {
        backgroundColor: '#23252b',
        // height: '100%',
        style: {
            cursor: 'default',
            // cursor: 'crosshair',
            // cursor: 'grabbing',
            // https://api.highcharts.com/class-reference/Highcharts.html#.CursorValue

            color: '#ffffff'
        },
        // panning: {
        //     enabled: true,
        //     type: 'x'
        // },
    },
  yAxis: [
    
    {
      crosshair: {
        snap: false
      },
      // tickInterval: 10,
      // min : 0,
      // max: 100,
      labels: {
        style: {
            color: '#ffffff'
        }
      },
      opposite: true,
      title: {
        enabled: false,
          // text: 'Custom Y-Axis Title',
          // style: {
          //     color: '#ffffff'
          // }
      }
    },
    {
      crosshair: {
        snap: false
      },
      // startOnTick: true,
      // endOnTick: true,
      // tickInterval: 10,
      // min : 34000,
      // max: null,
      labels: {
        style: {
            color: '#ffffff'
        }
      },
      title: {
        enabled: false,
          // text: 'Custom Y-Axis Title',
          // style: {
          //     color: '#ffffff'
          // }
      }
    },
  
  ],
  xAxis: {
      type: 'datetime',
      crosshair: {
        snap: false
    },
    labels: {
      style: {
          color: '#ffffff'
      }
    }
  },
  
  legend: {
      itemStyle: {
          color: '#ffffff' // Set the font color of legend labels to blue
      }
  },
    plotOptions: {
        series: {
          states: {
            inactive: {
              opacity: 1
            }
          },
          draggable: true
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
            pointerEvents: 'auto',
            color: 'white'
        },
        backgroundColor: '#4D515D'
    },
    series: [
    ]
};

const HighChart = () =>{
    const { combinedTimeSeries, isSentimentSelected, selectedCross  } = useContext(SeriesContext);

    const chartRef = useRef<HighchartsReact.Props | null>(null);
    const [chartOptions, setChartOptions] = useState<any>(options);

    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleMouseDown = () => {
      setIsMouseDown(true);
    };
  
    const handleMouseUp = () => {
      setIsMouseDown(false);
    };
    
    const getPriceData = () => {
      if(combinedTimeSeries?.price.points.length === 0) return null;

      let minY = 10000000;
      let data:any = [];
      combinedTimeSeries?.price.points.forEach((point:any) => {
        data.push([
          new Date(point.tstamp).getTime(),
          point.price
        ]);
        if(minY > point.price)minY = point.price;
      });

      
      return {
        pointData: {
          type: 'area',
          name: 'Price Points',
          // turboThreshold: 3000,
          color: combinedTimeSeries?.price.color,
          data: data,
          lineWidth: 0.5,
          enableMouseTracking: false,
          yAxis: 1,
          marker: {
              enabled: false,
              states: {
                  hover: {
                      enabled: false
                  }
              }
          }
        }, 
        minY: minY
      }
    }

    const getWeightData = () => {
      if(combinedTimeSeries?.weights.length === 0) return [];

      let data:any = [];

      combinedTimeSeries?.weights.forEach(series =>{
        let lineData:any = [],
            scatterData:any = [];
        series.points.forEach((point:any) => {
          const date = new Date(point.tstamp).getTime();
          const price = isSentimentSelected ? point.sentiment : point.prevalence;
          lineData.push([
            date,
            price
          ]);
          if(point.significant !== undefined){
            scatterData.push({
              x: date,
              y: price,
              significant:point.significant
            })
          }
        })

        data.push({
            type: 'line',
            name: series.text,
            color: series.color,
            data: lineData,
            lineWidth: 1,
            enableMouseTracking: false,
            yAxis: 0,
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: false
                    }
                }
            },
        });
        if(scatterData.length > 0){
          data.push({
              type: 'scatter',
              name: series.text+' significance',
              color: series.color,
              stickyTracking: false,
              // enableMouseTracking: false,
              yAxis: 0,
              data: scatterData,
              tooltip:{
                  pointFormat: `<a href="{point.significant.url}">
                                  <span>{point.significant.title}</span>
                                  <span>{point.significant.url}
                                </a>
                                <span class="tooltip-dividers"></span>
                                Published: {point.significant.published}<br/>
                                Via: <a href="http://{point.significant.originates_url}">{point.significant.originates_title}</a> ({point.significant.originates_url})
                                `,
                  enabled: true
              },
              marker: {
                symbol: 'circle',
                radius: 5
              },
          });
        }
      })

      return data;
    }

    useEffect(() => {

      let chartData:any = [];
      let minY = 0;
      // const [priceData, minY] = getPriceData();
      const tempData = getPriceData();
      if(tempData) {
        const priceData = tempData.pointData;
        minY = tempData.minY;
        chartData.push(priceData)
      }

      const weightData = getWeightData();
      if(weightData.length > 0) {
        chartData.push(...weightData);
      }
      // let weightsChart:any = [];
      // const pricePoints = getPricePoints();
      console.log(chartData)

      // chartRef.current?.update(chartData);
      console.log(minY);
      setChartOptions((prevOptions:any) => {
        const updatedYAxis = [...prevOptions.yAxis];
        updatedYAxis[1] = {
          ...updatedYAxis[1],
          min: minY // New min value for the second yAxis item
        };
        const title:any = {...prevOptions.title};
        title.text = isSentimentSelected ? 'Sentiment' : 'Prevalence';

        return {
          ...prevOptions,
          series: chartData,
          yAxis: updatedYAxis,
          title: title,
        };
      });

    }, [combinedTimeSeries, isSentimentSelected]);


    // Update chart options when selectedCross changes
    React.useEffect(() => {
      
      const chart = chartRef.current?.chart;
      if (chart) {
        chart.update({
          chart: {
            style: {
              cursor: selectedCross ? "crosshair" : "default"
            },
            panning: {
              enabled: selectedCross ? true : false,
              type: selectedCross ? "x" : null,
            }
          }
        });
      }
    }, [selectedCross]);

    // console.log(combinedTimeSeries);
    
    
  return (
    <div className="tv-wrapper">
      <div className={`tv-chart ${isMouseDown && selectedCross ? 'class-on-mousedown' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}>
        <HighchartsReact
          immutable={true}
          highcharts={Highcharts}
          // constructorType={"stockChart"}
          options={chartOptions}
          ref={chartRef}
          className={isMouseDown ? 'class-on-mousedown' : 'default-class'}
          />
      
      </div>

      <SearchEntries />

      
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
    </div>
  )
}

export default HighChart