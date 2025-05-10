export interface KeyEvent {
  type: "character" | "delete" | "return" | "space" | "tab" | "arrow" | "modifier"
  value: string
  modifiers?: {
    shift?: boolean
    ctrl?: boolean
    alt?: boolean
    cmd?: boolean
  }
}

class KeyboardService {
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

  // Helper methods for common key actions
  insertCharacter(char: string, modifiers?: KeyEvent["modifiers"]): void {
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

  moveArrow(direction: "left" | "right" | "up" | "down"): void {
    this.sendKeyEvent({
      type: "arrow",
      value: direction,
    })
  }
}

// Create a singleton instance
const keyboardService = new KeyboardService()
export default keyboardService
