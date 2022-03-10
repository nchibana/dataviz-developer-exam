import React, { useState } from "react"
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const Dropdown = ({ selected, setSelected, uniqueKeyAccessor }) => {
  const [values, setValues] = useState([
    "Population",
    "Density"
  ]);
  
   function handleChange(event) {
        setSelected(event.target.value)
  }

  return (
    <FormControl id="select-label" variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <Select
        value={selected}
        onChange={handleChange}
      >
        {values.map((value, index) => {
          return <MenuItem key={uniqueKeyAccessor()} value={value}>{value}</MenuItem>;
        })}
      </Select>
    </FormControl>
  )
}

export default Dropdown
