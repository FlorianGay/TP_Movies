/* eslint-disable react/prop-types */
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const MovieCategoryContext = createContext()

export const MovieCategoryProvider = (props) => {
  const [moviesCategories, setMoviesCategories] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const config = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODU2MDEwMmM2OWNkOTQ2NWUwZTU3ZWQ5ZjYzYTU3OCIsInN1YiI6IjY2NDM0Y2ZlODg3NDhjMGFkNmNiNTkwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F24OrtuNZl8hoqm7GM6ol07GlCzPn9373rOdtIMxn2g',
    },
  }

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/genre/movie/list?language=fr',
        config
      )
      setMoviesCategories(response.data)
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  if (error) return <p>{error}</p>
  if (loading) return <p>Loading...</p>

  return (
    <MovieCategoryContext.Provider
      value={[moviesCategories, setMoviesCategories]}
    >
      {props.children}
    </MovieCategoryContext.Provider>
  )
}
