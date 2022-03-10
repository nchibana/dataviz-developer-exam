import React, { useMemo } from "react";
import PropTypes from "prop-types"
import * as d3 from "d3"
import Chart from "../Chart/Chart"
import Circles from "../Circles/Circles"
import Axis from "../Axis/Axis"
import { useChartDimensions, accessorPropsType, useUniqueId } from "../../utils/utils.js"

const ScatterPlot = ({ data, xAccessor, yAccessor, xLabel, yLabel, selected }) => {
  const [ref, dimensions] = useChartDimensions({
    marginBottom: 100,
    marginLeft: 150,
    marginRight: 200,
    marginTop: 50
  })

  const sortData = (selected) => {
    if (selected == 'Population'){
      return data.sort( function ( a, b ) { return b.population - a.population } )
    }
    else {
      return data.sort( function ( a, b ) { return b.density - a.density } )
    }
  }

  useMemo(() => (
    sortData(selected)
  ), [selected])

  const countryAccessor = d => d.country
  const groupAccessor = d => d.group
  const populationAccessor = d => d.population
  const densityAccessor = d => d.density
  let rAccessor = selected == "Population" ? populationAccessor : densityAccessor
  const xAccessorScaled = d => xScale(xAccessor(d))
  const yAccessorScaled = d => yScale(yAccessor(d))
  const keyAccessor = (d, i) => i

  const xTicks = [1,3,30,90]
  const yTicks = [15,20,40,60]
  
  const xScale = d3.scaleLog()
    .domain([1,90])
    .range([0, dimensions.boundedWidth])

  const yScale = d3.scaleLog()
    .domain([15,60])
    .range([dimensions.boundedHeight, 0])

  const radius = d3.scaleSqrt()
    .domain(d3.extent(data, rAccessor))
    .range([1, 75])

  const colorScale = {
    1: '#051C2C', 
    2: '#034B6F', 
    3: '#1F40E5', 
    4: '#027AB0', 
    5: '#00A8F3', 
    6: '#7FD4F7'
  }

  return (
    <div className="ScatterPlot" ref={ref}>
      <Chart dimensions={dimensions}>
        <Axis
          dimensions={dimensions}
          dimension="x"
          scale={xScale}
          label={xLabel}
          ticks={xTicks}
        />
        <Axis
          dimensions={dimensions}
          dimension="y"
          scale={yScale}
          label={yLabel}
          ticks={yTicks}
        />
        <Circles
            data={data}
            radius={radius}
            color={colorScale}
            selected={selected}
            keyAccessor={keyAccessor}
            uniqueKeyAccessor={useUniqueId}
            countryAccessor={countryAccessor}
            scoreAccessor={yAccessor}   
            gdpAccessor={xAccessor}          
            rAccessor={rAccessor}
            cAccessor={groupAccessor}
            xAccessor={xAccessorScaled}
            yAccessor={yAccessorScaled}
          />
      </Chart>
    </div>
  )
}

ScatterPlot.propTypes = {
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
}

ScatterPlot.defaultProps = {
  xAccessor: d => d.x,
  yAccessor: d => d.y,
}
export default ScatterPlot
