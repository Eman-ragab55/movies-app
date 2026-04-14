"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import toast from "react-hot-toast"
export default function Login() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {

    const savedEmail = Cookies.get("userEmail")
    const savedPassword = Cookies.get("userPassword")
    const savedName = Cookies.get("userName")

    if (!savedEmail || !savedPassword) {
       toast("No account found, please register first")
      return
    }

    if (email === savedEmail && password === savedPassword) {

      // حفظ التوكن
      Cookies.set("token", "loggedin", { expires: 7 })

      // نحفظ الاسم عشان يظهر في النافبار
      Cookies.set("loggedUser", savedName, { expires: 7 })

      // هنا بيروح لصفحة الهوم
      router.push("/")

    } else {
      toast("Wrong email or password")
   
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 p-10 rounded-lg w-[400px]">

        <h2 className="text-3xl mb-6">Login</h2>

        <input
          placeholder="Email"
          className="w-full p-3 mb-4 bg-zinc-800 rounded"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 bg-zinc-800 rounded"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-red-600 w-full py-3 rounded"
        >
          Login
        </button>

      </div>
    </div>
  )
}