"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { Command, Option, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Delete, Globe, Mic } from "lucide-react"
import keyboardService from "@/services/keyboard-service"
import { useTheme } from "@/contexts/ThemeContext"
import { useDevice } from "@/hooks/useDevice"
import { getTheme } from "@/styles/keyboard-themes"

const MacKeyboard: React.FC = () => {
  const { currentMode } = useTheme()
  const device = useDevice()
  const theme = getTheme(currentMode)
  const keyboardRef = useRef<HTMLDivElement>(null)

  const [shift, setShift] = useState(false)
  const [capsLock, setCapsLock] = useState(false)
  const [fn, setFn] = useState(false)
  const [ctrl, setCtrl] = useState(false)
  const [alt, setAlt] = useState(false)
  const [cmd, setCmd] = useState(false)
  const [activeShortcut, setActiveShortcut] = useState<string | null>(null)
  const [lastUnicodeChar, setLastUnicodeChar] = useState<string | null>(null)

  // Reset active shortcut after a delay
  useEffect(() => {
    if (activeShortcut) {
      const timer = setTimeout(() => {
        setActiveShortcut(null)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [activeShortcut])

  // Reset last Unicode character after a delay
  useEffect(() => {
    if (lastUnicodeChar) {
      const timer = setTimeout(() => {
        setLastUnicodeChar(null)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [lastUnicodeChar])

  const toggleModifier = (modifier: string) => {
    switch (modifier) {
      case "shift":
        setShift(!shift)
        break
      case "capsLock":
        setCapsLock(!capsLock)
        break
      case "fn":
        setFn(!fn)
        break
      case "ctrl":
        setCtrl(!ctrl)
        break
      case "alt":
        setAlt(!alt)
        break
      case "cmd":
        setCmd(!cmd)
        break
      default:
        break
    }
  }

  const handleKeyPress = useCallback(
    (key: string) => {
      console.log(`Key pressed: ${key}`)

      // Get current modifiers
      const modifiers = {
        shift: shift,
        ctrl: ctrl,
        alt: alt,
        cmd: cmd,
      }

      // Handle globe button (switch keyboard)
      if (key === "globe") {
        keyboardService.switchKeyboard()
        return
      }

      // Handle microphone button (voice input)
      if (key === "mic") {
        // This would need to be implemented in the native layer
        console.log("Voice input requested")
        return
      }

      // Check for Option+key Unicode characters
      if (alt && key.length === 1) {
        const unicodeChar = keyboardService.getOptionKeyUnicode(key, shift)
        if (unicodeChar) {
          console.log(`Unicode character: ${unicodeChar}`)
          keyboardService.sendUnicode(unicodeChar)
          setLastUnicodeChar(unicodeChar)

          // Auto-release modifiers after Unicode character is used
          setShift(false)
          setAlt(false)
          return
        }
      }

      // Check for key combinations
      if (cmd || ctrl || alt) {
        const combination = keyboardService.checkForCombination(key, modifiers)
        if (combination) {
          console.log(`Combination detected: ${combination.action}`)
          keyboardService.sendCombination(combination)
          setActiveShortcut(combination.action)

          // Auto-release modifiers after combination is used
          if (!key.includes("shift") && !key.includes("ctrl") && !key.includes("alt") && !key.includes("cmd")) {
            setShift(false)
            setCtrl(false)
            setAlt(false)
            setCmd(false)
          }
          return
        }
      }

      // Handle regular key presses
      switch (key) {
        case "delete":
          keyboardService.deleteBackward()
          break
        case "return":
          keyboardService.insertNewline()
          break
        case "space":
          keyboardService.insertSpace()
          break
        case "tab":
          keyboardService.insertTab()
          break
        case "up":
        case "down":
        case "left":
        case "right":
          keyboardService.moveArrow(key as "left" | "right" | "up" | "down", modifiers)
          break
        default:
          // For regular characters
          let char = key
          if (shift || capsLock) {
            // Get the uppercase or symbol version if shift is active
            const keyObj = [...numberRow, ...qwertyRow, ...asdfRow, ...zxcvRow].find((k) => k.key === key)
            if (keyObj && keyObj.shiftKey) {
              char = keyObj.shiftKey
            } else if (key.length === 1) {
              char = key.toUpperCase()
            }
          }
          keyboardService.insertCharacter(char, modifiers)
          break
      }

      // Auto-release modifiers after key press (except for caps lock)
      if (key !== "capsLock" && key !== "shift" && key !== "ctrl" && key !== "alt" && key !== "cmd") {
        setShift(false)
        setCtrl(false)
        setAlt(false)
        setCmd(false)
      }
    },
    [shift, capsLock, ctrl, alt, cmd],
  )

  // Function keys row
  const functionKeys = [
    { key: "esc", label: "esc" },
    { key: "f1", label: "F1" },
    { key: "f2", label: "F2" },
    { key: "f3", label: "F3" },
    { key: "f4", label: "F4" },
    { key: "f5", label: "F5" },
    { key: "f6", label: "F6" },
    { key: "f7", label: "F7" },
    { key: "f8", label: "F8" },
    { key: "f9", label: "F9" },
    { key: "f10", label: "F10" },
    { key: "f11", label: "F11" },
    { key: "f12", label: "F12" },
  ]

  // Number row
  const numberRow = [
    { key: "`", shiftKey: "~" },
    { key: "1", shiftKey: "!" },
    { key: "2", shiftKey: "@" },
    { key: "3", shiftKey: "#" },
    { key: "4", shiftKey: "$" },
    { key: "5", shiftKey: "%" },
    { key: "6", shiftKey: "^" },
    { key: "7", shiftKey: "&" },
    { key: "8", shiftKey: "*" },
    { key: "9", shiftKey: "(" },
    { key: "0", shiftKey: ")" },
    { key: "-", shiftKey: "_" },
    { key: "=", shiftKey: "+" },
    { key: "delete", label: <Delete size={16} /> },
  ]

  // QWERTY row
  const qwertyRow = [
    { key: "tab", label: "tab" },
    { key: "q", shiftKey: "Q" },
    { key: "w", shiftKey: "W" },
    { key: "e", shiftKey: "E" },
    { key: "r", shiftKey: "R" },
    { key: "t", shiftKey: "T" },
    { key: "y", shiftKey: "Y" },
    { key: "u", shiftKey: "U" },
    { key: "i", shiftKey: "I" },
    { key: "o", shiftKey: "O" },
    { key: "p", shiftKey: "P" },
    { key: "[", shiftKey: "{" },
    { key: "]", shiftKey: "}" },
    { key: "\\", shiftKey: "|" },
  ]

  // ASDF row
  const asdfRow = [
    { key: "capsLock", label: "caps lock", isModifier: true },
    { key: "a", shiftKey: "A" },
    { key: "s", shiftKey: "S" },
    { key: "d", shiftKey: "D" },
    { key: "f", shiftKey: "F" },
    { key: "g", shiftKey: "G" },
    { key: "h", shiftKey: "H" },
    { key: "j", shiftKey: "J" },
    { key: "k", shiftKey: "K" },
    { key: "l", shiftKey: "L" },
    { key: ";", shiftKey: ":" },
    { key: "'", shiftKey: '"' },
    { key: "return", label: "return" },
  ]

  // ZXCV row
  const zxcvRow = [
    { key: "shift", label: "shift", isModifier: true },
    { key: "z", shiftKey: "Z" },
    { key: "x", shiftKey: "X" },
    { key: "c", shiftKey: "C" },
    { key: "v", shiftKey: "V" },
    { key: "b", shiftKey: "B" },
    { key: "n", shiftKey: "N" },
    { key: "m", shiftKey: "M" },
    { key: ",", shiftKey: "<" },
    { key: ".", shiftKey: ">" },
    { key: "/", shiftKey: "?" },
    { key: "shift", label: "shift", isModifier: true },
  ]

  // Bottom row
  const bottomRow = [
    { key: "fn", label: "fn", isModifier: true },
    { key: "ctrl", label: "control", isModifier: true },
    { key: "alt", label: "option", icon: <Option size={16} />, isModifier: true },
    { key: "cmd", label: "command", icon: <Command size={16} />, isModifier: true },
    { key: "space", label: " " },
    { key: "cmd", label: "command", icon: <Command size={16} />, isModifier: true },
    { key: "alt", label: "option", icon: <Option size={16} />, isModifier: true },
    { key: "globe", label: <Globe size={16} /> },
    { key: "mic", label: <Mic size={16} /> },
  ]

  // Arrow keys
  const arrowKeys = [
    { key: "up", label: <ArrowUp size={16} /> },
    { key: "left", label: <ArrowLeft size={16} /> },
    { key: "down", label: <ArrowDown size={16} /> },
    { key: "right", label: <ArrowRight size={16} /> },
  ]

  // Simplified iPhone keyboard layout
  const getIPhoneLayout = () => {
    // For small iPhones, we'll use a more compact layout
    if (device.isSmallPhone) {
      return {
        showFunctionKeys: false,
        compactModifiers: true,
        keySize: "xs",
      }
    }

    // For medium iPhones
    if (device.isMediumPhone) {
      return {
        showFunctionKeys: false,
        compactModifiers: false,
        keySize: "sm",
      }
    }

    // For larger iPhones
    return {
      showFunctionKeys: device.orientation === "landscape",
      compactModifiers: device.orientation === "portrait",
      keySize: "md",
    }
  }

  // iPad layout
  const getIPadLayout = () => {
    return {
      showFunctionKeys: true,
      compactModifiers: false,
      keySize: device.isPro ? "xl" : "lg",
    }
  }

  // Get layout based on device
  const getLayout = () => {
    if (device.isTablet) {
      return getIPadLayout()
    }
    return getIPhoneLayout()
  }

  const layout = getLayout()

  // Check if a key has an Option+key Unicode character
  const hasOptionUnicode = (key: string): boolean => {
    return key.length === 1 && !!keyboardService.getOptionKeyUnicode(key, shift)
  }

  const renderKey = (keyObj: any, index: number) => {
    let displayValue = keyObj.label

    if (!displayValue) {
      if (keyObj.shiftKey && (shift || capsLock)) {
        displayValue = keyObj.shiftKey
      } else {
        displayValue = keyObj.key
      }
    }

    const isActive =
      (keyObj.key === "shift" && shift) ||
      (keyObj.key === "capsLock" && capsLock) ||
      (keyObj.key === "fn" && fn) ||
      (keyObj.key === "ctrl" && ctrl) ||
      (keyObj.key === "alt" && alt) ||
      (keyObj.key === "cmd" && cmd)

    // Check if this key is part of an active shortcut
    const isPartOfShortcut = cmd && keyboardService.checkForCombination(keyObj.key, { cmd: true })

    // Check if this key has an Option+key Unicode character
    const hasUnicode = alt && hasOptionUnicode(keyObj.key)

    // Determine key size class based on device and layout
    let keySizeClass = ""
    switch (layout.keySize) {
      case "xs":
        keySizeClass = "key-xs"
        break
      case "sm":
        keySizeClass = "key-sm"
        break
      case "md":
        keySizeClass = "key-md"
        break
      case "lg":
        keySizeClass = "key-lg"
        break
      case "xl":
        keySizeClass = "key-xl"
        break
      default:
        keySizeClass = "key-md"
    }

    // Special styling for modifier keys
    const isModifier = keyObj.isModifier
    const modifierClass = isModifier ? "modifier" : ""

    const keyClass = `key ${keySizeClass} ${keyObj.key === "space" ? "space" : ""} ${
      isActive ? "active" : ""
    } ${isPartOfShortcut ? "shortcut" : ""} ${hasUnicode ? "unicode" : ""} ${modifierClass}`

    return (
      <button
        key={`${keyObj.key}-${index}`}
        className={keyClass}
        onClick={() => {
          if (keyObj.isModifier) {
            toggleModifier(keyObj.key)
          } else {
            handleKeyPress(keyObj.key)
          }
        }}
        style={{
          backgroundColor: isModifier
            ? isActive
              ? theme.key.backgroundModifierActive
              : theme.key.backgroundModifier
            : isActive
              ? theme.key.backgroundActive
              : theme.key.background,
          color: isModifier ? theme.key.textModifier : theme.key.text,
          boxShadow: theme.key.shadow,
          border: isPartOfShortcut || hasUnicode ? theme.key.borderActive : theme.key.border,
        }}
      >
        {keyObj.icon || displayValue}

        {/* Show Unicode character for Option+key combinations */}
        {alt && hasUnicode && (
          <span className="unicode-indicator text-xs absolute top-1 right-1 text-blue-500">
            {keyboardService.getOptionKeyUnicode(keyObj.key, shift)}
          </span>
        )}
      </button>
    )
  }

  return (
    <div
      ref={keyboardRef}
      className="mac-keyboard rounded-lg p-2 select-none touch-manipulation relative"
      style={{
        backgroundColor: theme.keyboard.background,
        boxShadow: theme.keyboard.shadow,
      }}
    >
      {/* Shortcut indicator */}
      {activeShortcut && (
        <div
          className="shortcut-indicator px-3 py-1 rounded-md absolute top-[-40px] left-1/2 transform -translate-x-1/2 z-10"
          style={{
            backgroundColor: theme.shortcut.background,
            color: theme.shortcut.text,
          }}
        >
          {activeShortcut}
        </div>
      )}

      {/* Unicode character indicator */}
      {lastUnicodeChar && (
        <div
          className="unicode-indicator px-3 py-1 rounded-md absolute top-[-40px] left-1/2 transform -translate-x-1/2 z-10"
          style={{
            backgroundColor: theme.shortcut.background,
            color: theme.shortcut.text,
          }}
        >
          {lastUnicodeChar}
        </div>
      )}

      {/* Function keys row - only show on larger devices or landscape */}
      {layout.showFunctionKeys && (
        <div className="keyboard-row function-row flex mb-1 justify-center">
          {functionKeys.map((key, index) => renderKey(key, index))}
        </div>
      )}

      {/* Number row */}
      <div className="keyboard-row number-row flex mb-1 justify-center">
        {numberRow.map((key, index) => renderKey(key, index))}
      </div>

      {/* QWERTY row */}
      <div className="keyboard-row qwerty-row flex mb-1 justify-center">
        {qwertyRow.map((key, index) => renderKey(key, index))}
      </div>

      {/* ASDF row */}
      <div className="keyboard-row asdf-row flex mb-1 justify-center">
        {asdfRow.map((key, index) => renderKey(key, index))}
      </div>

      {/* ZXCV row */}
      <div className="keyboard-row zxcv-row flex mb-1 justify-center">
        {zxcvRow.map((key, index) => renderKey(key, index))}
      </div>

      {/* Bottom row */}
      <div className="keyboard-row bottom-row flex mb-1 justify-center">
        {/* If compact modifiers, show fewer modifier keys on small screens */}
        {layout.compactModifiers
          ? [
              bottomRow[2], // alt
              bottomRow[3], // cmd
              bottomRow[4], // space
              bottomRow[5], // cmd
              bottomRow[7], // globe
            ].map((key, index) => renderKey(key, index))
          : bottomRow.map((key, index) => renderKey(key, index))}
      </div>

      {/* Arrow keys */}
      <div className="keyboard-row arrow-row flex justify-end mt-2">
        {arrowKeys.map((key, index) => renderKey(key, index))}
      </div>

      <style jsx>{`
        .mac-keyboard {
          position: relative;
          width: 100%;
        }

        .key {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          border: 1px solid transparent;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.1s ease;
          padding: 0 8px;
          margin: 2px;
          position: relative;
        }

        .key:active,
        .key.active {
          transform: translateY(1px);
        }

        /* Key sizes based on device */
        .key-xs {
          min-width: 24px;
          height: 36px;
          font-size: 12px;
        }

        .key-sm {
          min-width: 28px;
          height: 40px;
          font-size: 13px;
        }

        .key-md {
          min-width: 32px;
          height: 44px;
          font-size: 14px;
        }

        .key-lg {
          min-width: 40px;
          height: 50px;
          font-size: 16px;
        }

        .key-xl {
          min-width: 48px;
          height: 56px;
          font-size: 18px;
        }

        .key.space {
          flex-grow: 3;
        }

        .key-xs.space {
          min-width: 120px;
        }

        .key-sm.space {
          min-width: 150px;
        }

        .key-md.space {
          min-width: 180px;
        }

        .key-lg.space {
          min-width: 250px;
        }

        .key-xl.space {
          min-width: 350px;
        }

        .function-row .key {
          font-size: 12px;
          height: 35px;
        }

        .key-xs.modifier {
          font-size: 10px;
        }

        .key-sm.modifier {
          font-size: 11px;
        }
        
        .key.unicode {
          border-color: #0a84ff;
        }

        /* Landscape mode adjustments */
        @media (orientation: landscape) {
          .mac-keyboard {
            max-width: 95%;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  )
}

export default MacKeyboard
