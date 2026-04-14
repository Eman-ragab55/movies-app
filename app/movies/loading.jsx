"use client"

import { useState, useEffect } from "react"
import MovieCard from "../../components/movies/MovieCard"

export default function MoviesPage() {

const [movies,setMovies] = useState([])
const [loading,setLoading] = useState(true)

useEffect(()=>{

fetch("https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY")
.then(res => res.json())
.then(data => {

setMovies(data.results)
setLoading(false)

})

},[])

if(loading){
return(

<div className="min-h-screen bg-black flex items-center justify-center">

<div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>

</div>

)
}

return(

<div className="bg-black min-h-screen pt-24 px-10">

<h1 className="text-white text-4xl mb-10">Movies</h1>

<div className="grid grid-cols-2 md:grid-cols-5 gap-6">

{movies.map(movie => (
<MovieCard key={movie.id} movie={movie}/>
))}

</div>

</div>

)

}