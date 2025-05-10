import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.example.mackeyboard",
  appName: "macOS Keyboard",
  webDir: "out",
  bundledWebRuntime: false,
  plugins: {
    Keyboard: {
      resize: "none",
      style: "dark",
      resizeOnFullScreen: true,
    },
  },
  ios: {
    contentInset: "always",
  },
}

export default config
