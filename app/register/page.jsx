"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import toast from "react-hot-toast"
export default function Register() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return regex.test(password)
  }

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      toast("Please fill all fields")
      
      return
    }

    if (!email.includes("@")) {
      toast("Invalid email format")
     
      return
    }

    if (!validatePassword(password)) {
      toast("Password must be at least 8 characters long and include one uppercase letter, one number, and one special character")
      return
    }

    if (password !== confirmPassword) {
      toast("Passwords do not match")
      return
    }

    // تحقق إذا الايميل موجود بالفعل
    const savedEmail = Cookies.get("userEmail")
    if (savedEmail === email) {
      toast("Account already exists with this email")
      return
    }

    // تخزين البيانات في Cookies
    Cookies.set("userName", name, { expires: 7 })
    Cookies.set("userEmail", email, { expires: 7 })
    Cookies.set("userPassword", password, { expires: 7 })

    toast("Account created successfully!")
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 p-10 rounded-lg w-[400px]">
        <h2 className="text-3xl mb-6">Create Account</h2>

        <input
          placeholder="Name"
          className="w-full p-3 mb-4 bg-zinc-800 rounded"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full p-3 mb-4 bg-zinc-800 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-zinc-800 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 mb-6 bg-zinc-800 rounded"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="bg-red-600 w-full py-3 rounded"
        >
          Create Account
        </button>
      </div>
    </div>
  )
}