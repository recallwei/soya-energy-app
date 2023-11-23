import { useEffect, useState } from 'react'
import type { CameraPermissionStatus } from 'react-native-vision-camera'
import { Camera } from 'react-native-vision-camera'
import { Text } from 'tamagui'

export default function Screen() {
  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus | null>(null)
  const [microphonePermission, setMicrophonePermission] = useState<CameraPermissionStatus | null>(
    null
  )

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission)
    Camera.getMicrophonePermissionStatus().then(setMicrophonePermission)
  }, [])

  if (cameraPermission === null || microphonePermission === null) {
    return null
  }

  const showPermissionsPage =
    cameraPermission !== 'granted' || microphonePermission === 'not-determined'

  if (showPermissionsPage) {
    return <Text>Permission Denied</Text>
  }

  return <Text>Permission Granted</Text>
}
