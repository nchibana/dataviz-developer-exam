# McKinsey Data Visualization Developer Exam

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description of Components

Following the advice of Amelia Wattenberger on how to use React and D3 together in a way that capitalizes on the strengths of both frameworks--as they are both competing for control over the DOM--I decided to use D3 for creating scales and math calculations and used React for the rendering. Many of the ideas for how to structure this project and implement React and D3 together come from her articles and blogs.

I decided to create sibling components `ScatterPlot` and `Dropdown` under the parent `App`. This way, I was able to handle the selected value from the dropdown and pass data to these sibling components. For example, when `Dropdown` sets the value of the view selected, whether that is "Population" or "Density", then it will update the parent state and re-render `ScatterPlot`. 

In the latter, I create scales for mapping GDP data to a logarithmic scale and also mapping density and population data to the area of a circle using a square root scale.

I also created a `Chart` component as a parent to child components `Axis` and `Circles`, which draw the axes and circles on the scatterplot, respectively. `Chart` is a simple component that just needs one prop, which is dimensions, and since all charts will need a canvas, this can be seen as a resuable component for any type of chart.

In order to implement the tooltips and dropdown menu, I used the React component Material UI library. In order to get the tooltips working, I had to pass down the selected value to the `Circles` component and then conditionally render certain HTML, depending on whether "Population" or "Density" was chosen from the options.

## How Application Works

You can run `npm install` and `npm start` in the project's directory on your local computer to run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

In the interest of time, I have also deployed this to a private site, which you can visit [here](https://mckinsey-developer-exam.netlify.app/). The password will be provided in an email.

## Data Visualization Choices

Given that many of the design choices made in the creation of this visualization were appropriate in my opinion, such as the use of a logarithmic scale to better view trends in the data and the omission of some tick lines to declutter the chart and reduce ink-to-data ratio, I didn't make many modifications to the original chart. 

One thing that could have saved time was to use a custom color scale for the visualization of the physical risk category, but I decided to use the discreet color codes provided in the instructions. 

Also, a very important decision was to use the square root scale for translating population and density data to the area of the circles, given that the area of a circle is equal to pi times the radius squared. I was also careful to use a hierarchy of font sizes for titles and subheading, as well as varying font weights to call attention to salient points in this chart.

One challenge was to get the smaller circles to appear in front of the larger ones. In order to do this, I utilized `useMemo` to re-sort the data, from highest values of population or density to the lowest ones, every time the dependency array with the selected value changed.

