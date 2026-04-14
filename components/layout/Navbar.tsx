"use client"

import { Search, Bell, User } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

export default function Navbar() {

  const pathname = usePathname()
  const router = useRouter()

  const [userName, setUserName] = useState("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const token = Cookies.get("token")
    const name = Cookies.get("userName")

    if (token && name) {
      setUserName(name)
    }
  }, [])

  const handleLogout = () => {
    Cookies.remove("token")
    Cookies.remove("userName")
    Cookies.remove("userEmail")
    Cookies.remove("userPassword")

    router.push("/login")
  }

const linkStyle = (path: string) =>
  `cursor-pointer transition duration-300 ${
    pathname === path
      ? "text-red-600"
      : "text-gray-300 hover:text-white"
  }`;
  return (
    <nav className="w-full bg-black text-white flex items-center justify-between px-8 py-4 fixed top-0 left-0 z-50">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-red-600 text-3xl font-bold">S</span>
        <span className="text-xl font-semibold">STREAMIT</span>
      </div>

      {/* Links */}
      <ul className="hidden md:flex gap-8 font-medium">
        <li><Link href="/" className={linkStyle("/")}>Home</Link></li>
        <li><Link href="/series" className={linkStyle("/series")}>Series</Link></li>
        <li><Link href="/movies" className={linkStyle("/movies")}>Movies</Link></li>
        <li><Link href="/watchlist">Watchlist</Link></li>
      </ul>

      {/* Right side */}
      <div className="flex items-center gap-6 relative">


        {!userName ? (
          <>
            <Link href="/login">
              <User className="cursor-pointer hover:text-white"/>
            </Link>

            <Link href="/register">
              <button className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded text-white">
                Register
              </button>
            </Link>
          </>
        ) : (
          <div className="relative">

            {/* Profile Button */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded hover:bg-gray-700"
            >
              Hello, {userName}
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-zinc-900 border border-gray-700 rounded shadow-lg">

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-zinc-800 text-red-500"
                >
                  Logout
                </button>

              </div>
            )}

          </div>
        )}

      </div>

    </nav>
  )
}