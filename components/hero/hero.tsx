"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import '@fortawesome/fontawesome-free/css/all.min.css'

// استيراد الداتا
import { homeData } from "../../data/data"

export default function Hero() {
  return (
    <section className="w-full h-[90vh] relative">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        navigation={{
          nextEl: ".next-btn",
          prevEl: ".prev-btn"
        }}
        autoplay={{ delay: 4000 }}
        loop
        effect="fade"
        className="h-full"
      >
        {homeData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[90vh]">
              <img src={slide.cover} className="absolute w-full h-full object-cover" alt={slide.name} />
              <div className="absolute inset-0 bg-black/60"></div>
              <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-10">
                <div className="max-w-xl text-white animate-fade">
                  <h1 className="text-6xl font-bold mb-2">{slide.name}</h1>
                  {/* stars rating */}
                  <div className="rating flex mb-4">
                    <div className="rate flex text-yellow-400 text-xl">
                      {Array.from({ length: 5 }, (_, i) => {
                        if (i + 1 <= Math.floor(slide.rating)) {
                          return <i key={i} className="fas fa-star"></i>
                        } else if (i < slide.rating) {
                          return <i key={i} className="fas fa-star-half-alt"></i>
                        } else {
                          return <i key={i} className="far fa-star"></i>
                        }
                      })}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6">{slide.desc}</p>
                  <div className="flex gap-4">
                    <button className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700 transition">
                      ▶ Play Now
                    </button>
                    <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition">
                      Watch Trailer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* arrows */}
      <div className="next-btn absolute right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center bg-black/50 rounded-full text-white text-2xl cursor-pointer hover:bg-red-600 transition">›</div>
      <div className="prev-btn absolute left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center bg-black/50 rounded-full text-white text-2xl cursor-pointer hover:bg-red-600 transition">‹</div>
    </section>
  )
}