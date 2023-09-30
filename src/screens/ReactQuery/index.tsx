import { useCallback } from 'react'
import { Text, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'

import { TestAPI } from '@/api'
import { TextStyles } from '@/styles'

export default function ReactQueryScreen(): React.JSX.Element {
  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ['test-list'],
    queryFn: () => TestAPI.getAll(),
    staleTime: Infinity
  })

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [refetch])
  )

  if (isError) {
    return (
      <Text
        style={{
          ...TextStyles.base,
          textAlign: 'center'
        }}
      >
        Error...
      </Text>
    )
  }

  return (
    <ScrollView>
      {isFetching ? (
        <Text
          style={{
            ...TextStyles.base,
            textAlign: 'center'
          }}
        >
          Loading...
        </Text>
      ) : (
        <Text style={TextStyles.base}>{JSON.stringify(data)}</Text>
      )}
    </ScrollView>
  )
}
