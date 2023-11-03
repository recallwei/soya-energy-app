import { useFocusEffect } from '@react-navigation/native'
import type { NotifyOnChangeProps } from '@tanstack/query-core'
import { useCallback, useRef } from 'react'

/**
 * 禁用失去焦点时的重新渲染
 * @see https://tanstack.com/query/latest/docs/react/react-native#disable-re-renders-on-out-of-focus-screens
 */
export function useFocusNotifyOnChangeProps(
  notifyOnChangeProps?: NotifyOnChangeProps
) {
  const focusedRef = useRef(true)

  useFocusEffect(
    useCallback(() => {
      focusedRef.current = true

      return () => {
        focusedRef.current = false
      }
    }, [])
  )

  return () => {
    if (!focusedRef.current) {
      return []
    }

    if (typeof notifyOnChangeProps === 'function') {
      return notifyOnChangeProps()
    }

    return notifyOnChangeProps
  }
}
