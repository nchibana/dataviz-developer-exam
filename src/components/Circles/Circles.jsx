import React from "react"
import PropTypes from "prop-types"
import Tooltip from '@mui/material/Tooltip'
import { accessorPropsType } from "../../utils/utils"

const Circles = React.forwardRef(({ data, uniqueKeyAccessor, selected, keyAccessor, xAccessor, yAccessor, rAccessor, cAccessor, countryAccessor, scoreAccessor, gdpAccessor, radius, color, ...rest}, ref) => ( 
    <React.Fragment>
      {data.map((d, i) => (
        <Tooltip 
          key={uniqueKeyAccessor()} 
          title={
            <div>
              <div key={uniqueKeyAccessor()}><strong>Country:</strong> {countryAccessor(d, i)}</div>
              <div key={uniqueKeyAccessor()}><strong>Transition score:</strong> {scoreAccessor(d, i)}</div>
              <div key={uniqueKeyAccessor()}><strong>GDP per capita ($ thousand):</strong> {gdpAccessor(d, i)}</div>
              <div key={uniqueKeyAccessor()}>{ selected == "Population" && <span><strong>Population (millions):</strong> {rAccessor(d, i)}</span> }</div>
              <div key={uniqueKeyAccessor()}>{ selected == "Density" && <span><strong>2020 Density (people per sq. km.):</strong> {rAccessor(d, i)}</span> }</div>
            </div>
          } arrow followCursor>
          <circle
            {...rest}
            className="Circles__circle"
            key={keyAccessor(d, i)}
            cx={xAccessor(d, i)}
            cy={yAccessor(d, i)}
            r={radius(rAccessor(d, i))}
            fill={color[cAccessor(d, i)]}
            ref={ref}
          />
        </Tooltip> 
      ))}
    </React.Fragment>
))

Circles.propTypes = {
  data: PropTypes.array,
  keyAccessor: accessorPropsType,
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  radius: accessorPropsType,
}

export default Circles
