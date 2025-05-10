export interface KeyboardTheme {
  name: string
  keyboard: {
    background: string
    shadow: string
  }
  key: {
    background: string
    backgroundActive: string
    backgroundModifier: string
    backgroundModifierActive: string
    text: string
    textModifier: string
    shadow: string
    border: string
    borderActive: string
  }
  shortcut: {
    background: string
    text: string
  }
}

export const lightTheme: KeyboardTheme = {
  name: "Light",
  keyboard: {
    background: "#f5f5f7",
    shadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  key: {
    background: "#ffffff",
    backgroundActive: "#e0e0e0",
    backgroundModifier: "#f0f0f0",
    backgroundModifierActive: "#d8d8d8",
    text: "#333333",
    textModifier: "#555555",
    shadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid transparent",
    borderActive: "1px solid #007aff",
  },
  shortcut: {
    background: "rgba(0, 0, 0, 0.8)",
    text: "#ffffff",
  },
}

export const darkTheme: KeyboardTheme = {
  name: "Dark",
  keyboard: {
    background: "#1e1e1e",
    shadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
  },
  key: {
    background: "#2d2d2d",
    backgroundActive: "#3a3a3a",
    backgroundModifier: "#444444",
    backgroundModifierActive: "#555555",
    text: "#ffffff",
    textModifier: "#cccccc",
    shadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
    border: "1px solid #444444",
    borderActive: "1px solid #0a84ff",
  },
  shortcut: {
    background: "rgba(255, 255, 255, 0.9)",
    text: "#000000",
  },
}

export function getTheme(mode: "light" | "dark"): KeyboardTheme {
  return mode === "light" ? lightTheme : darkTheme
}
