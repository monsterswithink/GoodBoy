"use client"

import type React from "react"
import { useDevice } from "@/hooks/useDevice"

const DeviceInfo: React.FC<{ showDetails?: boolean }> = ({ showDetails = false }) => {
  const device = useDevice()

  if (!showDetails) {
    return (
      <div className="device-info text-sm text-gray-500 dark:text-gray-400">
        {device.type} ({device.orientation})
      </div>
    )
  }

  return (
    <div className="device-info p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
      <h3 className="font-bold mb-2">Device Information</h3>
      <ul className="space-y-1">
        <li>
          <span className="font-medium">Type:</span> {device.type}
        </li>
        <li>
          <span className="font-medium">Orientation:</span> {device.orientation}
        </li>
        <li>
          <span className="font-medium">Size:</span>{" "}
          {device.isSmallPhone
            ? "Small Phone"
            : device.isMediumPhone
              ? "Medium Phone"
              : device.isLargePhone
                ? "Large Phone"
                : device.isPro
                  ? "iPad Pro"
                  : "iPad"}
        </li>
        <li>
          <span className="font-medium">Screen:</span> {window.innerWidth}x{window.innerHeight}
        </li>
      </ul>
    </div>
  )
}

export default DeviceInfo
