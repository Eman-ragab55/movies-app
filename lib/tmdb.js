const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY
const BASE_URL = "https://api.themoviedb.org/3"

export async function getPopularMovies() {

  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  )

  const data = await res.json()

  return data.results
}
export async function getMovieDetails(id) {

  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  )

  return res.json()
}
export async function searchMovies(query) {

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
  )

  const data = await res.json()

  return data.results
}
export default function MoviesPage() {

  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => {

    const fetchMovies = async () => {

      const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY

      let allMovies = []

      for (let page = 1; page <= 3; page++) {

        const url = query
          ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
          : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`

        const res = await fetch(url)

        const data = await res.json()

        allMovies = [...allMovies, ...data.results]

      }

      setMovies(allMovies)

    }

    fetchMovies()

  }, [query])

  return (

    <div className="min-h-screen bg-black text-white pt-24 px-10">

      <h1 className="text-4xl font-bold mb-6">
        Movies
      </h1>

      <SearchBar onSearch={setQuery} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

      </div>

    </div>

  )
}
export async function getMoviesByGenre(id) {

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}`
  )

  const data = await res.json()

  return data.results
}
export async function getMovieVideos(id) {

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
  )

  const data = await res.json()

  return data.results
}