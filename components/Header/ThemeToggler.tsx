"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from "react"

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-7 w-14 rounded-full bg-gray-200 p-1 transition-colors duration-200 dark:bg-gray-700"
    >
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full bg-white transition-transform duration-200 ${
          theme === "dark" ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {theme === "dark" ? (
          <Moon className="h-3 w-3 text-gray-800" />
        ) : (
          <Sun className="h-3 w-3 text-gray-800" />
        )}
      </div>
    </button>
  )
}

export default ThemeToggler