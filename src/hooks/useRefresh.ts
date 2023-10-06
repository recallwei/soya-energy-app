import { useCallback, useState } from 'react'

export default function useRefresh<T>(callback?: () => Promise<T>): {
  refreshing: boolean
  onRefresh: () => void
  startRefresh: () => void
  endRefresh: () => void
} {
  const [refreshing, setRefreshing] = useState(false)

  const onRefreshCallback = useCallback(async () => {
    setRefreshing(true)
    if (callback) {
      await callback()
    }
    setRefreshing(false)
  }, [callback])

  const onRefresh = () => {
    onRefreshCallback().catch(() => {})
  }

  const startRefresh = () => setRefreshing(true)

  const endRefresh = () => setRefreshing(false)

  return { refreshing, onRefresh, startRefresh, endRefresh }
}