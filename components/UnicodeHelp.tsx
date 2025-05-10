"use client"

import type React from "react"
import { useState } from "react"
import keyboardService from "@/services/keyboard-service"
import { Option } from "lucide-react"

const UnicodeHelp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const optionMappings = keyboardService.getOptionKeyMappings()

  // Group mappings by category
  const letterMappings = Object.entries(optionMappings).filter(([key]) => /^[a-zA-Z]$/.test(key))
  const numberMappings = Object.entries(optionMappings).filter(([key]) => /^[0-9]$/.test(key))
  const symbolMappings = Object.entries(optionMappings).filter(([key]) => !/^[a-zA-Z0-9]$/.test(key))

  return (
    <div className="unicode-help">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
      >
        {isOpen ? "Hide Unicode Characters" : "Show Unicode Characters"}
      </button>

      {isOpen && (
        <div className="unicode-panel bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mt-4 max-h-96 overflow-y-auto">
          <h3 className="text-lg font-bold mb-4">Option Key Unicode Characters</h3>

          <div className="mb-6">
            <h4 className="font-semibold mb-2">Letters</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {letterMappings.map(([key, value]) => (
                <div key={key} className="unicode-item flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center">
                    <Option className="w-4 h-4 mr-1" />
                    <span className="font-mono">+</span>
                    <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mx-1">{key}</span>
                  </div>
                  <div className="unicode-char text-lg">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-2">Numbers</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {numberMappings.map(([key, value]) => (
                <div key={key} className="unicode-item flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center">
                    <Option className="w-4 h-4 mr-1" />
                    <span className="font-mono">+</span>
                    <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mx-1">{key}</span>
                  </div>
                  <div className="unicode-char text-lg">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Symbols</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {symbolMappings.map(([key, value]) => (
                <div key={key} className="unicode-item flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center">
                    <Option className="w-4 h-4 mr-1" />
                    <span className="font-mono">+</span>
                    <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mx-1">{key}</span>
                  </div>
                  <div className="unicode-char text-lg">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UnicodeHelp
