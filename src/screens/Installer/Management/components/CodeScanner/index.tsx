import { useIsFocused } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Reanimated, { useAnimatedProps, useSharedValue, withSpring } from 'react-native-reanimated'
import type { CameraProps } from 'react-native-vision-camera'
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
  useCodeScanner
} from 'react-native-vision-camera'

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera)
Reanimated.addWhitelistedNativeProps({
  zoom: true
})

export default function CodeScanner() {
  const isActive = useIsFocused()
  const camera = useRef<Camera>(null)
  const zoom = useSharedValue(0)
  const device = useCameraDevice('back')
  const format = useCameraFormat(device, [{ videoResolution: 'max' }, { photoResolution: 'max' }])
  // eslint-disable-next-line no-nested-ternary
  const fps = format ? (format.maxFps >= 240 ? 240 : format.maxFps) : 60
  const { hasPermission, requestPermission } = useCameraPermission()
  const [isCameraActive, setIsCameraActive] = useState(true)
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'ean-8'],
    onCodeScanned: (codes) => {
      console.log(codes)
      console.log(codes.length)
      // setIsCameraActive(false)
    }
  })

  useEffect(() => {
    setIsCameraActive(true)
    requestPermission()
  }, [isActive])

  const onRandomZoomPress = useCallback(() => {
    zoom.value = withSpring(Math.random())
  }, [zoom])

  const animatedProps = useAnimatedProps<Partial<CameraProps>>(() => ({ zoom: zoom.value }), [zoom])

  if (!device || !hasPermission || !isActive || !isCameraActive) {
    return null
  }

  return (
    <>
      <ReanimatedCamera
        ref={camera}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        device={device}
        format={format}
        fps={fps}
        isActive={isCameraActive}
        codeScanner={codeScanner}
        animatedProps={animatedProps}
      />
      <TouchableOpacity onPress={onRandomZoomPress}>
        <Text>Zoom randomly!</Text>
      </TouchableOpacity>
    </>
  )
}
