import React from 'react'
import './Toolbar.css'

const Toolbar = () => {
  return (
    <div className="toolbar highcharts-stocktools-wrapper highcharts-bindings-container highcharts-bindings-wrapper">
      <div className="highcharts-menu-wrapper">
        <ul className="highcharts-stocktools-toolbar stocktools-toolbar">
          <li className="highcharts-label-annotation" title="Simple shapes">
            <i className="icon tv-icon-shape"/>
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
            <i className="icon tv-icon-line"/>
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
            <i className="icon tv-icon-crooked-lines"/>
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
            <i className="icon tv-icon-flag"/>
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

          <li className="highcharts-toggle-annotations right" title="Toggle annotations">
            <i className="icon tv-icon-hide"/>
            <span className="highcharts-menu-item-btn"></span>
            <span className="highcharts-menu-item-title">Hide</span>
          </li>

          <li className="toolbar-divider"></li>

          <li className="highcharts-zoom-x right" title="Zoom change">
            <i className="icon tv-icon-zoom"/>
            <span className="highcharts-menu-item-btn"></span>
            <span className="highcharts-menu-item-title">Zoom</span>
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
          <li className="highcharts-full-screen right" title="Fullscreen">
            <i className="icon tv-icon-fullscreen"/>
            <span className="highcharts-menu-item-btn"></span>
            <span className="highcharts-menu-item-title">Full Screen</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Toolbar