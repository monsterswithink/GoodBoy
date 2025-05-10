"use client"

import { useState, useEffect } from "react"

export type DeviceType = "iphone" | "ipad" | "ipadPro" | "unknown"
export type OrientationType = "portrait" | "landscape"

interface DeviceInfo {
  type: DeviceType
  orientation: OrientationType
  isSmallPhone: boolean
  isMediumPhone: boolean
  isLargePhone: boolean
  isTablet: boolean
  isPro: boolean
}

const defaultDeviceInfo: DeviceInfo = {
  type: "unknown",
  orientation: "portrait",
  isSmallPhone: false,
  isMediumPhone: false,
  isLargePhone: false,
  isTablet: false,
  isPro: false,
}

export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(defaultDeviceInfo)

  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const orientation: OrientationType = width > height ? "landscape" : "portrait"

      // Detect device type based on screen dimensions
      let type: DeviceType = "unknown"
      let isSmallPhone = false
      let isMediumPhone = false
      let isLargePhone = false
      let isTablet = false
      let isPro = false

      // iPhone detection (approximate sizes)
      if (Math.max(width, height) < 700) {
        type = "iphone"

        // Small iPhones (SE, 8, etc.)
        if (Math.max(width, height) < 600) {
          isSmallPhone = true
        }
        // Medium iPhones (X, 11, 12, 13)
        else if (Math.max(width, height) < 650) {
          isMediumPhone = true
        }
        // Large iPhones (Plus, Pro Max models)
        else {
          isLargePhone = true
        }
      }
      // iPad detection
      else {
        // iPad Pro detection (larger screens)
        if (Math.max(width, height) > 1100) {
          type = "ipadPro"
          isPro = true
        } else {
          type = "ipad"
        }
        isTablet = true
      }

      setDeviceInfo({
        type,
        orientation,
        isSmallPhone,
        isMediumPhone,
        isLargePhone,
        isTablet,
        isPro,
      })
    }

    // Initial detection
    detectDevice()

    // Update on resize
    window.addEventListener("resize", detectDevice)
    return () => window.removeEventListener("resize", detectDevice)
  }, [])

  return deviceInfo
}
