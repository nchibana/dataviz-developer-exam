import React, { useState, useEffect } from "react"
import { getScatterData } from "./utils/DataWrangle.js"
import ScatterPlot from "./components/Scatter/ScatterPlot"
import Dropdown from "./components/Dropdown/Dropdown"
import { useUniqueId } from "./utils/utils.js"
import "./App.css"

const gdpAccessor = d => d.gdp
const scoreAccessor = d => d.score

const App = () => {
  const [data, setData] = useState([])
  const [selected, setSelected] = useState("Population")

  useEffect((selected) => {
    (async () => {
      const fetchedData = await getScatterData(selected);
      setData(fetchedData);
    })();
  }, []);

  return (
    <div className="App">
      <h2>Countries with lower GDP per capita and fossil-fuel producers have higher transition exposures</h2>
      <h4>Archetype of physical risk through transition exposure vs GDP per capita by country, <span className="par-text">(logarithmic scale)</span></h4>
      <div className="App__dropdown">
        <Dropdown
          data={data}
          setSelected={setSelected}
          selected={selected}
          uniqueKeyAccessor={useUniqueId}
        />
      </div> 
      <div className="App__charts">
        <ScatterPlot
          data={data}
          selected={selected}
          xAccessor={gdpAccessor}
          yAccessor={scoreAccessor}
          xLabel="GDP per capita, $ thousand"
          yLabel="Transition exposure score, (0 = no exposure, 100 = fully exposed)"
        />
      </div>
    </div>
  )
}

export default App