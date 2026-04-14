import { notFound } from "next/navigation"

async function getMovie(id) {

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
    { cache: "no-store" }
  )

  if (!res.ok) return null

  return res.json()
}

async function getMovieVideos(id) {

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
  )

  const data = await res.json()

  return data.results
}

export default async function MovieDetails({ params }) {

  const { id } = await params

  const movie = await getMovie(id)

  const videos = await getMovieVideos(id)

  if (!movie) return notFound()

  const trailer = videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  )

  const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  return (

    <div className="min-h-screen bg-black text-white pt-24 px-10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* Poster */}
        <img
          src={image}
          alt={movie.title}
          className="rounded-lg"
        />

        {/* Details */}
        <div>

          <h1 className="text-4xl font-bold mb-4">
            {movie.title}
          </h1>

          <p className="text-yellow-400 mb-3">
            ⭐ {movie.vote_average?.toFixed(1)}
          </p>

          <p className="text-gray-400 mb-3">
            Release Date: {movie.release_date}
          </p>

          <p className="text-gray-300 mb-6">
            {movie.overview}
          </p>

        </div>

      </div>

      {/* Trailer */}

      {trailer && (

        <div className="max-w-5xl mx-auto mt-16">

          <h2 className="text-3xl font-bold mb-6">
            Trailer
          </h2>

          <div className="aspect-video">

            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              allowFullScreen
            />

          </div>

        </div>

      )}

    </div>
  )
}