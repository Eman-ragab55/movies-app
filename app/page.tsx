
import Hero from "../components/hero/hero"
import UpcomingMovies from "../components/upcoming/Upcomming" 
import RecommendedMovies from "../components/recommended/recommend"
import Footer from "../components/footer/Footer"

export default function Home() {
  return (
             <main>
      <Hero />
      <UpcomingMovies />
      <RecommendedMovies />
      <Footer />
    </main>
  );
}
