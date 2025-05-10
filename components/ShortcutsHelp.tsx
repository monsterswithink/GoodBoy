"use client"

import type React from "react"
import { useState } from "react"
import keyboardService from "@/services/keyboard-service"
import { Command, Option } from "lucide-react"

const ShortcutsHelp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const shortcuts = keyboardService.getAvailableShortcuts()

  const renderModifier = (modifier: string) => {
    switch (modifier) {
      case "cmd":
        return <Command className="inline-block w-4 h-4 mr-1" />
      case "alt":
        return <Option className="inline-block w-4 h-4 mr-1" />
      case "shift":
        return <span className="mr-1">⇧</span>
      case "ctrl":
        return <span className="mr-1">⌃</span>
      default:
        return null
    }
  }

  return (
    <div className="shortcuts-help">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
      >
        {isOpen ? "Hide Shortcuts" : "Show Shortcuts"}
      </button>

      {isOpen && (
        <div className="shortcuts-panel bg-white shadow-lg rounded-lg p-4 mt-4 max-h-96 overflow-y-auto">
          <h3 className="text-lg font-bold mb-4">Available Keyboard Shortcuts</h3>
          <div className="grid grid-cols-2 gap-4">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="shortcut-item flex items-center justify-between">
                <div className="shortcut-keys flex items-center">
                  {shortcut.modifiers.cmd && renderModifier("cmd")}
                  {shortcut.modifiers.alt && renderModifier("alt")}
                  {shortcut.modifiers.ctrl && renderModifier("ctrl")}
                  {shortcut.modifiers.shift && renderModifier("shift")}
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">{shortcut.key}</span>
                </div>
                <div className="shortcut-description text-gray-600">{shortcut.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ShortcutsHelp
