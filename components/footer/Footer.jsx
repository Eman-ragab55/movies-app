"use client"

import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* logo + desc */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Movies<span className="text-red-600">Hub</span>
          </h2>

          <p className="text-sm leading-6">
            Watch the latest movies and TV shows online.
            Discover trending films and enjoy unlimited entertainment.
          </p>
        </div>

        {/* links */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2">
            <li className="hover:text-red-500 cursor-pointer">Home</li>
            <li className="hover:text-red-500 cursor-pointer">Movies</li>
            <li className="hover:text-red-500 cursor-pointer">TV Shows</li>
            <li className="hover:text-red-500 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* social */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4 text-xl">

            <div className="bg-zinc-800 p-3 rounded-full hover:bg-red-600 cursor-pointer">
              <FaFacebookF />
            </div>

            <div className="bg-zinc-800 p-3 rounded-full hover:bg-red-600 cursor-pointer">
              <FaTwitter />
            </div>

            <div className="bg-zinc-800 p-3 rounded-full hover:bg-red-600 cursor-pointer">
              <FaInstagram />
            </div>

            <div className="bg-zinc-800 p-3 rounded-full hover:bg-red-600 cursor-pointer">
              <FaYoutube />
            </div>

          </div>
        </div>

      </div>

      {/* bottom */}
      <div className="border-t border-zinc-800 text-center py-5 text-sm">
        © 2026 MoviesHub. All Rights Reserved.
      </div>

    </footer>
  )
}