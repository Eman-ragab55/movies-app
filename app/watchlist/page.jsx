"use client"

import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"
import toast from "react-hot-toast"

export default function Watchlist(){

const [movies,setMovies] = useState([])
const [user,setUser] = useState(null)

useEffect(()=>{

const currentUser = JSON.parse(localStorage.getItem("user"))

if(!currentUser){
setUser(null)
return
}

setUser(currentUser)

const key = `watchlist_${currentUser.email}`
const watch = JSON.parse(localStorage.getItem(key)) || []

setMovies(watch)

},[])


// ❌ حذف عنصر
const removeFromWatchlist = (id)=>{

const key = `watchlist_${user.email}`

let list = JSON.parse(localStorage.getItem(key)) || []

list = list.filter(item => item.id !== id)

localStorage.setItem(key, JSON.stringify(list))

setMovies(list)

toast.error("Removed from Watchlist")

}


// 🧹 حذف الكل
const clearAll = ()=>{

const key = `watchlist_${user.email}`

localStorage.removeItem(key)

setMovies([])

toast.error("Watchlist Cleared")

}


// 🚫 لو مش مسجل
if(!user){

return(

<div className="min-h-screen bg-black text-white flex items-center justify-center">

<p className="text-xl">
Please login first to view your Watchlist
</p>

</div>

)

}


return(

<div className="min-h-screen bg-black text-white pt-24 px-10">

<div className="flex justify-between items-center mb-10">

<h1 className="text-4xl">
Watchlist
</h1>

{movies.length > 0 && (

<button
onClick={clearAll}
className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded"
>
Clear All
</button>

)}

</div>


{movies.length === 0 && (

<p className="text-gray-400 text-center mt-20">
No items in watchlist
</p>

)}


<div className="grid grid-cols-2 md:grid-cols-4 gap-6">

{movies.map((movie)=>{

const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

return(

<div key={`${movie.id}-${movie.type}`} className="bg-black border border-gray-800 p-3 rounded hover:scale-105 transition">

<img
src={image}
className="rounded-lg"
/>

<h3 className="mt-2 text-sm">
{movie.title || movie.name}
</h3>

{/* زرار حذف */}
<button
onClick={()=>removeFromWatchlist(movie.id)}
className="mt-3 w-full flex items-center justify-center gap-2 bg-black border border-gray-700 hover:bg-red-600 transition py-2 rounded text-sm"
>

<Trash2 size={16} />

Remove

</button>

</div>

)

})}

</div>

</div>

)

}