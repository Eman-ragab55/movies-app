"use client"

import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"

export default function Favorites(){

const [movies,setMovies] = useState([])

useEffect(()=>{

const fav = JSON.parse(localStorage.getItem("favorites")) || []

setMovies(fav)

},[])

const removeMovie = (id) => {

let fav = JSON.parse(localStorage.getItem("favorites")) || []

fav = fav.filter(movie => movie.id !== id)

localStorage.setItem("favorites", JSON.stringify(fav))

setMovies(fav)

}

return(

<div className="min-h-screen bg-black text-white pt-24 px-10">

<h1 className="text-4xl mb-10">Favorite Movies</h1>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{movies.map((movie)=>{

const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

return(

<div key={movie.id} className="relative">

<img
src={image}
className="rounded-lg"
/>

<h3 className="mt-2">{movie.title}</h3>

<button
onClick={() => removeMovie(movie.id)}
className="bg-red-600 p-2 rounded mt-2"
>
<Trash2 size={16}/>
</button>

</div>

)

})}

</div>

</div>

)

}