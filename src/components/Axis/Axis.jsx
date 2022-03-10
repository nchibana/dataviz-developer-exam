import React from "react"
import PropTypes from "prop-types"
import * as d3 from 'd3'
import { dimensionsPropsType } from "../../utils/utils";
import { useDimensionsContext } from "../Chart/Chart";

const axisComponentsByDimension = {
  x: AxisHorizontal,
  y: AxisVertical,
}
const Axis = ({ dimension, ...props }) => {
  const dimensions = useDimensionsContext()
  const Component = axisComponentsByDimension[dimension]
  if (!Component) return null

  return (
    <Component
      dimensions={dimensions}
      {...props}
    />
  )
}

Axis.propTypes = {
  dimension: PropTypes.oneOf(["x", "y"]),
  dimensions: dimensionsPropsType,
  scale: PropTypes.func,
  label: PropTypes.string,
  formatTick: PropTypes.func,
}

Axis.defaultProps = {
  dimension: "x",
  scale: null,
  formatTick: d3.format(",")
}

export default Axis


function AxisHorizontal ({ dimensions, label, formatTick, scale, ticks, ...props }) {
  return (
    <g className="Axis AxisHorizontal" transform={`translate(0, ${dimensions.boundedHeight})`} {...props}>
      <line
        className="Axis__line"
        x2={dimensions.boundedWidth}
      />

      {ticks.map((tick, i) => (
        <g
        key={tick}
        transform={`translate(${scale(tick)}, 0)`}
        >
        <line
          y2={-dimensions.boundedHeight}
          stroke="#dadada"
        />
        <text
          key={tick}
          className="Axis__tick"
          transform={`translate(0, 25)`}
        >
          { formatTick(tick) }
        </text>
        </g>
      ))}

      {label && (
        <text
          className="Axis__label"
          transform={`translate(${dimensions.boundedWidth / 2}, 60)`}
        >
          <tspan style={{fontWeight: 'bold'}}>{label.substring(0,14)}</tspan>
          <tspan>{label.substring(14,27)}</tspan>
        </text>
      )}

      <line
        className="Tick__line"
        x1={0} y1={0} x2={200} y2={200}
      />

    </g>
  )
}


function AxisVertical ({ dimensions, label, formatTick, scale, ticks, ...props }) {

  return (
    <g className="Axis AxisVertical" {...props}>
      <line
        className="Axis__line"
        y2={dimensions.boundedHeight}
      />

      {ticks.map((tick, i) => (
        <g
        key={tick}
        transform={`translate(0, ${scale(tick)})`}
        >
        <line
          x2={dimensions.boundedWidth}
          stroke="#dadada"
        />
        <text
          key={tick}
          className="Axis__tick"
          transform={`translate(-16, 0)`}
        >
          { formatTick(tick) }
        </text>
        </g>
      ))}

      {label && (
        <text
          className="Axis__label AxisVertical__label"
          style={{
            transform: `translate(-85px, ${(dimensions.boundedHeight / 2) - 50}px)`
          }}
        ><tspan x="0" dy="20" style={{fontWeight: 'bold'}}>{label.substring(0,10)}</tspan>
          <tspan x="0" dy="20" style={{fontWeight: 'bold'}}>{label.substring(11,26)}</tspan>
          <tspan x="0" dy="20">{label.substring(26,44)}</tspan>
          <tspan x="0" dy="20">{label.substring(45,56)}</tspan>
          <tspan x="0" dy="20">{label.substring(57,65)}</tspan>
        </text>        
      )}
    </g>
  )
}

