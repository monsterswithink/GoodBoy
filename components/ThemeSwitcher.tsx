"use client"

import type React from "react"
import { useTheme } from "@/contexts/ThemeContext"
import { Sun, Moon, Monitor } from "lucide-react"

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="theme-switcher flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-md ${
          theme === "light" ? "bg-white dark:bg-gray-700 shadow-sm" : "text-gray-500 dark:text-gray-400"
        }`}
        aria-label="Light theme"
      >
        <Sun size={20} />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-md ${
          theme === "dark" ? "bg-white dark:bg-gray-700 shadow-sm" : "text-gray-500 dark:text-gray-400"
        }`}
        aria-label="Dark theme"
      >
        <Moon size={20} />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-2 rounded-md ${
          theme === "system" ? "bg-white dark:bg-gray-700 shadow-sm" : "text-gray-500 dark:text-gray-400"
        }`}
        aria-label="System theme"
      >
        <Monitor size={20} />
      </button>
    </div>
  )
}

export default ThemeSwitcher
