"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type ThemeType = "light" | "dark" | "system"
type ThemeMode = "light" | "dark"

interface ThemeContextType {
  theme: ThemeType
  currentMode: ThemeMode
  setTheme: (theme: ThemeType) => void
}

const defaultContext: ThemeContextType = {
  theme: "system",
  currentMode: "light",
  setTheme: () => {},
}

const ThemeContext = createContext<ThemeContextType>(defaultContext)

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>("system")
  const [currentMode, setCurrentMode] = useState<ThemeMode>("light")

  // Initialize theme from localStorage if available
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("keyboard-theme")
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system")) {
        setTheme(savedTheme as ThemeType)
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [])

  // Update currentMode based on theme and system preference
  useEffect(() => {
    const updateMode = () => {
      if (theme === "system") {
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        setCurrentMode(systemPrefersDark ? "dark" : "light")
      } else {
        setCurrentMode(theme as ThemeMode)
      }
    }

    updateMode()

    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      if (theme === "system") {
        updateMode()
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  // Save theme preference to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("keyboard-theme", theme)
    } catch (error) {
      console.error("Error writing to localStorage:", error)
    }
  }, [theme])

  const value = {
    theme,
    currentMode,
    setTheme: (newTheme: ThemeType) => {
      setTheme(newTheme)
    },
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
