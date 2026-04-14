"use client"

import { useState, useEffect } from "react"
import MovieCard from "../../components/movies/MovieCard"
import toast from "react-hot-toast"

export default function MoviesPage() {

  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [activeGenre, setActiveGenre] = useState(null)
  const [watchlist, setWatchlist] = useState([])

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY

  useEffect(() => {

    const fetchGenres = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      )
      const data = await res.json()
      setGenres(data.genres)
    }

    fetchGenres()

    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      const key = `watchlist_${user.email}`
      const saved = JSON.parse(localStorage.getItem(key)) || []
      setWatchlist(saved)
    }

  }, [])

  useEffect(() => {

    const fetchMovies = async () => {

      const url = activeGenre
        ? `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${activeGenre}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`

      const res = await fetch(url)
      const data = await res.json()

      setMovies(data.results)

    }

    fetchMovies()

  }, [activeGenre])


  const toggleWatchlist = (movie) => {

    const user = JSON.parse(localStorage.getItem("user"))

    if(!user){
      toast.error("Login first")
      return
    }

    const key = `watchlist_${user.email}`

    let list = JSON.parse(localStorage.getItem(key)) || []

    const exists = list.find((item) => item.id === movie.id)

    if (exists) {
      list = list.filter((item) => item.id !== movie.id)
      toast.error("Removed from Watchlist")
    } else {
      list.push({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        type: "movie"
      })
      toast.success("Added to Watchlist")
    }

    localStorage.setItem(key, JSON.stringify(list))
    setWatchlist(list)

  }

  const isSaved = (id) => {
    return watchlist.find((item) => item.id === id)
  }


  return (

    <div className="min-h-screen bg-black text-white pt-24 px-10">

      <h1 className="text-4xl font-bold mb-6">Movies</h1>

      <div className="flex flex-wrap gap-3 mb-10">

        <button
          onClick={() => setActiveGenre(null)}
          className="px-4 py-2 bg-red-600 rounded"
        >
          All
        </button>

        {genres.map((genre) => (

          <button
            key={genre.id}
            onClick={() => setActiveGenre(genre.id)}
            className="px-4 py-2 bg-gray-800 hover:bg-red-600 rounded"
          >
            {genre.name}
          </button>

        ))}

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {movies.map((movie) => {

          const saved = isSaved(movie.id)

          return (

            <div key={movie.id} className="relative">

              <button
                onClick={() => toggleWatchlist(movie)}
                className="absolute top-2 right-2 text-xl z-10"
              >
                {saved ? "❤️" : "🤍"}
              </button>

              <MovieCard movie={movie} />

            </div>

          )

        })}

      </div>

    </div>

  )
}