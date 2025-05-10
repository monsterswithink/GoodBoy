"use client"

import type React from "react"
import { useState } from "react"
import "./MacKeyboard.css"
import { Command, Option, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Delete, Globe, Mic } from "lucide-react"

const MacKeyboard: React.FC = () => {
  const [shift, setShift] = useState(false)
  const [capsLock, setCapsLock] = useState(false)
  const [fn, setFn] = useState(false)
  const [ctrl, setCtrl] = useState(false)
  const [alt, setAlt] = useState(false)
  const [cmd, setCmd] = useState(false)

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

  const handleKeyPress = (key: string) => {
    console.log(`Key pressed: ${key}`)
    // In a real implementation, this would use the Capacitor Keyboard plugin
    // to send the key press to the active text field
  }

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

    const keyClass = `key ${keyObj.key === "space" ? "space" : ""} ${isActive ? "active" : ""}`

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
      >
        {keyObj.icon || displayValue}
      </button>
    )
  }

  return (
    <div className="mac-keyboard">
      <div className="keyboard-row function-row">{functionKeys.map((key, index) => renderKey(key, index))}</div>
      <div className="keyboard-row number-row">{numberRow.map((key, index) => renderKey(key, index))}</div>
      <div className="keyboard-row qwerty-row">{qwertyRow.map((key, index) => renderKey(key, index))}</div>
      <div className="keyboard-row asdf-row">{asdfRow.map((key, index) => renderKey(key, index))}</div>
      <div className="keyboard-row zxcv-row">{zxcvRow.map((key, index) => renderKey(key, index))}</div>
      <div className="keyboard-row bottom-row">{bottomRow.map((key, index) => renderKey(key, index))}</div>
      <div className="keyboard-row arrow-row">{arrowKeys.map((key, index) => renderKey(key, index))}</div>
    </div>
  )
}

export default MacKeyboard
