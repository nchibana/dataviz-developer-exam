import * as d3 from "d3"
import data from "./dataviz-developer-exam-data.csv";

export async function getScatterData () {
  const dataset = await d3.csv(data)
  const cleanData = dataset.map( d => ({
    'country': d['Country'],
    'density' : +d['2020 density (people per sq. km.)'],
    'gdp' : (+d['GDP per capita (USD)'])/1000,
    'score' : parseFloat(d['Transition exposure score (0 = no exposure, 100 = fully exposed)']),
    'population' : +d['Population (millions)'],
    'group' : +d['Group = Archetype of physical risk'].charAt(0)
 }))
  cleanData.sort( function ( a, b ) { return b.population - a.population; } )
  return cleanData
}