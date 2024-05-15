import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

function Movie() {
  const config = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODU2MDEwMmM2OWNkOTQ2NWUwZTU3ZWQ5ZjYzYTU3OCIsInN1YiI6IjY2NDM0Y2ZlODg3NDhjMGFkNmNiNTkwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F24OrtuNZl8hoqm7GM6ol07GlCzPn9373rOdtIMxn2g',
    },
  }
   
  const [movie, setMovie] = useState(null)

  let { id } = useParams()
  console.log(id)

  const fetchMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        config
      )
      console.log(response.data)
      setMovie(response.data) 
      console.log(movie)
    } catch (err) {
      console.err(err)
    }
  } 

  useEffect(() => {
    fetchMovie()
  }, [])

  return (
    <>
    <Link to={'/'}> Retour</Link>
    {movie && (
        <Card sx={{ maxWidth: 345, marginBottom: 15, display: 'flex' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.overview}
            </Typography>
            <Typography>{`${movie.budget} $`}</Typography>
            <Typography>{`Note moyenne : ${movie.vote_average}`}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )}
      
    </>
  )
}

export default Movie
