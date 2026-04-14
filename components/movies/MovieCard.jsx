"use client"

import Link from "next/link"

export default function MovieCard({ movie }) {

const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

return(

<div className="text-white">

<Link href={`/movies/${movie.id}`}>

<img
src={image}
className="w-full h-[320px] object-cover rounded-lg cursor-pointer hover:scale-105 transition"
/>

<h3 className="mt-2 hover:text-red-500 transition">
{movie.title}
</h3>

</Link>

</div>

)
}