"use client"
import { useState } from "react"
import MacKeyboard from "@/components/MacKeyboard"
import ShortcutsHelp from "@/components/ShortcutsHelp"
import UnicodeHelp from "@/components/UnicodeHelp"
import ThemeSwitcher from "@/components/ThemeSwitcher"
import DeviceInfo from "@/components/DeviceInfo"
import { ThemeProvider } from "@/contexts/ThemeContext"

export default function Home() {
  const [showDeviceInfo, setShowDeviceInfo] = useState(false)

  return (
    <ThemeProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8">
        <div className="w-full max-w-5xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-0">macOS Keyboard for iOS</h1>
            <ThemeSwitcher />
          </div>

          <p className="mb-4">
            This is a preview of the keyboard. When built as a keyboard extension, only the keyboard portion will be
            visible.
          </p>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <ShortcutsHelp />
              <UnicodeHelp />
            </div>
            <div className="flex items-center">
              <DeviceInfo showDetails={showDeviceInfo} />
              <button
                onClick={() => setShowDeviceInfo(!showDeviceInfo)}
                className="ml-2 text-sm text-blue-500 hover:text-blue-700"
              >
                {showDeviceInfo ? "Hide Details" : "Show Details"}
              </button>
            </div>
          </div>

          <div className="keyboard-preview w-full mt-4">
            <MacKeyboard />
          </div>
        </div>
      </main>
    </ThemeProvider>
  )
}
