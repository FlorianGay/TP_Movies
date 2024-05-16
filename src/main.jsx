import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import MyRouter from './myRouter'
import { MovieProvider } from './context/movieContext'
import { MovieCategoryProvider } from './context/movieCategoryContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MovieCategoryProvider>
        <MovieProvider>
          <MyRouter />
        </MovieProvider>
      </MovieCategoryProvider>
    </BrowserRouter>
  </React.StrictMode>
)
