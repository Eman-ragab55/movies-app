"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export default function SearchBar({ onSearch }) {

  const [value, setValue] = useState("")

  const handleSearch = (e) => {
    const text = e.target.value
    setValue(text)
    onSearch(text)
  }

  return (

    <div className="relative mb-10 max-w-md">

      <Search className="absolute left-3 top-3 text-gray-400" />

      <input
        type="text"
        placeholder="Search movies..."
        value={value}
        onChange={handleSearch}
        className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg outline-none"
      />

    </div>

  )
}