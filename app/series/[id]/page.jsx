"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

export default function SeriesDetails(){

const params = useParams()
const id = params.id

const [series,setSeries] = useState(null)
const [cast,setCast] = useState([])
const [seasons,setSeasons] = useState([])

const API = process.env.NEXT_PUBLIC_TMDB_KEY

useEffect(()=>{

async function getDetails(){

const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API}&append_to_response=videos,credits`)
const data = await res.json()

setSeries(data)
setCast(data.credits.cast.slice(0,12))
setSeasons(data.seasons)

}

getDetails()

},[id])

if(!series){

return(

<div className="min-h-screen bg-black flex items-center justify-center">

<div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>

</div>

)

}

const poster = `https://image.tmdb.org/t/p/w500${series.poster_path}`
const backdrop = `https://image.tmdb.org/t/p/original${series.backdrop_path}`

return(

<div className="bg-black text-white min-h-screen pt-32">

{/* Hero */}

<div
className="h-[70vh] bg-cover bg-center flex items-center"
style={{ backgroundImage:`url(${backdrop})` }}
>

<div className="bg-black/70 w-full h-full flex items-center">

<div className="max-w-6xl mx-auto px-10 grid md:grid-cols-2 gap-10">

<img
src={poster}
className="rounded-lg w-72"
/>

<div>

<div className="flex items-center gap-4 mb-4">

<h1 className="text-4xl font-bold">
{series.name}
</h1>

</div>
<p className="text-gray-300 mb-4">

⭐ {series.vote_average}

</p>

<p className="mb-6">

{series.overview}

</p>

<p>

Seasons: {series.number_of_seasons}

</p>

<p>

Episodes: {series.number_of_episodes}

</p>

</div>

</div>

</div>

</div>

{/* Seasons */}

<div className="max-w-6xl mx-auto px-10 mt-16">

<h2 className="text-3xl mb-6">

Seasons

</h2>

<div className="grid grid-cols-2 md:grid-cols-5 gap-6">

{seasons?.map((season)=>{

const img = `https://image.tmdb.org/t/p/w300${season.poster_path}`

return(

<div
key={season.id}
className="bg-gray-900 p-3 rounded"
>

<img
src={img}
className="rounded"
/>

<p className="mt-2 text-sm">

{season.name}

</p>

<p className="text-gray-400 text-xs">

Episodes: {season.episode_count}

</p>

</div>

)

})}

</div>

</div>

{/* Cast */}

<div className="max-w-6xl mx-auto px-10 mt-16 pb-20">

<h2 className="text-3xl mb-6">

Cast

</h2>

<div className="grid grid-cols-3 md:grid-cols-6 gap-6">

{cast.map((actor)=>{

const img = actor.profile_path
? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
: "/no-image.png"

return(

<div key={actor.id} className="text-center">

<img
src={img}
className="rounded-lg w-24 h-24 object-cover mx-auto"
/>

<p className="mt-2 text-xs font-semibold">

{actor.name}

</p>

<p className="text-gray-400 text-xs">

{actor.character}

</p>

</div>

)

})}

</div>

</div>

</div>

)

}