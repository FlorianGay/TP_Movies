import { Route, Routes } from "react-router-dom"
import App from "./App"
import Movie from "./components/movie/movie"


function MyRouter() {
    return (
        <>
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="/movie/:id" element={<Movie />}/>
        </Routes>
        </>
    )
}

export default MyRouter