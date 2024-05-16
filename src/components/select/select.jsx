/* eslint-disable react/prop-types */
import { useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import './select.scss'

export default function BasicSelect(props) {
  const config = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODU2MDEwMmM2OWNkOTQ2NWUwZTU3ZWQ5ZjYzYTU3OCIsInN1YiI6IjY2NDM0Y2ZlODg3NDhjMGFkNmNiNTkwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F24OrtuNZl8hoqm7GM6ol07GlCzPn9373rOdtIMxn2g',
    },
  }
  const [category, setCategory] = useState('')
  const [filterList, setFIlterList] = useState(null)
  console.log(props.list)

  const fetchByCategories = async (category) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${category}`,
        config
      )
      props.onFilteredMoviesChange(response.data.results);
      console.log(response)
      setFIlterList(response.data)
      console.log(filterList)
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = (event) => {
    setCategory(event.target.value)
    fetchByCategories(category)
    console.log(filterList)
  }

  return (
    <>
      {props.list ? (
        <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Catégorie</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          {props.list.genres.map((elmt) => (
            <MenuItem value={elmt.id} key={elmt.id}>
              {elmt.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
      ) : <p>Loading...</p>}
    </>
    
  )
}
