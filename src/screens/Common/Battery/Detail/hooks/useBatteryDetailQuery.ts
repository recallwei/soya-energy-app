import { useQuery } from '@tanstack/react-query'

import { BatteryAPI } from '@/api'

interface Props {
  id: string
}

export const useBatteryDetailQuery = (props: Props) => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: [BatteryAPI.DETAIL_QUERY_KEY, props.id],
    queryFn: () => BatteryAPI.detail(props.id),
    select: (res) => res.data
  })

  return {
    detail: data,
    isLoading: isFetching,
    refetch
  }
}
