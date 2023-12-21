import { useQuery } from '@tanstack/react-query'

import { InverterAPI } from '@/api'
import type { InverterDetailModel } from '@/types'

export const useInverterDetailQuery = (props: InverterDetailModel) => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: [InverterAPI.DETAIL_QUERY_KEY, props],
    queryFn: () => InverterAPI.detail(props),
    select: (res) => res.data,
    enabled: !!props.id || !!props.deviceSN
  })

  return { detail: data, isLoading: isFetching, refetch }
}
