/* eslint-disable no-unused-vars */
import axios from 'axios'
import './App.css'
import { useContext, useEffect, useState } from 'react'
import MovieCard from './components/card/card'
import BasicSelect from './components/select/select'
import { Link } from 'react-router-dom'
import { MovieContext } from './context/movieContext'
import { MovieCategoryContext } from './context/movieCategoryContext'

function App() {
  const config = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODU2MDEwMmM2OWNkOTQ2NWUwZTU3ZWQ5ZjYzYTU3OCIsInN1YiI6IjY2NDM0Y2ZlODg3NDhjMGFkNmNiNTkwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F24OrtuNZl8hoqm7GM6ol07GlCzPn9373rOdtIMxn2g',
    },
  }

  // const [movies, setMovies] = useState(null)
  const [error, setError] = useState(null)
   const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(null)
  const [filteredMovie, setFilteredMovie] = useState('')
  // const [movieCategory, setMovieCategory] = useState(null)

  const [moviesList, setMoviesList] = useContext(MovieContext)
  console.log(moviesList)
  const [moviesCategories, setMoviesCategories] = useContext(MovieCategoryContext)
  console.log(moviesCategories)
  // const fetchCategory = async () => {
  //   try {
  //     const response = await axios.get(
  //       'https://api.themoviedb.org/3/genre/movie/list?language=fr',
  //       config
  //     )
  //     setMovieCategory(response.data)
      
  //   } catch (err) {
      
  //     setError(err)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const fetchMovies = async (value) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`,
        config
      )
     
      setFilteredMovie(response.data.results)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  // const fetchListMovies = async () => {
  //   try {
  //     const response = await axios.get(
  //       'https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1',
  //       config
  //     )
  //     setMovies(response.data.results)
  //     console.log(movies)
  //   } catch (err) {
  //     console.log(err)
  //     setError(err)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const inputValue = (e) => {
    setSearch(e.target.value)
    console.log(search)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchMovies(search)
    // setFilteredMovie(movies.filter((movie) => movie.title.toLowerCase()?.includes(search)))
    console.log(filteredMovie)
  }

  // useEffect(() => {
  //   fetchListMovies()
  // }, [])

  // useEffect(() => {
  //   fetchCategory()
  // }, [])

  const handleFilteredMoviesChange = (newFilteredList) => {
    setFilteredMovie(newFilteredList)
  }

  if (error) return <p>{error}</p>
  // if (loading) return <p>Loading...</p>

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchMovie">Recherchez un film:</label>
        <input type="text" id="searchMovie" onChange={inputValue} />
        <input type="submit" />
      </form>
      <form>
        <label htmlFor="searchCategory">Recherchez une catégorie: </label>
        <BasicSelect
          list={moviesCategories}
          onFilteredMoviesChange={handleFilteredMoviesChange}
        />
      </form>
      <h1>Liste de films :</h1>
      {(filteredMovie != (null || '') ? filteredMovie : moviesList).map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <MovieCard {...movie} />
        </Link>
      ))}
    </>
  )
}

export default App
