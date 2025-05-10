export interface KeyEvent {
  type: string
  value: string
  modifiers?: {
    shift?: boolean
    ctrl?: boolean
    alt?: boolean
    cmd?: boolean
  }
}

export interface KeyCombination {
  key: string
  modifiers: {
    shift?: boolean
    ctrl?: boolean
    alt?: boolean
    cmd?: boolean
  }
  action: string
  description: string
}

class KeyboardService {
  // macOS Option key Unicode mappings
  private optionKeyMappings = {
    // Option + letter keys
    a: "å", b: "∫", c: "ç", d: "∂", e: "´", f: "ƒ", g: "©",
    h: "˙", i: "ˆ", j: "∆", k: "˚", l: "¬", m: "µ", n: "˜",
    o: "ø", p: "π", q: "œ", r: "®", s: "ß", t: "†", u: "¨",
    v: "√", w: "∑", x: "≈", y: "¥", z: "Ω",

    // Option + number keys
    "1": "¡", "2": "™", "3": "£", "4": "¢", "5": "∞", "6": "§", "7": "¶",
    "8": "•", "9": "ª", "0": "º",

    // Option + symbol keys
    "`": "`", "-": "–", "=": "≠", "[": "\"", "]": "'", "\\": "«",
    ";": "…", "'": "æ", ",": "≤", ".": "≥", "/": "÷",

    // Option + Shift combinations for uppercase or alternate symbols
    A: "Å", B: "ı", C: "Ç", D: "Î", E: "´", F: "Ï", G: "˝",
    H: "Ó", I: "ˆ", J: "Ô", K: "˚", L: "Ò", M: "Â", N: "˜",
    O: "Ø", P: "∏", Q: "Œ", R: "‰", S: "Í", T: "ˇ", U: "¨",
    V: "◊", W: "„", X: "˛", Y: "Á", Z: "¸",
    
    // Option + Shift + number/symbol keys
    "!": "⁄", "@": "€", "#": "‹", "$": "›", "%": "ﬁ", "^": "ﬂ", "&": "‡",
    "*": "°", "(": "·", ")": "‚", "~": "`", "_": "—", "+": "±", "{": """,
    "}": "'", "|": "»", ":": "Ú", "\"": "Æ", "<": "¯", ">": "˘", "?": "¿"
  }
  \
  // Common macOS keyboard shortcuts
  private keyboardShortcuts = [
    { key: "c", modifiers: { cmd: true }, action: "copy", description: "Copy" },
    { key: "v", modifiers: { cmd: true }, action: "paste", description: "Paste" },
    { key: "x", modifiers: { cmd: true }, action: "cut", description: "Cut" },
    { key: "a", modifiers: { cmd: true }, action: "selectAll", description: "Select All" },
    { key: "z", modifiers: { cmd: true }, action: "undo", description: "Undo" },
    { key: "z", modifiers: { cmd: true, shift: true }, action: "redo", description: "Redo" },
    { key: "b", modifiers: { cmd: true }, action: "bold", description: "Bold" },
    { key: "i", modifiers: { cmd: true }, action: "italic", description: "Italic" },
    { key: "u", modifiers: { cmd: true }, action: "underline", description: "Underline" },
    { key: "s", modifiers: { cmd: true }, action: "save", description: "Save" },
    { key: "f", modifiers: { cmd: true }, action: "find", description: "Find" },
    { key: "g", modifiers: { cmd: true }, action: "findNext", description: "Find Next" },
    { key: "g", modifiers: { cmd: true, shift: true }, action: "findPrevious", description: "Find Previous" },
    { key: "h", modifiers: { cmd: true }, action: "replace", description: "Replace" },
    { key: "tab", modifiers: { cmd: true }, action: "switchApp", description: "Switch App" },
    { key: "n", modifiers: { cmd: true }, action: "new", description: "New" },
    { key: "o", modifiers: { cmd: true }, action: "open", description: "Open" },
    { key: "p", modifiers: { cmd: true }, action: "print", description: "Print" },
    { key: "w", modifiers: { cmd: true }, action: "close", description: "Close" },
    { key: "q", modifiers: { cmd: true }, action: "quit", description: "Quit" },
    { key: "left", modifiers: { cmd: true }, action: "moveToLineStart", description: "Move to Start of Line" },
    { key: "right", modifiers: { cmd: true }, action: "moveToLineEnd", description: "Move to End of Line" },
    { key: "up", modifiers: { cmd: true }, action: "moveToDocStart", description: "Move to Start of Document" },
    { key: "down", modifiers: { cmd: true }, action: "moveToDocEnd", description: "Move to End of Document" },
    { key: "left", modifiers: { alt: true }, action: "moveWordLeft", description: "Move Word Left" },
    { key: "right", modifiers: { alt: true }, action: "moveWordRight", description: "Move Word Right" },
    { key: "delete", modifiers: { cmd: true }, action: "deleteToLineStart", description: "Delete to Start of Line" },
    { key: "delete", modifiers: { alt: true }, action: "deleteWord", description: "Delete Word" },
    { key: "t", modifiers: { cmd: true }, action: "newTab", description: "New Tab" },
    { key: "t", modifiers: { cmd: true, shift: true }, action: "reopenClosedTab", description: "Reopen Closed Tab" },
    { key: "w", modifiers: { cmd: true, shift: true }, action: "closeAllWindows", description: "Close All Windows" },
    { key: "m", modifiers: { cmd: true }, action: "minimize", description: "Minimize Window" },
    { key: "f", modifiers: { cmd: true, shift: true }, action: "fullscreen", description: "Toggle Fullscreen" },
    { key: "1", modifiers: { cmd: true }, action: "firstTab", description: "First Tab" },
    { key: "9", modifiers: { cmd: true }, action: "lastTab", description: "Last Tab" },
    { key: "tab", modifiers: { ctrl: true }, action: "nextTab", description: "Next Tab" },
    { key: "tab", modifiers: { ctrl: true, shift: true }, action: "previousTab", description: "Previous Tab" },
    { key: "r", modifiers: { cmd: true }, action: "reload", description: "Reload" },
    { key: "l", modifiers: { cmd: true }, action: "addressBar", description: "Focus Address Bar" },
    { key: "+", modifiers: { cmd: true }, action: "zoomIn", description: "Zoom In" },
    { key: "-", modifiers: { cmd: true }, action: "zoomOut", description: "Zoom Out" },
    { key: "0", modifiers: { cmd: true }, action: "zoomReset", description: "Reset Zoom" },
    { key: "d", modifiers: { cmd: true }, action: "bookmark", description: "Bookmark Page" },
    { key: "j", modifiers: { cmd: true }, action: "downloads", description: "Downloads" },
    { key: "h", modifiers: { cmd: true, shift: true }, action: "history", description: "History" },
    { key: "y", modifiers: { cmd: true }, action: "history", description: "History (Chrome)" },
    { key: "e", modifiers: { cmd: true, shift: true }, action: "emoji", description: "Emoji Picker" },
  ]

  // Check if a key combination matches a known shortcut
  checkForCombination(key: string, modifiers: KeyEvent["modifiers"]): KeyCombination | null {
    if (!modifiers) return null

    return (
      this.keyboardShortcuts.find(
        (shortcut) =>
          shortcut.key === key &&
          shortcut.modifiers.shift === modifiers.shift &&
          shortcut.modifiers.ctrl === modifiers.ctrl &&
          shortcut.modifiers.alt === modifiers.alt &&
          shortcut.modifiers.cmd === modifiers.cmd,
      ) || null
    )
  }

  // Check if an Option+key combination produces a Unicode character
  getOptionKeyUnicode(key: string, shift = false): string | null {
    // If shift is pressed, try to get the uppercase version
    if (shift) {
      // First try the direct mapping for Option+Shift+key
      const shiftChar = key.length === 1 ? key.toUpperCase() : key
      if (this.optionKeyMappings[shiftChar]) {
        return this.optionKeyMappings[shiftChar]
      }

      // If no direct mapping, try to get the shifted symbol
      const shiftedKey = this.getShiftedKey(key)
      if (shiftedKey && this.optionKeyMappings[shiftedKey]) {
        return this.optionKeyMappings[shiftedKey]
      }
    }

    // Try the regular Option+key mapping
    return this.optionKeyMappings[key] || null
  }

  // Helper to get the shifted version of a key
  private getShiftedKey(key: string): string | null {
    const shiftMap = {
      "`": "~",
      "1": "!",
      "2": "@",
      "3": "#",
      "4": "$",
      "5": "%",
      "6": "^",
      "7": "&",
      "8": "*",
      "9": "(",
      "0": ")",
      "-": "_",
      "=": "+",
      "[": "{",
      "]": "}",
      "\\": "|",
      ";": ":",
      "'": '"',
      ",": "<",
      ".": ">",
      "/": "?",
    }
    return shiftMap[key] || null
  }

  // Send key events to the native layer
  sendKeyEvent(event: KeyEvent): void {
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.keyboardHandler) {
      // iOS WebKit message handler
      window.webkit.messageHandlers.keyboardHandler.postMessage(event)
    } else {
      // Fallback for development/testing
      console.log("Key event:", event)
    }
  }

  // Send a key combination
  sendCombination(combination: KeyCombination): void {
    this.sendKeyEvent({
      type: "combination",
      value: combination.action,
      modifiers: combination.modifiers,
    })
  }

  // Send a Unicode character
  sendUnicode(character: string): void {
    this.sendKeyEvent({
      type: "unicode",
      value: character,
    })
  }

  // Switch to next keyboard
  switchKeyboard(): void {
    this.sendKeyEvent({
      type: "modifier",
      value: "switchKeyboard",
    })
  }

  // Helper methods for common key actions
  insertCharacter(char: string, modifiers?: KeyEvent["modifiers"]): void {
    // Check if this is an Option+key Unicode character
    if (modifiers && modifiers.alt) {
      const unicodeChar = this.getOptionKeyUnicode(char, modifiers.shift)
      if (unicodeChar) {
        this.sendUnicode(unicodeChar)
        return
      }
    }

    // Check if this is a key combination
    if (modifiers && (modifiers.cmd || modifiers.ctrl || modifiers.alt)) {
      const combination = this.checkForCombination(char, modifiers)
      if (combination) {
        this.sendCombination(combination)
        return
      }
    }

    // Otherwise, just send the character
    this.sendKeyEvent({
      type: "character",
      value: char,
      modifiers,
    })
  }

  deleteBackward(): void {
    this.sendKeyEvent({
      type: "delete",
      value: "backspace",
    })
  }

  insertNewline(): void {
    this.sendKeyEvent({
      type: "return",
      value: "return",
    })
  }

  insertSpace(): void {
    this.sendKeyEvent({
      type: "space",
      value: "space",
    })
  }

  insertTab(): void {
    this.sendKeyEvent({
      type: "tab",
      value: "tab",
    })
  }

  moveArrow(direction: "left" | "right" | "up" | "down", modifiers?: KeyEvent["modifiers"]): void {
    // Check if this is a key combination
    if (modifiers && (modifiers.cmd || modifiers.ctrl || modifiers.alt)) {
      const combination = this.checkForCombination(direction, modifiers)
      if (combination) {
        this.sendCombination(combination)
        return
      }
    }

    this.sendKeyEvent({
      type: "arrow",
      value: direction,
      modifiers,
    })
  }

  // Get all available shortcuts
  getAvailableShortcuts(): KeyCombination[] {
    return [...this.keyboardShortcuts]
  }

  // Get all Option+key Unicode mappings
  getOptionKeyMappings(): Record<string, string> {
    return { ...this.optionKeyMappings }
  }
}

// Create a singleton instance
const keyboardService = new KeyboardService()
export default keyboardService

// Add this to make the keyboard service available globally for debugging
declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        keyboardHandler?: {
          postMessage: (message: any) => void
        }
      }
    }
  }
}
