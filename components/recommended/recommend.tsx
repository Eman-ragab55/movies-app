"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"

import { recommended } from "../../data/data"

export default function RecommendedMovies() {
  return (
    <section className="max-w-7xl mx-auto px-5 py-10">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Recommended Movies</h2>
        <a href="#" className="text-red-600 hover:underline">View All</a>
      </div>

      <div className="relative group">

        {/* سهم شمال */}
        <button className="prev2 absolute left-0 top-1/2 -translate-y-1/2 z-20
        w-12 h-12 rounded-full bg-black/60 text-white text-xl
        flex items-center justify-center
        opacity-0 group-hover:opacity-100 transition">
          ‹
        </button>

        {/* سهم يمين */}
        <button className="next2 absolute right-0 top-1/2 -translate-y-1/2 z-20
        w-12 h-12 rounded-full bg-black/60 text-white text-xl
        flex items-center justify-center
        opacity-0 group-hover:opacity-100 transition">
          ›
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".next2",
            prevEl: ".prev2",
          }}
          spaceBetween={20}
          slidesPerView={3}
        >
          {recommended.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="relative group cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
                
                <img
                  src={movie.cover}
                  alt={movie.name}
                  className="w-full h-80 object-cover"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="absolute bottom-4 left-4 text-white z-10">
                  <h3 className="text-lg font-semibold">{movie.name}</h3>
                  <p className="text-sm">{movie.time}</p>

                  <button className="mt-2 bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition">
                    ▶ Play Now
                  </button>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  )
}