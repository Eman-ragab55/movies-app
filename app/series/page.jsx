"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import toast from "react-hot-toast"

export default function SeriesPage(){

const [series,setSeries] = useState([])
const [search,setSearch] = useState("")
const [loading,setLoading] = useState(true)
const [watchlist,setWatchlist] = useState([])

const API = process.env.NEXT_PUBLIC_TMDB_KEY

useEffect(()=>{

async function getSeries(){

const res = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API}`)
const data = await res.json()

setSeries(data.results.slice(0,40))
setLoading(false)

}

getSeries()

const user = JSON.parse(localStorage.getItem("user"))
if(user){
const key = `watchlist_${user.email}`
const saved = JSON.parse(localStorage.getItem(key)) || []
setWatchlist(saved)
}

},[])


const toggleWatchlist = (item)=>{

const user = JSON.parse(localStorage.getItem("user"))

if(!user){
toast.error("Login first")
return
}

const key = `watchlist_${user.email}`

let list = JSON.parse(localStorage.getItem(key)) || []

const exists = list.find(x => x.id === item.id)

if(exists){

list = list.filter(x => x.id !== item.id)
toast.error("Removed")

}else{

list.push({
id:item.id,
name:item.name,
poster_path:item.poster_path,
type:"series"
})

toast.success("Added")

}

localStorage.setItem(key,JSON.stringify(list))
setWatchlist(list)

}

const isSaved = (id)=> watchlist.find(x => x.id === id)

const filteredSeries = series.filter(item =>
item.name.toLowerCase().includes(search.toLowerCase())
)

if(loading){
return(
<div className="min-h-screen bg-black flex items-center justify-center">
<div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
</div>
)
}

return(

<div className="bg-black text-white min-h-screen px-10 pt-32 pb-10">

<h1 className="text-4xl font-bold mb-8">Series</h1>

<input
type="text"
placeholder="Search series..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="w-full md:w-96 p-3 mb-10 rounded bg-gray-900 border border-gray-700"
/>

<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">

{filteredSeries.map((item)=>{

const poster = `https://image.tmdb.org/t/p/w500${item.poster_path}`
const saved = isSaved(item.id)

return(

<div key={item.id} className="relative">

<button
onClick={()=>toggleWatchlist(item)}
className="absolute top-2 right-2 text-xl z-10"
>
{saved ? "❤️" : "🤍"}
</button>

<Link href={`/series/${item.id}`}>

<div className="cursor-pointer hover:scale-105 transition">

<img src={poster} className="rounded-lg"/>

<h3 className="mt-2 text-sm">{item.name}</h3>

<p className="text-gray-400 text-sm">
⭐ {item.vote_average}
</p>

</div>

</Link>

</div>

)

})}

</div>

</div>

)
}