/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const MovieContext = createContext()

export const MovieProvider = (props) => {
  const config = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODU2MDEwMmM2OWNkOTQ2NWUwZTU3ZWQ5ZjYzYTU3OCIsInN1YiI6IjY2NDM0Y2ZlODg3NDhjMGFkNmNiNTkwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F24OrtuNZl8hoqm7GM6ol07GlCzPn9373rOdtIMxn2g',
    },
  }
  const [moviesList, setMoviesList] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchListMovies = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1',
        config
      )
      console.log(response.data)
      setMoviesList(response.data.results)
    } catch (err) {
      console.err(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchListMovies()
  }, [])

  if (error) return <p>{error}</p>
  if (loading) return <p>Loading...</p>
  return (
    <MovieContext.Provider value={[moviesList, setMoviesList]}>
      {props.children}
    </MovieContext.Provider>
  )
}
